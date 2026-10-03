import Link from "next/link";
import { Container } from "@/components/container";
import { WorkStories } from "@/components/home/sections";
import { VerdictTag } from "@/components/decision-card";
import { Arrow, Mono, MoreLink, SectionHeader } from "@/components/ui";
import { aiLab, decisions, work } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/work",
  title: "Work",
  description: "Selected work by Nitesh Tiwari, Senior Product Manager: myPAT doubt resolution at Edfora, the Witzeal onboarding redesign, adaptive practice, and the FanBlaze live-score sunset. Then a library of shorter product decisions, and an AI product lab.",
});

export default function WorkPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-10 lg:py-14">
        <SectionHeader as="h1" label="Work" title="Product decisions, with the evidence behind them." intro={`${work.length} deep case studies, ordered by what they show. Shorter calls live in the decision library below.`} />

        <section aria-labelledby="selected" className="mt-10">
          <h2 id="selected" className="text-[13px] font-medium text-accent">Selected work</h2>
          <WorkStories headingLevel="h3" />
        </section>

        <section aria-labelledby="library" className="mt-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 id="library" className="font-serif text-4xl text-ink">Decision library</h2>
              <p className="mt-2 text-base text-muted">Short judgment snapshots: signal, decision, outcome.</p>
            </div>
            <MoreLink href="/decisions">Read every decision</MoreLink>
          </div>
          <ul className="mt-6 border-t border-ink">
            {decisions.map((d) => (
              <li key={d.id} className="border-b border-line">
                <Link href={`/decisions#${d.id}`} className="group grid gap-2 py-4 sm:grid-cols-[5rem_8rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
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

        <section aria-labelledby="lab" className="mt-14 border-t border-ink pt-6">
          <Mono className="text-accent">{aiLab.label}</Mono>
          <h2 id="lab" className="mt-3 font-serif text-4xl">{aiLab.headline}</h2>
          <p className="mt-3 max-w-2xl text-muted">{aiLab.sub}</p>
          <p className="mt-5"><MoreLink href="/ai-lab">Inside the AI Lab</MoreLink></p>
        </section>
      </Container>
    </main>
  );
}
