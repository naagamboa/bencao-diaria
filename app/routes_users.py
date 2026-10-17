import re
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import User, Payment, Referral, STATUS_TRIAL, STATUS_ACTIVE
from app.schemas import SubscribeIn, UserOut, PaymentOut
from app.config import settings
from app.payments import create_pix_payment, create_card_preapproval

router = APIRouter(prefix="/users", tags=["users"])

VALID_DDDS = set(range(11, 100))


def make_referral_code() -> str:
    return secrets.token_urlsafe(6).upper().replace("-", "").replace("_", "")[:8]


def normalize_phone(raw: str) -> str:
    digits = re.sub(r"\D", "", raw or "")
    if len(digits) in (10, 11):
        digits = "55" + digits
    if len(digits) not in (12, 13):
        raise HTTPException(status_code=400, detail="WhatsApp inválido. Use DDD + número, ex: (51) 99999-8888")
    if digits.startswith("55") and int(digits[2:4]) not in VALID_DDDS:
        raise HTTPException(status_code=400, detail="DDD inválido. Confira o número com DDD, ex: (51) 99999-8888")
    if digits[4] == "0":
        raise HTTPException(status_code=400, detail="Número inválido. Confira o WhatsApp, ex: (51) 99999-8888")
    return "+" + digits


def price_for(plan: str) -> float:
    return settings.PRICE_PREMIUM if plan == "premium" else settings.PRICE_BASIC


def _pix_fields(mp: dict) -> tuple[str | None, str | None]:
    tx = (mp.get("point_of_interaction") or {}).get("transaction_data") or {}
    return tx.get("qr_code_base64"), tx.get("qr_code")


@router.post("/subscribe", response_model=dict)
async def subscribe(body: SubscribeIn, db: Session = Depends(get_db)):
    if not body.consent:
        raise HTTPException(status_code=400, detail="Para continuar, aceite receber as mensagens no WhatsApp (LGPD).")
    phone = normalize_phone(body.phone)
    plan = body.plan if body.plan in ("basic", "premium") else "basic"
    now = datetime.now(timezone.utc)

    user = db.query(User).filter(User.phone == phone).first()
    if user:
        user.name = body.name.strip()
        user.email = (body.email or "").strip() or None
        user.plan = plan
        if user.opted_out:
            user.opted_out = False
        if not user.consent_at:
            user.consent_at = now
        new_user = False
    else:
        user = User(phone=phone, name=body.name.strip(), email=(body.email or "").strip() or None,
                    plan=plan, status=STATUS_TRIAL,
                    referral_code=make_referral_code(),
                    trial_ends_at=now + timedelta(days=settings.TRIAL_DAYS),
                    consent_at=now)
        db.add(user)
        db.flush()
        new_user = True
        if body.referral_code:
            referrer = db.query(User).filter(User.referral_code == body.referral_code.strip().upper()).first()
            if referrer and referrer.id != user.id:
                db.add(Referral(referrer_id=referrer.id, referred_id=user.id))

    db.commit()
    db.refresh(user)

    amount = price_for(user.plan)
    mp = await create_pix_payment(user.id, amount, user.plan, user.email, user.phone)
    qr_b64, qr_code = _pix_fields(mp)
    payment = Payment(user_id=user.id, mp_payment_id=str(mp.get("id")), amount=amount, plan=user.plan,
                      method="pix", pix_qr=qr_b64, pix_copy_paste=qr_code, status="pending")
    db.add(payment)
    db.commit()
    db.refresh(payment)

    if new_user:
        from app.whatsapp import send_template, build_welcome_message
        try:
            data = await send_template(phone, settings.WHATSAPP_TEMPLATE_WELCOME, [(user.name or "").split(" ")[0]])
            first_name = (user.name or "amigo(a)").split(" ")[0]
            from app.models import MessageLog
            db.add(MessageLog(user_id=user.id, direction="outbound", category="utility", body=build_welcome_message(user.name, user.plan)[:4000],
                              wa_message_id=(data.get("messages") or [{}])[0].get("id"), status="sent"))
            db.commit()
        except Exception:
            pass

    return {
        "user": UserOut.model_validate(user).model_dump(mode="json"),
        "payment": PaymentOut.model_validate(payment).model_dump(mode="json"),
        "message": f"Bem-vindo(a)! Você tem {settings.TRIAL_DAYS} dias grátis. Pague o PIX para manter a bênção diária.",
    }


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    return u


@router.get("/{user_id}/status")
def user_status(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    last_payment = db.query(Payment).filter(Payment.user_id == u.id).order_by(Payment.created_at.desc()).first()
    return {
        "status": u.status,
        "plan": u.plan,
        "opted_out": u.opted_out,
        "trial_ends_at": u.trial_ends_at.isoformat() if u.trial_ends_at else None,
        "subscription_ends_at": u.subscription_ends_at.isoformat() if u.subscription_ends_at else None,
        "payment": {
            "id": last_payment.id,
            "status": last_payment.status,
            "method": last_payment.method,
            "pix_copy_paste": last_payment.pix_copy_paste,
            "pix_qr": last_payment.pix_qr,
            "checkout_url": last_payment.checkout_url,
            "amount": last_payment.amount,
        } if last_payment else None,
    }


@router.post("/{user_id}/renew")
async def renew(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    amount = price_for(u.plan)
    mp = await create_pix_payment(u.id, amount, u.plan, u.email, u.phone)
    qr_b64, qr_code = _pix_fields(mp)
    payment = Payment(user_id=u.id, mp_payment_id=str(mp.get("id")), amount=amount, plan=u.plan,
                      method="pix", pix_qr=qr_b64, pix_copy_paste=qr_code, status="pending")
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return PaymentOut.model_validate(payment).model_dump(mode="json")


@router.post("/{user_id}/card")
async def subscribe_card(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    amount = price_for(u.plan)
    pre = await create_card_preapproval(u.id, amount, u.plan, u.email)
    payment = Payment(user_id=u.id, mp_payment_id=None, mp_preapproval_id=str(pre.get("id")),
                      amount=amount, plan=u.plan, method="card",
                      checkout_url=pre.get("init_point") or pre.get("sandbox_init_point"),
                      status="pending")
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return {"checkout_url": payment.checkout_url, "payment_id": payment.id}


@router.post("/{user_id}/optout")
def optout(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    u.opted_out = True
    db.commit()
    return {"ok": True, "message": "Você não receberá mais mensagens. Sentiremos sua falta! Para voltar, responda VOLTAR."}


@router.post("/{user_id}/optin")
def optin(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    u.opted_out = False
    db.commit()
    return {"ok": True, "message": "Bem-vindo(a) de volta! Sua bênção diária continua."}


@router.delete("/{user_id}/data")
def delete_data(user_id: str, db: Session = Depends(get_db)):
    u = db.get(User, user_id)
    if not u:
        raise HTTPException(404, "Usuário não encontrado")
    u.name = "Anônimo(a)"
    u.email = None
    u.opted_out = True
    u.status = "cancelled"
    u.notes = "Dados anonimizados a pedido (LGPD)"
    db.commit()
    return {"ok": True, "message": "Seus dados pessoais foram removidos. Registros de pagamento são mantidos por obrigação legal."}
