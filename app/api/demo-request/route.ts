import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/demo-request — public endpoint.
 *
 * Persists demo requests from the public /demo form to DemoRequest.
 * Returns 200 on success, 400 on validation error, 405 on wrong method,
 * 429 on rate-limit, 500 on persistence error.
 *
 * No calendar booking is wired — that requires a real integration
 * (Cal.com / Calendly / Google Calendar) which is intentionally out of
 * scope until configured. Sales team contacts the submitter manually.
 */

const schema = z.object({
  name:    z.string().trim().min(1).max(200),
  email:   z.string().trim().toLowerCase().email().max(254),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  role:    z.string().trim().max(200).optional().or(z.literal("")),
  aiTools: z.string().trim().max(2000).optional().or(z.literal("")),
  message: z.string().trim().max(10000).optional().or(z.literal("")),
});

function emptyToNull(v: string | undefined | null): string | null {
  return v && v.length > 0 ? v : null;
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 demo requests per minute per IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = checkRateLimit(`demo-request:${ip}`, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, company, role, aiTools, message } = parsed.data;

  try {
    const row = await prisma.demoRequest.create({
      data: {
        name,
        email,
        company:   emptyToNull(company),
        role:      emptyToNull(role),
        aiTools:   emptyToNull(aiTools),
        message:   emptyToNull(message),
        sourceIp:  ip === "unknown" ? null : ip,
        userAgent: req.headers.get("user-agent") ?? null,
        referer:   req.headers.get("referer") ?? null,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: row.id }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/demo-request] persistence error", err);
    return NextResponse.json(
      { error: "Could not save request. Please email us at sales@tokenlens.io." },
      { status: 500 }
    );
  }
}

export function GET()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function PUT()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function PATCH()  { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function DELETE() { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
