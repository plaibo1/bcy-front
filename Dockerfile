FROM node:22 AS builder
WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

RUN echo "server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; try_files \$uri \$uri/ /index.html?\$args; } }" > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html