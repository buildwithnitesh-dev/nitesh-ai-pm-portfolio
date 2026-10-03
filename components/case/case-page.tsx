import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { StageMarker, kindOf, type StepKind } from "@/components/trace";
import { EvidenceTag, Mono } from "@/components/ui";
import type { Case, Part } from "@/content/cases";
import { work } from "@/content/portfolio";
import { StageRail } from "./stage-rail";
import { StageVisual } from "./visuals";

const glanceSteps: readonly { key: keyof Case["glance"]; label: string; kind: StepKind }[] = [
  { key: "problem", label: "Problem", kind: "signal" },
  { key: "decision", label: "Decision", kind: "decision" },
  { key: "tradeoff", label: "Trade-off", kind: "tradeoff" },
  { key: "rollout", label: "Experiment / rollout", kind: "outcome" },
  { key: "outcome", label: "Outcome", kind: "outcome" },
];

/**
 * A selected-work case as a decision narrative. The header answers the
 * 20-second questions (what was the problem, what was decided, what changed);
 * the stages below are the depth, all on one spine:
 * Signal → Problem → Options → Trade-off → Decision → Experiment → Outcome → Learning.
 */
export function CasePage({ c }: { c: Case }) {
  const i = work.findIndex((w) => w.slug === c.slug);
  const prev = i > 0 ? work[i - 1] : null;
  const next = i < work.length - 1 ? work[i + 1] : null;
  const meta = [c.title, c.product && c.product !== c.title ? `${c.company} · ${c.product}` : c.company, c.domain, c.role].join(" · ");

  return (
    <main id="main" className="flex-1">
      <header className="border-b border-line">
        <Container className="pt-6 pb-10 lg:pt-8 lg:pb-12">
          <Link href="/work" className="group -ml-1 inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-[15px] font-medium text-ink hover:text-accent">
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span> Back to Work
          </Link>
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/work" className="inline-flex min-h-6 items-center underline decoration-line-strong underline-offset-4 hover:text-ink">Work</Link></li>
              <li aria-hidden className="text-line-strong">/</li>
              <li aria-current="page" className="text-ink">{c.title}</li>
            </ol>
          </nav>

          <p className="mt-6 text-[15px] font-semibold text-accent sm:text-base"><span className="tabular-nums text-subtle">{work[i].index}</span>&nbsp;&nbsp;{c.capability}</p>
          <h1 className="mt-3 max-w-5xl font-serif text-[2.05rem] leading-[1.06] sm:leading-[1.04] tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">{c.opening}</h1>
          <p className="mt-3 text-sm text-muted">{meta}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">{c.standfirst}</p>

          {/* The 20-second read: problem, decision, trade-off, rollout, outcome. */}
          <section aria-labelledby="glance-title" className="mt-8 border-t-2 border-ink pt-5">
            <h2 id="glance-title" className="text-[13px] font-medium text-muted">At a glance</h2>
            <ol className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {glanceSteps.map((s) => (
                <li key={s.key} className="relative pl-6 lg:pl-0">
                  <span className="absolute top-[3px] left-0 lg:static lg:block"><StageMarker kind={s.kind} /></span>
                  <p className={`text-[13px] font-medium lg:mt-3 ${s.kind === "decision" ? "text-accent" : "text-muted"}`}>{s.label}</p>
                  <p className={`mt-1 text-[15px] leading-6 ${s.key === "outcome" || s.key === "decision" ? "font-medium text-ink" : "text-ink/85"}`}>{c.glance[s.key]}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className={`mt-8 grid gap-6 border-y border-line py-6 ${c.headline.length > 1 ? "md:grid-cols-2 md:gap-10" : ""}`}>
            {c.headline.map((id) => <Delta key={id} id={id} size="md" layout={c.headline.length > 1 ? "stack" : "row"} />)}
          </div>
          <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.facts.map((f) => (
              <div key={f.term}>
                <dt><Mono className="text-muted">{f.term}</Mono></dt>
                <dd className="mt-0.5 text-sm leading-6 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 py-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16 lg:py-14">
        <aside><StageRail items={c.stages.map(({ id, label }) => ({ id, label }))} /></aside>
        <div className="grid min-w-0 max-w-3xl grid-cols-[minmax(0,1fr)] gap-12 lg:gap-14">
          {c.stages.map((s, n) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-2.5">
                <p className="inline-flex items-center gap-3 text-[15px] font-semibold text-ink"><StageMarker kind={kindOf(s.label)} /><span className="tabular-nums font-normal text-subtle">{String(n + 1).padStart(2, "0")}</span>{s.label}</p>
                {s.reasoning ? <EvidenceTag kind="reasoning" /> : null}
              </div>
              <h2 id={`${s.id}-title`} className="mt-4 font-serif text-[1.75rem] leading-tight text-balance text-ink sm:text-[2.2rem]">{s.title}</h2>
              <Body part={s} />
              {s.parts?.map((p) => <PartBlock key={p.title} p={p} />)}
            </section>
          ))}
        </div>
      </Container>

      <nav aria-label="Case navigation" className="border-t border-ink bg-panel">
        <Container className={`grid grid-cols-1 gap-3 py-8 sm:gap-6 sm:py-10 ${prev && next ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {prev ? (
            <Link href={prev.href} className="group flex min-h-16 flex-col justify-center rounded-md border border-line px-4 py-3 hover:border-ink">
              <span className="text-[13px] font-medium text-muted">← Previous case</span>
              <span className="mt-1 font-serif text-xl leading-snug text-ink group-hover:text-accent">{prev.short}</span>
            </Link>
          ) : (
            <Link href="/work" className="group flex min-h-16 flex-col justify-center rounded-md border border-line px-4 py-3 hover:border-ink">
              <span className="text-[13px] font-medium text-muted">← Previous · start of the list</span>
              <span className="mt-1 font-serif text-xl leading-snug text-ink group-hover:text-accent">All Work</span>
            </Link>
          )}
          {/* At either end of the order, the edge slot already leads to All Work. */}
          {prev && next ? (
            <Link href="/work" className="group flex min-h-16 flex-col justify-center rounded-md border border-line px-4 py-3 hover:border-ink sm:items-center sm:text-center">
              <span className="text-[13px] font-medium text-muted">Selected work · {work.length} cases</span>
              <span className="mt-1 font-serif text-xl leading-snug text-ink group-hover:text-accent">All Work</span>
            </Link>
          ) : null}
          {next ? (
            <Link href={next.href} className="group flex min-h-16 flex-col justify-center rounded-md border border-ink bg-background px-4 py-3 hover:border-accent sm:items-end sm:text-right">
              <span className="text-[13px] font-medium text-accent">Next case →</span>
              <span className="mt-1 font-serif text-xl leading-snug text-ink group-hover:text-accent">{next.short}</span>
            </Link>
          ) : (
            <Link href="/work" className="group flex min-h-16 flex-col justify-center rounded-md border border-ink bg-background px-4 py-3 hover:border-accent sm:items-end sm:text-right">
              <span className="text-[13px] font-medium text-accent">Next → · end of the list</span>
              <span className="mt-1 font-serif text-xl leading-snug text-ink group-hover:text-accent">All Work</span>
            </Link>
          )}
        </Container>
      </nav>
    </main>
  );
}

function Body({ part }: { part: Part }) {
  return (
    <>
      {part.body?.map((t) => <p key={t} className="mt-3 text-base leading-7 text-ink/80 sm:text-[17px] sm:leading-8">{t}</p>)}
      {part.visual ? <div className="mt-6"><StageVisual v={part.visual} /></div> : null}
    </>
  );
}

/** An evidence block inside a stage: a smaller heading, then its text and visual. */
function PartBlock({ p }: { p: Part }) {
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-xl leading-snug text-ink sm:text-2xl">{p.title}</h3>
        {p.reasoning ? <EvidenceTag kind="reasoning" /> : null}
      </div>
      <Body part={p} />
    </div>
  );
}
