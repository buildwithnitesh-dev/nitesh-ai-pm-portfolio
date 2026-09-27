import { Container } from "@/components/container";
import { SectionHeading } from "@/components/ui";
import { experience } from "@/content/portfolio";

/** A rail, not a résumé table: the career reads as a progression toward the current focus. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 border-b border-line py-20 lg:py-28">
      <Container>
        <SectionHeading id="experience-title" index="05" eyebrow="Experience" title="A career shaped by three kinds of product problems." />
        <ol className="relative mt-14 ml-1.5 border-l border-line-strong">
          {experience.map(([period, title, body], i) => {
            const current = i === experience.length - 1;
            return (
              <li key={period} className="relative grid gap-3 pb-12 pl-8 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:pl-10">
                <span
                  aria-hidden
                  className={`absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full border-2 ${current ? "border-accent bg-accent ring-4 ring-accent-soft" : "border-line-strong bg-background"}`}
                />
                <p className="text-xs tracking-[0.18em] text-accent uppercase">
                  {period}
                  {current ? <span className="mt-1 block tracking-normal normal-case text-muted">Current focus</span> : null}
                </p>
                <div>
                  <h3 className="font-serif text-2xl leading-snug text-ink">{title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">{body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
