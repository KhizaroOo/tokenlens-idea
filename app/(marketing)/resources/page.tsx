import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, Calculator, GitCompare, ListChecks, Wallet, GitBranch, ArrowRight, Mic } from "lucide-react";
import { SectionHeader, SectionContainer, CTASection, Pill } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Resources — AI cost & governance guides",
  description:
    "Guides, calculators, comparisons, and reports on AI spend management, governance, FinOps for AI, and developer AI adoption.",
};

const FORMATS = [
  { icon: BookOpen,   label: "Blog",        tone: "emerald" as const, desc: "Short-form posts and product updates."          },
  { icon: FileText,   label: "Guides",      tone: "cyan"    as const, desc: "Long-form how-tos for buyers and operators."    },
  { icon: Mic,        label: "Reports",     tone: "violet"  as const, desc: "Annual AI spend trends and adoption research."  },
  { icon: Calculator, label: "Calculator",  tone: "amber"   as const, desc: "Estimate your AI spend in 60 seconds."          },
  { icon: GitCompare, label: "Comparisons", tone: "indigo"  as const, desc: "Side-by-side provider analysis."                },
  { icon: ListChecks, label: "Checklists",  tone: "emerald" as const, desc: "One-page checklists for AI governance rollout." },
];

const ARTICLES = [
  {
    tone: "emerald" as const, kind: "Blog",
    title: "AI Spend Is Becoming the Next Cloud Bill",
    excerpt: "Five years ago AWS spend caught most CFOs off-guard. AI is on the same trajectory — only faster, with less observability.",
    minutes: 8, icon: Wallet,
  },
  {
    tone: "cyan" as const, kind: "Guide",
    title: "How to Build an AI Usage Governance Program",
    excerpt: "A 30-60-90 day playbook for setting AI policies, budgets, and audit trails across providers.",
    minutes: 14, icon: ListChecks,
  },
  {
    tone: "violet" as const, kind: "Comparison",
    title: "Claude vs OpenAI Spend Visibility: What Teams Should Track",
    excerpt: "What each admin API actually exposes — and where you have to compute cost yourself.",
    minutes: 11, icon: GitCompare,
  },
  {
    tone: "indigo" as const, kind: "Guide",
    title: "Developer AI Tools: Adoption Metrics Engineering Leaders Need",
    excerpt: "Beyond Copilot seat count — acceptance rates, per-team adoption, and the metrics that actually predict ROI.",
    minutes: 12, icon: GitBranch,
  },
  {
    tone: "amber" as const, kind: "Checklist",
    title: "AI FinOps Checklist for CFOs and CTOs",
    excerpt: "Twelve items to review every quarter to keep AI spend under control.",
    minutes: 6, icon: ListChecks,
  },
  {
    tone: "emerald" as const, kind: "Report",
    title: "How to Measure AI ROI Without Guesswork",
    excerpt: "Concrete formulas: cost per PR, cost per resolved ticket, cost per active developer. With templates.",
    minutes: 15, icon: Calculator,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="cyan">Resources</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            The AI spend & governance reading list.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-white/65 max-w-2xl leading-relaxed">
            Practical guides, calculators, and comparisons for the people responsible for AI cost, adoption, and policy.
          </p>
        </div>
      </SectionContainer>

      {/* Format tiles */}
      <SectionContainer className="py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {FORMATS.map(f => (
            <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center">
              <div className={`mx-auto h-9 w-9 rounded-xl grid place-items-center ring-1 ${
                f.tone === "emerald" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20" :
                f.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"          :
                f.tone === "violet"  ? "bg-violet-500/10 text-violet-400 ring-violet-400/20"    :
                f.tone === "amber"   ? "bg-amber-500/10 text-amber-400 ring-amber-400/20"       :
                                       "bg-indigo-500/10 text-indigo-400 ring-indigo-400/20"
              }`}>
                <f.icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-xs font-semibold">{f.label}</p>
              <p className="mt-0.5 text-[10px] text-white/40 leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Featured */}
      <SectionContainer className="py-12 lg:py-16">
        <SectionHeader eyebrow="Featured" title="What to read first." align="left" />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARTICLES.map(a => (
            <Link key={a.title} href="#" className="group">
              <article className={`h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20 hover:bg-white/[0.04]`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                    a.tone === "emerald" ? "bg-emerald-500/15 text-emerald-300" :
                    a.tone === "cyan"    ? "bg-cyan-500/15 text-cyan-300"        :
                    a.tone === "violet"  ? "bg-violet-500/15 text-violet-300"    :
                    a.tone === "amber"   ? "bg-amber-500/15 text-amber-300"      :
                                           "bg-indigo-500/15 text-indigo-300"
                  }`}>{a.kind}</span>
                  <span className="text-[10px] font-mono text-white/35">{a.minutes} min read</span>
                </div>
                <a.icon className="mt-4 h-5 w-5 text-white/40" />
                <h3 className="mt-3 text-base font-bold leading-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{a.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 group-hover:text-emerald-200">
                  Read post <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </p>
              </article>
            </Link>
          ))}
        </div>
      </SectionContainer>

      <CTASection
        title="Get the AI spend digest in your inbox."
        subtitle="One email per month with the most useful piece we published. Unsubscribe anytime."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Book Demo", href: "/demo" }}
      />
    </>
  );
}
