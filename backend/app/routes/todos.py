from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import schemas, crud
from ..auth import get_current_user

router = APIRouter(prefix="", tags=["todos"])

@router.get("/me", response_model=schemas.UserOut)
def get_profile(current_user=Depends(get_current_user)):
    return current_user

@router.get("/todos", response_model=List[schemas.TodoOut])
def list_todos(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.get_todos_for_user(db, current_user.id)

@router.post("/todos", response_model=schemas.TodoOut)
def create_todo(todo_in: schemas.TodoCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.create_todo(db, current_user.id, todo_in.title)

@router.patch("/todos/{todo_id}", response_model=schemas.TodoOut)
def patch_todo(todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    todo = crud.update_todo(db, todo_id, current_user.id, todo_update.dict())
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.delete("/todos/{todo_id}", status_code=204)
def delete_todo_endpoint(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    ok = crud.delete_todo(db, todo_id, current_user.id)
    if not ok:
        raise HTTPException(status_code=404, detail="Todo not found")
    return  # 204 No Content

