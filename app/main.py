from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine, ensure_schema
from app.config import settings
from app.scheduler import start_scheduler
from app.routes_auth import router as auth_router
from app.routes_users import router as users_router
from app.routes_webhooks import router as webhooks_router
from app.routes_admin import router as admin_router
from app.routes_content import router as content_router

Base.metadata.create_all(bind=engine)
ensure_schema()

scheduler = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global scheduler
    scheduler = start_scheduler()
    yield
    if scheduler:
        scheduler.shutdown(wait=False)


app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(webhooks_router)
app.include_router(admin_router)
app.include_router(content_router)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def landing():
    return FileResponse("static/landing.html")


@app.get("/obrigado")
def obrigado():
    return FileResponse("static/obrigado.html")


@app.get("/privacidade")
def privacidade():
    return FileResponse("static/privacidade.html")


@app.get("/admin")
def admin_panel():
    return FileResponse("static/admin.html")


@app.get("/health")
def health():
    return {"status": "ok", "app": settings.APP_NAME}
