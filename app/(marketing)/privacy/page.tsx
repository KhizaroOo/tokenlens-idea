import type { Metadata } from "next";
import { SectionContainer, Pill } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy — TokenLens",
  description: "How TokenLens collects, uses, and protects information.",
};

const LAST_UPDATED = "May 2026";

const SECTIONS = [
  {
    h: "Information we collect",
    p: [
      "TokenLens collects information that customers provide directly when they create an account and use the product. This includes account information (name, email, organization), provider credentials, and configuration data such as budgets, alert rules, and team mappings.",
      "We also collect operational telemetry — sync run logs, error messages, and performance metrics — that help us operate the service reliably.",
    ],
  },
  {
    h: "How we use information",
    p: [
      "We use customer information to authenticate users, deliver the product, sync usage data from connected providers, and provide support. Operational telemetry helps us debug issues and improve reliability.",
      "We do not sell customer information or share it with third parties for marketing purposes.",
    ],
  },
  {
    h: "Provider data",
    p: [
      "Provider API credentials are encrypted at rest using AES-256-GCM. They are decrypted only inside server-side sync workers when calling provider APIs, and they never reach the browser.",
      "Provider usage data — token counts, costs, model names, dates, user emails, seat status — is stored as metadata only. We do not store prompt text, AI responses, code content, or any payload data.",
    ],
  },
  {
    h: "Security",
    p: [
      "Provider credentials encrypted with AES-256-GCM. Sessions issued as httpOnly JWT cookies. Database queries scoped by organization ID at the API layer. Role-based access controls enforce least-privilege.",
      "We follow enterprise security principles. Formal certifications (SOC 2, ISO 27001) are an ongoing process — contact us for our current status and any required vendor assessments.",
    ],
  },
  {
    h: "Data retention",
    p: [
      "Customer account data and provider configuration are retained for the duration of the customer relationship. Usage metadata is retained per the customer's data retention policy (configurable in Settings, default 365 days). Audit logs are retained for at least 365 days.",
      "Customers may request export or deletion of their data at any time by contacting support.",
    ],
  },
  {
    h: "Customer rights",
    p: [
      "Customers have the right to access, correct, export, or delete the information we hold about them. Account owners and admins can manage user access from the Settings page. To exercise data subject rights more broadly, contact privacy@tokenlens.io.",
    ],
  },
  {
    h: "Contact",
    p: [
      "For privacy-related questions, contact privacy@tokenlens.io. For general inquiries, see the Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-8">
        <div className="max-w-3xl">
          <Pill tone="emerald">Legal</Pill>
          <h1 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/45">Last updated: {LAST_UPDATED}</p>
        </div>
      </SectionContainer>

      <SectionContainer className="py-8 lg:py-12">
        <article className="max-w-3xl prose prose-invert prose-headings:mt-10 prose-headings:mb-3">
          <p className="text-base text-white/65 leading-relaxed">
            This Privacy Policy explains how TokenLens collects, uses, and protects information.
            It is provided as a clear, practical summary of our practices. For specific legal questions,
            contact privacy@tokenlens.io.
          </p>

          {SECTIONS.map(s => (
            <section key={s.h} className="mt-10">
              <h2 className="text-xl font-bold tracking-tight text-white">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-3 text-sm text-white/65 leading-relaxed">{para}</p>
              ))}
            </section>
          ))}
        </article>
      </SectionContainer>
    </>
  );
}
