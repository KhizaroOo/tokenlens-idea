/**
 * DataFlowDiagram — providers → ingest → analyze → govern → report
 * Pure CSS layout.
 */

import { Layers, RefreshCw, BrainCircuit, ShieldCheck, FileBarChart } from "lucide-react";

const STAGES = [
  { icon: Layers,        label: "Providers",  hint: "8+ APIs"        , tone: "white"   },
  { icon: RefreshCw,     label: "Ingest",     hint: "Encrypted sync" , tone: "emerald" },
  { icon: BrainCircuit,  label: "Analyze",    hint: "Users · Models" , tone: "cyan"    },
  { icon: ShieldCheck,   label: "Govern",     hint: "Budgets · Rules", tone: "violet"  },
  { icon: FileBarChart,  label: "Report",     hint: "Exec · FinOps"  , tone: "amber"   },
];

const TONE: Record<string, { ring: string; bg: string; ic: string; ar: string }> = {
  white:   { ring: "ring-white/10",       bg: "bg-white/[0.04]",   ic: "text-white/70",   ar: "text-white/20"    },
  emerald: { ring: "ring-emerald-400/20", bg: "bg-emerald-500/10", ic: "text-emerald-300",ar: "text-emerald-400" },
  cyan:    { ring: "ring-cyan-400/20",    bg: "bg-cyan-500/10",    ic: "text-cyan-300",   ar: "text-cyan-400"    },
  violet:  { ring: "ring-violet-400/20",  bg: "bg-violet-500/10",  ic: "text-violet-300", ar: "text-violet-400"  },
  amber:   { ring: "ring-amber-400/20",   bg: "bg-amber-500/10",   ic: "text-amber-300",  ar: "text-amber-400"   },
};

export function DataFlowDiagram() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {STAGES.map((s, i) => {
          const t = TONE[s.tone];
          return (
            <div key={s.label} className="relative">
              <div className={`rounded-2xl ring-1 ${t.ring} ${t.bg} p-5 flex flex-col items-center text-center`}>
                <div className={`h-12 w-12 rounded-xl grid place-items-center bg-white/5`}>
                  <s.icon className={`h-5 w-5 ${t.ic}`} />
                </div>
                <p className="mt-3 font-semibold text-sm">{s.label}</p>
                <p className="mt-0.5 text-xs text-white/45">{s.hint}</p>
                <p className="mt-3 text-[10px] font-mono text-white/30 tracking-widest">STEP {i + 1}</p>
              </div>
              {/* Connector arrow */}
              {i < STAGES.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                    <path
                      d="M1 7 L17 7 M13 3 L17 7 L13 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={t.ar}
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
