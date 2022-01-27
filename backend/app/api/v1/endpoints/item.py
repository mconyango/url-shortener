from typing import List

from fastapi import APIRouter, Body, Depends, HTTPException
from starlette import status
from starlette.responses import RedirectResponse
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from ....schemas.item import ItemCreate, ItemInPublic
from ....db.repositories.item import ItemRepository
from ..deps import get_repository

router = APIRouter()


@router.get("/", summary='get all shortened URLs')
async def get_urls(items_repo: ItemRepository = Depends(get_repository(ItemRepository))) -> List[ItemInPublic]:
    return await items_repo.get_all_items()


@router.post("/", response_model=ItemInPublic, summary="Create a URL item", status_code=HTTP_201_CREATED)
async def create_new_item(
        new_item: ItemCreate = Body(..., embed=False),
        items_repo: ItemRepository = Depends(get_repository(ItemRepository)),
) -> ItemInPublic:
    created_item = await items_repo.create_item(new_item)
    return created_item


@router.get("/{item_code}/", response_model=ItemInPublic, summary="Get URL item by Code")
async def get_item_by_code(item_code: str,
                           items_repo: ItemRepository = Depends(get_repository(ItemRepository))) -> RedirectResponse:
    item = await items_repo.get_item_by_code(item_code=item_code)
    if not item:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="No URL item found with that code.")

    return RedirectResponse(url=item.original_url, status_code=status.HTTP_303_SEE_OTHER)


@router.delete("/{item_id}/", response_model=int, summary="Delete a created URL item")
async def delete_item_by_id(
        item_id: int,
        items_repo: ItemRepository = Depends(get_repository(ItemRepository)),
) -> int:
    deleted_id = await items_repo.delete_item_by_id(item_id=item_id)
    if not deleted_id:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No URL item found with that id.",
        )
    return deleted_id
