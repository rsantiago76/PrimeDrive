from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncEngine

from app.models.base import Base

# Import models so they register with Base.metadata
from app.models.vehicle import Vehicle  # noqa: F401
from app.models.addon import Addon  # noqa: F401
from app.models.booking import Booking  # noqa: F401
from app.models.payment import Payment  # noqa: F401
from app.models.refund import Refund  # noqa: F401
from app.models.damage_report import DamageReport  # noqa: F401


async def create_all(engine: AsyncEngine) -> None:
    """Create tables directly from SQLAlchemy metadata.
    For production, use Alembic migrations. For demos/portfolio, this is fine.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
