from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db import get_db
from app.auth import require_admin
from app.models import User, Payment, MessageLog, Content, Referral
from app.config import settings
from app.schemas import ManualMessageIn, ExtendIn

router = APIRouter(prefix="/admin", tags=["admin"])


def _aware(dt):
    if dt is None:
        return None
    return dt.replace(tzinfo=timezone.utc) if dt.tzinfo is None else dt


@router.get("/stats")
def stats(admin=Depends(require_admin), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    week_ago = now - timedelta(days=7)
    total_users = db.query(User).count()
    active = db.query(User).filter(User.status == "active").count()
    trial = db.query(User).filter(User.status == "trial", User.opted_out == False).count()  # noqa: E712
    past_due = db.query(User).filter(User.status == "past_due").count()
    cancelled = db.query(User).filter(User.status == "cancelled").count()
    opted_out = db.query(User).filter(User.opted_out == True).count()  # noqa: E712

    revenue = db.query(func.coalesce(func.sum(Payment.amount), 0)).filter(Payment.status == "approved").scalar()
    mrr_basic = db.query(User).filter(User.status == "active", User.plan == "basic").count() * settings.PRICE_BASIC
    mrr_premium = db.query(User).filter(User.status == "active", User.plan == "premium").count() * settings.PRICE_PREMIUM

    outbound_7d = db.query(MessageLog).filter(
        MessageLog.direction == "outbound", MessageLog.created_at >= week_ago).count()
    inbound_7d = db.query(MessageLog).filter(
        MessageLog.direction == "inbound", MessageLog.created_at >= week_ago).count()
    amens_7d = db.query(MessageLog).filter(
        MessageLog.direction == "inbound", MessageLog.created_at >= week_ago,
        MessageLog.body.ilike("%am%")).count()
    new_7d = db.query(User).filter(User.created_at >= week_ago).count()
    referrals_ok = db.query(Referral).filter(Referral.rewarded == True).count()  # noqa: E712

    amen_rate = round(amens_7d / outbound_7d * 100, 1) if outbound_7d else 0

    return {
        "users_total": total_users,
        "active": active,
        "trial": trial,
        "past_due": past_due,
        "cancelled": cancelled,
        "opted_out": opted_out,
        "new_last_7d": new_7d,
        "revenue_total": round(float(revenue or 0), 2),
        "mrr": round(mrr_basic + mrr_premium, 2),
        "messages_out_7d": outbound_7d,
        "messages_in_7d": inbound_7d,
        "amen_rate_7d": amen_rate,
        "referrals_rewarded": referrals_ok,
        "content_count": db.query(Content).count(),
    }


@router.get("/users")
def list_users(admin=Depends(require_admin), db: Session = Depends(get_db),
               limit: int = 100, offset: int = 0, q: str = "", status: str = ""):
    query = db.query(User)
    if q:
        like = f"%{q.strip()}%"
        query = query.filter((User.name.ilike(like)) | (User.phone.ilike(like)))
    if status:
        query = query.filter(User.status == status)
    rows = query.order_by(User.created_at.desc()).offset(offset).limit(limit).all()
    return [{
        "id": u.id, "phone": u.phone, "name": u.name, "plan": u.plan, "status": u.status,
        "opted_out": u.opted_out, "preferred_hour": u.preferred_hour,
        "streak": u.streak_count or 0, "last_reply_at": _aware(u.last_reply_at).isoformat() if u.last_reply_at else None,
        "subscription_ends_at": _aware(u.subscription_ends_at).isoformat() if u.subscription_ends_at else None,
        "trial_ends_at": _aware(u.trial_ends_at).isoformat() if u.trial_ends_at else None,
        "created_at": _aware(u.created_at).isoformat() if u.created_at else None,
    } for u in rows]


@router.get("/users/{user_id}")
def user_detail(user_id: str, admin=Depends(require_admin), db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "não encontrado")
    payments = db.query(Payment).filter(Payment.user_id == u.id).order_by(Payment.created_at.desc()).limit(20).all()
    messages = db.query(MessageLog).filter(MessageLog.user_id == u.id).order_by(MessageLog.created_at.desc()).limit(30).all()
    return {
        "user": {"id": u.id, "phone": u.phone, "name": u.name, "email": u.email, "plan": u.plan,
                 "status": u.status, "opted_out": u.opted_out, "preferred_hour": u.preferred_hour,
                 "streak": u.streak_count or 0, "notes": u.notes,
                 "trial_ends_at": _aware(u.trial_ends_at).isoformat() if u.trial_ends_at else None,
                 "subscription_ends_at": _aware(u.subscription_ends_at).isoformat() if u.subscription_ends_at else None,
                 "created_at": _aware(u.created_at).isoformat() if u.created_at else None},
        "payments": [{"id": p.id, "amount": p.amount, "plan": p.plan, "method": p.method,
                      "status": p.status, "paid_at": _aware(p.paid_at).isoformat() if p.paid_at else None,
                      "created_at": _aware(p.created_at).isoformat() if p.created_at else None} for p in payments],
        "messages": [{"direction": m.direction, "category": m.category, "status": m.status,
                      "body": (m.body or "")[:200],
                      "created_at": _aware(m.created_at).isoformat() if m.created_at else None} for m in messages],
    }


@router.post("/users/{user_id}/optout")
def admin_optout(user_id: str, admin=Depends(require_admin), db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "não encontrado")
    u.opted_out = True
    db.commit()
    return {"ok": True}


@router.post("/users/{user_id}/optin")
def admin_optin(user_id: str, admin=Depends(require_admin), db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "não encontrado")
    u.opted_out = False
    db.commit()
    return {"ok": True}


@router.post("/users/{user_id}/extend")
def admin_extend(user_id: str, body: ExtendIn, admin=Depends(require_admin), db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "não encontrado")
    now = datetime.now(timezone.utc)
    base = _aware(u.subscription_ends_at) or now
    if base < now:
        base = now
    u.subscription_ends_at = base + timedelta(days=body.days)
    u.status = "active"
    db.commit()
    return {"ok": True, "subscription_ends_at": u.subscription_ends_at.isoformat()}


@router.post("/users/{user_id}/message")
async def admin_message(user_id: str, body: ManualMessageIn, admin=Depends(require_admin), db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "não encontrado")
    from app.whatsapp import send_text
    try:
        data = await send_text(u.phone, body.text)
        wa_id = (data.get("messages") or [{}])[0].get("id")
        db.add(MessageLog(user_id=u.id, direction="outbound", category="service",
                          body=body.text[:4000], wa_message_id=wa_id, status="sent"))
        db.commit()
        return {"ok": True, "wa_message_id": wa_id}
    except Exception as e:
        db.add(MessageLog(user_id=u.id, direction="outbound", category="service",
                          body=body.text[:4000], status="failed", error=str(e)))
        db.commit()
        raise HTTPException(502, f"falha ao enviar: {e}")


@router.post("/payments/{payment_id}/approve")
def admin_approve_payment(payment_id: str, admin=Depends(require_admin), db: Session = Depends(get_db)):
    p = db.get(Payment, payment_id)
    if not p:
        raise HTTPException(404, "não encontrado")
    if p.status == "approved":
        return {"ok": True, "already": True}
    p.status = "approved"
    p.paid_at = datetime.now(timezone.utc)
    db.commit()
    import asyncio
    from app.routes_webhooks import activate_subscription

    async def _run():
        await activate_subscription(p.user_id, p.plan, p.id)
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(_run())
    except RuntimeError:
        asyncio.run(_run())
    return {"ok": True}


@router.get("/payments")
def list_payments(admin=Depends(require_admin), db: Session = Depends(get_db),
                  limit: int = 100, status: str = ""):
    query = db.query(Payment)
    if status:
        query = query.filter(Payment.status == status)
    rows = query.order_by(Payment.created_at.desc()).limit(limit).all()
    result = []
    for p in rows:
        u = db.get(User, p.user_id)
        result.append({"id": p.id, "user": u.name if u else "?", "phone": u.phone if u else "?",
                       "amount": p.amount, "plan": p.plan, "method": p.method, "status": p.status,
                       "created_at": _aware(p.created_at).isoformat() if p.created_at else None,
                       "paid_at": _aware(p.paid_at).isoformat() if p.paid_at else None})
    return result


@router.post("/broadcast")
async def manual_broadcast(admin=Depends(require_admin), force: bool = False):
    from app.scheduler import run_daily_broadcast
    result = await run_daily_broadcast(force=force)
    return {"ok": True, **result}


@router.post("/maintenance")
async def manual_maintenance(admin=Depends(require_admin)):
    from app.scheduler import run_maintenance
    result = await run_maintenance()
    return {"ok": True, **result}
