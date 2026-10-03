import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Trace } from "@/components/trace";
import { Arrow, MoreLink, SectionHeader, button } from "@/components/ui";
import { about, aiLab, arc, contact, decisions, deltas, domainMap, proof, work } from "@/content/portfolio";
import { CopyEmail } from "./copy-email";

/** Shared section rhythm: intentional whitespace, no empty screens. */
const section = "scroll-mt-20 border-b border-line py-12 lg:py-16";

/** 01 · The four strongest defensible results, each with how it was measured. Sits directly under the hero. */
export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="scroll-mt-20 border-b border-line">
      <Container className="pb-10 lg:pb-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t-2 border-ink pt-4">
          <h2 id="proof-title" className="flex items-center gap-3 text-[13px] font-medium text-accent"><span className="tabular-nums text-subtle">01</span>Proof</h2>
          <p className="text-[13px] text-muted">Each number keeps how it was measured.</p>
        </div>
        <ol className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(({ id, capability }) => {
            const d = deltas[id];
            return (
              <li key={id} className="flex flex-col border-t border-line py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <p className="text-[13px] font-medium text-accent">{capability}</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[2rem] leading-none lg:text-[1.6rem] xl:text-[1.85rem] font-bold tracking-[-0.03em] whitespace-nowrap proportional-nums">
                  {d.before ? <><span className="text-subtle">{d.before}</span><span aria-hidden className="text-xl font-normal text-subtle">→</span></> : null}
                  <span className="text-ink">{d.after}</span>
                </p>
                <p className="mt-2 text-[15px] leading-6 font-medium text-ink">{d.label}</p>
                <p className="mt-1 text-[13px] leading-5 text-muted">{d.method} · {d.context}</p>
                {d.note ? <p className="mt-1 text-[13px] leading-5 text-accent">{d.note}</p> : null}
                <p className="mt-auto pt-3"><Link href={d.href} className="inline-flex min-h-11 items-center text-[13px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">The story behind it<span className="sr-only">: {d.label}</span>&nbsp;→</Link></p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 02 · Selected work, in the order a hiring manager should read it. */
export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className={section}>
      <Container>
        <SectionHeader id="work-title" index="02" label="Selected work" title="Four cases, each a decision." intro="Deep case studies, ordered by what they show. Each one reads Signal → Decision → Outcome, and says what the evidence does and doesn't prove." />
        <WorkStories />
      </Container>
    </section>
  );
}

/** The four cases as editorial entries rather than cards. */
export function WorkStories({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="mt-8">
      {work.map((w) => (
        <li key={w.slug}>
          <article className="group relative grid gap-6 border-t border-ink py-8 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:gap-14">
            <div className="flex flex-col">
              <p className="text-[15px] font-semibold text-accent"><span className="tabular-nums text-subtle">{w.index}</span>&nbsp;&nbsp;{w.short}</p>
              <H className="mt-2 font-serif text-[1.9rem] leading-[1.04] text-ink sm:text-[2.4rem]">
                <Link href={w.href} className="stretched-link outline-none transition-colors group-hover:text-accent">{w.headline}</Link>
              </H>
              <p className="mt-2 text-sm text-muted">{w.product ? `${w.company} · ${w.product}` : w.company} · {w.domain} · {w.role}</p>
              <p className="mt-3 text-[13px] font-medium text-ink/80">{w.positioning.join(" · ")}</p>
              <p className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-medium text-accent">Read the case <Arrow /></p>
            </div>
            <Trace
              steps={[
                { kind: "signal", content: w.signal },
                { kind: "decision", content: w.decision },
                { kind: "outcome", content: <Delta id={w.delta} size="sm" showContext={false} /> },
              ]}
            />
          </article>
        </li>
      ))}
    </ol>
  );
}

/** 03 · The same capabilities, applied in gaming and in EdTech. The evidence makes the case. */
export function Domains() {
  return (
    <section id="domains" aria-labelledby="domains-title" className={section}>
      <Container>
        <SectionHeader id="domains-title" index="03" label="Capabilities" title="Same PM. Different domains." intro="Eight consumer-product capabilities, each with evidence from real-money gaming and from EdTech." />
        {/* Wide screens: a three-column comparison. Phones: one block per capability. */}
        <div className="mt-8 hidden md:block">
          <table className="w-full table-fixed text-left">
            <caption className="sr-only">Each capability with its evidence in gaming and in EdTech</caption>
            <thead>
              <tr className="border-y-2 border-ink">
                <th scope="col" className="w-[13rem] py-3 pr-6 text-[13px] font-medium text-muted">Capability</th>
                <th scope="col" className="py-3 pr-8 text-[13px] font-medium text-muted">Gaming · Baazi Games, Witzeal</th>
                <th scope="col" className="py-3 text-[13px] font-medium text-muted">EdTech · Edfora</th>
              </tr>
            </thead>
            <tbody>
              {domainMap.map((r) => (
                <tr key={r.capability} className="border-b border-line align-top">
                  <th scope="row" className="py-3.5 pr-6 font-serif text-xl font-normal text-ink">{r.capability}</th>
                  <td className="py-3.5 pr-8"><Evidence e={r.gaming} /></td>
                  <td className="py-3.5"><Evidence e={r.edtech} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="mt-8 border-t-2 border-ink md:hidden">
          {domainMap.map((r) => (
            <li key={r.capability} className="border-b border-line py-4">
              <h3 className="font-serif text-xl text-ink">{r.capability}</h3>
              <dl className="mt-2 grid gap-2">
                <div><dt className="text-[13px] font-medium text-muted">Gaming</dt><dd className="mt-0.5"><Evidence e={r.gaming} /></dd></div>
                <div><dt className="text-[13px] font-medium text-muted">EdTech</dt><dd className="mt-0.5"><Evidence e={r.edtech} /></dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Evidence({ e }: { e: { text: string; href: string } }) {
  return (
    <Link href={e.href} className="inline text-[15px] leading-6 text-ink underline decoration-line-strong decoration-1 underline-offset-4 hover:text-accent hover:decoration-accent">
      {e.text}
    </Link>
  );
}

/** 04 · Short product-judgment snapshots, distinct from the deep cases. */
export function Decisions() {
  const featured = decisions.filter((d) => d.featured);
  return (
    <section id="decisions" aria-labelledby="decisions-title" className={section}>
      <Container>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeader id="decisions-title" index="04" label="Decisions" title="Smaller calls, same discipline." intro="Work is the deep case studies. Decisions are short judgment snapshots: the signal, the call, and what came of it." />
          <MoreLink href="/decisions">All {decisions.length} decisions</MoreLink>
        </div>
        <ol className="mt-8">
          {featured.map((d) => {
            const signal = d.stages.find((s) => s.term === "Signal")?.text ?? d.stages[0].text;
            const decision = d.stages.find((s) => s.term === "Decision")?.text ?? "";
            return (
              <li key={d.id} className="group relative grid gap-4 border-t border-line py-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:gap-14">
                <div>
                  <p className="text-[13px] font-medium text-muted"><span className="tabular-nums text-subtle">{d.code}</span>&nbsp;&nbsp;{d.product ? `${d.company} · ${d.product}` : d.company} · {d.area}</p>
                  <h3 className="mt-1.5 font-serif text-2xl leading-snug text-ink">
                    <Link href={`/decisions#${d.id}`} className="stretched-link outline-none transition-colors group-hover:text-accent">{d.title}</Link>
                  </h3>
                </div>
                <Trace steps={[{ kind: "signal", content: signal }, { kind: "decision", content: decision }, { kind: "outcome", content: d.outcome ?? "" }]} />
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 05 · AI as product judgment: where it belongs, where it doesn't, and what is honestly built so far. */
export function AiLabTeaser() {
  const build = aiLab.builds[0];
  return (
    <section id="ai" aria-labelledby="ai-title" className={`${section} bg-stone`}>
      <Container>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeader id="ai-title" index="05" label={aiLab.label} title={aiLab.headline} intro={aiLab.sub} />
          <MoreLink href="/ai-lab">Inside the AI Lab</MoreLink>
        </div>
        <ul className="mt-8 grid border-t-2 border-ink sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {aiLab.judgment.map((j) => (
            <li key={j.practice} className="border-b border-line py-4">
              <Link href={j.href} className="group block">
                <p className="text-[13px] font-medium text-muted">{j.kind}</p>
                <p className="mt-1 text-[17px] font-semibold text-ink group-hover:text-accent">{j.practice}</p>
                <p className="mt-1 text-[15px] leading-6 text-ink/80">{j.text}</p>
              </Link>
            </li>
          ))}
          <li className="border-b border-line py-4">
            <Link href={build.href} className="group block">
              <p className="text-[13px] font-medium text-muted">{build.status}</p>
              <p className="mt-1 text-[17px] font-semibold text-ink group-hover:text-accent">{build.title} <Arrow /></p>
              <p className="mt-1 text-[15px] leading-6 text-ink/80">No real users, no model results; the evaluation hasn&apos;t been run.</p>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}

/** 06 · The career as a transformation: engineer → builder → growth PM → senior PM → AI product thinker. */
export function CareerArc() {
  return (
    <section id="career" aria-labelledby="career-title" className={section}>
      <Container>
        <SectionHeader id="career-title" index="06" label="Career" title="Engineer → builder → growth PM → senior PM → AI product thinker." />
        <ol className="mt-8">
          {arc.map((a, i) => {
            const last = i === arc.length - 1;
            return (
              <li key={a.verb} className="grid gap-1.5 border-t border-line py-5 md:grid-cols-[6.5rem_14rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8">
                <p className={`text-[15px] tabular-nums ${last ? "font-semibold text-accent" : "text-muted"}`}>{a.years}</p>
                <div>
                  <h3 className={`font-serif text-2xl leading-none sm:text-[1.7rem] ${last ? "text-accent" : "text-ink"}`}>{a.verb}</h3>
                  <p className="mt-1 text-sm text-muted">{a.org}</p>
                </div>
                <p className="text-base leading-7 text-ink">{a.taught}</p>
                <p className="text-[15px] leading-6 text-muted">{a.proof}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** 07 · The person, briefly; the full story is on /about. */
export function AboutTeaser() {
  return (
    <section id="about" aria-labelledby="about-title" className={section}>
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <SectionHeader id="about-title" index="07" label="About" title={about.opening} />
        <div>
          <p className="text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">{about.intro}</p>
          <p className="mt-4"><MoreLink href="/about">About me, and how I work</MoreLink></p>
        </div>
      </Container>
    </section>
  );
}

/** 08 · Every way to get in touch. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-12 lg:py-16">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <SectionHeader id="contact-title" index="08" label="Contact" title="Hiring for a product role? Let's talk." intro={`Open to ${contact.lookingFor}. Delhi NCR, and Mumbai where it makes sense.`} />
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
