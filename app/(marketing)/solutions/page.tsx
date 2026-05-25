import type { Metadata } from "next";
import { Cpu, DollarSign, PieChart, GitBranch, Network, ShieldCheck, Check } from "lucide-react";
import {
  SectionHeader, SectionContainer, PersonaCard, CTASection, Pill,
} from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Solutions — AI cost & governance for every role",
  description:
    "TokenLens is purpose-built for CTOs, CFOs, FinOps, engineering leaders, AI platform teams, and IT/governance — one product, six buyer perspectives.",
};

const PERSONAS = [
  {
    anchor: "cto", role: "CTO", icon: Cpu,
    headline: "Confidently scale AI across the company.",
    needs: [
      "Adoption visibility — who has AI, who doesn't, where rollout is stalling",
      "Provider control — one place to manage credentials + governance policies",
      "Team-level insights — per-team velocity correlation, not just spend",
      "AI rollout confidence — board-ready ROI numbers when budget questions come up",
    ],
  },
  {
    anchor: "cfo", role: "CFO", icon: DollarSign,
    headline: "Predictable AI spend, no more invoice surprises.",
    needs: [
      "Budget visibility — month-to-date burn across every provider",
      "Cost allocation — tag AI spend to teams, projects, business units",
      "Waste detection — idle seats, over-provisioned models, stale API keys",
      "Predictable spend — forecasts and hard-cap alerts before billing day",
    ],
  },
  {
    anchor: "finops", role: "FinOps", icon: PieChart,
    headline: "Treat AI cost like AWS cost.",
    needs: [
      "Trend analysis — week-over-week, month-over-month, anomaly windows",
      "Provider comparison — $/token, $/active dev, $/PR across Claude vs OpenAI vs Copilot",
      "Budget ownership — per-team budgets that map to your existing cost-center model",
      "Reporting — scheduled CSV/PDF for monthly cost reviews",
    ],
  },
  {
    anchor: "engineering", role: "Engineering Leaders", icon: GitBranch,
    headline: "Measure developer AI productivity, not vanity metrics.",
    needs: [
      "Adoption per team — which teams are getting value, which need enablement",
      "Acceptance rate — Copilot/Cursor/Claude Code per-developer signal",
      "Inactive seats — recover budget for new hires",
      "Tool comparison — is Copilot or Cursor better for your stack?",
    ],
  },
  {
    anchor: "platform", role: "AI Platform Teams", icon: Network,
    headline: "Run AI like any other internal platform.",
    needs: [
      "Provider governance — credential rotation, role-based access, policy enforcement",
      "Integration readiness — drop-in connectors for new providers as they launch",
      "Usage analytics — see which internal teams adopt which capabilities",
      "Enablement reporting — show progress on AI platform OKRs",
    ],
  },
  {
    anchor: "it", role: "IT / Governance", icon: ShieldCheck,
    headline: "Audit-ready AI governance out of the box.",
    needs: [
      "Security — encrypted credentials, organization-level data isolation",
      "Compliance — tamper-evident audit log of every admin action",
      "Access visibility — role-based access control with viewer / admin / owner",
      "Policy controls — provider allow/deny, budget caps, anomaly alerts",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="cyan">Solutions</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Built for the people accountable for AI ROI.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-white/65 max-w-2xl leading-relaxed">
            TokenLens speaks the language of every stakeholder — from boardroom cost reviews to per-team enablement metrics.
          </p>
        </div>
      </SectionContainer>

      {/* Persona grid */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-5">
          {PERSONAS.map(p => (
            <PersonaCard
              key={p.role}
              anchor={p.anchor}
              role={p.role}
              icon={p.icon}
              headline={p.headline}
              needs={p.needs}
            />
          ))}
        </div>
      </SectionContainer>

      {/* Persona comparison table */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader
          eyebrow="Side by side"
          title="What each role uses TokenLens for."
        />
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[800px] rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white dark:bg-white/[0.04]">
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/55">Role</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/55">Top question</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/55">Key module</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/55">Reporting cadence</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { role: "CTO",      q: "Is our AI rollout actually working?",              module: "Unified Dashboard",     cadence: "Weekly" },
                  { role: "CFO",      q: "Are we on budget across providers?",               module: "LLM Spend + Budgets",   cadence: "Daily + Monthly" },
                  { role: "FinOps",   q: "Where can we cut without throttling?",             module: "AI Models + Suggestions", cadence: "Weekly" },
                  { role: "Eng Lead", q: "Which teams get value from Copilot?",              module: "Developer AI Tools",    cadence: "Sprint" },
                  { role: "Platform", q: "Are credentials secure and rotating on schedule?", module: "Settings + Audit",      cadence: "Continuous" },
                  { role: "IT/Sec",   q: "Can I prove compliance to auditors?",              module: "Audit Logs + Governance", cadence: "Quarterly" },
                ].map(row => (
                  <tr key={row.role} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{row.role}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-white/70 italic">&ldquo;{row.q}&rdquo;</td>
                    <td className="px-5 py-4 text-emerald-700 dark:text-emerald-300">{row.module}</td>
                    <td className="px-5 py-4 text-slate-500 dark:text-white/55 font-mono text-xs">{row.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionContainer>

      {/* Shared benefits */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader
          eyebrow="Common ground"
          title="What every role gets out of the box."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-3">
          {[
            "Organization-scoped data isolation",
            "Encrypted provider credentials",
            "Role-based access (viewer / admin / owner)",
            "Daily background sync from every provider",
            "PDF & CSV exports for any view",
            "Audit log of every admin action",
          ].map(b => (
            <div key={b} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 flex items-center gap-2 text-sm text-slate-700 dark:text-white/75">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </SectionContainer>

      <CTASection title="See your role's view of TokenLens." />
    </>
  );
}
