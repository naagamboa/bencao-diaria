from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.auth import require_admin
from app.models import Content
from app.schemas import ContentIn

router = APIRouter(prefix="/content", tags=["content"])


@router.post("")
def create_content(body: ContentIn, admin=Depends(require_admin), db: Session = Depends(get_db)):
    c = Content(**body.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return {"id": c.id, "day_index": c.day_index}


@router.get("")
def list_content(db: Session = Depends(get_db), limit: int = 50, offset: int = 0):
    rows = db.query(Content).order_by(Content.day_index).offset(offset).limit(limit).all()
    return [{"id": c.id, "day_index": c.day_index, "title": c.title, "verse_ref": c.verse_ref} for c in rows]


@router.delete("/{content_id}")
def delete_content(content_id: str, admin=Depends(require_admin), db: Session = Depends(get_db)):
    c = db.get(Content, content_id)
    if not c:
        raise HTTPException(404, "não encontrado")
    db.delete(c)
    db.commit()
    return {"ok": True}
