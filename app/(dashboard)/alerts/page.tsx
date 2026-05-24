"use client";

import { Bell } from "lucide-react";
import { PageShell } from "@/components/dashboard/PageShell";

export default function AlertsPage() {
  return (
    <PageShell title="Alerts" subtitle="Threshold alerts and anomaly detection">
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
          <Bell className="h-8 w-8 text-amber-400" />
        </div>
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest bg-amber-500/15 text-amber-400 uppercase">
            Coming Soon
          </span>
          <h2 className="text-xl font-bold text-foreground mb-2">Alerts</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Set spend thresholds, token limits, and anomaly detection rules. Get notified when usage spikes or budgets are exceeded.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
