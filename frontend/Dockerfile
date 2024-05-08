# Используем официальный образ Node.js
FROM node:14-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build

# Используем минимальный образ Nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем собранные файлы React из предыдущего образа в директорию Nginx для раздачи
COPY --from=builder /app/build /usr/share/nginx/html

# Команда запуска Nginx в режиме демона при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
