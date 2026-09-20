export const adaptiveAssignmentEngine = {
  title: "Adaptive Assignment Engine",
  subtitle: "Improving learning progress through personalization",
  type: "Professional experience · EdTech",
  outcome: "Approximately 18–25% improvement in assignment completion",
  scale: "100K+ learners impacted across learning and engagement experiences",
  confidentiality:
    "This case study focuses on product reasoning and outcomes. Proprietary implementation details, internal data, and confidential employer information are intentionally omitted.",
  sections: [
    {
      eyebrow: "Context",
      title: "The product problem",
      body: [
        "Assignment completion is not only a content problem. A learner can have access to the right material and still drop when the next task feels too difficult, too repetitive, or poorly timed.",
        "The product opportunity was to make assignment progression more responsive to learner behavior rather than treating every learner as if they should follow the same sequence."
      ],
    },
    {
      eyebrow: "Users",
      title: "The journey I was optimizing",
      body: [
        "The key journey was: receive an assignment → understand the task → start → work through difficulty → complete → receive the next meaningful challenge.",
        "The important product question was not simply whether a learner started. It was whether the system helped the learner keep progressing."
      ],
    },
    {
      eyebrow: "Evidence",
      title: "Signals that shaped the direction",
      body: [
        "I treated completion, progression friction, and learner behavior as the core signals. The product needed to respond to differences in learner readiness without making the experience feel unpredictable.",
        "The verified business outcome from the work was an approximately 18–25% improvement in assignment completion."
      ],
    },
    {
      eyebrow: "Root cause",
      title: "A fixed sequence created avoidable friction",
      body: [
        "A uniform assignment sequence can over-challenge some learners and under-challenge others. That creates two failure modes: frustration and disengagement on one side, low cognitive value on the other.",
        "The product response was to introduce adaptive decision points into the assignment experience."
      ],
    },
    {
      eyebrow: "Strategy",
      title: "Personalization as a product system",
      body: [
        "The strategy was to make assignment progression responsive to learner signals while keeping the experience understandable.",
        "That meant separating the product problem into three layers: learner state, next-best assignment decision, and feedback/progression."
      ],
    },
    {
      eyebrow: "Hypothesis",
      title: "Make the next task more relevant",
      body: [
        "If assignment progression adapts to observed learner behavior and readiness, then learners should encounter less unnecessary friction and be more likely to complete the next meaningful task.",
        "The hypothesis was intentionally measurable: assignment completion was the primary outcome, with engagement and progression signals used to understand why the outcome moved."
      ],
    },
    {
      eyebrow: "Solution",
      title: "An adaptive assignment layer",
      body: [
        "The experience introduced personalization into the assignment journey rather than treating it as a separate recommendation surface.",
        "The important product principle was restraint: adaptation should reduce friction and improve relevance without making learners wonder why the system changed their path."
      ],
    },
    {
      eyebrow: "Measurement",
      title: "What success looked like",
      body: [
        "Primary outcome: assignment completion.",
        "Supporting signals: progression through the learning journey, engagement with assignments, and behavioral patterns that could explain movement in completion.",
        "Verified outcome: approximately 18–25% improvement in assignment completion."
      ],
    },
    {
      eyebrow: "Trade-offs",
      title: "Personalization needs guardrails",
      body: [
        "More adaptation can also mean more complexity. The product has to balance relevance with consistency, learner control, explainability, and operational simplicity.",
        "A senior PM decision is not simply to maximize personalization. It is to decide where personalization materially improves the job-to-be-done and where a stable default is better."
      ],
    },
    {
      eyebrow: "Learning",
      title: "The product lesson",
      body: [
        "The strongest personalization is often invisible: the user experiences a more relevant next step, while the underlying system absorbs the complexity.",
        "This work reinforced a broader product principle I use today: optimize the journey, not just the feature."
      ],
    },
  ],
};

export const aiLearnerDiagnostic = {
  title: "AI Learner Diagnostic",
  subtitle: "A self-built AI product for diagnosis → learning path → practice → evaluation",
  type: "Independent portfolio project",
  status: "Prototype / product case study — no real-user results claimed",
  sections: [
    ["Why AI", "Diagnosis and recommendation are judgment-heavy tasks. An AI layer can synthesize learner evidence and propose a next-best action, while keeping the learner and educator in control."],
    ["User journey", "Assess → diagnose skill gaps → explain the diagnosis → recommend a learning path → generate targeted practice → evaluate → adapt the next step."],
    ["System thinking", "A practical architecture can combine structured learner signals, retrieval from a curated knowledge base, an LLM reasoning layer, deterministic scoring where possible, and a feedback/evaluation loop."],
    ["Evaluation", "Before launch, evaluate diagnostic accuracy, recommendation relevance, groundedness, harmful or overconfident outputs, consistency, latency, and cost. Use a representative evaluation dataset rather than relying on a few demo prompts."],
    ["Guardrails", "Show evidence where available, avoid pretending uncertainty is certainty, allow human override, and define failure states for low-confidence or ambiguous learner signals."],
    ["Launch criteria", "Ship only when quality thresholds are met across representative cases and when the AI experience produces a measurable improvement over a credible non-AI baseline."],
  ],
};
