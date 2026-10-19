import hashlib
import logging
import re

import httpx

from .config import Settings

logger = logging.getLogger("vitalitat.newsletter")

_PREFIX_RE = re.compile(r"^[a-z]{2}\d{1,3}$")


class MailchimpError(Exception):
    """Fallo al suscribir; el detalle se registra en el servidor, nunca se envía al cliente."""


async def subscribe(email: str, settings: Settings, client: httpx.AsyncClient | None = None) -> None:
    if not settings.mailchimp_configured:
        raise MailchimpError("Mailchimp no está configurado")
    if not _PREFIX_RE.fullmatch(settings.mailchimp_server_prefix):
        raise MailchimpError("Prefijo de servidor Mailchimp inválido")

    # Mailchimp identifica al miembro por el MD5 del email (no se usa con fines de seguridad).
    member_hash = hashlib.md5(email.lower().encode(), usedforsecurity=False).hexdigest()
    url = (
        f"https://{settings.mailchimp_server_prefix}.api.mailchimp.com/3.0/"
        f"lists/{settings.mailchimp_audience_id}/members/{member_hash}"
    )
    payload = {"email_address": email, "status_if_new": "subscribed"}
    auth = ("anystring", settings.mailchimp_api_key.get_secret_value())

    owns_client = client is None
    client = client or httpx.AsyncClient(timeout=10.0)
    try:
        response = await client.put(url, json=payload, auth=auth)
    except httpx.HTTPError as exc:
        logger.error("Mailchimp request failed", extra={"error": type(exc).__name__})
        raise MailchimpError("Error de red con Mailchimp") from exc
    finally:
        if owns_client:
            await client.aclose()

    if response.status_code >= 400:
        logger.error("Mailchimp rejected request", extra={"status": response.status_code})
        raise MailchimpError("Mailchimp rechazó la solicitud")
