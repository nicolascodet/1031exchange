from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, index=True)
    location = Column(String, index=True)
    price = Column(Float)
    description = Column(String, nullable=True)
    property_type = Column(String)
    square_footage = Column(Float)
    year_built = Column(Integer)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Float, nullable=True)
    status = Column(String, default="available")
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    owner = relationship("User", back_populates="properties")
    exchanges_as_relinquished = relationship("Exchange", back_populates="relinquished_property", foreign_keys="[Exchange.relinquished_property_id]") 