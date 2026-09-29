import { CaseStudyShell, Chapter, ChapterList, Prose } from "@/components/case-study/shell";
import { EvidenceMark, EvidenceTag } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { DecisionSimulator } from "@/components/viz/decision-simulator";
import { JourneyMap } from "@/components/viz/journey-map";
import { onboardingFunnelRedesign } from "@/content/case-studies";

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

const measure = "Day-7 retention, treatment against a control on the existing onboarding";

const visuals = {
  Context: <Reframe />,
  Diagnosis: (
    <JourneyMap
      title="The first-session journey, as a sequence of user decisions"
      steps={onboardingFunnelRedesign.journey}
      caption="Each stage carries the question a new player is implicitly asking. Documented: the journey to the first game was lengthy, OTP friction was an important part of it, and only about 35% of new users reached gameplay on D0."
    />
  ),
  Changes: <OnboardingFlow />,
  "Controlled rollout": <Rollout />,
  Outcome: (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">Day-7 retention, control vs. treatment</p>
        <EvidenceTag kind="verified" />
      </div>
      <p className="mt-3 text-4xl font-semibold tracking-tight whitespace-nowrap text-ink sm:text-5xl">12.2% → 25.4%</p>
      <div className="mt-8">
        <BeforeAfter before={12.2} after={25.4} beforeLabel="Control" afterLabel="Treatment" caption="Witzeal · 3-week controlled rollout · ~50K users" />
      </div>
    </div>
  ),
};

/** The documented onboarding, before and after: steps only, no screens. */
function OnboardingFlow() {
  const f = onboardingFunnelRedesign.flow;
  const columns = [
    { label: "Before", steps: f.before, result: f.beforeResult, tone: "border-line bg-background", accent: false },
    { label: "After", steps: f.after, result: f.afterResult, tone: "border-accent bg-accent-soft/60", accent: true },
  ];
  return (
    <figure aria-label="Onboarding before and after the redesign" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">The path to a first game, before and after</p>
        <DocumentedTag />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {columns.map((c) => (
          <div key={c.label} className={`rounded-lg border p-5 ${c.tone}`}>
            <p className={`font-mono text-[11px] tracking-[0.14em] uppercase ${c.accent ? "text-accent" : "text-muted"}`}>{c.label}</p>
            <ol className="mt-4 grid gap-2.5 text-sm">
              {c.steps.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-6 text-ink">
                  <span aria-hidden className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${c.accent ? "bg-accent" : "bg-line-strong"}`} />
                  {s}
                </li>
              ))}
            </ol>
            <p className={`mt-4 border-t pt-3 text-sm font-medium leading-6 ${c.accent ? "border-accent/30 text-accent" : "border-line text-ink"}`}>
              <span aria-hidden className="mr-1.5">→</span>{c.result}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">
        The changes from the Witzeal redesign, listed as steps. Screens and implementation details are left out.
      </figcaption>
    </figure>
  );
}

/** The documented experiment design: who saw what, for how long, at what scale. */
function Rollout() {
  const e = onboardingFunnelRedesign.experiment;
  return (
    <figure aria-label={`Controlled rollout: ${e.control}% control, ${e.treatment}% treatment, ${e.weeks} weeks, ${e.users} users`} className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">Controlled rollout</p>
        <DocumentedTag />
      </div>
      <div aria-hidden className="mt-6 flex h-3 overflow-hidden rounded-full">
        <span className="bg-data-before" style={{ width: `${e.control}%` }} />
        <span className="bg-data-after" style={{ width: `${e.treatment}%` }} />
      </div>
      <div aria-hidden className="mt-3 grid gap-1 text-sm sm:flex sm:justify-between sm:gap-4">
        <p><span className="font-semibold text-ink">{e.control}% control</span> <span className="text-muted">· existing onboarding</span></p>
        <p className="sm:text-right"><span className="font-semibold text-ink">{e.treatment}% treatment</span> <span className="text-muted">· redesigned onboarding</span></p>
      </div>
      <dl aria-hidden className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4 text-sm">
        <div className="flex items-baseline gap-2"><dt className="text-muted">Duration</dt><dd className="font-semibold text-ink">{e.weeks} weeks</dd></div>
        <div className="flex items-baseline gap-2"><dt className="text-muted">Users</dt><dd className="font-semibold text-ink">{e.users}</dd></div>
      </dl>
    </figure>
  );
}

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
      where: "About 65% of new users never play a game on day one",
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
        Documented: only about 35% of new users reached gameplay on D0. The contrast in levers is product reasoning.
      </figcaption>
    </figure>
  );
}

/** Same mark as a documented outcome, for documented facts that are not themselves results. */
function DocumentedTag() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs text-muted">
      <EvidenceMark kind="verified" />
      Documented
    </span>
  );
}
