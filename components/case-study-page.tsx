import { CaseStudyShell, ChapterList } from "@/components/case-study/shell";
import { EvidenceTag } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { adaptiveAssignmentEngine } from "@/content/case-studies";

export function AdaptiveAssignmentCaseStudy() {
  const c = adaptiveAssignmentEngine;
  return (
    <CaseStudyShell
      meta={{
        slug: "adaptive-assignment-engine",
        type: c.type,
        title: c.title,
        subtitle: c.subtitle,
        focus: c.focus,
        outcome: c.outcome,
        evidence: "verified",
        role: c.role,
        note: `${c.scale}. ${c.confidentiality}`,
      }}
      tldr={c.tldr}
      toc={c.chapters.map(({ id, label }) => ({ id, label }))}
    >
      <ChapterList
        chapters={c.chapters}
        measure="Assignment completion (primary), with practice drop-off as the second signal"
        after={{
          Problem: <FitBand />,
          Options: <Options />,
          Mechanism: <Mechanism />,
          Outcome: <OutcomeTile />,
        }}
      />
    </CaseStudyShell>
  );
}

/** The root cause in one picture: a single sequence cannot fit learners at different readiness. */
function FitBand() {
  const zones = [
    { label: "Too hard", effect: "Frustration and disengagement", tone: "border-line bg-background" },
    { label: "Right fit", effect: "Learner keeps progressing", tone: "border-accent bg-accent-soft", target: true },
    { label: "Too easy", effect: "Low cognitive value", tone: "border-line bg-background" },
  ];
  return (
    <figure aria-label="Two failure modes of a fixed sequence" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">Task difficulty vs. learner readiness</p>
        <EvidenceTag kind="illustrative" />
      </div>
      <ol className="mt-6 grid gap-2 sm:grid-cols-3">
        {zones.map((z) => (
          <li key={z.label} className={`rounded-lg border p-4 ${z.tone}`}>
            <p className={`text-sm font-medium ${z.target ? "text-accent" : "text-ink"}`}>{z.label}</p>
            <p className="mt-1 text-sm leading-5 text-muted">{z.effect}</p>
            {z.target ? <p className="mt-3 text-[11px] tracking-wide text-accent uppercase">Adaptation aims here</p> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-xs leading-5 text-muted">
        A uniform sequence places every learner at the same difficulty, so some land left of the fit and some land right of it.
      </figcaption>
    </figure>
  );
}

/** The realistic options, laid out as product reasoning; the documented direction is marked. */
function Options() {
  const options = [
    {
      name: "Let learners choose their difficulty",
      works: "Simple to build, and gives learners control.",
      fails: "The learners who most need an easier path are the least able to judge it, and it adds a decision before they start.",
    },
    {
      name: "Move learners between bands with rules",
      works: "Easy to build and easy to explain to teachers.",
      fails: "Treats every question as equally informative, so a lucky guess counts the same as real mastery.",
    },
    {
      name: "Estimate ability and match calibrated questions",
      works: "Weighs each answer by how much it actually reveals, and discounts guesses.",
      fails: "Needs calibrated question parameters, and is harder to explain than a sequence.",
      chosen: true,
    },
  ];
  return (
    <figure aria-label="Three options for fixing difficulty fit" className="rounded-xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p aria-hidden className="text-sm font-medium text-ink">Options, and how each one fails</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <ol className="divide-y divide-line">
        {options.map((o, i) => (
          <li key={o.name} className={`grid gap-3 px-5 py-5 sm:px-7 md:grid-cols-[14rem_1fr_1fr] md:gap-8 ${o.chosen ? "bg-accent-soft/50" : ""}`}>
            <div>
              <p className="font-mono text-[11px] text-subtle">{String.fromCharCode(65 + i)}</p>
              <p className="mt-1 font-serif text-xl leading-snug text-ink">{o.name}</p>
              {o.chosen ? <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-accent"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />Direction taken</p> : null}
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Works because</p>
              <p className="mt-1 text-sm leading-6 text-ink/85">{o.works}</p>
            </div>
            <div>
              <p className={`font-mono text-[11px] tracking-[0.14em] uppercase ${o.chosen ? "text-accent" : "text-muted"}`}>{o.chosen ? "Costs" : "Fails because"}</p>
              <p className="mt-1 text-sm leading-6 text-ink/85">{o.fails}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/**
 * The mechanism in one picture: a learner's ability estimate (with its
 * uncertainty) on a difficulty scale, and candidate questions described by
 * difficulty, discrimination and guessing. Positions are illustrative.
 */
function Mechanism() {
  const ability = { at: 48, low: 38, high: 58 };
  const questions = [
    { id: "Q1", at: 14, disc: "Low", guess: "Low", verdict: "Too easy, and tells us little" },
    { id: "Q2", at: 44, disc: "High", guess: "High", verdict: "Right level, but a correct answer could be a guess" },
    { id: "Q3", at: 54, disc: "High", guess: "Low", verdict: "Served next", chosen: true },
    { id: "Q4", at: 86, disc: "High", guess: "Low", verdict: "Too hard for now" },
  ];
  return (
    <figure aria-labelledby="mechanism-title" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p id="mechanism-title" className="text-sm font-medium text-ink">Matching a question to a learner with 3PL IRT</p>
        <EvidenceTag kind="illustrative" />
      </div>

      {/* The scale: ability band and candidate questions on one difficulty axis. */}
      <div aria-hidden className="relative mt-10 mb-2 h-16">
        <span className="absolute inset-x-0 top-8 h-px bg-line-strong" />
        <span className="absolute top-5 h-6 rounded-full bg-accent-soft" style={{ left: `${ability.low}%`, width: `${ability.high - ability.low}%` }} />
        <span className="absolute top-3 h-10 w-[2px] -translate-x-1/2 bg-accent" style={{ left: `${ability.at}%` }} />
        <span className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] tracking-wide whitespace-nowrap text-accent uppercase" style={{ left: `${ability.at}%` }}>Learner ability (θ)</span>
        {questions.map((q) => (
          <span key={q.id} className="absolute top-8 -translate-x-1/2 -translate-y-1/2" style={{ left: `${q.at}%` }}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[10px] ${q.chosen ? "border-accent bg-accent text-panel" : "border-line-strong bg-panel text-muted"}`}>{q.id}</span>
          </span>
        ))}
        <span className="absolute top-14 left-0 font-mono text-[10px] text-subtle">easier</span>
        <span className="absolute top-14 right-0 font-mono text-[10px] text-subtle">harder</span>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <caption className="sr-only">Candidate questions for a learner whose estimated ability sits in the middle of the scale, with the uncertainty band shown around it</caption>
        <thead className="text-[11px] tracking-[0.12em] text-muted uppercase">
          <tr className="border-b border-line">
            <th scope="col" className="py-2 pr-3 font-medium">Question</th>
            <th scope="col" className="hidden py-2 pr-3 font-medium sm:table-cell">Discrimination (a)</th>
            <th scope="col" className="hidden py-2 pr-3 font-medium sm:table-cell">Guessing (c)</th>
            <th scope="col" className="py-2 font-medium">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="border-b border-line/70 align-top last:border-0">
              <th scope="row" className={`py-2.5 pr-3 font-mono text-xs font-normal ${q.chosen ? "text-accent" : "text-ink"}`}>{q.id}</th>
              <td className="hidden py-2.5 pr-3 text-muted sm:table-cell">{q.disc}</td>
              <td className="hidden py-2.5 pr-3 text-muted sm:table-cell">{q.guess}</td>
              <td className={`py-2.5 leading-6 ${q.chosen ? "font-medium text-accent" : "text-ink/85"}`}>
                {q.verdict}
                <span className="block text-xs text-muted sm:hidden">Discrimination {q.disc.toLowerCase()} · guessing {q.guess.toLowerCase()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <figcaption className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted">
        <span aria-hidden className="text-accent">↺</span>
        After each answer θ is updated, which changes the next choice. Positions are illustrative; real parameters, thresholds and selection rules are not shown.
      </figcaption>
    </figure>
  );
}

/** The documented result, before and after, with its measurement window. */
function OutcomeTile() {
  return (
    <div className="rounded-xl border border-line bg-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Assignment completion</p>
        <EvidenceTag kind="verified" />
      </div>
      <p className="mt-3 text-4xl font-semibold tracking-tight whitespace-nowrap text-ink sm:text-5xl">18% → 45%</p>
      <div className="mt-6">
        <BeforeAfter before={18} after={45} max={60} beforeLabel="Static" afterLabel="Adaptive" caption="Edfora · 2-year academic-cycle dataset · before vs. after" />
      </div>
      <p className="mt-5 text-sm text-ink">Practice drop-offs also reduced.</p>
    </div>
  );
}
