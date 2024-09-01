from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from src.models import enums

class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class TokenResponseSchema(BaseModel):
    access_token: str
    name: str
    role: str


class BookBase(BaseModel):
    title: str
    author: str
    description: Optional[str] = None
    genre: Optional[enums.BookGenre] = None
    publish_date: Optional[date] = None
    total_copies: int
    available_copies: int

    class Config:
        use_enum_values = True

class UpdateBookRequestSchema(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[enums.BookGenre] = None
    publish_date: Optional[date] = None
    total_copies: Optional[int] = None
    available_copies: Optional[int] = None

class BookResponseSchema(BookBase):
    book_id: int

    class Config:
        orm_mode = True


class CheckoutRequestSchema(BaseModel):
    book_id: int
    user_id: int
    collected_date: date
    due_date: date

class ReturnRequestSchema(BaseModel):
    transaction_id: int
    return_date: date

class BookTransactionResponseSchema(BaseModel):
    transaction_id: int
    book_id: int
    user_id: int
    collected_date: date
    due_date: date
    return_date: Optional[date]
    status: enums.BookTransactionStatus

    class Config:
        orm_mode = True
        from_attributes=True


class UserBooksSchema(BaseModel):
    transaction_id: int
    book_id: int
    user_id: int
    collected_date: date
    due_date: date
    return_date: Optional[date]
    status: enums.BookTransactionStatus
    book: BookBase

    class Config:
        orm_mode = True
        from_attributes=True