import type { Metadata } from "next";
import {
  BarChart3, Users, Building2, Cpu, GitBranch, DollarSign,
  Briefcase, ShieldCheck, AlertTriangle, FileBarChart, Settings2,
  Layers, ArrowRight, Network,
} from "lucide-react";
import Link from "next/link";
import {
  SectionHeader, SectionContainer, GlassCard,
  VisualMetricCard, CTASection, Pill,
} from "@/components/marketing/primitives";
import { DataFlowDiagram } from "@/components/marketing/DataFlowDiagram";

export const metadata: Metadata = {
  title: "Platform — TokenLens AI Operating Dashboard",
  description:
    "Twelve modules covering AI users, teams, models, developer AI tools, LLM spend, business productivity AI, governance, alerts, reports, and integrations.",
};

interface Module {
  icon: typeof BarChart3;
  tone: "emerald" | "cyan" | "violet" | "amber" | "indigo";
  title: string;
  description: string;
  buyerCan: string;
  metrics: string[];
}

const MODULES: Module[] = [
  {
    icon: BarChart3, tone: "emerald",
    title: "Unified Dashboard",
    description: "Track total AI spend, active users, provider mix, budget usage, and usage trends from one executive view.",
    buyerCan: "How much is our company spending on AI this month, across every provider?",
    metrics: ["MTD AI spend", "Active users", "Provider mix", "Budget burn-down", "Token volume trends"],
  },
  {
    icon: Users, tone: "cyan",
    title: "AI Users",
    description: "Understand who is actively using AI tools, who is inactive, who is over-consuming, and where adoption is growing.",
    buyerCan: "Which users actually use AI — and which seats are we paying for but nobody touches?",
    metrics: ["Active vs inactive users", "Top consumers", "Adoption growth", "Per-user cost"],
  },
  {
    icon: Building2, tone: "violet",
    title: "AI Teams",
    description: "Compare AI usage and spend across engineering, product, support, operations, and business teams.",
    buyerCan: "Which teams drive the most AI value — and which need enablement?",
    metrics: ["Per-team cost", "Per-team adoption rate", "Team velocity correlation", "Cross-team comparison"],
  },
  {
    icon: Cpu, tone: "indigo",
    title: "AI Models",
    description: "Analyze model-level cost, usage volume, provider concentration, and optimization opportunities.",
    buyerCan: "Are we using the right model for each workload — or paying GPT-4o for what GPT-4o-mini could do?",
    metrics: ["Cost per model", "Token volume per model", "Provider concentration", "Optimization opportunities"],
  },
  {
    icon: GitBranch, tone: "violet",
    title: "Developer AI Tools",
    description: "Track Claude Code, GitHub Copilot, Cursor, and other engineering AI assistant usage.",
    buyerCan: "What's the adoption + acceptance rate per engineering team for coding assistants?",
    metrics: ["Seats licensed vs active", "Acceptance rate", "Suggestions per day", "Lines added/removed"],
  },
  {
    icon: DollarSign, tone: "amber",
    title: "LLM / API Spend",
    description: "Monitor Claude, OpenAI, Gemini, Perplexity, and other API-based AI spend.",
    buyerCan: "Where's the token spend concentrated — model, project, or user?",
    metrics: ["Cost per provider", "Tokens by model", "Project-level breakdown", "Cached vs fresh tokens"],
  },
  {
    icon: Briefcase, tone: "indigo",
    title: "Business Productivity AI",
    description: "Understand Microsoft Copilot and productivity AI adoption across business users.",
    buyerCan: "Are our M365 Copilot licenses being used by Teams, Word, Excel, Outlook?",
    metrics: ["Licensed seat count", "Active users per app", "Last activity date", "Per-app utilization"],
  },
  {
    icon: ShieldCheck, tone: "emerald",
    title: "Governance",
    description: "Create budgets, alerts, limits, audit trails, provider policies, and AI usage reports.",
    buyerCan: "Can I prove to my auditor every AI credential change, budget edit, and admin action?",
    metrics: ["Active budgets", "Audit events", "Policy rules", "Role-based access"],
  },
  {
    icon: AlertTriangle, tone: "amber",
    title: "Provider Limits",
    description: "Honest documentation of what each provider API can and cannot provide. No vendor-style overpromising.",
    buyerCan: "Why can't I see daily granularity for Microsoft Copilot? Why is Gemini limited?",
    metrics: ["Coverage by provider", "API capabilities", "Computed vs measured fields"],
  },
  {
    icon: FileBarChart, tone: "cyan",
    title: "Reports & Alerts",
    description: "Scheduled executive reports, threshold alerts, anomaly detection — delivered to Slack, email, or PDF.",
    buyerCan: "Can I get a weekly CFO digest and same-day anomaly alerts?",
    metrics: ["Scheduled reports", "Triggered alerts", "Delivery channels", "Alert response rate"],
  },
  {
    icon: Settings2, tone: "emerald",
    title: "Settings & Integrations",
    description: "Encrypted credential storage, per-provider sync controls, role-based access, organization scoping.",
    buyerCan: "How are our provider keys stored, and can I rotate them safely?",
    metrics: ["Encrypted credentials", "Sync history", "User roles", "Organization isolation"],
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="emerald"><Layers className="h-3 w-3" /> Platform</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            The complete AI operating dashboard.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-white/65 max-w-2xl leading-relaxed">
            Twelve modules covering every angle of AI usage in your company — from per-user adoption to per-model cost to per-provider governance.
          </p>
        </div>
      </SectionContainer>

      {/* Quick metric strip */}
      <SectionContainer className="pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <VisualMetricCard label="Modules"    value="12"     accent="emerald" hint="Out of the box" />
          <VisualMetricCard label="Providers"  value="8"      accent="cyan"    hint="LLM + Dev + Business" />
          <VisualMetricCard label="Personas"   value="6+"     accent="violet"  hint="CTO/CFO/FinOps/Eng/Platform/IT" />
          <VisualMetricCard label="Sync workers" value="Daily" accent="amber"  hint="Background ingestion" />
        </div>
      </SectionContainer>

      {/* Modules grid */}
      <SectionContainer className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="Modules"
          title="Built around real questions leadership asks."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {MODULES.map(m => (
            <GlassCard key={m.title}>
              <div className="flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl grid place-items-center ring-1 ${
                  m.tone === "emerald" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20" :
                  m.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"           :
                  m.tone === "violet"  ? "bg-violet-500/10 text-violet-400 ring-violet-400/20"     :
                  m.tone === "amber"   ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"        :
                                         "bg-indigo-500/10 text-indigo-400 ring-indigo-400/20"
                }`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-white/55 leading-relaxed">{m.description}</p>
                  <div className="mt-4 rounded-lg bg-slate-50 dark:bg-white/[0.03] p-3 border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/70 mb-1">Buyer can answer</p>
                    <p className="text-xs text-slate-600 dark:text-white/70 italic">&ldquo;{m.buyerCan}&rdquo;</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.metrics.map(metric => (
                      <span key={metric} className="text-[10px] font-mono rounded-full px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/55 border border-slate-100 dark:border-white/5">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionContainer>

      {/* Architecture flow */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader
          eyebrow="Architecture"
          title="Providers in. Intelligence out."
          subtitle="A single pipeline normalizes every provider API into a unified data model — so the dashboard works the same whether you have 2 providers or 20."
        />
        <div className="mt-12">
          <DataFlowDiagram />
        </div>
      </SectionContainer>

      {/* See also */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/integrations" className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.025] p-5 hover:bg-white dark:bg-white/[0.04] transition-colors flex items-start gap-3 group">
            <Network className="h-5 w-5 text-emerald-400 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Integrations</p>
              <p className="text-xs text-slate-500 dark:text-white/55 mt-0.5">8 providers covered</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400 dark:text-white/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/solutions" className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.025] p-5 hover:bg-white dark:bg-white/[0.04] transition-colors flex items-start gap-3 group">
            <Users className="h-5 w-5 text-cyan-400 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Solutions by role</p>
              <p className="text-xs text-slate-500 dark:text-white/55 mt-0.5">CTO · CFO · FinOps · Eng</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400 dark:text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
          <Link href="/security" className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.025] p-5 hover:bg-white dark:bg-white/[0.04] transition-colors flex items-start gap-3 group">
            <ShieldCheck className="h-5 w-5 text-violet-400 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Security</p>
              <p className="text-xs text-slate-500 dark:text-white/55 mt-0.5">Built with enterprise principles</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400 dark:text-white/40 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </SectionContainer>

      <CTASection title="See the full platform in 20 minutes." />
    </>
  );
}
