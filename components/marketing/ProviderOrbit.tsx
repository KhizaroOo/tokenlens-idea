/**
 * Provider Orbit — abstract visual showing providers orbiting the TokenLens core.
 * Pure CSS/SVG. No animation that causes layout shift.
 */

const PROVIDERS = [
  { name: "Claude",       short: "AI", tone: "emerald", angle: 0   },
  { name: "OpenAI",       short: "AI", tone: "cyan",    angle: 51  },
  { name: "Copilot",      short: "GH", tone: "violet",  angle: 103 },
  { name: "Cursor",       short: "CS", tone: "amber",   angle: 154 },
  { name: "M365 Copilot", short: "MS", tone: "indigo",  angle: 206 },
  { name: "Gemini",       short: "GE", tone: "amber",   angle: 257 },
  { name: "Perplexity",   short: "PX", tone: "amber",   angle: 308 },
];

const TONE_BG: Record<string, string> = {
  emerald: "bg-emerald-500/15 ring-emerald-400/30 text-emerald-700 dark:text-emerald-300",
  cyan:    "bg-cyan-500/15    ring-cyan-400/30    text-cyan-700 dark:text-cyan-300",
  violet:  "bg-violet-500/15  ring-violet-400/30  text-violet-700 dark:text-violet-300",
  amber:   "bg-amber-500/15   ring-amber-400/30   text-amber-700 dark:text-amber-300",
  indigo:  "bg-indigo-500/15  ring-indigo-400/30  text-indigo-700 dark:text-indigo-300",
};

export function ProviderOrbit() {
  const radius = 180; // px from center
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-square">
      {/* Orbit rings */}
      <div className="absolute inset-0 rounded-full border border-slate-300/60 dark:border-white/[0.08]" />
      <div className="absolute inset-[12%] rounded-full border border-slate-300/40 dark:border-white/[0.06]" />
      <div className="absolute inset-[28%] rounded-full border border-dashed border-slate-300/60 dark:border-white/[0.08]" />

      {/* Center core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl" />
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 grid place-items-center shadow-2xl shadow-emerald-500/30">
            <div className="h-20 w-20 rounded-full bg-white dark:bg-[#050810] grid place-items-center">
              <div className="text-center">
                <p className="text-[9px] font-bold tracking-widest text-slate-600 dark:text-white/60 uppercase">TokenLens</p>
                <p className="mt-0.5 text-[10px] text-emerald-700 dark:text-emerald-300">Core</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider nodes */}
      {PROVIDERS.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={p.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            {/* Connecting line — drawn behind via translate trick: simple gradient line */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-left h-px bg-gradient-to-r from-slate-300/70 to-transparent dark:from-white/15 pointer-events-none"
              style={{
                width: `${radius - 56}px`,
                transform: `translate(-100%, -50%) rotate(${p.angle + 180}deg)`,
                transformOrigin: "right center",
              }}
            />
            <div className={`relative rounded-xl ring-1 ${TONE_BG[p.tone]} px-3 py-2 backdrop-blur-sm whitespace-nowrap`}>
              <p className="text-[11px] font-semibold">{p.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
