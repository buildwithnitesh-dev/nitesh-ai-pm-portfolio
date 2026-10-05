import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { Container } from "@/components/container";
import { WorkStories } from "@/components/home/sections";
import { VerdictTag } from "@/components/decision-card";
import { Arrow, Mono, MoreLink, SectionHeader } from "@/components/ui";
import { aiLab, decisions } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/work",
  title: "Work",
  description: "Product work by Nitesh Tiwari, Senior Product Manager: four case studies (doubt resolution, onboarding activation, adaptive practice, behavioural loops), a decision library including a feature sunset, and an AI product lab.",
});

export default function WorkPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="pt-4 pb-12 lg:pt-6 lg:pb-14">
        <BackLink href="/" label="Back to home" />
        <div className="mt-2 lg:mt-3"><SectionHeader as="h1" label="Work" title="Product decisions, with the evidence behind them." intro="Four product stories in depth, then the smaller calls as short snapshots, including the bets that were stopped, then the AI Lab." /></div>

        <section aria-labelledby="flagships" className="mt-10">
          <h2 id="flagships" className="font-medium text-[13px] text-accent">Four stories</h2>
          <WorkStories headingLevel="h3" withSummary />
        </section>

        <section aria-labelledby="library" className="mt-12 lg:mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="library" className="font-serif text-4xl text-ink">Decision library <span className="block text-base font-normal tracking-normal text-muted">Short snapshots: signal, decision, outcome or learning.</span></h2>
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

        <section aria-labelledby="lab" className="mt-12 lg:mt-16 border-t border-ink pt-8">
          <Mono className="text-accent">AI Lab</Mono>
          <h2 id="lab" className="mt-4 font-serif text-4xl">{aiLab.headline}</h2>
          <p className="mt-3 max-w-2xl text-muted">{aiLab.sub}</p>
          <p className="mt-6"><MoreLink href="/ai-lab">Inside the AI Lab</MoreLink></p>
        </section>
      </Container>
    </main>
  );
}
