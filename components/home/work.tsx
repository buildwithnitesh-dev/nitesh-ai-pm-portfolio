import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceMark, EvidenceTag, SectionHeading } from "@/components/ui";
import { CaseThumb } from "@/components/viz/case-thumb";
import { baazi, caseStudies, type Story } from "@/content/portfolio";

/** Professional cases only; the independent AI prototype is introduced in the AI Lab. */
const cases = caseStudies.filter((c) => c.evidence !== "prototype");

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-b border-line pt-10 pb-16 lg:pt-15 lg:pb-22">
      <Container>
        <SectionHeading
          id="work-title"
          index="02"
          eyebrow="Selected work"
          title="Proof through product decisions."
          description="Each told as a decision: what we saw, what we chose, what it cost and what happened."
        />
        <p className="mt-5 text-sm font-medium text-ink">Two cases in depth, then two Baazi Games decisions in brief.</p>

        <ol className="mt-12 grid gap-6">
          {cases.map((s) => (
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
          <li>
            <Baazi />
          </li>
        </ol>
      </Container>
    </section>
  );
}

/** Baazi Games in brief: one decision that held, one feature that was sunset. Same company, two products. */
function Baazi() {
  return (
    <article aria-labelledby="baazi-title" className="rounded-2xl border border-line bg-panel p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-accent">03</span>
        <span className="text-xs tracking-[0.16em] text-muted uppercase">Gaming · {baazi.company} · {baazi.role} · {baazi.period}</span>
      </div>
      <h3 id="baazi-title" className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">Two decisions, in brief.</h3>
      {/* Phones: stories stack on the card itself, split by a rule; side by side in their own panels on large screens. */}
      <ol className="mt-6 grid gap-px overflow-hidden bg-line lg:mt-8 lg:grid-cols-2 lg:rounded-xl lg:border lg:border-line">
        {baazi.stories.map((st) => <StoryCard key={st.id} st={st} />)}
      </ol>
    </article>
  );
}

function StoryCard({ st }: { st: Story }) {
  return (
    <li id={`story-${st.id}`} className="flex scroll-mt-24 flex-col bg-panel py-6 lg:bg-background lg:p-7">
      <p className="text-xs tracking-[0.16em] text-muted uppercase"><span className="text-ink">{st.product}</span> · {st.area}</p>
      <h4 className="mt-3 font-serif text-2xl leading-snug text-ink">{st.title}</h4>
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {st.outcomes.map((o) => (
          <p key={o.label}>
            <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink tabular-nums"><EvidenceMark kind="verified" />{o.value}</span>
            <span className="mt-0.5 block pl-[18px] text-xs leading-5 text-muted">{o.label}</span>
          </p>
        ))}
      </div>
      {st.results ? (
        <ul className="mt-3 grid gap-1 text-sm leading-6 text-ink">
          {st.results.map((r) => <li key={r} className="flex gap-2"><span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{r}</li>)}
        </ul>
      ) : null}
      <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-sm leading-6">
        {st.steps.map((x) => (
          <div key={x.term}>
            <dt className="mr-2 inline font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{x.term}</dt>
            <dd className="inline text-ink/85">{x.text}</dd>
          </div>
        ))}
      </dl>
      {st.learning ? <p className="mt-6 border-t border-line pt-5 font-serif text-xl leading-snug text-ink">“{st.learning}”</p> : null}
    </li>
  );
}
