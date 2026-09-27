import { Container } from "@/components/container";
import { SectionHeading } from "@/components/ui";
import { career, careerArc } from "@/content/portfolio";

/**
 * The verified career timeline on the existing rail. The arc strip above it
 * makes the progression readable in one glance: engineering → program and
 * release management → product management → senior product management.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 border-b border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="experience-title"
          index="06"
          eyebrow="Experience"
          title="From Android engineering to senior product management."
          description="Built software first, then ran releases, then owned products. Each step shows up in how I scope, prioritize, and make trade-offs with engineering."
        />

        <ol aria-label="Career progression" className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {careerArc.map((a, i) => (
            <li key={a.phase} className={`flex items-baseline justify-between gap-3 p-4 sm:block ${i === careerArc.length - 1 ? "bg-accent-soft" : "bg-panel"}`}>
              <p className="font-mono text-[11px] text-muted">{a.years}</p>
              <p className={`text-sm sm:mt-1 ${i === careerArc.length - 1 ? "font-medium text-accent" : "text-ink"}`}>
                {a.phase}
                {i < careerArc.length - 1 ? <span aria-hidden className="ml-2 hidden text-subtle sm:inline">→</span> : null}
              </p>
            </li>
          ))}
        </ol>

        <ol className="relative mt-14 ml-1.5 border-l border-line-strong">
          {career.map((r, i) => {
            const latest = i === 0;
            return (
              <li key={r.company} className="relative grid gap-3 pb-14 pl-8 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-10 sm:pl-10">
                <span
                  aria-hidden
                  className={`absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full border-2 ${latest ? "border-accent bg-accent ring-4 ring-accent-soft" : "border-line-strong bg-background"}`}
                />
                <div className="text-sm">
                  <p className="font-mono text-xs text-ink">{r.period}</p>
                  <p className="mt-1 text-xs text-muted">{r.location}</p>
                  <p className="mt-2 text-[11px] tracking-[0.14em] text-accent uppercase">{r.phase}</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-snug text-ink">
                    {r.title} <span className="text-muted">· {r.company}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">{r.summary}</p>

                  {r.owned || r.decided ? (
                    <div className="mt-5 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                      {r.owned ? (
                        <div className="bg-panel p-4">
                          <p className="text-[11px] tracking-[0.14em] text-muted uppercase">What I owned</p>
                          <ul className="mt-2 grid gap-1 text-sm leading-6 text-ink">
                            {r.owned.map((o) => <li key={o}>{o}</li>)}
                          </ul>
                        </div>
                      ) : null}
                      {r.decided ? (
                        <div className="bg-panel p-4">
                          <p className="text-[11px] tracking-[0.14em] text-muted uppercase">What I decided independently</p>
                          <ul className="mt-2 grid gap-1 text-sm leading-6 text-ink">
                            {r.decided.map((d) => <li key={d}>{d}</li>)}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <ul className="mt-5 grid max-w-3xl gap-2">
                    {r.highlights.map((h) => (
                      <li key={h} className="grid grid-cols-[1rem_1fr] text-sm leading-6 text-muted sm:text-[15px]">
                        <span aria-hidden className="mt-2.5 h-1 w-1 rounded-full bg-subtle" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
