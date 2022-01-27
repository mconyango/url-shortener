import datetime
from hashlib import md5
from typing import List

from app.db.repositories.base import BaseRepository
from app.schemas.item import ItemCreate, ItemInPublic, ItemInDB

CREATE_ITEM_QUERY = """
    INSERT INTO item (original_url, url_code,created_at)
    VALUES (:original_url, :url_code, :created_at)
    RETURNING id, original_url, url_code, created_at;
"""
GET_ITEM_BY_ID_QUERY = """
    SELECT id, original_url, url_code, created_at
    FROM item
    WHERE id = :id;
"""
GET_ITEM_BY_CODE_QUERY = """
    SELECT id, original_url, url_code, created_at
    FROM item
    WHERE url_code = :url_code;
"""
GET_ALL_ITEMS_QUERY = """
    SELECT id, original_url, url_code, created_at  
    FROM item
    ORDER BY id DESC;  
"""
DELETE_ITEM_BY_ID_QUERY = """
    DELETE FROM item  
    WHERE id = :id  
    RETURNING id;  
"""


class ItemRepository(BaseRepository):
    """"
    All database actions associated with the item resource
    """

    async def create_item(self, new_item: ItemCreate) -> ItemInPublic:
        query_values = new_item.dict()
        url_code = md5(new_item.original_url.encode()).hexdigest()[:6]
        query_values['url_code'] = url_code
        query_values['created_at'] = datetime.datetime.utcnow()
        item = await self.db.fetch_one(query=CREATE_ITEM_QUERY, values=query_values)
        return ItemInPublic(**item)

    async def get_item_by_id(self, *, item_id: int) -> (ItemInDB, None):
        item = await self.db.fetch_one(
            query=GET_ITEM_BY_ID_QUERY,
            values={"id": item_id},
        )
        if not item:
            return None
        return ItemInDB(**item)

    async def get_item_by_code(self, *, item_code: str) -> (ItemInDB, None):
        item = await self.db.fetch_one(
            query=GET_ITEM_BY_CODE_QUERY,
            values={"url_code": item_code},
        )
        if not item:
            return None
        return ItemInDB(**item)

    async def get_all_items(self) -> List[ItemInPublic]:
        url_items = await self.db.fetch_all(
            query=GET_ALL_ITEMS_QUERY,
        )
        return [ItemInPublic(**l) for l in url_items]

    async def delete_item_by_id(self, *, item_id: int) -> (int, None):
        item = await self.get_item_by_id(item_id=item_id)
        if not item:
            return None
        deleted_id = await self.db.execute(
            query=DELETE_ITEM_BY_ID_QUERY,
            values={"id": item_id},
        )
        return deleted_id
