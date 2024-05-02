FROM python:3.12-slim

COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn", "main_router:app", "--host", "0.0.0.0", "--port", "80"]

# Для запуска введите:
# docker build . --tag air_tracking_app && docker run -p 80:80 air_tracking_app
