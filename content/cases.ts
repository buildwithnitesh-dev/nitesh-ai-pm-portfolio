/**
 * The four flagship case studies, told as product-decision narratives. Each
 * stage is one step of the decision; `reasoning` marks product reasoning (how
 * the problem was read), as opposed to documented history, and is labelled on
 * the page. No quotes, numbers or outcomes beyond the documented record.
 */

import type { DeltaId } from "./portfolio";

export type Visual =
  | { type: "facts"; items: readonly { term: string; value: string }[] }
  | { type: "signal"; items: readonly { value: string; label: string }[] }
  | { type: "readings"; items: readonly { label: string; where: string; build: string; chosen?: boolean }[] }
  | { type: "hypothesis"; if: string; then: string; measure: string }
  | { type: "options"; items: readonly { name: string; works: string; fails: string; chosen?: boolean }[] }
  | { type: "path"; title: string; steps: readonly { step: string; change: string }[] }
  | { type: "ledger"; items: readonly { value: string; label: string; detail?: string }[]; note?: string }
  | { type: "fit" }
  | { type: "system"; steps: readonly { step: string; detail: string }[]; edge: readonly string[] }
  | { type: "experiment"; control: number; treatment: number; duration: string; users: string; measures: string }
  | { type: "deltas"; ids: readonly DeltaId[]; notes?: readonly string[] }
  | { type: "caveat"; text: string; also?: string }
  | { type: "next"; items: readonly string[] }
  | { type: "levers"; groups: readonly { lever: string; changes: readonly string[]; incentive?: boolean }[] }
  | { type: "isolation"; factors: readonly string[]; arms: readonly { arm: string; on: readonly boolean[]; answers: string }[]; note: string }
  | { type: "chain"; links: readonly { metric: string; measured: boolean }[]; note: string }
  | { type: "record"; rows: readonly { term: string; text: string }[] }
  | { type: "loop"; steps: readonly { stage: string; items: readonly string[] }[]; note?: string }
  | { type: "split"; sides: readonly { who: string; items: readonly string[] }[]; note?: string }
  | { type: "matrix"; columns: readonly string[]; rows: readonly { name: string; cells: readonly string[]; chosen?: boolean }[]; note?: string }
  | { type: "trace"; steps: readonly { kind: "signal" | "decision" | "tradeoff" | "outcome" | "learning"; label: string; text: string }[]; note?: string };

export type Stage = {
  id: string;
  label: string;
  title: string;
  body?: readonly string[];
  reasoning?: boolean;
  visual?: Visual;
};

export type Case = {
  slug: "doubt-resolution" | "onboarding-funnel-redesign" | "adaptive-assignment-engine" | "behavioural-loops";
  /** Capability-first headline; company and domain sit in the metadata line. */
  capability: string;
  company: string;
  domain: string;
  role: string;
  title: string;
  opening: string;
  standfirst: string;
  description: string;
  /** Headline numbers; empty when the evidence is the system rather than a metric. */
  headline: readonly DeltaId[];
  /** Shown in the header: instead of numbers when a case has none, or beneath them. */
  headerVisual?: Visual;
  scope?: string;
  stages: readonly Stage[];
};

export const doubt: Case = {
  slug: "doubt-resolution",
  capability: "Faster answers without scaling support",
  company: "Edfora",
  domain: "EdTech · myPAT",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Doubt Resolution",
  opening: "Doubt resolution approached 24 hours at peak exam preparation.",
  standfirst: "How do you cut resolution friction without scaling human support linearly, and without giving up academic accuracy? An AI resolver, a tutor marketplace and a hybrid were weighed. The hybrid was chosen, held to a 90% accuracy gate in a 1,000-student pilot, and the AI resolver was not shipped.",
  description: "Case study: myPAT doubt resolution at Edfora. An AI resolver, a tutor marketplace and a hybrid were weighed on RICE and unit economics; the hybrid was piloted behind a 90% accuracy gate with 1,000 students. Median resolution time ~24 h → <15 min; D14 return rate ~18% higher than holdout (relative); ~60% modeled support-cost avoidance. The AI resolver was not shipped.",
  headline: ["tat"],
  headerVisual: {
    type: "trace",
    steps: [
      { kind: "signal", label: "Considered", text: "An AI resolver, for scale" },
      { kind: "decision", label: "Selected", text: "A hybrid: step-wise hints, verified peer answers, SME escalation" },
      { kind: "tradeoff", label: "Quality gate", text: "90% accuracy, with an agreed rollback" },
      { kind: "outcome", label: "Not shipped", text: "The AI resolver, as the final solution" },
    ],
  },
  scope: "Median, doubt created → first qualifying resolution, in myPAT doubt resolution. D14 and support-cost figures are in Outcome, each with its basis.",
  stages: [
    {
      id: "signal", label: "Signal",
      title: "At peak exam preparation, median turnaround approached 24 hours.",
      body: ["A doubt is a learner stuck on a question and asking for help. In myPAT, an Edfora product for JEE aspirants, doubts were resolved by people: SMEs and faculty. At peak exam preparation the wait approached a day. Initial sample tagging of logged tickets, with question-ID overlap, suggested most doubts were repetitive or pattern-matching."],
      visual: { type: "signal", items: [{ value: "~24 h", label: "median turnaround at peak exam preparation" }, { value: "~70%", label: "of sampled doubts repetitive or pattern-matching (approximate, sample-derived; not an automated classifier)" }] },
    },
    {
      id: "tension", label: "Tension",
      title: "Cut the wait without scaling human support linearly, and without giving up academic accuracy.",
      body: ["Each function read the problem differently, and each had a point."],
      visual: {
        type: "record",
        rows: [
          { term: "Engineering", text: "AI-first resolver: scale, and lower recurring dependence on faculty" },
          { term: "Faculty", text: "Human resolution: accuracy and academic integrity" },
          { term: "Product & growth", text: "A hybrid: high-frequency, lower-complexity doubts handled at scale; complex ones escalated to people" },
        ],
      },
    },
    {
      id: "options", label: "Options",
      title: "Three strategies, not three features.",
      body: ["Each option is a different answer to who resolves a doubt, and what that costs as volume grows."],
      visual: {
        type: "options",
        items: [
          { name: "AI automated doubt resolver", works: "Scales with volume and lowers recurring dependence on faculty.", fails: "Accuracy and academic integrity were the open risk, and the reason faculty preferred human resolution." },
          { name: "Tutor and faculty marketplace, live 1:1", works: "Human accuracy, on demand.", fails: "Support cost grows with every doubt: the linear scaling the problem ruled out." },
          { name: "Peer answers, step-wise hints and SME escalation", works: "Takes the repetitive volume off faculty; complex or unresolved doubts still reach a person.", fails: "Needs verification and quality guardrails so unverified answers don't get through.", chosen: true },
        ],
      },
    },
    {
      id: "basis", label: "Basis",
      title: "Decided on RICE and unit economics.",
      body: ["RICE weighed each option's reach, impact, confidence and effort. Unit economics asked how support cost grows with doubt volume under each option, which is where the marketplace failed: every doubt costs a person's time."],
      visual: { type: "facts", items: [{ term: "Frameworks", value: "RICE; unit economics" }, { term: "Outcome", value: "The full human marketplace was rejected" }, { term: "Not in the record", value: "The RICE scores and the unit-economics inputs. None are shown" }, { term: "Modeled later", value: "~60% support-cost avoidance (see Outcome)" }] },
    },
    {
      id: "tradeoff", label: "Trade-off", reasoning: true,
      title: "Scale against academic integrity.",
      body: ["The hybrid gives up some of the AI resolver's theoretical scale, and some of the marketplace's certainty, to hold both lines at once."],
      visual: {
        type: "matrix",
        columns: ["Scales with doubt volume", "Accuracy and integrity", "Human in the loop"],
        rows: [
          { name: "AI-first", cells: ["Highest, in theory", "Highest risk", "Not by default"] },
          { name: "Human-first", cells: ["Linear cost", "Highest confidence", "Always"] },
          { name: "Hybrid", cells: ["Repetitive volume at scale", "Gated at 90%, with rollback", "On escalation"], chosen: true },
        ],
        note: "Product reasoning from the documented options and stakeholder positions; the cells are qualitative, not scores.",
      },
    },
    {
      id: "decision", label: "Decision",
      title: "Selected: a hybrid, with people where it matters.",
      visual: {
        type: "record",
        rows: [
          { term: "Chose", text: "Structured step-wise hints · peer and community answers · verification and quality guardrails · escalation of complex or unresolved doubts to SMEs and faculty" },
          { term: "Guardrails", text: "Step-wise hints instead of answer dumps; verified-answer treatment for high-reputation mentors" },
          { term: "Rejected", text: "The full tutor and faculty marketplace" },
          { term: "Not in the rollout", text: "The AI automated resolver" },
        ],
      },
    },
    {
      id: "gate", label: "Quality gate",
      title: "A 90% accuracy threshold, used as the gate.",
      body: ["A hard circuit-breaker: if accuracy fell below 90%, the agreed rollback applied. The quality bar was a number before launch, not an opinion after it."],
      visual: { type: "facts", items: [{ term: "Threshold", value: "90% accuracy, as a hard circuit-breaker" }, { term: "Measured by", value: "Manual SME sampling of hints marked resolved" }, { term: "Read alongside", value: "Post-resolution student satisfaction ratings" }, { term: "Not in the record", value: "A measured accuracy figure. The gate is shown, not a result against it" }] },
    },
    {
      id: "pilot", label: "Pilot",
      title: "1,000 students first, against a holdout.",
      body: ["A cohort-gated rollout limited the blast radius. The pilot compared instant-hint access with the standard response queue."],
      visual: { type: "facts", items: [{ term: "Cohort", value: "1,000 active JEE batch subscribers, cohort-gated" }, { term: "Compared", value: "Instant-hint access vs. the standard response queue" }, { term: "Not in the record", value: "Pilot duration, the split, holdout size and statistical significance" }, { term: "Read as", value: "A controlled-cohort result, not attributed to any one component" }] },
    },
    {
      id: "outcome", label: "Outcome",
      title: "Faster answers, more returning learners, a modeled support curve.",
      visual: {
        type: "ledger",
        items: [
          { value: "<15 min", label: "median doubt-resolution time, down from ~24 h", detail: "Measured · doubt created → first qualifying resolution" },
          { value: "~18%", label: "higher D14 return rate than the holdout cohort", detail: "Relative, not percentage points · pilot A/B holdout" },
          { value: "~60%", label: "modeled support-cost avoidance", detail: "Avoided paid SME and faculty headcount against projected ticket-volume growth" },
        ],
        note: "The ~60% is modeled: it is not an observed budget reduction or a cost saving. D14 is the controlled-cohort result, not attributed to any one component.",
      },
    },
    {
      id: "not-shipped", label: "Not shipped", reasoning: true,
      title: "The AI resolver was considered, and not shipped.",
      body: ["It had the strongest scale story and was the option engineering favoured. It wasn't part of the rollout: the accuracy and integrity concerns had no answer yet, while the hybrid could be held to a measured gate from day one. The full marketplace was rejected outright."],
      visual: {
        type: "trace",
        steps: [
          { kind: "signal", label: "Considered", text: "AI-first resolution, for scale and lower faculty dependence" },
          { kind: "tradeoff", label: "Weighed against", text: "Faculty's accuracy and academic-integrity concerns, and a 90% quality bar" },
          { kind: "outcome", label: "Not shipped", text: "Not the final solution; the hybrid was piloted behind the gate instead" },
        ],
        note: "No AI resolver, model or LLM went into production in this decision.",
      },
    },
    {
      id: "learning", label: "Learning", reasoning: true,
      title: "Problem first. Model second.",
      body: ["The question was never whether AI could answer doubts. It was how to cut the wait without trading away accuracy."],
      visual: {
        type: "next",
        items: [
          "Scale is not the only optimization target: accuracy and integrity set the limits it had to work within.",
          "A quality gate decides whether an AI path is viable. Written as a number with a rollback, it turned a debate into something a pilot could settle.",
          "A hybrid can beat a binary AI-versus-human choice: automate the repetitive volume, keep people where judgment matters.",
        ],
      },
    },
  ],
};

const LOOP = {
  type: "loop",
  steps: [
    { stage: "Behaviour", items: ["Actionable items, configured per product action"] },
    { stage: "Reward", items: ["Points", "Streaks", "Badges"] },
    { stage: "Progression", items: ["Avatars", "Rank and level"] },
    { stage: "Recognition", items: ["Leaderboards", "Hall of Fame"] },
    { stage: "Analytics", items: ["Student activity", "Faculty and stakeholder analytics"] },
  ],
} as const satisfies Visual;

export const witzeal: Case = {
  slug: "onboarding-funnel-redesign",
  capability: "Fixing the path to first value",
  company: "Witzeal Technologies",
  domain: "Real-money gaming",
  role: "Product Manager · May 2022 – Mar 2023",
  title: "Onboarding Funnel Redesign",
  opening: "Only 12% of new users played a game on day one.",
  standfirst: "A 12.2% Day-7 number looked like a retention problem. The funnel said activation. Five changes to the first 60 seconds, tested against a 30% control.",
  description: "Case study: only 12% of new users at Witzeal played a game on day one. Diagnosed as activation, not retention; five onboarding changes tested in a 30/70 controlled rollout. D0 gameplay 12% → 33%, Day-7 retention 12.2% → 25.4%.",
  headline: ["d0", "d7"],
  stages: [
    {
      id: "context", label: "Context",
      title: "Growth for a real-money gaming platform.",
      body: ["I owned growth, onboarding, monetization and lifecycle. On this problem: the call to read it as activation, the funnel analysis and CleverTap dashboards, and the product and technical diagnosis of the OTP and API friction."],
      visual: { type: "facts", items: [{ term: "Company", value: "Witzeal Technologies" }, { term: "Role", value: "Product Manager" }, { term: "Period", value: "May 2022 – Mar 2023" }, { term: "Tools", value: "CleverTap funnels and dashboards" }] },
    },
    {
      id: "signal", label: "Signal",
      title: "Two numbers, both around 12%.",
      body: ["Read quickly, a 12.2% Day-7 number is a retention problem, and it points toward reminders, rewards and re-engagement."],
      visual: { type: "signal", items: [{ value: "12%", label: "of new users played a game on day one (D0)" }, { value: "12.2%", label: "Day-7 retention" }] },
    },
    {
      id: "diagnosis", label: "Diagnosis",
      title: "The drop wasn't motivation. It sat before the first game.",
      body: ["I traced it through the onboarding funnel and through the OTP API's success and failure rates and delivery time. Most new users were lost before they ever reached a game, in signup and OTP verification: an activation problem, not simply a retention one. Step-level drop-off rates weren't kept in the record, so none are shown."],
      visual: {
        type: "readings",
        items: [
          { label: "Read as retention", where: "Players drift away over the first week", build: "Reminders, rewards, re-engagement campaigns" },
          { label: "Read as activation", where: "Only 12% of new users play on day one", build: "Time to the first game, in the first session", chosen: true },
        ],
      },
    },
    {
      id: "insight", label: "User insight", reasoning: true,
      title: "Players weren't rejecting the game. Most never reached it.",
      body: ["There are no user interviews behind this case, so the insight comes from behavior: the value moment was the first game, and only about one in eight new users got there on day one. Everything before it was cost without value."],
    },
    {
      id: "hypothesis", label: "Hypothesis", reasoning: true,
      title: "Get new players into a game faster, and more of them come back.",
      visual: { type: "hypothesis", if: "new users reach their first game faster, with less signup and OTP friction", then: "more of them play on day one and are still around on Day 7", measure: "D0 gameplay and Day-7 retention, treatment against a control on the existing onboarding" },
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
      id: "tradeoff", label: "Trade-off",
      title: "Free games as a bridge to first deposit, not an open-ended discount.",
      body: ["The goal was to extend early engagement toward Day 7 and drive at least 5 game plays. The free games were bounded: three entries, then the first deposit."],
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
    {
      id: "experiment", label: "Experiment",
      title: "30% kept the old onboarding. 70% got the new one.",
      visual: { type: "experiment", control: 30, treatment: 70, duration: "3 weeks", users: "~50K", measures: "D0 gameplay · Day-7 retention" },
    },
    {
      id: "result", label: "Result",
      title: "More new players reached a game, and more were still playing on Day 7.",
      body: ["Day-7 retention rose 13.2 percentage points, control against treatment, and the positive direction continued into the first month (M0). Later figures aren't available, so none are shown."],
      visual: { type: "deltas", ids: ["d7", "d0"] },
    },
    {
      id: "business", label: "Business link",
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
    {
      id: "isolation", label: "Limits",
      title: "One thing the test could not isolate.",
      body: [
        "The rollout shipped five changes together, and one of them was an incentive: ₹15 of free games per new user. The test shows the bundle worked. It cannot show how much of the lift came from removing friction and how much from the free games.",
        "That distinction matters, because the argument of this work is to fix the product before paying for engagement. Shipping the bundle was the faster path to a result; the price was attribution.",
      ],
      visual: {
        type: "levers",
        groups: [
          { lever: "Friction", changes: ["Simpler signup and login", "Email fetched automatically", "OTP auto-read"] },
          { lever: "Incentive", changes: ["First 3 games free (₹15)"], incentive: true },
          { lever: "Guidance", changes: ["Live gameplay tutorial"] },
        ],
      },
    },
    {
      id: "next", label: "Isolate", reasoning: true,
      title: "What I would isolate today.",
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
    {
      id: "learning", label: "Learning",
      title: "Retention is won before the retention metric.",
      body: ["Retention work often starts upstream of anything labelled retention: in the first session, and sometimes in OTP verification."],
    },
  ],
};

export const edfora: Case = {
  slug: "adaptive-assignment-engine",
  capability: "Personalizing the learning path",
  company: "Edfora",
  domain: "EdTech",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Adaptive Practice Engine",
  opening: "Every learner was getting the same next question.",
  standfirst: "A fixed practice sequence was too hard for some learners and too easy for others. Three ways to fix difficulty fit; the one chosen was a 3PL IRT engine.",
  description: "Case study: a 3PL IRT-based adaptive assignment engine at Edfora. Across a 2-year academic-cycle dataset, assignment completion was 18% on the static path and 45% after the adaptive system was introduced, not attributed to the engine alone.",
  headline: ["completion"],
  scope: "Edfora's learning and engagement products reached 100K+ learners overall; that figure is not specific to this engine.",
  stages: [
    {
      id: "context", label: "Context",
      title: "Core practice for an EdTech product.",
      body: [
        "I owned the roadmap and prioritization, the problem analysis, the PRD and adaptive product logic, and post-launch tracking. I worked with engineering on the build, design on the experience, and academic leads on the learning requirements.",
        "The roadmap was RICE-based, fed by regular interviews and usability tests with students and faculty.",
      ],
      visual: { type: "facts", items: [{ term: "Role", value: "Senior PM, Core Practice & Learning Experience" }, { term: "Team", value: "1 PM (me), 1 APM, 1 designer, 5–7 engineers, 2–3 academic leads" }, { term: "Period", value: "Jul 2023 – Jul 2026" }, { term: "Reach", value: "100K+ learners across Edfora's products (not this engine alone)" }] },
    },
    {
      id: "problem", label: "Problem",
      title: "One sequence fails in two directions.",
      body: ["Low assignment completion was a key driver of learners dropping off. Learners who were behind met questions they couldn't answer; learners who were ahead met questions they already knew."],
      visual: { type: "fit" },
    },
    {
      id: "signal", label: "Signal",
      title: "Completion stood at 18% on the static path.",
      body: ["Both failure modes look identical in completion data: an assignment that doesn't get finished. So completion alone couldn't say what to build; it had to be read against how each learner was performing."],
    },
    {
      id: "hypothesis", label: "Hypothesis", reasoning: true,
      title: "Match the question to the learner, not the learner to the sequence.",
      visual: { type: "hypothesis", if: "each learner gets questions matched to their current ability instead of a fixed sequence", then: "fewer hit a wall or coast, and more finish the assignment", measure: "Assignment completion (primary), with practice drop-off as the second signal" },
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
      id: "decision", label: "Decision",
      title: "A 3PL Item Response Theory engine.",
      body: ["A statistical model, not an LLM: it estimates each learner's ability and selects question difficulty to match."],
      visual: {
        type: "record",
        rows: [
          { term: "Where we were", text: "18% completion on one fixed sequence for every learner" },
          { term: "Where we aimed", text: "Each learner's next question matched to their current ability" },
          { term: "Chose", text: "Ability estimation with calibrated questions (3PL IRT)" },
          { term: "Didn't choose", text: "Learner-chosen difficulty; rule-based difficulty bands" },
          { term: "Constraint", text: "Every question needs calibrated parameters" },
          { term: "Risk", text: "Harder to explain than a sequence; a new learner's first questions are the least certain" },
          { term: "Success measure", text: "Assignment completion, with practice drop-off as the second signal" },
        ],
      },
    },
    {
      id: "system", label: "System",
      title: "Learner ability on one side, question parameters on the other.",
      body: ["The PRD specifies the loop end to end: initialization, ability calculation, concept selection, question assignment, response evaluation, ability update and difficulty adjustment, until the practice ends. Its inputs are raw student data, each question's 3PL parameters and content IDs."],
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
    {
      id: "cold-start", label: "Cold start",
      title: "A new learner starts with no estimate.",
      body: ["The PRD names initial ability estimation as an edge case. With no history, the first questions are the least informed and the estimate sharpens as answers come in, which is where a fixed sequence and an adaptive one behave most alike. The method the PRD specifies isn't in the evidence available here, so it isn't described."],
    },
    {
      id: "rollout", label: "Rollout",
      title: "Measured as a before/after, not a controlled test.",
      body: ["Assignment completion was compared across a 2-year academic-cycle dataset: the static learning path before, the adaptive system after."],
    },
    {
      id: "result", label: "Result",
      title: "Completion: 18% → 45%.",
      visual: { type: "deltas", ids: ["completion"], notes: ["+27 percentage points, before vs. after."] },
    },
    {
      id: "attribution", label: "Attribution",
      title: "What this number can and can't prove.",
      visual: { type: "caveat", text: "Concurrent product changes in that period aren't on record, so the increase isn't attributed to the adaptive system alone.", also: "Completion was the measured outcome; learning mastery was not captured in this analysis." },
    },
    {
      id: "learning", label: "Learning",
      title: "When completion drops, check the fit before adding content.",
      body: ["Personalize only where it clearly improves the job; everywhere else, a stable default wins. Ability-based matching is harder to explain, depends on well-calibrated questions, and a new learner's first questions carry the most uncertainty."],
    },
    {
      id: "next", label: "Next", reasoning: true,
      title: "What I would do next",
      visual: { type: "next", items: ["Hold out a share of learners on the static path, to isolate the engine's effect from everything else that changed.", "Read completion by ability band, starting with new learners, whose first questions carry the most uncertainty."] },
    },
  ],
};


export const behaviour: Case = {
  slug: "behavioural-loops",
  capability: "Designing behavioural loops across students and faculty",
  company: "Edfora",
  domain: "EdTech · Glorifire / Stakeholder",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Behavioural Loops & Gamification",
  opening: "DAU had been flat for two straight months.",
  standfirst: "The answer wasn't more game features. It was a configurable behavioural engagement system across student and faculty workflows: product actions tied to rewards, progression, recognition and analytics.",
  description: "Case study: a configurable behavioural engagement system at Edfora (Glorifire and the Stakeholder platform), across student and faculty workflows: actions, points, streaks, badges, avatars, rank and level, leaderboards, a Hall of Fame, analytics, and a myPlan accuracy feedback loop. No engagement or business outcome is attributed to the system.",
  headline: [],
  headerVisual: LOOP,
  scope: "The evidence in this case is the product system, as documented in the platform's screens. Screens aren't reproduced here.",
  stages: [
    {
      id: "context", label: "Context",
      title: "Two audiences in one classroom product.",
      body: ["Glorifire is where students practice; the Stakeholder platform is where faculty and stakeholders follow and guide them. Any engagement mechanic had to work for both."],
      visual: { type: "facts", items: [{ term: "Company", value: "Edfora" }, { term: "Products", value: "Glorifire · Stakeholder platform" }, { term: "Role", value: "Senior Product Manager" }, { term: "Users", value: "Students; faculty and stakeholders" }] },
    },
    {
      id: "signal", label: "Signal",
      title: "Flat DAU, and teachers wary of anything “too game-y”.",
      body: ["Daily active use had been flat for two straight months. When early quiz prototypes reached teachers, they flagged them as “too game-y”."],
      visual: { type: "signal", items: [{ value: "2 months", label: "of flat DAU" }, { value: "“Too game-y”", label: "teachers' read of early quiz prototypes" }] },
    },
    {
      id: "problem", label: "Problem",
      title: "Reinforce the right behaviours, for students and for faculty.",
      body: ["Engagement needed a system that reinforced the behaviours that matter, for learners and for the faculty and stakeholders around them, not a scattering of game mechanics bolted onto features."],
    },
    {
      id: "decision", label: "Decision",
      title: "A configurable behavioural layer, not hard-coded rewards.",
      visual: {
        type: "record",
        rows: [
          { term: "Chose", text: "A behavioural engagement layer built around product actions, with configurable reward rules" },
          { term: "Didn't choose", text: "One-off rewards hard-coded into individual features" },
          { term: "Defined", text: "The actionable behaviours each reward is tied to" },
          { term: "Mechanics", text: "Points, streaks and badges; avatars and rank and level; leaderboards and a Hall of Fame" },
          { term: "Built for", text: "Student workflows and faculty and stakeholder workflows, with analytics on both" },
        ],
      },
    },
    {
      id: "system", label: "System",
      title: "Behaviour → reward → progression → recognition → analytics.",
      body: ["Each mechanic has a job in the loop. An action earns a reward; rewards add up to progression; progression is made visible as recognition; and analytics show faculty which behaviours are actually happening."],
      visual: LOOP,
    },
    {
      id: "workflows", label: "Workflows",
      title: "The same system, two sides of it.",
      visual: {
        type: "split",
        sides: [
          { who: "Students · Glorifire", items: ["Earn points for actionable items", "Keep streaks, unlock badges", "Avatars, rank and level", "Leaderboards and the Hall of Fame"] },
          { who: "Faculty and stakeholders · Stakeholder platform", items: ["Configure behaviour-based actionable items", "Analytics on learner activity", "Leaderboards", "Confirm myPlan accuracy, and earn points for it"] },
        ],
      },
    },
    {
      id: "feedback", label: "Feedback loop",
      title: "Paying faculty, in points, for the feedback that keeps myPlan honest.",
      body: ["The same mechanics reach faculty. A system-generated myPlan is shown to faculty, who confirm it as correct or incorrect; accurate feedback earns 100 points."],
      visual: {
        type: "path", title: "Confirmation of myPlan accuracy",
        steps: [
          { step: "myPlan", change: "Generated by the system" },
          { step: "Faculty", change: "Review it" },
          { step: "Feedback", change: "Correct or incorrect" },
          { step: "Reward", change: "100 points if accurate" },
        ],
      },
    },
    {
      id: "tradeoff", label: "Trade-off",
      title: "Engagement against teacher credibility.",
      body: ["The mechanics had to motivate students without looking gimmicky to the teachers who had flagged early prototypes. The work with design was to keep them from feeling like a game for its own sake: in a classroom product, teacher trust is part of the engagement loop."],
    },
    {
      id: "evidence", label: "Evidence",
      title: "The proof here is the system, not a number.",
      visual: {
        type: "caveat",
        text: "No engagement, retention or business outcome is attributed to this behavioural system. The résumé records DAU up 12–15% and average session time up ~15% after the quiz and gamification layer, with no method or control, so those figures stay on the decision record (D-08) as directional.",
        also: "100K+ learners is the reach of Edfora's products overall, not of this system.",
      },
    },
    {
      id: "learning", label: "Learning", reasoning: true,
      title: "Design the rules, not the rewards.",
      body: ["A reward is only as good as the behaviour it is tied to. Making actions configurable lets one system reinforce different behaviours for students and for faculty, and the myPlan reward shows the pattern: pay for the behaviour that keeps the product honest."],
    },
    {
      id: "next", label: "Next", reasoning: true,
      title: "What I would measure next",
      visual: { type: "next", items: ["Hold out a cohort without rewards, to separate the system's effect from everything else that shipped.", "Track faculty verification of myPlan before and after the 100-point reward, by course."] },
    },
  ],
};

export const cases = { doubt, witzeal, edfora, behaviour } as const;
