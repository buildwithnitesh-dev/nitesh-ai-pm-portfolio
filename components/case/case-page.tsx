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
  const other = flagships.find((f) => f.slug !== c.slug)!;
  return (
    <main id="main" className="flex-1">
      <header className="border-b border-line">
        <Container className="pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/work" className="inline-flex min-h-6 items-center hover:text-ink">← Work</Link></li>
              <li aria-hidden className="text-line-strong">/</li>
              <li aria-current="page" className="text-ink">{c.title}</li>
            </ol>
          </nav>
          <p className="mt-12 text-lg font-semibold text-accent sm:text-xl">{c.capability}</p>
          <h1 className="mt-4 max-w-5xl font-serif text-[2.9rem] leading-[1.02] tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">{c.opening}</h1>
          <p className="mt-4 text-sm text-muted">{c.title} · {c.company} · {c.domain} · {c.role}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{c.standfirst}</p>
          <div className={`mt-10 grid gap-8 border-y-2 border-ink py-8 ${c.headline.length > 1 ? "md:grid-cols-2" : ""}`}>
            {c.headline.map((id) => <Delta key={id} id={id} size="md" layout={c.headline.length > 1 ? "stack" : "row"} />)}
          </div>
          {c.scope ? <p className="mt-4 max-w-3xl text-[13px] leading-5 text-muted">{c.scope}</p> : null}
        </Container>
      </header>

      <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 py-14 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside><StageRail items={c.stages.map(({ id, label }) => ({ id, label }))} /></aside>
        <div className="grid min-w-0 max-w-3xl grid-cols-[minmax(0,1fr)] gap-16">
          {c.stages.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <p className="inline-flex items-center gap-3 text-[15px] font-semibold text-ink"><StageMarker kind={kindOf(s.label)} /><span className="tabular-nums font-normal text-subtle">{String(i + 1).padStart(2, "0")}</span>{s.label}</p>
                {s.reasoning ? <EvidenceTag kind="reasoning" /> : null}
              </div>
              <h2 id={`${s.id}-title`} className="mt-6 font-serif text-3xl leading-tight text-balance text-ink sm:text-[2.4rem]">{s.title}</h2>
              {s.body?.map((p) => <p key={p} className="mt-4 text-base leading-8 text-ink/80 sm:text-[17px]">{p}</p>)}
              {s.visual ? <div className="mt-8"><StageVisual v={s.visual} /></div> : null}
            </section>
          ))}
        </div>
      </Container>

      <nav aria-label="More work" className="border-t border-ink">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <Link href={other.href} className="group block">
            <Mono className="text-accent">Next case · {other.company}</Mono>
            <p className="mt-3 font-serif text-4xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-5xl">{other.headline} <Arrow /></p>
            <p className="mt-2 text-base text-muted">{other.opening}</p>
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
            <Link href="/decisions" className="inline-flex min-h-6 items-center hover:text-accent">Decisions</Link>
            <Link href="/work" className="inline-flex min-h-6 items-center hover:text-accent">All work</Link>
          </div>
        </Container>
      </nav>
    </main>
  );
}
