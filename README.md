# Clean Architecture NestJS E-commerce API

Robust REST API built with NestJS, following Clean Architecture, DDD, and CQRS principles.

## Features
- **Clean Architecture**: Separation of concerns (Domain, Application, Infrastructure).
- **CQRS**: Command Query Responsibility Segregation using `@nestjs/cqrs`.
- **Global Error Handling**: Centralized error codes and standardized JSON responses.
- **Database**: PostgreSQL (TypeORM) with support for Neon.tech / Supabase.
- **Deployment**: Dockerized and ready for Render.com.

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (Optional, dev only)

### Environment Setup
1. Create a `.env` file based on the example:
   ```bash
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   PORT=3000
   NODE_ENV=development
   ```

### Running Locally (Docker)
Run the entire stack with one command:
```bash
docker-compose up --build
```
API available at: `http://localhost:3000`

## Deployment (Render Blueprints)
This project uses **Infrastructure as Code** via `render.yaml` to deploy two environments automatically.

### How to Deploy
1. **Push code**: Ensure both `main` and `develop` branches are pushed to GitHub.
2. **Render Dashboard**:
   - Click **New +** -> **Blueprint**.
   - Connect this repository.
   - Render will detect `render.yaml` and propose creating two services:
     - `nestjs-api-prod` (Main)
     - `nestjs-api-dev` (Develop)
3. **Configuration**:
   - **Dev**: Requires no extra config (DB URL is set in YAML).
   - **Prod**: You will be prompted to enter the `DATABASE_URL` for your production database (keep this secret!).
4. **Click Apply**: Render will deploy both services. 

Each push to `develop` updates the *Dev* service.
Each push to `main` updates the *Prod* service.

