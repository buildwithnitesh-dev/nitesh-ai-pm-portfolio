import Link from "next/link";
import { deltas, type DeltaId } from "@/content/portfolio";

/**
 * Delta: a number as evidence. Before → after, drawn on the metric's own axis
 * as a shift line (an open circle for before, an oxblood square for after), with
 * how it was measured and any attribution caveat. The only motion on the site:
 * the segment between the two grows into place as it scrolls into view.
 */
export function Delta({
  id, size = "md", showContext = true, link = false, explain = false, layout = "stack", caption,
}: { id: DeltaId; size?: "lg" | "md" | "sm"; showContext?: boolean; link?: boolean | string; explain?: boolean; layout?: "stack" | "row"; caption?: string }) {
  const d = deltas[id];
  const hasAxis = d.from !== undefined && d.to !== undefined && d.max;
  const value = size === "lg" ? "text-[2.6rem] sm:text-6xl" : size === "md" ? "text-4xl sm:text-[2.75rem]" : "text-3xl";
  const summary = `${d.label}: ${d.before ? `${d.before} to ` : ""}${d.after}. ${caption ?? d.method}.${d.note ? ` ${d.note}.` : ""}`;
  // The <details> holds interactive content, so the figure can't be one opaque label when it is present.
  const label = explain ? undefined : summary;

  const row = layout === "row";
  return (
    <figure aria-label={label} className={`min-w-0 ${row ? "grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-end" : ""}`}>
      {explain ? <p className="sr-only">{summary}</p> : null}
      <div className="min-w-0">
        <p aria-hidden className="text-[13px] font-medium text-muted">{d.label}</p>
        <p aria-hidden className={`mt-1.5 flex flex-wrap items-baseline gap-x-3 font-bold tracking-[-0.03em] whitespace-nowrap proportional-nums ${value}`}>
          {d.before ? <span className="text-subtle">{d.before}</span> : null}
          {d.before ? <span aria-hidden className="font-normal text-subtle">→</span> : null}
          <span className="text-ink">{d.after}</span>
        </p>
        {hasAxis ? <Shift from={d.from!} to={d.to!} max={d.max!} /> : null}
      </div>
      <div className="min-w-0">
        <p aria-hidden className={`${row ? "" : "mt-3 "}text-[13px] leading-5 text-muted`}>{caption ?? d.method}</p>
        {showContext ? <p aria-hidden className="text-[13px] leading-5 text-muted">{d.context}</p> : null}
        {d.note ? (
          <p aria-hidden className="mt-2 inline-flex items-start gap-2 text-[13px] leading-5 text-accent">
            <span className="mt-[4px] inline-block h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-current" />
            {d.note}
          </p>
        ) : null}
        {explain ? (
          <details className="group/x mt-3 text-[13px] leading-5 text-muted">
            <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1.5 underline decoration-dotted underline-offset-4 decoration-line-strong hover:text-ink">
              How it was measured<span className="sr-only">: {d.label}</span>
              <span aria-hidden className="transition-transform group-open/x:rotate-45">+</span>
            </summary>
            <div className="mt-2 grid max-w-md gap-1.5">
              <p>{d.definition}</p>
              {d.detail ? <p>{d.detail}</p> : null}
            </div>
          </details>
        ) : null}
        {link ? (
          <p className="mt-2"><Link href={typeof link === "string" ? link : d.href} className="inline-flex min-h-6 items-center text-[13px] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">The story behind it<span className="sr-only">: {d.label}</span>&nbsp;→</Link></p>
        ) : null}
      </div>
    </figure>
  );
}

/** One axis: before as an open circle, after as an oxblood square, the change as the segment between. */
function Shift({ from, to, max }: { from: number; to: number; max: number }) {
  const a = (from / max) * 100;
  const b = (to / max) * 100;
  return (
    <div aria-hidden className="relative mt-5 h-3 max-w-sm">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
      <span className="grow-x absolute top-1/2 h-[3px] -translate-y-1/2 bg-accent" style={{ left: `${a}%`, width: `${b - a}%` }} />
      <span className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-ink bg-background" style={{ left: `${a}%` }} />
      <span className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 bg-accent" style={{ left: `${b}%` }} />
    </div>
  );
}
