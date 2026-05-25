/**
 * Kinetic Dashboard Preview — gallery-style mock UI.
 * Editorial framing: window chrome reads "OBSERVATORY", museum-caption sidebar.
 */

import { TrendingUp, AlertTriangle, Activity } from "lucide-react";

const SPARK = [22, 28, 26, 35, 30, 42, 38, 48, 44, 56, 52, 64, 60, 72, 70, 82];

function Sparkline({ data = SPARK, color = "var(--sg-signal)" }: { data?: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200, h = 50;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#spark-grad)" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* Frame */}
      <div className="border-2 border-[var(--sg-ink)] bg-[var(--sg-bg)] relative overflow-hidden">
        {/* Top chrome — museum caption style */}
        <div className="flex items-center justify-between border-b sg-line px-4 py-2 bg-[var(--sg-panel)]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[var(--sg-risk)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--sg-budget)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--sg-signal)]" />
            <span className="sg-caption text-[var(--sg-text-mute)] ml-3">OBSERVATORY · DASHBOARD</span>
          </div>
          <div className="sg-caption text-[var(--sg-text-mute)] flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-[var(--sg-signal)]" />
            7 / 7 LIVE
          </div>
        </div>

        <div className="grid grid-cols-12">
          {/* Mini sidebar */}
          <div className="hidden lg:block col-span-2 border-r sg-line p-3">
            <p className="sg-caption text-[var(--sg-text-mute)] mb-3">NAV</p>
            {[
              { l: "Dashboard", a: true },
              { l: "AI Users"   },
              { l: "AI Teams"   },
              { l: "AI Models"  },
              { l: "Dev Tools"  },
              { l: "LLM Spend"  },
              { l: "Governance" },
              { l: "Settings"   },
            ].map(item => (
              <div key={item.l} className={`py-1 text-[11px] flex items-center gap-2 ${item.a ? "text-[var(--sg-signal)] font-semibold" : "text-[var(--sg-text-soft)]"}`}>
                <span aria-hidden className={`h-px w-2 ${item.a ? "bg-[var(--sg-signal)]" : "bg-[var(--sg-line)]"}`} />
                {item.l}
              </div>
            ))}
          </div>

          {/* Main body */}
          <div className="col-span-12 lg:col-span-10 p-4 lg:p-5 space-y-4">
            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "MTD SPEND",  value: "$48,210", trend: "+8.2%", tone: "var(--sg-budget)" },
                { label: "ACTIVE",     value: "428",     trend: "+12",    tone: "var(--sg-signal)"},
                { label: "PROVIDERS",  value: "7",       trend: "LIVE",   tone: "var(--sg-lens)"  },
                { label: "TOKENS",     value: "412M",    trend: "+3.4%",  tone: "var(--sg-signal)"},
              ].map(k => (
                <div key={k.label} className="border sg-line p-3 bg-[var(--sg-panel)] relative">
                  <span aria-hidden className="absolute -top-px -left-px h-1.5 w-1.5 border-t border-l" style={{ borderColor: k.tone }} />
                  <p className="sg-caption text-[var(--sg-text-mute)] text-[9px]">{k.label}</p>
                  <p className="sg-number text-lg font-bold text-[var(--sg-text)] mt-0.5 leading-none">{k.value}</p>
                  <p className="sg-caption text-[9px] mt-1" style={{ color: k.tone }}>{k.trend}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="border sg-line p-3 bg-[var(--sg-panel)]">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-bold text-[var(--sg-text)]">Daily spend</p>
                <p className="sg-caption text-[var(--sg-text-mute)] text-[9px]">LAST 30 D · 7 PROVIDERS</p>
              </div>
              <Sparkline data={[18, 22, 20, 28, 26, 32, 30, 38, 36, 44, 42, 48, 46, 54, 58, 64]} color="var(--sg-signal)" />
            </div>

            {/* Provider mix + alert */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 border sg-line p-3 bg-[var(--sg-panel)]">
                <p className="text-[11px] font-bold text-[var(--sg-text)] mb-3">Provider mix</p>
                {[
                  { n: "Anthropic",        c: "$18,420", p: 38, tone: "var(--sg-signal)" },
                  { n: "OpenAI",           c: "$11,840", p: 24, tone: "var(--sg-lens)"   },
                  { n: "GitHub Copilot",   c: "$7,920",  p: 16, tone: "var(--sg-anomaly)"},
                  { n: "Microsoft Copilot",c: "$5,720",  p: 12, tone: "#6366F1"          },
                  { n: "Cursor",           c: "$4,310",  p: 10, tone: "var(--sg-budget)" },
                ].map(p => (
                  <div key={p.n} className="flex items-center gap-2 py-1 text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.tone }} />
                    <span className="text-[var(--sg-text-soft)] w-32">{p.n}</span>
                    <div className="flex-1 h-px bg-[var(--sg-line)] relative">
                      <span aria-hidden className="absolute left-0 top-0 h-px" style={{ background: p.tone, width: `${p.p}%` }} />
                    </div>
                    <span className="sg-number text-[var(--sg-text)] w-16 text-right">{p.c}</span>
                  </div>
                ))}
              </div>
              <div className="border-2 border-[var(--sg-budget)] p-3 bg-[var(--sg-panel)] relative">
                <span aria-hidden className="absolute -top-px -left-px h-1.5 w-12 bg-[var(--sg-budget)]" />
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-[var(--sg-budget)] mt-0.5" />
                  <div>
                    <p className="sg-caption text-[var(--sg-budget)] text-[9px]">BUDGET ALERT</p>
                    <p className="text-[11px] text-[var(--sg-text)] mt-1 leading-snug">OpenAI on track to exceed monthly cap by $1.2K</p>
                    <p className="sg-caption text-[var(--sg-text-mute)] text-[9px] mt-2">2 HRS AGO · AUTO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Adoption */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { team: "Web",     a: 82, tone: "var(--sg-signal)" },
                { team: "Mobile",  a: 71, tone: "var(--sg-lens)"   },
                { team: "DevOps",  a: 64, tone: "var(--sg-anomaly)"},
                { team: "AI R&D",  a: 95, tone: "var(--sg-signal)" },
              ].map(t => (
                <div key={t.team} className="border sg-line p-2.5 bg-[var(--sg-panel)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="sg-caption text-[var(--sg-text-mute)] text-[9px]">{t.team}</span>
                    <TrendingUp className="h-2.5 w-2.5" style={{ color: t.tone }} />
                  </div>
                  <p className="sg-number text-lg font-bold text-[var(--sg-text)] leading-none">{t.a}%</p>
                  <div className="mt-2 h-px bg-[var(--sg-line)] relative">
                    <span aria-hidden className="absolute top-0 left-0 h-px" style={{ background: t.tone, width: `${t.a}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="border-t sg-line px-4 py-1.5 flex items-center justify-between bg-[var(--sg-panel)]">
          <span className="sg-caption text-[var(--sg-text-mute)] text-[9px] flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--sg-signal)] animate-pulse" />
            SYNC · 4M AGO
          </span>
          <span className="sg-caption text-[var(--sg-text-mute)] text-[9px]">v2.1.0</span>
        </div>
      </div>

      {/* Museum caption hanging beneath */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="sg-caption text-[var(--sg-text-mute)]">EXHIBIT 01 — KINETIC DASHBOARD</p>
          <p className="text-xs text-[var(--sg-text-soft)] mt-1 max-w-sm">
            Live operating view of company-wide AI usage, spend, and adoption — across every connected provider.
          </p>
        </div>
        <span className="sg-caption text-[var(--sg-text-mute)] whitespace-nowrap">№ 001/008</span>
      </div>
    </div>
  );
}
