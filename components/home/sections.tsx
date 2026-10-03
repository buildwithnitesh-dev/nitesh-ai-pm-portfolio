import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Trace, type StepKind } from "@/components/trace";
import { Arrow, MoreLink, SectionHeader, StatusLabel, button } from "@/components/ui";
import { buildSpec, type BuildStatus } from "@/content/ai-diagnostic";
import { aiLab, arc, contact, decisions, domains, flagships, sunsetStory } from "@/content/portfolio";
import { CopyEmail } from "./copy-email";

/** 03 · The same capabilities, proved in two consumer domains. */
export function DomainTransfer() {
  return (
    <section id="range" aria-labelledby="range-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="range-title" index="03" label="Range" title="Same PM. Different domains." intro="Eight consumer-growth capabilities, each with evidence from real-money gaming and from EdTech. Every line links to the story and its caveats." />
        <table className="mt-12 hidden w-full table-fixed border-t border-ink text-left md:table">
          <caption className="sr-only">Each capability with evidence from gaming and from EdTech</caption>
          <colgroup><col className="w-[12rem]" /><col /><col /></colgroup>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-3 pr-6 text-[13px] font-medium text-muted">Capability</th>
              <th scope="col" className="py-3 pr-8 text-[13px] font-medium text-muted">Gaming <span className="font-normal">· Witzeal, Baazi Games</span></th>
              <th scope="col" className="py-3 text-[13px] font-medium text-muted">EdTech <span className="font-normal">· Edfora</span></th>
            </tr>
          </thead>
          <tbody>
            {domains.map((d) => (
              <tr key={d.capability} className="border-b border-line align-baseline">
                <th scope="row" className="py-4 pr-6 text-[17px] font-bold tracking-[-0.01em] text-ink">{d.capability}</th>
                <td className="py-4 pr-8"><EvidenceLink {...d.gaming} /></td>
                <td className="py-4"><EvidenceLink {...d.edtech} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <ol className="mt-10 border-t border-ink md:hidden">
          {domains.map((d) => (
            <li key={d.capability} className="border-b border-line py-5">
              <p className="text-[17px] font-bold text-ink">{d.capability}</p>
              <dl className="mt-2 grid gap-2">
                <div><dt className="text-[13px] font-medium text-muted">Gaming</dt><dd><EvidenceLink {...d.gaming} /></dd></div>
                <div><dt className="text-[13px] font-medium text-muted">EdTech</dt><dd><EvidenceLink {...d.edtech} /></dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function EvidenceLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="group text-[15px] leading-6 text-ink decoration-accent/40 underline-offset-4 hover:text-accent hover:underline">
      {text}<span aria-hidden className="ml-1.5 text-subtle transition-colors group-hover:text-accent">→</span>
    </Link>
  );
}

/** 04 · The career as a transformation, not a timeline: what each phase taught, and one proof. */
export function CareerArc() {
  return (
    <section id="arc" aria-labelledby="arc-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <SectionHeader id="arc-title" index="04" label="Career" title="Six phases. Each added a layer of the job." intro="How software gets built, how it ships, how users behave, how growth works, how a product adapts to each person. AI is the next application of the same discipline." />
        <ol className="mt-12">
          {arc.map((a, i) => {
            const last = i === arc.length - 1;
            return (
              <li key={a.verb} className="grid gap-2 border-t border-line py-7 md:grid-cols-[7rem_13rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
                <p className={`text-[15px] tabular-nums ${last ? "font-semibold text-accent" : "text-muted"}`}>{a.years}</p>
                <div>
                  <h3 className={`font-serif text-3xl leading-none ${last ? "text-accent" : "text-ink"}`}>{a.verb}</h3>
                  <p className="mt-1.5 text-sm text-muted">{a.org} · {a.field}</p>
                </div>
                <p className="text-base leading-7 text-ink">{a.taught}</p>
                <p className="text-[15px] leading-7 text-muted">{a.proof}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 02 · Three stories, each drawn as signal → decision → outcome. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-b border-line py-16 lg:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader id="work-title" index="02" label="Selected work" title="Three decisions, with the evidence behind them." intro="A strategic trade-off, an activation fix and a personalization system: how I found the problem, made the call, and what the evidence does and doesn't prove." />
          <MoreLink href="/decisions">All {decisions.length} decisions</MoreLink>
        </div>
        <WorkStories />
      </Container>
    </section>
  );
}

type Story = {
  key: string; index: string; capability: string; headline: string; meta: string; href: string; cta: string;
  summary: string; signal: string; decision: string; outcome: React.ReactNode;
};

/** The flagship cases (and, on /work, the sunset), as editorial entries rather than cards. */
export function WorkStories({ headingLevel = "h3", withSummary = false, withSunset = false }: { headingLevel?: "h2" | "h3"; withSummary?: boolean; withSunset?: boolean }) {
  const H = headingLevel;
  const s = sunsetStory;
  const stories: Story[] = [
    ...flagships.map((c) => ({
      key: c.slug, index: c.index, capability: c.capability, headline: c.headline, meta: `${c.company} · ${c.domain} · ${c.role}`, href: c.href, cta: "Read the case",
      summary: c.summary, signal: c.opening, decision: c.decision, outcome: <Delta id={c.delta} size="sm" showContext={false} />,
    })),
    ...(withSunset ? [{
      key: "fanblaze", index: "04", capability: s.capability, headline: s.headline, meta: `${s.company} · ${s.product} · ${s.domain} · ${s.role}`, href: s.href, cta: "Read the decision",
      summary: s.summary, signal: s.opening, decision: s.decision,
      outcome: (
        <div>
          <p className="text-3xl font-bold tracking-[-0.03em] proportional-nums">{s.figure.value}</p>
          <p className="mt-1 text-[15px] leading-6">{s.figure.label}</p>
          <p className="text-[13px] leading-5 text-muted">{s.figure.basis}. {s.opportunity}</p>
        </div>
      ),
    }] : []),
  ];
  return (
    <ol className="mt-12">
      {stories.map((st) => (
        <li key={st.key}>
          <article className="group relative grid gap-8 border-t border-ink py-10 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:gap-14">
            <div className="flex flex-col">
              <p className="text-[15px] font-semibold text-accent"><span className="tabular-nums text-subtle">{st.index}</span>&nbsp;&nbsp;{st.capability}</p>
              <H className="mt-3 font-serif text-[2.1rem] leading-[1.02] text-ink sm:text-[2.6rem]">
                <Link href={st.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{st.headline}</Link>
              </H>
              <p className="mt-3 text-sm text-muted">{st.meta}</p>
              {withSummary ? <p className="mt-5 text-base leading-7 text-ink/80">{st.summary}</p> : null}
              <p className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-medium text-accent">{st.cta} <Arrow /></p>
            </div>
            <Trace
              className="md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.2fr)]"
              steps={[
                { kind: "signal", content: st.signal },
                { kind: "decision", content: st.decision },
                { kind: "outcome", content: st.outcome },
              ]}
            />
          </article>
        </li>
      ))}
    </ol>
  );
}

/** 05 · AI as a product system, with the build's honest status at a glance. */
export function AiLabTeaser() {
  const build = aiLab.builds[0];
  const order: BuildStatus[] = ["Implemented", "Designed", "Planned", "Needs input"];
  return (
    <section id="ai" aria-labelledby="ai-title" className="scroll-mt-20 border-b border-line bg-stone py-16 lg:py-24">
      <Container>
        <SectionHeader id="ai-title" index="05" label="AI" title={aiLab.headline} intro="The model is the last decision, not the first: a deterministic baseline, an evaluation and a quality gate come before it, and sometimes the answer is not to ship it." />
        <FieldExample className="mt-10" />
        <article className="group relative mt-14 grid gap-8 border-t border-ink pt-8 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-[13px] font-medium text-muted">{build.status}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              <Link href={build.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{build.title}</Link>
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-muted">{build.statusNote}</p>
          </div>
          <ul aria-label="Build status" className="grid content-start gap-4">
            {order.map((st) => {
              const parts = buildSpec.filter((x) => x.status === st).map((x) => x.part);
              return (
                <li key={st} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <StatusLabel status={st} />
                  <p className={`text-[15px] leading-6 ${st === "Implemented" || st === "Designed" ? "text-ink" : "text-muted"}`}>{parts.join(" · ")}</p>
                </li>
              );
            })}
          </ul>
        </article>
        <p className="mt-10"><MoreLink href="/ai-lab">Inside the AI Lab</MoreLink></p>
      </Container>
    </section>
  );
}

/** The real-world AI judgment call: an AI option weighed against a quality gate, and not shipped. */
export function FieldExample({ className = "" }: { className?: string }) {
  const f = aiLab.field;
  return (
    <section aria-labelledby="field-title" className={`border-t border-ink pt-8 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id="field-title" className="font-serif text-2xl text-ink sm:text-3xl">{f.title}</h3>
        <p className="text-[13px] font-medium text-muted">{f.context}</p>
      </div>
      <Trace className="mt-7" steps={f.steps.map((x) => ({ kind: x.kind as StepKind, content: x.text }))} />
      <p className="mt-6"><MoreLink href={f.href}>Read the case</MoreLink></p>
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
        <div className="border-t border-ink pt-8">
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
