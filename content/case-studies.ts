/**
 * Case-study content. The two professional cases share one compact spine
 * (problem, decision, test or mechanism, outcome, learning) so a reader who
 * has seen one knows how to scan the next. Anything that is product
 * reasoning rather than a documented fact is labelled on the page.
 */

/** `reasoning` marks a section as product reasoning rather than documented history; it is labelled on the page. */
export type Section = { eyebrow: string; title: string; body: readonly string[]; reasoning?: boolean };
export type Chapter = { id: string; label: string; sections: readonly Section[] };
export type Tldr = { problem: string; approach: string; outcome: string };

export const adaptiveAssignmentEngine = {
  slug: "adaptive-assignment-engine",
  title: "Adaptive Assignment Engine",
  subtitle: "Why a fixed practice sequence lost learners, and what changed when question difficulty was matched to each learner’s ability.",
  type: "Edfora · EdTech · Professional experience",
  role: "Senior Product Manager · Edfora · 2023–2026",
  outcome: "Assignment completion: 18% → 45%",
  scale: "Edfora’s learning and engagement products reached 100K+ learners overall; that figure is not specific to this engine",
  focus: ["Personalization", "3PL IRT", "Learning"],
  confidentiality:
    "This case study covers product reasoning and outcomes. Proprietary implementation details, internal data and confidential employer information are left out.",
  tldr: {
    problem: "A fixed practice sequence gave every learner the same next question: too hard for some, too easy for others. Assignment completion was 18%.",
    approach: "Three options weighed: learner choice, rule-based difficulty bands, or ability estimation. Chosen: a 3PL IRT-based engine that estimates each learner’s ability (θ) and selects question difficulty to match.",
    outcome: "Across a 2-year academic-cycle dataset: 18% completion under the static path, 45% after the adaptive system was introduced (+27 pts).",
  } satisfies Tldr,
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        {
          eyebrow: "Problem",
          title: "Learners had the material and still stopped.",
          body: [
            "Low assignment completion was a key driver of learners dropping off. Every learner got the same fixed sequence, and one sequence can’t be the right difficulty for learners at different levels. A fit problem, not a content problem.",
          ],
        },
      ],
    },
    {
      id: "decision",
      label: "Decision",
      sections: [
        {
          eyebrow: "Options",
          title: "Three ways to fix difficulty fit.",
          body: [
            "Let learners choose, move them between difficulty bands with rules, or estimate each learner’s ability and match questions to it. The third was chosen.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Match the question to the learner, not the learner to the sequence.",
          body: [
            "If each learner gets questions matched to their current ability instead of a fixed sequence, then fewer will hit a wall or coast, and more will finish the assignment.",
          ],
        },
        {
          eyebrow: "My role",
          title: "Senior PM, Core Practice & Learning Experience",
          body: [
            "One PM (me), one APM, one product designer, 5–7 engineers and 2–3 academic leads. I owned the strategy, roadmap, problem analysis, PRD and adaptive product logic, and post-launch tracking.",
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "How it works",
      sections: [
        {
          eyebrow: "Mechanism",
          title: "3PL IRT: learner ability on one side, question parameters on the other.",
          body: [
            "The engine estimates each learner’s ability (θ) per concept from their performance history. Every question carries a difficulty, discrimination and guessing parameter. The engine selects questions targeted at the learner’s current ability, then updates θ after each response.",
          ],
        },
      ],
    },
    {
      id: "outcome",
      label: "Outcome",
      sections: [
        {
          eyebrow: "Outcome",
          title: "Assignment completion: 18% → 45%.",
          body: [
            "Across a 2-year academic-cycle dataset, assignment completion was 18% under the static learning path and 45% after the adaptive system was introduced: +27 percentage points.",
            "Concurrent product changes in that period aren’t on record, so the increase isn’t attributed to the adaptive system alone.",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Learning",
      sections: [
        {
          eyebrow: "Trade-off",
          title: "What ability-based matching costs.",
          reasoning: true,
          body: [
            "It is harder to explain than a fixed sequence, it depends on well-calibrated questions, and a new learner’s first questions carry the most uncertainty.",
          ],
        },
        {
          eyebrow: "Learning",
          title: "When completion drops, check the fit before adding content.",
          body: [
            "Personalize only where it clearly improves the job. Everywhere else, a stable default wins.",
          ],
        },
      ],
    },
  ] satisfies Chapter[],
};

export const onboardingFunnelRedesign = {
  slug: "onboarding-funnel-redesign",
  title: "Onboarding Funnel Redesign",
  subtitle: "Only 12% of new players reached a game on day one. A redesigned first session, tested against a 30% control, took Day-7 retention from 12.2% to 25.4%.",
  type: "Witzeal Technologies · Real-money gaming · Professional experience",
  role: "Product Manager · Witzeal Technologies · 2022–2023",
  outcome: "12.2% → 25.4% Day-7 retention",
  focus: ["Growth", "Activation", "Experimentation"],
  confidentiality:
    "Documented: the D0 and Day-7 baselines, the funnel and OTP/API diagnosis, the five changes and their economics, the 30% control / 70% treatment rollout, and the D0 and Day-7 results. Product reasoning is labelled. Implementation details and internal data are left out.",
  tldr: {
    problem: "Day-7 retention was ~12%, and only 12% of new users played a game on D0. An activation problem, not just a retention one.",
    approach: "Five changes to reach the first game faster, including OTP auto-read and 3 free games. Tested 30% control vs. 70% treatment for three weeks, ~50K users.",
    outcome: "D0 gameplay 12% → 33%. Day-7 retention 12.2% → 25.4%, +13.2 percentage points.",
  } satisfies Tldr,
  changes: ["Simplified signup and login", "Email ID fetched automatically", "OTP auto-read", "First 3 games free", "Live gameplay tutorial"],
  /** The free-game economics: a bounded bridge toward first deposit. */
  economics: [
    { value: "₹15", label: "onboarding bonus per user", detail: "₹5 free entry × first 3 games" },
    { value: "₹20", label: "minimum first deposit" },
    { value: "5+", label: "game plays: the early-engagement goal" },
  ],
  experiment: { control: 30, treatment: 70, weeks: 3, users: "~50K" },
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        {
          eyebrow: "Signal",
          title: "Only 12% of new users played a game on day one.",
          body: [
            "Day-7 retention was about 12%. I traced it through the onboarding funnel and the OTP API’s success and failure rates and delivery time. The loss sat before the first game, so this was an activation problem, not simply a retention one.",
          ],
        },
      ],
    },
    {
      id: "decision",
      label: "Decision",
      sections: [
        {
          eyebrow: "Changes",
          title: "Five changes, all aimed at the first game.",
          body: [
            "Fix the first session before paying to bring players back. I owned the strategy, the funnel analysis and CleverTap dashboards, and the product and technical diagnosis of the OTP and API friction.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Get new players into a game faster, and more of them come back.",
          body: [
            "If new users reach their first game faster, with less signup and OTP friction, then more of them will play on D0 and still be around on Day 7.",
          ],
        },
        {
          eyebrow: "Economics",
          title: "Free games as a bridge to first deposit, not an open-ended discount.",
          body: [
            "The goal was to extend early engagement toward Day 7 and drive at least 5 game plays.",
          ],
        },
      ],
    },
    {
      id: "experimentation",
      label: "Test",
      sections: [
        {
          eyebrow: "Controlled rollout",
          title: "30% kept the old onboarding. 70% got the new one.",
          body: ["Three weeks, about 50,000 users."],
        },
      ],
    },
    {
      id: "outcome",
      label: "Outcome",
      sections: [
        {
          eyebrow: "Outcome",
          title: "More new players reached a game, and more were still playing on Day 7.",
          body: [
            "The positive direction continued into the first month (M0); later figures aren’t available, so none are shown.",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Learning",
      sections: [
        {
          eyebrow: "Learning",
          title: "Retention is won before the retention metric.",
          body: [
            "Retention work often starts upstream of anything labelled retention: in the first session, and sometimes in OTP verification.",
            "All five changes shipped together, so the contribution of each can’t be isolated.",
          ],
        },
      ],
    },
  ] satisfies Chapter[],
};

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
