"use client";

import { ClipboardList } from "lucide-react";
import { PageShell } from "@/components/dashboard/PageShell";

export default function AuditLogsPage() {
  return (
    <PageShell title="Audit Logs" subtitle="Full audit trail of all platform activity">
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
          <ClipboardList className="h-8 w-8 text-indigo-400" />
        </div>
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest bg-amber-500/15 text-amber-400 uppercase">
            Coming Soon
          </span>
          <h2 className="text-xl font-bold text-foreground mb-2">Audit Logs</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Track every configuration change, sync run, and user action. Full compliance-ready audit trail with search and filters.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
