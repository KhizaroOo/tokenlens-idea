import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Sparkles,
  AlertTriangle, Eye, ShieldCheck, Activity,
  Layers, Users, BrainCircuit, FileBarChart, BellRing, Building2,
  TrendingUp, DollarSign, Cpu, Network, GitBranch, Wallet,
  PieChart, BarChart3, LineChart,
  RefreshCw, CheckCircle2,
} from "lucide-react";
import {
  SectionHeader, SectionContainer, GlassCard,
  FeatureCard, VisualMetricCard, CTASection,
  WorkflowStep, Pill,
} from "@/components/marketing/primitives";
import { DashboardMockup } from "@/components/marketing/DashboardMockup";
import { ProviderOrbit } from "@/components/marketing/ProviderOrbit";
import { DataFlowDiagram } from "@/components/marketing/DataFlowDiagram";

export const metadata: Metadata = {
  title: "TokenLens — Control your company's AI spend before it becomes your next cloud bill",
  description:
    "TokenLens helps teams monitor AI costs, adoption, provider usage, team productivity, and governance across Claude, OpenAI, GitHub Copilot, Cursor, Microsoft Copilot, and more.",
  openGraph: {
    title: "TokenLens — AI spend, adoption & governance dashboard",
    description:
      "One operating dashboard for company-wide AI usage. Monitor spend, govern adoption, prove ROI.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <SectionContainer className="pt-16 lg:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Pill tone="emerald">
              <Sparkles className="h-3 w-3" />
              AI Intelligence Lens
            </Pill>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Control your company&apos;s
              <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                AI spend
              </span>
              before it becomes your next cloud bill.
            </h1>
            <p className="mt-6 text-base lg:text-lg text-white/65 max-w-xl leading-relaxed">
              TokenLens helps teams monitor AI costs, adoption, provider usage, team productivity, and governance across
              Claude, OpenAI, GitHub Copilot, Cursor, Microsoft Copilot, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-3 border border-white/15 text-white hover:bg-white/5 transition-colors"
              >
                Explore Platform
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              <VisualMetricCard label="Connected" value="7"      accent="emerald" />
              <VisualMetricCard label="Users"     value="428"    accent="cyan"    />
              <VisualMetricCard label="MTD Spend" value="$48.2K" accent="violet"  />
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative">
            <DashboardMockup />
          </div>
        </div>
      </SectionContainer>

      {/* ── Problem section ────────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="The problem"
          title={
            <>
              AI spend is becoming the
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"> next cloud spend problem</span>.
            </>
          }
          subtitle="AI tools are everywhere — Claude, OpenAI, Copilot, Cursor, M365 — but each one ships its own dashboard, its own pricing model, and its own admin console. Leadership has no unified view of cost, adoption, or governance."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: AlertTriangle, title: "Fragmented dashboards",  desc: "Every provider has its own console. Costs live in separate PDFs and CSV exports.",                  tone: "amber"  as const },
            { icon: Wallet,       title: "Surprise invoices",       desc: "AI budgets blow past targets because spend isn't visible until billing day.",                       tone: "red"    as const },
            { icon: Eye,          title: "Zero governance",         desc: "No alerts, no per-team budgets, no audit log of who connected which provider when.",                tone: "violet" as const },
          ].map(p => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ring-1 ${
                p.tone === "amber"  ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"   :
                p.tone === "red"    ? "bg-red-500/10 text-red-400 ring-red-400/20"         :
                                      "bg-violet-500/10 text-violet-400 ring-violet-400/20"
              }`}>
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* ── Provider orbit ─────────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ProviderOrbit />
          </div>
          <div className="order-1 lg:order-2">
            <Pill tone="cyan"><Network className="h-3 w-3" /> Provider coverage</Pill>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">
              One control plane for every AI provider in your stack.
            </h2>
            <p className="mt-4 text-base text-white/65 leading-relaxed">
              TokenLens connects to admin APIs across LLMs, developer AI tools, and business productivity AI — pulling usage, cost, and seat data into a single normalized model.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Anthropic Claude + Claude Code",
                "OpenAI (GPT-4o, o1, o3 families)",
                "GitHub Copilot Business / Enterprise",
                "Cursor Business",
                "Microsoft 365 Copilot",
                "Gemini & Perplexity (where APIs allow)",
              ].map(c => (
                <li key={c} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/40 italic leading-relaxed">
              Provider coverage may vary by plan, API access, and customer environment. See <Link href="/integrations" className="text-emerald-300 hover:text-emerald-200 underline">Integrations</Link> for details.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* ── 6 Product modules ─────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="Product"
          title="Six modules. One operating dashboard."
          subtitle="Built for the way modern AI organizations actually work — across providers, teams, and personas."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon={BarChart3}    accent="emerald" title="Unified Dashboard"        description="Total AI spend, active users, provider mix, budget burn, and trends from one executive view." />
          <FeatureCard icon={Users}        accent="cyan"    title="AI Users & Teams"         description="Who is actually using AI, who is dormant, who is over-consuming — by team and by user." />
          <FeatureCard icon={Cpu}          accent="violet"  title="AI Models"                description="Model-level cost, volume, and provider concentration. Spot optimization opportunities." />
          <FeatureCard icon={GitBranch}    accent="indigo"  title="Developer AI Tools"       description="Track Claude Code, GitHub Copilot, Cursor adoption + acceptance rates by engineering team." />
          <FeatureCard icon={DollarSign}   accent="amber"   title="LLM & API Spend"          description="Monitor token spend across Claude, OpenAI, Gemini, Perplexity in one normalized view." />
          <FeatureCard icon={ShieldCheck}  accent="emerald" title="Governance & Alerts"      description="Budgets, threshold rules, anomaly detection, audit trails, provider policies, reports." />
        </div>
      </SectionContainer>

      {/* ── Before / After ────────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="Before / After"
          title="From 7 provider tabs to 1 operating dashboard."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-7">
            <Pill tone="amber" className="mb-4">Before TokenLens</Pill>
            <ul className="space-y-3 text-sm text-white/65">
              {[
                "Pulling 6 CSVs every month from 6 different consoles",
                "No idea which teams or users are driving spend",
                "Finance gets surprised on invoice day",
                "No alerts when usage spikes 3× overnight",
                "Idle Copilot/Cursor seats keep auto-renewing",
                "No board-ready answer to 'is our AI budget working?'",
              ].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/70 mt-2 flex-shrink-0" />
                  <span className="line-through decoration-red-400/30 decoration-2">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* After */}
          <div className="relative rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.06] to-cyan-500/[0.04] p-7 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />
            <Pill tone="emerald" className="mb-4 relative">With TokenLens</Pill>
            <ul className="relative space-y-3 text-sm text-white/85">
              {[
                "One live dashboard across every provider",
                "Per-team, per-user, per-model cost attribution",
                "Spend forecasts and budget burn-down visible in real time",
                "Anomaly alerts the same day a spike happens",
                "Idle-seat reports + one-click reclaim workflow",
                "Quarterly AI ROI report — board-ready PDF",
              ].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* ── Workflow ──────────────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="How it works"
          title="From provider keys to ROI in six steps."
          subtitle="A repeatable workflow your CTO, CFO, and FinOps lead can all subscribe to."
        />
        <div className="mt-12">
          <DataFlowDiagram />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <WorkflowStep step={1} icon={Layers}        title="Connect"  description="Add encrypted provider credentials in Settings." />
            <WorkflowStep step={2} icon={RefreshCw}     title="Sync"     description="Daily sync workers pull usage + cost." />
            <WorkflowStep step={3} icon={BrainCircuit}  title="Analyze"  description="Aggregate by user, team, model, provider." />
            <WorkflowStep step={4} icon={AlertTriangle} title="Detect"   description="Anomaly + waste detection runs continuously." />
            <WorkflowStep step={5} icon={ShieldCheck}   title="Govern"   description="Budgets, policies, audit, role-based access." />
            <WorkflowStep step={6} icon={FileBarChart}  title="Report"   description="PDF/CSV reports for board, FinOps, eng leads." last />
          </div>
        </div>
      </SectionContainer>

      {/* ── Use cases by persona ─────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="Use cases by persona"
          title="Speaks the language of every stakeholder."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { role: "CTO",         icon: Cpu,           tone: "emerald" as const, headline: "Adoption visibility + provider control",   bullet: "See which teams have AI, which don't, and where rollout is stalling." },
            { role: "CFO",         icon: DollarSign,    tone: "amber"   as const, headline: "Budget visibility, predictable spend",     bullet: "Allocate AI cost to business units. No more surprise invoices." },
            { role: "FinOps",      icon: PieChart,      tone: "cyan"    as const, headline: "AI spend reporting + provider comparison", bullet: "Treat AI cost the way you already treat AWS — with forecasts and accountability." },
            { role: "Eng Leaders", icon: GitBranch,     tone: "violet"  as const, headline: "Developer AI adoption + productivity",     bullet: "Measure Copilot/Cursor/Claude Code adoption + acceptance per team." },
            { role: "Platform",    icon: Network,       tone: "indigo"  as const, headline: "Provider governance + integration",        bullet: "One enablement console for every internal AI capability." },
            { role: "IT/Sec",      icon: ShieldCheck,   tone: "emerald" as const, headline: "Audit, access, policies, compliance",      bullet: "Tamper-evident audit log + role-based access ready for SOC 2." },
          ].map(p => (
            <div key={p.role} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl grid place-items-center ring-1 ${
                  p.tone === "emerald" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20" :
                  p.tone === "amber"   ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"       :
                  p.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"          :
                  p.tone === "violet"  ? "bg-violet-500/10 text-violet-400 ring-violet-400/20"    :
                                         "bg-indigo-500/10 text-indigo-400 ring-indigo-400/20"
                }`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">{p.role}</p>
              </div>
              <p className="mt-4 text-base font-semibold">{p.headline}</p>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.bullet}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/solutions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            See all solutions by role <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionContainer>

      {/* ── Metrics tracked ─────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="Metrics TokenLens tracks"
          title="The numbers your board actually wants."
        />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <VisualMetricCard label="MTD AI Spend"      value="$48.2K" delta="+8.2%" deltaTone="amber"   accent="amber"   hint="Across 7 providers" />
          <VisualMetricCard label="Active Users"      value="428"    delta="+12"   deltaTone="emerald" accent="emerald" hint="of 612 licensed" />
          <VisualMetricCard label="Budget Visibility" value="91%"    delta="↑"     deltaTone="emerald" accent="cyan"    hint="of providers tracked" />
          <VisualMetricCard label="Optimize Opp."     value="18%"    delta="$8.7K" deltaTone="emerald" accent="violet"  hint="Reclaimable idle seats" />
          <VisualMetricCard label="Teams Tracked"     value="34"     delta="6 new" deltaTone="emerald" accent="emerald" hint="Across business units" />
          <VisualMetricCard label="Tokens (30d)"      value="412M"   delta="+3.4%" deltaTone="cyan"    accent="cyan"    hint="GPT-4o + Claude Sonnet" />
          <VisualMetricCard label="Cost / Active Dev" value="$112"   delta="-6%"   deltaTone="emerald" accent="emerald" hint="Down month-over-month" />
          <VisualMetricCard label="Anomalies Caught"  value="14"     delta="last 30d" deltaTone="amber" accent="amber" hint="Auto-flagged spikes" />
        </div>
      </SectionContainer>

      {/* ── Governance ─────────────────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Pill tone="violet"><ShieldCheck className="h-3 w-3" /> Governance</Pill>
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">
              Catch runaway AI spend the same day it happens.
            </h2>
            <p className="mt-4 text-base text-white/65 leading-relaxed">
              Set hard budgets per provider and per team. Add anomaly detection rules.
              Get notified the moment usage breaks normal pattern — and route alerts to Slack, Teams, email, or PagerDuty.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Per-provider monthly budget caps",
                "Anomaly detection on token + cost volume",
                "Inactive-seat alerts to reclaim license waste",
                "Tamper-evident audit log for SOC 2 evidence",
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <GlassCard className="space-y-3">
            {[
              { icon: BellRing,       tone: "amber"  as const, label: "Budget Alert",   text: "OpenAI on track to exceed $12K monthly cap by $1.2K.",   when: "2 hrs ago" },
              { icon: Activity,       tone: "red"    as const, label: "Anomaly",        text: "Cursor team-A: 4× normal token usage in last 24h.",      when: "this morning" },
              { icon: Users,          tone: "cyan"   as const, label: "Idle Seats",     text: "12 inactive Copilot seats — $228/mo reclaim available.", when: "today" },
              { icon: ShieldCheck,    tone: "emerald" as const,label: "Audit Event",    text: "Anthropic credential rotated by admin@acme.com.",        when: "4d ago" },
            ].map((a, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-start gap-3">
                <div className={`h-9 w-9 rounded-lg grid place-items-center ring-1 ${
                  a.tone === "amber"   ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"     :
                  a.tone === "red"     ? "bg-red-500/10 text-red-400 ring-red-400/20"           :
                  a.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"        :
                                         "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20"
                }`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white/55">{a.label}</p>
                  <p className="mt-0.5 text-sm text-white/90">{a.text}</p>
                  <p className="mt-1 text-[11px] text-white/35">{a.when}</p>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </SectionContainer>

      {/* ── Integration coverage strip ──────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <SectionHeader
          eyebrow="Integrations"
          title="Plugs into the stack you already use."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { name: "Claude",        tone: "emerald" },
            { name: "Claude Code",   tone: "emerald" },
            { name: "OpenAI",        tone: "cyan"    },
            { name: "GitHub Copilot",tone: "violet"  },
            { name: "Cursor",        tone: "amber"   },
            { name: "M365 Copilot",  tone: "indigo"  },
            { name: "Gemini",        tone: "amber"   },
            { name: "Perplexity",    tone: "amber"   },
          ].map(p => (
            <div key={p.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center transition-colors hover:bg-white/[0.04]">
              <div className={`mx-auto h-2 w-2 rounded-full ${
                p.tone === "emerald" ? "bg-emerald-400" :
                p.tone === "cyan"    ? "bg-cyan-400"    :
                p.tone === "violet"  ? "bg-violet-400"  :
                p.tone === "amber"   ? "bg-amber-400"   :
                                       "bg-indigo-400"
              }`} />
              <p className="mt-2 text-xs font-semibold text-white/80">{p.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            See full integration matrix <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionContainer>

      {/* ── Differentiation block ──────────────────────────────────────── */}
      <SectionContainer className="py-20 lg:py-28">
        <div className="relative rounded-3xl border border-white/10 p-10 lg:p-14 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.10),transparent_60%)] pointer-events-none" />
          <div className="relative grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Pill tone="violet"><LineChart className="h-3 w-3" /> Why TokenLens</Pill>
              <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Provider dashboards are useful — but they only show one piece of the story.
              </h2>
              <p className="mt-4 text-base text-white/65 max-w-2xl leading-relaxed">
                TokenLens gives leadership one operating view across providers, users, teams, tools, models, budgets, and governance. Not LLM observability. Not cloud cost management. Not seat management. The <em className="text-emerald-300 not-italic">AI operating dashboard</em>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                { val: "1 dashboard", tone: "emerald" },
                { val: "8 providers", tone: "cyan" },
                { val: "6 modules",   tone: "violet" },
                { val: "0 spreadsheets", tone: "amber" },
              ].map(s => (
                <div key={s.val} className={`rounded-xl border p-4 ${
                  s.tone === "emerald" ? "border-emerald-400/20 bg-emerald-500/[0.06]" :
                  s.tone === "cyan"    ? "border-cyan-400/20 bg-cyan-500/[0.06]"        :
                  s.tone === "violet"  ? "border-violet-400/20 bg-violet-500/[0.06]"    :
                                         "border-amber-400/20 bg-amber-500/[0.06]"
                }`}>
                  <p className="text-sm font-bold tracking-tight">{s.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <CTASection
        title="One operating dashboard for your company's AI."
        subtitle="See TokenLens applied to your provider mix in under 20 minutes."
      />
    </>
  );
}
