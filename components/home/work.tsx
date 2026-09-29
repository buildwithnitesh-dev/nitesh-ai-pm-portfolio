import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceLegend, EvidenceTag, SectionHeading } from "@/components/ui";
import { CaseThumb } from "@/components/viz/case-thumb";
import { Decisions } from "@/components/home/decisions";
import { caseStudies } from "@/content/portfolio";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-b border-line pt-10 pb-16 lg:pt-15 lg:pb-22">
      <Container>
        <SectionHeading
          id="work-title"
          index="02"
          eyebrow="Selected work"
          title="Proof through product decisions."
          description="Two professional case studies and one independent AI prototype, each told as a decision: what we saw, what we chose, what it cost and what happened. Verified results are marked apart from product reasoning, so you always know which is which."
        />
        <div className="mt-10">
          <EvidenceLegend />
        </div>

        <ol className="mt-12 grid gap-6">
          {caseStudies.map((s) => (
            <li key={s.slug}>
              {/* One target per card: the title link stretches over the whole card. */}
              <article className="group relative grid gap-8 rounded-2xl border border-line bg-panel p-5 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-4 focus-within:ring-offset-background hover:border-line-strong hover:shadow-[0_24px_50px_-30px_rgba(17,17,16,0.25)] sm:p-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-accent">{s.index}</span>
                    <span className="text-xs tracking-[0.16em] text-muted uppercase">{s.domain}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                    <Link href={s.href} className="stretched-link transition-colors outline-none group-hover:text-accent">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{s.summary}</p>

                  <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-[1.1fr_1fr]">
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-muted uppercase">Outcome</dt>
                      <dd className="mt-2 text-lg font-semibold tracking-tight text-ink">{s.outcome}</dd>
                      <dd className="mt-3"><EvidenceTag kind={s.evidence} /></dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.16em] text-muted uppercase">Inside · {s.readTime}</dt>
                      <dd className="mt-2">
                        <ul className="grid gap-1 text-sm text-ink">
                          {s.inside.map((x) => <li key={x} className="flex items-center gap-2"><span aria-hidden className="h-1 w-1 rounded-full bg-subtle" />{x}</li>)}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink">
                    Read the case study <Arrow />
                  </p>
                </div>
                <div className="order-first lg:order-none">
                  <CaseThumb slug={s.slug} />
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</li>)}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <Decisions />
      </Container>
    </section>
  );
}
