# TokenLens

AI Usage, Token, Cost & Productivity Intelligence Dashboard for companies using Claude and Claude Code.

## Features

- **Usage Dashboard** — Real-time token and cost tracking across all Claude API calls
- **Per-User Analytics** — See exactly who is spending what
- **Team Breakdown** — Budget tracking by team with alert thresholds
- **Model Intelligence** — Compare costs across Sonnet, Opus, and Haiku
- **Claude Code Analytics** — Developer productivity metrics (sessions, commits, PRs)
- **Budget Alerts** — Configurable thresholds with email notifications
- **CSV Reports** — Export any view for finance/leadership reporting

## Tech Stack

- **Frontend**: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16 + Prisma ORM
- **Cache**: Redis 7
- **Auth**: bcryptjs + JWT (httpOnly cookie)

## Setup

### 1. Prerequisites

- Node.js 20+
- Docker Desktop

### 2. Clone and install

```bash
git clone <repo>
cd tokenlens
npm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and set:
- `JWT_SECRET` — run `openssl rand -base64 32`
- `ENCRYPTION_KEY` — run `openssl rand -base64 32`

### 4. Start infrastructure

```bash
docker-compose up -d
```

### 5. Database setup

```bash
npm run db:push   # Apply schema
npm run db:seed   # Seed demo data
```

### 6. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo login**: `admin@tokenlens.ai` / `admin123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio |
| `docker-compose up -d` | Start PostgreSQL + Redis |
| `docker-compose down` | Stop containers |
