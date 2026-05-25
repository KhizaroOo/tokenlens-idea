/**
 * Static dashboard mockup — pure CSS/SVG, no real data.
 * Used as a visual proof element on hero and product pages.
 */

import { Activity, DollarSign, Layers, Users, Zap, TrendingUp, AlertTriangle } from "lucide-react";

const SPARK = [22, 28, 26, 35, 30, 42, 38, 48, 44, 56, 52, 64, 60, 72, 70, 82];

function Sparkline({ data = SPARK, color = "emerald" }: { data?: number[]; color?: "emerald" | "cyan" | "amber" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200, h = 50;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const stroke = { emerald: "#10b981", cyan: "#06b6d4", amber: "#f59e0b" }[color];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#grad-${color})`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function DashboardMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a1426] to-[#050810] shadow-2xl shadow-emerald-500/10">
      {/* Top window chrome */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-white/5 bg-[#050810]">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="text-[10px] text-white/40 text-center font-mono">app.tokenlens.io/dashboard</div>
        </div>
        <div className="h-5 w-12 rounded-md bg-white/5" />
      </div>

      {/* Body */}
      <div className="grid grid-cols-12 gap-3 p-4 lg:p-5">
        {/* Mini sidebar */}
        <div className="hidden lg:block col-span-2 space-y-1.5">
          {[
            { label: "Dashboard", active: true },
            { label: "AI Users" },
            { label: "AI Teams" },
            { label: "AI Models" },
            { label: "Dev Tools" },
            { label: "LLM Spend" },
            { label: "Governance" },
            { label: "Settings" },
          ].map(item => (
            <div
              key={item.label}
              className={`h-6 rounded-md text-[10px] flex items-center px-2 ${
                item.active ? "bg-emerald-500/15 text-emerald-300" : "text-white/40"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-10 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: "MTD Spend",  value: "$48,210", delta: "+8.2%", color: "amber"   as const },
              { icon: Users,      label: "Active",     value: "428",     delta: "+12",   color: "emerald" as const },
              { icon: Layers,     label: "Providers",  value: "7",       delta: "Live",  color: "cyan"    as const },
              { icon: Zap,        label: "Tokens",     value: "412M",    delta: "+3.4%", color: "emerald" as const },
            ].map(k => (
              <div key={k.label} className="rounded-lg border border-white/10 bg-white/[0.025] p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <k.icon className={`h-3 w-3 ${
                    k.color === "amber"   ? "text-amber-400"   :
                    k.color === "emerald" ? "text-emerald-400" :
                                            "text-cyan-400"
                  }`} />
                  <span className={`text-[9px] font-bold rounded px-1 py-0.5 ${
                    k.color === "amber"   ? "bg-amber-500/10 text-amber-400"   :
                    k.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
                                            "bg-cyan-500/10 text-cyan-400"
                  }`}>{k.delta}</span>
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-wider">{k.label}</p>
                <p className="text-base lg:text-lg font-bold font-mono tabular-nums leading-tight">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Chart panel */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[11px] font-semibold">Daily spend trend</p>
                <p className="text-[9px] text-white/40">Last 30 days · 7 providers</p>
              </div>
              <div className="flex items-center gap-3 text-[9px]">
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Anthropic
                </span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> OpenAI
                </span>
                <span className="flex items-center gap-1 text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Copilot
                </span>
              </div>
            </div>
            <Sparkline data={[18, 22, 20, 28, 26, 32, 30, 38, 36, 44, 42, 48, 46, 54, 58, 64]} color="emerald" />
          </div>

          {/* Provider list + alert */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <p className="text-[11px] font-semibold mb-2.5">Provider mix</p>
              {[
                { name: "Anthropic",        cost: "$18,420", pct: 38, color: "bg-emerald-400" },
                { name: "OpenAI",           cost: "$11,840", pct: 24, color: "bg-cyan-400"    },
                { name: "GitHub Copilot",   cost: "$7,920",  pct: 16, color: "bg-violet-400"  },
                { name: "Microsoft Copilot",cost: "$5,720",  pct: 12, color: "bg-indigo-400"  },
                { name: "Cursor",           cost: "$4,310",  pct: 10, color: "bg-amber-400"   },
              ].map(p => (
                <div key={p.name} className="flex items-center gap-2 py-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${p.color}`} />
                  <span className="text-[10px] text-white/60 w-28">{p.name}</span>
                  <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full ${p.color} opacity-70`} style={{ width: `${p.pct}%` }} />
                  </div>
                  <span className="text-[10px] font-mono tabular-nums text-white/70 w-16 text-right">{p.cost}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-amber-400/20 bg-amber-500/[0.05] p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Budget alert</p>
                  <p className="text-[11px] text-white/70 mt-1 leading-snug">OpenAI on track to exceed monthly cap by $1.2K</p>
                  <p className="text-[9px] text-white/40 mt-1.5">2 hrs ago · Auto-detected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: adoption */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { team: "Web",     adopt: 82, color: "bg-emerald-400" },
              { team: "Mobile",  adopt: 71, color: "bg-cyan-400"    },
              { team: "DevOps",  adopt: 64, color: "bg-violet-400"  },
              { team: "AI R&D",  adopt: 95, color: "bg-emerald-400" },
            ].map(t => (
              <div key={t.team} className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/55">{t.team}</span>
                  <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-base font-bold font-mono">{t.adopt}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${t.color}`} style={{ width: `${t.adopt}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-[9px] text-white/35 bg-[#050810]">
        <span className="flex items-center gap-1.5">
          <Activity className="h-2.5 w-2.5 text-emerald-400" />
          <span className="text-emerald-300">7/7</span> providers syncing
        </span>
        <span>Last sync: 4m ago</span>
        <span className="ml-auto font-mono">v2.1.0</span>
      </div>

      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-emerald-400/20 via-cyan-400/0 to-violet-400/15 opacity-30 blur-xl -z-10" />
    </div>
  );
}
