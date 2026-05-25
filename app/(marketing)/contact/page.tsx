"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, LifeBuoy, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionContainer, Pill } from "@/components/marketing/primitives";

export default function ContactPage() {
  // NOTE: This form has no backend integration yet. On submit, it shows a
  // confirmation state and does not POST anywhere. Wire to a real endpoint when ready.
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to real contact endpoint (e.g. /api/contact or a CRM webhook)
    setSubmitted(true);
  }

  const INPUT  = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/30 transition-colors";
  const LABEL  = "block text-[11px] font-bold uppercase tracking-wider text-white/55 mb-1.5";

  return (
    <>
      <SectionContainer className="pt-16 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <Pill tone="emerald">Contact</Pill>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Talk to the TokenLens team.
          </h1>
          <p className="mt-5 text-base lg:text-lg text-white/65 max-w-2xl leading-relaxed">
            Sales, support, partnerships, or just a question about your provider stack — we read every message.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer className="py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {[
            { icon: Briefcase, tone: "emerald" as const, title: "Sales inquiry",      desc: "Pricing, custom plans, procurement reviews.",         cta: "sales@tokenlens.io" },
            { icon: LifeBuoy,  tone: "cyan"    as const, title: "Support",            desc: "Existing customer? We respond fast.",                  cta: "support@tokenlens.io" },
            { icon: Handshake, tone: "violet"  as const, title: "Partnerships",       desc: "Integrations, resellers, consulting partnerships.",    cta: "partners@tokenlens.io" },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ring-1 ${
                c.tone === "emerald" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-400/20" :
                c.tone === "cyan"    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-400/20"           :
                                       "bg-violet-500/10 text-violet-400 ring-violet-400/20"
              }`}>
                <c.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-base font-semibold">{c.title}</p>
              <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{c.desc}</p>
              <p className="mt-4 text-sm font-mono text-emerald-300">{c.cta}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight">Send a message</h3>
            <p className="mt-3 text-sm text-white/55 leading-relaxed">
              Tell us about your provider mix and what you&apos;re trying to solve. A real human will reply within one business day.
            </p>
            <Link href="/demo" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
              Or jump straight to booking a demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-8 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                <p className="mt-4 text-lg font-semibold">Thanks — we got it.</p>
                <p className="mt-2 text-sm text-white/65">A team member will be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={LABEL}>Name</label>
                    <input id="name" name="name" type="text" required className={INPUT} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className={LABEL}>Work email</label>
                    <input id="email" name="email" type="email" required className={INPUT} placeholder="jane@company.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className={LABEL}>Company</label>
                    <input id="company" name="company" type="text" className={INPUT} placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label htmlFor="role" className={LABEL}>Role</label>
                    <input id="role" name="role" type="text" className={INPUT} placeholder="VP Engineering" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="size" className={LABEL}>Company size</label>
                    <select id="size" name="size" className={INPUT}>
                      <option>1–50</option>
                      <option>51–200</option>
                      <option>201–1,000</option>
                      <option>1,001–5,000</option>
                      <option>5,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tools" className={LABEL}>AI tools used</label>
                    <input id="tools" name="tools" type="text" className={INPUT} placeholder="Claude, OpenAI, Copilot…" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={LABEL}>Message</label>
                  <textarea id="message" name="message" rows={4} className={INPUT} placeholder="What are you trying to solve?" />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] hover:opacity-90 transition-opacity"
                >
                  Send message <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
