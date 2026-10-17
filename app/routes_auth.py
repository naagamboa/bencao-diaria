from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
from app.schemas import AdminLoginIn, TokenOut
from app.auth import verify_password, create_token, hash_password
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/admin/login", response_model=TokenOut)
def admin_login(body: AdminLoginIn):
    if body.email != settings.ADMIN_EMAIL or body.password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return TokenOut(access_token=create_token(body.email))
