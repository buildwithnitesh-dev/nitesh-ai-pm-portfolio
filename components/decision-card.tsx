import type { Decision, Verdict } from "@/content/portfolio";
import { Delta } from "./delta";
import { Mono } from "./ui";

const verdictTone: Record<Verdict, string> = {
  Shipped: "border-accent/40 text-accent",
  Sunset: "border-ink/30 text-ink",
  Program: "border-line-strong text-muted",
  System: "border-line-strong text-muted",
  Pilot: "border-accent/40 text-accent",
};

export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${verdictTone[verdict]}`}>{verdict}</span>;
}

/**
 * One grammar for every decision: code and verdict, the call in one line, then
 * signal → decision → trade-off (or hypothesis → … for a sunset), the evidence,
 * and the learning where one is on record.
 */
export function DecisionCard({ d, variant = "full", headingLevel = "h3" }: { d: Decision; variant?: "full" | "compact"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const compact = variant === "compact";
  const decision = d.stages.find((s) => s.term === "Decision");
  return (
    <article id={compact ? undefined : d.id} className={`flex scroll-mt-24 flex-col ${compact ? "flex-1" : ""}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Mono className="text-subtle">{d.code}</Mono>
        <VerdictTag verdict={d.verdict} />
        <Mono className="text-muted">{d.product ? `${d.company} · ${d.product}` : d.company}</Mono>
      </div>
      <H className={`mt-4 font-serif leading-[1.12] text-ink ${compact ? "text-2xl" : "text-3xl"}`}>{d.title}</H>

      {compact ? (
        decision ? <p className="mt-3 text-sm leading-6 text-ink/85">{decision.text}</p> : null
      ) : (
        <dl className="mt-6 grid gap-4">
          {d.stages.map((s) => (
            <div key={s.term} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
              <dt><Mono className="text-accent">{s.term}</Mono></dt>
              <dd className="text-[15px] leading-7 text-ink/85">{s.text}</dd>
            </div>
          ))}
        </dl>
      )}

      {d.details && !compact ? (
        <dl className="mt-6 grid gap-6 border-t border-line pt-5 sm:grid-cols-2">
          {d.details.map((x) => (
            <div key={x.term}>
              <dt><Mono className="text-accent">{x.term}</Mono></dt>
              <dd className="mt-2"><ul className="grid gap-1 text-sm leading-6 text-ink/85">{x.items.map((i) => <li key={i}>{i}</li>)}</ul></dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className={`border-t border-line ${compact ? "mt-auto pt-5" : "mt-6 pt-5"}`}>
        {d.delta ? <Delta id={d.delta} size="sm" showContext={false} explain={!compact} /> : null}
        {d.results ? (
          <ul className={`grid gap-1 text-sm leading-6 text-ink ${d.delta ? "mt-3" : ""}`}>
            {(compact ? d.results.slice(0, d.delta ? 1 : 2) : d.results).map((r) => (
              <li key={r.text} className="flex gap-2">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{r.text}{r.basis ? <span className="text-muted"> · {r.basis}</span> : null}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {d.learning && (!compact || !d.delta) ? (
        <p className={`font-serif leading-snug text-ink ${compact ? "mt-4 text-lg" : "mt-6 border-l-2 border-accent pl-4 text-xl"}`}>&ldquo;{d.learning}&rdquo;</p>
      ) : null}
      {d.note && !compact ? <p className="mt-4 text-xs leading-5 text-muted">{d.note}</p> : null}
    </article>
  );
}
