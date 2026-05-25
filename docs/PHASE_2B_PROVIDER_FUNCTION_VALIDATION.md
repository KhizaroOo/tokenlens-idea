# Phase 2B Provider Function Validation

> Static analysis of all Phase 2B provider integrations. No real API calls are made here.
> Run: `npm run validate:providers`

---

## 1. Provider Function Matrix

| Provider | Registry Entry | Credentials | testConnection | Sync Worker | DB Targets | API Read Path | Status |
|---|---|---|---|---|---|---|---|
| **OpenAI** | ✅ `openai` | Admin API Key (`sk-org-...`) | `testOpenAIConnection()` | `sync-openai.worker.ts` | `AiUsageDaily`, `AiModelUsageDaily` | `/api/llm-spend/openai` | Live |
| **GitHub Copilot** | ✅ `github_copilot` | JSON `{org, token}` | `testGitHubConnection()` | `sync-github-copilot.worker.ts` | `DeveloperAiDaily`, `SeatUsageDaily`, `ProviderUserMapping` | `/api/developer-ai-tools/github-copilot` | Live |
| **Cursor** | ✅ `cursor` | Admin API Key | `testCursorConnection()` | `sync-cursor.worker.ts` | `DeveloperAiDaily`, `SeatUsageDaily` | `/api/developer-ai-tools/cursor` | Live |
| **Microsoft Copilot** | ✅ `microsoft_copilot` | JSON `{tenantId, clientId, clientSecret}` | `testMicrosoftConnection()` | `sync-microsoft-copilot.worker.ts` | `BusinessAiDaily`, `SeatUsageDaily`, `ProviderUserMapping` | `/api/business-productivity-ai` | Live |
| **Gemini** | ✅ `gemini` (limited) | N/A — no admin API | N/A | None | None (demo data only) | `/api/llm-spend/gemini` (seed data) | Limited |
| **Perplexity** | ✅ `perplexity` (limited) | N/A — no admin API | N/A | None | None (demo data only) | `/api/llm-spend/perplexity` (seed data) | Limited |
| **Anthropic** | ✅ `anthropic` | Admin API Key | Tested via Phase 1 | `sync-claude-usage.worker.ts` | `UsageDaily`, `ModelUsageDaily` | `/api/llm-spend/claude` | Live (Phase 1) |
| **Claude Code** | ✅ `claude_code` | Uses Anthropic key | Uses Anthropic conn | `sync-claude-code.worker.ts` | `ClaudeCodeDaily` | `/api/developer-ai-tools/claude-code` | Live (Phase 1) |

---

## 2. Data Flow per Provider

### OpenAI
1. **Credential**: Admin API key stored encrypted (`ProviderConnection.encryptedApiKey`)
2. **API call**: `GET /organization/usage/completions?group_by=user_id,model,project_id&bucket_width=1d` with pagination via `has_more` / `next_page`
3. **Normalization**: Token counts extracted per user+model+date; cost estimated via in-worker price table; model totals pre-aggregated in a `Map<"model|dateISO", ...>` to avoid last-write-wins on upsert
4. **DB write**: `AiUsageDaily` (per user row), `AiModelUsageDaily` (per model+date aggregate); demo data purged before first write
5. **API read**: `GET /api/llm-spend/openai` reads `AiUsageDaily` + `AiModelUsageDaily`, scoped by `organizationId`
6. **UI**: `/llm-spend/openai` — trend chart, per-user table, per-model breakdown

### GitHub Copilot
1. **Credential**: JSON `{"org": "my-org", "token": "ghp_..."}` stored encrypted
2. **API call**: `GET /orgs/{org}/copilot/billing/seats?per_page=100&page=N` (paginated, terminates when batch < 100); then metrics from `/copilot/metrics/reports/users-28-day/latest` or `/copilot/usage` (with seat-data fallback)
3. **Normalization**: Active seats = seats with `last_activity_at` within 30 days; cost = seats × $19/30 per day; suggestions/acceptances from metrics API
4. **DB write**: `SeatUsageDaily` (one row per day), `DeveloperAiDaily` (one per user per sync), `ProviderUserMapping` (GitHub login → email mapping)
5. **API read**: `GET /api/developer-ai-tools/github-copilot` reads `DeveloperAiDaily` + `SeatUsageDaily`
6. **UI**: `/developer-ai-tools/github-copilot` — seat utilization, acceptance rate, per-user activity

### Cursor
1. **Credential**: Admin API key from Cursor team settings
2. **API call**: Multi-path fallback for members (`/v1/members`, `/members`, `/v1/team/members`, `/team/members`), daily usage, and spending — tries each base URL (api.cursor.com, api.cursor.sh); returns `null` if all 404
3. **Normalization**: Active seats = members with suggestions or lines_added in last 7 days; spending from `spend_cents / 100`; session = any composer/chat/agent request > 0
4. **DB write**: `SeatUsageDaily` (one row per day), `DeveloperAiDaily` (per user+date)
5. **Warning**: If both members and daily usage are empty, a warning is added to `errors[]` indicating possible 404 on all endpoints
6. **API read**: `GET /api/developer-ai-tools/cursor` reads `DeveloperAiDaily` + `SeatUsageDaily`
7. **UI**: `/developer-ai-tools/cursor` — seat count, suggestions, per-user table

### Microsoft Copilot
1. **Credential**: JSON `{"tenantId": "...", "clientId": "...", "clientSecret": "..."}` (Azure App Registration)
2. **Auth**: OAuth 2.0 client credentials flow → Bearer token for Microsoft Graph
3. **API calls**:
   - `GET /subscribedSkus?$select=skuPartNumber,consumedUnits` — finds `Microsoft_365_Copilot` SKU for seat count (matches case-insensitively via `toLowerCase().includes("copilot")`)
   - `GET /reports/getMicrosoft365CopilotUsageUserDetail(period='D30')` — returns CSV with per-user activity dates per app (Teams, Word, Excel, Outlook, PowerPoint, OneNote, Loop, CopilotChat)
4. **Normalization**: CSV parsed with `parseCopilotUserDetailCSV()`; per-app active users counted from `hasCopilotLicense=true` rows; seat cost = totalLicensed × $30/30
5. **DB write**: `SeatUsageDaily` (one row), `BusinessAiDaily` (one per app per day), `ProviderUserMapping` (UPN)
6. **API read**: `GET /api/business-productivity-ai` reads `BusinessAiDaily` + `SeatUsageDaily`
7. **UI**: `/business-productivity-ai/microsoft-copilot` — app breakdown, seat utilization

---

## 3. Mock Fixtures

| File | What It Tests |
|---|---|
| `tests/fixtures/providers/openai-usage.json` | OpenAI paginated usage: 2 pages, `has_more` flag, 3 models, 3 users, 2 days, project-level rows with `user_id: null` |
| `tests/fixtures/providers/github-copilot-seats.json` | GitHub seats: 22 total, 16 active (<30d), 4 inactive (>30d), 2 null activity |
| `tests/fixtures/providers/github-copilot-users.json` | GitHub user metrics: 20 users with completions counts and active days |
| `tests/fixtures/providers/cursor-members.json` | Cursor members response: 15 members with id/email/name/role |
| `tests/fixtures/providers/cursor-usage.json` | Cursor daily usage: 10 users × 7 days = 70 rows; includes zero-activity days |
| `tests/fixtures/providers/microsoft-subscribed-skus.json` | M365 SKUs: includes `Microsoft_365_Copilot` SKU (25 units) and Office E3 |
| `tests/fixtures/providers/microsoft-copilot-user-detail.csv` | M365 user detail CSV: 25 rows, 20 licensed, mix of active/inactive apps |

---

## 4. Known Gaps

| Gap | Description | Impact | Resolution |
|---|---|---|---|
| `ProviderSyncRun` not written | None of the workers (including Anthropic) write `ProviderSyncRun` records after a sync | Audit log and sync history UI will show no data | Add `providerSyncRun.create()` calls once the Audit Logs page is built |
| Microsoft CSV field name mismatch | `parseCopilotUserDetailCSV` uses CSV headers as literal object keys; the worker accesses `u.lastActivityDateTeams` but real CSV headers are `Last Activity Date (Teams)` | App activity counts will all be 0 at runtime | Headers need normalization on parse, or the worker field access must use the literal header string |
| Cursor API paths undocumented | Cursor's API paths are not publicly documented; primary paths may return 404 | Worker falls back to all known alternatives; if all fail, 404 warning is added to errors | Validate with real Cursor admin key |
| GitHub metrics endpoint post-April 2026 | Old `/copilot/metrics` endpoints retired; new endpoints tried but may not be available on all plans | Falls back to seat data (0 completions) | Validate with real GitHub org |
| OpenAI `has_more: undefined` | Older OpenAI API versions may return no `has_more` field; fixed with `data.has_more ? (data.next_page ?? null) : null` | Without fix: would treat undefined as falsy (correct), but `data.next_page ?? null` ensures no undefined next_page | Fix applied |
| Gemini / Perplexity | No admin API exists; providers are `limited: true` and show demo data only | No real data can be synced | By design — directed to `/limitations` page |

---

## 5. Real Key Testing Checklist

When real provider credentials are available, perform the following:

### OpenAI
- [ ] Add Admin API key in Settings → OpenAI → Connect
- [ ] Click "Sync Now" and verify no errors in response
- [ ] Check `/llm-spend/openai` shows real model breakdown
- [ ] Verify `AiModelUsageDaily` has one row per model per day (not per-user rows)
- [ ] Confirm demo data was purged before live data written

### GitHub Copilot
- [ ] Add credentials JSON `{"org":"<your-org>","token":"ghp_..."}` in Settings → GitHub Copilot
- [ ] Click "Sync Now"
- [ ] Verify seat count matches GitHub Copilot → Settings → Seats
- [ ] Verify `last_activity_at` dates are recent for active users
- [ ] Check `/developer-ai-tools/github-copilot` shows correct active seat count

### Cursor
- [ ] Add Admin API key in Settings → Cursor
- [ ] Click "Sync Now"
- [ ] If sync errors contain "Warning: Cursor API returned no members" → check that the API key is an Admin key (not a personal key) and the Cursor plan includes admin API access
- [ ] Verify member count matches Cursor team settings
- [ ] Check `/developer-ai-tools/cursor` shows per-user suggestions

### Microsoft Copilot
- [ ] Create Azure App Registration with `Reports.Read.All` application permission + admin consent
- [ ] Add credentials JSON `{"tenantId":"...","clientId":"...","clientSecret":"..."}` in Settings → Microsoft Copilot
- [ ] Click "Test Connection" to verify OAuth flow works
- [ ] Click "Sync Now"
- [ ] Verify licensed seat count matches M365 Admin Center → Copilot licenses
- [ ] Check `/business-productivity-ai/microsoft-copilot` shows app breakdown

---

## 6. DB Write Targets

| Provider | Tables Written | Key (unique constraint) |
|---|---|---|
| OpenAI | `AiUsageDaily` | `organizationId + provider + date + userEmail` |
| OpenAI | `AiModelUsageDaily` | `organizationId + provider + model + date` |
| GitHub Copilot | `SeatUsageDaily` | `organizationId + provider + date` |
| GitHub Copilot | `DeveloperAiDaily` | `organizationId + provider + date + userEmail` |
| GitHub Copilot | `ProviderUserMapping` | `organizationId + provider + providerUserId` |
| Cursor | `SeatUsageDaily` | `organizationId + provider + date` |
| Cursor | `DeveloperAiDaily` | `organizationId + provider + date + userEmail` |
| Microsoft Copilot | `SeatUsageDaily` | `organizationId + provider + date` |
| Microsoft Copilot | `BusinessAiDaily` | `organizationId + provider + app + date` |
| Microsoft Copilot | `ProviderUserMapping` | `organizationId + provider + providerUserId` |
| All providers (gap) | `ProviderSyncRun` | Not written yet — known gap |

All workers also update `ProviderConnection.lastSyncAt` / `status` via `markProviderSynced()` / `markProviderFailed()`.

---

## 7. Security Notes

### What IS stored
- Encrypted API keys / credentials (`AES-256-GCM`, key from `ENCRYPTION_KEY` env var)
- Token counts, cost estimates, user email addresses, model names
- GitHub login → email mappings
- Microsoft UPNs (user principal names, which are email addresses)
- Seat counts and activity dates (no prompt content)

### What is NOT stored
- Prompt text, code content, or any AI conversation content
- Passwords or personal access token values in plaintext
- Billing card or invoice data
- OAuth refresh tokens (client credentials flow has no refresh token)
- IP addresses or session data beyond JWT auth

### Key rotation
- `ENCRYPTION_KEY` must be a 32-byte base64 value
- Rotating the key requires re-encrypting all `ProviderConnection.encryptedApiKey` values before the old key is removed
- There is no automated key rotation currently; manual rotation only

### Scope validation
- Every API route and worker filters by `organizationId` from the session JWT
- Workers receive `organizationId` as an explicit parameter, never from user input
- `getProviderCredential()` in `connector.interface.ts` fetches credentials only for the given `organizationId`
