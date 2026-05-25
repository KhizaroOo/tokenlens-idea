import type { Metadata } from "next";
import { ShieldCheck, Lock, Building2, UserCheck, FileSearch, Eye, KeyRound, ServerCog } from "lucide-react";
import { SectionHeader, SectionContainer, CTASection, FeatureCard, Pill } from "@/components/marketing/primitives";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";

export const metadata: Metadata = {
  title: "Security — TokenLens",
  description:
    "Built with enterprise security principles. Encrypted credentials, organization-level scoping, role-based access, audit-ready architecture.",
};

const FAQ = [
  {
    q: "How are provider credentials stored?",
    a: "Provider API keys and OAuth secrets are encrypted at rest using AES-256-GCM. The encryption key is stored in the application's environment, never alongside the encrypted data. Credentials are decrypted in memory only when a sync worker needs to call a provider API.",
  },
  {
    q: "How is data isolated between organizations?",
    a: "Every database query in TokenLens is scoped by organization ID, enforced at the API layer via session middleware. Cross-organization data access is impossible by design — there is no API path that returns data without an organization filter.",
  },
  {
    q: "What roles can users have?",
    a: "TokenLens supports three roles at the organization level: viewer (read-only), admin (manage connections + budgets + alert rules), and owner (full access including billing). Role-based access controls are enforced at every API route.",
  },
  {
    q: "Is the application portal login-protected?",
    a: "Yes. The application portal (dashboard, settings, all analytics views) requires authentication. Sessions are issued as httpOnly, secure (in production), 7-day JWT cookies. The public marketing website is the only part of TokenLens that is unauthenticated.",
  },
  {
    q: "Do you have SOC 2 or ISO 27001 certification?",
    a: "TokenLens is built on enterprise security principles — encrypted credentials, organization-level scoping, role-based access, audit logging. Formal certifications are a process that takes time; we'll update this page when certifications are issued. In the meantime, talk to us about your specific compliance requirements.",
  },
  {
    q: "How does sync work — does TokenLens proxy provider traffic?",
    a: "No. Sync workers run on TokenLens servers and call provider admin APIs directly using your encrypted credentials. We pull aggregate usage and cost metadata — never prompt text, code content, or AI responses. Provider credentials never leave our server-side environment.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="emerald"><ShieldCheck className="h-3 w-3" /> Security</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Built with enterprise security principles.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-white/65 max-w-2xl leading-relaxed">
            Encrypted credentials, organization-level scoping, role-based access, audit-ready architecture.
            The application portal is login-protected; only the public marketing site is unauthenticated.
          </p>
        </div>
      </SectionContainer>

      {/* Pillars */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader eyebrow="Security pillars" title="What you get out of the box." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon={Lock}        accent="emerald" title="Encrypted credentials"     description="Provider API keys are encrypted at rest with AES-256-GCM. The encryption key lives in env, not in the DB." />
          <FeatureCard icon={Building2}   accent="cyan"    title="Organization data isolation" description="Every Prisma query is scoped by organization ID. Cross-tenant access is impossible by design." />
          <FeatureCard icon={UserCheck}   accent="violet"  title="Role-based access"          description="Viewer / admin / owner roles enforced at every API route. Add/remove users with one click." />
          <FeatureCard icon={FileSearch}  accent="indigo"  title="Audit-ready"                description="Every admin action — credential rotation, budget change, sync — logged with actor + timestamp." />
          <FeatureCard icon={KeyRound}    accent="amber"   title="Least-privilege secrets"    description="Provider credentials require only read-level admin scopes. No write permissions ever requested." />
          <FeatureCard icon={ServerCog}   accent="emerald" title="Secure server-side sync"    description="Provider credentials are decrypted only inside sync workers. They never reach the browser." />
          <FeatureCard icon={Eye}         accent="cyan"    title="Privacy-first analytics"    description="We store metadata only — token counts, costs, model names, dates. Never prompt or response content." />
          <FeatureCard icon={ShieldCheck} accent="violet"  title="Admin controls"             description="Per-provider sync controls, force-disconnect, credential rotation, all from the Settings page." />
        </div>
      </SectionContainer>

      {/* What we never do */}
      <SectionContainer className="py-12 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 lg:p-12">
          <Pill tone="emerald">Privacy by design</Pill>
          <h3 className="mt-5 text-2xl lg:text-3xl font-bold tracking-tight">What TokenLens never stores.</h3>
          <ul className="mt-6 grid md:grid-cols-2 gap-3">
            {[
              "Prompt text",
              "AI responses or completions",
              "Code content from coding assistants",
              "Document, email, or chat content (Microsoft Copilot)",
              "Raw provider API payloads",
              "Plaintext API keys or credentials",
              "Personal access tokens in plaintext",
              "OAuth refresh tokens",
            ].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/70 mt-2 flex-shrink-0" />
                <span className="line-through decoration-red-400/30">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-white/45 leading-relaxed">
            Metadata only: token counts, costs, model names, dates, user emails, team names, seat status. That&apos;s it.
          </p>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer className="py-12 lg:py-20">
        <SectionHeader eyebrow="FAQ" title="Security questions, answered." />
        <div className="mt-12 max-w-3xl mx-auto">
          <FAQAccordion items={FAQ} />
        </div>
      </SectionContainer>

      <CTASection
        title="Bring your security review."
        subtitle="We'll walk through credential handling, data isolation, and audit logging on a live demo call."
        primary={{ label: "Talk to Sales", href: "/contact" }}
        secondary={{ label: "Book Demo", href: "/demo" }}
      />
    </>
  );
}
