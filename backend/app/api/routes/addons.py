from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.addon import Addon

router = APIRouter()

@router.get("")
async def list_addons(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Addon))
    return [a.__dict__ | {"_sa_instance_state": None} for a in res.scalars().all()]
