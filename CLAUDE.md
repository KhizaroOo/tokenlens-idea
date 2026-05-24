# TokenLens — Claude Code Guide

## Product Overview
TokenLens is an AI Usage, Token, Cost, and Productivity Intelligence Dashboard for companies using Claude and Claude Code. It tracks API token usage, costs, team productivity, and provides alerting.

## Architecture
- **Framework**: Next.js 15 App Router, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Database**: PostgreSQL via Prisma ORM
- **Cache/Queue**: Redis
- **Auth**: Local email/password, bcryptjs + JWT (httpOnly cookie)
- **Encryption**: AES-256-GCM for provider API keys

## Design System
- **Theme**: Dark navy sidebar (#0f172a / slate-900), white/slate content area
- **Accents**: Emerald (#10b981) primary, Cyan (#06b6d4) secondary
- **Aesthetic**: Linear / Vercel / Stripe Dashboard — NOT Claude's purple
- **Charts**: Recharts only
- **Icons**: Lucide React only

## Key Rules
1. All API routes require authentication — scope all DB queries by `organizationId`
2. Never store prompt content or code content — metadata only
3. Demo Data mode (seeded) vs Real Data mode (Claude Admin API connected)
4. MVP: Claude only — no OpenAI, Copilot, Gemini, Cursor
5. No paid services — PostgreSQL required (local install or free Neon/Supabase); Redis optional (not used in V1 code)

## Project Structure
```
app/(auth)/           — Login page (no sidebar)
app/(dashboard)/      — All dashboard pages (with sidebar)
app/api/              — API routes
components/layout/    — AppSidebar, AppHeader
components/dashboard/ — StatCard, PageShell, SectionCard
components/charts/    — Recharts wrappers
components/tables/    — Data tables
lib/                  — prisma.ts, auth.ts, encryption.ts, utils.ts
modules/              — Business logic by domain
workers/              — Sync workers (Claude API, Claude Code)
prisma/               — schema.prisma, seed.ts
types/                — Shared TypeScript types
```

## Environment Variables
See `.env.example` for all required variables.

## Commands
```bash
npm run dev           # Start dev server
npm run db:push       # Push Prisma schema
npm run db:seed       # Seed demo data
npm run db:studio     # Open Prisma Studio
docker-compose up -d  # Start PostgreSQL + Redis
```

## Phase 2 Rules (Multi-Provider Intelligence Layer)

### Provider Categories
- **api_spend**: anthropic, openai, gemini, perplexity
- **developer_ai**: claude_code, github_copilot, cursor
- **business_ai**: microsoft_copilot

### Phase 2A Rules (Current Phase — Foundation)
1. DO NOT call real OpenAI / GitHub / Gemini / Perplexity / Cursor / Microsoft APIs
2. All Phase 2 data is DEMO DATA from seed.ts until Phase 2B real connectors are built
3. All new DB tables are ADDITIVE — never modify or remove Phase 1 tables
4. New tables: ProviderSyncRun, AiUsageDaily, AiModelUsageDaily, DeveloperAiDaily, SeatUsageDaily, BusinessAiDaily, ProviderUserMapping
5. All new routes must be scoped by organizationId from session
6. Provider registry lives in modules/providers/ — types.ts, registry.ts, capabilities.ts, utils.ts
7. Each provider has a connector stub (connector.ts) + mapper stub (mapper.ts) in modules/providers/[key]/

### Phase 2 Sidebar Order
Dashboard → Providers → Users → Teams → Models → Developer AI → API Spend → Business AI → Alerts → Reports → Settings
