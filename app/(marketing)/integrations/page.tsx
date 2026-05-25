import type { Metadata } from "next";
import { Network, AlertTriangle } from "lucide-react";
import {
  SectionHeader, SectionContainer, CTASection, ProviderLogoCard, Pill,
} from "@/components/marketing/primitives";
import { DataFlowDiagram } from "@/components/marketing/DataFlowDiagram";

export const metadata: Metadata = {
  title: "Integrations — Bring your AI stack into one view",
  description:
    "TokenLens connects to Claude, OpenAI, GitHub Copilot, Cursor, Microsoft 365 Copilot, Gemini, Perplexity, and more. Coverage varies by plan and API access.",
};

const LLM = [
  {
    providerKey: "anthropic", label: "Anthropic / Claude", category: "LLM API",
    status: "available" as const,
    examples: ["Token usage per user", "Cost per model", "Org-level aggregates", "Workspace members"],
  },
  {
    providerKey: "openai", label: "OpenAI", category: "LLM API",
    status: "in-progress" as const,
    examples: ["Token usage per user/model/project", "Project-level cost", "Daily buckets", "API keys list"],
  },
  {
    providerKey: "gemini", label: "Gemini", category: "LLM API",
    status: "limited" as const,
    examples: ["Per-call token counts (in response)", "Requires GCP Billing Export"],
  },
  {
    providerKey: "perplexity", label: "Perplexity", category: "LLM API",
    status: "limited" as const,
    examples: ["No admin usage API", "Enterprise webhook audit logs only"],
  },
];

const DEV = [
  {
    providerKey: "claude_code", label: "Claude Code", category: "Developer AI",
    status: "available" as const,
    examples: ["Sessions, commits, PRs", "Lines added/removed", "Tool acceptance rates"],
  },
  {
    providerKey: "github_copilot", label: "GitHub Copilot", category: "Developer AI",
    status: "in-progress" as const,
    examples: ["Total/active/inactive seats", "Acceptance rate per user", "28-day metrics"],
  },
  {
    providerKey: "cursor", label: "Cursor", category: "Developer AI",
    status: "in-progress" as const,
    examples: ["Member list with emails", "Daily lines + suggestions", "Per-user premium spend"],
  },
];

const BIZ = [
  {
    providerKey: "microsoft_copilot", label: "Microsoft 365 Copilot", category: "Business AI",
    status: "in-progress" as const,
    examples: ["Licensed seat count", "Active users per app", "Last activity per Office app"],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="cyan"><Network className="h-3 w-3" /> Integrations</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Bring your AI stack into one view.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-white/65 max-w-2xl leading-relaxed">
            TokenLens connects to the admin APIs of your AI providers — pulling usage, cost, and seat data into a normalized dashboard.
          </p>
        </div>
      </SectionContainer>

      {/* LLM / API Spend Providers */}
      <SectionContainer className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="LLM / API Spend Providers"
          title="Token cost across every model you call."
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LLM.map(p => <ProviderLogoCard key={p.providerKey} {...p} />)}
        </div>
      </SectionContainer>

      {/* Developer AI Tools */}
      <SectionContainer className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="Developer AI Tools"
          title="Engineering AI assistants in one view."
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEV.map(p => <ProviderLogoCard key={p.providerKey} {...p} />)}
        </div>
      </SectionContainer>

      {/* Business AI */}
      <SectionContainer className="py-12 lg:py-16">
        <SectionHeader
          eyebrow="Business Productivity AI"
          title="Business AI adoption + license utilization."
          align="left"
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BIZ.map(p => <ProviderLogoCard key={p.providerKey} {...p} />)}
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-5 flex flex-col items-center justify-center text-center min-h-[180px]">
            <p className="text-sm font-semibold text-white/55">More providers</p>
            <p className="text-xs text-white/35 mt-1">Connector framework absorbs new APIs as they ship</p>
          </div>
        </div>
      </SectionContainer>

      {/* Disclaimer */}
      <SectionContainer className="py-6">
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.04] p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Coverage varies by plan and API access</p>
            <p className="mt-1 text-sm text-white/55 leading-relaxed">
              Provider integrations depend on each vendor&apos;s admin API capabilities, your subscription tier, and your tenant configuration.
              Gemini and Perplexity are marked Limited because neither exposes an aggregate admin usage API at this time.
              We&apos;ll add real integrations as those APIs become available — see our <a className="text-emerald-300 underline" href="/security">Security</a> page for credential-handling details.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Data flow */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader
          eyebrow="Data flow"
          title="How a provider becomes a dashboard."
          subtitle="Encrypted credentials in. Normalized intelligence out. No middleware. No vendor SDKs."
        />
        <div className="mt-12">
          <DataFlowDiagram />
        </div>
      </SectionContainer>

      <CTASection
        title="Don't see your provider? Tell us."
        subtitle="The connector framework is designed for fast iteration — most new providers ship within weeks of their admin API launching."
        primary={{ label: "Request integration", href: "/contact" }}
        secondary={{ label: "Book Demo", href: "/demo" }}
      />
    </>
  );
}
