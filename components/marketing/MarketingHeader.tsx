"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const NAV = [
  { label: "Product",      href: "/platform" },
  { label: "Solutions",    href: "/solutions" },
  { label: "Use Cases",    href: "/use-cases" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Resources",    href: "/resources" },
  { label: "Security",     href: "/security" },
];

/** Match `/platform`, `/platform/x`, etc. — but not `/` matching everything. */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-8" aria-hidden />;

  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#050810]/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 grid place-items-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="h-2 w-2 rounded-full bg-white dark:bg-[#050810]" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-emerald-400/30 blur-md -z-10" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Token<span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent">Lens</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(item => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${
                  active
                    ? "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-400/10"
                    : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 w-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeSwitch />
          <Link
            href="/login"
            className="text-sm text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 transition-colors"
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

        {/* Mobile toggle row */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitch />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            className="h-9 w-9 grid place-items-center text-slate-700 dark:text-white rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white dark:bg-[#050810]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5">
          <nav className="px-5 py-4 flex flex-col gap-1">
            {NAV.map(item => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    active
                      ? "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-400/10 font-semibold"
                      : "text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="h-px bg-slate-200 dark:bg-white/5 my-2" />
            <Link
              href="/login"
              className="px-3 py-2.5 text-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/demo"
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
