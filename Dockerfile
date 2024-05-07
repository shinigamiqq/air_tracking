# Используем базовый образ для Python и Node.js
FROM python:3.12-slim AS backend
FROM node:latest AS frontend

# Установка зависимостей для бэкенда
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копирование файлов бэкенда
COPY . .

# Установка зависимостей для фронтенда
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install

# Копирование файлов фронтенда
COPY frontend .

# Запуск бэкенда
WORKDIR /backend
CMD ["uvicorn", "main_router:app", "--host", "0.0.0.0", "--port", "8000"]

# Запуск фронтенда
WORKDIR /frontend
CMD ["npm", "start"]

# Для запуска введите:
# docker build . --tag air_tracking_app && docker run -p 80:80 air_tracking_app
