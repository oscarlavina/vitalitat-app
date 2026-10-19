import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .config import get_settings
from .mailchimp import MailchimpError, subscribe

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("vitalitat")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Vitalitat API", docs_url=None, redoc_url=None, openapi_url=None)
app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class NewsletterRequest(BaseModel):
    email: EmailStr


@app.exception_handler(RateLimitExceeded)
async def rate_limited(_: Request, __: RateLimitExceeded) -> JSONResponse:
    return JSONResponse({"error": "Demasiadas solicitudes"}, status_code=429)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/newsletter", status_code=201)
@limiter.limit("5/minute")
async def newsletter(request: Request, body: NewsletterRequest) -> JSONResponse:
    try:
        await subscribe(body.email, get_settings())
    except MailchimpError:
        return JSONResponse({"error": "No se pudo completar la suscripción"}, status_code=502)
    return JSONResponse({"status": "subscribed"}, status_code=201)
