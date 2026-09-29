/**
 * Case-study content. The two professional cases share a loose spine
 * (problem, diagnosis, decision, outcome, reflection) so a reader who has seen
 * one knows how to scan the next, but each is told in the shape its story
 * needs. Anything that is product reasoning rather than a documented fact is
 * labelled on the page.
 */

/** `reasoning` marks a section as product reasoning rather than documented history; it is labelled on the page. */
export type Section = { eyebrow: string; title: string; body: readonly string[]; reasoning?: boolean };
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
  focus: ["Personalization", "Learning systems", "3PL IRT"],
  confidentiality:
    "This case study covers product reasoning and outcomes. Proprietary implementation details, internal data and confidential employer information are left out.",
  tldr: {
    problem: "Low assignment completion was a key driver of learners dropping off. A fixed practice sequence gave every learner the same next question: too hard for some, too easy for others.",
    approach: "Adaptive practice built on a 3PL Item Response Theory (IRT) model: estimate each learner’s ability (θ) per concept from historical performance, select questions by their probability of a correct answer, P(θ), from each question’s difficulty, discrimination and guessing parameters, and update θ after every response.",
    outcome: "Assignment completion improved by roughly 18–25% across live learning cohorts, and fewer students dropped off mid-practice.",
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
            "Low assignment completion was a key driver of learners dropping off, including partway through practice.",
            "Treating that as a content problem points to better questions and more explanations. The sharper question is fit: every learner got the same fixed practice sequence, which didn’t adapt to what each learner had mastered, and one sequence cannot be the right difficulty for learners at different levels.",
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
          reasoning: true,
          body: [
            "Learners who are behind meet questions they can’t answer, get frustrated and leave. Learners who are ahead meet questions they already know and stop getting anything out of them.",
            "Both look identical in completion data: an assignment that doesn’t get finished. That is why completion alone doesn’t say what to build; it needs to be read against how each learner is performing.",
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
            "Laid out as product reasoning, the realistic options were: let learners pick their own difficulty, move them between difficulty bands with simple rules, or estimate each learner’s ability and match questions to it with a 3PL IRT model. The direction taken was the third.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Match the question to the learner, not the learner to the sequence.",
          body: [
            "If each learner gets questions matched to their current ability instead of a fixed sequence, then fewer learners will hit a wall or coast, and more will finish the assignment.",
            "How I would frame the measurement: completion as the primary outcome, and practice drop-off as the second signal, because the change targets the moment a learner gives up.",
          ],
        },
        {
          eyebrow: "My role",
          title: "Senior PM, Core Practice & Learning Experience",
          body: [
            "The team was one PM (me), one APM, one product designer, 5–7 engineers and 2–3 academic leads.",
            "I owned the product strategy, the roadmap and prioritization, the learner and problem analysis, the PRD and the adaptive product logic, and post-launch tracking. I worked with engineering on the implementation, with product design on the experience, and with the academic leads on the learning requirements.",
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
            "The system is built on a 3-parameter logistic (3PL) Item Response Theory model. It estimates each learner’s ability (θ) for each concept from their historical performance, and every question carries three parameters: difficulty (b), discrimination (a) and the probability of a correct guess (c).",
            "For the relevant questions it calculates P(θ), the probability that this learner answers correctly, and selects questions targeted around the learner’s current ability. After each response θ is updated: a correct answer leads to a more challenging next question, an incorrect one to an easier one. When several candidates are comparable, higher discrimination can be used to prioritize.",
            "The inputs were raw student data, the 3PL parameters for each question, and Content IDs. The PRD includes implementation examples for concept-wise θ calculation and for assigning the next question and updating θ.",
          ],
        },
        {
          eyebrow: "Practice loop",
          title: "One adaptive practice loop, as the PRD defines it",
          body: [
            "The system supports concept selection as well as the practice loop itself. The flow runs from initialization to the end of a session:",
          ],
        },
        {
          eyebrow: "Edge cases",
          title: "The edge cases the PRD defines",
          body: [
            "The PRD documents the edge cases the logic has to handle: estimating ability before a learner has any history, questions missing 3PL parameters, and several questions sharing the same median P(θ).",
          ],
        },
        {
          eyebrow: "Solution",
          title: "What adaptation means for the learner",
          reasoning: true,
          body: [
            "Matching difficulty to ability puts the next question closer to the edge of what the learner can do: a smaller step when they are struggling, a harder one when they are coasting.",
            "My view is that adaptation should reduce friction without making learners wonder why their path changed.",
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
            "Assignment completion improved by roughly 18–25% across live learning cohorts, and fewer students dropped off mid-practice. The result was reported as a range, so it is shown as a range here.",
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
          reasoning: true,
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
            "The lesson I take from it: when completion drops, check the fit before adding more content or more features.",
          ],
        },
      ],
    },
  ] satisfies Chapter[],
};

export const onboardingFunnelRedesign = {
  slug: "onboarding-funnel-redesign",
  title: "Onboarding Funnel Redesign",
  subtitle: "Only about a third of new players reached a game on their first day. In a controlled rollout, Day-7 retention was 25.4% with a redesigned first 60 seconds, against 12.2% for the existing experience.",
  type: "Witzeal Technologies · Real-money gaming · Professional experience",
  role: "Product Manager · Witzeal Technologies · 2022–2023",
  outcome: "12.2% → 25.4% Day-7 retention",
  focus: ["Growth", "Activation", "Experimentation"],
  confidentiality:
    "Documented: the first-day gameplay gap, the OTP and API diagnosis, the onboarding changes, the 30% control / 70% treatment rollout over three weeks, and the Day-7 result. Wherever this case describes reasoning rather than record, it is labelled as product reasoning. Implementation details, internal data and proprietary information are left out.",
  tldr: {
    problem: "Only about 35% of new users played a game on their first day (D0); about 65% never did. The onboarding journey was lengthy, and OTP friction was an important part of why.",
    approach: "Simplified signup and login, fetched the email ID automatically, added OTP auto-read, gave new users their first 3 games free and added a live gameplay tutorial. Tested against a 30% control over three weeks.",
    outcome: "Day-7 retention was 25.4% with the redesign against 12.2% in control: +13.2 percentage points, across about 50K users.",
  } satisfies Tldr,
  journey: [
    { step: "Entry", note: "Is this for me?" },
    { step: "Setup", note: "How much effort before any value?", friction: true },
    { step: "First meaningful action", note: "Did I get anything out of it?", friction: true },
    { step: "End of session one", note: "Is there a reason to come back?", friction: true },
    { step: "Second session", note: "Where most leavers never arrived" },
    { step: "Day 7", note: "Retention measured here" },
  ],
  /** The documented onboarding, before and after. Steps only; no screens or implementation detail. */
  flow: {
    before: ["Lengthy signup and login", "OTP friction", "Delayed first gameplay"],
    beforeResult: "About 35% of new users reached gameplay on D0",
    after: ["Simplified signup and login", "Email ID fetched automatically", "OTP auto-read", "First 3 games free", "Live gameplay tutorial"],
    afterResult: "The aim: first gameplay, faster",
  },
  experiment: { control: 30, treatment: 70, weeks: 3, users: "~50K" },
  chapters: [
    {
      id: "problem",
      label: "What we saw",
      sections: [
        {
          eyebrow: "Context",
          title: "Most new players never reached a game on day one.",
          body: [
            "About 65% of new users did not play a game on their first day (D0). Only about 35% reached gameplay at all, and Day-7 retention was around 12%.",
            "Read quickly, a 12% Day-7 number is a retention problem, and it points toward reminders, rewards and re-engagement campaigns. Where the loss sat said something else: about two in three new users hadn’t played a single game by the end of their first day. That is an activation problem, and it needs a different fix.",
          ],
        },
      ],
    },
    {
      id: "diagnosis",
      label: "What was causing friction",
      sections: [
        {
          eyebrow: "Diagnosis",
          title: "A long way to the first game, with OTP in the way.",
          body: [
            "The existing onboarding journey was lengthy, and OTP friction was an important part of the problem.",
            "I analyzed it at both the product and the technical level: the funnel and dashboards in CleverTap, and the OTP API’s success and failure rates and OTP delivery time.",
          ],
        },
      ],
    },
    {
      id: "decision",
      label: "What I changed",
      sections: [
        {
          eyebrow: "Changes",
          title: "Five changes, all aimed at the first game.",
          body: [
            "The redesign simplified signup and login, fetched the user’s email ID automatically and added OTP auto-read. New users got their first 3 games free, and a live gameplay tutorial was added.",
            "The objective behind all five was the same: less friction, and a faster route to first gameplay.",
          ],
        },
        {
          eyebrow: "Hypothesis",
          title: "Get new players into a game faster, and more of them come back.",
          body: [
            "If new users reach their first game faster, with less signup and OTP friction on the way, then more of them will play on day one and still be around on day seven.",
          ],
        },
        {
          eyebrow: "Strategy",
          title: "Fix the first 60 seconds before paying for the next seven days.",
          reasoning: true,
          body: [
            "When most new users were not reaching a first game on D0, there were two broad ways to respond: bring players back later with reminders and rewards, or get them into a game before they leave.",
            "Every change here does the second. Even the free games are aimed at getting a new player to try the product, not at rewarding them for coming back.",
          ],
        },
        {
          eyebrow: "My role",
          title: "Strategy, analysis and the technical diagnosis",
          body: [
            "I owned the product strategy, the funnel analysis and the CleverTap analytics and dashboards, and did the product and technical diagnosis of the OTP and API friction. I then worked through the issues we had identified with the relevant teams.",
          ],
        },
      ],
    },
    {
      id: "experimentation",
      label: "How we tested it",
      sections: [
        {
          eyebrow: "Controlled rollout",
          title: "30% kept the old onboarding. 70% got the new one.",
          body: [
            "The redesign shipped as a controlled rollout. A 30% control group continued with the existing onboarding, and a 70% treatment group received the redesigned one. The experiment ran for three weeks and involved about 50,000 users.",
          ],
        },
      ],
    },
    {
      id: "outcome",
      label: "What happened",
      sections: [
        {
          eyebrow: "Outcome",
          title: "Day-7 retention: 12.2% in control, 25.4% with the redesign.",
          body: [
            "Day-7 retention was 12.2% in the control group and 25.4% in the treatment group, an increase of 13.2 percentage points.",
            "Positive movement continued beyond Day 7 into the first month (M0), although exact later-period figures aren’t available, so none are shown here.",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "What I learned",
      sections: [
        {
          eyebrow: "Learning",
          title: "Retention is won before the retention metric.",
          body: [
            "The lesson I take from it: retention work often starts upstream of anything labelled retention, in the first session, and sometimes in something as unglamorous as OTP verification.",
            "It connects to the bonus decision at Witzeal: before paying players to stay, check whether the product has given them a reason to.",
          ],
        },
        {
          eyebrow: "Next question",
          title: "What a result like this doesn’t tell you yet",
          reasoning: true,
          body: [
            "The five changes shipped together, so the experiment measures the redesign as a whole. The next question is which of them did the most work, because that decides what to protect and what to simplify.",
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
