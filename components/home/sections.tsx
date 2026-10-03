import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Arrow, Mono, MoreLink, SectionHeader, StatusLabel, button } from "@/components/ui";
import { buildSpec, type BuildStatus } from "@/content/ai-diagnostic";
import { aiLab, arc, contact, decisions, flagships, proofWall, sunsetStory } from "@/content/portfolio";
import { CopyEmail } from "./copy-email";

/** 02 · Three levers beyond the stories, each at the weight its evidence supports. */
export function ProofWall() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="proof-title" index="02" label="Proof" title="Incentives, experiments and risk." intro="Three levers I've worked beyond the stories below, each with how it was measured." />
        <ol className="mt-12 border-t border-ink">
          {proofWall.map((p) => {
            const headline = p.weight === "headline";
            return (
              <li key={p.capability} className="grid gap-3 border-b border-line py-8 md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,0.75fr)] md:items-baseline md:gap-10">
                <p className="font-serif text-3xl text-ink">{p.capability}</p>
                <p className="text-base leading-7 text-ink/85">
                  {p.value ? <span className={`mr-2 font-sans font-semibold tracking-tight tabular-nums ${headline ? "text-4xl text-ink" : "text-2xl text-muted"}`}>{p.value}</span> : null}
                  {p.claim}.
                </p>
                <div className="text-xs leading-5 text-muted">
                  <p>{p.basis} · {p.context}</p>
                  <p className="mt-1"><Link href={p.href} className="inline-flex min-h-6 items-center text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">The decision behind it<span className="sr-only">: {p.capability}</span>&nbsp;→</Link></p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 04 · The career as a transformation, not a timeline: what each phase taught, and one proof. */
export function CareerArc() {
  return (
    <section id="arc" aria-labelledby="arc-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="arc-title" index="04" label="Career" title="Six phases. Each added a layer of the job." intro="How software gets built, how it ships, how users behave, how growth works, how a product adapts to each person. AI is the next application of the same discipline." />
        <p aria-hidden className="mt-6 font-mono text-xs tracking-[0.08em] text-accent">Built → Shipped → Measured → Grew → Personalized → AI</p>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {arc.map((a, i) => {
            const last = i === arc.length - 1;
            return (
              <li key={a.verb} className={`flex flex-col p-6 sm:p-7 ${last ? "bg-dark text-panel" : "bg-panel"}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <Mono className={last ? "text-accent-soft/80" : "text-accent"}>{String(i + 1).padStart(2, "0")} · {a.field}</Mono>
                  <Mono className={last ? "text-panel/50" : "text-subtle"}>{a.years}</Mono>
                </div>
                <h3 className={`mt-4 font-serif text-4xl leading-none ${last ? "text-panel" : "text-ink"}`}>{a.verb}</h3>
                <p className={`mt-1 text-sm ${last ? "text-panel/70" : "text-muted"}`}>{a.org}</p>
                <p className={`mt-5 text-base leading-7 ${last ? "text-panel" : "text-ink"}`}>{a.taught}</p>
                <p className={`mt-auto border-t pt-4 text-sm leading-6 ${last ? "mt-5 border-white/15 text-panel/75" : "mt-5 border-line text-muted"}`}>{a.proof}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 03 · Three stories, three capabilities: find the problem, make the call, know what the evidence proves. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader id="work-title" index="03" label="Selected work" title="Three stories, three capabilities." intro="How I find the problem, make the call, and say what the evidence does and doesn't prove." />
          <MoreLink href="/decisions">All {decisions.length} decisions</MoreLink>
        </div>
        <WorkStories />
      </Container>
    </section>
  );
}

const card = "group relative grid gap-10 rounded-2xl border border-line bg-panel p-6 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-4 focus-within:ring-offset-background hover:border-line-strong hover:shadow-[0_24px_50px_-30px_rgba(17,17,16,0.25)] sm:p-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14";

/** The two flagship cases and the sunset, as large capability-first cards. */
export function WorkStories({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const s = sunsetStory;
  return (
    <ol className="mt-12 grid gap-6">
      {flagships.map((c) => (
        <li key={c.slug}>
          <article className={card}>
            <div className="flex flex-col">
              <p className="text-base text-accent"><span className="font-mono text-sm text-subtle">{c.index}</span>&nbsp;&nbsp;{c.capability}</p>
              <H className="mt-4 font-serif text-[2.4rem] leading-[1.05] text-ink sm:text-5xl">
                <Link href={c.href} className="stretched-link outline-none group-hover:text-accent">{c.headline}</Link>
              </H>
              <p className="mt-3 text-sm text-muted">{c.company} · {c.domain} · {c.role}</p>
              <p className="mt-6 font-serif text-2xl leading-snug text-ink">{c.opening}</p>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink/80">{c.summary}</p>
              <p className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-ink">Read the case <Arrow /></p>
            </div>
            <div className="grid content-start gap-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <Delta id={c.delta} size="md" showContext={false} />
            </div>
          </article>
        </li>
      ))}
      <li>
        <article className={card}>
          <div className="flex flex-col">
            <p className="text-base text-accent"><span className="font-mono text-sm text-subtle">{s.index}</span>&nbsp;&nbsp;{s.capability}</p>
            <H className="mt-4 font-serif text-[2.4rem] leading-[1.05] text-ink sm:text-5xl">
              <Link href={s.href} className="stretched-link outline-none group-hover:text-accent">{s.headline}</Link>
            </H>
            <p className="mt-3 text-sm text-muted">{s.company} · {s.product} · {s.domain} · {s.role}</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink">{s.opening}</p>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink/80">{s.summary}</p>
            <p className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-ink">Read the decision <Arrow /></p>
          </div>
          <div className="grid content-start gap-6 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div>
              <p className="text-sm text-accent">Live scores, usage</p>
              <p className="mt-2 font-sans text-4xl font-semibold tracking-tight text-ink tabular-nums sm:text-[2.75rem]">{s.figure.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink/85">{s.figure.label}</p>
              <p className="font-mono text-[11px] leading-5 tracking-[0.04em] text-muted">{s.figure.basis}</p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="text-sm text-muted">Opportunity cost</p>
              <p className="mt-2 text-sm leading-6 text-ink/85">{s.opportunity}</p>
            </div>
          </div>
        </article>
      </li>
    </ol>
  );
}

/** 05 · AI as a product system, with the build's honest status at a glance. */
export function AiLabTeaser() {
  const build = aiLab.builds[0];
  const order: BuildStatus[] = ["Implemented", "Designed", "Planned", "Needs input"];
  return (
    <section id="ai" aria-labelledby="ai-title" className="on-dark scroll-mt-20 border-b border-line bg-dark py-16 text-panel lg:py-24">
      <Container>
        <SectionHeader id="ai-title" index="05" label="AI Lab" title={aiLab.headline} intro={aiLab.sub} tone="dark" />
        <article className="group relative mt-10 grid gap-8 rounded-2xl border border-white/12 bg-ink-raised p-6 focus-within:ring-2 focus-within:ring-accent-soft focus-within:ring-offset-4 focus-within:ring-offset-dark sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <Mono className="text-accent-soft/80">{build.status}</Mono>
            <h3 className="mt-4 font-serif text-4xl leading-tight">
              <Link href={build.href} className="stretched-link outline-none group-hover:text-accent-soft">{build.title}</Link>
            </h3>
            <p className="mt-4 text-sm leading-6 text-panel/70">{build.statusNote}</p>
          </div>
          <ul aria-label="Build status" className="grid content-start gap-4">
            {order.map((st) => {
              const parts = buildSpec.filter((x) => x.status === st).map((x) => x.part);
              return (
                <li key={st} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <StatusLabel status={st} tone="dark" />
                  <p className={`text-sm leading-6 ${st === "Implemented" || st === "Designed" ? "text-panel/85" : "text-panel/55"}`}>{parts.join(" · ")}</p>
                </li>
              );
            })}
          </ul>
        </article>
        <p className="mt-8"><MoreLink href="/ai-lab" tone="dark">Inside the AI Lab</MoreLink></p>
      </Container>
    </section>
  );
}

/** 06 · Every way to get in touch, and a path to the person behind the work. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <div>
          <SectionHeader id="contact-title" index="06" label="Contact" title="Hiring for a product role? Let's talk." intro={`Open to ${contact.lookingFor}. Delhi NCR, and Mumbai where it makes sense.`} />
          <p className="mt-6"><MoreLink href="/about">About me, and how I work</MoreLink></p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
          <CopyEmail email={contact.email} />
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
