import { deltas, type DeltaId } from "@/content/portfolio";

/**
 * Delta: the site's signature unit. Before → after, drawn to scale on the
 * metric's own axis, with how it was measured and any attribution caveat.
 * The only motion on the site lives here (see .delta-after in globals.css):
 * the "after" bar grows from the "before" value to the "after" value.
 */
export function Delta({
  id, size = "md", tone = "light", showContext = true, link = false, layout = "stack",
}: { id: DeltaId; size?: "lg" | "md" | "sm"; tone?: "light" | "dark"; showContext?: boolean; link?: boolean; layout?: "stack" | "row" }) {
  const d = deltas[id];
  const dark = tone === "dark";
  const hasBars = d.from !== undefined && d.to !== undefined && d.max;
  const value = size === "lg" ? "text-[2.6rem] sm:text-6xl" : size === "md" ? "text-4xl sm:text-[2.75rem]" : "text-3xl";
  const summary = `${d.label}: ${d.before ? `${d.before} to ` : ""}${d.after}. ${d.method}.${d.note ? ` ${d.note}.` : ""}`;

  const row = layout === "row";
  return (
    <figure aria-label={summary} className={`min-w-0 ${row ? "grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-end" : ""}`}>
      <div className="min-w-0">
      <p aria-hidden className={`font-mono text-[11px] tracking-[0.14em] uppercase ${dark ? "text-accent-soft/80" : "text-accent"}`}>{d.label}</p>
      <p aria-hidden className={`mt-2 flex flex-wrap items-baseline gap-x-3 font-sans font-semibold tracking-tight whitespace-nowrap tabular-nums ${value}`}>
        {d.before && !d.indexed ? <span className={dark ? "text-panel/45" : "text-subtle"}>{d.before}</span> : null}
        {d.before && !d.indexed ? <span aria-hidden className={`font-normal ${dark ? "text-panel/45" : "text-subtle"}`}>→</span> : null}
        <span className={dark ? "text-panel" : "text-ink"}>{d.after}</span>
      </p>
      {hasBars ? <Bars from={d.from!} to={d.to!} max={d.max!} dark={dark} indexed={d.indexed} /> : null}
      </div>
      <div className="min-w-0">
      <p aria-hidden className={`${row ? "" : "mt-3 "}font-mono text-[11px] leading-5 tracking-[0.04em] ${dark ? "text-panel/60" : "text-muted"}`}>{d.method}</p>
      {showContext ? <p aria-hidden className={`font-mono text-[11px] leading-5 tracking-[0.04em] ${dark ? "text-panel/60" : "text-muted"}`}>{d.context}</p> : null}
      {d.note ? (
        <p aria-hidden className={`mt-2 inline-flex items-start gap-2 text-xs leading-5 ${dark ? "text-accent-soft" : "text-accent"}`}>
          <span className="mt-[3px] inline-block h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-current" />
          {d.note}
        </p>
      ) : null}
      {link ? (
        <p className="mt-3"><a href={d.href} className={`text-xs underline underline-offset-4 ${dark ? "text-panel/80 decoration-white/30 hover:decoration-accent-soft" : "text-ink decoration-line-strong hover:decoration-accent"}`}>The story behind it<span className="sr-only">: {d.label}</span> →</a></p>
      ) : null}
      </div>
    </figure>
  );
}

/** Before and after on one axis. The "after" bar starts at the "before" length and grows to its own. */
function Bars({ from, to, max, dark, indexed }: { from: number; to: number; max: number; dark: boolean; indexed?: boolean }) {
  const track = dark ? "bg-white/10" : "bg-data-track";
  const beforeTone = dark ? "bg-white/35" : "bg-data-before";
  const afterTone = dark ? "bg-accent-soft" : "bg-data-after";
  return (
    <div aria-hidden className="mt-4 grid max-w-sm gap-1.5">
      <span className={`block h-1.5 overflow-hidden rounded-full ${track}`}>
        <span className={`block h-full rounded-full ${beforeTone}`} style={{ width: `${(from / max) * 100}%` }} />
      </span>
      <span className={`block h-1.5 overflow-hidden rounded-full ${track}`}>
        <span
          className={`delta-after block h-full rounded-full ${afterTone}`}
          style={{ width: `${(to / max) * 100}%`, ["--delta-from" as string]: `${from / to}` }}
        />
      </span>
      {indexed ? <span className={`font-mono text-[10px] ${dark ? "text-panel/50" : "text-subtle"}`}>Indexed: before = 100</span> : null}
    </div>
  );
}
