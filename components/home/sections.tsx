import Link from "next/link";
import { Container } from "@/components/container";
import { DecisionCard } from "@/components/decision-card";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Arrow, Mono, MoreLink, SectionHeader, button } from "@/components/ui";
import { about, aiLab, arc, contact, decisions, flagships, principles, proofWall } from "@/content/portfolio";
import { CopyEmail } from "./copy-email";

/** 02 · 30-second scan: one lever, one number, how it was measured, and the story behind it. */
export function ProofWall() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="proof-title" index="02" label="Proof" title="What I've moved" intro="Five levers, one number each, with how it was measured. Ranges stay ranges, and caveats travel with the number." />
        <ol className="mt-12 border-t border-ink">
          {proofWall.map((p) => (
            <li key={p.lever} className="grid gap-4 border-b border-line py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
              <p className="font-serif text-3xl text-ink">{p.lever}</p>
              <Delta id={p.delta} size="md" link layout="row" />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** 03 · The career as a transformation, not a timeline: what each phase taught, and one proof. */
export function CareerArc() {
  return (
    <section id="arc" aria-labelledby="arc-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="arc-title" index="03" label="Career" title="Six phases. Each added a layer of the job." intro="How software gets built, how it ships, how users behave, how growth works, how a product adapts to each person. AI is the next application of the same discipline." />
        <p aria-hidden className="mt-6 font-mono text-xs tracking-[0.08em] text-accent">Built → Shipped → Measured → Grew → Personalized → AI</p>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {arc.map((a, i) => (
            <li key={a.verb} className={`flex flex-col p-6 sm:p-7 ${i === arc.length - 1 ? "bg-dark text-panel" : "bg-panel"}`}>
              <div className="flex items-baseline justify-between gap-3">
                <Mono className={i === arc.length - 1 ? "text-accent-soft/80" : "text-accent"}>{String(i + 1).padStart(2, "0")} · {a.field}</Mono>
                <Mono className={i === arc.length - 1 ? "text-panel/50" : "text-subtle"}>{a.years}</Mono>
              </div>
              <h3 className={`mt-4 font-serif text-4xl leading-none ${i === arc.length - 1 ? "text-panel" : "text-ink"}`}>{a.verb}</h3>
              <p className={`mt-1 text-sm ${i === arc.length - 1 ? "text-panel/70" : "text-muted"}`}>{a.org}</p>
              <p className={`mt-5 text-base leading-7 ${i === arc.length - 1 ? "text-panel" : "text-ink"}`}>{a.taught}</p>
              <p className={`mt-auto border-t pt-4 text-sm leading-6 ${i === arc.length - 1 ? "mt-5 border-white/15 text-panel/75" : "mt-5 border-line text-muted"}`}>{a.proof}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** 04 · Two flagship cases, each led by its opening line and its documented result. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="work-title" index="04" label="Selected work" title="Two flagship cases, told as decisions." intro="Context, signal, options, the call, the trade-off, the test, the result, and what I'd do next." />
        <FlagshipList />
      </Container>
    </section>
  );
}

/** The two flagship cases as large cards: the opening line, the summary and the documented result. */
export function FlagshipList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="mt-12 grid gap-6">
          {flagships.map((c) => (
            <li key={c.slug}>
              <article className="group relative grid gap-10 rounded-2xl border border-line bg-panel p-6 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-4 focus-within:ring-offset-background hover:border-line-strong hover:shadow-[0_24px_50px_-30px_rgba(17,17,16,0.25)] sm:p-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Mono className="text-accent">{c.index}</Mono>
                    <Mono className="text-muted">{c.company} · {c.domain} · {c.role}</Mono>
                  </div>
                  <H className="mt-5 font-serif text-[2.4rem] leading-[1.05] text-ink sm:text-5xl">
                    <Link href={c.href} className="stretched-link outline-none group-hover:text-accent">{c.opening}</Link>
                  </H>
                  <p className="mt-3 font-mono text-xs tracking-[0.04em] text-muted">{c.title}</p>
                  <p className="mt-5 max-w-xl text-base leading-7 text-ink/80">{c.summary}</p>
                  <p className="mt-auto pt-8 inline-flex items-center gap-2 text-sm text-ink">Read the case <Arrow /></p>
                </div>
                <div className="grid content-start gap-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  {c.deltas.map((id) => <Delta key={id} id={id} size="md" />)}
                </div>
              </article>
            </li>
          ))}
        </ol>
  );
}

/** 05 · Smaller calls in one grammar, including the one that was sunset. */
export function DecisionsPreview() {
  const featured = decisions.filter((d) => d.featured);
  return (
    <section id="decisions" aria-labelledby="decisions-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader id="decisions-title" index="05" label="Decisions" title="Smaller calls, same discipline." intro="Including the feature I sunset, and the experiments that didn't win." />
          <MoreLink href="/decisions">All {decisions.length} decisions</MoreLink>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {featured.map((d) => (
            <li key={d.id} className="flex flex-col bg-panel p-6 sm:p-8">
              <div className="flex flex-1 flex-col"><DecisionCard d={d} variant="compact" /></div>
              <Link href={`/decisions#${d.id}`} className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                The full decision<span className="sr-only">: {d.title}</span> <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** 06 · AI, framed as a product system, with honest status on every build. */
export function AiLabTeaser() {
  const build = aiLab.builds[0];
  return (
    <section id="ai" aria-labelledby="ai-title" className="on-dark scroll-mt-20 border-b border-line bg-dark py-16 text-panel lg:py-24">
      <Container>
        <SectionHeader id="ai-title" index="06" label="AI Lab" title={aiLab.headline} intro={aiLab.sub} tone="dark" />
        <ol aria-label="How every AI build is framed" className="mt-10 flex flex-wrap gap-2">
          {aiLab.spine.map((s, i) => (
            <li key={s} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-panel/80 uppercase">
              <span className="rounded-full border border-white/20 px-3 py-1.5">{s}</span>
              {i < aiLab.spine.length - 1 ? <span aria-hidden className="text-panel/40">→</span> : null}
            </li>
          ))}
        </ol>
        <article className="group relative mt-10 grid gap-6 rounded-2xl border border-white/12 bg-ink-raised p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <Mono className="text-accent-soft/80">{build.status}</Mono>
            <h3 className="mt-4 font-serif text-4xl leading-tight">
              <Link href={build.href} className="stretched-link outline-none group-hover:text-accent-soft">{build.title}</Link>
            </h3>
            <p className="mt-4 text-sm leading-6 text-panel/70">{build.statusNote}</p>
          </div>
          <dl className="grid gap-3 text-sm leading-6">
            {build.spine.slice(0, 4).map((s) => (
              <div key={s.term} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt><Mono className="text-accent-soft/80">{s.term}</Mono></dt>
                <dd className="text-panel/85">{s.text}</dd>
              </div>
            ))}
          </dl>
        </article>
        <p className="mt-8"><MoreLink href="/ai-lab" tone="dark">Inside the AI Lab</MoreLink></p>
      </Container>
    </section>
  );
}

/** 07 · Four principles, each with a receipt. */
export function ApproachTeaser() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader id="approach-title" index="07" label="Approach" title="Four principles, each with a receipt." />
          <MoreLink href="/approach">The approach</MoreLink>
        </div>
        <ol className="mt-12 grid border-t border-ink md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.n} className="flex flex-col border-b border-line py-7 md:odd:pr-10 md:even:border-l md:even:pl-10">
              <Mono className="text-accent">{p.n}</Mono>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{p.body}</p>
              <Link href={p.example.href} className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-ink uppercase underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                {p.example.label} <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** 08 · The human, briefly, and every way to get in touch. */
export function AboutContact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <SectionHeader index="08" label="About" title={about.opening} intro={about.intro} />
          <p className="mt-6"><MoreLink href="/about">The full story</MoreLink></p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
          <h2 id="contact-title" className="font-serif text-3xl leading-tight text-ink">Hiring for a product role? Let&apos;s talk.</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Open to {contact.lookingFor}. Delhi NCR, and Mumbai where it makes sense.</p>
          <div className="mt-6"><CopyEmail email={contact.email} /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <a href={`mailto:${contact.email}`} className={`${button.primary} px-4`}>Email</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className={`${button.secondary} px-4`}>LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>
            <ResumeCta label="Resume" className={`${button.secondary} px-4`} />
          </div>
        </div>
      </Container>
    </section>
  );
}
