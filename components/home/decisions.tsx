"use client";

import { useEffect } from "react";
import { EvidenceMark, Eyebrow } from "@/components/ui";
import { decisions, type Decision } from "@/content/portfolio";

/**
 * Smaller product decisions under the case studies: an editorial list, not
 * more cards. Each row shows the call and its result; opening it shows the
 * signal, the decision and the trade-off. The first row starts open so a
 * skimming reader sees what the depth looks like.
 */
export function Decisions() {
  // Deep links (/#decision-…) from the map and Thinking open the row they point at.
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith("decision-")) return;
      const el = document.getElementById(id)?.querySelector("details");
      if (el) el.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <section id="decisions" aria-labelledby="decisions-title" className="mt-20 scroll-mt-24">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow>Decision log</Eyebrow>
          <h3 id="decisions-title" className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-[2.4rem]">Six more decisions, in brief.</h3>
        </div>
        <p className="max-w-xl text-base leading-7 text-muted">
          Smaller than a case study, same shape: the signal, the call, what it cost, and what happened. Across Edfora, Witzeal, Baazi Games and, before product management, Direct Create.
        </p>
      </div>

      <ol className="mt-10 border-t border-ink">
        {decisions.map((d, i) => (
          <li key={d.id} id={`decision-${d.id}`} className="scroll-mt-24 border-b border-line">
            <DecisionRow d={d} defaultOpen={i === 0} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function DecisionRow({ d, defaultOpen }: { d: Decision; defaultOpen: boolean }) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="grid cursor-pointer list-none gap-x-10 gap-y-4 py-7 md:grid-cols-[10rem_minmax(0,1fr)_15rem] [&::-webkit-details-marker]:hidden">
        <span className="block text-xs leading-5">
          <span className="block text-ink">{d.company}</span>
          <span className="block text-muted">{d.area}</span>
        </span>
        <span className="block">
          <h4 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-[1.7rem]">{d.title}</h4>
          <span className="mt-2 block text-sm text-muted">
            <span className="font-mono text-[11px] tracking-wide text-subtle uppercase">Tension</span> <span className="ml-1">{d.tension}</span>
          </span>
        </span>
        <span className="flex items-start justify-between gap-4">
          <span className="grid gap-3">
            {d.result ? <span className="block text-xs leading-5 text-muted">{d.result}</span> : null}
            {d.outcomes.map((o) => (
              <span key={o.label} className="block">
                <span className="flex items-center gap-2 text-xl font-semibold tracking-tight text-ink tabular-nums"><EvidenceMark kind="verified" />{o.value}</span>
                <span className="mt-0.5 block pl-[18px] text-xs leading-5 text-muted">{o.label}</span>
              </span>
            ))}
          </span>
          <span aria-hidden className="mt-1 text-lg text-muted transition-transform duration-200 group-open:rotate-45">+</span>
        </span>
      </summary>

      <div className="grid gap-8 pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-10">
        <p className="hidden text-[11px] leading-5 text-subtle md:block">{d.role}</p>
        <div className="grid gap-8">
          <dl className="grid gap-8 lg:grid-cols-[1fr_1.35fr_1fr] lg:gap-10">
            <Block term="Signal">
              <p>{d.signal}</p>
            </Block>
            <Block term="Decision">
              {d.decision.map((p) => <p key={p}>{p}</p>)}
            </Block>
            <Block term="Trade-off" reasoning>
              <p>{d.tradeoff}</p>
            </Block>
          </dl>
          {d.loop ? <SignalLoop loop={d.loop} /> : null}
          {d.note ? <p className="border-t border-line pt-4 text-xs leading-5 text-muted">{d.note}</p> : null}
        </div>
      </div>
    </details>
  );
}

function Block({ term, reasoning, children }: { term: string; reasoning?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
        {term}
        {reasoning ? <span className="flex items-center gap-1.5 font-sans text-[11px] tracking-normal text-muted normal-case"><EvidenceMark kind="reasoning" />Product reasoning</span> : null}
      </dt>
      <dd className="mt-3 grid gap-3 text-sm leading-7 text-ink/85">{children}</dd>
    </div>
  );
}

/** Signal → decision → action, as a teacher-facing alert would travel it. */
function SignalLoop({ loop }: { loop: NonNullable<Decision["loop"]> }) {
  return (
    <figure aria-label="How an alert travels: signal, decision, action" className="rounded-xl border border-line bg-panel p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">myAdvisor: signal → decision → action</p>
        <span className="flex items-center gap-2 text-xs text-muted"><EvidenceMark kind="reasoning" />From product documentation</span>
      </div>
      <ol className="mt-5 grid gap-3 md:grid-cols-3 md:gap-0">
        {loop.map((s, i) => (
          <li key={s.stage} className="relative flex gap-4 md:block md:pr-8">
            <span aria-hidden className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full md:mt-0 md:block ${i === loop.length - 1 ? "bg-accent ring-4 ring-accent-soft" : "border border-line-strong bg-background"}`} />
            {i < loop.length - 1 ? <span aria-hidden className="absolute top-[4px] right-4 left-5 hidden h-px bg-line-strong md:block" /> : null}
            <span className="block md:mt-3">
              <span className="block font-mono text-[11px] tracking-[0.14em] text-ink uppercase">{s.stage}</span>
              <span className="mt-1 block text-sm leading-6 text-muted">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">
        Timing is part of the design: alerts respect a teacher’s schedule, and unread alerts have their own handling. What triggers an alert is not described here.
      </figcaption>
    </figure>
  );
}
