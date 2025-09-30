# ✈️ My Airways Backend

## 1. Project Overview

This project is a **high-performance, scalable microservices backend** built with **NestJS** inside an **NX Monorepo**.  
It powers an airline booking and management system through **decoupled services**, communicating primarily via **RabbitMQ**.

---

### ✅ Implemented Bonus Features (Exceeding Requirements)

| Feature                    | Technology        | Bonus Points |
| -------------------------- | ----------------- | ------------ |
| Microservices Architecture | NestJS + RabbitMQ | +20 Points   |
| Distributed Caching        | Redis             | +5 Points    |

---

### 🔑 Core Technologies

| Feature       | Technology | Purpose                                                                     |
| ------------- | ---------- | --------------------------------------------------------------------------- |
| Monorepo      | NX         | Manages 15+ services and shared libraries with unified tooling.             |
| Framework     | NestJS     | Robust, scalable, TypeScript-first backend framework.                       |
| Communication | RabbitMQ   | Central message broker for inter-service communication (`@MessagePattern`). |
| Database      | Prisma     | Type-safe ORM. Prisma services are shared across the monorepo.              |
| Security      | JWT/Guards | Token-based authentication handled by `auth_service`.                       |

---

## 2. Microservices Architecture

The system is composed of ~15 services, segmented into **functional domains**.

### 📡 Communication Flow

- **API Gateway** → only service exposed to the internet (HTTP). Routes requests to microservices via RabbitMQ.
- **Internal Services** → communicate asynchronously via RabbitMQ or synchronously via NestJS clients.

---

### 🧩 Core Service Domains

| Service             | Responsibility                                | Key Endpoints/Actions                 |
| ------------------- | --------------------------------------------- | ------------------------------------- |
| **api-gateway**     | Entry point (HTTP → RabbitMQ).                | `/api/auth/login`, `/api/flights`     |
| **auth_service**    | Identity, tokens, login.                      | `admin_login`, `user_login`, `logout` |
| **users_service**   | User management (CRUD, profiles).             | `user_register`, profile updates      |
| **admin_service**   | Admin-specific privileged operations.         | Manage users, system settings         |
| **db_service**      | Central query engine (7 domains).             | Complex data queries                  |
| **flight_service**  | Manages flight schedules, seat maps, pricing. | Flight search, fare calculations      |
| **ticket_service**  | Reservations/tickets.                         | `issue_ticket`, `cancel_ticket`       |
| **loyalty_service** | Rewards, frequent flyer program.              | `get_points`, `redeem_reward`         |
| **news_service**    | News, announcements, promotions.              | `get_latest_news`, admin articles     |
| **reviews_service** | Flight & service feedback.                    | `submit_review`, `get_ratings`        |

---

## 3. Shared Libraries (`libs/` Folder)

The **NX monorepo** places reusable code in `libs/`, ensuring **consistency** and preventing duplication.

| Library             | Purpose                    | Key Contents                                 |
| ------------------- | -------------------------- | -------------------------------------------- |
| **shared-services** | Core service utilities     | `PrismaService`, `TokenService` (JWT/Redis). |
| **shared-dto**      | DTOs (validation schemas). | `CreateUserDto`, `CreateAdminDto`, etc.      |
| **shared-utils**    | Common utilities.          | `PasswordUtil` (hashing/compare).            |

---

## 4. 🔐 Authentication & Security Flow

### Token Service Logic (`TokenService`)

- **Access Tokens** → short-lived, used for securing API requests.
- **Refresh Tokens** → long-lived, used to request new access tokens.
- **Redis Cache** → persists both tokens for **revocation** (logout) and validation.

---

### Example: **Admin Login Flow**

1. API Gateway sends `cmd: 'admin_login'` to `auth_service`.
2. `auth_service` uses `PrismaService` to find the admin.
3. `PasswordUtil` compares hashed password.
4. If valid → `TokenService.generateTokens(userId)` issues new **Access** + **Refresh** tokens.
5. Tokens are cached in **Redis** and returned to API Gateway → frontend.

---

### Guards

Other services use **NestJS Guards** to protect routes.  
Example → in `ticket_service`, a Guard checks Access Token with `TokenService` before allowing reservation actions.

---

## 5. 🚀 Getting Started

### Essential Setup Steps

```bash
# Clone repo
git clone https://github.com/your-username/my-airways.git
cd my-airways

# Install dependencies
bun install

# Setup database
npx prisma migrate dev
bun run prisma generate

# Start services (example)
nx serve api-gateway --watch
nx serve auth_service --watch
```
