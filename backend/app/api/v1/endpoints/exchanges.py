from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Exchange])
def read_exchanges(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve exchanges.
    """
    exchanges = crud.exchange.get_multi(db, skip=skip, limit=limit)
    return exchanges

@router.post("/", response_model=schemas.Exchange)
def create_exchange(
    *,
    db: Session = Depends(deps.get_db),
    exchange_in: schemas.ExchangeCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new exchange.
    """
    exchange = crud.exchange.create_with_owner(
        db=db, obj_in=exchange_in, owner_id=current_user.id
    )
    return exchange

@router.get("/{exchange_id}", response_model=schemas.Exchange)
def read_exchange(
    *,
    db: Session = Depends(deps.get_db),
    exchange_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get exchange by ID.
    """
    exchange = crud.exchange.get(db=db, id=exchange_id)
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")
    return exchange

@router.put("/{exchange_id}", response_model=schemas.Exchange)
def update_exchange(
    *,
    db: Session = Depends(deps.get_db),
    exchange_id: int,
    exchange_in: schemas.ExchangeUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an exchange.
    """
    exchange = crud.exchange.get(db=db, id=exchange_id)
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")
    if not crud.user.is_superuser(current_user) and (exchange.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    exchange = crud.exchange.update(db=db, db_obj=exchange, obj_in=exchange_in)
    return exchange

@router.delete("/{exchange_id}", response_model=schemas.Exchange)
def delete_exchange(
    *,
    db: Session = Depends(deps.get_db),
    exchange_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an exchange.
    """
    exchange = crud.exchange.get(db=db, id=exchange_id)
    if not exchange:
        raise HTTPException(status_code=404, detail="Exchange not found")
    if not crud.user.is_superuser(current_user) and (exchange.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    exchange = crud.exchange.remove(db=db, id=exchange_id)
    return exchange 