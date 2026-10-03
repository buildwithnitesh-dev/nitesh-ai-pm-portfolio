import { Container } from "@/components/container";
import { DecisionCard } from "@/components/decision-card";
import { Mono, SectionHeader } from "@/components/ui";
import { decisions } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/decisions",
  title: "Decisions",
  description: "Product-judgment snapshots by Nitesh Tiwari: a feature sunset at FanBlaze, bonus allocation by expected ROI, an experimentation program, a myPlan feedback loop and more. Each with its signal, decision and outcome or learning.",
});

export default function DecisionsPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <SectionHeader as="h1" label="Decisions" title="Smaller calls, same discipline." intro="Short snapshots of product judgment: the signal, the call, and the outcome or learning, including the bets that were stopped. The deep stories live in Work." />
        <nav aria-label="Decisions" className="mt-10">
          <ol className="flex flex-wrap gap-2">
            {decisions.map((d) => (
              <li key={d.id}><a href={`#${d.id}`} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-ink hover:border-ink"><Mono className="text-subtle">{d.code}</Mono>{d.product ?? d.company}</a></li>
            ))}
          </ol>
        </nav>
        <ol className="mt-14 border-t border-ink">
          {decisions.map((d) => (
            <li key={d.id} className="border-b border-line py-9 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
              <div className="mb-6 lg:mb-0">
                <Mono className="text-accent">{d.area}</Mono>
                <p className="mt-2 text-sm text-muted">{d.role}</p>
              </div>
              <div className="max-w-3xl"><DecisionCard d={d} headingLevel="h2" /></div>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
