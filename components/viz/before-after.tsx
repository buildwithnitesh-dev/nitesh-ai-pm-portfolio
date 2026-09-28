"use client";

import { useRef } from "react";
import { growClass, useInView } from "@/components/hooks";

/**
 * Before → after for a single metric: two bars on one shared 0-based axis,
 * one hue in two shades, values direct-labelled at the bar tip.
 */
export function BeforeAfter({
  before, after, max = 30, beforeLabel = "Before", afterLabel = "After", unit = "%", compact = false, caption,
}: {
  before: number; after: number; max?: number; beforeLabel?: string; afterLabel?: string; unit?: string; compact?: boolean; caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const ticks = [0, max / 3, (2 * max) / 3, max].map((t) => Math.round(t));
  const rows = [
    { label: beforeLabel, value: before, color: "bg-data-before" },
    { label: afterLabel, value: after, color: "bg-data-after" },
  ];
  const delta = after - before;
  const labelCol = compact ? "grid-cols-[3.5rem_1fr]" : "grid-cols-[5.5rem_1fr]";

  return (
    <figure ref={ref} className="w-full">
      <div
        className={`grid ${compact ? "gap-2" : "gap-4"}`}
        role="img"
        aria-label={`${caption ?? "Metric"}: ${before}${unit} ${beforeLabel.toLowerCase()}, ${after}${unit} ${afterLabel.toLowerCase()}.`}
      >
        {rows.map((r, i) => (
          <div key={r.label} className={`grid items-center gap-3 ${labelCol}`}>
            <span className="text-xs text-muted">{r.label}</span>
            {/* Right margin reserves room for the tip label so bars never shrink to fit text. */}
            <div className="relative mr-12">
              {!compact ? <Grid ticks={ticks} max={max} /> : null}
              <div
                className={`data-mark relative ${compact ? "h-3" : "h-5"} rounded-r-[4px] ${r.color} ${growClass(inView)}`}
                style={{ width: `${(r.value / max) * 100}%`, animationDelay: `${i * 180}ms` }}
              />
              <span
                className={`absolute top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap ${compact ? "text-xs" : "text-sm"} font-semibold text-ink`}
                style={{ left: `${(r.value / max) * 100}%` }}
              >
                {r.value}{unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      {!compact ? (
        <div className={`mt-2 grid gap-3 ${labelCol}`} aria-hidden>
          <span />
          <div className="relative mr-12 h-4 font-mono text-[10px] tabular-nums text-subtle">
            {ticks.map((t, i) => (
              <span
                key={t}
                className={`absolute ${i === 0 ? "" : i === ticks.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`}
                style={{ left: `${(t / max) * 100}%` }}
              >
                {t}{unit}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {caption ? (
        <figcaption className={`${compact ? "mt-3" : "mt-5"} flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-muted`}>
          <span className="font-semibold text-ink">+{delta} pts</span>
          <span className={compact ? "basis-full" : "basis-full sm:basis-auto sm:before:mr-3 sm:before:content-['·']"}>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function Grid({ ticks, max }: { ticks: number[]; max: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-y-2 inset-x-0">
      {ticks.map((t) => (
        <span key={t} className="absolute inset-y-0 w-px bg-line" style={{ left: `${(t / max) * 100}%` }} />
      ))}
    </div>
  );
}
