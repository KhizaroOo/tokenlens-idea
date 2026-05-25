import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COLUMNS = [
  {
    label: "Product",
    links: [
      { label: "Platform",      href: "/platform" },
      { label: "Integrations",  href: "/integrations" },
      { label: "Pricing",       href: "/pricing" },
      { label: "Security",      href: "/security" },
      { label: "Demo",          href: "/demo" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "For CTOs",             href: "/solutions#cto" },
      { label: "For CFOs",             href: "/solutions#cfo" },
      { label: "For FinOps",           href: "/solutions#finops" },
      { label: "For Engineering",      href: "/solutions#engineering" },
      { label: "Use Cases",            href: "/use-cases" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Resource Hub",         href: "/resources" },
      { label: "About",                href: "/about" },
      { label: "Contact",              href: "/contact" },
      { label: "Book Demo",            href: "/demo" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy",              href: "/privacy" },
      { label: "Terms",                href: "/terms" },
      { label: "Security",             href: "/security" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative bg-[#050810] text-white border-t border-white/5">
      {/* CTA block */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-500/[0.08] p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_60%)]" />
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                One operating dashboard for your company&apos;s AI.
              </h3>
              <p className="mt-2 text-sm text-white/60">
                See AI spend, adoption, productivity, and governance across every provider — before the invoice arrives.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity"
              >
                Book Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 border border-white/15 text-white hover:bg-white/5 transition-colors"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-6 gap-8 pb-14">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 grid place-items-center">
              <div className="h-2 w-2 rounded-full bg-[#050810]" />
            </div>
            <span className="text-base font-bold tracking-tight">
              Token<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Lens</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-white/55 max-w-xs leading-relaxed">
            The control lens for company-wide AI usage. Monitor spend, govern adoption, and prove ROI across every AI provider — from one dashboard.
          </p>
        </div>

        {COLUMNS.map(col => (
          <div key={col.label}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">{col.label}</p>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} TokenLens. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70">Terms</Link>
            <Link href="/security" className="hover:text-white/70">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
