"use client";

/**
 * Dashboard Mockup — renders the real product dashboard screenshots,
 * theme-aware (light/dark). Used on the homepage and demo page.
 *
 * Expected images (drop them in /public/screenshots/):
 *   • dashboard-light.png  — light-mode dashboard screenshot
 *   • dashboard-dark.png   — dark-mode dashboard screenshot
 *
 * If the images aren't there yet, the component renders a lightweight
 * fallback placeholder so the page still works.
 */

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DashboardMockup() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration-safe theme detection — avoid SSR/CSR mismatch
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard hydration-safe mount flag for theme-aware rendering
  useEffect(() => { setMounted(true); }, []);

  // Pre-mount: render dark version by default (matches typical SSR theme)
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const src    = isDark ? "/screenshots/dashboard-dark.png" : "/screenshots/dashboard-light.png";
  const alt    = "TokenLens dashboard — AI spend, token usage, and seat utilization across every connected provider";

  return (
    <div className="relative w-full">
      {/* Museum-caption strip above the frame */}
      <div className="flex items-center justify-between mb-3 sg-caption text-[var(--sg-text-mute)]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--sg-signal)] animate-pulse" />
          OBSERVATORY · LIVE PRODUCT DASHBOARD
        </span>
        <span className="hidden sm:inline">/dashboard</span>
      </div>

      {/* Editorial frame — fine border + corner ticks + subtle glow */}
      <div className="relative border-2 border-[var(--sg-ink)] bg-[var(--sg-panel)] overflow-hidden">
        {/* corner ticks */}
        <span aria-hidden className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-[var(--sg-signal)] z-10" />
        <span aria-hidden className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-[var(--sg-signal)] z-10" />
        <span aria-hidden className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[var(--sg-signal)] z-10" />
        <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[var(--sg-signal)] z-10" />

        {/* Browser-chrome dots — small editorial touch */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b sg-line bg-[var(--sg-bg)]">
          <span className="h-2 w-2 rounded-full bg-[var(--sg-risk)]/60" />
          <span className="h-2 w-2 rounded-full bg-[var(--sg-budget)]/60" />
          <span className="h-2 w-2 rounded-full bg-[var(--sg-signal)]/60" />
          <span className="ml-3 sg-caption text-[var(--sg-text-mute)] text-[10px]">
            tokenlens.io / dashboard
          </span>
        </div>

        {/* Screenshot — aspect ratio matches the source images (~1920×1078 ≈ 16:9) */}
        <div className="relative w-full" style={{ aspectRatio: "1920 / 1078" }}>
          <Image
            key={src}                              // force swap when theme flips
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            priority={false}
            onError={(e) => {
              // Graceful fallback if the screenshot file isn't in /public yet —
              // hide the broken image and let the placeholder underneath show.
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Placeholder underneath — only visible if the <Image> fails to load */}
          <div className="absolute inset-0 -z-0 flex flex-col items-center justify-center gap-3 bg-[var(--sg-bg)] text-center p-8">
            <span className="sg-caption text-[var(--sg-text-mute)]">DASHBOARD SCREENSHOT</span>
            <p className="sg-display text-2xl text-[var(--sg-text)] max-w-md">
              Add <code className="font-data text-sm bg-[var(--sg-panel)] px-2 py-1">/public/screenshots/dashboard-{isDark ? "dark" : "light"}.png</code>
            </p>
            <p className="text-xs text-[var(--sg-text-soft)] max-w-md">
              Drop the {isDark ? "dark" : "light"}-mode dashboard screenshot at the path above. The component will pick it up on the next request.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="mt-3 flex items-center justify-between sg-caption text-[var(--sg-text-mute)]">
        <span>SCREENSHOT · {isDark ? "DARK MODE" : "LIGHT MODE"}</span>
        <span>{new Date().getFullYear()} · TOKENLENS</span>
      </div>
    </div>
  );
}
