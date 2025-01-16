from typing import List, Optional, Dict, Any
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.exchange import Exchange
from app.schemas.exchange import ExchangeCreate, ExchangeUpdate

class CRUDExchange(CRUDBase[Exchange, ExchangeCreate, ExchangeUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: ExchangeCreate, owner_id: int
    ) -> Exchange:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Exchange]:
        return (
            db.query(self.model)
            .filter(Exchange.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update(
        self,
        db: Session,
        *,
        db_obj: Exchange,
        obj_in: ExchangeUpdate | Dict[str, Any]
    ) -> Exchange:
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

exchange = CRUDExchange(Exchange) 