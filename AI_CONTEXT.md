---

# TokenLens — AI Assistant Context Document

> **Read this file before making any changes to the TokenLens codebase.**
> This document is the single source of truth for any AI assistant (Claude Code, ChatGPT, Cursor, Copilot) working on this project. It supersedes `CLAUDE.md`.
> Last updated: May 2026 — Phase 2A complete. Real API connectors live for all providers.

---

## 1. Project Summary

TokenLens is a **multi-provider AI Usage, Token Cost & Productivity Intelligence Dashboard** built for organisations that deploy AI tools to their employees. It connects to the admin APIs of major AI platforms — Anthropic, OpenAI, GitHub Copilot, Cursor, and Microsoft 365 Copilot — and consolidates all usage data, costs, and productivity metrics into one unified dashboard.

**Current state:** Phase 2A is complete. The full UI is live for all 8 providers. Real API connectors are implemented for all providers — Anthropic, OpenAI, GitHub Copilot, Cursor, and Microsoft Copilot. Non-Anthropic providers show demo data from `seed.ts` by default; once you add credentials in Settings and click Sync, live data replaces the demo data automatically. Gemini and Perplexity have no admin API and remain limited.

**Tech company it resembles:** Linear / Vercel / Stripe dashboard aesthetic — dark, premium, data-dense.

**Default login credentials (demo):**
- Email: `admin@tokenlens.ai`
- Password: `admin123`

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js App Router | 16.2.6 | Use App Router only — no Pages Router |
| UI | React | 19.2.4 | |
| Language | TypeScript | 5.x | Strict mode — no `any` unless unavoidable |
| Styling | Tailwind CSS | v4 | Utility-first, no CSS modules |
| Components | shadcn/ui + Base UI | Latest | Use existing components before creating new |
| Charts | **Recharts only** | 3.8.1 | No other chart library permitted |
| Icons | **Lucide React only** | 1.14.0 | No other icon library permitted |
| Database | PostgreSQL | Latest | Neon (cloud) or self-hosted |
| ORM | Prisma | 5.22.0 | |
| Auth | JWT + bcryptjs | — | httpOnly cookies, 7-day expiry |
| Encryption | AES-256-GCM | Node crypto | For provider API keys only |
| Validation | Zod | 4.4.3 | |
| Fonts | Plus Jakarta Sans + JetBrains Mono | — | Google Fonts, loaded in root layout |

### npm Scripts

```bash
npm run dev          # Start dev server on :3000
npm run build        # Production build
npm run db:push      # Push schema changes to DB (no migration files)
npm run db:seed      # Seed demo data for all providers
npm run db:studio    # Open Prisma Studio GUI
npm run db:generate  # Regenerate Prisma client after schema change
```

---

## 3. Absolute Rules — Never Break These

These rules are non-negotiable. Any code that violates them must be corrected before merging.

### Rule 1 — Authentication & Scope
Every single API route handler must:
```typescript
const { organizationId } = await requireSession(request);
```
And every Prisma query must include `where: { organizationId }` or join through a table that does. **No exceptions.**

### Rule 2 — No Content Storage
Never store prompt text, code content, AI responses, file contents, or any payload data. Only metadata: token counts, costs, model names, dates, user emails, team names. This is a legal and privacy requirement.

### Rule 3 — Charts: Recharts Only
Do not import Victory, Chart.js, D3, Nivo, or any other chart library. Use Recharts exclusively. All chart color values come from `CHART_COLORS` in `lib/table-styles.ts`.

### Rule 4 — Icons: Lucide React Only
Do not import React Icons, Heroicons, Font Awesome, or any other icon set. Use Lucide React exclusively.

### Rule 5 — Database Tables Are Additive
Never ALTER or DROP Phase 1 tables. Never rename columns. New features add new tables only. Phase 1 tables: User, Organization, OrganizationMember, Team, TeamMember, ProviderConnection, UsageDaily, ModelUsageDaily, ClaudeCodeDaily, Budget, AlertRule, Alert, AuditLog.

### Rule 6 — Demo Data vs Live Data
Non-Anthropic providers show demo data from `prisma/seed.ts` until the user connects real credentials in Settings. Once a provider is connected and synced, the sync worker purges all demo rows for that provider and writes live API data. Do NOT hardcode demo data into API routes — always query from the DB so live data flows through automatically.

### Rule 7 — Design Colors
Primary accent: **emerald `#10b981`**. Secondary accent: **cyan `#06b6d4`**. Never use purple. Never use the Anthropic brand purple. Sidebar background is always `#050810` regardless of light/dark mode.

### Rule 8 — SectionCard Subtitle Type
`SectionCard` accepts `subtitle?: React.ReactNode` — not `string`. You can pass JSX into subtitle. Do not assume it is a string.

### Rule 9 — All Numbers Use font-data
Any value that is a number (cost, tokens, count, percentage) must use the `font-data` class (JetBrains Mono). This ensures tabular alignment in tables and stat cards.

### Rule 10 — Gemini and Perplexity Are Limited
Do not create detail pages for Gemini or Perplexity. They have no admin API. In the sidebar they link to `/limitations`. Do not add analytics pages for them.

---

## 4. Directory Structure

```
tokenlens/
├── app/
│   ├── (auth)/                    # Public — no sidebar, no session check
│   │   └── login/page.tsx
│   ├── (dashboard)/               # Protected — sidebar + header rendered by layout
│   │   ├── layout.tsx             # Renders AppSidebar + AppHeader
│   │   ├── dashboard/page.tsx     # Provider overview hub (the landing page after login)
│   │   ├── ai-users/
│   │   │   ├── page.tsx           # All users table
│   │   │   └── [userId]/page.tsx  # Individual user drill-down
│   │   ├── ai-teams/
│   │   │   ├── page.tsx
│   │   │   └── [teamId]/page.tsx
│   │   ├── ai-models/
│   │   │   ├── page.tsx
│   │   │   └── [modelName]/page.tsx
│   │   ├── developer-ai-tools/
│   │   │   ├── page.tsx           # Dev tools overview
│   │   │   ├── claude-code/page.tsx
│   │   │   ├── github-copilot/page.tsx
│   │   │   └── cursor/page.tsx
│   │   ├── llm-spend/
│   │   │   ├── page.tsx           # LLM spend overview (all providers)
│   │   │   ├── claude/page.tsx
│   │   │   └── openai/page.tsx
│   │   ├── business-productivity-ai/
│   │   │   ├── page.tsx
│   │   │   └── microsoft-copilot/page.tsx
│   │   ├── roi/page.tsx           # Coming Soon page
│   │   ├── suggestions/page.tsx   # Coming Soon page
│   │   ├── alerts/page.tsx        # Coming Soon page
│   │   ├── notifications/page.tsx # Coming Soon page
│   │   ├── reports/page.tsx       # Coming Soon page
│   │   ├── audit-logs/page.tsx    # Coming Soon page
│   │   ├── limitations/page.tsx   # Provider limits — Gemini/Perplexity explained
│   │   ├── providers/page.tsx     # All providers overview (legacy, kept for /providers route)
│   │   └── settings/page.tsx      # Provider configuration + sync management
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── me/route.ts
│       ├── dashboard/
│       │   ├── overview/route.ts
│       │   ├── trends/route.ts
│       │   └── top-models/route.ts
│       ├── users/route.ts
│       ├── teams/route.ts
│       ├── models/route.ts
│       ├── llm-spend/
│       │   ├── route.ts           # Combined overview
│       │   ├── claude/route.ts
│       │   └── openai/route.ts
│       ├── claude-code/route.ts
│       ├── developer-ai-tools/route.ts
│       ├── business-productivity-ai/route.ts
│       ├── provider/
│       │   ├── route.ts           # Anthropic connection CRUD
│       │   ├── sync/route.ts
│       │   ├── sync-all/route.ts
│       │   └── sync-code/route.ts
│       ├── providers/
│       │   ├── route.ts           # All providers summary
│       │   └── [providerKey]/route.ts  # Connect/disconnect any provider
│       ├── intelligence/
│       │   ├── adoption-scores/route.ts
│       │   ├── waste-scores/route.ts
│       │   └── team-efficiency/route.ts
│       ├── recommendations/route.ts
│       ├── alerts/route.ts
│       ├── settings/
│       │   ├── route.ts
│       │   ├── organization/route.ts
│       │   ├── budget/route.ts
│       │   └── alert-rules/route.ts
│       ├── notifications/
│       │   ├── channels/route.ts
│       │   └── test/route.ts
│       └── data-retention/route.ts
│
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx         # Main sidebar — edit navGroups here to add nav items
│   │   ├── AppHeader.tsx          # Top header with language switcher + theme toggle
│   │   ├── LanguageSwitcher.tsx   # EN/ES/FR dropdown
│   │   └── ThemeToggle.tsx        # Dark/light toggle
│   └── dashboard/
│       ├── PageShell.tsx          # Page wrapper — use on every dashboard page
│       ├── SectionCard.tsx        # Content block wrapper — use for every chart/table
│       ├── StatCard.tsx           # Single metric tile
│       ├── EmptyState.tsx         # No data / error state
│       ├── StatCardSkeleton.tsx   # Loading skeletons (StatCardSkeleton + TableRowSkeleton)
│       ├── ProviderDetailPage.tsx # Shared component for LLM spend detail pages (Claude, OpenAI)
│       └── DevProviderDetailPage.tsx  # Shared component for dev tool detail pages
│
├── lib/
│   ├── auth.ts                    # requireSession, signToken, setSessionCookie
│   ├── encryption.ts              # encrypt() and decrypt() for API keys
│   ├── prisma.ts                  # Singleton Prisma client
│   ├── utils.ts                   # cn(), formatCost(), formatTokens()
│   ├── table-styles.ts            # TH, TR, TD, TD_MONO, CHART_COLORS, CHART_TOOLTIP
│   ├── query-helpers.ts           # getDateRangeStart(days), parseDays(searchParams)
│   └── rate-limit.ts              # checkRateLimit() — used on login route
│
├── modules/
│   └── providers/
│       ├── types.ts               # ProviderKey, ProviderCategory, ProviderDefinition
│       ├── registry.ts            # PROVIDER_REGISTRY — all 8 providers defined here
│       ├── capabilities.ts        # isTokenBased(), isSeatBased(), hasRealConnector(), categoryLabel()
│       ├── connector.interface.ts # IProviderConnector interface
│       └── [providerKey]/
│           ├── connector.ts       # API connector (real implementation for all providers)
│           └── mapper.ts          # Maps API response to DB schema
│
├── workers/
│   ├── sync-claude-usage.worker.ts      # REAL — Anthropic API → UsageDaily + ModelUsageDaily
│   ├── sync-claude-code.worker.ts       # LIVE — Anthropic API → ClaudeCodeDaily
│   ├── sync-openai.worker.ts            # LIVE — OpenAI Admin API → AiUsageDaily / AiModelUsageDaily
│   ├── sync-github-copilot.worker.ts    # LIVE — GitHub Copilot API → DeveloperAiDaily / SeatUsageDaily
│   ├── sync-cursor.worker.ts            # LIVE — Cursor Admin API → DeveloperAiDaily / SeatUsageDaily
│   ├── sync-microsoft-copilot.worker.ts # LIVE — Microsoft Graph API → BusinessAiDaily / SeatUsageDaily
│   └── alert-checker.worker.ts          # Evaluates AlertRules → creates Alert records
│
├── contexts/
│   └── LanguageContext.tsx        # i18n provider — useTranslation() hook
│
├── types/
│   ├── dashboard.ts               # TeamSummary, UserSummary, AlertRule types
│   └── usage.ts                   # DailyUsage, ModelUsage, DashboardStats types
│
├── prisma/
│   ├── schema.prisma              # Full DB schema — all Phase 1/2/3 tables
│   └── seed.ts                    # Seeds demo data for all 8 providers
│
├── AI_CONTEXT.md                  # This file
├── CLAUDE.md                      # Outdated — superseded by this file
├── TOKENLENS_HIGHLIGHTS.md        # Sales/product document — not for engineering use
└── TOKENLENS_FEATURES.md          # Feature descriptions — not for engineering use
```

---

## 5. Current Sidebar Navigation

This is the exact current state of the sidebar. Any new page must be added to `navGroups` in `components/layout/AppSidebar.tsx`.

```
GROUP: Overview
  Dashboard          href="/dashboard"                      ✅ Live

GROUP: Intelligence
  AI ROI             href="/roi"                            🔜 comingSoon: true
  Suggestions        href="/suggestions"                    🔜 comingSoon: true
  AI Users           href="/ai-users"                       ✅ Live
  AI Teams           href="/ai-teams"                       ✅ Live
  AI Models          href="/ai-models"                      ✅ Live

GROUP: Developer AI Tools
  Overview           href="/developer-ai-tools"             ✅ Live
    └─ Claude Code   href="/developer-ai-tools/claude-code"
    └─ GitHub Copilot href="/developer-ai-tools/github-copilot"
    └─ Cursor        href="/developer-ai-tools/cursor"

GROUP: LLM/API Spend Providers
  Overview           href="/llm-spend"                      ✅ Live
    └─ Claude        href="/llm-spend/claude"
    └─ OpenAI        href="/llm-spend/openai"
    └─ Gemini        href="/limitations"                    ⚠️ limited: true
    └─ Perplexity    href="/limitations"                    ⚠️ limited: true

GROUP: Business Productivity AI
  Overview           href="/business-productivity-ai"       ✅ Live
    └─ Microsoft Copilot href="/business-productivity-ai/microsoft-copilot"

GROUP: Governance
  Alerts             href="/alerts"                         🔜 comingSoon: true
  Notifications      href="/notifications"                  🔜 comingSoon: true
  Reports            href="/reports"                        🔜 comingSoon: true
  Audit Logs         href="/audit-logs"                     🔜 comingSoon: true
  Provider Limits    href="/limitations"                    ✅ Live
  Settings           href="/settings"                       ✅ Live
```

**NavItem interface flags:**
- `comingSoon: true` → renders amber "SOON" badge, link is still clickable (goes to Coming Soon page)
- `limited: true` (on NavChild) → renders amber "LIMITED" badge, dimmed opacity, links to /limitations

---

## 6. Design System

### Colors

```css
/* Dark mode (default) */
--background:   #060a12   /* page background */
--sidebar:      #050810   /* always this, even in light mode */
--card:         #0d1424
--foreground:   #e8edf5
--muted:        #0d1829
--border:       white/6%

/* Light mode */
--background:   #f0f2f7
--card:         #ffffff
--foreground:   #0f1629

/* Brand (same in both modes) */
--primary:      #10b981   /* emerald — buttons, active states, indicators */
--accent-cyan:  #06b6d4   /* cyan — secondary highlights */
```

### Typography

```tsx
// UI text (headings, labels, body)
className="font-sans"   // Plus Jakarta Sans

// ALL numbers: costs, tokens, counts, percentages, IDs
className="font-data"   // JetBrains Mono — tabular numerals
// Examples: token counts, $USD values, percentages, stat card values
```

### Utility CSS Classes (defined in globals.css)

| Class | Effect |
|-------|--------|
| `.gradient-text` | Emerald→Cyan linear gradient on text fill |
| `.glass` | `backdrop-blur(16px) saturate(180%)` |
| `.glow-emerald` | Emerald box-shadow glow |
| `.glow-emerald-sm` | Smaller glow variant |
| `.card-shadow` | Depth shadow, enhanced on `:hover` |
| `.gradient-border` | Emerald gradient border via `::before` |
| `.sidebar-nav-item` | Base nav item styles |

### Table Helpers (from `lib/table-styles.ts`)

```typescript
import { TH, TR, TD, TD_MONO, CHART_TOOLTIP, CHART_COLORS } from "@/lib/table-styles";

// TH     — header cell: uppercase 10px, tracking-wide, muted
// TR     — table row: hover bg, border-bottom
// TD     — standard cell: text-sm
// TD_MONO — monospaced cell: font-data + tabular-nums

// CHART_COLORS
// { emerald: "#10b981", cyan: "#06b6d4", indigo: "#6366f1", amber: "#f59e0b", red: "#ef4444" }

// CHART_TOOLTIP — spread onto <Tooltip> for consistent styling
// <Tooltip {...CHART_TOOLTIP} formatter={(v) => [fmtUsd(Number(v)), "Cost"]} />
```

---

## 7. Component Patterns

### PageShell — wraps every dashboard page

```tsx
import { PageShell } from "@/components/dashboard/PageShell";

export default function MyPage() {
  return (
    <PageShell title="Page Title" subtitle="Short description of this page">
      {/* page content */}
    </PageShell>
  );
}
```

### SectionCard — wraps every chart or table block

```tsx
import { SectionCard } from "@/components/dashboard/SectionCard";

// subtitle is React.ReactNode — can be JSX, not just a string
<SectionCard title="Daily Cost Trend" subtitle="Last 30 days">
  {/* chart or table */}
</SectionCard>

// noPadding prop for tables that need edge-to-edge layout
<SectionCard title="Top Users" noPadding>
  <table>...</table>
</SectionCard>
```

### StatCard — metric tile

```tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign } from "lucide-react";

<StatCard
  label="Total Cost (30d)"
  value="$1,234.56"           // always a string
  icon={DollarSign}
  iconColor="text-amber-500"
  iconBg="bg-amber-500/10"
/>
```

### EmptyState — no data / error

```tsx
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Users } from "lucide-react";

<EmptyState
  icon={Users}
  title="No users found"
  description="Connect a provider to see user data."
/>
```

### Loading Skeletons

```tsx
import { StatCardSkeleton, TableRowSkeleton } from "@/components/dashboard/StatCardSkeleton";

// For stat cards grid while loading:
{loading && Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}

// For table rows while loading:
{loading && Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} cols={4} />)}
```

### Shared Provider Detail Pages

```tsx
// For LLM spend provider pages (Claude, OpenAI):
import { ProviderDetailPage } from "@/components/dashboard/ProviderDetailPage";
<ProviderDetailPage providerSlug="claude" label="Claude" subtitle="Anthropic API usage" />

// For developer AI tool pages (Claude Code, GitHub Copilot, Cursor):
import { DevProviderDetailPage } from "@/components/dashboard/DevProviderDetailPage";
<DevProviderDetailPage providerSlug="claude_code" label="Claude Code" subtitle="..." />
```

---

## 8. How to Add a New Page

Follow this exact checklist every time:

**Step 1 — Create the page file**
```
app/(dashboard)/[your-route]/page.tsx
```
Always starts with `"use client";` directive.

**Step 2 — Page structure**
```tsx
"use client";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/dashboard/PageShell";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatCardSkeleton, TableRowSkeleton } from "@/components/dashboard/StatCardSkeleton";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default function MyPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/my-route")
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell title="My Feature" subtitle="Description">
      {/* stat cards */}
      {/* section cards with charts/tables */}
    </PageShell>
  );
}
```

**Step 3 — Add to sidebar**

Open `components/layout/AppSidebar.tsx`, find the `navGroups` array, add to the appropriate group:
```typescript
{ label: "My Feature", href: "/my-route", icon: SomeIcon }
// or with Coming Soon:
{ label: "My Feature", href: "/my-route", icon: SomeIcon, comingSoon: true }
```

**Step 4 — Create the API route**
```
app/api/[your-route]/route.ts
```
See Section 9 for the template.

---

## 9. API Route Template

Copy this for every new API route:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getDateRangeStart } from "@/lib/query-helpers";

export async function GET(request: NextRequest) {
  try {
    const { organizationId } = await requireSession(request);
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") ?? "30", 10);
    const since = getDateRangeStart(days);

    // ALL queries must include organizationId
    const data = await prisma.someTable.findMany({
      where: {
        organizationId,           // REQUIRED — never omit this
        date: { gte: since },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ data });

  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[/api/your-route]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

---

## 10. Database Quick Reference

### Phase 1 Tables (Core — do not modify)

| Table | Purpose |
|-------|---------|
| `User` | Platform user — email, bcrypt hash, name |
| `Organization` | Company workspace — monthlyBudgetUsd, timezone, dataMode |
| `OrganizationMember` | User ↔ Org join — role: owner / admin / viewer |
| `Team` | Sub-group within org — name, slug |
| `TeamMember` | User ↔ Team join |
| `ProviderConnection` | Encrypted API key per provider per org — syncStatus, lastSyncAt |
| `UsageDaily` | Anthropic daily usage — userEmail, date, input/output/cachedTokens, cost |
| `ModelUsageDaily` | Anthropic model breakdown — model, date, tokens, cost |
| `ClaudeCodeDaily` | Claude Code activity — sessions, commits, PRs, linesOfCode per user per day |
| `Budget` | Spend limits — daily/weekly/monthly at org or team scope |
| `AlertRule` | Threshold rule — metric, operator, threshold, period |
| `Alert` | Triggered alert instance — severity, message, resolvedAt |
| `AuditLog` | Action record — userId, action, resource, timestamp |

### Phase 2 Tables (Multi-Provider — additive)

| Table | Purpose |
|-------|---------|
| `ProviderSyncRun` | Every sync attempt log — status, recordsSynced, errorMessage |
| `AiUsageDaily` | Generic daily usage — OpenAI/Gemini/Perplexity tokens + cost |
| `AiModelUsageDaily` | Model-level usage across all providers |
| `DeveloperAiDaily` | GitHub Copilot + Cursor activity — sessions, suggestions, acceptances |
| `SeatUsageDaily` | Seat utilisation — seatAssigned vs seatActive per user |
| `BusinessAiDaily` | Microsoft Copilot per-app usage — appName, activeMinutes |
| `ProviderUserMapping` | Maps provider user IDs to TokenLens User records |

### Phase 3 Tables (AI ROI — not yet built)

| Table | Purpose |
|-------|---------|
| `AiAdoptionScoreDaily` | Adoption badge per user/team/org — high/healthy/low/inactive |
| `AiWasteScoreDaily` | Waste score — unused seats, low utilisation |
| `TeamEfficiencyScoreDaily` | Cost per PR, cost per ticket, commit count |
| `Recommendation` | AI-generated suggestion — type, projectedSaving, status |
| `GitHubRepository` | GitHub repo metadata |
| `GitHubPullRequestDaily` | PR counts per team per day |
| `GitHubCommitDaily` | Commit counts per developer per day |
| `JiraProject` | Jira project metadata |
| `JiraIssueDaily` | Issues completed per team per day |
| `ProductivityCorrelationDaily` | AI spend vs. output correlation score per team |
| `NotificationChannel` | Delivery channel — email, Slack, Teams, webhook |
| `NotificationDeliveryLog` | Every notification sent — channel, status, timestamp |
| `DataRetentionPolicy` | Org-level retention settings |

---

## 11. Provider Architecture

### The 8 Providers

Defined in `modules/providers/registry.ts` as `PROVIDER_REGISTRY`:

```typescript
type ProviderKey =
  | "anthropic"        // LLM API Spend — LIVE connector
  | "openai"           // LLM API Spend — LIVE connector
  | "gemini"           // LLM API Spend — NO admin API (Limited)
  | "perplexity"       // LLM API Spend — NO admin API (Limited)
  | "claude_code"      // Developer AI  — LIVE connector (uses Anthropic)
  | "github_copilot"   // Developer AI  — LIVE connector
  | "cursor"           // Developer AI  — LIVE connector
  | "microsoft_copilot" // Business AI  — LIVE connector

type ProviderCategory = "api_spend" | "developer_ai" | "business_ai"
```

### Capability Helpers (`modules/providers/capabilities.ts`)

```typescript
isTokenBased(key)      // true for anthropic, openai, gemini, perplexity
isSeatBased(key)       // true for github_copilot, cursor, microsoft_copilot
isActivityBased(key)   // true for claude_code, github_copilot, cursor
hasRealConnector(key)  // true ONLY for anthropic and claude_code — all others are stubs
categoryLabel(cat)     // "LLM/API Spend Providers" | "Developer AI Tools" | "Business Productivity AI"
```

### Connector Pattern

Each provider module at `modules/providers/[key]/connector.ts` implements `IProviderConnector`:
```typescript
interface IProviderConnector {
  testConnection(credential: string): Promise<{ ok: boolean; error?: string }>;
  syncUsage(orgId: string, credential: string, since: Date): Promise<UnifiedUsageRow[]>;
  syncSeats?(orgId: string, credential: string): Promise<SeatRow[]>;
}
```

---

## 12. Environment Variables

Create `.env.local` from `.env.example`. All are required unless marked optional.

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/tokenlens"
DIRECT_URL="postgresql://..."    # For Prisma direct connection (Neon pooling bypass)

# Redis (optional — not used in current code)
REDIS_URL="redis://localhost:6379"

# Auth — REQUIRED
JWT_SECRET="..."                  # Min 32 chars, random base64 string

# Encryption — REQUIRED
ENCRYPTION_KEY="..."              # Exactly 32 bytes, base64-encoded

# App
APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 13. Current Phase Status

### Phase 1 ✅ Complete
Anthropic MVP. Single org. Real data from Anthropic Admin API. All core infrastructure built: auth, encryption, users, teams, models, alert rules, audit logs, settings.

### Phase 2A ✅ Complete
Multi-provider UI fully live. All 8 provider pages are live. Real API connectors implemented for Anthropic, OpenAI, GitHub Copilot, Cursor, and Microsoft Copilot. Sidebar restructured with accordion navigation. Demo data seeded for all providers — non-Anthropic providers auto-switch to live data on first successful sync.

**Changes made in Phase 2A vs. legacy CLAUDE.md:**
- URL renames: `api-spend` → `llm-spend`, `developer-ai` → `developer-ai-tools`, `business-ai` → `business-productivity-ai`, `users` → `ai-users`, `teams` → `ai-teams`, `models` → `ai-models`
- Label renames: "API Spend" → "LLM/API Spend Providers", "Developer AI" → "Developer AI Tools", "Business AI" → "Business Productivity AI", "Recommendations" → "Suggestions"
- Gemini/Perplexity removed from detail pages, now show as Limited
- GitHub Activity and Jira Delivery pages removed entirely
- Coming Soon pages added: /roi, /suggestions, /alerts, /notifications, /reports, /audit-logs

### Phase 2B 🔜 Next — Governance Features
Build Alerts (threshold rules + anomaly detection), Reports (PDF/CSV export), Audit Logs (tamper-evident action history), and Notifications (email/Slack/webhook delivery). All governance pages currently show Coming Soon.

### Phase 3 🔜 Planned — AI ROI Intelligence
AI adoption scoring, waste detection, team efficiency scoring, GitHub/Jira correlation, AI ROI metrics, Suggestions engine, full Alerts/Notifications/Reports/Audit Logs UI.

---

## 14. What NOT to Do

### Wrong Route Names (Phase 2A renamed these — use the new names)

| ❌ Old / Wrong | ✅ Correct |
|----------------|-----------|
| `/api-spend` | `/llm-spend` |
| `/api-spend/claude` | `/llm-spend/claude` |
| `/developer-ai` | `/developer-ai-tools` |
| `/business-ai` | `/business-productivity-ai` |
| `/users` | `/ai-users` |
| `/teams` | `/ai-teams` |
| `/models` | `/ai-models` |
| `/recommendations` | `/suggestions` |

### Banned Patterns

```typescript
// ❌ Never — missing organizationId scope
const data = await prisma.usageDaily.findMany({ where: { date: { gte: since } } });

// ✅ Correct
const data = await prisma.usageDaily.findMany({ where: { organizationId, date: { gte: since } } });

// ❌ Never — wrong chart library
import { Chart } from "chart.js";
import { VictoryChart } from "victory";

// ✅ Correct
import { LineChart, BarChart } from "recharts";

// ❌ Never — wrong icon library
import { FaUser } from "react-icons/fa";

// ✅ Correct
import { User } from "lucide-react";

// ❌ Never — calling provider APIs directly inside an API route
// Always go through the worker pattern: getProviderCredential → fetch → upsert → markProviderSynced
const openaiResponse = await fetch("https://api.openai.com/v1/...");

// ❌ Never — creating a Gemini or Perplexity detail page
// app/(dashboard)/llm-spend/gemini/page.tsx  ← DO NOT CREATE

// ❌ Never — subtitle as plain string when passing JSX
<SectionCard subtitle={<span className="text-red-500">Alert</span>} />
// This is fine — subtitle is React.ReactNode

// ❌ Never — numbers without font-data class
<p className="text-2xl font-bold">1,234,567</p>

// ✅ Correct
<p className="text-2xl font-bold font-data">1,234,567</p>

// ❌ Never — storing prompt or code content
await prisma.someTable.create({ data: { promptText: req.body.prompt } });

// ❌ Never — modifying Phase 1 tables in schema.prisma
// model UsageDaily { ... newColumn String ... }  ← Adding to Phase 1 tables is risky; discuss first
```

---

*TokenLens · AI_CONTEXT.md · Updated May 2026 · Phase 2A Complete · Real connectors live for all providers*
