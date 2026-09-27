/**
 * Case-study content. Every case follows the same narrative spine —
 * problem → diagnosis → decision → outcome → reflection — so a reader who has
 * seen one case already knows how to scan the next.
 */

export type Section = { eyebrow: string; title: string; body: readonly string[] };
export type Chapter = { id: string; label: string; sections: readonly Section[] };
export type Tldr = { problem: string; approach: string; outcome: string };

export const adaptiveAssignmentEngine = {
  slug: "adaptive-assignment-engine",
  title: "Adaptive Assignment Engine",
  subtitle: "Improving learning progress through personalization",
  type: "Edfora · EdTech · Professional experience",
  role: "Senior Product Manager · Edfora · 2023–2026",
  outcome: "Approximately 18–25% improvement in assignment completion",
  scale: "Part of Edfora’s broader learning and engagement work, which reached 100K+ learners — the 100K+ figure is not specific to this engine",
  focus: ["Personalization", "Learning", "Retention"],
  confidentiality:
    "This case study focuses on product reasoning and outcomes. Proprietary implementation details, internal data, and confidential employer information are intentionally omitted.",
  tldr: {
    problem: "Learners dropped off when the next assignment felt too hard, too repetitive, or poorly timed — a fixed sequence treated every learner the same.",
    approach: "Introduced adaptive decision points: an LLM API adjusted question difficulty based on each student’s performance history, and progress fed back into the next decision.",
    outcome: "Assignment completion improved by approximately 18–25%, and practice drop-offs reduced.",
  } satisfies Tldr,
  journey: [
    { step: "Receive", note: "An assignment arrives" },
    { step: "Understand", note: "Is the task clear?" },
    { step: "Start", note: "Is it worth starting now?" },
    { step: "Work through difficulty", note: "Where learners stall", friction: true },
    { step: "Complete", note: "Primary outcome" },
    { step: "Next challenge", note: "Is the next step meaningful?", friction: true },
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        {
          eyebrow: "Context",
          title: "The product problem",
          body: [
            "Assignment completion is not only a content problem. A learner can have access to the right material and still drop when the next task feels too difficult, too repetitive, or poorly timed.",
            "The product opportunity was to make assignment progression more responsive to learner behavior rather than treating every learner as if they should follow the same sequence.",
          ],
        },
        {
          eyebrow: "Users",
          title: "The journey I was optimizing",
          body: [
            "The key journey was: receive an assignment → understand the task → start → work through difficulty → complete → receive the next meaningful challenge.",
            "The important product question was not simply whether a learner started. It was whether the system helped the learner keep progressing.",
          ],
        },
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      sections: [
        {
          eyebrow: "Evidence",
          title: "Signals that shaped the direction",
          body: [
            "I treated completion, progression friction, and learner behavior as the core signals. The product needed to respond to differences in learner readiness without making the experience feel unpredictable.",
            "The verified business outcome from the work was an approximately 18–25% improvement in assignment completion.",
          ],
        },
        {
          eyebrow: "Root cause",
          title: "A fixed sequence created avoidable friction",
          body: [
            "A uniform assignment sequence can over-challenge some learners and under-challenge others. That creates two failure modes: frustration and disengagement on one side, low cognitive value on the other.",
            "The product response was to introduce adaptive decision points into the assignment experience.",
          ],
        },
      ],
    },
    {
      id: "decision",
      label: "Decision",
      sections: [
        {
          eyebrow: "Strategy",
          title: "Personalization as a product system",
          body: [
            "The strategy was to make assignment progression responsive to learner signals while keeping the experience understandable.",
            "That meant separating the product problem into three layers: learner state, next-best assignment decision, and feedback/progression.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Make the next task more relevant",
          body: [
            "If assignment progression adapts to observed learner behavior and readiness, then learners should encounter less unnecessary friction and be more likely to complete the next meaningful task.",
            "The hypothesis was intentionally measurable: assignment completion was the primary outcome, with engagement and progression signals used to understand why the outcome moved.",
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      sections: [
        {
          eyebrow: "Solution",
          title: "An adaptive assignment layer",
          body: [
            "The experience introduced personalization into the assignment journey rather than treating it as a separate recommendation surface.",
            "The engine used an LLM API to adjust question difficulty based on student performance history.",
            "The important product principle was restraint: adaptation should reduce friction and improve relevance without making learners wonder why the system changed their path.",
          ],
        },
      ],
    },
    {
      id: "outcome",
      label: "Outcome",
      sections: [
        {
          eyebrow: "Measurement",
          title: "What success looked like",
          body: [
            "Primary outcome: assignment completion.",
            "Supporting signals: progression through the learning journey, engagement with assignments, and behavioral patterns that could explain movement in completion.",
            "Verified outcome: approximately 18–25% improvement in assignment completion, with practice drop-offs reduced.",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      sections: [
        {
          eyebrow: "Trade-offs",
          title: "Personalization needs guardrails",
          body: [
            "More adaptation can also mean more complexity. The product has to balance relevance with consistency, learner control, explainability, and operational simplicity.",
            "A senior PM decision is not simply to maximize personalization. It is to decide where personalization materially improves the job-to-be-done and where a stable default is better.",
          ],
        },
        {
          eyebrow: "Learning",
          title: "The product lesson",
          body: [
            "The strongest personalization is often invisible: the user experiences a more relevant next step, while the underlying system absorbs the complexity.",
            "This work reinforced a broader product principle I use today: optimize the journey, not just the feature.",
          ],
        },
      ],
    },
  ] satisfies Chapter[],
};

export const onboardingFunnelRedesign = {
  slug: "onboarding-funnel-redesign",
  title: "Onboarding Funnel Redesign",
  subtitle: "Redesigning the first 60 seconds of onboarding to improve early product value and Day-7 retention.",
  type: "Witzeal Technologies · Gaming · Professional experience",
  role: "Product Manager · Witzeal Technologies · 2022–2023",
  outcome: "12% → 25% Day-7 retention",
  focus: ["Growth", "Activation", "Experimentation"],
  confidentiality:
    "This case study focuses on product reasoning and the verified outcome. Proprietary implementation details, internal data, and confidential employer information are intentionally omitted.",
  tldr: {
    problem: "Most of the product’s value sat in the first few sessions, and new users were losing momentum before they reached it.",
    approach: "Redesigned the first 60 seconds of onboarding as one system of decisions, reduced friction before the first meaningful action, and tested changes through experimentation.",
    outcome: "Day-7 retention improved from 12% to 25%.",
  } satisfies Tldr,
  journey: [
    { step: "Entry", note: "Is this for me?" },
    { step: "Setup", note: "How much effort before value?", friction: true },
    { step: "First meaningful action", note: "Did I get value?", friction: true },
    { step: "Early engagement", note: "Is there a reason to continue?" },
    { step: "Return", note: "Day-7 retention" },
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        { eyebrow: "Context", title: "The product problem", body: ["The onboarding funnel had a large amount of value concentrated in the first few sessions. The product question was how to reduce early friction and get more users to the point where the core experience could demonstrate its value."] },
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      sections: [
        { eyebrow: "Diagnosis", title: "Treat the funnel as a system", body: ["I approached onboarding as a sequence of decisions rather than a collection of screens: entry → setup → first meaningful action → early engagement → return. Funnel behavior and user segmentation were used to identify where the experience was losing momentum."] },
      ],
    },
    {
      id: "decision",
      label: "Decision",
      sections: [
        { eyebrow: "Strategy", title: "Reduce friction before adding more incentives", body: ["The redesign focused on the first 60 seconds of the onboarding experience — the moments that determined whether a new user reached meaningful product value. Experimentation was used to test changes rather than relying on opinion."] },
        { eyebrow: "Hypothesis", title: "A clearer first-session path should improve early retention", body: ["If the onboarding journey makes the first meaningful experience easier to reach and removes avoidable friction, then more users should return after the first week."] },
      ],
    },
    {
      id: "experimentation",
      label: "Experimentation",
      sections: [
        { eyebrow: "Experimentation", title: "Use segmentation to understand why retention moves", body: ["The work combined funnel analysis, user segmentation, and A/B testing. The goal was not only to move the headline metric, but to understand which user behaviors and journey changes explained the movement."] },
      ],
    },
    {
      id: "outcome",
      label: "Outcome",
      sections: [
        { eyebrow: "Outcome", title: "Day-7 retention moved from 12% to 25%", body: ["The verified outcome was an improvement in Day-7 retention from 12% to 25%. The result is presented as a professional outcome; proprietary experiment details and internal implementation data are intentionally omitted."] },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      sections: [
        { eyebrow: "Learning", title: "Retention is won before the retention metric", body: ["The strongest retention work often happens upstream: reduce time-to-value, make the first meaningful action obvious, and instrument the journey so the team can distinguish a real product improvement from a temporary lift."] },
      ],
    },
  ] satisfies Chapter[],
};

export const aiLearnerDiagnostic = {
  slug: "ai-learner-diagnostic",
  title: "AI Learner Diagnostic",
  subtitle: "A self-built AI product for diagnosis → learning path → practice → evaluation",
  type: "Independent portfolio project",
  status: "Independent prototype · deterministic demo, no real-user results",
  focus: ["LLMs", "Evaluation", "Product Design"],
  tldr: {
    problem: "Diagnosing a learner’s gaps and choosing the next step is judgment-heavy work that teachers rarely have time to do for every learner.",
    approach: "Designed an evaluation-led AI loop — diagnose, explain, recommend, practice, evaluate — with confidence, evidence, and educator override built into the UX.",
    outcome: "A working, deterministic prototype of the product loop. No real-user adoption or model-performance results are claimed.",
  } satisfies Tldr,
  sections: {
    whyAi: ["Why AI", "Diagnosis and recommendation are judgment-heavy tasks. An AI layer can synthesize learner evidence and propose a next-best action, while keeping the learner and educator in control."],
    journey: ["User journey", "Assess → diagnose skill gaps → explain the diagnosis → recommend a learning path → generate targeted practice → evaluate → adapt the next step."],
    system: ["System thinking", "A practical architecture can combine structured learner signals, retrieval from a curated knowledge base, an LLM reasoning layer, deterministic scoring where possible, and a feedback/evaluation loop."],
    evaluation: ["Evaluation", "Before launch, evaluate diagnostic accuracy, recommendation relevance, groundedness, harmful or overconfident outputs, consistency, latency, and cost. Use a representative evaluation dataset rather than relying on a few demo prompts."],
    guardrails: ["Guardrails", "Show evidence where available, avoid pretending uncertainty is certainty, allow human override, and define failure states for low-confidence or ambiguous learner signals."],
    launch: ["Launch criteria", "Ship only when quality thresholds are met across representative cases and when the AI experience produces a measurable improvement over a credible non-AI baseline."],
  },
  system: [
    { layer: "Inputs", items: ["Structured learner signals", "Answers, attempts, hints, time on task"] },
    { layer: "Grounding", items: ["Retrieval from a curated knowledge base", "Skill map and practice bank"] },
    { layer: "Reasoning", items: ["LLM proposes diagnosis and next step", "Deterministic scoring where possible"] },
    { layer: "Experience", items: ["Evidence, confidence, and explanation", "Educator accept / override"] },
    { layer: "Learning loop", items: ["Evaluation dataset and rubric", "Overrides logged as feedback"] },
  ],
  evaluation: [
    { criterion: "Diagnostic accuracy", question: "Does the diagnosis match what an expert educator would conclude from the same evidence?", risk: "Wrong path for the learner" },
    { criterion: "Recommendation relevance", question: "Is the next step the most useful one for this gap, at this level?", risk: "Busywork, disengagement" },
    { criterion: "Groundedness", question: "Is every claim traceable to learner evidence or curated content?", risk: "Hallucinated gaps" },
    { criterion: "Overconfidence & harm", question: "Does it hedge when evidence is thin, and avoid discouraging language?", risk: "Loss of learner and educator trust" },
    { criterion: "Consistency", question: "Do similar learners get similar diagnoses across runs?", risk: "Unpredictable experience" },
    { criterion: "Latency & cost", question: "Is it fast and cheap enough to run at every checkpoint?", risk: "Unviable unit economics" },
  ],
};
