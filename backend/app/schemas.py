from typing import Optional

from pydantic import BaseModel, EmailStr, Field, ConfigDict


# ===========================
# USER SCHEMAS
# ===========================

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="User email address")


class UserCreate(UserBase):
    # password is REQUIRED and validated
    password: str = Field(
        ...,
        min_length=6,
        max_length=128,
        description="User password (min 6 characters)",
    )


class UserOut(UserBase):
    id: int

    # Pydantic v2 style: replaces orm_mode = True
    model_config = ConfigDict(from_attributes=True)


# Used internally when decoding token payload
class TokenData(BaseModel):
    user_id: Optional[int] = None


# ===========================
# AUTH TOKEN
# ===========================

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ===========================
# TODO SCHEMAS
# ===========================

class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)


class TodoCreate(TodoBase):
    """Data required to create a todo."""
    pass


class TodoUpdate(BaseModel):
    # All optional so you can send partial updates in PATCH
    title: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=255,
        description="Updated title for the todo",
    )
    completed: Optional[bool] = Field(
        default=None,
        description="Mark todo as completed or not",
    )


class TodoOut(TodoBase):
    id: int
    completed: bool

    model_config = ConfigDict(from_attributes=True)
