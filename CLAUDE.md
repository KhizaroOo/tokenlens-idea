# TokenLens — Claude Code Guide

> **Single source of truth for AI assistants working on this codebase.**
> See `AI_CONTEXT.md` for the full engineering reference. This file is a quick-start summary.

---

## Product Overview

TokenLens is a **multi-provider AI Usage, Token Cost & Productivity Intelligence Dashboard**. It connects to admin APIs of major AI platforms and consolidates usage data, costs, and productivity metrics into one unified dashboard.

**Current phase:** Phase 2A complete — real API connectors live for all providers. Anthropic has been live since Phase 1. OpenAI, GitHub Copilot, Cursor, and Microsoft Copilot connectors are fully implemented and ready to sync live data once credentials are added in Settings.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | **16.2.6** |
| UI | React | **19.2.4** |
| Language | TypeScript | 5.x (strict) |
| Styling | Tailwind CSS | **v4** |
| Components | shadcn/ui + Base UI | Latest |
| Charts | **Recharts only** | 3.8.1 |
| Icons | **Lucide React only** | 1.14.0 |
| Database | PostgreSQL + Prisma | 5.22.0 |
| Auth | bcryptjs + JWT | httpOnly cookies, 7-day expiry |
| Encryption | AES-256-GCM | Node crypto — provider keys only |
| Validation | Zod | 4.4.3 |

---

## Design System

- **Sidebar bg:** `#050810` always — never change
- **Page bg:** `#060a12` dark / `#f0f2f7` light
- **Primary accent:** Emerald `#10b981`
- **Secondary accent:** Cyan `#06b6d4`
- **Never use purple** — that is Claude.ai's brand color
- **Fonts:** `font-sans` = Plus Jakarta Sans, `font-data` = JetBrains Mono (ALL numbers/costs/tokens)
- **Charts:** Recharts only — use `CHART_COLORS` from `lib/table-styles.ts`
- **Icons:** Lucide React only

---

## Absolute Rules

1. **Auth + scope:** Every API route must call `requireSession()` and filter ALL DB queries by `organizationId`
2. **No content storage:** Never store prompt text or code content — metadata only (tokens, costs, model names, dates)
3. **Charts:** Recharts only. **Icons:** Lucide React only
4. **DB:** Never modify Phase 1 tables — new tables are additive only
5. **Demo data:** Non-Anthropic providers show demo data from `seed.ts` until real credentials are added. Once a provider is connected and synced, live data replaces demo data automatically
6. **Design:** Emerald + cyan accents only — never purple

---

## Current Phase Status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | Anthropic Admin API — Claude + Claude Code live data |
| Phase 2A | ✅ Complete | All provider UI + real API connectors for OpenAI, GitHub Copilot, Cursor, Microsoft Copilot |
| Phase 2B | 🔜 Next | Governance — Alerts, Reports, Audit Logs, Notifications |
| Phase 3 | 🔜 Planned | AI ROI, Suggestions engine |

---

## Provider Architecture

8 providers in `modules/providers/registry.ts`:

| Provider | Key | Category | Real Connector |
|----------|-----|----------|---------------|
| Anthropic | `anthropic` | `api_spend` | ✅ Live |
| OpenAI | `openai` | `api_spend` | ✅ Live |
| Gemini | `gemini` | `api_spend` | ⚠️ Limited (no admin API) |
| Perplexity | `perplexity` | `api_spend` | ⚠️ Limited (no admin API) |
| Claude Code | `claude_code` | `developer_ai` | ✅ Live (uses Anthropic) |
| GitHub Copilot | `github_copilot` | `developer_ai` | ✅ Live |
| Cursor | `cursor` | `developer_ai` | ✅ Live |
| Microsoft Copilot | `microsoft_copilot` | `business_ai` | ✅ Live |

---

## Project Structure

```
app/(auth)/                     — Login page (no sidebar)
app/(dashboard)/                — All dashboard pages (with sidebar)
  dashboard/                    — Main dashboard
  ai-users/, ai-teams/, ai-models/
  developer-ai-tools/           — Overview + claude-code/, github-copilot/, cursor/
  llm-spend/                    — Overview + claude/, openai/
  business-productivity-ai/     — Overview + microsoft-copilot/
  limitations/                  — Provider limits page
  settings/                     — Provider config + sync
  alerts/, reports/, audit-logs/, notifications/, roi/, suggestions/  — Coming Soon
app/api/                        — API routes (all require requireSession())
components/layout/              — AppSidebar, AppHeader
components/dashboard/           — PageShell, SectionCard, StatCard, EmptyState, Skeletons
lib/                            — prisma.ts, auth.ts, encryption.ts, table-styles.ts
modules/providers/              — registry.ts, connector.interface.ts, per-provider connectors
workers/                        — sync-*.worker.ts (one per provider)
prisma/                         — schema.prisma, seed.ts
```

---

## Key Component Patterns

```tsx
// Every dashboard page wraps content in PageShell
<PageShell title="Page Title" subtitle="Description">
  <StatCard label="Total Cost" value="$1,234" icon={DollarSign} iconColor="text-amber-500" iconBg="bg-amber-500/10" />
  <SectionCard title="Chart Title" subtitle="Last 30 days">
    {/* Recharts chart or table */}
  </SectionCard>
</PageShell>
```

---

## API Route Pattern

```typescript
import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await requireSession(); // throws 401 if not authed
  const { organizationId } = session;     // ALWAYS scope by org

  const data = await prisma.someTable.findMany({
    where: { organizationId },            // NEVER omit this
  });

  return NextResponse.json({ data });
}
```

---

## Navigation Routes (current — do not invent new routes)

```
/dashboard                              Live
/ai-users, /ai-teams, /ai-models        Live
/roi, /suggestions                      Coming Soon
/developer-ai-tools                     Live (Overview)
/developer-ai-tools/claude-code         Live
/developer-ai-tools/github-copilot      Live
/developer-ai-tools/cursor              Live
/llm-spend                              Live (Overview)
/llm-spend/claude                       Live
/llm-spend/openai                       Live
/limitations                            Live (Gemini + Perplexity shown here)
/business-productivity-ai               Live (Overview)
/business-productivity-ai/microsoft-copilot  Live
/alerts, /reports, /audit-logs, /notifications  Coming Soon
/settings                               Live
```

---

## Commands

```bash
npm run dev           # Start dev server
npm run db:push       # Push Prisma schema
npm run db:seed       # Seed demo data
npm run db:studio     # Open Prisma Studio
npm run db:generate   # Regenerate Prisma client
docker-compose up -d  # Start PostgreSQL
```

**Demo login:** `admin@tokenlens.ai` / `admin123`
