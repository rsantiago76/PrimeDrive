# Prime Drive — Futuristic Car Rental Platform (MVP + Enterprise Signals)

Prime Drive is a portfolio-ready, real-world car rental platform:
- **Frontend:** React + TypeScript (Vite) hosted on **AWS Amplify Hosting**
- **Backend:** Python **FastAPI** (async) + SQLAlchemy async
- **Database:** PostgreSQL (local via docker-compose)
- **Storage:** S3-style signed URL uploads (scaffold)
- **Payments:** Stripe **deposit + refunds tracking** (scaffold with idempotency + webhook placeholder)

## Key Features
### MVP
- Vehicle listings (make/model, location, daily rate, mileage, features)
- Date-based availability + blackout dates
- Booking flow + quote calculation
- Damage report workflow (photo uploads)
- Driver verification placeholder (document upload + status)
- Fleet owner dashboard (vehicles, bookings, reports)

### “Enterprise signal”
- Pricing engine: daily/weekly discounts + fees placeholder
- Add-ons: insurance, GPS, child seat (flat or per-day)
- Deposit + refunds tracking (Stripe PaymentIntent + Refund placeholders)

## Repo Structure
- `frontend/` — React UI (search, vehicle details, quote, checkout, owner dashboard)
- `backend/` — FastAPI API (pricing, bookings, payments/refunds, uploads)
- `seed/` — JSON seed data for vehicles & addons
- `amplify.yml` — Amplify build spec (builds `frontend/`)
- `docker-compose.yml` — local Postgres

## Local Dev
### 1) Database
```bash
docker compose up -d
```

### 2) Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 3) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Deploy (Amplify Hosting)
1. Push repo to GitHub
2. AWS Amplify → **Host web app**
3. Amplify uses `amplify.yml` (builds `frontend/`)
4. Set env var in Amplify:
   - `VITE_API_BASE_URL` (e.g. https://api.primedrive.example.com)

> Backend deploy separately (App Runner / ECS / Lambda container).

## Environment Variables
Frontend:
- `VITE_API_BASE_URL`

Backend:
- `DATABASE_URL`
- `FRONTEND_URL`
- `JWT_SECRET` (placeholder)
- `STRIPE_SECRET_KEY` (optional; scaffold runs without real Stripe)
- `STRIPE_WEBHOOK_SECRET` (optional; webhook verification placeholder)
