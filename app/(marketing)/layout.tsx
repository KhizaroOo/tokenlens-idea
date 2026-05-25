import type { ReactNode } from "react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-slate-900 dark:text-white antialiased">
      {/* Global ambient gradients — visible in both themes (low-opacity color over any bg) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(16,185,129,0.10), transparent 70%)",
            "radial-gradient(ellipse 70% 50% at 90% 30%, rgba(6,182,212,0.07), transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 10% 70%, rgba(139,92,246,0.06), transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Subtle grid — light variant (dark lines on light bg) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.045] dark:opacity-0 transition-opacity"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,22,41,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,22,41,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Subtle grid — dark variant (light lines on dark bg) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-0 dark:opacity-[0.025] transition-opacity"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <MarketingHeader />
      <main className="pt-16">{children}</main>
      <MarketingFooter />
    </div>
  );
}
