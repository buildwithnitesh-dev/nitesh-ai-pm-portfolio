import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/ui";
import { caseStudies, expertise } from "@/content/portfolio";

type Level = "primary" | "supporting" | undefined;

function Dot({ level }: { level: Level }) {
  if (!level) return <span aria-hidden className="block h-px w-3 bg-line-strong" />;
  return (
    <span
      aria-hidden
      className={`block h-3.5 w-3.5 rounded-full ${level === "primary" ? "bg-accent" : "border-2 border-accent bg-transparent"}`}
    />
  );
}

const levelText = { primary: "Core evidence", supporting: "Supporting evidence" } as const;

/**
 * Expertise as an evidence matrix: every claimed skill points at the case study
 * that proves it. A table on wide screens; per-skill cards with chips on phones.
 */
export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-24 border-b border-line py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="expertise-title"
            index="04"
            eyebrow="Product leadership"
            title="Where I spend my judgment — and where to see it."
            description="Each skill is mapped to the case study that demonstrates it, so claims can be checked rather than taken on trust."
          />
          <ul aria-label="Legend" className="flex shrink-0 gap-5 text-xs text-muted">
            <li className="flex items-center gap-2"><Dot level="primary" /> {levelText.primary}</li>
            <li className="flex items-center gap-2"><Dot level="supporting" /> {levelText.supporting}</li>
          </ul>
        </div>

        {/* Wide screens: a real table, scannable in both directions. */}
        <div className="mt-12 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Expertise mapped to supporting case studies</caption>
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="w-[46%] pb-4 text-xs font-medium tracking-[0.16em] text-muted uppercase">Skill</th>
                {caseStudies.map((c) => (
                  <th key={c.slug} scope="col" className="w-[18%] pb-4 text-center align-bottom">
                    <Link href={c.href} className="group inline-flex flex-col items-center gap-1 text-sm font-normal text-ink hover:text-accent">
                      <span className="font-mono text-xs text-accent">{c.index}</span>
                      <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-accent">{c.short}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expertise.map((e) => (
                <tr key={e.title} className="group border-b border-line transition-colors hover:bg-panel">
                  <th scope="row" className="py-5 pr-8 align-top font-normal">
                    <span className="block font-serif text-xl text-ink">{e.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{e.body}</span>
                  </th>
                  {caseStudies.map((c) => {
                    const level = e.evidence[c.slug] as Level;
                    return (
                      <td key={c.slug} className="py-5 text-center align-middle">
                        <span className="inline-flex justify-center"><Dot level={level} /></span>
                        <span className="sr-only">{level ? levelText[level] : "Not shown in this case"}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: the same data, one skill at a time. */}
        <ul className="mt-10 grid gap-3 md:hidden">
          {expertise.map((e) => (
            <li key={e.title} className="rounded-xl border border-line bg-panel p-5">
              <h3 className="font-serif text-xl text-ink">{e.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{e.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {caseStudies.filter((c) => e.evidence[c.slug]).map((c) => {
                  const level = e.evidence[c.slug] as Level;
                  return (
                    <li key={c.slug}>
                      <Link href={c.href} className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1.5 text-xs text-ink">
                        <Dot level={level} />
                        {c.short}
                        <span className="sr-only">({level ? levelText[level] : ""})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
