import { Container } from "@/components/container";
import { DecisionCard } from "@/components/decision-card";
import { Mono, SectionHeader } from "@/components/ui";
import { decisions } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/decisions",
  title: "Decisions",
  description: "A library of product decisions by Nitesh Tiwari: bonus allocation by expected ROI, a feature sunset at FanBlaze, an A/B experimentation program, matchmaking at PokerBaazi, and more. Each with its signal, trade-off and documented result.",
});

export default function DecisionsPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <SectionHeader as="h1" label="Decisions" title="Smaller calls, same discipline." intro="Each decision in one grammar: the signal, the call, the trade-off, the result. Trade-offs are product reasoning; results are documented, with their caveats." />
        <nav aria-label="Decisions" className="mt-10">
          <ol className="flex flex-wrap gap-2">
            {decisions.map((d) => (
              <li key={d.id}><a href={`#${d.id}`} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:border-ink"><Mono className="text-subtle">{d.code}</Mono>{d.product ?? d.company}</a></li>
            ))}
          </ol>
        </nav>
        <ol className="mt-14 border-t border-ink">
          {decisions.map((d) => (
            <li key={d.id} className="border-b border-line py-12 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
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
