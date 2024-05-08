FROM python:3.12-slim

COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn", "main_router:app",  "--host", "0.0.0.0", "--port", "8000"]

# Для запуска введите:
# docker build . --tag air_tracking_app && docker run -p 8000:8000 air_tracking_app
