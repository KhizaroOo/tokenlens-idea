/**
 * Canonical public site URL — used by `app/robots.ts`, `app/sitemap.ts`, and
 * OpenGraph metadata.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL                  (recommended in production)
 *   2. NEXT_PUBLIC_VERCEL_URL (auto-set by Vercel — needs `https://` prefix)
 *   3. http://localhost:3000                 (dev fallback)
 *
 * TODO before public launch: set NEXT_PUBLIC_SITE_URL in the production env
 * (e.g. `https://tokenlens.io`) so robots/sitemap/OG point to the real
 * canonical domain.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.length > 0) {
    return explicit.replace(/\/$/, "");
  }

  // Vercel auto-injects this on previews / prod — host only, no scheme.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercel && vercel.length > 0) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
