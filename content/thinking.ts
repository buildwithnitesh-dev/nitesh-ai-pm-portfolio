/**
 * How I think about products. Every item is derived from work already shown on
 * this site and links to where it is evidenced — no invented stories, quotes,
 * failures, or numbers.
 */

export type EvidenceLink = { label: string; href: string };

export const principles: readonly { title: string; body: string; evidence: EvidenceLink }[] = [
  {
    title: "Start with the user problem, not the feature.",
    body: "Assignment completion wasn’t a content problem — learners had the material and still dropped. The fix was the journey, not another feature.",
    evidence: { label: "Adaptive Assignment Engine · Problem", href: "/work/adaptive-assignment-engine#problem" },
  },
  {
    title: "Make the next action easier to understand.",
    body: "In onboarding, the value sat in the first few sessions. The work was making the first meaningful action obvious and reachable before asking for anything else.",
    evidence: { label: "Onboarding Funnel Redesign · Diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
  },
  {
    title: "Measure behavior, not activity.",
    body: "One outcome decides success — assignment completion, Day-7 retention. Supporting signals exist to explain why it moved, not to decorate a dashboard.",
    evidence: { label: "Adaptive Assignment Engine · Outcome", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    title: "Experiment before scaling.",
    body: "Funnel analysis, segmentation, and A/B tests turn opinions into evidence — and a segment-level read tells you why a change worked, not just that it did.",
    evidence: { label: "Onboarding Funnel Redesign · Experimentation", href: "/work/onboarding-funnel-redesign#experimentation" },
  },
  {
    title: "Use AI where it creates a real product advantage.",
    body: "Diagnosis and recommendation are judgment-heavy tasks — that is where an AI layer earns its place. It still has to beat a credible non-AI baseline to ship.",
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
    instead: "Name the decision that should change, and the non-AI baseline the AI experience must beat.",
    evidence: { label: "Launch criteria", href: "/work/ai-learner-diagnostic#launch" },
  },
  {
    avoid: "Optimizing vanity metrics",
    instead: "Pick one outcome tied to user value; treat activity metrics as diagnosis, not success.",
    evidence: { label: "Metric hierarchy", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    avoid: "Adding complexity that doesn’t improve the journey",
    instead: "Personalize only where it materially improves the job-to-be-done; keep a stable default elsewhere.",
    evidence: { label: "Trade-offs", href: "/work/adaptive-assignment-engine#reflection" },
  },
  {
    avoid: "Treating experimentation as a checkbox",
    instead: "Write the hypothesis and decision rule before the test, and read results by segment.",
    evidence: { label: "Experiment loop", href: "/work/onboarding-funnel-redesign#experimentation" },
  },
  {
    avoid: "Hiding uncertainty in AI experiences",
    instead: "Show evidence and calibrated confidence, with a defined fallback when signals are ambiguous.",
    evidence: { label: "Guardrails", href: "/work/ai-learner-diagnostic#guardrails" },
  },
  {
    avoid: "Building features without a clear hypothesis",
    instead: "“If we…, then…, measured by…” comes before anything enters the roadmap.",
    evidence: { label: "Hypothesis", href: "/work/adaptive-assignment-engine#decision" },
  },
];

/**
 * Tempting beliefs the work taught me to distrust. Framed as lessons, not as
 * post-mortems of specific launches — nothing here describes an event that
 * isn’t documented elsewhere on the site.
 */
export const graveyard: readonly { belief: string; lesson: string; evidence: EvidenceLink }[] = [
  {
    belief: "More personalization is always better.",
    lesson: "Past a point, adaptation adds unpredictability. The strongest personalization is often invisible — and a stable default is often the better product.",
    evidence: { label: "Adaptive Assignment Engine", href: "/work/adaptive-assignment-engine#reflection" },
  },
  {
    belief: "Retention is fixed with retention features.",
    lesson: "Retention is won upstream: in time-to-value and in how obvious the first meaningful action is.",
    evidence: { label: "Onboarding Funnel Redesign", href: "/work/onboarding-funnel-redesign#reflection" },
  },
  {
    belief: "Incentives are the fastest retention lever.",
    lesson: "Reduce friction before adding incentives, and target the incentives you keep. In separate documented work, targeted incentives reduced bonus spend by ~20% while maintaining retention.",
    evidence: { label: "Documented outcome", href: "/#metrics" },
  },
  {
    belief: "A convincing AI demo means a good AI product.",
    lesson: "Demos hide failure modes. Representative evaluation data, rubrics, and a launch gate decide whether it ships.",
    evidence: { label: "AI Learner Diagnostic", href: "/work/ai-learner-diagnostic#evaluation" },
  },
];
