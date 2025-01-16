from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PropertyBase(BaseModel):
    address: str
    location: str
    price: float
    description: Optional[str] = None
    property_type: str
    square_footage: float
    year_built: int
    bedrooms: Optional[int] = None
    bathrooms: Optional[float] = None
    status: str = "available"

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(PropertyBase):
    pass

class Property(PropertyBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 