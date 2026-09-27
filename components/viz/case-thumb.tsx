import type { CaseSlug } from "@/content/portfolio";

/**
 * Each case is previewed by its core mechanism, not a stock image:
 * a branching decision, a real before/after, a feedback loop.
 * Hovering the parent `group` card brings the mechanism forward.
 */
export function CaseThumb({ slug }: { slug: CaseSlug }) {
  return (
    <div aria-hidden className="relative aspect-[2/1] w-full sm:aspect-[4/3] overflow-hidden rounded-lg border border-line bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      {slug === "adaptive-assignment-engine" ? <Branching /> : slug === "onboarding-funnel-redesign" ? <Bars /> : <Loop />}
    </div>
  );
}

const muted = "stroke-line-strong transition-colors duration-300";
const hot = "stroke-line-strong transition-colors duration-300 group-hover:stroke-accent group-focus-within:stroke-accent";

function Branching() {
  return (
    <svg viewBox="0 0 240 180" className="absolute inset-0 h-full w-full" fill="none" strokeWidth="2" strokeLinecap="round">
      <path d="M36 90 H86" className={hot} />
      <path d="M86 90 C 116 90, 116 46, 146 46 H 196" className={muted} />
      <path d="M86 90 H 196" className={hot} />
      <path d="M86 90 C 116 90, 116 134, 146 134 H 196" className={muted} />
      <circle cx="36" cy="90" r="7" className="fill-panel stroke-ink" />
      <circle cx="86" cy="90" r="9" className="fill-accent stroke-accent" />
      {[46, 90, 134].map((y) => (
        <rect key={y} x="186" y={y - 9} width="18" height="18" rx="4" className={`fill-panel ${y === 90 ? hot : muted}`} />
      ))}
      <text x="36" y="118" textAnchor="middle" className="fill-subtle font-mono text-[9px]">signal</text>
      <text x="86" y="118" textAnchor="middle" className="fill-subtle font-mono text-[9px]">decide</text>
      <text x="195" y="160" textAnchor="middle" className="fill-subtle font-mono text-[9px]">next task</text>
    </svg>
  );
}

function Bars() {
  // Real values: 12% → 25% Day-7 retention, 0–30% scale.
  const base = 150;
  const h = (v: number) => (v / 30) * 110;
  return (
    <svg viewBox="0 0 240 180" className="absolute inset-0 h-full w-full">
      <path d={column(70, base, h(12))} className="fill-data-before" />
      <path d={column(134, base, h(25))} className="fill-data-after/70 transition-colors duration-300 group-hover:fill-data-after group-focus-within:fill-data-after" />
      <text x="88" y={base - h(12) - 8} textAnchor="middle" className="fill-ink text-[11px] font-semibold">12%</text>
      <text x="152" y={base - h(25) - 8} textAnchor="middle" className="fill-ink text-[11px] font-semibold">25%</text>
      <line x1="40" x2="200" y1={base} y2={base} className="stroke-line-strong" strokeWidth="1" />
      <text x="88" y={base + 16} textAnchor="middle" className="fill-subtle font-mono text-[9px]">before</text>
      <text x="152" y={base + 16} textAnchor="middle" className="fill-subtle font-mono text-[9px]">after</text>
    </svg>
  );
}

/** Column with a 4px rounded data-end and a square base on the axis. */
function column(x: number, base: number, height: number, w = 36, r = 4) {
  const top = base - height;
  return `M${x} ${base} V${top + r} Q${x} ${top} ${x + r} ${top} H${x + w - r} Q${x + w} ${top} ${x + w} ${top + r} V${base} Z`;
}

function Loop() {
  const n = 7;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [120 + Math.cos(a) * 58, 90 + Math.sin(a) * 58];
  });
  return (
    <svg viewBox="0 0 240 180" className="absolute inset-0 h-full w-full" fill="none">
      <circle cx="120" cy="90" r="58" strokeWidth="2" className={hot} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 7 : 5} strokeWidth="2" className={i === 0 ? "fill-accent stroke-accent" : "fill-panel stroke-ink"} />
      ))}
      <text x="120" y="88" textAnchor="middle" className="fill-ink font-serif text-[15px]">diagnose</text>
      <text x="120" y="102" textAnchor="middle" className="fill-subtle font-mono text-[9px]">7-step loop</text>
    </svg>
  );
}
