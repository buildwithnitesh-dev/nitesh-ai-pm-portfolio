/**
 * How I think about products. Every item is derived from work already shown on
 * this site and links to where it is evidenced: no invented stories, quotes,
 * failures or numbers.
 */

export type EvidenceLink = { label: string; href: string };

export const principles: readonly { title: string; body: string; evidence: EvidenceLink }[] = [
  {
    title: "Find the behavior under the metric.",
    body: "Low completion looked like a content problem. It was a fit problem: the same sequence was too hard for some learners and too easy for others, and both showed up as an unfinished assignment.",
    evidence: { label: "Adaptive Assignment Engine · Problem", href: "/work/adaptive-assignment-engine#problem" },
  },
  {
    title: "Check where the drop actually happens.",
    body: "A 12% Day-7 retention reads like a retention problem. Most of the loss was before the second session, which points to an activation problem with a very different fix.",
    evidence: { label: "Onboarding Funnel Redesign · Diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
  },
  {
    title: "One outcome decides. The rest explain.",
    body: "Completion, Day-7 retention, spend with retention held. Supporting signals are there to explain why the number moved, not to fill a dashboard.",
    evidence: { label: "Adaptive Assignment Engine · Outcome", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    title: "Get the signal to the person who can act, while it still matters.",
    body: "Retention data that reached faculty monthly described students who had already gone. The fix was getting the signal to them sooner, not more data.",
    evidence: { label: "Decision log · Faculty signals", href: "/#decision-faculty-signals" },
  },
  {
    title: "Rules first. A model where it earns its place.",
    body: "Anything that must be consistent, auditable or cheap stays deterministic. The model gets the judgment-heavy steps, and still has to beat a credible non-AI baseline to ship.",
    evidence: { label: "AI Learner Diagnostic · Why AI", href: "/work/ai-learner-diagnostic#why-ai" },
  },
  {
    title: "Design for uncertainty and human override.",
    body: "Show the evidence, state confidence honestly, define what happens when signals are thin, and let a person make the final call.",
    evidence: { label: "AI Learner Diagnostic · Guardrails", href: "/work/ai-learner-diagnostic#guardrails" },
  },
];

export const antiPatterns: readonly { avoid: string; instead: string; evidence: EvidenceLink }[] = [
  {
    avoid: "Shipping AI because AI is fashionable",
    instead: "Name the decision that should change, and the non-AI baseline the AI experience has to beat.",
    evidence: { label: "Launch criteria", href: "/work/ai-learner-diagnostic#launch" },
  },
  {
    avoid: "Optimizing vanity metrics",
    instead: "Pick one outcome tied to user value, and treat activity metrics as diagnosis rather than success.",
    evidence: { label: "Metric hierarchy", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    avoid: "Adding complexity that doesn’t improve the journey",
    instead: "Personalize only where it clearly improves the job, and keep a stable default everywhere else.",
    evidence: { label: "Trade-offs", href: "/work/adaptive-assignment-engine#reflection" },
  },
  {
    avoid: "Treating experimentation as a checkbox",
    instead: "Write the hypothesis and the decision rule before the test, and read the result by segment.",
    evidence: { label: "Decision log · Testing roadmap", href: "/#decision-experimentation-roadmap" },
  },
  {
    avoid: "Hiding uncertainty in AI experiences",
    instead: "Show evidence and honest confidence, with a defined fallback when signals are ambiguous.",
    evidence: { label: "Failure modes", href: "/work/ai-learner-diagnostic#failure-modes" },
  },
  {
    avoid: "Paying for retention before earning it",
    instead: "Fix the first session before adding incentives, and target the incentives you keep by expected return.",
    evidence: { label: "Decision log · Bonus allocation", href: "/#decision-bonus-roi" },
  },
];

/**
 * Tempting beliefs the work taught me to distrust. Framed as lessons, not as
 * post-mortems of specific launches: nothing here describes an event that
 * isn’t documented elsewhere on the site.
 */
export const graveyard: readonly { belief: string; lesson: string; evidence: EvidenceLink }[] = [
  {
    belief: "A test that doesn’t win was wasted.",
    lesson: "Of 20+ A/B tests run end to end at Baazi Games, a fair number came back inconclusive or negative. Those results changed how later tests were scoped, which is most of what a testing program is for.",
    evidence: { label: "Experience · Baazi Games", href: "/#experience" },
  },
  {
    belief: "More engagement mechanics means more engagement.",
    lesson: "Teachers called early quiz prototypes “too game-y”. In a classroom product, the people who decide whether students use it are part of the engagement loop, so credibility is a constraint, not a nice-to-have.",
    evidence: { label: "Decision log · Gamification", href: "/#decision-gamification" },
  },
  {
    belief: "Incentives are the fastest retention lever.",
    lesson: "At Witzeal, bonus allocation rebuilt around expected ROI per segment cut bonus spend by ~20% while retention held. Retention holding after the cut suggests flat incentives had been paying for some retention that would have happened anyway.",
    evidence: { label: "Decision log · Bonus allocation", href: "/#decision-bonus-roi" },
  },
  {
    belief: "More personalization is always better.",
    lesson: "Past a point, adaptation adds unpredictability. The strongest personalization is usually invisible, and a stable default is often the better product.",
    evidence: { label: "Adaptive Assignment Engine", href: "/work/adaptive-assignment-engine#reflection" },
  },
];
