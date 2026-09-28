import { CaseStudyShell, ChapterList, PullQuote } from "@/components/case-study/shell";
import { EvidenceTag } from "@/components/ui";
import { DecisionTree } from "@/components/viz/decision-tree";
import { JourneyMap } from "@/components/viz/journey-map";
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
        outcome: "+18–25% assignment completion",
        evidence: "verified",
        role: c.role,
        company: "Edfora",
        note: `${c.scale}. ${c.confidentiality}`,
      }}
      tldr={c.tldr}
      toc={c.chapters.map(({ id, label }) => ({ id, label }))}
    >
      <ChapterList
        chapters={c.chapters}
        measure="Assignment completion (primary) · progression and engagement signals (to explain why it moved)"
        after={{
          Users: (
            <JourneyMap
              title="The assignment journey, as the learner experiences it"
              steps={c.journey}
              caption="Friction points mark where a fixed sequence most often lost learners: tasks that felt too hard, too repetitive, or poorly timed."
            />
          ),
          "Root cause": <FitBand />,
          Strategy: <Layers />,
          Solution: <DecisionTree />,
          Measurement: <OutcomeTile />,
          "Trade-offs": <Tensions />,
          Learning: <PullQuote>Optimize the journey, not just the feature.</PullQuote>,
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

/**
 * The three-layer strategy as a flow. Layer 1 splits into the signal and the
 * difficulty call, because that is where the documented LLM API sat.
 */
function Layers() {
  const steps = [
    { name: "Learner signal", note: "What does behavior say about readiness right now?" },
    { name: "Difficulty / need", note: "An LLM API adjusted question difficulty from student performance history.", fact: true },
    { name: "Assignment", note: "Which task moves this learner forward?" },
    { name: "Feedback", note: "Did it work — and what should change next time?" },
  ];
  const groups = [
    { label: "Layer 1 · learner state", span: "sm:col-span-2" },
    { label: "Layer 2 · decision", span: "" },
    { label: "Layer 3 · progression", span: "" },
  ];
  return (
    <figure aria-label="The adaptive loop: learner signal, difficulty, assignment, feedback" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <ol className="relative grid gap-5 sm:grid-cols-4 sm:gap-4">
        {/* Hairline through the nodes (wide screens) or down the left (phones). */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong sm:top-[5px] sm:right-[12.5%] sm:bottom-auto sm:left-[12.5%] sm:h-px sm:w-auto" />
        {steps.map((st) => (
          <li key={st.name} className="relative pl-6 sm:pl-0 sm:text-center">
            <span aria-hidden className={`absolute top-0.5 left-0 block h-[11px] w-[11px] rounded-full sm:relative sm:top-0 sm:mx-auto ${st.fact ? "bg-accent ring-4 ring-accent-soft" : "border border-line-strong bg-panel"}`} />
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink uppercase sm:mt-3">{st.name}</p>
            <p className="mt-1.5 text-sm leading-6 text-muted">{st.note}</p>
            {st.fact ? <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-accent"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />Documented at Edfora</p> : null}
          </li>
        ))}
      </ol>
      <div aria-hidden className="mt-6 hidden grid-cols-4 gap-4 sm:grid">
        {groups.map((g) => (
          <p key={g.label} className={`border-t border-accent/40 pt-2 text-center font-mono text-[10px] tracking-[0.12em] text-muted uppercase ${g.span}`}>{g.label}</p>
        ))}
      </div>
      <figcaption className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-xs leading-5 text-muted">
        <span aria-hidden className="text-accent">↺</span>
        Feedback becomes the next learner signal. Layers follow the case: learner state, next-best assignment decision, feedback and progression. Exact signals and thresholds are confidential.
      </figcaption>
    </figure>
  );
}

/** One verified number, shown as a range because that is how it was reported — plus the metric hierarchy behind it. */
function OutcomeTile() {
  const max = 30;
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-[1fr_1.1fr]">
      <div className="bg-panel p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Assignment completion</p>
        </div>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">+18–25%</p>
        <div className="mt-6" role="img" aria-label="Reported improvement range: 18 to 25 percent, on a 0 to 30 percent scale">
          <div className="relative h-2 rounded-full bg-data-track">
            <span className="data-mark absolute inset-y-0 rounded-full bg-data-after" style={{ left: `${(18 / max) * 100}%`, width: `${(7 / max) * 100}%` }} />
          </div>
          <div aria-hidden className="mt-2 flex justify-between font-mono text-[10px] tabular-nums text-subtle"><span>0%</span><span>10%</span><span>20%</span><span>30%</span></div>
        </div>
        <div className="mt-5"><EvidenceTag kind="verified" /></div>
      </div>
      <div className="bg-panel p-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Metric hierarchy</p>
        <ol className="mt-4 grid gap-4 text-sm">
          <li className="grid grid-cols-[5.5rem_1fr] gap-3">
            <span className="font-mono text-xs text-accent uppercase">Primary</span>
            <span className="text-ink">Assignment completion</span>
          </li>
          <li className="grid grid-cols-[5.5rem_1fr] gap-3">
            <span className="font-mono text-xs text-muted uppercase">Explains</span>
            <span className="text-muted">Progression through the journey · engagement with assignments · behavioral patterns</span>
          </li>
        </ol>
        <p className="mt-4 grid grid-cols-[5.5rem_1fr] gap-3 text-sm"><span className="font-mono text-xs text-muted uppercase">Also</span><span className="text-ink">Practice drop-offs reduced</span></p>
        <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">One outcome decides success; supporting signals explain why it moved, so the team learns rather than just celebrates.</p>
      </div>
    </div>
  );
}

function Tensions() {
  const pairs = [
    ["Relevance", "Consistency"],
    ["Adaptation", "Learner control"],
    ["Personalization", "Explainability"],
    ["Sophistication", "Operational simplicity"],
  ];
  return (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">Tensions the design had to hold</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <ul className="mt-5 divide-y divide-line">
        {pairs.map(([a, b]) => (
          <li key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 text-sm">
            <span className="text-ink">{a}</span>
            <span className="text-lg text-subtle"><span aria-hidden>↔</span><span className="sr-only">versus</span></span>
            <span className="text-right text-ink">{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-muted">The rule of thumb: personalize only where it materially improves the job-to-be-done; elsewhere, a stable default wins.</p>
    </div>
  );
}
