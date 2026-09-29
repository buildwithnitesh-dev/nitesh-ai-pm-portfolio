/**
 * Case-study content. The two professional cases share a loose spine
 * (problem, diagnosis, decision, outcome, reflection) so a reader who has seen
 * one knows how to scan the next, but each is told in the shape its story
 * needs. Anything that is product reasoning rather than a documented fact is
 * labelled on the page.
 */

export type Section = { eyebrow: string; title: string; body: readonly string[] };
export type Chapter = { id: string; label: string; sections: readonly Section[] };
export type Tldr = { problem: string; approach: string; outcome: string };

export const adaptiveAssignmentEngine = {
  slug: "adaptive-assignment-engine",
  title: "Adaptive Assignment Engine",
  subtitle: "Why a fixed practice sequence lost learners, and how matching question difficulty to each learner’s ability kept more of them going.",
  type: "Edfora · EdTech · Professional experience",
  role: "Senior Product Manager · Edfora · 2023–2026",
  outcome: "Approximately 18–25% improvement in assignment completion",
  scale: "Edfora’s learning and engagement products reached 100K+ learners overall; that figure is not specific to this engine",
  focus: ["Personalization", "Learning systems", "AI & data"],
  confidentiality:
    "This case study covers product reasoning and outcomes. Proprietary implementation details, internal data and confidential employer information are left out.",
  tldr: {
    problem: "Low assignment completion was a key driver of learners dropping off. A fixed practice sequence gave every learner the same next question: too hard for some, too easy for others.",
    approach: "Estimate each learner’s ability and match it against each question’s difficulty, discrimination and guessing parameters, with an LLM API adjusting difficulty from the learner’s performance history.",
    outcome: "Assignment completion improved by roughly 18–25%, and fewer students dropped off mid-practice.",
  } satisfies Tldr,
  journey: [
    { step: "Receive", note: "An assignment arrives" },
    { step: "Start", note: "Is it worth starting now?" },
    { step: "Early questions", note: "Can I do this?", friction: true },
    { step: "Work through it", note: "Where learners stall or coast", friction: true },
    { step: "Complete", note: "Primary outcome" },
    { step: "Next assignment", note: "Is the next step worth it?" },
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        {
          eyebrow: "Context",
          title: "Learners had the material and still stopped.",
          body: [
            "Low assignment completion was one of the main reasons learners dropped off. The questions were there and learners could reach them. They started, and then they stopped partway through practice.",
            "Treating that as a content problem would have meant better questions and more explanations. The sharper question was about fit. Every learner got the same sequence, and one sequence cannot be the right difficulty for learners at different levels.",
          ],
        },
        {
          eyebrow: "Users",
          title: "The journey, as the learner lives it",
          body: [
            "The question that mattered was not whether a learner started an assignment. It was whether each next question kept them moving or gave them a reason to stop.",
          ],
        },
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      sections: [
        {
          eyebrow: "Root cause",
          title: "One sequence fails in two directions.",
          body: [
            "Learners who are behind meet questions they can’t answer, get frustrated and leave. Learners who are ahead meet questions they already know and stop getting anything out of them.",
            "Both look identical in the data: an assignment that doesn’t get finished. That is why completion alone could not say what to build. It had to be read against how each learner was performing.",
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
          title: "Three ways to fix difficulty fit, and how each one fails.",
          body: [
            "Laid out as product reasoning, the realistic options were: let learners pick their own difficulty, move them between difficulty bands with simple rules, or estimate each learner’s ability and match questions to it. The direction taken was the third.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Match the question to the learner, not the learner to the sequence.",
          body: [
            "If each learner gets questions matched to their current ability instead of a fixed sequence, then fewer learners will hit a wall or coast, and more will finish the assignment.",
            "Completion was the primary outcome. Practice drop-off was the second signal, because the change targeted the moment a learner gives up.",
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      sections: [
        {
          eyebrow: "Mechanism",
          title: "Learner ability on one side, question parameters on the other.",
          body: [
            "The engine keeps an estimate of each learner’s ability, updated from their performance. Every question carries three parameters: how difficult it is, how well it separates stronger learners from weaker ones (discrimination), and how likely a correct answer is to be a guess.",
            "Those parameters are what make the matching trustworthy. A question almost everyone gets right says little about a learner, so it should barely move the estimate. A correct answer on an easy-to-guess question is weaker evidence than one on a question that is hard to guess, so one lucky answer doesn’t push a struggling learner up too fast.",
            "An LLM API was used to adjust question difficulty from each student’s performance history. How that and the ability model were wired together is not covered here.",
          ],
        },
        {
          eyebrow: "Solution",
          title: "What changed for the learner",
          body: [
            "Nothing announced itself. The next question was simply closer to the edge of what the learner could do: a smaller step when they were struggling, a harder one when they were coasting.",
            "That restraint was deliberate. Adaptation should reduce friction without making learners wonder why their path changed.",
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
          title: "Completion up by roughly 18–25%.",
          body: [
            "Assignment completion improved by roughly 18–25%, and fewer students dropped off mid-practice. The result was reported as a range, so it is shown as a range here.",
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
          title: "What ability-based matching costs",
          body: [
            "It is harder to explain than a fixed sequence. A teacher can read a sequence; an ability estimate has to be trusted or explained. It also depends on well-calibrated questions, and a new learner starts with little history, so their first few questions carry the most uncertainty.",
            "The judgment call is not how much to personalize. It is where personalization clearly improves the job, and where a stable, predictable default is the better product.",
          ],
        },
        {
          eyebrow: "Learning",
          title: "The product lesson",
          body: [
            "The best personalization is usually invisible. The learner gets a next step that fits, and the system absorbs the complexity.",
            "It also left me with a habit: when completion drops, check the fit before adding more content or more features.",
          ],
        },
      ],
    },
  ] satisfies Chapter[],
};

export const onboardingFunnelRedesign = {
  slug: "onboarding-funnel-redesign",
  title: "Onboarding Funnel Redesign",
  subtitle: "Most players who left were gone before their second session. Rebuilding the first 60 seconds took Day-7 retention from 12% to 25%.",
  type: "Witzeal Technologies · Real-money gaming · Professional experience",
  role: "Product Manager · Witzeal Technologies · 2022–2023",
  outcome: "12% → 25% Day-7 retention",
  focus: ["Growth", "Activation", "Experimentation"],
  confidentiality:
    "This case study covers product reasoning and the verified outcome. Proprietary implementation details, internal data and confidential employer information are left out.",
  tldr: {
    problem: "Day-7 retention was 12%, and most of the drop-off happened before a player’s second session. It looked like a retention problem. It was an activation problem.",
    approach: "Redesigned the first 60 seconds as a chain of decisions: less effort before the first moment of value, a clearer path to the first meaningful action, and changes tested and read by segment.",
    outcome: "Day-7 retention improved from 12% to 25%.",
  } satisfies Tldr,
  journey: [
    { step: "Entry", note: "Is this for me?" },
    { step: "Setup", note: "How much effort before any value?", friction: true },
    { step: "First meaningful action", note: "Did I get anything out of it?", friction: true },
    { step: "End of session one", note: "Is there a reason to come back?", friction: true },
    { step: "Second session", note: "Where most leavers never arrived" },
    { step: "Day 7", note: "Retention measured here" },
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      sections: [
        {
          eyebrow: "Context",
          title: "Most players who left never came back for a second session.",
          body: [
            "Day-7 retention was 12%. Read quickly, that is a retention problem, and it points toward reminders, rewards and re-engagement campaigns.",
            "Tracing where players actually dropped told a different story. Most of the loss happened before a player’s second session. That made it an activation problem: whatever happened in the first session decided most of what happened in the first week.",
          ],
        },
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      sections: [
        {
          eyebrow: "Diagnosis",
          title: "Treat the first session as a chain of decisions.",
          body: [
            "I mapped onboarding as the decisions a new player makes rather than a set of screens: entry, setup, first meaningful action, end of the first session, second session. Funnel analysis and segmentation showed where momentum was being lost, and it was concentrated early.",
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
          title: "Fix the first 60 seconds before paying for the next seven days.",
          body: [
            "There were two broad directions. One was to bring players back: more incentives, more reminders. The other was to make the first session worth coming back to.",
            "Incentives would have treated the symptom at a cost, and the lift would last only as long as the spend. The redesign went after the first 60 seconds instead: less effort before the first moment of value, and a clearer path to the first meaningful action.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "A first session worth finishing should bring players back.",
          body: [
            "If the first session makes the first meaningful action easier to reach and removes avoidable friction, then more players will come back after it and still be around on day seven.",
          ],
        },
      ],
    },
    {
      id: "experimentation",
      label: "Experimentation",
      sections: [
        {
          eyebrow: "Experimentation",
          title: "Read the result by segment, not just in total.",
          body: [
            "Changes were tested rather than argued. Funnel analysis, segmentation and A/B tests were used together, and results were read by segment. A lift that comes from one type of player calls for a different decision than a lift across the board.",
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
          title: "Day-7 retention went from 12% to 25%.",
          body: [
            "Day-7 retention roughly doubled, from 12% to 25%. Proprietary experiment details and internal data are left out.",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      sections: [
        {
          eyebrow: "Learning",
          title: "Retention is won before the retention metric.",
          body: [
            "The work that moved retention happened upstream of anything labelled retention: time to value, and how obvious the first meaningful action was.",
            "The same logic came up again at Witzeal with bonuses. Before paying players to stay, check whether the product has given them a reason to.",
          ],
        },
        {
          eyebrow: "Next question",
          title: "What a win like this doesn’t tell you yet",
          body: [
            "A Day-7 lift can sit on top of a weaker Day-30. The question after a result like this is whether the players it kept go on to behave like players who stayed on their own, or whether the product only delayed the drop.",
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
