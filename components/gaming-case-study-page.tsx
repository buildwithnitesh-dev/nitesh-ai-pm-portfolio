import { CaseStudyShell, ChapterList } from "@/components/case-study/shell";
import { EvidenceTag } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
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
        note: c.confidentiality,
      }}
      tldr={c.tldr}
      toc={c.chapters.map(({ id, label }) => ({ id, label }))}
    >
      <ChapterList
        chapters={c.chapters}
        measure="Day-7 retention, with funnel progression and segment behavior to explain the movement"
        after={{
          Diagnosis: (
            <JourneyMap
              title="The first-session journey, as a sequence of user decisions"
              steps={c.journey}
              caption="Each stage is framed by the question a new player is implicitly asking. The redesign concentrated on the stages before the first meaningful action — where value had to be felt before it could be retained."
            />
          ),
          Experimentation: (
            <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink">The experiment loop</p>
                <EvidenceTag kind="reasoning" />
              </div>
              <div className="mt-6">
                <LoopDiagram steps={experimentLoop} label="Experiment loop: hypothesis, A/B test, segment, learn" />
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
                <BeforeAfter before={12} after={25} beforeLabel="Before" afterLabel="After redesign" caption="Share of new users returning on Day 7" />
              </div>
            </div>
          ),
        }}
      />
    </CaseStudyShell>
  );
}
