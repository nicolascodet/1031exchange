from typing import List, Dict, Any, Optional
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate

class CRUDProperty(CRUDBase[Property, PropertyCreate, PropertyUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: PropertyCreate, owner_id: int
    ) -> Property:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Property]:
        return (
            db.query(self.model)
            .filter(Property.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_available_properties(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Property]:
        return (
            db.query(self.model)
            .filter(Property.status == "available")
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update(
        self,
        db: Session,
        *,
        db_obj: Property,
        obj_in: PropertyUpdate | Dict[str, Any]
    ) -> Property:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

property = CRUDProperty(Property) 