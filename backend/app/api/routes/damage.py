from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.services.damage import DamageService
from app.schemas.damage_report import DamageReport, DamageReportCreate, DamageReportUpdate

router = APIRouter()

@router.post("/", response_model=DamageReport)
async def create_damage_report(
    report_data: DamageReportCreate,
    user_id: str = "demo-user", # Mock auth
    db: AsyncSession = Depends(get_db)
):
    try:
        return await DamageService.create_report(db, report_data, user_id)
    except Exception as e:
        # In real app handle validation errors from service
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[DamageReport])
async def list_damage_reports(
    role: str = "DRIVER", # Mock auth role
    user_id: str = "demo-user", # Mock auth
    db: AsyncSession = Depends(get_db)
):
    return await DamageService.get_reports(db, user_id, role)

@router.patch("/{report_id}", response_model=DamageReport)
async def update_damage_report(
    report_id: str,
    update_data: DamageReportUpdate,
    db: AsyncSession = Depends(get_db)
):
    report = await DamageService.update_status(db, report_id, update_data)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await db.commit()
    return report
