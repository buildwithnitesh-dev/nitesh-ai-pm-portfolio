/**
 * The two flagship case studies, told as product-decision narratives. Each
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
  | { type: "record"; rows: readonly { term: string; text: string }[] };

export type Stage = {
  id: string;
  label: string;
  title: string;
  body?: readonly string[];
  reasoning?: boolean;
  visual?: Visual;
};

export type Case = {
  slug: "onboarding-funnel-redesign" | "adaptive-assignment-engine";
  /** Capability-first headline; company and domain sit in the metadata line. */
  capability: string;
  company: string;
  domain: string;
  role: string;
  title: string;
  opening: string;
  standfirst: string;
  description: string;
  headline: readonly DeltaId[];
  scope?: string;
  stages: readonly Stage[];
};

export const witzeal: Case = {
  slug: "onboarding-funnel-redesign",
  capability: "Fixing the path to first value",
  company: "Witzeal Technologies",
  domain: "Real-money gaming",
  role: "Product Manager · May 2022 – Mar 2023",
  title: "Onboarding Funnel Redesign",
  opening: "Only ~12% of new users played on day one.",
  standfirst: "A ~12% Day-7 number looked like a retention problem. The funnel said activation. Five changes to the first 60 seconds, tested against a 30% control.",
  description: "Case study: only ~12% of new users at Witzeal played a game on day one. Diagnosed as activation, not retention; five onboarding changes tested in a 30/70 controlled rollout. D0 gameplay 12% → 33%, Day-7 retention 12.2% → 25.4%.",
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
      body: ["Read quickly, a ~12% Day-7 number is a retention problem, and it points toward reminders, rewards and re-engagement."],
      visual: { type: "signal", items: [{ value: "12%", label: "of new users played a game on day one (D0)" }, { value: "~12%", label: "Day-7 retention" }] },
    },
    {
      id: "diagnosis", label: "Diagnosis",
      title: "The loss sat before the first game.",
      body: ["I traced it through the onboarding funnel and through the OTP API's success and failure rates and delivery time. Most new users were lost before they ever reached a game: an activation problem, not simply a retention one."],
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
  title: "Adaptive Assignment Engine",
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
      visual: { type: "deltas", ids: ["completion"], notes: ["+27 percentage points. Practice drop-offs also reduced."] },
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

export const cases = { witzeal, edfora } as const;
