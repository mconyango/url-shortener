"""create_main_tables
Revision ID: e8809b14ec06
Revises: 
Create Date: 2022-01-25 23:14:48.500452
"""

import sqlalchemy as sa
from alembic import op
# revision identifiers, used by Alembic
from sqlalchemy import text

revision = 'e8809b14ec06'
down_revision = None
branch_labels = None
depends_on = None


def create_items_table() -> None:
    op.create_table(
        "item",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("original_url", sa.String(500), nullable=False),
        sa.Column("url_code", sa.String(30), nullable=False, index=True,
                  comment="Slag"),
        sa.Column("created_at", sa.DateTime, nullable=False, server_default=text('now()')),
    )


def upgrade() -> None:
    create_items_table()


def downgrade() -> None:
    op.drop_table('item')
