import type { Metadata } from "next";
import { Compass, Layers, Users, ShieldCheck, BarChart3, Target } from "lucide-react";
import { SectionHeader, SectionContainer, CTASection, FeatureCard, Pill } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "About — TokenLens",
  description:
    "TokenLens exists because AI adoption moved faster than internal reporting, finance workflows, and governance processes.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="emerald"><Compass className="h-3 w-3" /> About</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            AI moved faster than the dashboards built for it.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-white/65 max-w-2xl leading-relaxed">
            TokenLens exists because AI adoption moved faster than internal reporting, finance workflows, and governance processes.
            We&apos;re building the operating dashboard the AI era needs.
          </p>
        </div>
      </SectionContainer>

      {/* Mission */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Pill tone="cyan">Mission</Pill>
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Give every company one operating dashboard for their AI.
            </h2>
            <p className="mt-4 text-base text-white/65 leading-relaxed">
              Cost, adoption, productivity, governance — across every provider. So leadership can move fast on AI without flying blind on spend.
            </p>
          </div>
          <div>
            <Pill tone="violet">Why now</Pill>
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              The AI invoice is the new cloud invoice.
            </h2>
            <p className="mt-4 text-base text-white/65 leading-relaxed">
              In 2018, AWS spend caught CFOs off-guard. In 2025, AI is doing the same — only faster, and with less observability built into provider consoles. The category that emerged for cloud needs to exist for AI.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Philosophy */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader eyebrow="Product philosophy" title="How we build TokenLens." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon={Layers}      accent="emerald" title="Clarity over complexity"      description="One dashboard with the right defaults. Drill-down when you need it, executive summary when you don't." />
          <FeatureCard icon={ShieldCheck} accent="cyan"    title="Governance without slowdown"  description="Compliance + spend control should never make engineering teams slower. We design around that constraint." />
          <FeatureCard icon={Target}      accent="violet"  title="Provider-neutral intelligence" description="We're not Claude. We're not OpenAI. We're the layer above them — and we'll always be honest about what each API actually exposes." />
          <FeatureCard icon={BarChart3}   accent="amber"   title="Actionable insights, not vanity" description="If a metric doesn't change a decision, we don't ship it. Every chart should map to an action a CFO or CTO can take." />
          <FeatureCard icon={Users}       accent="indigo"  title="For leadership AND operators" description="The executive view is the easy part. The hard part is the per-team drill-down that actually drives change. We build both." />
          <FeatureCard icon={Compass}     accent="emerald" title="Honest about limits"          description="When a provider has no admin API, we say so. We don't fake live data with estimates and call it observability." />
        </div>
      </SectionContainer>

      {/* Who it's for */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-cyan-500/[0.04] p-8 lg:p-12">
          <Pill tone="emerald">Who it&apos;s for</Pill>
          <h3 className="mt-5 text-3xl font-bold tracking-tight">
            Companies past the AI experimentation phase.
          </h3>
          <p className="mt-4 text-base text-white/65 max-w-3xl leading-relaxed">
            If your AI spend is measured in thousands or millions per month — and lives across 5+ providers — TokenLens is for you.
            If you&apos;re still on $200/month of API credits, you don&apos;t need us yet. Bookmark this page and come back.
          </p>
        </div>
      </SectionContainer>

      <CTASection title="Want the same operating dashboard?" />
    </>
  );
}
