"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV = [
  { label: "Product",      href: "/platform" },
  { label: "Solutions",    href: "/solutions" },
  { label: "Use Cases",    href: "/use-cases" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Resources",    href: "/resources" },
  { label: "Security",     href: "/security" },
];

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050810]/85 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 grid place-items-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="h-2 w-2 rounded-full bg-[#050810]" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-emerald-400/30 blur-md -z-10" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Token<span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Lens</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white px-3 py-1.5 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-4 py-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810] hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
          >
            Book Demo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
          className="lg:hidden h-9 w-9 grid place-items-center text-white rounded-md hover:bg-white/5"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#050810]/95 backdrop-blur-xl border-t border-white/5">
          <nav className="px-5 py-4 flex flex-col gap-1">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-white/5 my-2" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-[#050810]"
            >
              Book Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
