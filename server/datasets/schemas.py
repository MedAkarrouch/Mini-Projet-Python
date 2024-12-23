from pydantic import BaseModel, Json
from typing import Optional,List
from datetime import datetime


class Datasets(BaseModel):
    id: int
    name: str
    created_at: datetime
    user_id: int

    class Config:
        orm_mode = True


        

class AddDataset(BaseModel):
    name: str
    target_name: str
    external: bool
    external_library: Optional[str] = None  # Optional, defaults to None if not provided
    external_library_dataset_name: Optional[str] = None  # Optional, defaults to None if not provided


class VisualizationRequest(BaseModel):
    library: str  # 'matplotlib' or 'seaborn'
    dimension: str  # '2D' or '3D'
    diagram: str  # Chart type
    x_values: List[float]  # X-axis column
    x_label: str  # X-axis column
    y_values: List[float] = None  # Y-axis column
    y_label: str = None  # Y-axis column
    z_values: List[float] = None   # Optional Z-axis column (3D only)
    z_label: str = None  # Optional Z-axis column (3D only)