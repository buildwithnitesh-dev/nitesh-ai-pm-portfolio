import { changeOf, deltas, type DeltaId } from "@/content/portfolio";

/**
 * Evidence figure for a case: one hero result drawn as a shift line (open circle
 * for the comparison base, solid square for the result), with its experiment
 * context, its caveats and a one-line implication; then an optional secondary
 * result at smaller size. A change is drawn only when the comparison is valid.
 */
export function EvidenceFigure({ primary, secondary }: { primary: DeltaId; secondary?: DeltaId }) {
  const d = deltas[primary];
  const change = changeOf(d);
  const s = secondary ? deltas[secondary] : null;
  return (
    <figure className="grid gap-7">
      <div>
        <p className="text-[13px] font-semibold text-ink">{d.label}</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-3">
          <p className="flex items-end gap-x-3 font-bold tracking-[-0.03em] proportional-nums">
            <span className="grid">
              <span className="text-[2.4rem] leading-none text-subtle sm:text-5xl">{d.before}</span>
              {d.fromLabel ? <span className="mt-1.5 text-[13px] font-medium tracking-normal text-muted">{d.fromLabel}</span> : null}
            </span>
            <span aria-hidden className="pb-6 text-2xl font-normal text-subtle">→</span>
            <span className="grid">
              <span className="text-[2.4rem] leading-none text-ink sm:text-5xl">{d.after}</span>
              {d.toLabel ? <span className="mt-1.5 text-[13px] font-medium tracking-normal text-accent">{d.toLabel}</span> : null}
            </span>
          </p>
          {change ? (
            <p className="mb-6 border-l-2 border-accent pl-3 text-[15px] leading-tight font-semibold text-accent">
              {change.value} percentage points
            </p>
          ) : null}
        </div>
        {d.from !== undefined && d.to !== undefined && d.max ? <Shift from={d.from} to={d.to} max={d.max} /> : null}
        {d.contextItems ? <p className="mt-4 text-[13px] font-medium text-ink">{d.contextItems.join(" · ")}</p> : null}
        {d.businessImplication ? <figcaption className="mt-4 max-w-2xl text-[17px] leading-7 text-ink">{d.businessImplication}</figcaption> : null}
        {d.caveats ? (
          <ul className="mt-3 grid gap-1 text-[13px] leading-5 text-muted">
            {d.caveats.map((c) => <li key={c} className="flex gap-2"><span aria-hidden className="mt-[5px] inline-block h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-current" />{c}</li>)}
          </ul>
        ) : null}
        <details className="group/x mt-3 text-[13px] leading-5 text-muted">
          <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1.5 underline decoration-dotted decoration-line-strong underline-offset-4 hover:text-ink">
            How it was measured<span className="sr-only">: {d.label}</span>
            <span aria-hidden className="transition-transform group-open/x:rotate-45">+</span>
          </summary>
          <div className="mt-2 grid max-w-xl gap-1.5">
            <p>{d.method}</p>
            <p>{d.definition}</p>
            {d.detail ? <p>{d.detail}</p> : null}
          </div>
        </details>
      </div>

      {s ? (
        <div className="border-t border-line pt-5">
          <p className="text-[13px] font-semibold text-muted">{s.label} <span className="font-normal">· supporting</span></p>
          <p className="mt-1.5 text-2xl font-bold tracking-[-0.03em] proportional-nums">
            <span className="text-subtle">{s.before}</span> <span aria-hidden className="font-normal text-subtle">→</span><span className="sr-only">to</span> <span className="text-ink">{s.after}</span>
            {changeOf(s) ? <span className="ml-3 text-[15px] font-semibold text-accent">{changeOf(s)!.value} percentage points</span> : null}
          </p>
          {s.comparisonValid === false ? <p className="mt-1 text-[13px] font-medium text-accent">Comparison basis not recorded.</p> : null}
          {s.caveats ? <p className="mt-1 text-[13px] leading-5 text-muted">{s.caveats.join(" ")}</p> : null}
        </div>
      ) : null}
    </figure>
  );
}

/** Open circle (base) → oxblood segment → solid square (result). */
function Shift({ from, to, max }: { from: number; to: number; max: number }) {
  const a = (from / max) * 100;
  const b = (to / max) * 100;
  return (
    <div aria-hidden className="relative mt-3 h-4 max-w-xl">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
      <span className="grow-x absolute top-1/2 h-[3px] -translate-y-1/2 bg-accent" style={{ left: `${a}%`, width: `${b - a}%` }} />
      <span className="absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-ink bg-background" style={{ left: `${a}%` }} />
      <span className="absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 bg-accent" style={{ left: `${b}%` }} />
    </div>
  );
}
