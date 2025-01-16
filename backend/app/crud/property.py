from typing import List, Optional, Union, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.crud.base import CRUDBase
from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate

class CRUDProperty(CRUDBase[Property, PropertyCreate, PropertyUpdate]):
    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
        property_type: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        location: Optional[str] = None,
    ) -> List[Property]:
        query = db.query(self.model)
        
        if property_type:
            query = query.filter(self.model.property_type == property_type)
        
        if min_price is not None:
            query = query.filter(self.model.price >= min_price)
        
        if max_price is not None:
            query = query.filter(self.model.price <= max_price)
        
        if location:
            query = query.filter(
                or_(
                    self.model.location.ilike(f"%{location}%"),
                )
            )
        
        return query.offset(skip).limit(limit).all()

    def create(
        self,
        db: Session,
        *,
        obj_in: PropertyCreate
    ) -> Property:
        db_obj = Property(
            title=obj_in.title,
            description=obj_in.description,
            location=obj_in.location,
            price=obj_in.price,
            square_footage=obj_in.square_footage,
            property_type=obj_in.property_type,
            year_built=obj_in.year_built,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Property,
        obj_in: Union[PropertyUpdate, Dict[str, Any]]
    ) -> Property:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

property = CRUDProperty(Property) 