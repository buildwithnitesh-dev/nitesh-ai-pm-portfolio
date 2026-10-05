import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { Container } from "@/components/container";
import { FieldExample } from "@/components/home/sections";
import { Arrow, Mono, SectionHeader, StatusLabel, StatusMark } from "@/components/ui";
import { buildSpec, type BuildStatus } from "@/content/ai-diagnostic";
import { aiLab } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/ai-lab",
  title: "AI Lab",
  description: "AI product judgment from Nitesh Tiwari: problem first, model second. A real decision where an AI auto-resolver was evaluated against a 90% quality gate and not shipped as the first solution, and an independent prototype with a deterministic baseline and an evaluation harness. No evaluation has been run.",
});

const legend: { status: BuildStatus; meaning: string }[] = [
  { status: "Implemented", meaning: "Working code in the repository" },
  { status: "Designed", meaning: "A written design, not yet code" },
  { status: "Planned", meaning: "Scoped, not designed in detail" },
  { status: "Needs input", meaning: "Waits on a decision, data or access" },
];

export default function AiLabPage() {
  const build = aiLab.builds[0];
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-line bg-stone">
        <Container className="pt-4 pb-10 lg:pt-6 lg:pb-12">
          <BackLink href="/" label="Back to home" />
          <div className="mt-2 lg:mt-3"><SectionHeader as="h1" label="AI Lab" title={aiLab.headline} intro={aiLab.sub} /></div>
          <ul aria-label="What each status means" className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {legend.map((l) => (
              <li key={l.status} className="grid gap-1">
                <StatusLabel status={l.status} />
                <p className="text-[13px] leading-5 text-muted">{l.meaning}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[15px] leading-7 text-muted">{aiLab.professional}</p>
        </Container>
      </section>

      <Container className="pt-10 pb-14 lg:pt-12 lg:pb-20">
        <h2 className="font-medium text-[13px] text-accent">In the field</h2>
        <FieldExample className="mt-6 mb-20" />
        <h2 className="font-medium text-[13px] text-accent">Current build</h2>
        <article className="group relative mt-6 border-t border-ink pt-8 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent">
          <Mono className="text-muted">{build.status}</Mono>
          <h3 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            <Link href={build.href} className="stretched-link outline-none group-hover:text-accent">{build.title}</Link>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{build.statusNote}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {buildSpec.map((r) => (
              <li key={r.part} className="flex items-center justify-between gap-4 border-b border-line py-2.5">
                <span className={`text-sm ${r.status === "Implemented" || r.status === "Designed" ? "text-ink" : "text-muted"}`}>{r.part}</span>
                <span className="inline-flex items-center gap-2 text-[13px] text-muted"><StatusMark status={r.status} />{r.status}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent">Open the build <Arrow /></p>
        </article>

        <section aria-labelledby="ai-principles" className="mt-20">
          <h2 id="ai-principles" className="font-serif text-4xl text-ink">What I hold every AI build to</h2>
          <ol className="mt-6 grid border-t border-ink md:grid-cols-2 md:gap-x-12">
            {aiLab.principles.map(([t, b], i) => (
              <li key={t} className="border-b border-line py-7">
                <Mono className="text-accent">{String(i + 1).padStart(2, "0")}</Mono>
                <h3 className="mt-3 font-serif text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-[15px] leading-7 text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </main>
  );
}
