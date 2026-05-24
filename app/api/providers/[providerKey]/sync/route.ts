/**
 * POST /api/providers/[providerKey]/sync
 * Trigger a manual data sync for any connected provider.
 */

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { syncOpenAI } from "@/workers/sync-openai.worker";
import { syncGitHubCopilot } from "@/workers/sync-github-copilot.worker";
import { syncCursor } from "@/workers/sync-cursor.worker";
import { syncMicrosoftCopilot } from "@/workers/sync-microsoft-copilot.worker";
import { syncClaudeUsage } from "@/workers/sync-claude-usage.worker";
import { syncClaudeCodeAnalytics } from "@/workers/sync-claude-code.worker";
import { checkAlerts } from "@/workers/alert-checker.worker";

type Ctx = { params: Promise<{ providerKey: string }> };

export async function POST(_req: Request, { params }: Ctx) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { providerKey } = await params;
  const { organizationId } = session;

  let result: { synced: number; errors?: string[]; error?: string; newUsers?: number };

  switch (providerKey) {
    case "anthropic":
      result = await syncClaudeUsage(organizationId);
      break;
    case "claude_code":
      result = await syncClaudeCodeAnalytics(organizationId);
      break;
    case "openai":
      result = await syncOpenAI(organizationId);
      break;
    case "github_copilot":
      result = await syncGitHubCopilot(organizationId);
      break;
    case "cursor":
      result = await syncCursor(organizationId);
      break;
    case "microsoft_copilot":
      result = await syncMicrosoftCopilot(organizationId);
      break;
    default:
      return NextResponse.json({ error: `No sync implementation for '${providerKey}'` }, { status: 400 });
  }

  // Run alert checks after any successful sync
  if (!result.error) {
    await checkAlerts(organizationId).catch(() => {});
  }

  return NextResponse.json({ provider: providerKey, ...result });
}
