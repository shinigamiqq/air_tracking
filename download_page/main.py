from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
import pdfkit

app = APIRouter()

class PDFRequest(BaseModel):
    url: str


@app.get("/generate_pdf/{request}")
async def generate_pdf(request: str):
    config_path = '/home/alex_mcqueen2/myenv/lib/python3.12/site-packages/wkhtmltopdf'
    config = pdfkit.configuration(wkhtmltopdf=config_path)
    pdfkit.from_url('google.com', 'out.pdf', configuration=config)