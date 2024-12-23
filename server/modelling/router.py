import base64
from fastapi import APIRouter, Request
from fastapi.responses import FileResponse, JSONResponse,StreamingResponse
from modelling.schemas import DownloadPdfFile, TrainModel
from fastapi import Depends
from auth.dependencies import protect
from modelling.model import Model
from utils.pdf import PDF
import tempfile


router = APIRouter()

@router.post("/")
async def train(data : TrainModel,user = Depends(protect)):
  # Get Data
  model = Model(
    model_name = data.model_name,
    target_name = data.target_name,
    task = data.task,
    data = data.dataset,
    **data.parameters
  )
# Generate PDF
  pdf_generator = PDF()
  pdf_buffer = pdf_generator.generate_pdf(model.visualizations,data.model_name,data.task,data.parameters)
  # Save PDF to a temporary file
  with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
    tmp_file.write(pdf_buffer.getvalue())
    tmp_file_path = tmp_file.name

    # Return the file as a response
  return FileResponse(
      path=tmp_file_path,
      filename="report.pdf",  # The file name to be used by the browser
      media_type="application/pdf"
    )
  # return JSONResponse(status_code=200 , content= {
  #   "metrics" : model.metrics,
  #   "visualizations" : model.visualizations,
  #   "pdf" : pdf_buffer
  # })



# @router.post("/download-pdf/")
# async def download_pdf(data :DownloadPdfFile):
#     pdf_buffer = generate_pdf(data["visualizations"])
#     return StreamingResponse(pdf_buffer, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=visualizations.pdf"})
