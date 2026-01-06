FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY --from=builder /app/dist ./dist
RUN npm ci --omit=dev || npm install --production
EXPOSE 3000
CMD ["node","dist/main.js"]
