"use client";

import { useState } from "react";

/**
 * A closed product loop. On wide screens the steps sit on a ring and the centre
 * explains whichever step is hovered or focused; on phones the ring would be too
 * small to read, so it becomes a numbered list with every description visible.
 */
export function LoopDiagram({
  steps, tone = "light", label,
}: { steps: readonly (readonly [string, string])[]; tone?: "light" | "dark"; label: string }) {
  const [active, setActive] = useState(0);
  const dark = tone === "dark";
  const n = steps.length;
  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { left: `${50 + Math.cos(a) * 41}%`, top: `${50 + Math.sin(a) * 41}%` };
  };

  return (
    <figure aria-label={label}>
      {/* Phones: linear, fully disclosed. */}
      <ol className="grid gap-0 md:hidden">
        {steps.map(([title, body], i) => (
          <li key={title} className="relative flex gap-4 pb-5 last:pb-0">
            <span aria-hidden className={`absolute top-6 left-[13px] h-[calc(100%-1.5rem)] w-px ${dark ? "bg-white/15" : "bg-line-strong"}`} />
            <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] ${dark ? "border-white/25 text-panel/80" : "border-line-strong text-muted"}`}>{i + 1}</span>
            <div>
              <p className={`text-sm font-medium ${dark ? "text-panel" : "text-ink"}`}>{title}</p>
              <p className={`mt-1 text-sm leading-6 ${dark ? "text-panel/65" : "text-muted"}`}>{body}</p>
            </div>
          </li>
        ))}
        <li className={`pl-11 text-xs ${dark ? "text-panel/65" : "text-subtle"}`}>↺ back to step 1</li>
      </ol>

      {/* Wide screens: the loop as a loop. */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[28rem] md:block">
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50" cy="50" r="41" fill="none" strokeWidth="0.35" className={dark ? "stroke-white/20" : "stroke-line-strong"} />
          <circle
            cx="50" cy="50" r="41" fill="none" strokeWidth="0.7" strokeLinecap="round"
            className={`transition-[stroke-dasharray] duration-500 ${dark ? "stroke-accent-soft" : "stroke-accent"}`}
            strokeDasharray={`${((active + 1) / n) * 257.6} 257.6`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <ol>
          {steps.map(([title], i) => {
            const on = i === active;
            return (
              <li key={title} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(i)}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`Step ${i + 1}: ${title}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors duration-200 ${
                    dark
                      ? on ? "border-accent-soft bg-accent-soft text-ink" : "border-white/20 bg-ink text-panel/75 hover:border-white/50"
                      : on ? "border-accent bg-accent text-panel" : "border-line-strong bg-panel text-muted hover:border-ink"
                  }`}
                >
                  <span aria-hidden className="font-mono opacity-70">{i + 1}</span>{title}
                </button>
              </li>
            );
          })}
        </ol>
        <div aria-live="polite" className="absolute inset-[24%] flex flex-col items-center justify-center text-center">
          <p className={`font-mono text-[10px] tracking-[0.16em] uppercase ${dark ? "text-accent-soft/70" : "text-subtle"}`}>Step {active + 1} of {n}</p>
          <p key={active} className={`fade-up mt-2 font-serif text-2xl leading-tight ${dark ? "text-panel" : "text-ink"}`}>{steps[active][0]}</p>
          <p key={`b${active}`} className={`fade-up mt-2 text-sm leading-6 ${dark ? "text-panel/70" : "text-muted"}`}>{steps[active][1]}</p>
        </div>
      </div>
    </figure>
  );
}
