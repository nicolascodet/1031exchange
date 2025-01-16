from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, properties, exchanges

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(properties.router, prefix="/properties", tags=["properties"])
api_router.include_router(exchanges.router, prefix="/exchanges", tags=["exchanges"]) 