import { CaseStudyShell, ChapterList } from "@/components/case-study/shell";
import { EvidenceMark, EvidenceTag } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { onboardingFunnelRedesign } from "@/content/case-studies";

export function GamingCaseStudyPage() {
  const c = onboardingFunnelRedesign;
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
        note: c.confidentiality,
      }}
      tldr={c.tldr}
      toc={c.chapters.map(({ id, label }) => ({ id, label }))}
    >
      <ChapterList
        chapters={c.chapters}
        measure="D0 gameplay and Day-7 retention, treatment against a control on the existing onboarding"
        after={{
          Signal: <Reframe />,
          Changes: <Changes />,
          Economics: <Economics />,
          "Controlled rollout": <Rollout />,
          Outcome: <Outcome />,
        }}
      />
    </CaseStudyShell>
  );
}

/** The five documented changes, and the first-day result they were aimed at. */
function Changes() {
  return (
    <figure aria-label="The five onboarding changes" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">The path to a first game</p>
        <DocumentedTag />
      </div>
      <ol className="mt-5 grid gap-2 sm:grid-cols-2">
        {onboardingFunnelRedesign.changes.map((x, i) => (
          <li key={x} className="flex items-baseline gap-3 rounded-lg border border-line bg-background px-4 py-3 text-sm text-ink">
            <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>{x}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** The free-game economics: a bounded bonus set against the first-deposit threshold. */
function Economics() {
  return (
    <figure aria-label="Free-game economics" className="rounded-xl border border-line bg-panel">
      <dl className="grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-3">
        {onboardingFunnelRedesign.economics.map((e) => (
          <div key={e.label} className="bg-panel p-5 sm:p-6">
            <dt className="sr-only">{e.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight text-ink">{e.value}</dd>
            <dd className="mt-1 text-sm leading-6 text-ink">{e.label}</dd>
            {e.detail ? <dd className="text-xs leading-5 text-muted">{e.detail}</dd> : null}
          </div>
        ))}
      </dl>
      <figcaption className="border-t border-line px-5 py-3 text-xs leading-5 text-muted sm:px-6">
        No deposit-conversion result is claimed; the retention result belongs to the redesign as a whole.
      </figcaption>
    </figure>
  );
}

/** Both documented results side by side, then the Day-7 comparison against control. */
function Outcome() {
  const results = [
    { label: "D0 gameplay", value: "12% → 33%", note: "New users who played a game on day one" },
    { label: "Day-7 retention", value: "12.2% → 25.4%", note: "Control vs. treatment, +13.2 pts" },
  ];
  return (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">What changed</p>
        <EvidenceTag kind="verified" />
      </div>
      <dl className="mt-5 grid gap-6 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.label}>
            <dt className="text-xs tracking-[0.16em] text-muted uppercase">{r.label}</dt>
            <dd className="mt-2 text-4xl font-semibold tracking-tight whitespace-nowrap text-ink">{r.value}</dd>
            <dd className="mt-1 text-sm text-muted">{r.note}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 border-t border-line pt-6">
        <BeforeAfter before={12.2} after={25.4} beforeLabel="Control" afterLabel="Treatment" caption="Day-7 retention · Witzeal · 3-week controlled rollout · ~50K users" />
      </div>
    </div>
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
      where: "Only 12% of new users play a game on day one",
      levers: "Time to value, the first meaningful action, the first 60 seconds",
      chosen: true,
    },
  ];
  return (
    <figure aria-label="Two readings of the same retention number" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">One number, two readings</p>
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
        Documented: ~12% Day-7 retention, and 12% of new users playing a game on D0. The contrast in levers is product reasoning.
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
