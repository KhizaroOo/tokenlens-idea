/**
 * Shared marketing primitives — server components by default.
 * Visual identity: "AI Intelligence Lens" — dark navy, emerald + cyan + soft violet accents,
 * abstract lens/orbit/signal language, glassmorphism, gradient borders.
 */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeader — eyebrow + title + subtitle
// ─────────────────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow, title, subtitle, align = "center", className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-slate-600 dark:text-white/60 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionContainer — consistent horizontal padding + max-width
// ─────────────────────────────────────────────────────────────────────────────

export function SectionContainer({
  children, className = "", id,
}: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GlassCard — gradient-bordered glassmorphism card
// ─────────────────────────────────────────────────────────────────────────────

export function GlassCard({
  children, className = "", padded = true, hover = true,
}: { children: ReactNode; className?: string; padded?: boolean; hover?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.025] ${
        hover ? "transition-all hover:border-emerald-400/30 hover:bg-white dark:bg-white/[0.04]" : ""
      } ${padded ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeatureCard — icon + title + description
// ─────────────────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "emerald" | "cyan" | "violet" | "amber" | "indigo";
  badge?: string;
}

const ACCENT_ICON: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20",
  cyan:    "bg-cyan-500/10    text-cyan-400    ring-cyan-400/20",
  violet:  "bg-violet-500/10  text-violet-400  ring-violet-400/20",
  amber:   "bg-amber-500/10   text-amber-400   ring-amber-400/20",
  indigo:  "bg-indigo-500/10  text-indigo-400  ring-indigo-400/20",
};

export function FeatureCard({ icon: Icon, title, description, accent = "emerald", badge }: FeatureCardProps) {
  return (
    <GlassCard>
      <div className="flex items-start gap-4">
        <div className={`h-10 w-10 rounded-xl grid place-items-center ring-1 ${ACCENT_ICON[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{title}</h3>
            {badge && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-white/55 leading-relaxed">{description}</p>
        </div>
      </div>
    </GlassCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VisualMetricCard — a faux KPI tile shown in mock UI sections
// ─────────────────────────────────────────────────────────────────────────────

export function VisualMetricCard({
  label, value, delta, deltaTone = "emerald", hint, accent = "emerald",
}: {
  label: string; value: string; delta?: string;
  deltaTone?: "emerald" | "red" | "amber" | "cyan";
  hint?: string; accent?: "emerald" | "cyan" | "violet" | "amber" | "indigo";
}) {
  const deltaCls = {
    emerald: "text-emerald-400 bg-emerald-500/10",
    red:     "text-red-400 bg-red-500/10",
    amber:   "text-amber-400 bg-amber-500/10",
    cyan:    "text-cyan-400 bg-cyan-500/10",
  }[deltaTone];
  const dot = {
    emerald: "bg-emerald-400",
    cyan:    "bg-cyan-400",
    violet:  "bg-violet-400",
    amber:   "bg-amber-400",
    indigo:  "bg-indigo-400",
  }[accent];
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/45">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {label}
        </p>
        {delta && (
          <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${deltaCls}`}>
            {delta}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold font-mono tracking-tight tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-slate-400 dark:text-white/40">{hint}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTASection — large dual-button section
// ─────────────────────────────────────────────────────────────────────────────

export function CTASection({
  eyebrow = "Get started",
  title = "Ready to bring your AI stack into one view?",
  subtitle = "Book a demo and see TokenLens applied to your provider mix in under 20 minutes.",
  primary = { label: "Book Demo", href: "/demo" },
  secondary = { label: "Explore Platform", href: "/platform" },
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <SectionContainer className="py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 p-10 lg:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-500/[0.10]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_70%)]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-3">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mx-auto max-w-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-white/60 max-w-2xl mx-auto">{subtitle}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity"
            >
              {primary.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProviderLogoCard — provider tile (text-mark, no real logo files)
// ─────────────────────────────────────────────────────────────────────────────

const PROVIDER_TONE: Record<string, { dot: string; ring: string; glow: string }> = {
  anthropic:        { dot: "bg-emerald-400", ring: "ring-emerald-400/30", glow: "from-emerald-500/15" },
  claude_code:      { dot: "bg-emerald-400", ring: "ring-emerald-400/30", glow: "from-emerald-500/15" },
  openai:           { dot: "bg-cyan-400",    ring: "ring-cyan-400/30",    glow: "from-cyan-500/15"    },
  github_copilot:   { dot: "bg-violet-400",  ring: "ring-violet-400/30",  glow: "from-violet-500/15"  },
  cursor:           { dot: "bg-amber-400",   ring: "ring-amber-400/30",   glow: "from-amber-500/15"   },
  microsoft_copilot:{ dot: "bg-indigo-400",  ring: "ring-indigo-400/30",  glow: "from-indigo-500/15"  },
  gemini:           { dot: "bg-amber-400",   ring: "ring-amber-400/30",   glow: "from-amber-500/10"   },
  perplexity:       { dot: "bg-amber-400",   ring: "ring-amber-400/30",   glow: "from-amber-500/10"   },
};

export function ProviderLogoCard({
  providerKey, label, category, status, examples,
}: {
  providerKey: string;
  label: string;
  category: string;
  status: "available" | "in-progress" | "planned" | "limited";
  examples?: string[];
}) {
  const tone = PROVIDER_TONE[providerKey] ?? PROVIDER_TONE.anthropic;
  const statusStyle = {
    "available":   { cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", label: "Available" },
    "in-progress": { cls: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",       label: "In progress" },
    "planned":     { cls: "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/55",          label: "Planned" },
    "limited":     { cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300",     label: "Limited" },
  }[status];
  return (
    <div className={`group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-5 transition-all hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:bg-white/[0.04]`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent opacity-50`} />
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className={`h-11 w-11 rounded-xl grid place-items-center ring-1 ${tone.ring} bg-gradient-to-br ${tone.glow} to-transparent`}>
          <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${statusStyle.cls}`}>
          {statusStyle.label}
        </span>
      </div>
      <p className="text-base font-semibold">{label}</p>
      <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5 uppercase tracking-wider">{category}</p>
      {examples && examples.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {examples.map(e => (
            <li key={e} className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-white/55">
              <Check className="h-3 w-3 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WorkflowStep — numbered step
// ─────────────────────────────────────────────────────────────────────────────

export function WorkflowStep({
  step, title, description, icon: Icon, last,
}: {
  step: number; title: string; description: string; icon: LucideIcon; last?: boolean;
}) {
  return (
    <div className="relative">
      {!last && (
        <div className="hidden lg:block absolute top-7 left-[calc(100%-1rem)] w-full h-px bg-gradient-to-r from-emerald-400/30 to-transparent" />
      )}
      <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-5 h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 text-[#050810] grid place-items-center font-bold text-sm">
            {step}
          </div>
          <Icon className="h-4 w-4 text-slate-400 dark:text-white/40" />
        </div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-white/55 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PersonaCard — for solutions page
// ─────────────────────────────────────────────────────────────────────────────

export function PersonaCard({
  role, headline, needs, icon: Icon, anchor,
}: {
  role: string;
  headline: string;
  needs: string[];
  icon: LucideIcon;
  anchor?: string;
}) {
  return (
    <div id={anchor} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-6 lg:p-7">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl grid place-items-center bg-emerald-500/10 ring-1 ring-emerald-400/20 text-emerald-400">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">{role}</p>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight">{headline}</h3>
      <ul className="mt-4 space-y-2">
        {needs.map(n => (
          <li key={n} className="flex items-start gap-2 text-sm text-slate-600 dark:text-white/65 leading-relaxed">
            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pill — small status/badge pill used everywhere
// ─────────────────────────────────────────────────────────────────────────────

export function Pill({
  children, tone = "emerald", className = "",
}: {
  children: ReactNode;
  tone?: "emerald" | "cyan" | "violet" | "amber" | "indigo" | "white";
  className?: string;
}) {
  const cls = {
    emerald: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-400/20",
    cyan:    "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 ring-cyan-400/20",
    violet:  "bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-400/20",
    amber:   "bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-400/20",
    indigo:  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 ring-indigo-400/20",
    white:   "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 ring-white/15",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-1 ring-1 ${cls} ${className}`}>
      {children}
    </span>
  );
}
