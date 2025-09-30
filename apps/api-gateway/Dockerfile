# --- Builder stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only needed files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./
COPY prisma ./prisma
COPY . .

# Install dependencies and Nx
RUN npm install -g nx
RUN npm install

# Build api-gateway
RUN npx nx build api-gateway

# --- Runtime stage ---
FROM node:20-alpine
WORKDIR /app

# Copy built code
COPY --from=builder /app/dist/apps/api-gateway ./dist/apps/api-gateway

# Copy package.json to install prod deps
COPY package*.json ./

# Copy Prisma client
COPY ./generated/prisma /app/generated/prisma

# Install production deps
RUN npm install --omit=dev

# Start application
CMD ["node", "dist/apps/api-gateway/main.js"]
