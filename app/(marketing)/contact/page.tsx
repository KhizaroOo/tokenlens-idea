"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, LifeBuoy, Handshake, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ExhibitLabel } from "@/components/marketing/gallery";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to real contact endpoint
    setSubmitted(true);
  }

  const INPUT = "w-full border sg-line bg-[var(--sg-bg)] px-3.5 py-2.5 text-sm text-[var(--sg-text)] placeholder:text-[var(--sg-text-mute)] focus:border-[var(--sg-ink)] focus:outline-none transition-colors";
  const LABEL = "block sg-caption text-[var(--sg-text-mute)] mb-1.5";

  return (
    <>
      {/* Hero */}
      <section className="pt-20 lg:pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-baseline gap-4">
                <span className="sg-number text-5xl lg:text-7xl font-black text-[var(--sg-text)]">EXHIBIT 10</span>
                <ExhibitLabel label="GALLERY ENTRANCE" tone="signal" />
              </div>
              <h1 className="sg-display text-5xl sm:text-6xl lg:text-7xl text-[var(--sg-text)] mt-8">
                Talk to the
                <br />
                <span className="italic font-light">TokenLens</span> team.
              </h1>
              <p className="mt-6 text-lg text-[var(--sg-text-soft)] max-w-xl leading-relaxed">
                Sales, support, partnerships, or just a question about your provider stack — we read every message.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="sg-caption text-[var(--sg-text-mute)] whitespace-pre-line">{"CONTACT\nGALLERY HOURS\n24 / 7"}</p>
            </div>
          </div>
          <div className="mt-12 h-px bg-[var(--sg-line)]" />
        </div>
      </section>

      {/* Inquiry channels */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-px bg-[var(--sg-line)] border sg-line">
            {[
              { icon: Briefcase, tone: "var(--sg-signal)",  title: "Sales inquiry",  desc: "Pricing, custom plans, procurement reviews.", email: "sales@tokenlens.io" },
              { icon: LifeBuoy,  tone: "var(--sg-lens)",    title: "Support",        desc: "Existing customer? We respond fast.",          email: "support@tokenlens.io" },
              { icon: Handshake, tone: "var(--sg-anomaly)", title: "Partnerships",   desc: "Integrations, resellers, consulting.",          email: "partners@tokenlens.io" },
            ].map(c => (
              <div key={c.title} className="bg-[var(--sg-bg)] p-7 relative hover:bg-[var(--sg-panel)] transition-colors">
                <span aria-hidden className="absolute -top-px -left-px h-1.5 w-12" style={{ background: c.tone }} />
                <c.icon className="h-5 w-5 mb-4" style={{ color: c.tone }} />
                <h3 className="sg-title text-lg text-[var(--sg-text)]">{c.title}</h3>
                <p className="mt-2 text-sm text-[var(--sg-text-soft)] leading-relaxed">{c.desc}</p>
                <p className="mt-5 sg-number text-sm text-[var(--sg-signal)]">{c.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-20 bg-[var(--sg-panel)] border-y sg-line">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <ExhibitLabel label="DROP A MESSAGE" tone="lens" />
            <h3 className="mt-4 sg-display text-3xl lg:text-4xl text-[var(--sg-text)]">
              Send a <span className="italic font-light">message.</span>
            </h3>
            <p className="mt-4 text-sm text-[var(--sg-text-soft)] leading-relaxed max-w-md">
              Tell us about your provider mix and what you&apos;re trying to solve. A real human replies within one business day.
            </p>
            <Link href="/demo" className="mt-6 inline-flex items-center gap-1.5 sg-caption text-[var(--sg-signal)] hover:text-[var(--sg-text)] transition-colors">
              OR JUMP TO BOOKING A DEMO <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="border-2 border-[var(--sg-signal)] p-10 text-center bg-[var(--sg-bg)]">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--sg-signal)]" />
                <p className="mt-4 sg-display text-2xl text-[var(--sg-text)]">Got it.</p>
                <p className="mt-2 text-sm text-[var(--sg-text-soft)]">A team member will be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border sg-line bg-[var(--sg-bg)] p-7 lg:p-9 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="name"  className={LABEL}>NAME</label>       <input id="name"  type="text"  required className={INPUT} placeholder="Jane Doe" /></div>
                  <div><label htmlFor="email" className={LABEL}>WORK EMAIL</label> <input id="email" type="email" required className={INPUT} placeholder="jane@company.com" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="company" className={LABEL}>COMPANY</label> <input id="company" type="text" className={INPUT} placeholder="Acme Inc." /></div>
                  <div><label htmlFor="role"    className={LABEL}>ROLE</label>    <input id="role"    type="text" className={INPUT} placeholder="VP Engineering" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="size" className={LABEL}>SIZE</label>
                    <select id="size" className={INPUT}>
                      <option>1–50</option><option>51–200</option><option>201–1,000</option><option>1,001–5,000</option><option>5,000+</option>
                    </select>
                  </div>
                  <div><label htmlFor="tools" className={LABEL}>AI TOOLS USED</label> <input id="tools" type="text" className={INPUT} placeholder="Claude, OpenAI, Copilot…" /></div>
                </div>
                <div><label htmlFor="message" className={LABEL}>MESSAGE</label> <textarea id="message" rows={4} className={INPUT} placeholder="What are you trying to solve?" /></div>
                <button type="submit" className="group inline-flex items-center gap-2 px-5 py-3 bg-[var(--sg-ink)] text-[var(--sg-bg)] font-semibold text-sm hover:bg-[var(--sg-signal)] hover:text-[#050505] transition-colors">
                  Send message <ArrowUpRight className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
