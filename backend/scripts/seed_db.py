from __future__ import annotations

import argparse
import json
import os
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

# Local imports
from app.core.config import settings
from app.db.init_db import create_all
from app.models.vehicle import Vehicle
from app.models.addon import Addon


ROOT = Path(__file__).resolve().parents[2]  # repo root
SEED_DIR = ROOT / "seed"


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


async def upsert_vehicles(session, vehicles: list[dict]) -> int:
    count = 0
    for v in vehicles:
        obj = await session.get(Vehicle, v["id"])
        if obj:
            # update fields
            for k, val in v.items():
                setattr(obj, k, val)
        else:
            obj = Vehicle(**v)
            session.add(obj)
            count += 1
    return count


async def upsert_addons(session, addons: list[dict]) -> int:
    count = 0
    for a in addons:
        obj = await session.get(Addon, a["id"])
        if obj:
            for k, val in a.items():
                setattr(obj, k, val)
        else:
            obj = Addon(**a)
            session.add(obj)
            count += 1
    return count


async def main(reset: bool = False) -> None:
    # Use DATABASE_URL from .env (preferred) or env var, fallback to settings default
    db_url = os.getenv("DATABASE_URL", settings.database_url)
    engine = create_async_engine(db_url, future=True, echo=False)
    SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

    # Create tables
    await create_all(engine)

    vehicles_path = SEED_DIR / "vehicles.json"
    addons_path = SEED_DIR / "addons.json"

    if not vehicles_path.exists():
        raise SystemExit(f"Missing seed file: {vehicles_path}")
    if not addons_path.exists():
        raise SystemExit(f"Missing seed file: {addons_path}")

    vehicles = load_json(vehicles_path)
    addons = load_json(addons_path)

    async with SessionLocal() as session:
        # optional reset (delete all rows)
        if reset:
            # Delete in safe order (children first). Currently only base tables exist.
            await session.execute("DELETE FROM refunds")
            await session.execute("DELETE FROM payments")
            await session.execute("DELETE FROM damage_reports")
            await session.execute("DELETE FROM bookings")
            await session.execute("DELETE FROM addons")
            await session.execute("DELETE FROM vehicles")

        inserted_v = await upsert_vehicles(session, vehicles)
        inserted_a = await upsert_addons(session, addons)

        await session.commit()

    # quick counts
    async with SessionLocal() as session:
        v_count = (await session.execute(select(Vehicle))).scalars().all()
        a_count = (await session.execute(select(Addon))).scalars().all()

    print("Seed complete.")
    print(f"Vehicles: {len(v_count)} (new inserted: {inserted_v})")
    print(f"Add-ons:  {len(a_count)} (new inserted: {inserted_a})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed Prime Drive database from /seed JSON files.")
    parser.add_argument("--reset", action="store_true", help="Delete existing rows before seeding")
    args = parser.parse_args()
    import asyncio
    asyncio.run(main(reset=args.reset))
