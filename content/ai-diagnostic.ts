/**
 * The AI Learner Diagnostic: an independent prototype. Everything here is
 * product reasoning and design; the demo runs on deterministic rules, and no
 * real-user adoption or model-performance results are claimed.
 */

export type Tldr = { problem: string; approach: string; outcome: string };

/** The AI product loop, taken from the diagnostic's user journey. */
export const aiLoop = [
  ["Assess", "Collect a small, representative set of learner evidence."],
  ["Diagnose", "Identify the skill gaps the evidence actually supports."],
  ["Explain", "Show the learner and educator why, with evidence before the verdict."],
  ["Recommend", "Propose a learning path the educator can accept or override."],
  ["Practice", "Generate targeted practice for the diagnosed gap."],
  ["Evaluate", "Score the outcome against a rubric, not a demo prompt."],
  ["Adapt", "Feed the result back into the next decision."],
] as const;

export const aiLearnerDiagnostic = {
  slug: "ai-learner-diagnostic",
  title: "AI Learner Diagnostic",
  subtitle: "An independent prototype for diagnosing a learner’s skill gaps and proposing the next step, designed around what happens when the AI is unsure or wrong.",
  type: "Independent portfolio project",
  status: "Independent prototype · deterministic demo, no real users or model results",
  focus: ["AI product", "Evaluation", "Human oversight"],
  tldr: {
    problem: "Working out what a learner is missing and what they should do next is judgment-heavy work that teachers rarely have time to do for every student.",
    approach: "Split the job between rules, a model and the teacher; designed confidence, fallbacks and override into the UX; defined the evaluation and launch gate before any model work.",
    outcome: "A working, deterministic prototype of the product loop. No real-user adoption or model-performance results are claimed.",
  } satisfies Tldr,
  sections: {
    whyAi: [
      "Why AI",
      "Working out what a learner is missing, and what they should do next, is judgment-heavy work. Teachers do it well and rarely have time to do it for every student. The gap is not content. It is diagnosis at scale.",
      "It is also a problem where being wrong is costly in a quiet way. A learner sent down the wrong path doesn’t complain, they just stop. So the design question was never whether a model can do this. It was where a model should do it, and what happens when it is wrong.",
    ],
    rules: [
      "Rules vs. model",
      "The first design decision was a split, not a model choice. Anything that has to be consistent, auditable or cheap stays deterministic. The model gets the parts that need judgment over messy evidence, and each of those parts has a defined fallback. The teacher keeps the final call.",
    ],
    system: [
      "System thinking",
      "A practical architecture combines structured learner signals, retrieval from a curated knowledge base, an LLM for the judgment-heavy steps, deterministic scoring wherever possible, and a feedback and evaluation loop.",
    ],
    failure: [
      "Failure modes",
      "Every AI feature fails. The product decision is how: what the user sees, how the failure is detected, and what the system does instead. Designing these before the happy path keeps the demo honest.",
    ],
    evaluation: [
      "Evaluation",
      "Before launch, evaluate diagnostic accuracy, recommendation relevance, groundedness, harmful or overconfident outputs, consistency, latency and cost, against a representative evaluation set rather than a few demo prompts.",
    ],
    guardrails: [
      "Guardrails",
      "Show evidence where it exists, never present uncertainty as certainty, let a person override, and define what the system does when learner signals are thin or ambiguous.",
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
  system: [
    { layer: "Inputs", items: ["Structured learner signals", "Answers, attempts, hints, time on task"] },
    { layer: "Grounding", items: ["Retrieval from a curated knowledge base", "Skill map and practice bank"] },
    { layer: "Reasoning", items: ["LLM proposes diagnosis and next step", "Deterministic scoring where possible"] },
    { layer: "Experience", items: ["Evidence, confidence and explanation", "Educator accept or override"] },
    { layer: "Learning loop", items: ["Evaluation dataset and rubric", "Overrides logged as feedback"] },
  ],
  evaluation: [
    { criterion: "Diagnostic accuracy", question: "Does the diagnosis match what an expert educator would conclude from the same evidence?", risk: "Wrong path for the learner" },
    { criterion: "Recommendation relevance", question: "Is the next step the most useful one for this gap, at this level?", risk: "Busywork and disengagement" },
    { criterion: "Groundedness", question: "Is every claim traceable to learner evidence or curated content?", risk: "Hallucinated gaps" },
    { criterion: "Overconfidence and harm", question: "Does it hedge when evidence is thin, and avoid discouraging language?", risk: "Loss of learner and educator trust" },
    { criterion: "Consistency", question: "Do similar learners get similar diagnoses across runs?", risk: "Unpredictable experience" },
    { criterion: "Latency and cost", question: "Is it fast and cheap enough to run at every checkpoint?", risk: "Unviable unit economics" },
  ],
};
