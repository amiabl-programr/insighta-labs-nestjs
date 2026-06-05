# Insighta Labs NestJS

NestJS 11 backend service with PostgreSQL/Prisma, Zod env validation, Google OAuth, and CI.

## Tech Stack

- **Runtime**: Node.js >= 20, TypeScript
- **Framework**: NestJS 11
- **Database**: PostgreSQL + Prisma ORM
- **Validation**: Zod (env) + class-validator/class-transformer (DTOs)
- **Auth**: Passport (Google OAuth 2.0, JWT)
- **Tooling**: pnpm, ESLint (flat config), Prettier, Jest

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- PostgreSQL >= 15 (local or via Docker)

## Setup

```bash
# Install dependencies
pnpm install

# Copy env template and fill in values
cp .env.example .env

# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Start the app |
| `pnpm start:dev` | Start in watch mode |
| `pnpm start:debug` | Start with debugger |
| `pnpm start:prod` | Run compiled `dist/main` |
| `pnpm lint` | Lint and auto-fix |
| `pnpm typecheck` | TypeScript check only |
| `pnpm format` | Prettier write |
| `pnpm test` | Unit tests |
| `pnpm test:watch` | Unit tests in watch mode |
| `pnpm test:cov` | Unit tests with coverage |
| `pnpm test:e2e` | E2E tests |
| `pnpm prisma:generate` | Generate Prisma client |
| `pnpm prisma:migrate` | Run dev migrations |
| `pnpm prisma:push` | Push schema to DB (no migration) |
| `pnpm prisma:studio` | Open Prisma Studio |
| `pnpm prisma:seed` | Run `prisma/seed.ts` |
| `pnpm db:reset` | Reset DB and re-run migrations |

## Environment Variables

See `.env.example` for the full list. All variables are validated at boot via Zod (`src/config/env.ts`).

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `NODE_ENV` | no | `development` | `development` \| `test` \| `staging` \| `production` |
| `PORT` | no | `3000` | |
| `DATABASE_URL` | yes | | PostgreSQL connection string |
| `JWT_SECRET` | yes | | Min 32 chars |
| `JWT_EXPIRES_IN` | no | `7d` | |
| `GOOGLE_CLIENT_ID` | yes | | |
| `GOOGLE_CLIENT_SECRET` | yes | | |
| `GOOGLE_CALLBACK_URL` | yes | | |
| `CORS_ORIGINS` | no | `[]` | Comma-separated |
| `SWAGGER_ENABLED` | no | `false` | |
| `COOKIE_DOMAIN` | no | `''` | |

## Project Structure

```
src/
  main.ts                 # Bootstrap (helmet, cors, validation, swagger)
  app.module.ts           # Root module
  config/
    env.ts                # Zod env validation
  database/
    prisma.module.ts      # @Global() Prisma module
    prisma.service.ts     # PrismaClient + lifecycle hooks
  common/
    decorators/           # Custom parameter decorators
    filters/              # Exception filters
    guards/               # Auth guards
    interceptors/         # Logging, transform interceptors
    types/                # Shared types
  modules/
    health/               # /health endpoint
    auth/                 # Google OAuth + JWT (in progress)
    users/                # User model + CRUD (in progress)

prisma/
  schema.prisma
  seed.ts

test/                     # E2E tests
.github/
  workflows/ci.yml
  pull_request_template.md
```

## CI

GitHub Actions runs on push/PR to `dev`, `staging`, `main`:

1. `pnpm lint`
2. `pnpm prisma:generate`
3. `pnpm build`
4. `pnpm test`

A Postgres 15 service is provided for tests.

## License

UNLICENSED
