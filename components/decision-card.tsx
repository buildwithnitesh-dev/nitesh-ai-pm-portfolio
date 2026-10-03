import Link from "next/link";
import type { Decision, Verdict } from "@/content/portfolio";
import { Delta } from "./delta";
import { StageMarker, kindOf } from "./trace";
import { Mono } from "./ui";

const verdictTone: Record<Verdict, string> = {
  Shipped: "border-accent/40 text-accent",
  Sunset: "border-ink/30 text-ink",
  Program: "border-line-strong text-muted",
  System: "border-line-strong text-muted",
  Pilot: "border-accent/40 text-accent",
};

export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-medium text-[13px] ${verdictTone[verdict]}`}>{verdict}</span>;
}

/**
 * One grammar for every decision, kept short: code and verdict, the call in one
 * line, the signal and the decision, then the outcome or learning. Trade-offs
 * and the rest of the reasoning open on request.
 */
export function DecisionCard({ d, variant = "full", headingLevel = "h3" }: { d: Decision; variant?: "full" | "compact"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const compact = variant === "compact";
  const decision = d.stages.find((s) => s.term === "Decision");
  // A snapshot: the signal (or what stands in for it) and the decision lead; the rest of the reasoning sits behind a disclosure.
  const signal = d.stages.find((s) => s.term === "Signal") ?? d.stages[0];
  const lead = d.stages.filter((s) => s === signal || s === decision);
  const rest = d.stages.filter((s) => !lead.includes(s));
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
        <dl className="mt-5 grid gap-3">
          {lead.map((s) => <Step key={s.term} term={s.term} text={s.text} />)}
        </dl>
      )}

      {!compact && (rest.length || d.details) ? (
        <details className="group/more mt-4">
          <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1.5 text-[13px] font-medium text-muted underline decoration-dotted decoration-line-strong underline-offset-4 hover:text-ink [&::-webkit-details-marker]:hidden">
            More on this call<span className="sr-only">: {d.title}</span>
            <span aria-hidden className="transition-transform group-open/more:rotate-45">+</span>
          </summary>
          {rest.length ? <dl className="mt-4 grid gap-3">{rest.map((s) => <Step key={s.term} term={s.term} text={s.text} />)}</dl> : null}
          {d.details ? (
            <dl className="mt-5 grid gap-6 border-t border-line pt-4 sm:grid-cols-2">
              {d.details.map((x) => (
                <div key={x.term}>
                  <dt><Mono className="text-accent">{x.term}</Mono></dt>
                  <dd className="mt-2"><ul className="grid gap-1 text-sm leading-6 text-ink/85">{x.items.map((i) => <li key={i}>{i}</li>)}</ul></dd>
                </div>
              ))}
            </dl>
          ) : null}
        </details>
      ) : null}

      <div className={`border-t border-line ${compact ? "mt-auto pt-5" : "mt-6 pt-5"}`}>
        {d.delta ? <Delta id={d.delta} size="sm" showContext={false} explain={!compact} /> : null}
        {d.results ? (
          <ul className={`grid gap-1 text-sm leading-6 text-ink ${d.delta ? "mt-3" : ""}`}>
            {(compact ? d.results.slice(0, d.delta ? 1 : 2) : d.results).map((r) => (
              <li key={r.text} className="flex gap-2">
                <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 bg-ink" />
                <span>{r.text}{r.basis ? <span className="text-muted"> · {r.basis}</span> : null}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {d.learning && (!compact || !d.delta) ? (
        <p className={`font-serif leading-snug text-ink ${compact ? "mt-4 text-lg" : "mt-6 border-l-2 border-accent pl-4 text-xl"}`}>&ldquo;{d.learning}&rdquo;</p>
      ) : null}
      {d.note && !compact ? <p className="mt-4 text-[13px] leading-5 text-muted">{d.note}</p> : null}
      {d.caseHref && !compact ? <p className="mt-5"><Link href={d.caseHref} className="group inline-flex min-h-6 items-center gap-2 text-[15px] font-medium text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent">Read the full case<span className="sr-only">: {d.title}</span> <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></Link></p> : null}
    </article>
  );
}

function Step({ term, text }: { term: string; text: string }) {
  const kind = kindOf(term);
  return (
    <div className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <dt className="flex items-center gap-2.5"><StageMarker kind={kind} /><Mono className={kind === "decision" ? "text-accent" : "text-ink"}>{term}</Mono></dt>
      <dd className={`text-[15px] leading-7 ${term === "Decision" ? "font-medium text-ink" : "text-ink/85"}`}>{text}</dd>
    </div>
  );
}
