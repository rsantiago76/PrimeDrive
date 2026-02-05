## Seeding (script included)

This repo includes:
- `seed/vehicles.json`
- `seed/addons.json`
- `backend/scripts/seed_db.py` (loader)

### Steps
1) Start Postgres
```bash
docker compose up -d
```

2) Create venv + install deps
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

3) Run the seed loader
```bash
python -m app.main  # optional (not required for seeding)
python scripts/seed_db.py
```

Optional reset (wipe tables then seed):
```bash
python scripts/seed_db.py --reset
```

### Notes
- This uses `Base.metadata.create_all` to create tables automatically for demo/portfolio purposes.
- For production systems, prefer Alembic migrations.
