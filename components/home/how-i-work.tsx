import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, SectionHeading } from "@/components/ui";
import { Decisions } from "@/components/home/decisions";
import { about, capabilities, caseStudies, decisions } from "@/content/portfolio";
import { principles } from "@/content/thinking";

/**
 * How I work, in one section: the principles, the decisions that show them,
 * and an index of capabilities pointing at where each is demonstrated.
 * Replaces the separate Capability Map and Thinking sections.
 */
export function HowIWork() {
  return (
    <section id="how-i-work" aria-labelledby="how-i-work-title" className="scroll-mt-24 border-b border-line py-16 lg:py-22">
      <Container>
        <SectionHeading id="how-i-work-title" index="04" eyebrow="How I work" title={about.title} description={about.body} />

        <h3 className="mt-14 text-xs font-medium tracking-[0.16em] text-muted uppercase">Principles</h3>
        <ol className="mt-4 grid border-t border-ink md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line py-6">
              <span className="pt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4 className="font-serif text-xl leading-snug text-ink">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
                <Link href={p.evidence.href} className="group mt-3 inline-flex items-center gap-2 text-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                  Evidence · {p.evidence.label} <Arrow />
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <Decisions />

        <h3 className="mt-16 text-xs font-medium tracking-[0.16em] text-muted uppercase">Capabilities, and where each is shown</h3>
        <ul className="mt-4 grid gap-x-8 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <li key={c.id} className="border-b border-line py-4">
              <p className="text-sm font-medium text-ink">{c.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {[
                  ...c.cases.map((k) => {
                    const cs = caseStudies.find((x) => x.slug === k.slug)!;
                    return { key: k.slug, href: cs.href, label: cs.evidence === "prototype" ? `${cs.short} (independent prototype)` : cs.short };
                  }),
                  ...c.decisions.map((id) => {
                    const d = decisions.find((x) => x.id === id)!;
                    return { key: id, href: `/#decision-${id}`, label: d.short };
                  }),
                ].map((e, i) => (
                  <span key={e.key}>
                    {i ? " · " : ""}
                    <Link href={e.href} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">{e.label}</Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
