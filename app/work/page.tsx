import Link from "next/link";
import { Container } from "@/components/container";
import { WorkStories } from "@/components/home/sections";
import { VerdictTag } from "@/components/decision-card";
import { Arrow, Mono, MoreLink, SectionHeader } from "@/components/ui";
import { aiLab, decisions } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/work",
  title: "Work",
  description: "Product work by Nitesh Tiwari, Senior Product Manager: activation and personalization case studies, a feature sunset on usage evidence, a library of product decisions, and an AI product lab.",
});

export default function WorkPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <SectionHeader as="h1" label="Work" title="Product decisions, with the evidence behind them." intro="Two flagship cases and a sunset in depth, then the smaller calls in one grammar, then the AI Lab." />

        <section aria-labelledby="flagships" className="mt-16">
          <h2 id="flagships" className="font-medium text-[13px] text-accent">Three stories</h2>
          <WorkStories headingLevel="h3" withSummary />
        </section>

        <section aria-labelledby="library" className="mt-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="library" className="font-serif text-4xl text-ink">Decision library</h2>
            <MoreLink href="/decisions">Read every decision</MoreLink>
          </div>
          <ul className="mt-6 border-t border-ink">
            {decisions.map((d) => (
              <li key={d.id} className="border-b border-line">
                <Link href={`/decisions#${d.id}`} className="group grid gap-2 py-5 sm:grid-cols-[5rem_8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
                  <Mono className="text-subtle">{d.code}</Mono>
                  <span><VerdictTag verdict={d.verdict} /></span>
                  <span>
                    <span className="block font-serif text-2xl leading-snug text-ink group-hover:text-accent">{d.title}</span>
                    <span className="mt-1 block font-medium text-[13px] text-muted">{d.product ? `${d.company} · ${d.product}` : d.company} · {d.area}</span>
                  </span>
                  <Arrow className="hidden text-muted sm:inline-block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="lab" className="mt-20 border-t border-ink pt-8">
          <Mono className="text-accent">AI Lab</Mono>
          <h2 id="lab" className="mt-4 font-serif text-4xl">{aiLab.headline}</h2>
          <p className="mt-3 max-w-2xl text-muted">{aiLab.sub}</p>
          <p className="mt-6"><MoreLink href="/ai-lab">Inside the AI Lab</MoreLink></p>
        </section>
      </Container>
    </main>
  );
}
