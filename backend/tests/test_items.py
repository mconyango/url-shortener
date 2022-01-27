import pytest
from fastapi import FastAPI
from httpx import AsyncClient
from starlette.status import (
    HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY
)

from app.schemas.item import ItemCreate

# decorate all tests with @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio


@pytest.fixture
def new_item():
    return ItemCreate(
        original_url="https://test.com",
    )


class TestUrlItemRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.get(app.url_path_for("list-url-items"))
        assert res.status_code != HTTP_404_NOT_FOUND
        res = await client.post(app.url_path_for("create-url-item"), json={})
        assert res.status_code != HTTP_404_NOT_FOUND

    async def test_invalid_input_raises_error(self, app: FastAPI, client: AsyncClient) -> None:
        res = await client.post(app.url_path_for("create-url-item"), json={'original_url': 'test.com'})
        assert res.status_code == HTTP_422_UNPROCESSABLE_ENTITY


class TestCreateUrlItem:
    async def test_valid_input_creates_item(
            self, app: FastAPI, client: AsyncClient, new_item: ItemCreate
    ) -> None:
        res = await client.post(
            app.url_path_for("create-url-item"), json=new_item.dict()
        )
        assert res.status_code == HTTP_201_CREATED
        created_item = ItemCreate(**res.json())
        assert created_item == new_item

    @pytest.mark.parametrize(
        "invalid_payload, status_code",
        (
                (None, 422),
                ({}, 422),
                ({"original_url": "test.com"}, 422),
                ({"original_url": ""}, 422),
        ),
    )
    async def test_invalid_input_raises_error(self, app: FastAPI, client: AsyncClient, invalid_payload: dict,
                                              status_code: int) -> None:
        res = await client.post(
            app.url_path_for("create-url-item"), json=invalid_payload
        )
        assert res.status_code == status_code
