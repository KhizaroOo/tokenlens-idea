/**
 * Provider Constellation — used on integrations page.
 * Providers grouped by category onto distinct orbital rings.
 */

const RINGS = [
  {
    radius: 110,
    label: "LLM / API SPEND",
    providers: [
      { name: "Claude",       angle:  90,  tone: "var(--sg-signal)" },
      { name: "OpenAI",       angle: 170,  tone: "var(--sg-lens)"   },
      { name: "Gemini",       angle: 250,  tone: "var(--sg-budget)" },
      { name: "Perplexity",   angle: 330,  tone: "var(--sg-budget)" },
    ],
  },
  {
    radius: 180,
    label: "DEVELOPER AI",
    providers: [
      { name: "Claude Code",  angle: 35,  tone: "var(--sg-signal)" },
      { name: "GH Copilot",   angle: 145, tone: "var(--sg-anomaly)"},
      { name: "Cursor",       angle: 270, tone: "var(--sg-budget)" },
    ],
  },
  {
    radius: 250,
    label: "BUSINESS AI",
    providers: [
      { name: "M365 Copilot", angle: 0,   tone: "#6366F1" },
      { name: "(more soon)",  angle: 180, tone: "var(--sg-text-mute)" },
    ],
  },
];

export function ProviderConstellation() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto aspect-square">
      <div className="absolute inset-0 sg-lens-aura" />
      <svg viewBox="-320 -320 640 640" className="absolute inset-0 w-full h-full" aria-hidden>
        {/* Orbit rings */}
        {RINGS.map(r => (
          <circle
            key={r.radius}
            r={r.radius}
            fill="none"
            stroke="var(--sg-line)"
            strokeWidth="0.6"
            strokeDasharray={r.radius === 250 ? "1 4" : "2 6"}
          />
        ))}
        {/* Center cross */}
        <line x1="-320" y1="0" x2="320" y2="0" stroke="var(--sg-line)" strokeWidth="0.4" />
        <line x1="0" y1="-320" x2="0" y2="320" stroke="var(--sg-line)" strokeWidth="0.4" />

        {/* Center lens */}
        <g>
          <circle r="42" fill="var(--sg-bg)" stroke="var(--sg-ink)" strokeWidth="1.2" />
          <circle r="26" fill="none" stroke="var(--sg-signal)" strokeWidth="0.8" />
          <circle r="10" fill="var(--sg-ink)" />
          <circle r="4"  fill="var(--sg-signal)" />
        </g>
      </svg>

      {/* Ring labels */}
      {RINGS.map(r => (
        <span
          key={r.label}
          className="absolute left-1/2 sg-caption text-[var(--sg-text-mute)] -translate-x-1/2"
          style={{ top: `calc(50% - ${r.radius / 2}px - 12px)` }}
        >
          — {r.label} —
        </span>
      ))}

      {/* Provider nodes */}
      {RINGS.flatMap(r =>
        r.providers.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const x = Math.cos(rad) * r.radius;
          const y = Math.sin(rad) * r.radius;
          return (
            <div
              key={`${r.label}-${p.name}`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(calc(-50% + ${x / 2}px), calc(-50% + ${y / 2}px))` }}
            >
              <div className="border sg-line bg-[var(--sg-panel)] px-2.5 py-1 flex items-center gap-1.5 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.tone }} />
                <span className="sg-caption text-[var(--sg-text)]">{p.name}</span>
              </div>
            </div>
          );
        })
      )}

      {/* Bottom anchor caption */}
      <div className="absolute -bottom-10 left-0 right-0 text-center sg-caption text-[var(--sg-text-mute)]">
        TOKENLENS · OPERATING CORE
      </div>
    </div>
  );
}
