from fastapi import APIRouter

from .endpoints.item import router as cleanings_router

router = APIRouter()
router.include_router(cleanings_router, tags=["URL Items"])
# api_router.include_router(login.router,prefix="/users", tags=["login"])
