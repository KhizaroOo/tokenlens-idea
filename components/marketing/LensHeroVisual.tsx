/**
 * Lens Hero Visual — the central "living lens" art object for the homepage.
 * Pure SVG + CSS. Provider names orbit, signal lines pulse, mini KPIs float.
 */

const PROVIDERS = [
  { name: "Claude",        angle: -90,  r: 220, tone: "var(--sg-signal)" },
  { name: "OpenAI",        angle: -38,  r: 220, tone: "var(--sg-lens)"   },
  { name: "GitHub Copilot",angle:  20,  r: 195, tone: "var(--sg-anomaly)"},
  { name: "Cursor",        angle:  78,  r: 220, tone: "var(--sg-budget)" },
  { name: "M365 Copilot",  angle: 138,  r: 200, tone: "#6366F1"          },
  { name: "Gemini",        angle: 188,  r: 235, tone: "var(--sg-budget)" },
  { name: "Perplexity",    angle: 238,  r: 215, tone: "var(--sg-budget)" },
];

const KPIS = [
  { label: "MTD spend",       value: "$48.2K", x: -180, y: -120, tone: "var(--sg-budget)" },
  { label: "Active users",    value: "428",    x:  170, y: -150, tone: "var(--sg-signal)" },
  { label: "Optimization",    value: "18%",    x:  200, y:  120, tone: "var(--sg-anomaly)"},
  { label: "Providers",       value: "7",      x: -200, y:  130, tone: "var(--sg-lens)"   },
];

export function LensHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] aspect-square">
      {/* Outer aura */}
      <div className="absolute inset-0 sg-lens-aura" />

      {/* SVG orbit rings */}
      <svg viewBox="-300 -300 600 600" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <radialGradient id="hero-lens-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"  stopColor="var(--sg-signal-glow)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--sg-lens-glow)"   stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--sg-anomaly-glow)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="var(--sg-signal)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--sg-signal)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--sg-signal)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Concentric orbit arcs (not full circles) */}
        <g fill="none" stroke="var(--sg-line)" strokeWidth="0.6">
          <circle r="260" />
          <circle r="200" strokeDasharray="2 5" />
          <circle r="140" />
          <circle r="80"  strokeDasharray="1 3" />
        </g>

        {/* Cross hairs */}
        <g stroke="var(--sg-line)" strokeWidth="0.4">
          <line x1="-300" y1="0" x2="300" y2="0" />
          <line x1="0" y1="-300" x2="0" y2="300" />
        </g>

        {/* Signal connection lines from each provider to center */}
        {PROVIDERS.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const x = Math.cos(rad) * p.r;
          const y = Math.sin(rad) * p.r;
          return (
            <line
              key={p.name}
              x1={x} y1={y} x2="0" y2="0"
              stroke={p.tone}
              strokeWidth="0.6"
              strokeOpacity="0.5"
              strokeDasharray="2 4"
            />
          );
        })}

        {/* Center lens — concentric circles */}
        <g>
          <circle r="60" fill="url(#hero-lens-grad)" opacity="0.7" />
          <circle r="48" fill="var(--sg-bg)" />
          <circle r="48" fill="none" stroke="var(--sg-ink)" strokeWidth="1.2" />
          <circle r="32" fill="none" stroke="var(--sg-signal)" strokeWidth="0.8" />
          <circle r="14" fill="var(--sg-ink)" />
          <circle r="6"  fill="var(--sg-signal)" className="sg-pulse" style={{ transformOrigin: "center" }} />
          {/* aperture ticks */}
          <g stroke="var(--sg-ink)" strokeWidth="1" strokeLinecap="round">
            <line x1="0" y1="-58" x2="0" y2="-50" />
            <line x1="0" y1="50"  x2="0" y2="58" />
            <line x1="-58" y1="0" x2="-50" y2="0" />
            <line x1="50" y1="0"  x2="58" y2="0" />
          </g>
        </g>

        {/* Orbiting tick (slow rotation) */}
        <g className="sg-orbit-slow" style={{ transformOrigin: "center" }}>
          <circle cx="200" cy="0" r="2.5" fill="var(--sg-signal)" />
        </g>
        <g className="sg-orbit-med" style={{ transformOrigin: "center" }}>
          <circle cx="-260" cy="0" r="1.5" fill="var(--sg-lens)" />
        </g>
      </svg>

      {/* Provider name tags positioned in HTML for crisp typography */}
      {PROVIDERS.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.r;
        const y = Math.sin(rad) * p.r;
        return (
          <div
            key={p.name}
            className="absolute left-1/2 top-1/2 transform"
            style={{ transform: `translate(calc(-50% + ${x / 2.4}px), calc(-50% + ${y / 2.4}px))` }}
          >
            <div className="flex items-center gap-1.5 border sg-line bg-[var(--sg-panel)]/80 backdrop-blur px-2.5 py-1 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full" style={{ background: p.tone }} />
              <span className="sg-caption text-[var(--sg-text)]">{p.name}</span>
            </div>
          </div>
        );
      })}

      {/* Floating KPI fragments */}
      {KPIS.map(k => (
        <div
          key={k.label}
          className="absolute left-1/2 top-1/2"
          style={{ transform: `translate(calc(-50% + ${k.x / 2.4}px), calc(-50% + ${k.y / 2.4}px))` }}
        >
          <div className="border sg-line bg-[var(--sg-bg)]/95 backdrop-blur-sm p-2.5 min-w-[110px] relative">
            <span aria-hidden className="absolute top-0 left-0 h-px w-4" style={{ background: k.tone }} />
            <p className="sg-caption text-[var(--sg-text-mute)] text-[9px]">{k.label}</p>
            <p className="sg-number font-bold text-base text-[var(--sg-text)] leading-none mt-0.5">{k.value}</p>
          </div>
        </div>
      ))}

      {/* Bottom caption */}
      <div className="absolute -bottom-12 left-0 right-0 flex justify-between sg-caption text-[var(--sg-text-mute)]">
        <span>LENS · v2.1</span>
        <span>8 PROVIDERS COVERED</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
