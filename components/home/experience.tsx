import { Container } from "@/components/container";
import { SectionHeading } from "@/components/ui";
import { baazi, career, careerArc, decisions } from "@/content/portfolio";

/**
 * The verified career timeline on the existing rail. The arc strip above it
 * makes the progression readable in one glance: engineering → program and
 * release management → product management → senior product management.
 * Each role is a compact row (company, title, dates) that opens to its
 * details, and links to its entries in the decision log, where they exist.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 border-b border-line py-16 lg:py-22">
      <Container>
        <SectionHeading
          id="experience-title"
          index="03"
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

        {/* Compact by default: company, title and dates scan in one pass; each role opens to its details. The latest role starts open. */}
        <ol className="relative mt-12 ml-1.5 border-l border-line-strong">
          {career.map((r, i) => {
            const latest = i === 0;
            return (
              <li key={r.company} className="relative pb-6 pl-8 last:pb-0 sm:pl-10">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full border-2 ${latest ? "border-accent bg-accent ring-4 ring-accent-soft" : "border-line-strong bg-background"}`}
                />
                <details open={latest} className="group">
                  <summary className="grid cursor-pointer list-none gap-x-10 gap-y-1 sm:grid-cols-[11rem_1fr] [&::-webkit-details-marker]:hidden">
                    <span className="block text-sm">
                      <span className="block font-mono text-xs text-ink">{r.period}</span>
                      <span className="mt-1 block text-[11px] tracking-[0.14em] text-accent uppercase">{r.phase}</span>
                    </span>
                    <span className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
                        {r.company} <span className="text-muted">· {r.title}</span>
                      </h3>
                      <span aria-hidden className="mt-1 text-lg text-muted transition-transform duration-200 group-open:rotate-45">+</span>
                    </span>
                  </summary>

                  <div className="pt-3 pb-4 sm:ml-[13.5rem]">
                    <p className="text-xs text-muted">{r.location}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">{r.summary}</p>

                    {r.owned ? (
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-ink">
                        <span className="mr-2 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">Owned</span>
                        {r.owned.join(" · ")}
                      </p>
                    ) : null}

                    <ul className="mt-5 grid max-w-3xl gap-2">
                      {r.highlights.map((h) => (
                        <li key={h} className="grid grid-cols-[1rem_1fr] text-sm leading-6 text-muted sm:text-[15px]">
                          <span aria-hidden className="mt-2.5 h-1 w-1 rounded-full bg-subtle" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <RoleDecisions company={r.company} />
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

function RoleDecisions({ company }: { company: string }) {
  const ds = decisions.filter((d) => d.company === company);
  const stories = company === baazi.company ? baazi.stories : [];
  if (!ds.length && !stories.length) return null;
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
      {stories.length ? <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">In selected work</span> : null}
      {stories.map((st) => (
        <a key={st.id} href={`#story-${st.id}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">{st.product}</a>
      ))}
      {ds.length ? <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">In the decision log</span> : null}
      {ds.map((d) => (
        <a key={d.id} href={`#decision-${d.id}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">{d.short}</a>
      ))}
    </p>
  );
}
