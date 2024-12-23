from pydantic import BaseModel, Json
from typing import Optional,List

class TrainModel(BaseModel):
    model_name: str
    dataset: dict
    parameters : dict 
    task : str
    target_name : Optional[str] = None
class DownloadPdfFile(BaseModel):
    visualizations : dict