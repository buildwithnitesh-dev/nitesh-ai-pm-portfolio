import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, Mono, SectionHeader, StatusLabel, StatusMark } from "@/components/ui";
import { buildSpec, type BuildStatus } from "@/content/ai-diagnostic";
import { aiLab } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/ai-lab",
  title: "AI Lab",
  description: "How Nitesh Tiwari builds AI products: a deterministic rules-first baseline, evaluation designed before model work, and an honest status on every part of the build. No evaluation has been run.",
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
      <section className="on-dark border-b border-line bg-dark text-panel">
        <Container className="py-14 lg:py-20">
          <SectionHeader as="h1" label="AI Lab" title={aiLab.headline} intro={aiLab.sub} tone="dark" />
          <ul aria-label="What each status means" className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {legend.map((l) => (
              <li key={l.status} className="grid gap-1">
                <StatusLabel status={l.status} tone="dark" />
                <p className="text-xs leading-5 text-panel/60">{l.meaning}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-6 text-panel/65">{aiLab.professional}</p>
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Current build</h2>
        <article className="group relative mt-6 rounded-2xl border border-line bg-panel p-6 transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-4 focus-within:ring-offset-background hover:border-ink sm:p-9">
          <Mono className="text-muted">{build.status}</Mono>
          <h3 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            <Link href={build.href} className="stretched-link outline-none group-hover:text-accent">{build.title}</Link>
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{build.statusNote}</p>
          <ul className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {buildSpec.map((r) => (
              <li key={r.part} className="flex items-center justify-between gap-4 border-b border-line py-2.5">
                <span className={`text-sm ${r.status === "Implemented" || r.status === "Designed" ? "text-ink" : "text-muted"}`}>{r.part}</span>
                <span className="inline-flex items-center gap-2 text-xs text-muted"><StatusMark status={r.status} />{r.status}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink">Open the build <Arrow /></p>
        </article>

        <section aria-labelledby="ai-principles" className="mt-20">
          <h2 id="ai-principles" className="font-serif text-4xl text-ink">What I hold every AI build to</h2>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {aiLab.principles.map(([t, b], i) => (
              <li key={t} className="bg-panel p-6 sm:p-8">
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
