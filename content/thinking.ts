/**
 * How I work: the principles that add something the decision log doesn't
 * already show. Every line is taken from work already on this site and links
 * to where it is evidenced: no invented stories, quotes or numbers.
 */

export type EvidenceLink = { label: string; href: string };

export const principles: readonly { title: string; body: string; evidence: EvidenceLink }[] = [
  {
    title: "Find the behavior under the metric.",
    body: "Low completion looked like a content problem. It was a fit problem.",
    evidence: { label: "Adaptive Assignment Engine · Problem", href: "/work/adaptive-assignment-engine#problem" },
  },
  {
    title: "Check where the drop actually happens.",
    body: "About 65% of new users did not play a game on D0, which points to an activation problem with a very different fix.",
    evidence: { label: "Onboarding Funnel Redesign · Diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
  },
  {
    title: "One outcome decides. The rest explain.",
    body: "Pick one outcome tied to user value, and treat activity metrics as diagnosis rather than success.",
    evidence: { label: "Adaptive Assignment Engine · Outcome", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    title: "Write the hypothesis and the decision rule before the test.",
    body: "Read the result by segment. Every result, including the flat ones, narrows the next bet.",
    evidence: { label: "Decision log · Testing roadmap", href: "/#decision-experimentation-roadmap" },
  },
  {
    title: "Fix the first session before adding incentives.",
    body: "Then target the incentives you keep by expected return.",
    evidence: { label: "Decision log · Bonus allocation", href: "/#decision-bonus-roi" },
  },
  {
    title: "Personalize only where it clearly improves the job.",
    body: "Keep a stable default everywhere else. Past a point, adaptation adds unpredictability.",
    evidence: { label: "Adaptive Assignment Engine · Reflection", href: "/work/adaptive-assignment-engine#reflection" },
  },
];
