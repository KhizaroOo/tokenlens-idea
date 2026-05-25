import type { Metadata } from "next";
import { SectionContainer, Pill } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Terms of Service — TokenLens",
  description: "Terms governing use of TokenLens.",
};

const LAST_UPDATED = "May 2026";

const SECTIONS = [
  {
    h: "Use of service",
    p: [
      "By creating a TokenLens account, you agree to use the service in compliance with applicable law and these terms. The service is provided to organizations for monitoring AI spend, adoption, and governance.",
      "TokenLens reserves the right to update these terms. Material changes will be communicated to customers via email or in-product notification.",
    ],
  },
  {
    h: "Customer responsibilities",
    p: [
      "Customers are responsible for managing user access to their organization workspace, the security of credentials they provide to TokenLens, and ensuring their use of TokenLens complies with their internal policies and applicable regulations.",
      "Customers are responsible for compliance with each upstream provider's terms of service when using TokenLens to access provider APIs.",
    ],
  },
  {
    h: "Account access",
    p: [
      "TokenLens accounts use role-based access (viewer, admin, owner). Account owners are responsible for keeping their credentials secure and notifying TokenLens promptly of any suspected unauthorized access.",
    ],
  },
  {
    h: "Provider integrations",
    p: [
      "TokenLens connects to third-party provider admin APIs using credentials supplied by the customer. The customer represents that they have the authority to grant TokenLens access to those providers.",
      "Provider integration coverage may vary based on each vendor's API capabilities, the customer's subscription tier with that provider, and the customer's tenant configuration.",
    ],
  },
  {
    h: "Acceptable use",
    p: [
      "Customers may not use TokenLens to (a) circumvent provider terms of service, (b) attempt to access data belonging to other customers, (c) reverse-engineer the service, or (d) use the service for any unlawful purpose.",
    ],
  },
  {
    h: "Limitations and disclaimers",
    p: [
      "TokenLens is provided on an as-available basis. Provider data accuracy depends on upstream provider APIs; TokenLens displays the data those APIs return.",
      "To the maximum extent permitted by law, TokenLens disclaims warranties not expressly granted in a signed agreement, and liability is limited to amounts paid in the twelve months preceding any claim.",
      "These terms are a clear summary. A complete enterprise master services agreement is available for review during sales discussions.",
    ],
  },
  {
    h: "Contact",
    p: [
      "Questions about these terms: legal@tokenlens.io. For all other inquiries see the Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-8">
        <div className="max-w-3xl">
          <Pill tone="emerald">Legal</Pill>
          <h1 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-white/45">Last updated: {LAST_UPDATED}</p>
        </div>
      </SectionContainer>

      <SectionContainer className="py-8 lg:py-12">
        <article className="max-w-3xl">
          <p className="text-base text-slate-600 dark:text-white/65 leading-relaxed">
            These Terms of Service govern access to and use of TokenLens. By using the service, you agree to these terms.
            For specific contractual questions, contact legal@tokenlens.io.
          </p>

          {SECTIONS.map(s => (
            <section key={s.h} className="mt-10">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-3 text-sm text-slate-600 dark:text-white/65 leading-relaxed">{para}</p>
              ))}
            </section>
          ))}
        </article>
      </SectionContainer>
    </>
  );
}
