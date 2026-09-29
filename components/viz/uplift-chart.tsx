"use client";

import { useRef, useState } from "react";
import { metricAreas, metrics, type Metric, type MetricArea } from "@/content/portfolio";
import { growClass, useInView } from "@/components/hooks";

const MAX = 30;
const ticks = [0, 10, 20, 30];
const pct = (v: number) => `${(v / MAX) * 100}%`;

/**
 * Reported improvements on one shared % axis.
 * Ranges are drawn as ranges and single approximations as points: the chart
 * never shows more precision than the source claims.
 */
export function UpliftChart() {
  const [area, setArea] = useState<MetricArea | "All">("All");
  const [focus, setFocus] = useState<string>("dau");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);

  const inArea = (m: Metric) => area === "All" || m.areas.includes(area);
  const charted = metrics.filter((m) => m.chart && inArea(m));
  const listed = metrics.filter(inArea);
  const selected = charted.find((m) => m.id === focus) ?? charted[0];

  return (
    <div ref={ref}>
      {/* One filter row scopes both the chart and the table beneath it. */}
      <div role="group" aria-label="Filter outcomes by area" className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs text-muted">Hiring for</span>
        {(["All", ...metricAreas] as const).map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={area === a}
            onClick={() => setArea(a)}
            className="h-8 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-panel"
          >
            {a === "All" ? "All outcomes" : a}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_17rem]">
        <figure>
          <figcaption className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink">Reported improvement, %</span>
            <span className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-2"><span aria-hidden className="h-2 w-6 rounded-full bg-data-after" />Reported range</span>
              <span className="flex items-center gap-2"><span aria-hidden className="h-3 w-3 rounded-full bg-data-after ring-2 ring-panel" />Approximate value</span>
            </span>
          </figcaption>

          <ul className="mt-5 grid gap-1" aria-label="Improvement by outcome. Select a row for context.">
            {charted.map((m, i) => {
              const c = m.chart!;
              const isPoint = c.low === c.high;
              const on = selected?.id === m.id;
              return (
                <li key={m.id} className="fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setFocus(m.id)}
                    onFocus={() => setFocus(m.id)}
                    onClick={() => setFocus(m.id)}
                    className={`grid w-full items-center gap-x-4 gap-y-2 rounded-md px-2 py-3 text-left transition-colors sm:grid-cols-[11rem_1fr] ${on ? "bg-accent-soft/70" : "hover:bg-panel"}`}
                  >
                    <span className="text-sm text-ink">{m.label}</span>
                    <span className="relative mr-16 block h-5">
                      <span aria-hidden className="absolute inset-0">
                        {ticks.map((t) => <span key={t} className="absolute inset-y-[-8px] w-px bg-line" style={{ left: pct(t) }} />)}
                      </span>
                      {isPoint ? (
                        <span
                          className={`data-mark absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-data-after ring-2 ${on ? "ring-accent-soft" : "ring-panel"}`}
                          style={{ left: pct(c.low) }}
                        />
                      ) : (
                        <span className="absolute inset-y-0 flex items-center" style={{ left: pct(c.low), width: `${((c.high - c.low) / MAX) * 100}%` }}>
                          <span className={`data-mark block h-2 w-full rounded-full bg-data-after ${growClass(inView)}`} style={{ animationDelay: `${i * 90}ms` }} />
                        </span>
                      )}
                      <span className="absolute top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap text-xs font-semibold text-ink" style={{ left: pct(c.high) }}>
                        {c.direction === "down" ? "↓ " : ""}{m.value}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-hidden className="mt-1 grid gap-x-4 px-2 sm:grid-cols-[11rem_1fr]">
            <span className="hidden sm:block" />
            <span className="relative mr-16 block h-4 font-mono text-[10px] tabular-nums text-subtle">
              {ticks.map((t, i) => (
                <span key={t} className={`absolute ${i === 0 ? "" : i === ticks.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: pct(t) }}>{t}%</span>
              ))}
            </span>
          </div>
          {charted.length === 0 ? (
            <p className="mt-4 rounded-md border border-dashed border-line-strong p-4 text-sm text-muted">
              No percentage uplift in this area. See the table below for how it was reported.
            </p>
          ) : null}
        </figure>

        {/* Details on demand: context for the selected row without cluttering the plot. */}
        <aside aria-live="polite" className="self-start border-t-2 border-ink pt-4 lg:sticky lg:top-24">
          {selected ? (
            <>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Selected outcome</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{selected.chart?.direction === "down" ? "↓ " : "+"}{selected.value}</p>
              <p className="mt-1 text-sm font-medium text-ink">{selected.label}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{selected.detail}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
                <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
                Documented · {selected.precision === "Range" ? "reported as a range" : "reported as an approximation"}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">Select an outcome to see its context.</p>
          )}
        </aside>
      </div>

      <p className="mt-6 max-w-2xl text-xs leading-5 text-muted">
        Assignment completion and Day-7 retention (changes in level, in percentage points), GMV growth (a weekly rate) and the 48% retention level use different units, so they sit in the table rather than on this axis.
      </p>

      {/* Table view: the accessible, complete twin of the chart. */}
      <details className="group mt-6 border-t border-line">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm text-ink [&::-webkit-details-marker]:hidden">
          <span>View all {listed.length} {area === "All" ? "" : `${area.toLowerCase()} `}outcomes as a table</span>
          <span aria-hidden className="text-muted transition-transform duration-200 group-open:rotate-45">+</span>
        </summary>
        <div tabIndex={0} role="region" aria-label="All outcomes, scrollable table" className="overflow-x-auto pb-2">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="text-xs tracking-[0.12em] text-muted uppercase">
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-4 font-medium">Outcome</th>
                <th scope="col" className="py-2 pr-4 font-medium">Result</th>
                <th scope="col" className="py-2 pr-4 font-medium">Precision</th>
                <th scope="col" className="py-2 font-medium">Context</th>
              </tr>
            </thead>
            <tbody>
              {listed.map((m) => (
                <tr key={m.id} className="border-b border-line/70 align-top">
                  <th scope="row" className="py-3 pr-4 font-normal text-ink">{m.label}</th>
                  <td className="py-3 pr-4 font-semibold whitespace-nowrap text-ink tabular-nums">{m.value}</td>
                  <td className="py-3 pr-4 text-muted">{m.precision}</td>
                  <td className="py-3 text-muted">{m.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
