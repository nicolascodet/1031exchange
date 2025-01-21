# Import all the models, so that Base has them before being imported by Alembic
from app.db.base_class import Base

# Import all models here for Alembic
from app.models.user import User
from app.models.property import Property
from app.models.exchange import Exchange

# Make them available for importing from this module
__all__ = ["Base", "User", "Property", "Exchange"] 