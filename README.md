# URL Shortener

A production-oriented URL shortening service built with Node.js, TypeScript, Express, PostgreSQL, and Prisma.

The project focuses on clean architecture, validation, error handling, duplicate URL handling, click tracking, URL expiration, concurrency-safe short-code generation, and automated API testing.

---

## Features

- Create short URLs
- Redirect short URLs to original URLs
- Return the same short URL for duplicate original URLs
- Unique short-code generation using NanoID
- Click tracking
- Last accessed timestamp
- Optional URL expiration
- 404 handling for invalid/expired URLs
- Request validation using Zod
- Centralized error handling
- Async error handling middleware
- PostgreSQL persistence using Prisma ORM
- Handles short-code collisions and concurrent duplicate requests
- Integration tests using Jest and Supertest
- Docker support
- Docker Compose support for API and PostgreSQL

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| TypeScript | Type safety |
| Express.js | HTTP server |
| PostgreSQL | Database |
| Prisma | ORM |
| Zod | Request validation |
| NanoID | Short-code generation |
| Jest | Testing |
| Supertest | API testing |
| Docker | Containerization |
| Docker Compose | Multi-container development |

---

## Project Structure

```text
url_shortener/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controller/
│   │   └── url.controller.ts
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middleware/
│   │   ├── asyncHandler.ts
│   │   └── error.middleware.ts
│   │
│   ├── repositories/
│   │   └── url.repository.ts
│   │
│   ├── routes/
│   │   ├── redirect.routes.ts
│   │   └── url.routes.ts
│   │
│   ├── service/
│   │   └── url.service.ts
│   │
│   ├── validators/
│   │   └── url.schema.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   └── url.test.ts
│
├── .env
├── .env.docker
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
├── prisma.config.ts
└── tsconfig.json