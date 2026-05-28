# GTM_READINESS.md

> Go-to-market readiness assessment for TokenLens.
> Verified on **2026-05-28**.

---

## 1 · Current GTM readiness score

**Overall: 6.5 / 10**

| Audience | Readiness | Rationale |
|---|---|---|
| Internal stakeholders | **9.0 / 10** | Working portal, working marketing site, real Anthropic data. |
| Investors / board | **8.0 / 10** | Strong narrative + working dashboard + honest roadmap. Provider verification gap is the main delta. |
| Design partners / pilot customers (Anthropic-only) | **7.5 / 10** | Phase 1 fully works for Anthropic Admin API users. |
| Design partners / pilot customers (multi-provider) | **5.5 / 10** | Connectors exist but production validation pending. Customers using OpenAI/Copilot/Cursor/M365 will likely uncover edge cases. |
| Public paid customer launch | **4.5 / 10** | Blocked by: lead-capture backend, multi-provider validation, Phase 2B governance, content library. |

---

## 2 · What IS ready for stakeholder / investor demo

✅ The full marketing website is polished, on-brand, and honest in its claims.
✅ The dashboard portal works end-to-end with seeded demo data.
✅ Anthropic Claude + Claude Code show **real** Admin-API data.
✅ Auth model is hardened: 3 layers (proxy + layout + handler), smoke-tested.
✅ Provider settings page lets you add credentials and trigger a sync.
✅ Per-team, per-user, per-model breakdowns render in all Phase 1 modules.
✅ Light + dark mode, responsive layouts, reduced-motion support.
✅ Honest disclosures on `/contact`, `/demo`, `/resources` (no fake submissions).

---

## 3 · What is NOT ready for public customer launch

❌ `/contact` and `/demo` forms are frontend previews — **no real lead capture**.
❌ `/signup` page has no `/api/auth/signup` endpoint.
❌ OpenAI, GitHub Copilot, Cursor, Microsoft 365 Copilot connectors are **implemented but not customer-validated**.
❌ Alerts, Reports, Audit Logs, Notifications UIs are placeholders.
❌ Slack / Teams / Email / PagerDuty alert delivery is not wired.
❌ AI ROI dashboard and Recommendations engine are placeholders.
❌ `/resources` library has zero published articles.
❌ `robots.txt`, `sitemap.xml`, OG image artwork are not generated.
❌ No production hosting set up. No CI tests.
❌ No customer logos, testimonials, or case studies (and none should be invented).
❌ No formal SOC 2 / ISO 27001 certification.

---

## 4 · Messaging guardrails

### 4a · Claims allowed (✅ safe to use)

- "Multi-provider AI spend, usage, productivity, and governance intelligence dashboard."
- "Unified view across Claude, OpenAI, GitHub Copilot, Cursor, Microsoft 365 Copilot, plus exhibited limitations for Gemini & Perplexity."
- "Live Anthropic Admin API integration; other connectors implemented, customer validation pending."
- "Provider coverage may vary by plan, API access, and customer environment."
- "Built with enterprise security principles — encrypted credentials (AES-256-GCM), JWT session cookies, organization-scoped queries, role-based access."
- "Metadata only — never prompt text, AI responses, or code content."
- "Coming Soon" for Phase 2B work (alerts, audit logs, reports, notifications).
- "Roadmap" or "Planned" for Phase 3 work (ROI, suggestions).
- "Preview" for `/contact`, `/demo`, `/resources` content.

### 4b · Claims not allowed (❌ do not use anywhere)

- "SOC 2 certified" / "ISO 27001 certified" — not held.
- "HIPAA compliant" / "GDPR compliant" — not formally claimed.
- "Trusted by [N] customers" / specific customer names / logos — none yet.
- Customer testimonials, quotes, or case studies — none exist.
- "Live sync across all providers" / "7/7 providers syncing" — overclaim.
- "Slack / Teams / PagerDuty / email alerts" — not wired.
- "Board-ready PDF reports" — export not built.
- "One-click reclaim workflow" — not built.
- Specific savings percentages ("save 15-30%", "reclaim 12-22%") — unsourced.
- "Real-time" anything — sync is scheduled, not real-time.
- "AI for [specific industry/regulator]" — not validated.

### 4c · Provider support wording (canonical)

| Provider | Approved external wording |
|---|---|
| Anthropic / Claude | "Live — full integration via Anthropic Admin API." |
| Claude Code | "Live — uses Anthropic Admin API." |
| OpenAI | "Connector implemented; production validation pending." |
| GitHub Copilot | "Connector implemented; production validation pending." |
| Cursor | "Connector implemented; production validation pending." |
| Microsoft 365 Copilot | "Connector implemented; production validation pending." |
| Gemini | "Limited — no aggregate admin usage API. Coverage requires GCP Billing Export." |
| Perplexity | "Limited — no aggregate admin usage API. Enterprise webhook audit logs only." |

### 4d · Feature-availability wording (canonical)

| If status is… | Say… |
|---|---|
| 🟢 Live | "Available today." |
| 🟡 Implemented — needs verification | "Implementation present; production validation pending." |
| 🟠 Preview | "Preview — backend integration pending." |
| 🔵 Coming Soon | "Coming Soon." |
| ⚪ Planned | "On the roadmap." |
| 🚫 Limited / Not built | "Not currently supported — see /limitations" or omit from copy. |

---

## 5 · Required launch blockers (before paid customer launch)

| # | Blocker | Severity |
|---|---|---|
| 1 | Build `/api/contact` + persist + notify | 🔴 Critical |
| 2 | Build `/api/demo-request` + persist + calendar integration | 🔴 Critical |
| 3 | Build `/api/auth/signup` + connect existing UI | 🔴 Critical |
| 4 | Validate OpenAI, GH Copilot, Cursor, M365 connectors against at least one real customer tenant each | 🔴 Critical |
| 5 | Set up production hosting (Vercel/Railway/Render/etc.) | 🔴 Critical |
| 6 | Generate `robots.txt`, `sitemap.xml`, OG image | 🟡 Important |
| 7 | Ship at least 2-3 real articles in `/resources/[slug]` | 🟡 Important |
| 8 | Wire at least one notification delivery channel end-to-end (email recommended) | 🟡 Important |
| 9 | Set up basic CI: typecheck + build on PR | 🟡 Important |
| 10 | Document incident-response runbook for production | 🟢 Helpful |

---

## 6 · Recommended launch checklist

### 6a · Engineering

- [ ] Implement and load-test contact/demo/signup endpoints.
- [ ] Wire each non-Anthropic connector to a real test tenant; run a full sync; verify data lands correctly in `AiUsageDaily`, `DeveloperAiDaily`, `SeatUsageDaily`, `BusinessAiDaily`.
- [ ] Add basic CI (GitHub Actions): `npx tsc --noEmit`, `npm run build`, `npm run lint`.
- [ ] Configure production host with `DATABASE_URL`, `JWT_SECRET`, `ENCRYPTION_KEY`.
- [ ] Configure managed PostgreSQL (Neon, Supabase, RDS, etc.).
- [ ] Run a security review of `proxy.ts` allow-list + `requireSession` coverage.
- [ ] Set up basic observability (logs, error tracking) — Sentry, Logtail, etc.

### 6b · GTM

- [ ] Replace all "live sync" claims with the §4c wording.
- [ ] Remove or replace any unsourced percentages on `/use-cases`, homepage, pricing.
- [ ] Confirm no fake customers/logos/testimonials anywhere on site.
- [ ] Confirm "Coming Soon" or "Preview" labels on every non-live feature.
- [ ] Get legal review on `/privacy`, `/terms` text.
- [ ] Decide on SOC 2 timeline; do not claim until cert is in hand.

### 6c · Content

- [ ] Publish 2-3 launch articles in `/resources`.
- [ ] Capture fresh dashboard screenshots after Phase 2B ships and refresh `public/screenshots/`.
- [ ] Write 1-2 case-study-ready customer stories *only after* live customers exist.

---

## 7 · Why "preview" mode is good for launch

Keeping `/contact`, `/demo`, `/resources` honest with "Preview" labels is **not a weakness** — it's a credibility signal. Sophisticated buyers respect honest scoping. They lose trust when they see:
- Fake testimonials
- Unsourced percentages
- "Live" claims they can't verify in your dashboard

The current honest framing positions TokenLens as "early but credible". Convert that into trust by:
1. Letting prospects email `sales@tokenlens.io` directly (already wired).
2. Showing the real product on screenshare during a demo call.
3. Naming the 2 verifiably-live providers and offering pilots with credible mid-market customers.
