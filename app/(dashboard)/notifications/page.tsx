"use client";

import { BellRing } from "lucide-react";
import { PageShell } from "@/components/dashboard/PageShell";

export default function NotificationsPage() {
  return (
    <PageShell title="Notifications" subtitle="Manage your notification preferences">
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <BellRing className="h-8 w-8 text-emerald-400" />
        </div>
        <div className="text-center">
          <span className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-bold tracking-widest bg-amber-500/15 text-amber-400 uppercase">
            Coming Soon
          </span>
          <h2 className="text-xl font-bold text-foreground mb-2">Notifications</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Configure email, Slack, and webhook notifications for alerts, sync completions, and weekly digests.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
