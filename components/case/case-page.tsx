import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { StageMarker, kindOf } from "@/components/trace";
import { Arrow, EvidenceTag, Mono } from "@/components/ui";
import type { Case } from "@/content/cases";
import { flagships } from "@/content/portfolio";
import { StageRail } from "./stage-rail";
import { StageVisual } from "./visuals";

/**
 * A flagship case as a decision narrative: the opening line and the result up
 * front, then one stage per step of the decision, each a short statement and,
 * where it says it faster, a visual.
 */
export function CasePage({ c }: { c: Case }) {
  // Previous and next follow the Selected Work order, wrapping so no case is a dead end.
  const at = flagships.findIndex((f) => f.slug === c.slug);
  const prev = flagships[(at - 1 + flagships.length) % flagships.length];
  const next = flagships[(at + 1) % flagships.length];
  return (
    <main id="main" className="flex-1">
      <header className="border-b border-line">
        <Container className="pt-10 pb-14 lg:pt-14 lg:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-accent"><span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> Back to Work</Link>
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/work" className="inline-flex min-h-6 items-center hover:text-ink">Work</Link></li>
                <li aria-hidden className="text-line-strong">/</li>
                <li aria-current="page" className="text-ink">{c.title}</li>
              </ol>
            </nav>
          </div>
          <p className="mt-10 text-lg font-semibold text-accent sm:text-xl">{c.capability}</p>
          <h1 className="mt-4 max-w-5xl font-serif text-[2.9rem] leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">{c.opening}</h1>
          <p className="mt-4 text-sm text-muted">{c.title} · {c.company} · {c.domain} · {c.role}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{c.standfirst}</p>
          {c.headline.length || c.headerVisual ? (
            <div className="mt-10 grid gap-8 border-y-2 border-ink py-8">
              {c.headline.length ? (
                <div className={`grid gap-8 ${c.headline.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {c.headline.map((id) => <Delta key={id} id={id} size="md" layout={c.headline.length > 1 ? "stack" : "row"} />)}
                </div>
              ) : null}
              {c.headerVisual ? <div className={c.headline.length ? "border-t border-line pt-7" : ""}><StageVisual v={c.headerVisual} /></div> : null}
            </div>
          ) : null}
          {c.scope ? <p className="mt-4 max-w-3xl text-[13px] leading-5 text-muted">{c.scope}</p> : null}
        </Container>
      </header>

      <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 py-14 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside><StageRail items={c.stages.map(({ id, label }) => ({ id, label }))} /></aside>
        <div className={`grid min-w-0 max-w-3xl grid-cols-[minmax(0,1fr)] ${c.compact ? "gap-8 sm:gap-10 lg:gap-14" : "gap-16"}`}>
          {c.stages.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <p className="inline-flex items-center gap-3 text-[15px] font-semibold text-ink"><StageMarker kind={kindOf(s.label)} /><span className="tabular-nums font-normal text-subtle">{String(i + 1).padStart(2, "0")}</span>{s.label}</p>
                {s.reasoning ? <EvidenceTag kind="reasoning" /> : null}
              </div>
              <h2 id={`${s.id}-title`} className={`${c.compact ? "mt-4" : "mt-6"} font-serif text-3xl leading-tight text-balance text-ink sm:text-[2.4rem]`}>{s.title}</h2>
              {s.body?.map((p) => <p key={p} className={`${c.compact ? "mt-3 leading-7 sm:leading-8" : "mt-4 leading-8"} text-base text-ink/80 sm:text-[17px]`}>{p}</p>)}
              {s.visual ? <div className={c.compact ? "mt-5 sm:mt-7" : "mt-8"}><StageVisual v={s.visual} compact={c.compact} /></div> : null}
            </section>
          ))}
        </div>
      </Container>

      <nav aria-label="Case studies" className="border-t border-ink">
        <Container className="grid gap-6 py-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-10 lg:py-16">
          <Link href={prev.href} className="group block border-b border-line pb-5 md:border-0 md:pb-0">
            <Mono className="text-muted"><span aria-hidden>← </span>Previous · {prev.index}</Mono>
            <p className="mt-2 font-serif text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">{prev.headline}</p>
          </Link>
          <Link href="/work" className="inline-flex min-h-11 items-center justify-self-start border-b border-line pb-5 text-[15px] font-medium text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent md:justify-self-center md:border-0 md:pb-0">All work</Link>
          <Link href={next.href} className="group block md:text-right">
            <Mono className="text-accent">Next · {next.index}<span aria-hidden> →</span></Mono>
            <p className="mt-2 font-serif text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">{next.headline}</p>
          </Link>
        </Container>
      </nav>
    </main>
  );
}
