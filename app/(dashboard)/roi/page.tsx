"use client";

import { TrendingUp } from "lucide-react";
import { PageShell } from "@/components/dashboard/PageShell";

export default function RoiPage() {
  return (
    <PageShell title="AI ROI" subtitle="Return on investment analytics for your AI tools">
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
        </div>
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest bg-amber-500/15 text-amber-400 uppercase">
            Coming Soon
          </span>
          <h2 className="text-xl font-bold text-foreground mb-2">AI ROI</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Measure the return on your AI investments. Compare productivity gains, cost savings, and output quality across teams and tools.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
