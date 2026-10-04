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
  | { type: "ecosystem" }
  | { type: "known"; supports: readonly string[]; gaps: readonly string[]; note?: string }
  | { type: "matrix"; columns: readonly string[]; /** Phone labels, same meaning. */ short?: readonly string[]; rows: readonly { name: string; cells: readonly string[]; chosen?: boolean }[]; note?: string }
  | { type: "evidence"; primary: DeltaId; secondary?: DeltaId; size?: "lg" | "md" }
  | { type: "adaptive-hero"; outcome: DeltaId }
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
  /** Packs the same content tighter on phones; used by the longest case. */
  compact?: boolean;
  /** Shown in the header: instead of numbers when a case has none, or beneath them. */
  headerVisual?: Visual;
  scope?: string;
  stages: readonly Stage[];
};

export const doubt: Case = {
  slug: "doubt-resolution",
  capability: "Faster answers without scaling support",
  company: "Edfora",
  domain: "EdTech · myPAT · Glorifire",
  role: "Senior Product Manager · Jul 2023 – Jul 2026",
  title: "Doubt Resolution",
  opening: "Reducing Doubt Turn-Around Time (TAT) from 24 Hours to <15 Minutes via a Hybrid Peer & Guided-Hint Architecture",
  standfirst: "During peak JEE exam preparation, doubt resolution on myPAT and Glorifire took about 24 hours, and students studying late at night got blocked. The dilemma: reduce resolution friction without scaling human support linearly, while preserving academic accuracy and trust.",
  description: "Case study: doubt resolution on myPAT and Glorifire at Edfora, owned end to end as Senior PM. An AI auto-resolver, a 1-on-1 tutor marketplace and a hybrid were evaluated on RICE and unit economics; the hybrid of guided hints, verified peer solutions and SME escalation was piloted with 10,000 JEE students. Median TAT ~24 h → <15 min; +18% D14 retention, measured via a pilot holdout / A-B cohort; ~60% support-cost reduction (derived); >90% accuracy maintained. AI was evaluated but not shipped as the first solution.",
  headline: ["tat"],
  compact: true,
  headerVisual: {
    type: "trace",
    steps: [
      { kind: "signal", label: "Evaluated", text: "An AI auto-resolver, as a strategic option" },
      { kind: "decision", label: "Selected", text: "A hybrid: guided hints, verified peer solutions, SME escalation" },
      { kind: "tradeoff", label: "Quality gate", text: "Circuit-breaker at 90%; >90% accuracy maintained" },
      { kind: "outcome", label: "Not shipped first", text: "The AI auto-resolver, while answer-quality risk outweighed its scale" },
    ],
  },
  scope: "Senior PM ownership, end to end: from discovery to phased launch. ~24 h was the peak JEE exam-preparation bottleneck; <15 min is the median TAT measured in the 10,000-student pilot cohort and stable after the live rollout, for the ~70% repetitive-doubt pool.",
  stages: [
    {
      id: "signal", label: "Signal",
      title: "At peak JEE exam preparation, doubt resolution took about 24 hours.",
      body: ["During peak JEE exam preparation, myPAT and Glorifire faced a doubt-resolution bottleneck of about 24 hours. A doubt is a learner stuck on a question; SMEs and faculty resolved them, so a student studying late at night could stay blocked until morning. Approximately 70% of logged tickets were repetitive/pattern-based questions."],
      visual: { type: "signal", items: [{ value: "~70%", label: "of logged tickets were repetitive/pattern-based questions" }] },
    },
    {
      id: "ownership", label: "Ownership",
      title: "I owned it end to end, from discovery to phased launch.",
      body: ["As Senior PM, I personally owned and executed each of these."],
      visual: {
        type: "record",
        rows: [
          { term: "Discover", text: "Discovery · user research" },
          { term: "Decide", text: "AI vs. tutor vs. hybrid evaluation · RICE scoring · unit economics modeling" },
          { term: "Define", text: "PRD · UX flows" },
          { term: "Align", text: "Cross-functional engineering coordination · academic team alignment" },
          { term: "Launch", text: "Cohort pilot design · telemetry implementation · phased launch" },
        ],
      },
    },
    {
      id: "tension", label: "Tension",
      title: "Faster answers, without linear human support or lost accuracy.",
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
      visual: {
        type: "options",
        items: [
          { name: "AI auto-resolver", works: "Fast and highly scalable, with low variable faculty cost.", fails: "Higher risk of incorrect answers damaging academic trust." },
          { name: "1-on-1 live tutor marketplace", works: "High accuracy.", fails: "Poor scalability and unit economics for off-hours demand, and significant operational overhead." },
          { name: "Hybrid P2P community + guided hints", works: "Instantly unblocks repetitive, pattern-based doubts, and escalates complex cases to SME and faculty support.", fails: "Needs verification and quality guardrails so unverified answers don't get through.", chosen: true },
        ],
      },
    },
    {
      id: "basis", label: "Basis",
      title: "I evaluated the alternatives on RICE and unit economics.",
      body: ["I evaluated the alternatives using RICE prioritization and unit economics. A tutor-first model scales human resolution effort with doubt volume, and about 70% of logged tickets were repetitive or pattern-based: volume a guided-hint and peer system can unblock at once."],
      visual: { type: "facts", items: [{ term: "Decision frame", value: "RICE prioritization and unit economics" }, { term: "Not shown", value: "RICE scores and numerical unit-economics inputs (costs, prices, staffing)" }] },
    },
    {
      id: "tradeoff", label: "Trade-off", reasoning: true,
      title: "Scale against academic integrity.",
      visual: {
        type: "matrix",
        columns: ["Scales with doubt volume", "Accuracy and integrity", "Human in the loop"],
        short: ["Scale", "Accuracy", "Human role"],
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
          { term: "Chose", text: "Step-wise guided hint system · verified peer solutions · SME and faculty escalation" },
          { term: "Guardrails", text: "Step-wise hints instead of direct answer dumps; verified mentor and peer credibility signals; SME and faculty escalation for complex cases" },
          { term: "Not chosen", text: "The 1-on-1 live tutor marketplace" },
          { term: "Not shipped first", text: "The AI auto-resolver, evaluated as a strategic option" },
        ],
      },
    },
    {
      id: "gate", label: "Quality gate",
      title: "A circuit-breaker quality gate, and accuracy held above 90%.",
      body: ["The quality bar was a number before launch: a circuit-breaker at 90% accuracy, with an agreed rollback."],
      visual: { type: "facts", items: [{ term: "Gate", value: "Circuit-breaker at 90% accuracy, with an agreed rollback" }, { term: "Audited by", value: "SME sampling of resolved doubts" }, { term: "Monitored with", value: "Post-resolution student satisfaction ratings" }, { term: "Result", value: ">90% resolution accuracy maintained" }] },
    },
    {
      id: "pilot", label: "Pilot",
      title: "10,000 JEE students first, against a holdout, then a phased launch.",
      visual: { type: "facts", items: [{ term: "Cohort", value: "A 10,000-student JEE pilot, cohort-gated to limit the blast radius" }, { term: "Compared", value: "Guided-hint access vs. the standard response queue, with a holdout" }, { term: "Then", value: "A phased launch to live rollout" }, { term: "Not in the record", value: "Pilot duration, the split, holdout size and statistical significance" }] },
    },
    {
      id: "outcome", label: "Outcome",
      title: "Faster answers, more returning learners, accuracy held.",
      visual: {
        type: "ledger",
        items: [
          { value: "<15 min", label: "median doubt-resolution TAT, from ~24 h", detail: "Measured · median TAT in the 10,000-student JEE pilot cohort, stable as the median after the live rollout, for the ~70% repetitive-doubt pool. ~24 h was the peak exam-preparation bottleneck. Median, doubt created → first qualifying resolution." },
          { value: "+18%", label: "D14 retention", detail: "Measured via a pilot holdout / A-B cohort against the standard queue" },
          { value: ">90%", label: "resolution accuracy maintained", detail: "Quality guardrail · audited through SME sampling and post-resolution satisfaction ratings" },
          { value: "~60%", label: "support and operational cost reduction", detail: "Derived · calculated from avoided SME and faculty headcount scaling against ticket growth" },
        ],
        note: "Median TAT and D14 are measured; accuracy is an audited quality guardrail; the ~60% is derived from avoided headcount scaling, not a directly observed financial saving.",
      },
    },
    {
      id: "not-shipped", label: "AI judgment", reasoning: true,
      title: "AI was evaluated, and not shipped as the first solution.",
      body: ["AI was evaluated as a strategic option but was not shipped as the first solution because academic trust and answer-quality risk outweighed its scalability advantage at that stage."],
      visual: {
        type: "trace",
        steps: [
          { kind: "signal", label: "Evaluated", text: "An AI auto-resolver: fast, highly scalable, low variable faculty cost" },
          { kind: "tradeoff", label: "Weighed against", text: "Academic trust and answer-quality risk, and a 90% quality bar" },
          { kind: "outcome", label: "Not shipped first", text: "The hybrid shipped behind the gate instead" },
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
  headline: [],
  headerVisual: { type: "evidence", primary: "d7", secondary: "d0" },
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
      body: ["The redesigned onboarding arm recorded 13.2 percentage points higher Day-7 retention than the concurrent control. The positive direction continued into the first month (M0); later figures aren't available, so none are shown."],
      visual: { type: "evidence", primary: "d7", secondary: "d0" },
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
        note: "The experiment measured activation and retention; the original analysis did not establish the downstream revenue impact.",
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
  headline: [],
  headerVisual: { type: "adaptive-hero", outcome: "completion" },
  scope: "Scope: Core Practice & Learning Experience. Context: Edfora's products reach 100K+ learners overall; that figure is not specific to this engine.",
  stages: [
    {
      id: "context", label: "Context",
      title: "Core practice for an EdTech product.",
      body: [
        "I owned the roadmap and prioritization, the problem analysis, the PRD and adaptive product logic, and post-launch tracking. I worked with engineering on the build, design on the experience, and academic leads on the learning requirements.",
        "The roadmap was RICE-based, fed by regular interviews and usability tests with students and faculty.",
      ],
      visual: { type: "facts", items: [{ term: "Role", value: "Senior PM, Core Practice & Learning Experience" }, { term: "Team", value: "1 PM (me), 1 APM, 1 designer, 5–7 engineers, 2–3 academic leads" }, { term: "Period", value: "Jul 2023 – Jul 2026" }, { term: "Edfora context", value: "100K+ learners across Edfora's products overall; not this engine's reach" }] },
    },
    {
      id: "problem", label: "Problem",
      title: "One sequence fails in two directions.",
      body: ["A fixed sequence couldn't adapt to different learner ability levels: some questions were too hard, others too easy."],
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
      body: ["18% on the static path, 45% after the adaptive system, across a 2-year academic-cycle dataset. The figure at the top of this page carries the full evidence: an observed change, not attributed to the engine alone."],
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
  opening: "DAU had plateaued for two straight months.",
  standfirst: "Teachers had flagged early prototypes as “too game-y”. The product idea: one configurable behavioural system connecting student engagement and faculty workflows, not a set of isolated game mechanics.",
  description: "Case study: a configurable behavioural engagement system at Edfora (Glorifire and the Stakeholder platform), connecting student engagement and faculty workflows: actionable items, points, streaks, badges, avatars, rank and level, leaderboards, a Hall of Fame, analytics, and a myPlan accuracy feedback loop. No engagement or business outcome is attributed to the system.",
  headline: [],
  headerVisual: { type: "ecosystem" },
  scope: "Edfora · Glorifire (students) and the Stakeholder platform (faculty and stakeholders).",
  stages: [
    {
      id: "signal", label: "Signal",
      title: "Flat daily use, in a product with two audiences.",
      body: ["Glorifire is where students practice; the Stakeholder platform is where faculty and stakeholders follow and guide them. Daily active use had been flat for two months."],
      visual: { type: "signal", items: [{ value: "2 months", label: "of flat DAU" }] },
    },
    {
      id: "constraint", label: "Constraint",
      title: "Teachers found early prototypes “too game-y”.",
      body: ["Faculty are part of this product, not only students. Any engagement mechanic had to motivate students without looking gimmicky to the teachers who had flagged the early prototypes."],
    },
    {
      id: "decision", label: "Product decision",
      title: "One configurable system, not isolated game mechanics.",
      body: ["The system is built around configurable behaviour-based actionable items: rewards attach to product actions, and the same mechanics reach students and faculty, rather than each feature carrying its own one-off reward."],
      visual: {
        type: "record",
        rows: [
          { term: "Unit", text: "Configurable behaviour-based actionable items" },
          { term: "Mechanics", text: "Points, streaks and badges; avatars and rank and level; leaderboards and a Hall of Fame" },
          { term: "Audiences", text: "Students on Glorifire; faculty and stakeholders on the Stakeholder platform" },
          { term: "Faculty side", text: "Analytics and leaderboards, and a myPlan feedback loop that rewards accurate verification" },
        ],
      },
    },
    {
      id: "students", label: "System · students",
      title: "Action → reward → progression → recognition.",
      body: ["Each mechanic has a job. An actionable item earns points, streaks and badges; avatars and rank and level make progression visible; leaderboards and the Hall of Fame turn it into recognition."],
    },
    {
      id: "feedback", label: "System · faculty",
      title: "Faculty see the behaviour, and are rewarded for keeping myPlan honest.",
      body: ["Faculty and stakeholders get analytics on learner activity and the same leaderboards. The mechanics reach them too: a system-generated myPlan is shown to faculty, who confirm it as correct or incorrect, and accurate feedback earns 100 points."],
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
      body: ["More visible game mechanics can lift student engagement and cost teacher trust. In this product, faculty are both an audience and part of the loop, through analytics, leaderboards and myPlan verification, so their trust is part of engagement rather than a separate concern."],
    },
    {
      id: "evidence", label: "Evidence",
      title: "The proof here is the system, not a number.",
      visual: {
        type: "known",
        supports: [
          "DAU had plateaued for two straight months.",
          "Teachers flagged early prototypes as “too game-y”.",
          "The system includes points, streaks, badges, avatars, rank and level, leaderboards, a Hall of Fame, analytics and configurable behaviour-based actionable items.",
          "myPlan has faculty Correct / Incorrect verification, and accurate feedback earns 100 points.",
        ],
        gaps: [
          "DAU up 12–15% and average session time up ~15% are résumé-level observations after a quiz and gamification layer, with no method, control or window recorded.",
          "Whether that quiz and gamification layer is exactly the same system as Glorifire's isn't established.",
          "100K+ is Edfora-wide reach, not this system's.",
          "The personal ownership boundary, which parts of the system were mine, isn't established.",
        ],
        note: "No engagement, retention or business outcome is attributed to this behavioural system.",
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
      visual: { type: "next", items: ["Define DAU and session time, and fix the window, before reading any change.", "Hold out a cohort without rewards, to separate the system's effect from everything else that shipped.", "Read engagement by mechanic, so points, streaks, badges and recognition can each be judged on their own.", "Track faculty verification of myPlan before and after the 100-point reward, by course."] },
    },
  ],
};

export const cases = { doubt, witzeal, edfora, behaviour } as const;
