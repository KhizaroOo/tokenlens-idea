import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact — public endpoint.
 *
 * Persists submissions from the public /contact form to ContactSubmission.
 * Returns 200 on success, 400 on validation error, 405 on wrong method,
 * 429 on rate-limit, 500 on persistence error.
 *
 * No email is sent — that wiring is intentionally out of scope until an
 * email provider (Resend/Postmark/SES) is configured via env. The mailto
 * fallback on the /contact page covers urgent inbound until then.
 */

const schema = z.object({
  name:        z.string().trim().min(1).max(200),
  email:       z.string().trim().toLowerCase().email().max(254),
  company:     z.string().trim().max(200).optional().or(z.literal("")),
  role:        z.string().trim().max(200).optional().or(z.literal("")),
  companySize: z.string().trim().max(50).optional().or(z.literal("")),
  aiTools:     z.string().trim().max(2000).optional().or(z.literal("")),
  message:     z.string().trim().min(1).max(10000),
});

function emptyToNull(v: string | undefined | null): string | null {
  return v && v.length > 0 ? v : null;
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 submissions per minute per IP (matches login-style guardrail)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = checkRateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
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

  const { name, email, company, role, companySize, aiTools, message } = parsed.data;

  try {
    const row = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company:     emptyToNull(company),
        role:        emptyToNull(role),
        companySize: emptyToNull(companySize),
        aiTools:     emptyToNull(aiTools),
        message,
        sourceIp:    ip === "unknown" ? null : ip,
        userAgent:   req.headers.get("user-agent") ?? null,
        referer:     req.headers.get("referer") ?? null,
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: row.id }, { status: 200 });
  } catch (err) {
    console.error("[POST /api/contact] persistence error", err);
    return NextResponse.json(
      { error: "Could not save submission. Please email us at sales@tokenlens.io." },
      { status: 500 }
    );
  }
}

// Explicitly reject non-POST methods so a misconfigured client gets a clean 405.
export function GET()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function PUT()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function PATCH()  { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
export function DELETE() { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: { Allow: "POST" } }); }
