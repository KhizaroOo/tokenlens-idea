"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/dashboard/PageShell";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { useTranslation } from "@/contexts/LanguageContext";
import { Terminal, GitCommit, GitPullRequest, Zap } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TH, TR, TD, TD_MONO, TEAM_PILL, CHART_TOOLTIP, CHART_COLORS } from "@/lib/table-styles";

interface Totals {
  sessions: number | null;
  commits: number | null;
  pullRequests: number | null;
  linesAdded: number | null;
  estimatedCostUsd: string | null;
}

interface UserRow {
  userEmail: string;
  _sum: {
    sessions: number | null;
    commits: number | null;
    pullRequests: number | null;
    linesAdded: number | null;
    estimatedCostUsd: string | null;
  };
}

interface WeeklyRow {
  date: string;
  _sum: { sessions: number | null; commits: number | null; pullRequests: number | null };
}

interface ApiData {
  totals: Totals;
  byUser: UserRow[];
  weekly: WeeklyRow[];
}

function fmt(n: number | null | undefined) {
  return (n ?? 0).toLocaleString();
}
function fmtCost(v: string | number | null | undefined) {
  return `$${Number(v ?? 0).toFixed(2)}`;
}
function fmtLines(n: number | null | undefined) {
  return `+${(n ?? 0).toLocaleString()}`;
}

export default function ClaudeCodePage() {
  const { t } = useTranslation();
  const cc = t.claudeCode;

  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/claude-code")
      .then((r) => r.json())
      .then((d: ApiData) => setData(d))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  // Aggregate weekly data into week-bucketed chart data
  const weeklyChart = (() => {
    if (!data?.weekly?.length) return [];
    // Group by ISO week label (take date, show as "MMM dd")
    return data.weekly.slice(-8).map((w) => ({
      week: new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sessions: w._sum.sessions ?? 0,
      commits: w._sum.commits ?? 0,
      prs: w._sum.pullRequests ?? 0,
    }));
  })();

  const totals = data?.totals;
  const byUser = data?.byUser ?? [];

  return (
    <PageShell title={cc.title} subtitle={cc.subtitle}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label={cc.sessions}
          value={loading ? "…" : fmt(totals?.sessions)}
          icon={Terminal}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          label={cc.commits}
          value={loading ? "…" : fmt(totals?.commits)}
          icon={GitCommit}
          iconColor="text-cyan-500"
          iconBg="bg-cyan-500/10"
        />
        <StatCard
          label={cc.prs}
          value={loading ? "…" : fmt(totals?.pullRequests)}
          icon={GitPullRequest}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-500/10"
        />
        <StatCard
          label={cc.cost}
          value={loading ? "…" : fmtCost(totals?.estimatedCostUsd)}
          icon={Zap}
          iconColor="text-amber-500"
          iconBg="bg-amber-500/10"
        />
      </div>

      <SectionCard title="Daily Activity" subtitle="Sessions, commits and PRs — last 30 days">
        {loading ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
        ) : weeklyChart.length === 0 ? (
          <div className="h-60 flex items-center justify-center text-muted-foreground text-sm">No data yet — run a sync first.</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyChart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="sessions" fill={CHART_COLORS.emerald} radius={[5, 5, 0, 0]} name="Sessions" />
              <Bar dataKey="commits"  fill={CHART_COLORS.cyan}    radius={[5, 5, 0, 0]} name="Commits"  />
              <Bar dataKey="prs"      fill={CHART_COLORS.indigo}  radius={[5, 5, 0, 0]} name="PRs"      />
            </BarChart>
          </ResponsiveContainer>
        )}
      </SectionCard>

      <SectionCard title="Developer Breakdown" subtitle={t.dashboard.last30days} noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[cc.table.dev, cc.table.team, cc.table.sessions, cc.table.commits, cc.table.prs, cc.table.lines, cc.table.cost].map((h) => (
                  <th key={h} className={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">Loading…</td></tr>
              ) : byUser.length === 0 ? (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No data yet — run a sync first.</td></tr>
              ) : (
                byUser.map((d, i) => (
                  <tr key={i} className={TR}>
                    <td className={TD + " font-semibold text-foreground"}>{d.userEmail}</td>
                    <td className={TD}><span className={TEAM_PILL}>—</span></td>
                    <td className={TD_MONO + " text-muted-foreground"}>{fmt(d._sum.sessions)}</td>
                    <td className={TD_MONO + " text-muted-foreground"}>{fmt(d._sum.commits)}</td>
                    <td className={TD_MONO + " text-muted-foreground"}>{fmt(d._sum.pullRequests)}</td>
                    <td className={TD_MONO + " font-semibold text-emerald-500"}>{fmtLines(d._sum.linesAdded)}</td>
                    <td className={TD_MONO + " font-bold text-foreground"}>{fmtCost(d._sum.estimatedCostUsd)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  );
}
