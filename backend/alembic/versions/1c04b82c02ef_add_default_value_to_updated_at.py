"""add default value to updated_at

Revision ID: 1c04b82c02ef
Revises: da6b4a9c803f
Create Date: 2025-01-20 22:20:03.852310

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1c04b82c02ef'
down_revision: Union[str, None] = 'da6b4a9c803f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('properties', sa.Column('location', sa.String(), nullable=True))
    op.create_index(op.f('ix_properties_location'), 'properties', ['location'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_properties_location'), table_name='properties')
    op.drop_column('properties', 'location')
    # ### end Alembic commands ###
