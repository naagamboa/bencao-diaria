import asyncio
import hashlib
import logging
from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

import zoneinfo
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import (
    User, Content, MessageLog,
    STATUS_TRIAL, STATUS_ACTIVE, STATUS_PAST_DUE, PLAN_PREMIUM,
)
from app.whatsapp import send_template, send_text, build_daily_message
from app.config import settings

logger = logging.getLogger("bencao.scheduler")

SEND_DELAY_SECONDS = 0.4


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def local_now() -> datetime:
    return datetime.now(zoneinfo.ZoneInfo(settings.TIMEZONE))


def pick_content(db: Session, user_id: str) -> Content | None:
    total = db.query(Content).count()
    if total == 0:
        return None
    day = local_now().timetuple().tm_yday
    offset = int(hashlib.md5(user_id.encode()).hexdigest(), 16) % total
    idx = (day + offset) % total
    return db.query(Content).order_by(Content.day_index).offset(idx).first()


def service_window_open(user: User) -> bool:
    if not user.last_reply_at:
        return False
    if user.last_reply_at.tzinfo is None:
        last = user.last_reply_at.replace(tzinfo=timezone.utc)
    else:
        last = user.last_reply_at
    return now_utc() - last < timedelta(hours=settings.SERVICE_WINDOW_HOURS)


def is_due_now(user: User) -> bool:
    if user.preferred_hour is not None and local_now().hour != user.preferred_hour:
        return False
    return True


def already_sent_today(user: User) -> bool:
    if not user.last_daily_sent_at:
        return False
    if user.last_daily_sent_at.tzinfo is None:
        last = user.last_daily_sent_at.replace(tzinfo=timezone.utc)
    else:
        last = user.last_daily_sent_at
    return last.astimezone(zoneinfo.ZoneInfo(settings.TIMEZONE)).date() == local_now().date()


def is_eligible(user: User) -> bool:
    if user.opted_out:
        return False
    now = now_utc()
    if user.status == STATUS_TRIAL:
        end = _aware(user.trial_ends_at)
        return bool(end and end > now)
    if user.status == STATUS_ACTIVE:
        end = _aware(user.subscription_ends_at)
        return end is None or end > now
    return False


def _aware(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    return dt.replace(tzinfo=timezone.utc) if dt.tzinfo is None else dt


def log_outbound(db: Session, user_id: str, content_id: str | None, wa_id: str | None,
                 category: str, body: str, status: str, error: str | None = None) -> None:
    db.add(MessageLog(user_id=user_id, content_id=content_id, wa_message_id=wa_id,
                      direction="outbound", category=category, body=body[:4000],
                      status=status, error=error))


async def send_daily_to_user(user: User, content: Content) -> None:
    db = SessionLocal()
    try:
        window_open = service_window_open(user)
        if window_open:
            body = build_daily_message(user.name, content)
            category = "service"
            try:
                data = await send_text(user.phone, body)
                wa_id = (data.get("messages") or [{}])[0].get("id")
                log_outbound(db, user.id, content.id, wa_id, category, body, "sent")
                user.last_daily_sent_at = now_utc()
                db.commit()
            except Exception as e:
                log_outbound(db, user.id, content.id, None, category, body, "failed", str(e))
                db.commit()
                logger.exception("falha envio diario (service) user=%s", user.id)
        else:
            first_name = (user.name or "amigo(a)").split(" ")[0]
            preview = f"Olá {{nome}}! Sua bênção diária: {content.verse_ref}. Responda AMÉM 🙏"
            try:
                data = await send_template(user.phone, settings.WHATSAPP_TEMPLATE_DAILY, [first_name, content.verse_ref])
                wa_id = (data.get("messages") or [{}])[0].get("id")
                log_outbound(db, user.id, content.id, wa_id, "marketing", preview, "sent")
                user.last_daily_sent_at = now_utc()
                db.commit()
            except Exception as e:
                log_outbound(db, user.id, content.id, None, "marketing", preview, "failed", str(e))
                db.commit()
                logger.exception("falha envio diario (template) user=%s", user.id)
    finally:
        db.close()


async def run_daily_broadcast(force: bool = False) -> dict:
    db = SessionLocal()
    try:
        users = db.query(User).filter(User.opted_out == False).all()  # noqa: E712
        targets = [SimpleNamespace(id=u.id, phone=u.phone, name=u.name, status=u.status,
                                   trial_ends_at=_aware(u.trial_ends_at),
                                   subscription_ends_at=_aware(u.subscription_ends_at),
                                   preferred_hour=u.preferred_hour,
                                   last_reply_at=_aware(u.last_reply_at),
                                   last_daily_sent_at=_aware(u.last_daily_sent_at),
                                   opted_out=u.opted_out)
                   for u in users]
    finally:
        db.close()

    sent, skipped = 0, 0
    for u in targets:
        if not force and (not is_eligible(u) or not is_due_now(u) or already_sent_today(u)):
            skipped += 1
            continue
        db = SessionLocal()
        try:
            content = pick_content(db, u.id)
        finally:
            db.close()
        if content is None:
            skipped += 1
            continue
        await send_daily_to_user(u, content)
        sent += 1
        await asyncio.sleep(SEND_DELAY_SECONDS)
    logger.info("broadcast diario: %s enviados, %s ignorados", sent, skipped)
    return {"sent": sent, "skipped": skipped}


async def run_maintenance() -> dict:
    db = SessionLocal()
    now = now_utc()
    stats = {"expired": 0, "reminders": 0, "welcome": 0, "winback": 0}
    try:
        users = db.query(User).filter(User.opted_out == False).all()  # noqa: E712

        for user in users:
            if user.status == STATUS_TRIAL:
                end = _aware(user.trial_ends_at)
                if end and end < now:
                    user.status = STATUS_PAST_DUE

            if user.status == STATUS_ACTIVE:
                end = _aware(user.subscription_ends_at)
                if end and end < now:
                    user.status = STATUS_PAST_DUE
                    stats["expired"] += 1
                    body = (
                        f"{(user.name or 'amigo(a)').split(' ')[0]}, seu período da Bênção Diária terminou. 🙏\n\n"
                        f"Para continuar recebendo sua palavra diária, responda *PIX* que envio o código de renovação. "
                        f"Sentimos sua falta! 💚"
                    )
                    try:
                        await send_text(user.phone, body)
                        log_outbound(db, user.id, None, None, "service", body, "sent")
                        stats["winback"] += 1
                    except Exception as e:
                        log_outbound(db, user.id, None, None, "service", body, "failed", str(e))

            if user.status == STATUS_ACTIVE:
                end = _aware(user.subscription_ends_at)
                if end and now < end <= now + timedelta(days=settings.RENEWAL_REMINDER_DAYS):
                    last_reminder = _aware(user.last_renewal_reminder_at)
                    if not last_reminder or (now - last_reminder) > timedelta(days=2):
                        days_left = max(1, (end - now).days)
                        first_name = (user.name or "amigo(a)").split(" ")[0]
                        preview = f"Renovação: {first_name}, faltam {days_left} dias. Responda PIX."
                        try:
                            await send_template(user.phone, "renewal_reminder", [first_name, days_left])
                            log_outbound(db, user.id, None, None, "utility", preview, "sent")
                            user.last_renewal_reminder_at = now
                            stats["reminders"] += 1
                        except Exception as e:
                            log_outbound(db, user.id, None, None, "utility", preview, "failed", str(e))

            if user.status == STATUS_ACTIVE and not user.welcome_sent_at:
                first_name = (user.name or "amigo(a)").split(" ")[0]
                preview = f"Boas-vindas: {first_name}"
                try:
                    await send_template(user.phone, settings.WHATSAPP_TEMPLATE_WELCOME, [first_name])
                    log_outbound(db, user.id, None, None, "utility", preview, "sent")
                    user.welcome_sent_at = now
                    stats["welcome"] += 1
                except Exception as e:
                    log_outbound(db, user.id, None, None, "utility", preview, "failed", str(e))

        db.commit()
    finally:
        db.close()
    logger.info("manutencao: %s", stats)
    return stats


def start_scheduler() -> AsyncIOScheduler:
    scheduler = AsyncIOScheduler(timezone=settings.TIMEZONE)
    scheduler.add_job(run_daily_broadcast, CronTrigger(hour=settings.DAILY_SEND_HOUR, minute=settings.DAILY_SEND_MINUTE,
                                                       timezone=settings.TIMEZONE),
                      id="daily_broadcast", replace_existing=True, max_instances=1, coalesce=True)
    scheduler.add_job(run_maintenance, CronTrigger(hour=9, minute=0, timezone=settings.TIMEZONE),
                      id="maintenance", replace_existing=True, max_instances=1, coalesce=True)
    scheduler.start()
    logger.info("scheduler iniciado (envio %s:%02d, manutencao 9:00, TZ %s)",
                settings.DAILY_SEND_HOUR, settings.DAILY_SEND_MINUTE, settings.TIMEZONE)
    return scheduler
