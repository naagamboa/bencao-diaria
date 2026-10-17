import hashlib
import hmac
import logging
import uuid

import httpx

from app.config import settings

logger = logging.getLogger("bencao.payments")

MP_BASE = "https://api.mercadopago.com"


def dev_mode() -> bool:
    return not settings.MP_ACCESS_TOKEN


def _headers() -> dict:
    return {"Authorization": f"Bearer {settings.MP_ACCESS_TOKEN}", "Content-Type": "application/json"}


async def create_pix_payment(user_id: str, amount: float, plan: str,
                             payer_email: str | None = None, payer_phone: str | None = None) -> dict:
    if dev_mode():
        return {
            "id": f"dev-{uuid.uuid4().hex[:10]}",
            "status": "pending",
            "point_of_interaction": {
                "transaction_data": {
                    "qr_code": "00020126580014BR.GOV.BCB.PIX0136dev-mode-simulado5204000053039865404"
                               f"{amount:.2f}5802BR5913BENCAO DIARIA6008POA-LEGRE62070503***6304ABCD"
                               + uuid.uuid4().hex[:4].upper(),
                    "qr_code_base64": "",
                }
            },
        }
    body = {
        "transaction_amount": round(amount, 2),
        "description": f"Assinatura {plan} - Bencao Diaria",
        "payment_method_id": "pix",
        "external_reference": f"{user_id}:{plan}",
        "notification_url": f"{settings.APP_URL}/webhooks/mercadopago",
        "payer": {"email": payer_email or "cliente@bencaodiaria.app"},
    }
    if payer_phone:
        digits = payer_phone.lstrip("+")
        if digits.startswith("55") and len(digits) > 10:
            body["payer"]["phone"] = {"area_code": digits[2:4], "number": digits[4:]}
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.post(f"{MP_BASE}/v1/payments", headers=_headers(), json=body)
        data = r.json()
        if r.status_code >= 400:
            raise RuntimeError(f"MercadoPago error: {r.status_code} {data}")
        return data


async def create_card_preapproval(user_id: str, amount: float, plan: str,
                                  payer_email: str | None = None) -> dict:
    if dev_mode():
        return {
            "id": f"dev-pre-{uuid.uuid4().hex[:10]}",
            "status": "pending",
            "init_point": f"{settings.APP_URL}/obrigado?demo=cartao&user={user_id}",
            "sandbox_init_point": f"{settings.APP_URL}/obrigado?demo=cartao&user={user_id}",
        }
    body = {
        "reason": f"Bencao Diaria - plano {plan}",
        "external_reference": f"{user_id}:{plan}",
        "payer_email": payer_email or "cliente@bencaodiaria.app",
        "back_url": f"{settings.APP_URL}/obrigado?user={user_id}",
        "auto_recurring": {
            "frequency": 1,
            "frequency_type": "months",
            "transaction_amount": round(amount, 2),
            "currency_id": "BRL",
        },
        "notification_url": f"{settings.APP_URL}/webhooks/mercadopago",
    }
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.post(f"{MP_BASE}/preapproval", headers=_headers(), json=body)
        data = r.json()
        if r.status_code >= 400:
            raise RuntimeError(f"MercadoPago preapproval error: {r.status_code} {data}")
        return data


async def get_payment(mp_payment_id: str) -> dict:
    if dev_mode():
        return {"id": mp_payment_id, "status": "approved", "external_reference": "", "transaction_amount": 0}
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.get(f"{MP_BASE}/v1/payments/{mp_payment_id}", headers=_headers())
        return r.json()


async def get_preapproval(preapproval_id: str) -> dict:
    if dev_mode():
        return {"id": preapproval_id, "status": "authorized", "external_reference": ""}
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.get(f"{MP_BASE}/preapproval/{preapproval_id}", headers=_headers())
        return r.json()


def verify_mp_signature(headers: dict, data_id: str) -> bool:
    if not settings.MP_WEBHOOK_SECRET:
        return True
    x_signature = headers.get("x-signature") or headers.get("X-Signature")
    x_request_id = headers.get("x-request-id") or headers.get("X-Request-Id") or ""
    if not x_signature:
        return False
    parts = {}
    for chunk in x_signature.split(","):
        if "=" in chunk:
            k, v = chunk.split("=", 1)
            parts[k.strip()] = v.strip()
    ts = parts.get("ts")
    v1 = parts.get("v1")
    if not ts or not v1:
        return False
    manifest = f"id:{data_id};request-id:{x_request_id};ts:{ts};"
    expected = hmac.new(settings.MP_WEBHOOK_SECRET.encode(), manifest.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, v1)
