FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine as build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3333

ENTRYPOINT ["npm", "run", "start"]