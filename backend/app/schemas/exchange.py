from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ExchangeBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    relinquished_property_id: int
    replacement_property_ids: List[int] = []
    exchange_period_days: int = 45
    identification_period_days: int = 45

class ExchangeCreate(ExchangeBase):
    pass

class ExchangeUpdate(ExchangeBase):
    pass

class Exchange(ExchangeBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 