import httpx
import pytest
from fastapi.testclient import TestClient

from app import main
from app.config import Settings, get_settings
from app.mailchimp import MailchimpError, subscribe


def configured() -> Settings:
    return Settings(
        mailchimp_api_key="k-us21",
        mailchimp_audience_id="abc123",
        mailchimp_server_prefix="us21",
    )


@pytest.fixture(autouse=True)
def reset_limiter():
    main.limiter.reset()


@pytest.fixture
def client():
    return TestClient(main.app)


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


def test_newsletter_rechaza_email_invalido(client):
    assert client.post("/api/newsletter", json={"email": "no-es-email"}).status_code == 422


def test_newsletter_ok(client, monkeypatch):
    async def fake(email, settings, client=None):
        assert email == "a@example.com"

    monkeypatch.setattr(main, "subscribe", fake)
    r = client.post("/api/newsletter", json={"email": "a@example.com"})
    assert r.status_code == 201


def test_newsletter_error_no_filtra_detalles(client, monkeypatch):
    async def fake(email, settings, client=None):
        raise MailchimpError("clave secreta xyz")

    monkeypatch.setattr(main, "subscribe", fake)
    r = client.post("/api/newsletter", json={"email": "a@example.com"})
    assert r.status_code == 502
    assert "xyz" not in r.text


def test_newsletter_rate_limit(client, monkeypatch):
    async def fake(email, settings, client=None):
        return None

    monkeypatch.setattr(main, "subscribe", fake)
    codes = [client.post("/api/newsletter", json={"email": "a@example.com"}).status_code for _ in range(6)]
    assert codes[:5] == [201] * 5
    assert codes[5] == 429


@pytest.mark.asyncio
async def test_subscribe_llama_a_mailchimp():
    seen = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["url"] = str(request.url)
        seen["method"] = request.method
        return httpx.Response(200, json={})

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as c:
        await subscribe("A@Example.com", configured(), c)
    assert seen["method"] == "PUT"
    assert seen["url"].startswith("https://us21.api.mailchimp.com/3.0/lists/abc123/members/")


@pytest.mark.asyncio
async def test_subscribe_sin_configurar():
    with pytest.raises(MailchimpError):
        await subscribe("a@example.com", Settings())


@pytest.mark.asyncio
async def test_subscribe_prefijo_invalido():
    s = configured()
    s.mailchimp_server_prefix = "evil.com/x"
    with pytest.raises(MailchimpError):
        await subscribe("a@example.com", s)


def test_get_settings_cacheado():
    assert get_settings() is get_settings()
