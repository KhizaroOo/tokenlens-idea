"use client";

import { useState } from "react";
import { CalendarDays, BarChart3, Network, Users, GitBranch, ShieldCheck, FileBarChart, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { ExhibitLabel, KineticMetricCard } from "@/components/marketing/gallery";
import { DashboardMockup } from "@/components/marketing/DashboardMockup";

const AGENDA = [
  { icon: BarChart3,    label: "AI spend dashboard",      hint: "MTD burn, forecasts, cost by provider" },
  { icon: Network,      label: "Provider usage overview", hint: "Side-by-side comparison of your stack" },
  { icon: Users,        label: "User & team adoption",    hint: "Per-user activity, per-team utilization" },
  { icon: GitBranch,    label: "Developer AI tools",      hint: "Copilot / Cursor / Claude Code acceptance" },
  { icon: ShieldCheck,  label: "Governance & alerts",     hint: "Budgets, thresholds, anomaly detection" },
  { icon: FileBarChart, label: "Reporting roadmap",       hint: "What ships next, how it fits your workflow" },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function DemoPage() {
  const [state, setState]   = useState<SubmitState>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrMsg(null);
    setState("submitting");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name:    String(fd.get("name")    ?? "").trim(),
      email:   String(fd.get("email")   ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      role:    String(fd.get("role")    ?? "").trim(),
      aiTools: String(fd.get("tools")   ?? "").trim(),
      message: String(fd.get("msg")     ?? "").trim(),
    };

    try {
      const res = await fetch("/api/demo-request", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrMsg(body?.error ?? `Submission failed (HTTP ${res.status}).`);
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setErrMsg("Network error. Please email sales@tokenlens.io directly.");
      setState("error");
    }
  }

  const INPUT = "w-full border sg-line bg-[var(--sg-bg)] px-3.5 py-2.5 text-sm text-[var(--sg-text)] placeholder:text-[var(--sg-text-mute)] focus:border-[var(--sg-ink)] focus:outline-none transition-colors";
  const LABEL = "block sg-caption text-[var(--sg-text-mute)] mb-1.5";

  return (
    <>
      {/* Hero */}
      <section className="pt-20 lg:pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="sg-number text-5xl lg:text-7xl font-black text-[var(--sg-text)]">INSTALLATION 09</span>
                <ExhibitLabel label="PRIVATE VIEWING" tone="signal" />
              </div>
              <h1 className="sg-display text-5xl sm:text-6xl lg:text-7xl text-[var(--sg-text)] mt-8 leading-[0.95]">
                See TokenLens applied to
                <br />
                <span className="italic font-light">your AI stack.</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--sg-text-soft)] max-w-xl leading-relaxed">
                Twenty minutes. Live dashboard walk-through. Q&amp;A on your provider mix. You walk away with a deployment plan, whether or not you buy.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <KineticMetricCard label="DURATION" value="20 min"  tone="signal"  />
                <KineticMetricCard label="FORMAT"   value="Zoom"    tone="lens"    />
                <KineticMetricCard label="OUTCOME"  value="Plan"    tone="anomaly" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-12 lg:py-20 bg-[var(--sg-panel)] border-y sg-line">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <ExhibitLabel label="DEMO AGENDA" tone="lens" />
          <h2 className="mt-4 sg-display text-3xl lg:text-5xl text-[var(--sg-text)] max-w-3xl">
            What you&apos;ll see in <span className="italic font-light">twenty minutes.</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--sg-line)] border sg-line">
            {AGENDA.map((item, i) => (
              <article key={item.label} className="bg-[var(--sg-bg)] p-6 flex items-start gap-4 hover:bg-[var(--sg-panel)] transition-colors">
                <span className="sg-number text-3xl font-black text-[var(--sg-text)] leading-none">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-[var(--sg-signal)]" />
                    <p className="font-semibold text-sm text-[var(--sg-text)]">{item.label}</p>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--sg-text-soft)] leading-relaxed">{item.hint}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <ExhibitLabel label="SCHEDULE" tone="signal" />
            <h3 className="mt-4 sg-display text-3xl lg:text-4xl text-[var(--sg-text)]">
              Pick a time that <span className="italic font-light">works for your team.</span>
            </h3>
            <p className="mt-4 text-sm text-[var(--sg-text-soft)] leading-relaxed max-w-md">
              Once you submit, we send a calendar link with 6+ time-slot options across timezones.
            </p>
            <div className="mt-6 space-y-2.5">
              {[
                "Live walkthrough — no slide deck",
                "Bring your own provider stack",
                "Deployment plan in writing after the call",
                "Free, no obligation",
              ].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-[var(--sg-text-soft)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--sg-signal)] flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {state === "success" ? (
              <div className="border-2 border-[var(--sg-signal)] p-10 text-center bg-[var(--sg-panel)]">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--sg-signal)]" />
                <p className="mt-4 sg-display text-2xl text-[var(--sg-text)]">Demo request received.</p>
                <p className="mt-3 text-sm text-[var(--sg-text-soft)] leading-relaxed max-w-md mx-auto">
                  Our team will contact you to schedule a time.
                </p>
                <p className="mt-5 text-xs text-[var(--sg-text-mute)] leading-relaxed max-w-md mx-auto">
                  Need a slot sooner? Email{" "}
                  <a href="mailto:sales@tokenlens.io?subject=Demo%20request" className="text-[var(--sg-signal)] hover:text-[var(--sg-text)]">
                    sales@tokenlens.io
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border sg-line bg-[var(--sg-panel)] p-7 lg:p-9 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-[var(--sg-signal)]" />
                  <span className="sg-caption text-[var(--sg-text-mute)]">DEMO REQUEST FORM</span>
                </div>
                {state === "error" && errMsg && (
                  <div role="alert" className="border border-[var(--sg-risk)] bg-[var(--sg-risk)]/5 p-3 text-xs text-[var(--sg-risk)] leading-relaxed">
                    {errMsg}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="name"  className={LABEL}>NAME</label>       <input id="name"  name="name"  type="text"  required maxLength={200} className={INPUT} placeholder="Jane Doe" /></div>
                  <div><label htmlFor="email" className={LABEL}>WORK EMAIL</label> <input id="email" name="email" type="email" required maxLength={254} className={INPUT} placeholder="jane@company.com" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="company" className={LABEL}>COMPANY</label> <input id="company" name="company" type="text" maxLength={200} className={INPUT} placeholder="Acme Inc." /></div>
                  <div><label htmlFor="role"    className={LABEL}>ROLE</label>    <input id="role"    name="role"    type="text" maxLength={200} className={INPUT} placeholder="VP Engineering / CFO" /></div>
                </div>
                <div><label htmlFor="tools" className={LABEL}>AI TOOLS YOU CURRENTLY PAY FOR</label> <input id="tools" name="tools" type="text" maxLength={2000} className={INPUT} placeholder="Claude, OpenAI, GitHub Copilot…" /></div>
                <div><label htmlFor="msg" className={LABEL}>WHAT MAKES THIS DEMO WORTH YOUR TIME?</label> <textarea id="msg" name="msg" rows={3} maxLength={10000} className={INPUT} placeholder="The biggest gap in our AI cost visibility is…" /></div>
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--sg-ink)] text-[var(--sg-bg)] font-semibold text-sm hover:bg-[var(--sg-signal)] hover:text-[#050505] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? "Submitting…" : (<><Clock className="h-4 w-4" /> Request Demo <ArrowUpRight className="h-4 w-4 group-hover:rotate-12 transition-transform" /></>)}
                </button>
                <p className="text-[11px] text-[var(--sg-text-mute)] leading-snug pt-3 border-t sg-line-soft">
                  Prefer email? Reach{" "}
                  <a href="mailto:sales@tokenlens.io?subject=Demo%20request" className="text-[var(--sg-signal)] hover:text-[var(--sg-text)]">sales@tokenlens.io</a> directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
