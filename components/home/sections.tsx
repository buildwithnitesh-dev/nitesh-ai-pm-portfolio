import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { StageMarker, Trace, type StepKind } from "@/components/trace";
import { VerdictTag } from "@/components/decision-card";
import { Arrow, MoreLink, SectionHeader, StatusLabel, button } from "@/components/ui";
import { buildSpec, type BuildStatus } from "@/content/ai-diagnostic";
import { about, aiLab, arc, contact, decisions, deltas, domains, flagships, technical, type DeltaId } from "@/content/portfolio";
import { CopyEmail } from "./copy-email";

/** 03 · The same capabilities, proved in two consumer domains. */
export function DomainTransfer() {
  return (
    <section id="range" aria-labelledby="range-title" className="scroll-mt-20 border-b border-line py-10 lg:py-14">
      <Container>
        <SectionHeader compact id="range-title" index="03" label="Range" title="Same PM. Different domains." intro="Eight consumer-growth capabilities, each proved in real-money gaming and in EdTech. Every line links to its evidence." />
        <table className="mt-7 hidden w-full table-fixed border-t border-ink text-left md:table">
          <caption className="sr-only">Each capability with evidence from gaming and from EdTech</caption>
          <colgroup><col className="w-[12rem]" /><col /><col /></colgroup>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2.5 pr-6 text-[13px] font-medium text-muted">Capability</th>
              <th scope="col" className="py-2.5 pr-8 text-[13px] font-medium text-muted">Gaming <span className="font-normal">· Witzeal, Baazi Games</span></th>
              <th scope="col" className="py-2.5 text-[13px] font-medium text-muted">EdTech <span className="font-normal">· Edfora</span></th>
            </tr>
          </thead>
          <tbody>
            {domains.map((d) => (
              <tr key={d.capability} className="border-b border-line align-baseline">
                <th scope="row" className="py-3 pr-6 text-[16px] font-bold tracking-[-0.01em] text-ink">{d.capability}</th>
                <td className="py-3 pr-8"><EvidenceLink {...d.gaming} /></td>
                <td className="py-3"><EvidenceLink {...d.edtech} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <ol className="mt-6 border-t border-ink md:hidden">
          {domains.map((d) => (
            <li key={d.capability} className="border-b border-line py-3.5">
              <p className="text-[16px] font-bold text-ink">{d.capability}</p>
              <dl className="mt-1 grid gap-1">
                <div><dt className="inline text-[13px] font-medium text-muted">Gaming · </dt><dd className="inline"><EvidenceLink {...d.gaming} /></dd></div>
                <div><dt className="inline text-[13px] font-medium text-muted">EdTech · </dt><dd className="inline"><EvidenceLink {...d.edtech} /></dd></div>
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

/** 06 · The career as a transformation, not a timeline: what each phase taught, and one proof. */
export function CareerArc() {
  return (
    <section id="arc" aria-labelledby="arc-title" className="scroll-mt-20 border-b border-line py-10 lg:py-14">
      <Container>
        <SectionHeader compact id="arc-title" index="06" label="Career" title="Six phases. Each added a layer of the job." />
        <ol className="mt-7">
          {arc.map((a, i) => {
            const last = i === arc.length - 1;
            return (
              <li key={a.verb} className="grid gap-x-4 gap-y-1 border-t border-line py-4 grid-cols-[5.5rem_minmax(0,1fr)] md:grid-cols-[7rem_13rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-x-8">
                <p className={`text-[15px] tabular-nums ${last ? "font-semibold text-accent" : "text-muted"}`}>{a.years}</p>
                <div>
                  <h3 className={`font-serif text-2xl leading-none ${last ? "text-accent" : "text-ink"}`}>{a.verb}</h3>
                  <p className="mt-1 text-sm text-muted">{a.org} · {a.field}</p>
                </div>
                <p className="col-start-2 text-[15px] leading-6 text-ink md:col-start-auto">{a.taught}</p>
                <p className="col-start-2 text-[15px] leading-6 text-muted md:col-start-auto">{a.proof}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/**
 * 02 · The homepage index of the four flagship stories: proof and curiosity,
 * not the cases themselves. Doubt Resolution leads with its result and the AI
 * judgment call; the other three are one ruled row each. Depth lives on /work.
 */
export function SelectedWork() {
  const [lead, ...rest] = flagships;
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 border-b border-line pt-8 pb-10 lg:pt-10 lg:pb-14">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <SectionHeader compact id="work-title" index="02" label="Selected work" title="Four product stories, in depth." />
          <MoreLink href="/work">All work</MoreLink>
        </div>

        {/* The hero already carries this story's result; here it leads with the decision. */}
        <article className="group relative mt-6 border-t border-ink pt-6 pb-7 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent">
          <div className="grid gap-x-14 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-end">
            <div>
              <p className="text-[15px] font-semibold text-accent"><span className="tabular-nums text-subtle">{lead.index}</span>&nbsp;&nbsp;{lead.capability}</p>
              <h3 className="mt-2 font-serif text-[2.2rem] leading-[1.02] text-ink sm:text-[2.9rem]">
                <Link href={lead.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{lead.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{lead.company} · myPAT · {lead.role}</p>
            </div>
            <p className="max-w-xl text-xl leading-snug text-ink">{lead.problem}</p>
          </div>
          <Trace
            wide
            className="mt-6"
            steps={lead.aiPath.map((x) => ({ kind: x.kind as StepKind, label: x.label, content: x.text }))}
          />
          <p aria-hidden className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-accent">The decision behind it <Arrow /></p>
        </article>

        <ol className="border-t border-line">
          {rest.map((c) => (
            <li key={c.slug}>
              <article className="group relative grid gap-3 border-b border-line py-5 focus-within:outline-2 lg:gap-4 lg:py-6 focus-within:outline-offset-4 focus-within:outline-accent lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,0.85fr)] lg:gap-10">
                <div>
                  <p className="text-[13px] font-semibold text-accent"><span className="tabular-nums text-subtle">{c.index}</span>&nbsp;&nbsp;{c.capability}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-tight text-ink sm:text-[1.75rem]">
                    <Link href={c.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{c.title}</Link>
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">{c.company} · {c.domain.replace(/^EdTech · /, "")}</p>
                  <p className="mt-2.5 text-[15px] leading-6 text-ink/85">{c.problem}</p>
                </div>
                <div className="min-[375px]:grid min-[375px]:grid-cols-[5.75rem_minmax(0,1fr)] min-[375px]:gap-x-3 lg:block">
                  <p className="flex h-6 items-center gap-2 text-[13px] font-medium text-accent"><StageMarker kind="decision" />Decision</p>
                  <p className="mt-1 text-[15px] leading-6 text-ink min-[375px]:mt-0 lg:mt-1.5">{c.brief}</p>
                </div>
                <div className="min-[375px]:grid min-[375px]:grid-cols-[5.75rem_minmax(0,1fr)] min-[375px]:gap-x-3 lg:block">
                  <p className="flex h-6 items-center gap-2 text-[13px] font-medium text-muted"><StageMarker kind="outcome" />Evidence</p>
                  <div className="mt-1 min-[375px]:mt-0">
                    {"delta" in c ? <IndexEvidence id={c.delta} /> : <p className="text-[15px] leading-6 text-ink lg:mt-1.5">{c.evidenceShort}</p>}
                    <p aria-hidden className="mt-3 inline-flex items-center gap-2 text-[15px] font-medium text-accent">Read the case <Arrow /></p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** A result as one line of evidence for the index: the change, what it counts, and its caveat. */
function IndexEvidence({ id }: { id: DeltaId }) {
  const d = deltas[id];
  return (
    <div className="lg:mt-1.5">
      <p className="text-2xl font-bold tracking-[-0.03em] proportional-nums text-ink">{d.before ? <><span className="text-subtle">{d.before}</span> <span aria-hidden className="font-normal text-subtle">→</span><span className="sr-only">to</span> </> : null}{d.after}</p>
      <p className="mt-0.5 text-[13px] leading-5 text-muted">{d.label} · {d.method}</p>
      {d.note ? <p className="text-[13px] leading-5 text-accent">{d.note}</p> : null}
    </div>
  );
}

/** The four flagship cases, as editorial entries rather than cards. */
export function WorkStories({ headingLevel = "h3", withSummary = false }: { headingLevel?: "h2" | "h3"; withSummary?: boolean }) {
  const H = headingLevel;
  return (
    <ol className="mt-7">
      {flagships.map((c) => {
        const outcome = "delta" in c
          ? { kind: "outcome" as const, label: "Outcome", content: <Delta id={c.delta} size="sm" showContext={false} /> }
          : { kind: "outcome" as const, label: "Evidence", content: <p>{c.evidence}</p> };
        return (
          <li key={c.slug}>
            <article className="group relative border-t border-ink py-7 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:py-8">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
                <div>
                  <p className="text-[15px] font-semibold text-accent"><span className="tabular-nums text-subtle">{c.index}</span>&nbsp;&nbsp;{c.capability}</p>
                  <H className="mt-2.5 max-w-3xl font-serif text-[2rem] leading-[1.04] text-ink sm:text-[2.5rem]">
                    <Link href={c.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{c.headline}</Link>
                  </H>
                  <p className="mt-3 text-sm text-muted">{c.company} · {c.domain} · {c.role}</p>
                  <p className="mt-1 text-[13px] font-medium text-ink">{c.tags.join(" × ")}</p>
                  {withSummary ? <p className="mt-4 max-w-3xl text-base leading-7 text-ink/80">{c.summary}</p> : null}
                </div>
                <p aria-hidden className="hidden items-center gap-2 text-[15px] font-medium text-accent lg:inline-flex">Read the case <Arrow /></p>
              </div>
              <Trace
                wide
                className="mt-6"
                steps={[
                  { kind: "signal", content: c.opening },
                  { kind: "decision", content: c.decision },
                  { kind: "tradeoff", content: c.tradeoff },
                  outcome,
                ]}
              />
              <p aria-hidden className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-accent lg:hidden">Read the case <Arrow /></p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/** 04 · Short product-judgment snapshots: signal, decision, outcome or learning. */
/** Phones: the stage label sits in a narrow column beside its text instead of on its own line. */
const row = "min-[375px]:grid min-[375px]:grid-cols-[5.75rem_minmax(0,1fr)] min-[375px]:gap-x-3 sm:block";

export function DecisionsTeaser() {
  const pick = ["fanblaze", "experimentation", "myplan-accuracy"].map((id) => decisions.find((d) => d.id === id)!);
  return (
    <section id="decisions" aria-labelledby="decisions-title" className="scroll-mt-20 border-b border-line py-10 lg:py-14">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader compact id="decisions-title" index="04" label="Decisions" title="Smaller calls, same discipline." intro="Snapshots of product judgment, including the bets that were stopped." />
          <MoreLink href="/decisions">All {decisions.length} decisions</MoreLink>
        </div>
        <ol className="mt-7 border-t border-ink">
          {pick.map((d) => {
            const signal = d.stages.find((x) => x.term === "Signal") ?? d.stages[0];
            // The homepage shows the signal's first sentence; the full signal is on /decisions.
            const signalText = signal.text.split(/(?<=\.) /)[0];
            const decision = d.stages.find((x) => x.term === "Decision");
            const end = d.learning ?? d.results?.[0]?.text ?? d.note;
            return (
              <li key={d.id} className="grid gap-2.5 border-b border-line py-5 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <p className="flex items-center gap-2.5 text-[13px] font-medium text-muted"><span className="tabular-nums">{d.code}</span><VerdictTag verdict={d.verdict} />{d.product ?? d.company}</p>
                  <h3 className="mt-2.5 font-serif text-2xl leading-tight text-ink">
                    <Link href={`/decisions#${d.id}`} className="hover:text-accent">{d.title}</Link>
                  </h3>
                </div>
                <dl className="grid gap-2.5 text-[15px] leading-6 sm:grid-cols-3 sm:gap-6">
                  <div className={row}><dt className="flex h-6 items-center gap-2 text-[13px] font-medium text-muted"><StageMarker kind="signal" />Signal</dt><dd className="mt-1 text-ink/85 min-[375px]:mt-0 sm:mt-1">{signalText}</dd></div>
                  {decision ? <div className={row}><dt className="flex h-6 items-center gap-2 text-[13px] font-medium text-accent"><StageMarker kind="decision" />Decision</dt><dd className="mt-1 text-ink min-[375px]:mt-0 sm:mt-1">{decision.text}</dd></div> : null}
                  {end ? <div className={row}><dt className="flex h-6 items-center gap-2 text-[13px] font-medium text-muted"><StageMarker kind={d.learning ? "learning" : "outcome"} />{d.learning ? "Learning" : "Outcome"}</dt><dd className="mt-1 text-ink/85 min-[375px]:mt-0 sm:mt-1">{end}</dd></div> : null}
                </dl>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 07 · The person behind the work, in brief: how the engineering years show up in the product calls. */
export function AboutTeaser() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-b border-line py-10 lg:py-14">
      <Container className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <div>
          <SectionHeader compact id="about-title" index="07" label="About" title={about.opening} intro={about.intro} />
          <p className="mt-5"><MoreLink href="/about">About me, and how I work</MoreLink></p>
        </div>
        <figure className="border-t border-ink pt-5">
          <blockquote className="font-serif text-2xl leading-snug text-ink">“{technical.insight.text}”</blockquote>
          <figcaption className="mt-2 text-[13px] font-medium text-muted">{technical.insight.source}</figcaption>
        </figure>
      </Container>
    </section>
  );
}

/** 05 · AI as a product system, with the build's honest status at a glance. */
export function AiLabTeaser() {
  const build = aiLab.builds[0];
  const order: BuildStatus[] = ["Implemented", "Designed", "Planned", "Needs input"];
  return (
    <section id="ai" aria-labelledby="ai-title" className="scroll-mt-20 border-b border-line bg-stone py-10 lg:py-14">
      <Container>
        <SectionHeader compact id="ai-title" index="05" label="AI" title={aiLab.headline} intro="The model is the last decision, not the first. A deterministic baseline, an evaluation, named failure modes, guardrails and a human override come before it, and sometimes the answer is not to ship it." />
        <p className="mt-6 border-t border-ink pt-5 text-[15px] leading-6 text-ink sm:text-base">
          <span className="font-semibold">In the field.</span> In myPAT doubt resolution, an AI resolver was weighed against a hard 90% accuracy gate and not shipped; a hybrid was.{" "}
          <Link href={aiLab.field.href} className="inline-flex min-h-6 items-center gap-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">The decision behind it<span aria-hidden> →</span></Link>
        </p>
        <article className="group relative mt-7 grid gap-6 border-t border-line pt-6 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-[13px] font-medium text-muted">{build.status}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              <Link href={build.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{build.title}</Link>
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-muted">{build.statusNote}</p>
          </div>
          <ul aria-label="Build status" className="grid content-start gap-2.5">
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
        <p className="mt-7"><MoreLink href="/ai-lab">Inside the AI Lab</MoreLink></p>
      </Container>
    </section>
  );
}

/** The real-world AI judgment call: an AI option weighed against a quality gate, and not shipped. */
export function FieldExample({ className = "" }: { className?: string }) {
  const f = aiLab.field;
  return (
    <section aria-labelledby="field-title" className={`border-t border-ink pt-6 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id="field-title" className="font-serif text-2xl text-ink sm:text-3xl">{f.title}</h3>
        <p className="text-[13px] font-medium text-muted">{f.context}</p>
      </div>
      <Trace className="mt-5" steps={f.steps.map((x) => ({ kind: x.kind as StepKind, content: x.text }))} />
      <p className="mt-5"><MoreLink href={f.href}>Read the case</MoreLink></p>
    </section>
  );
}

/** 08 · Every way to get in touch, and a path to the person behind the work. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-10 lg:py-14">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <div>
          <SectionHeader compact id="contact-title" index="08" label="Contact" title="Hiring for a product role? Let's talk." intro={`Open to ${contact.lookingFor}. Delhi NCR, and Mumbai where it makes sense.`} />
        </div>
        <div className="border-t border-ink pt-6">
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
