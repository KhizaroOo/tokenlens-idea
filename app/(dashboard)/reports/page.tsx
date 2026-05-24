"use client";

import { FileBarChart } from "lucide-react";
import { PageShell } from "@/components/dashboard/PageShell";

export default function ReportsPage() {
  return (
    <PageShell title="Reports" subtitle="Scheduled and on-demand usage reports">
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
          <FileBarChart className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest bg-amber-500/15 text-amber-400 uppercase">
            Coming Soon
          </span>
          <h2 className="text-xl font-bold text-foreground mb-2">Reports</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Generate detailed cost and usage reports by team, model, or time period. Export to PDF or CSV on a schedule.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
