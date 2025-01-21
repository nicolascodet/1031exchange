from sqlalchemy.orm import Session

# Import base and engine first
from app.db.base_class import Base
from app.db.session import engine, SessionLocal

# Import models to ensure they are registered with Base
from app.models.user import User
from app.models.property import Property
from app.models.exchange import Exchange

# Import other dependencies
from app import crud, schemas
from app.core.config import settings

def init_test_db() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Create superuser if it doesn't exist
        user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
        if not user:
            user_in = schemas.UserCreate(
                email=settings.FIRST_SUPERUSER,
                password=settings.FIRST_SUPERUSER_PASSWORD,
                full_name="Initial Admin",
                is_superuser=True,
            )
            crud.user.create(db, obj_in=user_in)
            print("Superuser created successfully")
        else:
            print("Superuser already exists")
            
    finally:
        db.close()

if __name__ == "__main__":
    print("Initializing test database...")
    init_test_db()
    print("Database initialization completed") 