# Устанавливаем базовый образ с Node.js 22 для сборки приложения
FROM node:22 AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код приложения в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Используем базовый образ с Nginx для финального этапа
FROM nginx:alpine

# Добавляем конфигурацию Nginx для поддержки SPA
# COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; try_files \$uri \$uri/ /index.html?\$args; } }" > /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из предыдущего этапа в директорию Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Экспонируем порт для Nginx
EXPOSE 80

# Команда по умолчанию для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]
