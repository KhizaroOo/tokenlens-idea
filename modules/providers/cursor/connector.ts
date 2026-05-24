/**
 * Cursor Admin API connector.
 *
 * Requires an Admin API Key from Cursor team settings.
 * Base URL: https://api.cursor.com
 *
 * What we can fetch:
 *   - Daily usage per user: lines added/deleted, suggestions accepted/shown
 *   - Member list with emails
 *   - Per-user spending in cents (premium requests only)
 *
 * What we CANNOT fetch:
 *   - Base subscription cost (flat rate, not in API)
 *   - Granular usage events (Enterprise-only endpoint)
 *   - History beyond 30-day API window (fetch in 30-day chunks)
 */

const BASE = "https://api.cursor.com";

async function cursorFetch(apiKey: string, path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cursor API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export interface CursorMember {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface CursorDailyUsage {
  date: string; // "YYYY-MM-DD"
  user_email: string;
  lines_added: number;
  lines_deleted: number;
  suggestions_shown: number;
  suggestions_accepted: number;
  tab_completions: number;
  composer_requests: number;
  chat_requests: number;
  agent_requests: number;
  model_usage?: Record<string, number>;
}

export interface CursorSpending {
  user_email: string;
  spend_cents: number;
  premium_requests: number;
}

export async function testCursorConnection(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await cursorFetch(apiKey, "/members?limit=1");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function fetchCursorMembers(apiKey: string): Promise<CursorMember[]> {
  const data = await cursorFetch(apiKey, "/members");
  return data.members ?? data ?? [];
}

export async function fetchCursorDailyUsage(
  apiKey: string,
  startDate: Date,
  endDate: Date
): Promise<CursorDailyUsage[]> {
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const data = await cursorFetch(
    apiKey,
    `/usage/daily?start_date=${fmt(startDate)}&end_date=${fmt(endDate)}`
  );
  return data.data ?? data ?? [];
}

export async function fetchCursorSpending(apiKey: string): Promise<CursorSpending[]> {
  const data = await cursorFetch(apiKey, "/spending");
  return data.users ?? data ?? [];
}
