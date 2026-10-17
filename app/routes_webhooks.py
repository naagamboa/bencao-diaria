import logging
import re
import unicodedata
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Request, HTTPException, BackgroundTasks
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import (
    User, Payment, MessageLog, Referral, Content,
    STATUS_ACTIVE,
)
from app.whatsapp import (
    verify_signature, parse_webhook, send_text, send_template, mark_read,
    build_daily_message,
)
from app.config import settings
from app.payments import get_payment, get_preapproval, verify_mp_signature

logger = logging.getLogger("bencao.webhooks")

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

AMEN_EMOJIS = {"🙏", "🙌", "❤️", "❤", "🕊️", "🕊", "✨"}


def normalize_text(text: str) -> str:
    t = unicodedata.normalize("NFKD", text or "")
    t = "".join(ch for ch in t if not unicodedata.combining(ch))
    return re.sub(r"\s+", " ", t.lower()).strip()


def is_amen(raw: str) -> bool:
    text = (raw or "").strip()
    if text in AMEN_EMOJIS:
        return True
    norm = normalize_text(text)
    if re.fullmatch(r"(a+m+e+m+[\s!.,]*)+", norm):
        return True
    return norm in {"amem", "amen", "ame"} or "amem" in norm.split() or "amen" in norm.split()


def amen_reply(user: User, content: Content | None, streak: int) -> str:
    name = (user.name or "amigo(a)").split(" ")[0]
    parts = [f"Amém! 🙏 Que alegria, {name}!"]
    if content:
        parts.append(f"\n📖 *{content.verse_ref}*\n_{content.verse_text}_\n\n💭 {content.reflection}\n\n🙏 {content.prayer}")
    if streak >= 3:
        parts.append(f"\n🔥 Você está há *{streak} dias* respondendo Amém. Sua constância é uma bênção!")
    if streak > 0 and streak % 7 == 0:
        parts.append(f"\n🎁 *Presente de fidelidade:* compartilhe sua bênção!\nIndique um amigo e ganhe 1 mês grátis:\n{settings.APP_URL}/?ref={user.referral_code}")
    parts.append("\nTenha um dia abençoado! 💚")
    return "\n".join(parts)


def help_menu(user: User) -> str:
    name = (user.name or "amigo(a)").split(" ")[0]
    support = f"\n• Falar com atendimento: {settings.SUPPORT_WHATSAPP}" if settings.SUPPORT_WHATSAPP else ""
    return (
        f"Olá, {name}! 🙏 Estou aqui para ajudar. Responda:\n\n"
        f"• *AMÉM* — confirmar que recebeu sua bênção\n"
        f"• *1*, *2* ou *3* — mudar horário (6h / 12h / 20h)\n"
        f"• *PIX* — renovar sua assinatura\n"
        f"• *INDICAR* — convidar amigos e ganhar 1 mês grátis\n"
        f"• *PARAR* — cancelar os envios\n"
        f"• *EXCLUIR* — apagar seus dados (LGPD){support}"
    )


def pix_renewal_reply(user: User, pix_code: str | None) -> str:
    name = (user.name or "amigo(a)").split(" ")[0]
    if pix_code:
        return (
            f"🙏 Que bom que você quer continuar, {name}!\n\n"
            f"Para renovar, pague o PIX copiando o código abaixo (toque e segure para copiar):\n\n"
            f"`{pix_code}`\n\n"
            f"Assim que o pagamento cair, você recebe a confirmação aqui. Deus te abençoe! 💚"
        )
    return "Não consegui gerar o PIX agora. Tente novamente em alguns minutinhos. 🙏"


async def handle_incoming_text(user: User | None, phone: str, raw_text: str, wa_message_id: str | None) -> None:
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.phone == phone).first()
        now = datetime.now(timezone.utc)
        text = raw_text or ""
        norm = normalize_text(text)

        if user is None:
            body = (
                "Olá! 🙏 Eu sou a assistente da *Bênção Diária*.\n\n"
                "Todos os dias envio um versículo, uma reflexão e uma oração aqui no seu WhatsApp, de manhã cedo.\n\n"
                "Quer receber também? É rapidinho — 3 dias grátis:\n"
                f"{settings.APP_URL}\n\n"
                "Que Deus abençoe você! 💚"
            )
            try:
                await send_text(phone, body)
            except Exception:
                logger.exception("falha resposta para numero desconhecido %s", phone)
            return

        user.last_reply_at = now
        db.add(MessageLog(user_id=user.id, direction="inbound", body=text[:4000],
                          wa_message_id=wa_message_id, status="received"))

        if is_amen(text):
            if user.streak_last_at:
                last_streak = user.streak_last_at
                if last_streak.tzinfo is None:
                    last_streak = last_streak.replace(tzinfo=timezone.utc)
                user.streak_count = (user.streak_count or 0) + 1 if (now - last_streak) < timedelta(hours=36) else 1
            else:
                user.streak_count = 1
            user.streak_last_at = now
            content = _today_content(db, user.id)
            reply = amen_reply(user, content, user.streak_count)
            db.commit()
            try:
                await send_text(user.phone, reply)
            except Exception:
                logger.exception("falha resposta amem user=%s", user.id)
            return

        if norm in {"parar", "sair", "cancelar", "stop", "descadastrar", "cancelar assinatura"}:
            user.opted_out = True
            db.commit()
            try:
                await send_text(user.phone, "Entendi. Não enviarei mais mensagens. 💚\n\nQuando quiser voltar, é só responder *VOLTAR*. Deus te abençoe!")
            except Exception:
                logger.exception("falha resposta optout user=%s", user.id)
            return

        if norm in {"voltar", "ativar", "start", "voltar a receber"}:
            user.opted_out = False
            db.commit()
            try:
                await send_text(user.phone, "Que alegria ter você de volta! 🙏 Sua bênção diária chegará todos os dias de manhã. Responda *AMÉM* hoje para confirmar. 💚")
            except Exception:
                logger.exception("falha resposta optin user=%s", user.id)
            return

        if norm in {"pix", "pagar", "renovar", "pagamento", "assinatura", "reativar"}:
            user.opted_out = False
            db.commit()
            from app.routes_users import price_for
            from app.payments import create_pix_payment
            amount = price_for(user.plan)
            try:
                mp = await create_pix_payment(user.id, amount, user.plan, user.email, user.phone)
                tx = (mp.get("point_of_interaction") or {}).get("transaction_data") or {}
                pix_code = tx.get("qr_code")
                payment = Payment(user_id=user.id, mp_payment_id=str(mp.get("id")), amount=amount,
                                  plan=user.plan, method="pix", pix_copy_paste=pix_code,
                                  pix_qr=tx.get("qr_code_base64"), status="pending")
                db.add(payment)
                db.commit()
                reply = (
                    f"🙏 Que bom que você quer continuar, {(user.name or 'amigo(a)').split(' ')[0]}!\n\n"
                    f"Pague o PIX de *R$ {amount:.2f}* copiando o código abaixo (toque e segure):\n\n"
                    f"`{pix_code}`\n\n"
                    f"Assim que cair, você recebe a confirmação aqui! 💚"
                )
            except Exception:
                logger.exception("falha gerar pix user=%s", user.id)
                reply = "Não consegui gerar o PIX agora. Tente novamente em alguns minutinhos. 🙏"
            try:
                await send_text(user.phone, reply)
            except Exception:
                logger.exception("falha enviar pix user=%s", user.id)
            return

        if norm in {"indicar", "indicacao", "convite", "convidar", "indique"}:
            reply = (
                f"🎁 *Indique e ganhe!*\n\n"
                f"Envie este link para seus amigos:\n{settings.APP_URL}/?ref={user.referral_code}\n\n"
                f"Cada amigo que assinar = *1 mês grátis* para você. Compartilhe sua fé! 💚"
            )
            db.commit()
            try:
                await send_text(user.phone, reply)
            except Exception:
                logger.exception("falha enviar indicacao user=%s", user.id)
            return

        if norm in {"1", "2", "3"}:
            hours = {"1": 6, "2": 12, "3": 20}
            user.preferred_hour = hours[norm]
            db.commit()
            labels = {"1": "6h da manhã", "2": "meio-dia", "3": "8h da noite"}
            try:
                await send_text(user.phone, f"Prontinho! ✅ A partir de agora você recebe sua bênção diária às *{labels[norm]}*. Responda *AMÉM* 🙏")
            except Exception:
                logger.exception("falha horario user=%s", user.id)
            return

        if norm in {"excluir", "apagar", "excluir dados", "lgpd"}:
            user.name = "Anônimo(a)"
            user.email = None
            user.opted_out = True
            user.status = "cancelled"
            user.notes = "Anonimizado a pedido (LGPD)"
            db.commit()
            try:
                await send_text(user.phone, "Seus dados pessoais foram apagados (LGPD). 💚\n\nOs registros de pagamento são mantidos apenas pelo prazo legal. Foi uma honra caminhar com você. Responda *VOLTAR* se quiser começar de novo.")
            except Exception:
                logger.exception("falha lgpd user=%s", user.id)
            return

        if norm in {"ajuda", "menu", "opcoes", "oi", "ola", "bom dia", "boa tarde", "boa noite", "?"} or len(norm) <= 2:
            db.commit()
            try:
                await send_text(user.phone, help_menu(user))
            except Exception:
                logger.exception("falha menu user=%s", user.id)
            return

        db.commit()
        try:
            await send_text(user.phone, "Recebi sua mensagem! 🙏\n\n" + help_menu(user))
        except Exception:
            logger.exception("falha resposta generica user=%s", user.id)
    finally:
        db.close()


def _today_content(db: Session, user_id: str) -> Content | None:
    import hashlib
    import zoneinfo
    total = db.query(Content).count()
    if total == 0:
        return None
    day = datetime.now(zoneinfo.ZoneInfo(settings.TIMEZONE)).timetuple().tm_yday
    offset = int(hashlib.md5(user_id.encode()).hexdigest(), 16) % total
    idx = (day + offset) % total
    return db.query(Content).order_by(Content.day_index).offset(idx).first()


@router.get("/whatsapp")
def wa_verify(request: Request):
    qp = request.query_params
    mode = qp.get("hub.mode") or qp.get("hub_mode") or qp.get("mode")
    token = qp.get("hub.verify_token") or qp.get("hub_verify_token") or qp.get("verify_token")
    challenge = qp.get("hub.challenge") or qp.get("hub_challenge") or qp.get("challenge") or ""
    if mode == "subscribe" and token == settings.WHATSAPP_VERIFY_TOKEN:
        return PlainTextResponse(challenge)
    raise HTTPException(status_code=403, detail="verify token inválido")


@router.post("/whatsapp")
async def wa_webhook(request: Request, background: BackgroundTasks):
    raw = await request.body()
    sig = request.headers.get("X-Hub-Signature-256")
    if not verify_signature(raw, sig):
        raise HTTPException(status_code=403, detail="assinatura inválida")
    import json as _json
    payload = _json.loads(raw)
    events = parse_webhook(payload)

    db = SessionLocal()
    try:
        for ev in events:
            if ev["type"] == "message":
                phone = "+" + (ev["from"] or "")
                user = db.query(User).filter(User.phone == phone).first()
                if user and ev["id"]:
                    background.add_task(mark_read, ev["id"])
                background.add_task(handle_incoming_text, user, phone, ev["text"] or "", ev["id"])
            elif ev["type"] == "status":
                ml = db.query(MessageLog).filter(MessageLog.wa_message_id == ev["id"]).first()
                if ml:
                    ml.status = ev["status"]
                    db.commit()
    finally:
        db.close()
    return {"ok": True}


async def activate_subscription(user_id: str, plan: str, payment_row_id: str | None) -> None:
    db = SessionLocal()
    try:
        user = db.get(User, user_id)
        if not user:
            return
        now = datetime.now(timezone.utc)
        base = user.subscription_ends_at or now
        if base.tzinfo is None:
            base = base.replace(tzinfo=timezone.utc)
        if base < now:
            base = now
        user.status = STATUS_ACTIVE
        user.plan = plan or user.plan
        user.subscription_ends_at = base + timedelta(days=30)
        user.opted_out = False

        ref = db.query(Referral).filter(Referral.referred_id == user.id, Referral.rewarded == False).first()  # noqa: E712
        if ref:
            referrer = db.get(User, ref.referrer_id)
            if referrer:
                ref_base = referrer.subscription_ends_at or now
                if ref_base.tzinfo is None:
                    ref_base = ref_base.replace(tzinfo=timezone.utc)
                if ref_base < now:
                    ref_base = now
                referrer.subscription_ends_at = ref_base + timedelta(days=settings.REFERRAL_REWARD_DAYS)
                try:
                    await send_text(referrer.phone, f"🎁 Parabéns! Um amigo seu assinou a Bênção Diária com seu convite. Você ganhou *{settings.REFERRAL_REWARD_DAYS} dias grátis*! Deus te abençoe. 💚")
                except Exception:
                    logger.exception("falha aviso indicacao")
            ref.rewarded = True
        db.commit()

        first_name = (user.name or "amigo(a)").split(" ")[0]
        if not user.welcome_sent_at:
            try:
                await send_template(user.phone, settings.WHATSAPP_TEMPLATE_WELCOME, [first_name])
                user.welcome_sent_at = now
                db.commit()
            except Exception:
                logger.exception("falha boas-vindas pos-pagamento user=%s", user.id)
        else:
            try:
                await send_text(user.phone, f"✅ *Pagamento confirmado!*\n\n{first_name}, sua assinatura da Bênção Diária está ativa. Continue respondendo *AMÉM* para receber sua bênção todos os dias! 💚")
            except Exception:
                logger.exception("falha confirmacao pagamento user=%s", user.id)
    finally:
        db.close()


@router.post("/mercadopago")
async def mp_webhook(request: Request, background: BackgroundTasks):
    raw = await request.body()
    try:
        data = await request.json()
    except Exception:
        data = {}
    qp = request.query_params
    data_id = qp.get("data.id") or (data.get("data") or {}).get("id") or data.get("id") or ""
    tipo = qp.get("type") or qp.get("topic") or data.get("type") or ""
    if not data_id:
        return {"ok": True}
    if not verify_mp_signature(dict(request.headers), str(data_id)):
        raise HTTPException(status_code=403, detail="assinatura MP inválida")

    db = SessionLocal()
    try:
        if tipo == "preapproval":
            pre = await get_preapproval(str(data_id))
            ext = pre.get("external_reference") or ""
            if pre.get("status") == "authorized" and ext:
                user_id, plan = (ext.split(":") + [None, None])[:2]
                pay = db.query(Payment).filter(Payment.mp_preapproval_id == str(data_id)).first()
                if pay and pay.status != "approved":
                    pay.status = "approved"
                    pay.paid_at = datetime.now(timezone.utc)
                    db.commit()
                    background.add_task(activate_subscription, user_id, plan, pay.id)
            return {"ok": True}

        if tipo and tipo != "payment":
            return {"ok": True}

        mp = await get_payment(str(data_id))
        ext = mp.get("external_reference") or ""
        status = mp.get("status")
        user_id, plan = (ext.split(":") + [None, None])[:2]

        pay = db.query(Payment).filter(Payment.mp_payment_id == str(data_id)).first()
        if pay is None and user_id:
            pay = db.query(Payment).filter(Payment.user_id == user_id, Payment.status == "pending") \
                .order_by(Payment.created_at.desc()).first()
        if not pay:
            return {"ok": True}

        if status == "approved" and pay.status != "approved":
            paid_amount = float(mp.get("transaction_amount") or pay.amount or 0)
            expected = float(pay.amount or 0)
            if expected and paid_amount + 0.01 < expected * 0.9:
                pay.status = "pending"
                db.commit()
                logger.warning("pagamento com valor incorreto pay=%s pago=%s esperado=%s", pay.id, paid_amount, expected)
                return {"ok": True}
            pay.status = "approved"
            pay.paid_at = datetime.now(timezone.utc)
            db.commit()
            background.add_task(activate_subscription, pay.user_id, plan or pay.plan, pay.id)
        elif status in {"rejected", "cancelled", "refunded"} and pay.status != status:
            pay.status = status
            db.commit()
    finally:
        db.close()
    return {"ok": True}
