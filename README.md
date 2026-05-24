# TokenLens

**AI Usage, Token Cost & Productivity Intelligence Dashboard**

TokenLens gives organisations complete visibility into every AI tool their teams use — from LLM API spend (Claude, OpenAI) to developer coding assistants (Claude Code, GitHub Copilot, Cursor) and business productivity AI (Microsoft 365 Copilot) — all in one unified dashboard.

---

## Features

| Module | Feature | Status |
|--------|---------|--------|
| Overview | Dashboard — provider cards, live status, 30-day cost | ✅ Live |
| Intelligence | AI Users — per-user token usage, cost, trend | ✅ Live |
| Intelligence | AI Teams — team-level spend and adoption | ✅ Live |
| Intelligence | AI Models — cross-provider model breakdown | ✅ Live |
| Intelligence | AI ROI | 🔜 Coming Soon |
| Intelligence | Suggestions | 🔜 Coming Soon |
| Developer AI | Claude Code — sessions, tokens, cost per developer | ✅ Live |
| Developer AI | GitHub Copilot — seats, acceptance rates, activity | ✅ Live |
| Developer AI | Cursor — seats, usage, spending | ✅ Live |
| LLM/API Spend | Claude (Anthropic) — full token + cost breakdown | ✅ Live |
| LLM/API Spend | OpenAI — token + cost breakdown | ✅ Live |
| LLM/API Spend | Gemini / Perplexity | ⚠️ Limited (no admin API) |
| Business AI | Microsoft 365 Copilot — seats, app activity | ✅ Live |
| Governance | Alerts, Reports, Audit Logs, Notifications | 🔜 Coming Soon |
| Governance | Provider Limits, Settings | ✅ Live |

**Live data:** Claude and Claude Code sync real data via the Anthropic Admin API.
**Other providers:** Show representative demo data until you connect your credentials in Settings → Provider Integrations.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 16.2.6 |
| UI | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Components | shadcn/ui + Base UI | Latest |
| Charts | Recharts | 3.8.1 |
| Icons | Lucide React | 1.14.0 |
| Database | PostgreSQL + Prisma ORM | 5.22.0 |
| Auth | bcryptjs + JWT (httpOnly cookie) | — |
| Encryption | AES-256-GCM (provider API keys) | — |
| Validation | Zod | 4.4.3 |

---

## Quick Start

### Prerequisites

- Node.js 20+
- Docker Desktop (for PostgreSQL)

### 1. Clone and install

```bash
git clone https://github.com/KhizaroOo/tokenlens-idea.git
cd tokenlens-idea
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tokenlens"
JWT_SECRET="<run: openssl rand -base64 32>"
ENCRYPTION_KEY="<run: openssl rand -base64 32>"
```

### 3. Start PostgreSQL

```bash
docker-compose up -d
```

### 4. Database setup

```bash
npm run db:push    # Apply schema
npm run db:seed    # Seed demo data for all providers
```

### 5. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo login:** `admin@tokenlens.ai` / `admin123`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on :3000 |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:seed` | Seed demo data for all providers |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:generate` | Regenerate Prisma client |
| `docker-compose up -d` | Start PostgreSQL container |
| `docker-compose down` | Stop containers |

---

## Connecting Real Provider Data

Once the app is running with demo data, connect real credentials in **Settings → Provider Integrations**:

| Provider | Credential Required | Where to Get It |
|----------|-------------------|-----------------|
| Claude / Anthropic | Admin API Key (`sk-ant-admin-…`) | [console.anthropic.com → Admin Keys](https://console.anthropic.com/settings/admin-keys) |
| Claude Code | Uses Anthropic connection | No separate key needed |
| OpenAI | Admin API Key | [platform.openai.com → Organization → Admin Keys](https://platform.openai.com/settings/organization/admin-keys) |
| GitHub Copilot | PAT with `manage_billing:copilot` scope + org name | [github.com/settings/tokens](https://github.com/settings/tokens) |
| Cursor | Admin API Key | [cursor.com → Settings](https://www.cursor.com/settings) |
| Microsoft Copilot | Entra App Registration (Tenant ID + Client ID + Secret) | [Azure Portal → App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) |

After connecting, click **Sync** on the provider row. Demo data is automatically cleared and replaced with live API data.

---

## Development Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Anthropic/Claude Code MVP — real data via Admin API | ✅ Complete |
| Phase 2A | Multi-provider UI — all providers connected with real API connectors | ✅ Complete |
| Phase 2B | Governance features — Alerts, Reports, Audit Logs, Notifications | 🔜 Next |
| Phase 3 | AI ROI analytics, Suggestions engine | 🔜 Planned |
