import { CaseStudyShell, Chapter, ChapterList, Prose } from "@/components/case-study/shell";
import { EvidenceTag } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { DecisionSimulator } from "@/components/viz/decision-simulator";
import { JourneyMap } from "@/components/viz/journey-map";
import { LoopDiagram } from "@/components/viz/loop-diagram";
import { onboardingFunnelRedesign } from "@/content/case-studies";

const experimentLoop = [
  ["Hypothesis", "A clearer first-session path should improve early retention."],
  ["A/B test", "Ship the change to a test group; keep a control."],
  ["Segment", "Split results by user behavior to see who moved and why."],
  ["Learn", "Keep what explains the lift; feed the rest into the next test."],
] as const;

export function GamingCaseStudyPage() {
  const c = onboardingFunnelRedesign;
  // The simulator is its own chapter, placed right after the documented decision
  // and before the documented outcome, so the two are never read as one thing.
  const split = c.chapters.findIndex((ch) => ch.id === "decision") + 1;
  const toc = [
    ...c.chapters.slice(0, split).map(({ id, label }) => ({ id, label })),
    { id: "simulator", label: "Explore the reasoning" },
    ...c.chapters.slice(split).map(({ id, label }) => ({ id, label })),
  ];
  return (
    <CaseStudyShell
      meta={{
        slug: "onboarding-funnel-redesign",
        type: c.type,
        title: c.title,
        subtitle: c.subtitle,
        focus: c.focus,
        outcome: c.outcome,
        evidence: "verified",
        role: c.role,
        company: "Witzeal Technologies",
        note: c.confidentiality,
      }}
      tldr={c.tldr}
      toc={toc}
    >
      <ChapterList chapters={c.chapters.slice(0, split)} measure={measure} after={visuals} />
      <Chapter id="simulator" index={split + 1} label="Explore the reasoning">
        <Prose
          eyebrow="Illustrative simulator"
          title="Explore the reasoning behind the levers."
          body={[
            "Change the levers and watch the reasoning update: which lever is the bottleneck, what the hypothesis becomes, which direction behavior should move, and what I would decide.",
            "This is how I reason about onboarding levers, made interactive. It is not a replay of the historical result, and it does not produce numbers.",
          ]}
        />
        <DecisionSimulator />
      </Chapter>
      <ChapterList chapters={c.chapters.slice(split)} measure={measure} after={visuals} start={split + 2} />
    </CaseStudyShell>
  );
}

const measure = "Day-7 retention, with funnel progression and segment behavior to explain the movement";

const visuals = {
  Context: <Reframe />,
  Diagnosis: (
    <JourneyMap
      title="The first-session journey, as a sequence of user decisions"
      steps={onboardingFunnelRedesign.journey}
      caption="Each stage carries the question a new player is implicitly asking. The documented finding is that most players who left never reached the second session; the documented redesign, the first 60 seconds, sits before it."
    />
  ),
  "Proposed validation": (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">Proposed validation loop</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <div className="mt-6">
        <LoopDiagram steps={experimentLoop} label="Proposed validation loop: hypothesis, A/B test, segment, learn" />
      </div>
    </div>
  ),
  Outcome: (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">Day-7 retention</p>
        <EvidenceTag kind="verified" />
      </div>
      <p className="mt-3 text-5xl font-semibold tracking-tight text-ink">12% → 25%</p>
      <div className="mt-8">
        <BeforeAfter before={12} after={25} beforeLabel="Before" afterLabel="After redesign" caption="Witzeal · first-60-seconds onboarding redesign" />
      </div>
    </div>
  ),
};

/** The reframe the case turns on: the same number, read two ways, leads to two different roadmaps. */
function Reframe() {
  const readings = [
    {
      label: "Read as a retention problem",
      where: "Players drift away over the first week",
      levers: "Reminders, rewards, re-engagement campaigns",
    },
    {
      label: "Read as an activation problem",
      where: "Most players who leave never start a second session",
      levers: "Time to value, the first meaningful action, the first 60 seconds",
      chosen: true,
    },
  ];
  return (
    <figure aria-label="Two readings of the same retention number" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">Same 12%, two readings</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {readings.map((r) => (
          <li key={r.label} className={`rounded-lg border p-5 ${r.chosen ? "border-accent bg-accent-soft/60" : "border-line bg-background"}`}>
            <p className={`text-sm font-medium ${r.chosen ? "text-accent" : "text-ink"}`}>{r.label}</p>
            <dl className="mt-3 grid gap-3 text-sm">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Where the loss is</dt>
                <dd className="mt-1 leading-6 text-ink/85">{r.where}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">What you build</dt>
                <dd className="mt-1 leading-6 text-ink/85">{r.levers}</dd>
              </div>
            </dl>
            {r.chosen ? <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-accent"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />What the funnel showed</p> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">
        The documented finding is that most onboarding drop-off happened before a player’s second session. The contrast in levers is product reasoning.
      </figcaption>
    </figure>
  );
}
