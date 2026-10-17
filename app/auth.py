from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer(auto_error=False)


def hash_password(pw: str) -> str:
    return pwd_context.hash(pw)


def verify_password(pw: str, hashed: str) -> bool:
    return pwd_context.verify(pw, hashed)


def create_token(subject: str, expires_minutes: int = 60 * 24) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    return jwt.encode({"sub": subject, "exp": exp}, settings.SECRET_KEY, algorithm="HS256")


def decode_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")


def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer)) -> str:
    if not creds:
        raise HTTPException(status_code=401, detail="Não autenticado")
    sub = decode_token(creds.credentials)
    if sub != settings.ADMIN_EMAIL:
        raise HTTPException(status_code=403, detail="Acesso negado")
    return sub
