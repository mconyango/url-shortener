from typing import Any
from pydantic import HttpUrl

from app.schemas.core import IDModelMixin, CoreModel


# Shared properties
class ItemBase(CoreModel):
    """
    All common characteristics of item resource
    """
    original_url: HttpUrl


# Properties to receive on item creation
class ItemCreate(ItemBase):
    pass


# Properties shared by models stored in DB
class ItemInDBBase(IDModelMixin, ItemBase):
    original_url: str
    url_code: str
    created_at: Any


# Properties to return to client
class ItemInPublic(ItemInDBBase):
    pass


# Properties stored in DB
class ItemInDB(ItemInDBBase):
    pass
