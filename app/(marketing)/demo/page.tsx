"use client";

import { useState } from "react";
import { CalendarDays, BarChart3, Network, Users, GitBranch, ShieldCheck, FileBarChart, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { SectionContainer, Pill, VisualMetricCard } from "@/components/marketing/primitives";
import { DashboardMockup } from "@/components/marketing/DashboardMockup";

const AGENDA = [
  { icon: BarChart3,    label: "AI spend dashboard",       hint: "Cost across providers, MTD burn, forecasts"      },
  { icon: Network,      label: "Provider usage overview",  hint: "Side-by-side comparison of your stack"           },
  { icon: Users,        label: "User & team adoption",     hint: "Per-user activity, per-team utilization"         },
  { icon: GitBranch,    label: "Developer AI tools",       hint: "Copilot / Cursor / Claude Code acceptance rates" },
  { icon: ShieldCheck,  label: "Governance & alerts",      hint: "Budgets, thresholds, anomaly detection"          },
  { icon: FileBarChart, label: "Reporting roadmap",        hint: "What ships next + how it fits your workflow"     },
];

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to calendar/CRM endpoint (e.g. Cal.com, HubSpot, or /api/demo)
    setSubmitted(true);
  }

  const INPUT = "w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-white/30 focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 transition-colors";
  const LABEL = "block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/55 mb-1.5";

  return (
    <>
      {/* Hero */}
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Pill tone="emerald"><Sparkles className="h-3 w-3" /> Book a Demo</Pill>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              See TokenLens applied to <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">your AI stack</span>.
            </h1>
            <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-white/65 leading-relaxed max-w-xl">
              Twenty minutes. Live dashboard walk-through. Q&amp;A on your provider mix.
              You walk away with a deployment plan, whether or not you buy.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 max-w-md">
              <VisualMetricCard label="Duration" value="20 min"   accent="emerald" />
              <VisualMetricCard label="Format"   value="Zoom"     accent="cyan"    />
              <VisualMetricCard label="Outcome"  value="Plan"     accent="violet"  />
            </div>
          </div>

          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </SectionContainer>

      {/* Agenda */}
      <SectionContainer className="py-12 lg:py-16">
        <Pill tone="cyan"><Clock className="h-3 w-3" /> Agenda</Pill>
        <h2 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">What you&apos;ll see in the demo.</h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENDA.map((item, i) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.025] p-5 flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 text-[#050810] grid place-items-center text-xs font-bold flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-emerald-400" />
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-white/55 leading-relaxed">{item.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Form */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Pill tone="emerald"><CalendarDays className="h-3 w-3" /> Schedule</Pill>
            <h3 className="mt-4 text-2xl lg:text-3xl font-bold tracking-tight">Pick a time that works for your team.</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-white/65 leading-relaxed">
              Once you fill out the form, we&apos;ll send a calendar link with 6+ time slot options across timezones.
            </p>
            <div className="mt-6 space-y-2.5">
              {[
                "Live walkthrough — no slide deck",
                "Bring your own provider stack",
                "Get a deployment plan in writing after the call",
                "Free, no obligation",
              ].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-8 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                <p className="mt-4 text-lg font-semibold">Demo request received.</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/65">
                  Check your inbox in the next few minutes for a calendar link with available time slots.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-6 lg:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={LABEL}>Name</label>
                    <input id="name" name="name" type="text" required className={INPUT} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className={LABEL}>Work email</label>
                    <input id="email" name="email" type="email" required className={INPUT} placeholder="jane@company.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className={LABEL}>Company</label>
                    <input id="company" name="company" type="text" className={INPUT} placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label htmlFor="role" className={LABEL}>Role</label>
                    <input id="role" name="role" type="text" className={INPUT} placeholder="VP Engineering / CFO / FinOps Lead" />
                  </div>
                </div>
                <div>
                  <label htmlFor="tools" className={LABEL}>AI tools you currently pay for</label>
                  <input id="tools" name="tools" type="text" className={INPUT} placeholder="Claude, OpenAI, GitHub Copilot, Cursor…" />
                </div>
                <div>
                  <label htmlFor="message" className={LABEL}>What would make this demo worth your time?</label>
                  <textarea id="message" name="message" rows={3} className={INPUT} placeholder="The biggest gap in our AI cost visibility is…" />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] hover:opacity-90 transition-opacity"
                >
                  Request Demo <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
