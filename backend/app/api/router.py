from app.api.routes import vehicles, addons, bookings, payments, refunds, damage, owner, uploads, webhooks, verification

api_router = APIRouter()
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(addons.router, prefix="/addons", tags=["addons"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(refunds.router, prefix="/refunds", tags=["refunds"])
api_router.include_router(damage.router, prefix="/damage-reports", tags=["damage"])
api_router.include_router(owner.router, prefix="/owner", tags=["owner"])
api_router.include_router(uploads.router, tags=["uploads"])
api_router.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])
api_router.include_router(verification.router, prefix="/verification", tags=["verification"])
