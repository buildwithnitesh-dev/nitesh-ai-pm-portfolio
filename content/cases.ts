/**
 * The four selected-work cases, told on one spine so a reader who has seen one
 * knows how to scan the next:
 *
 *   Signal → Problem → Options → Trade-off → Decision → Experiment / Rollout → Outcome → Learning
 *
 * Each case opens with an at-a-glance summary (problem, decision, trade-off,
 * rollout, outcome) for a 20-second read; the stages are the depth. Within a
 * stage, `parts` add evidence blocks without adding stages. `reasoning` marks
 * product reasoning (how the problem was read, or what would be done next), as
 * opposed to documented history, and is labelled on the page. No quotes,
 * numbers or outcomes beyond the documented record (content/evidence-gap-map.md).
 */

import type { CaseSlug, DeltaId } from "./portfolio";

export type Visual =
  | { type: "facts"; items: readonly { term: string; value: string }[] }
  | { type: "signal"; items: readonly { value: string; label: string; basis?: string }[] }
  | { type: "readings"; items: readonly { label: string; where: string; build: string; chosen?: boolean }[] }
  | { type: "hypothesis"; if: string; then: string; measure: string }
  | { type: "options"; items: readonly { name: string; works: string; fails: string; chosen?: boolean; status?: string }[] }
  | { type: "positions"; items: readonly { who: string; wanted: string; because: string; proposed?: boolean }[] }
  | { type: "tradeoffs"; items: readonly { name: string; gains: readonly string[]; costs: readonly string[]; chosen?: boolean }[] }
  | { type: "path"; title: string; steps: readonly { step: string; change: string }[] }
  | { type: "ledger"; items: readonly { value: string; label: string; detail?: string }[]; note?: string }
  | { type: "fit" }
  | { type: "system"; steps: readonly { step: string; detail: string }[]; edge: readonly string[] }
  | { type: "experiment"; control: number; treatment: number; duration: string; users: string; measures: string }
  | { type: "deltas"; ids: readonly DeltaId[]; notes?: readonly string[] }
  | { type: "caveat"; text: string; also?: string; label?: string }
  | { type: "next"; items: readonly string[] }
  | { type: "levers"; groups: readonly { lever: string; changes: readonly string[]; incentive?: boolean }[] }
  | { type: "isolation"; factors: readonly string[]; arms: readonly { arm: string; on: readonly boolean[]; answers: string }[]; note: string }
  | { type: "chain"; links: readonly { metric: string; measured: boolean }[]; note: string }
  | { type: "record"; rows: readonly { term: string; text: string; strong?: boolean }[] };

/** An evidence block inside a stage. */
export type Part = { title: string; body?: readonly string[]; reasoning?: boolean; visual?: Visual };

export type Stage = Part & { id: string; label: string };

/** The 20-second read: what a recruiter should take away before scrolling. */
export type Glance = { problem: string; decision: string; tradeoff: string; rollout: string; outcome: string };

export type Case = {
  slug: CaseSlug;
  /** Capability-first headline; company and domain sit in the metadata line. */
  capability: string;
  company: string;
  product?: string;
  domain: string;
  role: string;
  title: string;
  opening: string;
  standfirst: string;
  description: string;
  headline: readonly DeltaId[];
  glance: Glance;
  /** Role, scope and setting, shown compactly in the header. */
  facts: readonly { term: string; value: string }[];
  scope?: string;
  stages: readonly (Stage & { parts?: readonly Part[] })[];
};

/* -------------------------------------------------------------------------- */
/* 01 · Doubt resolution (Edfora · myPAT)                                      */
/* -------------------------------------------------------------------------- */

export const doubt: Case = {
  slug: "doubt-resolution",
  capability: "Faster doubt resolution without scaling faculty linearly",
  company: "Edfora",
  product: "myPAT",
  domain: "EdTech",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Doubt Resolution",
  opening: "Doubt-resolution turnaround approached 24 hours at peak exam preparation.",
  standfirst: "Engineering wanted an AI-first resolver for scale. Faculty wanted human answers for accuracy and academic integrity. The hybrid that shipped was piloted behind a 90% accuracy gate, and the AI resolver wasn't part of it.",
  description: "Case study: myPAT doubt resolution at Edfora. Three operating models weighed with RICE and unit economics; a hybrid of step-wise hints, verified peer answers and SME escalation piloted with 1,000 students behind a 90% accuracy circuit-breaker. Median resolution time ~24 h → <15 min; D14 return rate ~18% higher than holdout (relative); ~60% modeled support-cost avoidance.",
  headline: ["tat", "d14"],
  glance: {
    problem: "Turnaround near 24 hours at peak, and scaling faculty to fix it grows cost linearly.",
    decision: "A hybrid: step-wise hints and verified peer answers first, SMEs and faculty for what's left. Chosen with RICE and unit economics.",
    tradeoff: "Scale against academic integrity. The AI-first resolver was considered and not shipped.",
    rollout: "1,000-student cohort-gated pilot, a holdout, and a 90% accuracy circuit-breaker with an agreed rollback.",
    outcome: "Median ~24 h → <15 min; D14 return ~18% higher than holdout (relative).",
  },
  facts: [
    { term: "Role", value: "Senior Product Manager, Edfora" },
    { term: "Product", value: "myPAT · doubt resolution for JEE aspirants" },
    { term: "Decision basis", value: "RICE and unit economics" },
    { term: "Pilot", value: "1,000 active JEE batch subscribers, cohort-gated" },
  ],
  stages: [
    {
      id: "signal", label: "Signal",
      title: "Students waited up to a day for an answer, right when they needed one most.",
      body: ["During peak exam preparation, doubt-resolution turnaround for JEE aspirants approached 24 hours."],
      parts: [
        {
          title: "Most doubts looked alike.",
          body: ["Initial sample tagging of logged tickets, with question-ID overlap, suggested about 70% of doubts were repetitive or pattern-matching."],
          visual: { type: "signal", items: [{ value: "~70%", label: "of sampled doubts repetitive or pattern-matching", basis: "Approximate, sample-derived; not a classifier" }] },
        },
      ],
    },
    {
      id: "problem", label: "Problem",
      title: "Not “how do we answer faster”, but how to do it without scaling human support linearly.",
      body: ["The question was how to cut resolution friction without growing faculty operations in step with ticket volume, while keeping answers academically accurate."],
      parts: [
        {
          title: "Three teams, three reasonable positions.",
          visual: {
            type: "positions",
            items: [
              { who: "Engineering / Tech", wanted: "An AI-first resolver", because: "Scale, and lower recurring dependency on faculty" },
              { who: "Academic / Faculty", wanted: "Human resolution", because: "Accuracy and academic integrity" },
              { who: "Product / Growth", wanted: "A hybrid", because: "High-frequency, lower-complexity doubts handled fast; complex ones escalated", proposed: true },
            ],
          },
        },
      ],
    },
    {
      id: "options", label: "Options",
      title: "Three operating models, not three features.",
      body: ["Each option changes who answers a doubt, what it costs per answer, and who is accountable when the answer is wrong."],
      visual: {
        type: "options",
        items: [
          { name: "AI automated doubt resolver", works: "Answers at scale, with low recurring human cost.", fails: "Accuracy and academic-integrity risk on doubts where a wrong answer misleads a student.", status: "Not shipped" },
          { name: "Tutor and faculty marketplace, live 1:1", works: "Human quality on every doubt.", fails: "Cost and capacity grow with every ticket; weak unit economics at peak.", status: "Rejected" },
          { name: "Peer community and step-wise hints, with SME escalation", works: "A fast first response for the repetitive majority, and people for the rest.", fails: "Needs verification, quality controls and an escalation path to be trustworthy.", chosen: true },
        ],
      },
    },
    {
      id: "tradeoff", label: "Trade-off",
      title: "Scale against academic integrity.",
      body: ["The aim was to take the repetitive volume off faculty without letting unverified answers through."],
      visual: {
        type: "tradeoffs",
        items: [
          { name: "AI resolver", gains: ["Scale", "Low recurring human dependency"], costs: ["Accuracy and academic-integrity risk"] },
          { name: "Faculty marketplace", gains: ["Human quality"], costs: ["Poor scalability", "Weaker unit economics"] },
          { name: "Hybrid", gains: ["Scalable first response", "Human quality backstop"], costs: ["Needs quality controls and escalation"], chosen: true },
        ],
      },
    },
    {
      id: "decision", label: "Decision",
      title: "A hybrid resolution model.",
      body: ["Chosen with RICE and unit economics. The full human marketplace was rejected; the rollout combined four parts."],
      visual: {
        type: "record",
        rows: [
          { term: "First response", text: "Structured step-wise hints, instead of answer dumps", strong: true },
          { term: "Peer layer", text: "Community answers, with a verified-answer treatment for high-reputation mentors", strong: true },
          { term: "Quality", text: "Verification and quality guardrails on resolved hints", strong: true },
          { term: "Escalation", text: "Complex or unresolved doubts go to SMEs and faculty", strong: true },
          { term: "Rejected", text: "Tutor and faculty marketplace, on-demand live 1:1" },
          { term: "Not shipped", text: "AI automated doubt resolver" },
        ],
      },
      parts: [
        {
          title: "What we deliberately didn't ship: the AI resolver.",
          body: [
            "AI was evaluated as one strategic option, not treated as the default answer. The rollout put accuracy, academic integrity, scalability, unit economics and measurable quality ahead of automating the answer itself.",
            "No AI resolver shipped in this decision.",
          ],
        },
      ],
    },
    {
      id: "pilot", label: "Pilot",
      title: "The disagreement became a launch gate both sides could check.",
      body: ["Instead of debating whether AI or human resolution was better in principle, the decision was converted into a measurable threshold, on a small cohort, with an agreed way back."],
      visual: {
        type: "record",
        rows: [
          { term: "Cohort", text: "1,000 active JEE batch subscribers, cohort-gated to limit the blast radius", strong: true },
          { term: "Quality gate", text: "A hard 90% accuracy circuit-breaker", strong: true },
          { term: "Measured by", text: "Manual SME sampling of resolved hints, plus post-resolution student satisfaction ratings" },
          { term: "If breached", text: "An agreed rollback" },
          { term: "Holdout", text: "Instant-hint access against the standard response queue" },
          { term: "Gate reading", text: "The measured accuracy isn't in the record, so no figure is shown" },
        ],
      },
    },
    {
      id: "outcome", label: "Outcome",
      title: "Answers in minutes, and students came back.",
      visual: { type: "deltas", ids: ["tat", "d14", "supportCost"] },
      parts: [
        {
          title: "What these numbers can and can't prove.",
          visual: {
            type: "caveat",
            text: "D14 is the pilot cohort against its holdout, for the hybrid as a whole; it can't separate hints from peer answers from escalation. The record doesn't say whether the median turnaround covers the pilot only or a wider rollout.",
            also: "The ~60% is modeled support-cost avoidance against projected ticket growth, not an observed cost reduction.",
          },
        },
      ],
    },
    {
      id: "learning", label: "Learning", reasoning: true,
      title: "Turn a disagreement into a threshold both sides can check.",
      body: ["Both camps were right about something: scale matters, and so does a wrong answer in front of a student. A gate measured by the people who worried most about accuracy made the decision testable instead of political."],
      parts: [
        {
          title: "What I would do differently",
          reasoning: true,
          visual: {
            type: "next",
            items: [
              "Hold out each layer separately, hints, peer answers and escalation, so the D14 lift can be attributed instead of read as one bundle.",
              "Publish the gate's measured accuracy beside the speed result, so the quality claim stands next to the turnaround claim.",
            ],
          },
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 02 · Witzeal onboarding                                                      */
/* -------------------------------------------------------------------------- */

export const witzeal: Case = {
  slug: "onboarding-funnel-redesign",
  capability: "Fixing the path to first value",
  company: "Witzeal Technologies",
  domain: "Real-money gaming",
  role: "Product Manager · May 2022 – Mar 2023",
  title: "Witzeal Onboarding",
  opening: "Only ~12% of new users played on day one.",
  standfirst: "A ~12% Day-7 number looked like a retention problem. The funnel said activation. Five changes to the first 60 seconds, tested against a 30% control, with a clear account of what the test could and couldn't isolate.",
  description: "Case study: only ~12% of new users at Witzeal played a game on day one. Diagnosed as activation, not retention; five onboarding changes tested in a 30/70 controlled rollout. Day-7 retention 12.2% → 25.4%, control vs. treatment, five changes bundled; D0 gameplay 12% → 33%.",
  headline: ["d7", "d0"],
  glance: {
    problem: "Most new users never reached a first game: an activation problem, not a retention one.",
    decision: "Five changes to the first 60 seconds, all aimed at the first game, instead of paying to bring players back.",
    tradeoff: "Shipped as one bundle, including ₹15 of free games: faster to a result, at the price of attribution.",
    rollout: "30% control, 70% treatment, ~50K users, 3 weeks.",
    outcome: "Day-7 retention 12.2% → 25.4%, control vs. treatment (+13.2 pts).",
  },
  facts: [
    { term: "Role", value: "Product Manager, Witzeal Technologies" },
    { term: "Owned", value: "Reading it as activation, the funnel analysis and CleverTap dashboards, the OTP and API diagnosis" },
    { term: "Period", value: "May 2022 – Mar 2023" },
    { term: "Evidence", value: "Behavioral data; no user interviews behind this case" },
  ],
  stages: [
    {
      id: "signal", label: "Signal",
      title: "Two numbers, both around 12%.",
      body: ["Read quickly, a ~12% Day-7 number is a retention problem, and it points toward reminders, rewards and re-engagement."],
      visual: { type: "signal", items: [{ value: "12%", label: "of new users played a game on day one (D0)" }, { value: "~12%", label: "Day-7 retention" }] },
    },
    {
      id: "problem", label: "Problem",
      title: "The loss sat before the first game.",
      body: ["I traced it through the onboarding funnel and through the OTP API's success and failure rates and delivery time. Most new users were lost before they ever reached a game: an activation problem, not simply a retention one."],
      visual: {
        type: "readings",
        items: [
          { label: "Read as retention", where: "Players drift away over the first week", build: "Reminders, rewards, re-engagement campaigns" },
          { label: "Read as activation", where: "Only 12% of new users play on day one", build: "Time to the first game, in the first session", chosen: true },
        ],
      },
      parts: [
        { title: "Get new players into a game faster, and more of them come back.", reasoning: true, visual: { type: "hypothesis", if: "new users reach their first game faster, with less signup and OTP friction", then: "more of them play on day one and are still around on Day 7", measure: "D0 gameplay and Day-7 retention, treatment against a control on the existing onboarding" } },
      ],
    },
    {
      id: "options", label: "Options", reasoning: true,
      title: "Pay to bring them back, or get them to the game.",
      visual: {
        type: "options",
        items: [
          { name: "Bring players back later", works: "Familiar levers: reminders, rewards, re-engagement campaigns.", fails: "Pays to re-engage people who never reached the product's value." },
          { name: "Get players to a game before they leave", works: "Removes the cost before the value moment, in the first session.", fails: "Needs product and API work, not just a campaign.", chosen: true },
        ],
      },
    },
    {
      id: "tradeoff", label: "Trade-off",
      title: "One bundle, one of them an incentive: speed over attribution.",
      body: ["The five changes shipped together, and one was ₹15 of free games per new user. Shipping the bundle was the faster path to a result; the price was knowing how much of the lift came from removing friction and how much from the free games."],
      visual: {
        type: "levers",
        groups: [
          { lever: "Friction", changes: ["Simpler signup and login", "Email fetched automatically", "OTP auto-read"] },
          { lever: "Incentive", changes: ["First 3 games free (₹15)"], incentive: true },
          { lever: "Guidance", changes: ["Live gameplay tutorial"] },
        ],
      },
      parts: [
        {
          title: "Free games as a bridge to first deposit, not an open-ended discount.",
          body: ["Bounded at three entries, aiming for at least 5 game plays and an extension of early engagement toward Day 7."],
          visual: {
            type: "ledger",
            items: [
              { value: "₹15", label: "Onboarding bonus per user", detail: "₹5 free entry × first 3 games" },
              { value: "₹20", label: "Minimum first deposit" },
              { value: "5+", label: "Game plays: the early-engagement goal" },
            ],
            note: "The economics are the design; deposit conversion wasn't measured in the original analysis.",
          },
        },
      ],
    },
    {
      id: "decision", label: "Decision",
      title: "Five changes, all aimed at the first game.",
      body: ["Fix the first 60 seconds before paying to bring players back."],
      visual: {
        type: "path", title: "The path to a first game, and what changed at each step",
        steps: [
          { step: "Signup & login", change: "Simplified" },
          { step: "Email", change: "Fetched automatically" },
          { step: "OTP", change: "Auto-read" },
          { step: "First games", change: "First 3 free" },
          { step: "Gameplay", change: "Live tutorial" },
        ],
      },
    },
    {
      id: "experiment", label: "Experiment",
      title: "30% kept the old onboarding. 70% got the new one.",
      visual: { type: "experiment", control: 30, treatment: 70, duration: "3 weeks", users: "~50K", measures: "D0 gameplay · Day-7 retention" },
    },
    {
      id: "outcome", label: "Outcome",
      title: "More new players reached a game, and more were still playing on Day 7.",
      body: ["Day-7 retention rose 13.2 percentage points, control against treatment, and the positive direction continued into the first month (M0). Later figures aren't available, so none are shown."],
      visual: { type: "deltas", ids: ["d7", "d0"] },
      parts: [
        {
          title: "What the test couldn't isolate.",
          visual: { type: "caveat", label: "Limitation", text: "All five changes shipped as one treatment, so the lift belongs to the bundle. No single change, including the free games, can be credited with it.", also: "D0's comparison type isn't recorded: 12% is the pre-redesign baseline, and whether 33% was read against the concurrent control isn't in the record." },
        },
        {
          title: "Activation was measured. The money it should lead to wasn't.",
          body: ["In a real-money game, a retained player only pays off once they deposit. The test measured the first two links of that chain."],
          visual: {
            type: "chain",
            links: [
              { metric: "D0 gameplay", measured: true },
              { metric: "Day-7 retention", measured: true },
              { metric: "First deposit", measured: false },
              { metric: "Net gaming revenue", measured: false },
            ],
            note: "Business outcome was not measured in the original analysis.",
          },
        },
      ],
    },
    {
      id: "learning", label: "Learning",
      title: "Retention is won before the retention metric.",
      body: ["Retention work often starts upstream of anything labelled retention: in the first session, and sometimes in OTP verification."],
      parts: [
        {
          title: "What I would isolate today",
          reasoning: true,
          body: ["A proposed design, not a test that was run. Each arm answers one question the bundle couldn't."],
          visual: {
            type: "isolation",
            factors: ["Friction fixes", "Free games", "Tutorial"],
            arms: [
              { arm: "Control", on: [false, false, false], answers: "The baseline, on the existing onboarding" },
              { arm: "A", on: [true, false, false], answers: "What removing friction does on its own" },
              { arm: "B", on: [false, true, false], answers: "What the incentive does on its own" },
              { arm: "C", on: [true, true, false], answers: "Whether the incentive adds anything once friction is gone" },
              { arm: "D", on: [true, true, true], answers: "The shipped bundle, as the reference" },
            ],
            note: "Signup, email and OTP stay one arm because they act on the same step. Every extra arm needs its own sample, which is the trade-off against the speed of shipping the bundle. If arm A holds most of the lift, the free games can shrink.",
          },
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 03 · Adaptive practice (Edfora)                                             */
/* -------------------------------------------------------------------------- */

export const edfora: Case = {
  slug: "adaptive-assignment-engine",
  capability: "Matching each question to the learner",
  company: "Edfora",
  product: "Adaptive Practice",
  domain: "EdTech",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Adaptive Practice",
  opening: "Every learner was getting the same next question.",
  standfirst: "A fixed practice sequence was too hard for some learners and too easy for others. Three ways to fix difficulty fit; the one chosen was a 3PL IRT engine. Measured as a before/after, and labelled that way.",
  description: "Case study: a 3PL IRT-based adaptive assignment engine at Edfora. Across a 2-year academic-cycle dataset, assignment completion was 18% on the static path and 45% after the adaptive system was introduced: a before/after, not attributed to the engine alone.",
  headline: ["completion"],
  glance: {
    problem: "One fixed sequence fails in two directions: too hard for some learners, too easy for others.",
    decision: "A 3PL IRT engine that estimates each learner's ability and serves the question that fits.",
    tradeoff: "Harder to explain than a sequence, and dependent on calibrated questions; new learners start least certain.",
    rollout: "Before/after across a 2-year academic-cycle dataset; no holdout.",
    outcome: "Completion 18% → 45% (before/after; not attributed to the engine alone).",
  },
  facts: [
    { term: "Role", value: "Senior PM, Core Practice & Learning Experience" },
    { term: "Team", value: "1 PM (me), 1 APM, 1 designer, 5–7 engineers, 2–3 academic leads" },
    { term: "Owned", value: "Roadmap and prioritization, the PRD and adaptive product logic, post-launch tracking" },
    { term: "Reach", value: "100K+ learners across Edfora's products (not this engine alone)" },
  ],
  stages: [
    {
      id: "signal", label: "Signal",
      title: "Completion stood at 18% on the static path.",
      body: ["Low assignment completion was read as a key driver of learners dropping off. But completion alone couldn't say what to build: an assignment left unfinished looks the same whether it was too hard or too easy."],
    },
    {
      id: "problem", label: "Problem",
      title: "One sequence fails in two directions.",
      body: ["Learners who were behind met questions they couldn't answer; learners who were ahead met questions they already knew."],
      visual: { type: "fit" },
      parts: [
        { title: "Match the question to the learner, not the learner to the sequence.", reasoning: true, visual: { type: "hypothesis", if: "each learner gets questions matched to their current ability instead of a fixed sequence", then: "fewer hit a wall or coast, and more finish the assignment", measure: "Assignment completion (primary), with practice drop-off as the second signal" } },
      ],
    },
    {
      id: "options", label: "Options", reasoning: true,
      title: "Three ways to fix difficulty fit.",
      visual: {
        type: "options",
        items: [
          { name: "Let learners choose their difficulty", works: "Simple to build, and gives learners control.", fails: "The learners who most need an easier path are the least able to judge it." },
          { name: "Move learners between bands with rules", works: "Easy to build and to explain to teachers.", fails: "Treats every question as equally informative: a lucky guess counts as mastery." },
          { name: "Estimate ability and match calibrated questions", works: "Weighs each answer by how much it reveals, and discounts guesses.", fails: "Needs calibrated question parameters; harder to explain than a sequence.", chosen: true },
        ],
      },
    },
    {
      id: "tradeoff", label: "Trade-off",
      title: "Precision, paid for in explainability and calibration.",
      body: ["Ability-based matching is harder to explain to teachers than a fixed sequence, and it only works if every question carries calibrated parameters."],
      parts: [
        {
          title: "A new learner starts with no estimate.",
          body: ["The PRD names initial ability estimation as an edge case. With no history, the first questions are the least informed, which is where a fixed sequence and an adaptive one behave most alike. The method the PRD specifies isn't in the evidence available here, so it isn't described."],
        },
      ],
    },
    {
      id: "decision", label: "Decision",
      title: "A 3PL Item Response Theory engine.",
      body: ["A statistical model, not an LLM: it estimates each learner's ability and selects question difficulty to match."],
      visual: {
        type: "record",
        rows: [
          { term: "Where we were", text: "18% completion on one fixed sequence for every learner" },
          { term: "Chose", text: "Ability estimation with calibrated questions (3PL IRT)", strong: true },
          { term: "Didn't choose", text: "Learner-chosen difficulty; rule-based difficulty bands" },
          { term: "Constraint", text: "Every question needs calibrated parameters" },
          { term: "Success measure", text: "Assignment completion, with practice drop-off as the second signal" },
        ],
      },
      parts: [
        {
          title: "Learner ability on one side, question parameters on the other.",
          body: ["The PRD specifies the loop end to end, from initialization to difficulty adjustment. Its inputs are raw student data, each question's 3PL parameters and content IDs."],
          visual: {
            type: "system",
            steps: [
              { step: "Estimate", detail: "Ability (θ) per concept, from historical performance" },
              { step: "Score", detail: "P(θ) for each candidate, from difficulty (b), discrimination (a) and guessing (c)" },
              { step: "Serve", detail: "A question near current ability; when candidates are comparable, the more discriminating one goes first" },
              { step: "Update", detail: "θ after every response: a correct answer moves the next question harder, an incorrect one easier" },
            ],
            edge: ["Initial ability estimation (a new learner)", "Questions missing 3PL parameters", "Several questions with the same median P(θ)"],
          },
        },
      ],
    },
    {
      id: "rollout", label: "Rollout",
      title: "Measured as a before/after, not a controlled test.",
      body: ["Assignment completion was compared across a 2-year academic-cycle dataset: the static learning path before, the adaptive system after. There was no holdout."],
    },
    {
      id: "outcome", label: "Outcome",
      title: "Completion: 18% → 45%.",
      visual: { type: "deltas", ids: ["completion"], notes: ["+27 percentage points, before vs. after."] },
      parts: [
        { title: "What this number can and can't prove.", visual: { type: "caveat", text: "Concurrent product changes in that period aren't on record, so the increase isn't attributed to the adaptive system alone.", also: "Completion was the measured outcome; learning mastery was not captured in this analysis." } },
      ],
    },
    {
      id: "learning", label: "Learning",
      title: "When completion drops, check the fit before adding content.",
      body: ["Personalize only where it clearly improves the job; everywhere else, a stable default wins."],
      parts: [
        { title: "What I would do differently", reasoning: true, visual: { type: "next", items: ["Hold out a share of learners on the static path, to isolate the engine's effect from everything else that changed.", "Read completion by ability band, starting with new learners, whose first questions carry the most uncertainty."] } },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* 04 · FanBlaze live scores (Baazi Games)                                      */
/* -------------------------------------------------------------------------- */

export const fanblaze: Case = {
  slug: "fanblaze",
  capability: "Killing a weak bet on usage evidence",
  company: "Baazi Games",
  product: "FanBlaze",
  domain: "Fantasy sports",
  role: "Product Manager · Jun 2019 – May 2022",
  title: "FanBlaze",
  opening: "Fewer than 6% of match-day users used live scores.",
  standfirst: "Live scores were built to cut context switching and lift contest joins. Usage stayed under 6%, and the behaviours it was meant to move didn't. The feature was sunset, and the effort moved to pre-match intent.",
  description: "Case study: FanBlaze live scores at Baazi Games. Fewer than 6% of active match-day users used the feature, with no meaningful uplift in mid-match contest joins, lineup changes or re-deposits. Sunset, with effort moved to starting-XI notifications, injury alerts and head-to-head stats.",
  headline: ["fanblaze"],
  glance: {
    problem: "A shipped feature built for live engagement wasn't being used, and wasn't moving contest behaviour.",
    decision: "Sunset live scores; move the effort to pre-match intent.",
    tradeoff: "Writing off a shipped build, against a sports API that kept costing without matching value.",
    rollout: "Shipped, then read by usage after launch; not a controlled test.",
    outcome: "<6% match-day usage; ~2 min longer sessions, no meaningful lift in joins, lineup changes or re-deposits.",
  },
  facts: [
    { term: "Role", value: "Product Manager, Baazi Games" },
    { term: "Product", value: "FanBlaze · fantasy sports" },
    { term: "Evidence", value: "Usage observed after launch" },
  ],
  stages: [
    {
      id: "signal", label: "Signal",
      title: "Almost nobody used it, and what it was for didn't move.",
      visual: { type: "signal", items: [{ value: "<6%", label: "of active match-day users used live scores", basis: "Observed after launch" }, { value: "~2 min", label: "longer sessions, with no meaningful uplift in mid-match contest joins, lineup changes or re-deposits" }] },
    },
    {
      id: "problem", label: "Problem",
      title: "The feature was built on a bet about live intent.",
      body: ["What was built: a live score and play-by-play ticker, contest and match-lobby integration, and match-event pushes."],
      visual: { type: "hypothesis", if: "football scores live inside the app", then: "users switch apps less, and live engagement and contest joins rise", measure: "Mid-match contest joins, lineup changes and re-deposits" },
    },
    {
      id: "options", label: "Options", reasoning: true,
      title: "Keep investing in live, or follow the intent users showed.",
      visual: {
        type: "options",
        items: [
          { name: "Keep iterating on live scores", works: "The build exists, and sessions ran ~2 minutes longer.", fails: "Usage under 6%, and no lift in the behaviours it was built to move." },
          { name: "Sunset it and build for pre-match intent", works: "Moves effort to the moments users act on.", fails: "Writes off a shipped build.", chosen: true },
        ],
      },
    },
    {
      id: "tradeoff", label: "Trade-off",
      title: "A shipped build, against a cost that kept running.",
      body: ["The low-latency sports API added cost without matching value. Keeping the feature meant keeping that cost."],
    },
    {
      id: "decision", label: "Decision",
      title: "Sunset live scores. Build for pre-match intent.",
      visual: {
        type: "record",
        rows: [
          { term: "Sunset", text: "In-app live scores and the play-by-play ticker", strong: true },
          { term: "Moved effort to", text: "Starting-XI notifications, injury alerts and head-to-head stats", strong: true },
        ],
      },
      parts: [
        { title: "The reading behind it.", reasoning: true, body: ["Users already followed scores elsewhere, and fantasy intent was mostly pre-match. This is the reading of the usage data at the time; the record doesn't show it tested on its own."] },
      ],
    },
    {
      id: "rollout", label: "Rollout",
      title: "Shipped, then read by usage.",
      body: ["The evidence is usage observed after launch, not a controlled test."],
    },
    {
      id: "outcome", label: "Outcome",
      title: "The result on record is the one that triggered the sunset.",
      visual: { type: "deltas", ids: ["fanblaze"], notes: ["No result is recorded for the starting-XI notifications, injury alerts or head-to-head stats that replaced it, so none is shown."] },
    },
    {
      id: "learning", label: "Learning",
      title: "Users came for fantasy execution, not passive score consumption.",
      parts: [
        { title: "What I would do differently", reasoning: true, visual: { type: "next", items: ["Test demand for live intent with a lighter version before paying for a low-latency sports integration."] } },
      ],
    },
  ],
};

/** In selected-work order. */
export const cases = { doubt, witzeal, edfora, fanblaze } as const;
export const caseBySlug: Record<CaseSlug, Case> = {
  "doubt-resolution": doubt,
  "onboarding-funnel-redesign": witzeal,
  "adaptive-assignment-engine": edfora,
  fanblaze,
};
