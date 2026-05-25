import type { Metadata } from "next";
import { Eye, Building2, Network, GitBranch, DollarSign, Briefcase, BellRing, TrendingUp, Users, Cpu, FileBarChart, Layers } from "lucide-react";
import { SectionHeader, SectionContainer, CTASection, Pill } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Use Cases — Specific AI cost and governance problems TokenLens solves",
  description:
    "AI spend visibility, team-level allocation, provider usage monitoring, developer AI adoption, LLM cost optimization, budget alerts, ROI reporting, inactive seat detection, model usage optimization, and multi-provider management.",
};

interface UseCase {
  icon: typeof Eye;
  tone: "emerald" | "cyan" | "violet" | "amber" | "indigo";
  title: string;
  problem: string;
  solution: string;
  outcome: string;
}

const USE_CASES: UseCase[] = [
  {
    icon: Eye, tone: "emerald", title: "AI Spend Visibility",
    problem: "Spend is scattered across 6+ provider consoles — no consolidated view.",
    solution: "One dashboard pulls cost from every provider into a normalized model.",
    outcome: "Finance sees consolidated MTD AI spend within 24 hrs of connecting providers.",
  },
  {
    icon: Building2, tone: "cyan", title: "Team-Level Cost Allocation",
    problem: "AI cost shows up as one line item — no team or business unit attribution.",
    solution: "Map provider users to teams + tag spend at every level of the org chart.",
    outcome: "CFOs allocate AI cost to cost centers the same way they allocate cloud.",
  },
  {
    icon: Network, tone: "violet", title: "Provider Usage Monitoring",
    problem: "No idea if 7 AI tools are all earning their keep or if 2 of them are duplicates.",
    solution: "Side-by-side provider comparison: cost, users, models, productivity outcomes.",
    outcome: "Procurement renegotiates or consolidates with hard data, not vibes.",
  },
  {
    icon: GitBranch, tone: "violet", title: "Developer AI Tool Adoption",
    problem: "Are devs actually using the Copilot licenses we bought?",
    solution: "Adoption rates, acceptance rates, and per-team activity from real API data.",
    outcome: "Eng leaders drive enablement where adoption lags + reclaim idle seats.",
  },
  {
    icon: DollarSign, tone: "amber", title: "LLM / API Cost Optimization",
    problem: "Running expensive models for jobs that cheaper models would handle fine.",
    solution: "Model cost breakdown per workload + suggestions to downgrade safely.",
    outcome: "Typical org reduces LLM spend 15-30% in first 60 days.",
  },
  {
    icon: Briefcase, tone: "indigo", title: "Business Productivity AI Tracking",
    problem: "Bought 500 M365 Copilot licenses — no idea if business users actually use them.",
    solution: "Per-app activity (Teams, Word, Excel, Outlook) and license utilization.",
    outcome: "IT reclaims unused seats before next renewal — six- to seven-figure savings.",
  },
  {
    icon: BellRing, tone: "amber", title: "Budget Alerts & Governance",
    problem: "Spend overruns are discovered on invoice day, not the day they happen.",
    solution: "Threshold + anomaly rules with same-day Slack/Teams/PagerDuty alerts.",
    outcome: "FinOps catches a runaway eval script in 4 hours, not 4 weeks.",
  },
  {
    icon: TrendingUp, tone: "emerald", title: "AI ROI Reporting",
    problem: "Board asks 'is the AI budget working?' — and nobody has the data.",
    solution: "Correlate AI spend to PR throughput, ticket velocity, team output trends.",
    outcome: "Quarterly board update includes a real cost-per-PR and cost-per-resolved-ticket.",
  },
  {
    icon: Users, tone: "cyan", title: "Inactive Seat Detection",
    problem: "Copilot/Cursor seats keep auto-renewing for users who haven't logged in for 60 days.",
    solution: "Automated idle-seat reports with reclaim workflow.",
    outcome: "Reduce license waste by 12-22% in first quarter.",
  },
  {
    icon: Cpu, tone: "violet", title: "Model Usage Optimization",
    problem: "Default model is GPT-4o — but 60% of traffic is simple summarization.",
    solution: "Per-workload model breakdown + tier-down suggestions.",
    outcome: "Right-size model selection without changing developer experience.",
  },
  {
    icon: FileBarChart, tone: "cyan", title: "Executive AI Reporting",
    problem: "No standard report format — every leadership cycle starts from scratch.",
    solution: "Branded PDF + CSV exports with adoption, spend, ROI, and governance metrics.",
    outcome: "Same report shows up on the board pack on schedule, every quarter.",
  },
  {
    icon: Layers, tone: "emerald", title: "Multi-Provider AI Management",
    problem: "Each new provider means a new console, a new API key, a new spreadsheet.",
    solution: "TokenLens connector framework absorbs new providers as they ship admin APIs.",
    outcome: "New AI tool? Same dashboard. No new spreadsheet, no new training.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="violet">Use Cases</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Twelve concrete problems TokenLens solves.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-white/65 max-w-2xl leading-relaxed">
            Each one was on a real customer-discovery whiteboard. None of them require a six-month implementation.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer className="py-12 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map(uc => (
            <div key={uc.title} className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-5 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:bg-white/[0.04] transition-all overflow-hidden">
              <div className={`absolute inset-x-0 top-0 h-px ${
                uc.tone === "emerald" ? "bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" :
                uc.tone === "cyan"    ? "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"     :
                uc.tone === "violet"  ? "bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"   :
                uc.tone === "amber"   ? "bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"    :
                                        "bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
              }`} />
              <div className={`inline-flex h-10 w-10 rounded-xl ring-1 items-center justify-center ${
                uc.tone === "emerald" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20" :
                uc.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"          :
                uc.tone === "violet"  ? "bg-violet-500/10 text-violet-400 ring-violet-400/20"    :
                uc.tone === "amber"   ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"       :
                                        "bg-indigo-500/10 text-indigo-400 ring-indigo-400/20"
              }`}>
                <uc.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{uc.title}</h3>
              <div className="mt-3 space-y-2.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-400/70">Problem</p>
                  <p className="text-xs text-slate-500 dark:text-white/55 leading-relaxed mt-0.5">{uc.problem}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/80">Solution</p>
                  <p className="text-xs text-slate-600 dark:text-white/65 leading-relaxed mt-0.5">{uc.solution}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">Outcome</p>
                  <p className="text-xs text-slate-700 dark:text-white/80 leading-relaxed mt-0.5">{uc.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      <CTASection title="Pick a use case. See it in action." />
    </>
  );
}
