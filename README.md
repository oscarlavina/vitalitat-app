# Vitalitat Quiropráctica – web (React + TypeScript + FastAPI)

Migración desde WordPress + Elementor Pro. Estado: **home**, header, footer y newsletter.

## Arranque local
```bash
# Backend (http://127.0.0.1:8000)
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements-dev.txt
cp .env.example .env   # rellena las claves de Mailchimp
.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000

# Frontend (http://127.0.0.1:5173, proxy /api -> backend)
cd frontend && npm install && npm run dev
```

## Validación
- Frontend: `npm run typecheck && npm run lint && npm test && npm run build`
- Backend: `.venv/bin/ruff check . && .venv/bin/pytest`

## Pendiente
Páginas: Quiropráctica, Para quién, Primera visita, Equipo, Contacto (formulario), Nota legal, Política de privacidad;
banner de cookies, SEO (sitemap, Open Graph), redirecciones 301 y despliegue.
