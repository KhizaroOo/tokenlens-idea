import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader, SectionContainer, CTASection, Pill } from "@/components/marketing/primitives";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";

export const metadata: Metadata = {
  title: "Pricing — TokenLens",
  description:
    "Starter, Growth, and Enterprise plans. Multi-provider analytics, budgets, governance, SSO, and dedicated support. Talk to sales for custom pricing.",
};

const PLANS = [
  {
    name: "Starter",
    tone: "white" as const,
    blurb: "For small teams beginning AI visibility.",
    cta: { label: "Book Demo", href: "/demo" },
    secondary: { label: "Talk to Sales", href: "/contact" },
    features: [
      "Core dashboard",
      "Up to 3 providers connected",
      "User & team usage breakdown",
      "Monthly executive reports",
      "Basic budget tracking",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tone: "emerald" as const,
    featured: true,
    blurb: "For scaling teams using multiple AI tools.",
    cta: { label: "Book Demo", href: "/demo" },
    secondary: { label: "Talk to Sales", href: "/contact" },
    features: [
      "Everything in Starter",
      "Multi-provider analytics (all 8 providers)",
      "Team-level cost allocation",
      "Developer AI tool analytics",
      "LLM/API spend breakdown by model",
      "Budget alerts + anomaly detection",
      "Provider comparison reports",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tone: "violet" as const,
    blurb: "For companies needing governance & advanced reporting.",
    cta: { label: "Talk to Sales", href: "/contact" },
    secondary: { label: "Book Demo", href: "/demo" },
    features: [
      "Everything in Growth",
      "SSO / SAML-ready positioning",
      "Advanced governance + RBAC",
      "Tamper-evident audit logs",
      "Custom provider connectors",
      "Department-level access control",
      "Custom-branded reports",
      "Dedicated customer success manager",
      "SLA-backed support",
    ],
  },
];

const FAQ = [
  {
    q: "Which providers does TokenLens support?",
    a: "Anthropic Claude, Claude Code, OpenAI, GitHub Copilot, Cursor, and Microsoft 365 Copilot all have implemented connectors. Gemini and Perplexity are marked Limited because neither exposes an aggregate admin usage API at the time of writing. Coverage may vary by your subscription tier and tenant configuration.",
  },
  {
    q: "Is TokenLens only for LLM API spend?",
    a: "No. TokenLens covers three categories: LLM / API spend (Claude, OpenAI, Gemini, Perplexity), developer AI tools (Claude Code, GitHub Copilot, Cursor), and business productivity AI (Microsoft 365 Copilot). The dashboard normalizes all three into a single operating view.",
  },
  {
    q: "Can TokenLens track developer AI tools?",
    a: "Yes — Claude Code, GitHub Copilot, and Cursor each have implemented connectors. You get seat utilization, acceptance rates, per-team adoption, and per-user activity from real admin API data, not estimates.",
  },
  {
    q: "Can finance teams use TokenLens?",
    a: "TokenLens is explicitly built for finance and FinOps as well as engineering. Per-team cost allocation, scheduled CSV/PDF reports, and budget burn-down views are core features — not afterthoughts.",
  },
  {
    q: "Is the application secure?",
    a: "Provider credentials are encrypted at rest using AES-256-GCM. The application portal is login protected with JWT-based session cookies. All database queries are scoped by organization ID, and every credential storage path goes through encrypted handlers. See the Security page for details.",
  },
  {
    q: "Do you support custom integrations?",
    a: "Enterprise plans include custom provider connectors. If a provider ships an admin API, our connector framework can typically support it within weeks. Contact sales to discuss your stack.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Pill tone="emerald">Pricing</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Predictable pricing for predictable AI spend.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-white/65 leading-relaxed">
            Three plans, scaled to your AI maturity. Talk to sales for custom pricing on your provider mix and seat count.
          </p>
        </div>
      </SectionContainer>

      {/* Plans */}
      <SectionContainer className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-5">
          {PLANS.map(plan => {
            const featured = plan.featured;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  featured
                    ? "border-emerald-400/40 bg-gradient-to-br from-emerald-500/[0.08] to-cyan-500/[0.04] shadow-2xl shadow-emerald-500/10 lg:scale-[1.02]"
                    : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"
                }`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810]">
                      <Sparkles className="h-3 w-3" />
                      Most popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-white/55">{plan.blurb}</p>
                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">Talk to sales</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 dark:text-white/40">
                    Pricing scales with provider count + seats
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={plan.cta.href}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full px-4 py-2.5 transition ${
                      featured
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] hover:opacity-90"
                        : "border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {plan.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <ul className="mt-7 space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-white/70">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader eyebrow="FAQ" title="Common questions before talking to sales." />
        <div className="mt-12 max-w-3xl mx-auto">
          <FAQAccordion items={FAQ} />
        </div>
      </SectionContainer>

      <CTASection
        title="Ready to talk pricing?"
        subtitle="Twenty-minute demo. Then a custom quote based on your provider count and seat numbers."
        primary={{ label: "Talk to Sales", href: "/contact" }}
        secondary={{ label: "Book Demo", href: "/demo" }}
      />
    </>
  );
}
