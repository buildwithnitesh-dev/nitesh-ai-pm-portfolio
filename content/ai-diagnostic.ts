/**
 * The AI Learner Diagnostic: an independent prototype. Everything here is
 * product reasoning and design; the demo runs on deterministic rules, and no
 * real-user adoption or model-performance results are claimed.
 */

export type Tldr = { problem: string; approach: string; outcome: string };

/**
 * Build status, from strongest to weakest. Only "Implemented" exists as working
 * code; "Designed" is a written design; "Planned" is not designed in detail;
 * "Not yet tested" names what has never been run against a model.
 */
export type BuildStatus = "Implemented" | "Designed" | "Planned" | "Not yet tested";

/** The build spec: every part of the product, with its honest status. */
export const buildSpec: readonly { part: string; status: BuildStatus; text: string }[] = [
  { part: "Problem", status: "Designed", text: "A teacher can't diagnose every learner's misconception by hand, and a learner on the wrong path doesn't complain; they stop." },
  { part: "Why AI", status: "Designed", text: "Mapping a pattern of errors to a likely misconception needs judgment across messy evidence. Scoring an answer doesn't." },
  { part: "Baseline", status: "Implemented", text: "A deterministic, rules-only diagnostic: the interactive prototype on this page. It is the bar any model has to beat." },
  { part: "Human override", status: "Implemented", text: "The teacher accepts or overrides every plan in the prototype. In production, each override would become an evaluation case." },
  { part: "Output schema", status: "Implemented", text: "A typed diagnosis: likely misconception or a decision to abstain, the evidence items it rests on, a confidence, an explanation and a next step." },
  { part: "Evaluation harness", status: "Implemented", text: "A runner that scores groundedness, consistency, calibration, accuracy, latency and token cost. It refuses to run without an API key and writes results only from real model calls." },
  { part: "Evaluation cases", status: "Designed", text: "Synthetic cases authored for testing, not learner data. Their expected labels are drafts awaiting an educator's review." },
  { part: "Architecture", status: "Designed", text: "Learner signals, then retrieval from a curated skill map and practice bank, then a model for diagnosis and explanation, with deterministic scoring and a teacher override." },
  { part: "Failure taxonomy", status: "Designed", text: "Six failure modes, each with how it shows up, how it is caught and what the product does instead." },
  { part: "Launch gate", status: "Designed", text: "Ship only if it beats the rules baseline on the rubric, with no overconfident or discouraging outputs in the failure review." },
  { part: "Model decision", status: "Planned", text: "Not chosen. Candidates get compared on evaluation results, latency and cost, not on a demo." },
  { part: "Context and retrieval", status: "Planned", text: "Retrieval from a curated knowledge base, with every claim traceable to learner evidence." },
  { part: "Latency and cost budgets", status: "Planned", text: "Targets set before model selection, per learner checkpoint." },
  { part: "Monitoring", status: "Planned", text: "Override rate and agreement with the teacher's own call, tracked per release." },
  { part: "Model-based diagnosis", status: "Not yet tested", text: "No model has been evaluated. There are no accuracy, groundedness or calibration results." },
];

/** What the evaluation measures, and whether the harness computes it today. */
export const evalMetrics: readonly { metric: string; how: string; status: BuildStatus }[] = [
  { metric: "Diagnostic accuracy", how: "Agreement with the expected diagnosis, against educator-reviewed labels only", status: "Implemented" },
  { metric: "Groundedness", how: "Every cited evidence item exists in the learner's answers", status: "Implemented" },
  { metric: "Hallucination rate", how: "Cites a missing item, or names a gap in a skill that was never tested", status: "Implemented" },
  { metric: "Consistency", how: "The same diagnosis across repeated runs of a case", status: "Implemented" },
  { metric: "Calibration", how: "Stated confidence against how often it is right", status: "Implemented" },
  { metric: "Latency and cost", how: "p50 and p95 per call; tokens recorded, priced once a budget is set", status: "Implemented" },
  { metric: "Usefulness", how: "An educator rates the proposed next step", status: "Planned" },
];

export const aiLearnerDiagnostic = {
  slug: "ai-learner-diagnostic",
  title: "AI Learner Diagnostic",
  subtitle: "An independent prototype for diagnosing a learner’s skill gaps and proposing the next step, designed around what happens when the AI is unsure or wrong.",
  type: "Independent portfolio project",
  status: "Independent prototype · rules-only baseline, no model evaluated yet",
  focus: ["AI product", "Evaluation", "Human oversight"],
  tldr: {
    problem: "Working out what a learner is missing and what they should do next is judgment-heavy work that teachers rarely have time to do for every student.",
    approach: "Split the job between rules, a model and the teacher; designed confidence, fallbacks and override into the UX; defined the evaluation and launch gate before any model work.",
    outcome: "Built: a rules-only baseline, the teacher override, the output schema and an evaluation harness. Not yet tested: any model. No real users and no model results.",
  } satisfies Tldr,
  sections: {
    rules: [
      "Rules vs. model",
      "The first design decision was a split, not a model choice. Anything that has to be consistent, auditable or cheap stays deterministic. The model gets the parts that need judgment over messy evidence, and each of those parts has a defined fallback. The teacher keeps the final call.",
    ],
    failure: [
      "Failure modes",
      "Every AI feature fails. The product decision is how: what the user sees, how the failure is detected, and what the system does instead. Designing these before the happy path keeps the demo honest.",
    ],
    launch: [
      "Launch criteria",
      "Ship only when quality thresholds hold across representative cases and the AI experience measurably beats a credible non-AI baseline.",
      "The first real test would be narrow: one subject, a few teachers, and the prototype’s diagnosis compared with the teacher’s own call on the same evidence. If it can’t agree with teachers often enough to save them time, it isn’t ready, however good the demo looks.",
    ],
  },
  split: [
    { job: "Score answers", owner: "Rules", why: "Deterministic and testable. There is nothing to guess." },
    { job: "Combine accuracy, hints and time into a readiness signal", owner: "Rules", why: "The same input must give the same output, and a teacher must be able to check it." },
    { job: "Map a pattern of errors to a likely misconception", owner: "Model", why: "Needs judgment across messy evidence. Rule-based in the prototype." },
    { job: "Explain the diagnosis to learner and teacher", owner: "Model", why: "Language generation, grounded in the evidence trace." },
    { job: "Generate targeted practice", owner: "Model + bank", why: "Variety, anchored to a curated, vetted practice bank." },
    { job: "Decide what happens at low confidence", owner: "Rules", why: "A fallback has to be predictable." },
    { job: "Accept or change the plan", owner: "Teacher", why: "Accountability stays with a person. Overrides are logged." },
  ],
  failures: [
    { failure: "Overconfident diagnosis", looks: "A firm verdict from two answers", detect: "Too little evidence for the confidence claimed", fallback: "State low confidence, hold the current path, ask for more evidence" },
    { failure: "Hallucinated gap", looks: "A skill the learner was never tested on", detect: "Every claim must trace to an answer in the evidence", fallback: "Drop untraceable claims before anything is shown" },
    { failure: "Contradictory signals", looks: "Fast, correct answers with heavy hint use", detect: "Signals disagree beyond a set margin", fallback: "Flag it for the teacher instead of picking one reading" },
    { failure: "Discouraging language", looks: "“You are weak at fractions”", detect: "Tone checks in the evaluation set", fallback: "Describe the gap and the next step, never the learner" },
    { failure: "Slow or failed model call", looks: "A learner waiting at a checkpoint", detect: "Latency budget exceeded or timeout", fallback: "Serve the rule-based next step and diagnose in the background" },
    { failure: "Teacher disagrees", looks: "An override", detect: "Every override is logged", fallback: "The override wins, and becomes a new evaluation case" },
  ],
};
