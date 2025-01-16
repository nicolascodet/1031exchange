from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base

class Exchange(Base):
    __tablename__ = "exchanges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    status = Column(String, default="pending")
    relinquished_property_id = Column(Integer, ForeignKey("properties.id"))
    replacement_property_ids = Column(ARRAY(Integer))
    exchange_period_days = Column(Integer, default=45)
    identification_period_days = Column(Integer, default=45)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="exchanges")
    relinquished_property = relationship("Property", back_populates="exchanges_as_relinquished", foreign_keys=[relinquished_property_id]) 