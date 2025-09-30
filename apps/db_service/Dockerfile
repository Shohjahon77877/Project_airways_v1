# --- Builder stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only the necessary files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./
COPY . .

# Install dependencies and Nx
RUN npm install -g nx
RUN npm install

# Build db_service
RUN npx nx build db_service

# --- Runtime stage ---
FROM node:20-alpine

WORKDIR /app

# Copy built code
COPY --from=builder /app/dist/apps/db_service ./dist/apps/db_service
COPY package*.json ./

# Copy Prisma schema from root
COPY prisma ./prisma

# Generate Prisma client for Linux
RUN npx prisma generate --schema=./prisma/schema.prisma

# Install only production dependencies
RUN npm install --omit=dev

# Start db_service
CMD ["node", "dist/apps/db_service/main.js"]
