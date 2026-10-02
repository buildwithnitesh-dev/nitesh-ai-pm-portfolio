import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceTag, Mono, SectionHeader } from "@/components/ui";
import { aiLab } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/ai-lab",
  title: "AI Lab",
  description: "How Nitesh Tiwari builds AI products: every build framed as problem, AI role, system, evaluation, failure modes and product metric, with honest status. Includes the AI Learner Diagnostic prototype.",
});

export default function AiLabPage() {
  return (
    <main id="main" className="flex-1">
      <section className="on-dark border-b border-line bg-dark text-panel">
        <Container className="py-14 lg:py-20">
          <SectionHeader as="h1" label="AI Lab" title={aiLab.headline} intro={aiLab.sub} tone="dark" />
          <ol aria-label="How every AI build is framed" className="mt-10 flex flex-wrap gap-2">
            {aiLab.spine.map((s, i) => (
              <li key={s} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-panel/80 uppercase">
                <span className="rounded-full border border-white/20 px-3 py-1.5">{s}</span>
                {i < aiLab.spine.length - 1 ? <span aria-hidden className="text-panel/40">→</span> : null}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-panel/65">{aiLab.professional}</p>
        </Container>
      </section>

      <Container className="py-14 lg:py-20">
        <h2 className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Builds</h2>
        <ul className="mt-6 grid gap-6">
          {aiLab.builds.map((b) => (
            <li key={b.slug}>
              <article className="group relative rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-ink sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <EvidenceTag kind="prototype" />
                  <Mono className="text-muted">{b.status}</Mono>
                </div>
                <h3 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
                  <Link href={b.href} className="stretched-link outline-none group-hover:text-accent">{b.title}</Link>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{b.statusNote}</p>
                <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
                  {b.spine.map((s) => (
                    <div key={s.term} className="bg-background p-5">
                      <dt><Mono className="text-accent">{s.term}</Mono></dt>
                      <dd className="mt-2 text-sm leading-6 text-ink/85">{s.text}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink">Open the prototype <Arrow /></p>
              </article>
            </li>
          ))}
        </ul>

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
