/**
 * The canonical content model. Every page, the share card, structured data and
 * /llms.txt read from here, so a fact lives in exactly one place.
 *
 * Evidence rules: numbers keep the precision they were reported with (ranges
 * stay ranges, "~" stays "~"), each one says how it was measured, and any
 * attribution caveat travels with the number wherever it is shown.
 */

export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager",
  positioning: "Growth × Consumer × AI",
  experience: "~7 years product management · 10+ years technology",
  location: "Delhi NCR · open to Mumbai",
  /** For structured data (knowsAbout). */
  strengths: [
    "Growth", "Monetization", "Personalization", "Product Strategy", "Experimentation",
    "Consumer Products", "AI Products", "Retention", "Product Analytics",
  ] as const,
  /** Tools from the résumé that the work on this site actually shows. "OpenAI API" and "Prompt engineering" are left out: no artifact backs them. */
  tools: [
    "Mixpanel", "CleverTap", "GA4", "Firebase", "Jira", "Figma",
    "Postman", "Notion", "Miro",
  ] as const,
};

export const contact = {
  email: "buildwithnitesh@gmail.com",
  linkedin: "https://www.linkedin.com/in/buildwithnitesh/",
  /** The résumé PDF, served from /public. */
  resumeUrl: "/Nitesh_Product_Manager_Resume.pdf",
  lookingFor: "Senior Product Manager and Product Manager roles, especially in growth, consumer products and AI",
};

export const seo = {
  title: `${profile.name} · Senior Product Manager · Growth, Consumer & AI`,
  description:
    "Senior Product Manager · Growth × Consumer × AI. Day-7 retention 12.2% → 25.4% in a controlled rollout; median doubt-resolution time ~24 h → <15 min, choosing a gated hybrid over an AI resolver; ~20% less bonus spend with retention held.",
  /** Shorter title and description for link previews (WhatsApp, LinkedIn, Slack, X). */
  share: {
    title: "Nitesh Tiwari · Senior Product Manager · Growth × Consumer × AI",
    description: "Retention is won before the retention metric. ~7 years in product management, 10+ in technology: find where users drop before they reach value, and fix the product first.",
    imageAlt: "Nitesh Tiwari, Senior Product Manager, Growth × Consumer × AI. Day-7 retention 12.2% to 25.4% in a controlled rollout; median doubt-resolution time about 24 hours to under 15 minutes.",
  },
};

/** Primary navigation, in the order a hiring manager asks: what he built, how he decides, AI, who he is. Resume is a separate button. */
export const nav = [
  { href: "/work", label: "Work" },
  { href: "/decisions", label: "Decisions" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/about", label: "About" },
] as const;

/* -------------------------------------------------------------------------- */
/* Evidence: every number on the site, defined once.                           */
/* -------------------------------------------------------------------------- */

export type DeltaId = "d0" | "d7" | "completion" | "bonus" | "learners" | "tat";

export type Delta = {
  label: string;
  /** Display strings, exactly as reported. */
  before?: string;
  after: string;
  /** Numeric values for the proportional bar; absent for counts. */
  from?: number;
  to?: number;
  /** Axis maximum for this metric's own bar. */
  max?: number;
  /** How it was measured, in a few words: the basis of the comparison comes first. */
  method: string;
  /** What the number counts, as recorded. */
  definition: string;
  /** The longer methodological note, shown on expansion only. */
  detail?: string;
  /** Where it happened. */
  context: string;
  /** Attribution caveat; shown wherever the number is. */
  note?: string;
  /** The story behind the number. */
  href: string;
  /*
   * Evidence-aware fields (optional; used by the case evidence figure).
   * A change is only ever computed or drawn when `comparisonValid` is true.
   */
  /** What each end of the comparison is, e.g. "control" and "treatment". */
  fromLabel?: string;
  toLabel?: string;
  /** Unit for the computed change; "pp" = percentage points, never a relative uplift. */
  changeUnit?: "pp";
  comparisonValid?: boolean;
  precision?: "exact" | "approximate";
  evidenceType?: "experimental" | "before-after" | "observational" | "modeled" | "directional";
  /** Experiment metadata, shown as context, not as outcomes. */
  contextItems?: readonly string[];
  caveats?: readonly string[];
  businessImplication?: string;
};

/**
 * The change between the two ends of a delta, or null when the comparison isn't
 * valid (e.g. the comparison basis isn't recorded). Rounded to one decimal so
 * floating-point noise never reaches the page.
 */
export function changeOf(d: Delta): { value: string; unit: "pp" } | null {
  if (!d.comparisonValid || d.changeUnit !== "pp" || d.from === undefined || d.to === undefined) return null;
  const v = Math.round((d.to - d.from) * 10) / 10;
  return { value: `${v > 0 ? "+" : ""}${v.toFixed(1)}`, unit: "pp" };
}

export const deltas: Record<DeltaId, Delta> = {
  d0: {
    label: "D0 gameplay",
    before: "12%", after: "33%", from: 12, to: 33, max: 40,
    method: "Before/after level · comparison basis not recorded",
    definition: "Share of new users who played a game on their first day.",
    detail: "12% is the documented baseline before the redesign. The record lists 33% among the rollout's results but doesn't say whether it was read against the concurrent control or as the level after launch, so it is shown as a change in level, not as a test result.",
    context: "Witzeal · onboarding redesign",
    href: "/work/onboarding-funnel-redesign#result",
    comparisonValid: false,
    precision: "approximate",
    evidenceType: "before-after",
    caveats: ["12% is the pre-redesign baseline; whether 33% was read against the concurrent control is not recorded."],
  },
  d7: {
    label: "Day-7 retention",
    before: "12.2%", after: "25.4%", from: 12.2, to: 25.4, max: 30,
    method: "Controlled rollout · 30/70 · ~50K users · 3 weeks",
    definition: "Definition not recorded: the original experiment record doesn't capture the denominator.",
    detail: "Control (existing onboarding) against treatment (redesigned), concurrently. The treatment bundled five changes, one of them an incentive, so the lift belongs to the bundle. Statistical significance wasn't recorded.",
    context: "Witzeal · onboarding redesign",
    note: "Bundle result · definition not recorded",
    href: "/work/onboarding-funnel-redesign#result",
    fromLabel: "control",
    toLabel: "treatment",
    changeUnit: "pp",
    comparisonValid: true,
    precision: "exact",
    evidenceType: "experimental",
    contextItems: ["~50K users", "~3 weeks", "30/70 controlled rollout"],
    caveats: [
      "Five onboarding changes shipped together, including a ₹15 free-game incentive; causal isolation was limited.",
      "Day-7 definition and statistical significance were not recorded.",
    ],
    businessImplication: "The redesigned onboarding arm recorded 13.2 percentage points higher Day-7 retention than the concurrent control.",
  },
  completion: {
    label: "Assignment completion",
    before: "18%", after: "45%", from: 18, to: 45, max: 60,
    method: "Before/after · 2-year academic-cycle dataset",
    definition: "Definition not recorded: how completion was counted isn't captured in the analysis.",
    detail: "The static learning path before, the adaptive system after; no holdout. Concurrent product changes aren't on record. Completion was the measured outcome; learning mastery was not captured in this analysis.",
    context: "Edfora · adaptive assignments",
    note: "Not attributed to the adaptive system alone",
    href: "/work/adaptive-assignment-engine#result",
    fromLabel: "static path",
    toLabel: "after the adaptive system",
    comparisonValid: false,
    precision: "exact",
    evidenceType: "before-after",
    contextItems: ["Before / after", "2-year academic-cycle dataset"],
    caveats: [
      "Observed across the academic cycles before and after the adaptive system; not attributed to the engine alone.",
      "How completion was counted isn't recorded.",
      "Learning mastery was not captured.",
    ],
    businessImplication: "Assignment completion rose from 18% to 45% across the academic cycles before and after the adaptive system launched; the change is observed, not attributed to the engine alone.",
  },
  bonus: {
    label: "Bonus & discount spend",
    after: "~20% ↓",
    method: "Directional · retention held · flat tiers → expected ROI per segment",
    definition: "Bonus and discount spend after allocation moved from flat tiers to expected ROI per segment.",
    detail: "No time window or baseline is recorded. The objective was incremental NGR per rupee of bonus spend; the NGR outcome wasn't captured, so the result is reported as spend and retention.",
    context: "Witzeal · bonus allocation",
    href: "/decisions#bonus-allocation",
  },
  tat: {
    label: "Median doubt-resolution time",
    before: "~24 h", after: "<15 min",
    method: "Measured · median, doubt created → first qualifying resolution",
    definition: "Median timestamp delta between doubt_created and first_qualifying_resolution_event.",
    detail: "Turnaround before the change approached 24 hours during peak exam preparation. The after figure is the median for myPAT doubt resolution once the hybrid was live; percentiles and the measurement window aren't recorded.",
    context: "Edfora · myPAT doubt resolution",
    href: "/decisions#doubt-resolution",
  },
  learners: {
    label: "Learners reached",
    after: "100K+",
    method: "Across Edfora's learning and engagement products",
    definition: "Reach of Edfora's products overall; not active users, and not one feature.",
    context: "Edfora",
    note: "Product reach overall, not one feature",
    href: "/about#edfora",
  },
};

/** The Day-7 result, as the share card draws it. */
export const retentionHeadline = { before: 12.2, after: 25.4, label: "Day-7 retention", context: "Witzeal · onboarding redesign" };

/* -------------------------------------------------------------------------- */
/* Homepage                                                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  role: profile.role,
  headline: "Retention is won before the retention metric.",
  positioning: profile.positioning,
  lede: "I find where users drop before they reach value, fix the product before reaching for incentives, and hold AI to a measured quality gate before it ships — with an engineer's view of how it gets built.",
  /** Three results, one per kind of strength: activation, a strategic trade-off, incentive economics. */
  proof: [
    { id: "d7", context: "Witzeal · onboarding, controlled rollout", href: "/work/onboarding-funnel-redesign" },
    { id: "tat", context: "Edfora · myPAT, hybrid over an AI resolver", href: "/work/doubt-resolution" },
    { id: "bonus", context: "Witzeal · bonus allocation by segment ROI", href: "/decisions#bonus-allocation" },
  ] as const satisfies readonly { id: DeltaId; context: string; href: string }[],
};

/** The share card keeps its three proof points (app/opengraph-image.tsx). */
export const shareProof = ["d7", "tat"] as const satisfies readonly DeltaId[];

/**
 * Same PM, different domains: each capability with one piece of evidence from
 * gaming and one from EdTech. Every line restates a claim made, with its
 * caveat, elsewhere on the site; nothing here is new evidence.
 */
export const domains: readonly {
  capability: string;
  /** `short` is the same evidence in fewer words, for phones. */
  gaming: { text: string; short: string; href: string };
  edtech: { text: string; short: string; href: string };
}[] = [
  { capability: "Activation", gaming: { text: "Five changes to the first 60 seconds, all aimed at the first game", short: "Five changes to the first 60 seconds", href: "/work/onboarding-funnel-redesign" }, edtech: { text: "A stuck learner's next step in minutes, not a day: hints and peer answers before escalation", short: "A stuck learner's next step in minutes, not a day", href: "/work/doubt-resolution" } },
  { capability: "Retention", gaming: { text: "Day-7 retention lifted by fixing activation, not by paying for re-engagement", short: "D7 lifted by fixing activation, not paying for it", href: "/work/onboarding-funnel-redesign#result" }, edtech: { text: "D14 return rate ~18% higher than the holdout cohort (relative)", short: "D14 return ~18% higher vs holdout (relative)", href: "/work/doubt-resolution#outcome" } },
  { capability: "Experimentation", gaming: { text: "30/70 controlled rollout on ~50K users; a testing program at Baazi Games", short: "30/70 rollout, ~50K users; a testing program", href: "/decisions#experimentation" }, edtech: { text: "1,000-student cohort-gated pilot against a holdout", short: "1,000-student gated pilot vs holdout", href: "/work/doubt-resolution#pilot" } },
  { capability: "Segmentation", gaming: { text: "Journeys redesigned per behavioural cluster instead of one default", short: "Journeys per behavioural cluster", href: "/decisions#segmented-journeys" }, edtech: { text: "Questions matched to each learner's estimated ability (3PL IRT)", short: "Questions matched to ability (3PL IRT)", href: "/work/adaptive-assignment-engine#system" } },
  { capability: "Incentive economics", gaming: { text: "Bonuses by expected ROI per segment instead of flat tiers, retention held", short: "Bonuses by segment ROI, retention held", href: "/decisions#bonus-allocation" }, edtech: { text: "Hybrid chosen on RICE and unit economics: ~60% modeled support-cost avoidance", short: "~60% modeled support-cost avoidance", href: "/work/doubt-resolution#decision" } },
  { capability: "Risk", gaming: { text: "~18% lower fraud losses after rules-based anomaly detection", short: "~18% lower fraud losses (anomaly rules)", href: "/about#baazi" }, edtech: { text: "A hard 90% accuracy circuit-breaker with an agreed rollback", short: "90% accuracy circuit-breaker, rollback", href: "/work/doubt-resolution#gate" } },
  { capability: "Funnel diagnosis", gaming: { text: "Loss traced to signup and OTP verification, before the first game", short: "Loss traced to signup and OTP", href: "/work/onboarding-funnel-redesign#diagnosis" }, edtech: { text: "Low completion read against each learner's performance: one sequence failing in two directions", short: "Completion read against learner ability", href: "/work/adaptive-assignment-engine#problem" } },
  { capability: "Behavioural engagement", gaming: { text: "Live scores sunset at under 6% usage; effort moved to pre-match intent", short: "Live scores sunset at <6% usage", href: "/decisions#fanblaze" }, edtech: { text: "A configurable reward system across students and faculty: points, streaks, badges, rank, Hall of Fame", short: "Configurable rewards for students and faculty", href: "/work/behavioural-loops" } },
];

/**
 * Five roles (Built → Shipped → Measured → Grew → Personalized), then AI as
 * continued, independent product building: what each taught, and the proof.
 * The last entry is not employment; `independent` marks it everywhere it is shown.
 */
export const arc = [
  { verb: "Built", role: "Android Developer", field: "Android engineering", org: "Direct Create", years: "2014–2018", taught: "How software gets built.", proof: "Sole Android developer: built the app from scratch, crash rate down ~30%." },
  { verb: "Shipped", role: "Program & Release Manager", field: "Program & release", org: "PwC India", years: "2019", taught: "How software ships.", proof: "Standardized releases for enterprise web applications across four distributed teams." },
  { verb: "Measured", role: "Product Manager", field: "Experimentation", org: "Baazi Games", years: "2019–2022", taught: "How users behave, and how to measure it.", proof: "Experimentation, segmentation and risk across PokerBaazi, Lagai Khai and FanBlaze." },
  { verb: "Grew", role: "Product Manager", field: "Growth", org: "Witzeal Technologies", years: "2022–2023", taught: "How growth and monetization work.", proof: "Onboarding, bonus economics and lifecycle messaging for a real-money gaming platform." },
  { verb: "Personalized", role: "Senior Product Manager", field: "Learning products", org: "Edfora", years: "2023–2026", taught: "How a product adapts to each user.", proof: "Adaptive practice, doubt resolution and engagement systems on products that reach 100K+ learners." },
  { verb: "AI", role: "Independent prototype", field: "Current direction", org: "AI Learner Diagnostic", years: "Now", independent: true, taught: "The same discipline, applied to AI-native products.", proof: "AI Learner Diagnostic: an independent prototype, evaluation designed before any model work." },
] as const;

/* -------------------------------------------------------------------------- */
/* Flagship cases (index; the stories live in content/cases.ts)                */
/* -------------------------------------------------------------------------- */

export const flagships = [
  {
    index: "01",
    slug: "doubt-resolution",
    href: "/work/doubt-resolution",
    capability: "Strategic trade-offs",
    tags: ["Senior PM", "Strategy", "Consumer", "AI judgment"],
    headline: "Faster answers without scaling support",
    company: "Edfora",
    domain: "EdTech · myPAT",
    role: "Senior Product Manager · 2023–2026",
    title: "Doubt Resolution",
    opening: "Doubt resolution approached 24 hours at peak exam preparation.",
    /** Homepage index: the problem in one line, and the decision in a few words. */
    problem: "Reduce resolution friction without scaling human support linearly.",
    brief: "Hybrid of hints, verified peer answers and SME escalation, behind a 90% accuracy gate.",
    /** The AI judgment in three beats, shown on the homepage only for this story. */
    aiPath: [
      { kind: "signal", label: "Considered", text: "An AI resolver, for scale" },
      { kind: "decision", label: "Selected", text: "A hybrid: step-wise hints, verified peer answers, SME escalation" },
      { kind: "tradeoff", label: "Quality gate", text: "90% accuracy, with an agreed rollback" },
      { kind: "outcome", label: "Not shipped", text: "The AI resolver, as the final solution" },
    ],
    summary: "An AI resolver, a tutor marketplace, or a hybrid. The hybrid was chosen on RICE and unit economics, held to a 90% accuracy gate in a 1,000-student pilot, and the AI resolver was not shipped.",
    decision: "Step-wise hints, verified peer answers and SME escalation, behind a 90% accuracy gate. The AI resolver was not shipped.",
    tradeoff: "Scale against academic integrity: take the repetitive volume off faculty without letting unverified answers through.",
    delta: "tat" as DeltaId,
  },
  {
    index: "02",
    slug: "onboarding-funnel-redesign",
    href: "/work/onboarding-funnel-redesign",
    capability: "Activation",
    tags: ["Growth", "Activation", "Retention", "Experimentation"],
    headline: "Fixing the path to first value",
    company: "Witzeal Technologies",
    domain: "Real-money gaming",
    role: "Product Manager · 2022–2023",
    title: "Onboarding Funnel Redesign",
    opening: "Only 12% of new users played a game on day one.",
    problem: "Only 12% of new users played a game on day one.",
    brief: "Five changes to the first 60 seconds, tested against a 30% control.",
    summary: "Read as a retention problem, it pointed to reminders and rewards. The funnel said activation. Five changes to the first 60 seconds, tested against a 30% control, and a clear account of what the test could and couldn't isolate.",
    decision: "Five changes to the first 60 seconds, tested against a 30% control.",
    tradeoff: "Shipping the five changes as one bundle was faster; the price was attribution, since one of them was ₹15 of free games.",
    delta: "d0" as DeltaId,
  },
  {
    index: "03",
    slug: "adaptive-assignment-engine",
    href: "/work/adaptive-assignment-engine",
    capability: "Personalization",
    tags: ["Personalization", "Product logic", "Technical depth"],
    headline: "Personalizing the learning path",
    company: "Edfora",
    domain: "EdTech · Adaptive Practice",
    role: "Senior Product Manager · 2023–2026",
    title: "Adaptive Practice Engine",
    opening: "Every learner was getting the same next question.",
    problem: "Every learner was getting the same next question.",
    brief: "A 3PL IRT engine that matches each question to the learner's estimated ability.",
    summary: "Three ways to fix difficulty fit, one chosen: a 3PL IRT engine that estimates each learner's ability and matches the question to it.",
    decision: "A 3PL IRT engine that estimates each learner's ability and matches the question to it.",
    tradeoff: "Fit against explainability: every question needs calibrated parameters, and a new learner's first questions are the least certain.",
    delta: "completion" as DeltaId,
  },
  {
    index: "04",
    slug: "behavioural-loops",
    href: "/work/behavioural-loops",
    capability: "Behavioural systems",
    tags: ["Consumer engagement", "Behavioural systems"],
    headline: "Designing behavioural loops across students and faculty",
    company: "Edfora",
    domain: "EdTech · Glorifire / Stakeholder",
    role: "Senior Product Manager · 2023–2026",
    title: "Behavioural Loops & Gamification",
    opening: "DAU had been flat for two straight months.",
    problem: "DAU had been flat for two straight months, and teachers found early prototypes “too game-y”.",
    brief: "A configurable behavioural layer across students and faculty, not one-off rewards.",
    /** Short evidence line for the homepage index. */
    evidenceShort: "The system: actions → points, streaks, badges → rank → leaderboards, Hall of Fame → analytics. No outcome attributed.",
    summary: "A configurable behavioural engagement system across student and faculty workflows: actions tied to points, streaks and badges, progression through avatars and rank, recognition on leaderboards and a Hall of Fame, and analytics for faculty.",
    decision: "A configurable behavioural layer built around product actions, not one-off rewards, for students and faculty alike.",
    tradeoff: "Motivate students without looking gimmicky to the teachers who had flagged early prototypes as “too game-y”.",
    /** No outcome metric is attributed to this system; the evidence is the system itself. */
    evidence: "Behaviour → reward → progression → recognition → analytics, configurable per action. No engagement or business outcome is attributed to it.",
  },
] as const;

export type CaseSlug = (typeof flagships)[number]["slug"];

/* -------------------------------------------------------------------------- */
/* Decision library                                                            */
/* -------------------------------------------------------------------------- */

export type Verdict = "Shipped" | "Sunset" | "Program" | "System" | "Pilot";

export type Decision = {
  id: string;
  code: string;
  title: string;
  company: string;
  product?: string;
  area: string;
  role: string;
  verdict: Verdict;
  /** Ordered stages; the grammar is shared across every card. */
  stages: readonly { term: string; text: string }[];
  /** Evidence: a Delta, or plain documented results, each with how it was measured where that is short. */
  delta?: DeltaId;
  results?: readonly { text: string; basis?: string }[];
  details?: readonly { term: string; items: readonly string[] }[];
  learning?: string;
  note?: string;
  /** The full case study, when the decision has one. */
  caseHref?: string;
};

export const decisions: readonly Decision[] = [
  {
    id: "fanblaze",
    code: "D-01",
    title: "Sunset live scores. Build for pre-match intent.",
    company: "Baazi Games",
    product: "FanBlaze",
    area: "Fantasy sports",
    role: "Product Manager",
    verdict: "Sunset",
    stages: [
      { term: "Hypothesis", text: "In-app live football scores would cut context switching and lift live engagement and contest joins." },
      { term: "Built", text: "A live score and play-by-play ticker, contest and match-lobby integration, match-event pushes." },
      { term: "Signal", text: "Fewer than 6% of active match-day users used it. Sessions grew ~2 minutes, with no meaningful uplift in mid-match contest joins, lineup changes or re-deposits." },
      { term: "Why it missed", text: "Users already followed scores elsewhere, fantasy intent was mostly pre-match, and the low-latency sports API added cost without matching value." },
      { term: "Decision", text: "Sunset the feature and move the effort to starting-XI notifications, injury alerts and head-to-head stats." },
    ],
    results: [{ text: "<6% of match-day users used it", basis: "Observed after launch" }, { text: "~2 min longer sessions" }, { text: "No meaningful uplift in contest joins, lineup changes or re-deposits" }],
    learning: "Users came for fantasy execution, not passive score consumption.",
  },
  {
    id: "bonus-allocation",
    code: "D-02",
    title: "Stop paying the same bonus to every player.",
    company: "Witzeal Technologies",
    area: "Monetization",
    role: "Product Manager",
    verdict: "Shipped",
    stages: [
      { term: "Signal", text: "Reward costs were eating into margin without a clear retention payoff. Bonuses were allocated in flat tiers." },
      { term: "Decision", text: "Replace flat tiers with expected ROI per segment, optimizing for incremental NGR (net gaming revenue) per rupee of bonus spend." },
      { term: "Trade-off", text: "Cutting incentives in real-money gaming can quietly hurt retention, the main risk going in. It only reads as a win because both numbers moved the right way." },
    ],
    delta: "bonus",
    results: [{ text: "Retention held" }],
    note: "The objective was incremental NGR per rupee of bonus spend. The NGR outcome wasn't captured, so the result is reported as spend and retention.",
    details: [
      { term: "Segments", items: ["New / onboarding", "High-value / core LTV drivers", "Low-value / recreational", "Dormant / at-risk"] },
      { term: "Mechanics", items: ["High-value: targeted loss-protection and liquidity-matched bonuses", "Low-value / at-risk: friction-reduction top-ups tied to deposit triggers"] },
    ],
  },
  {
    id: "experimentation",
    code: "D-03",
    title: "Run experiments to reduce uncertainty, not to win.",
    company: "Baazi Games",
    area: "Experimentation",
    role: "Product Manager",
    verdict: "Program",
    stages: [
      { term: "Practice", text: "20+ A/B tests run end to end: hypothesis, sample size and significance." },
      { term: "Signal", text: "A fair number came back inconclusive or negative." },
      { term: "Decision", text: "Use those results to change how later tests were scoped, instead of treating them as failures." },
    ],
    learning: "Experiments are not successful because they win. They are successful because they reduce uncertainty.",
  },
  {
    id: "testing-roadmap",
    code: "D-04",
    title: "Replace one-off monetization bets with a testing roadmap.",
    company: "Witzeal Technologies",
    area: "Experimentation",
    role: "Product Manager",
    verdict: "Program",
    stages: [
      { term: "Signal", text: "Monetization results were inconsistent from one change to the next; the diagnosis was a lack of structured testing." },
      { term: "Decision", text: "An experimentation roadmap across pricing and reward loops, each change written as a hypothesis and run as an A/B test." },
      { term: "Trade-off", text: "Testing is slower per idea than shipping on conviction. Every result, including the flat ones, narrows the next bet." },
    ],
    note: "No outcome is attributed to the roadmap: the revenue trend from that period has no recorded baseline, comparison or attribution, so it isn't shown.",
  },
  {
    id: "segmented-journeys",
    code: "D-05",
    title: "Stop designing one journey for every kind of player.",
    company: "Baazi Games",
    area: "Personalization",
    role: "Product Manager",
    verdict: "Shipped",
    stages: [
      { term: "Signal", text: "A single default journey was underperforming across different player segments." },
      { term: "Decision", text: "Use behavioral clustering to find the segments that behaved differently, then redesign the journey for each." },
      { term: "Trade-off", text: "Every extra journey is more to build, test and maintain. Segmentation pays off when segments are few and clearly different." },
    ],
    results: [{ text: "Session duration up ~35%, retention up ~25%", basis: "Method not captured" }],
  },
  {
    id: "pokerbaazi-matchmaking",
    code: "D-06",
    title: "Match new players to tables they can survive.",
    company: "Baazi Games",
    product: "PokerBaazi",
    area: "Real-money poker",
    role: "Product Manager",
    verdict: "Shipped",
    stages: [
      { term: "Problem", text: "Optimize for D7 liquidity and player survival, not only D0 ARPPU or raw server latency." },
      { term: "Decision", text: "Contextual matchmaking on historical wallet size and skill band, so new players see fewer inappropriate high-stakes tables." },
      { term: "Trade-off", text: "Client-side polling only for active seat counts; static table metadata served from edge CDN cache." },
    ],
    note: "No outcome is shown: the record has no magnitude or method for the player-level results, and the latency figure is an infrastructure measure whose ownership isn't recorded.",
  },
  {
    id: "faculty-signals",
    code: "D-07",
    title: "Turn a monthly spreadsheet into a signal a teacher can act on.",
    company: "Edfora",
    area: "Data product",
    role: "Senior Product Manager",
    verdict: "Shipped",
    stages: [
      { term: "Signal", text: "Students disengaged well before faculty found out: retention data arrived through a monthly spreadsheet pull." },
      { term: "Decision", text: "Real-time engagement dashboards, so faculty could step in while a student was still reachable." },
      { term: "Trade-off", text: "A dashboard shows everything and leaves the teacher to find the problem; the documented next layer, myAdvisor, moves to prioritized alerts timed around a teacher's schedule." },
    ],

    details: [
      { term: "myAdvisor, as documented", items: ["High- and medium-priority alerts, raised at module level", "History, with filters by module and date", "Deep links into the part of the product where the teacher can act"] },
      { term: "Designed for attention", items: ["Notifications timed around a teacher's schedule", "Unread alerts handled deliberately"] },
    ],
    note: "No outcome is shown: the retention figure on record has no unit, comparison or method. myAdvisor is product design from the documentation.",
  },
  {
    id: "gamification",
    code: "D-08",
    title: "Make practice more engaging without making it look like a game.",
    company: "Edfora",
    area: "Engagement",
    role: "Senior Product Manager",
    verdict: "Shipped",
    stages: [
      { term: "Signal", text: "DAU had been flat for two months. Teachers flagged early quiz prototypes as “too game-y”." },
      { term: "Decision", text: "Keep the quiz and gamification layer, and work with design so the mechanics don't feel gimmicky to teachers." },
      { term: "Trade-off", text: "In a classroom product, teacher trust is part of the engagement loop, so some raw engagement is worth trading for credibility." },
    ],
    results: [{ text: "DAU up ~12–15%, average session time up ~15%", basis: "As recorded on the résumé: before/after, no method or control, and not attributed to the behavioural system on its own" }],
    caseHref: "/work/behavioural-loops",
  },
  {
    id: "myplan-accuracy",
    code: "D-09",
    title: "Pay for the feedback that keeps the system honest.",
    company: "Edfora",
    product: "myPlan · Stakeholder",
    area: "Feedback loop",
    role: "Senior Product Manager",
    verdict: "System",
    stages: [
      { term: "Signal", text: "A system-generated myPlan is only useful if it is right, and faculty are the people who can tell." },
      { term: "Decision", text: "Faculty confirm each myPlan as correct or incorrect, and accurate feedback earns 100 points, so verification is part of the behavioural loop rather than a chore outside it." },
    ],
    details: [
      { term: "The loop, as documented", items: ["System-generated myPlan information", "Faculty verification", "Correct / Incorrect feedback", "100 points for accurate feedback"] },
    ],
    note: "Product-system evidence from the platform's screens, not an outcome. No accuracy or engagement result is attributed to it.",
    caseHref: "/work/behavioural-loops#feedback",
  },
  {
    id: "doubt-resolution",
    code: "D-10",
    title: "Reduce doubt-resolution friction without scaling human support linearly.",
    company: "Edfora",
    product: "myPAT · Doubt resolution",
    area: "Prioritization",
    role: "Senior Product Manager",
    verdict: "Pilot",
    stages: [
      { term: "Signal", text: "During peak exam preparation, doubt-resolution turnaround for JEE aspirants approached 24 hours." },
      { term: "Problem", text: "Reduce resolution friction without scaling human faculty operations linearly." },
      { term: "Positions", text: "Engineering wanted an AI-first resolver, for scale and lower recurring faculty dependency. Faculty wanted human resolution, for accuracy and academic integrity. Product and growth proposed a hybrid for high-frequency, lower-complexity doubts, with escalation for complex ones." },
      { term: "Evidence", text: "Initial sample tagging of logged tickets, with question-ID overlap, suggested ~70% of doubts were repetitive or pattern-matching. An approximate, sample-derived figure, not an automated classifier." },
      { term: "Decision", text: "Rejected the full human marketplace, using RICE and unit economics. The initial rollout combined structured step-wise hints, peer and community answers with verification and quality guardrails, and escalation of complex or unresolved doubts to SMEs and faculty." },
      { term: "Guardrails", text: "Step-wise hints instead of answer dumps; verified-answer treatment for high-reputation mentors; a cohort-gated pilot of 1,000 active JEE batch subscribers to limit the blast radius; and a hard 90% accuracy circuit-breaker, measured by manual SME sampling of resolved hints plus student satisfaction ratings, with an agreed rollback if it was breached." },
      { term: "Trade-off", text: "Scale against academic integrity: take the repetitive volume off faculty without letting unverified answers through." },
    ],
    details: [
      { term: "Options considered", items: ["A. AI automated doubt-resolver bot: not part of the initial rollout", "B. Tutor and faculty marketplace, on-demand live 1:1: rejected", "C. Peer community and step-wise hints, with escalation: chosen"] },
    ],
    delta: "tat",
    results: [
      { text: "D14 return rate ~18% higher than the holdout cohort (relative)", basis: "Pilot A/B holdout: instant-hint access vs. the standard response queue" },
      { text: "~60% modeled support-cost avoidance", basis: "Modeled: avoided paid SME and faculty headcount against projected ticket-volume growth; not an observed budget reduction" },
    ],
    note: "D14 is reported as the controlled-cohort result, not attributed to any one component. AI was one option considered; no AI resolver shipped in this decision.",
    caseHref: "/work/doubt-resolution",
  },
  {
    id: "one-app",
    code: "D-11",
    title: "Ship one app with three roles, not three apps.",
    company: "Direct Create",
    area: "Product and engineering",
    role: "Android Developer",
    verdict: "Shipped",
    stages: [
      { term: "Signal", text: "The platform connected makers, buyers and designers. The alternative was a separate app for each." },
      { term: "Decision", text: "As the sole Android developer, proposed one app where people choose their role, then built it from scratch with the CEO and CTO." },
      { term: "Trade-off", text: "More role logic inside one product, against one codebase, one app to market and a lower technology bill for a small team." },
    ],
    results: [{ text: "Platform context: 400+ maker shops and 100+ designers" }],
    note: "An Android Developer role, not product management. The platform figures describe scale; they are not claimed as a result of this decision.",
  },
];

/* -------------------------------------------------------------------------- */
/* Approach                                                                    */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    n: "01",
    title: "Diagnose before building.",
    body: "Find where users actually drop, and why, before choosing what to build.",
    example: { text: "A 12.2% Day-7 number pointed to reminders and rewards. The funnel showed only 12% of new users played a game on day one: an activation problem, with a different fix.", label: "Witzeal · Diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
  },
  {
    n: "02",
    title: "One outcome decides. The rest explain.",
    body: "Pick one outcome tied to user value, and treat activity metrics as diagnosis rather than success.",
    example: { text: "At Edfora, assignment completion was the outcome; practice drop-off was the second signal that explained it.", label: "Edfora · Hypothesis", href: "/work/adaptive-assignment-engine#hypothesis" },
  },
  {
    n: "03",
    title: "Experiments can fail.",
    body: "Experiments are not successful because they win. They are successful because they reduce uncertainty.",
    example: { text: "20+ A/B tests at Baazi Games, a fair number inconclusive or negative, and they changed how later tests were scoped. FanBlaze live scores were sunset at under 6% usage.", label: "Decisions · Experimentation, FanBlaze", href: "/decisions#experimentation" },
  },
  {
    n: "04",
    title: "AI needs evaluation.",
    body: "Agree the rubric, the failure modes and the launch gate before anyone argues about the demo.",
    example: { text: "In myPAT doubt resolution, the quality bar was a number before launch: 90% accuracy by SME sampling, with a rollback. The AI resolver was considered and not shipped.", label: "Edfora · Doubt resolution", href: "/work/doubt-resolution#gate" },
  },
] as const;

/* -------------------------------------------------------------------------- */
/* AI Lab                                                                      */
/* -------------------------------------------------------------------------- */

export const aiLab = {
  headline: "AI product judgment: problem first, model second.",
  sub: "Strong AI product judgment; production evidence in progress. No evaluation has been run.",
  /** The real-world case: an AI option weighed against a measurable quality gate, and not shipped. */
  field: {
    title: "When the AI option didn't ship",
    context: "Edfora · myPAT doubt resolution",
    href: "/work/doubt-resolution",
    steps: [
      { kind: "signal", text: "An AI-first resolver had the best scale story; faculty raised accuracy and academic integrity." },
      { kind: "decision", text: "A hybrid of step-wise hints, verified peer answers and SME escalation, behind a hard 90% accuracy gate with a rollback." },
      { kind: "outcome", text: "Median resolution time ~24 h → <15 min. The AI resolver was not shipped." },
    ],
  },
  spine: ["Problem", "AI role", "System", "Evaluation", "Failure modes", "Product metric"],
  principles: [
    ["Rules first, a model where it earns it", "Much of a learning product can run on deterministic logic. A model belongs where judgment is needed and a wrong answer is recoverable."],
    ["Evaluation before scale", "A representative test set, a rubric, named failure categories and a launch threshold, agreed before anyone argues about the demo."],
    ["Uncertainty is a UX problem", "Show the evidence, say how confident the system is, define what happens when it isn't, and let a person overrule it."],
    ["Cost and latency are product constraints", "If it can't run at every checkpoint at an acceptable speed and cost, it is a demo feature, not a product."],
  ],
  professional: "Professional context: at Edfora the adaptive engine used 3PL Item Response Theory, a statistical model rather than an LLM. It is a personalization case, not an AI-model claim.",
  builds: [
    {
      slug: "learner-diagnostic",
      href: "/ai-lab/learner-diagnostic",
      title: "AI Learner Diagnostic",
      status: "Independent prototype · deterministic baseline",
      statusNote: "A deterministic, rules-only prototype; not an LLM. The baseline, the override and the evaluation harness are built. No evaluation has been run, and there are no real users or model results.",
      spine: [
        { term: "Problem", text: "A teacher can't diagnose every learner's misconception by hand." },
        { term: "AI role", text: "Proposed: map a pattern of errors to a likely misconception and explain it. Scoring stays deterministic." },
        { term: "System", text: "Learner answers → rules → model → confidence → teacher override. The demo runs every step on rules." },
        { term: "Evaluation", text: "Rubric and harness built before any model work: accuracy, groundedness, consistency, calibration, latency and cost. Not yet run." },
        { term: "Failure modes", text: "Six designed before the happy path, from overconfident diagnosis to a slow model call." },
        { term: "Product metric", text: "Agreement with the teacher's own call on the same evidence; override rate." },
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: readonly string[];
};

/** Documented career detail, most recent first. */
export const roles: readonly Role[] = [
  {
    id: "edfora",
    company: "Edfora",
    title: "Senior Product Manager",
    period: "Jul 2023 – Jul 2026",
    location: "Gurugram",
    summary: "Across Edfora's products and systems, including myPAT, Glorifire, Stakeholder, Glorifire Ops, Adaptive Practice, myAdvisor and myPlan: roadmap and prioritization for learning and engagement experiences on web and mobile, with engineering, design, content and business teams.",
    highlights: [
      "3PL IRT-based adaptive assignments: across a 2-year academic-cycle dataset, completion was 18% on the static path and 45% after (not attributed to the engine alone)",
      "Quiz and gamification layer shaped by teachers who found early prototypes “too game-y”: DAU up ~12–15%, average session time up ~15%",
      "myPAT doubt resolution: chose a hybrid over an AI resolver and a tutor marketplace on RICE and unit economics; 1,000-student pilot behind a 90% accuracy gate; median resolution time ~24 h → <15 min; D14 return rate ~18% higher than holdout (relative); ~60% modeled support-cost avoidance",
      "Real-time engagement dashboards for faculty replaced a monthly spreadsheet pull",
      "Interviews and usability tests with students and faculty fed a RICE-based roadmap; 5+ features shipped across web and mobile, on products that reach 100K+ learners",
    ],
  },
  {
    id: "witzeal",
    company: "Witzeal Technologies",
    title: "Product Manager",
    period: "May 2022 – Mar 2023",
    location: "Gurugram",
    summary: "Growth, onboarding, monetization and lifecycle for a real-money gaming platform.",
    highlights: [
      "Onboarding redesign: D0 gameplay 12% → 33%, Day-7 retention 12.2% → 25.4% in a 30/70 controlled rollout",
      "Experimentation roadmap across pricing and reward loops, each change written as a hypothesis and run as an A/B test",
      "Bonus allocation by expected ROI per segment: bonus and discount spend down ~20%, retention held",
      "Lifecycle messaging (push, in-app, email) moved from one blast to segmented cohorts",
    ],
  },
  {
    id: "baazi",
    company: "Baazi Games",
    title: "Product Manager",
    period: "Jun 2019 – May 2022",
    location: "New Delhi",
    summary: "Experimentation, segmentation and risk across a multi-game platform: PokerBaazi, Lagai Khai and FanBlaze.",
    highlights: [
      "20+ A/B tests end to end (hypothesis, sample size, significance); a fair number came back inconclusive or negative and reshaped later scoping",
      "Behavioral clustering replaced one default journey with journeys by segment: session duration up ~35%, retention up ~25%",
      "Rules-based anomaly detection for fraudulent transactions: fraud losses down ~18%",
    ],
  },
  {
    id: "pwc",
    company: "PwC India",
    title: "Program & Release Manager",
    period: "Jan 2019 – Jun 2019",
    location: "Gurgaon",
    summary: "Program and release management for enterprise web applications, including EwayBill and an LMS.",
    highlights: [
      "Standardized the release process for an enterprise web application",
      "Coordinated four distributed teams across development, QA, UAT and deployment",
    ],
  },
  {
    id: "direct-create",
    company: "Direct Create",
    title: "Android Developer",
    period: "May 2014 – Dec 2018",
    location: "Gurgaon",
    summary: "Sole Android developer on a collaboration platform for the handmade industry, working directly with the CEO and CTO on what to build.",
    highlights: [
      "Proposed one app with role selection instead of separate maker, buyer and designer apps",
      "Real-time chat and file sharing on Firebase; crash rate down ~30% through better state handling and testing",
      "OAuth 2.0 and encrypted local storage; 4.6+ Play Store rating kept through iterative UX fixes",
    ],
  },
];

/**
 * Current status. NEEDS_USER_INPUT: availability after the Edfora role (Jul 2026)
 * isn't in the record. While this is null, nothing is rendered.
 */
export const status: { availability: string | null } = { availability: null };

/**
 * Technical depth, as PM leverage rather than an engineering résumé. Each line
 * is documented elsewhere on the site; none claims ML engineering.
 */
export const technical = {
  title: "The engineering behind the product calls",
  insight: { text: "The drop wasn't motivation. It sat in signup and OTP verification, before the first game.", source: "Witzeal · diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
  items: [
    { term: "Built", text: "4+ years as the sole Android developer: Firebase real-time chat and file sharing, OAuth 2.0, encrypted local storage; crash rate down ~30%." },
    { term: "Diagnosed", text: "Read the OTP API's success and failure rates and delivery time alongside the funnel, which moved the fix from campaigns to signup." },
    { term: "Specified", text: "Wrote the PRD and adaptive product logic for a 3PL IRT engine: inputs, the ability-update loop and its edge cases. The model was built with engineering." },
    { term: "Measured", text: "Experiments from hypothesis and sample size to significance; a 30/70 controlled rollout; a pilot read against a holdout." },
    { term: "Prototyped", text: "An AI diagnostic with a deterministic baseline, an output schema and an evaluation harness, before any model work." },
  ],
} as const;

/** What each phase taught (About). First-person draft copy, built only from the facts above, for Nitesh to approve. */
export const about = {
  /** Editorial profile header. Positioning lines, not quantified claims; the bio uses only facts stated elsewhere on the site. */
  headline: "I build products at the intersection of growth, consumer experience and AI.",
  bio: [
    "I started by writing the product: four-plus years as the only Android developer on a marketplace app, then release management for enterprise web applications. That order still shapes how I work: I scope with engineering, not around it.",
    "Gaming at Baazi Games and Witzeal taught me how users behave and how growth and monetization work. At Edfora I worked on adaptive practice, doubt resolution and engagement systems. AI is my current direction, through an independent prototype rather than a role.",
  ],
  capabilities: [
    { name: "Growth", text: "Activation, retention and experimentation." },
    { name: "Consumer", text: "Experiences designed around user behaviour." },
    { name: "EdTech", text: "Personalization and learning products at scale." },
    { name: "AI", text: "Practical, responsible AI product judgment." },
  ],
  /** Served from /public. The portrait renders only when this file exists; there is no placeholder or generated stand-in. */
  portrait: { src: "/about/nitesh-portrait.jpg", alt: "Nitesh Tiwari, in glasses, a blazer and a white shirt" },
  opening: "I started by writing the product.",
  intro: "Before I owned roadmaps, I spent four-plus years as the only Android developer on a marketplace app, and then standardized releases for enterprise web applications. That order still shapes how I work: I scope with engineering, not around it.",
  phases: [
    { verb: "Built", text: "Writing the app from scratch taught me what a feature really costs, and that one well-scoped app can beat three tailored ones." },
    { verb: "Shipped", text: "Release management taught me that a product is only as good as the way it reaches people: process, sequencing, four teams in step." },
    { verb: "Measured", text: "Gaming taught me how users behave, and how to measure it. Twenty-plus experiments, many of them inconclusive, taught me to scope bets smaller." },
    { verb: "Grew", text: "Growth taught me to find where users drop before they reach value, and to fix the product before paying them to come back." },
    { verb: "Personalized", text: "EdTech taught me to adapt a product to each person with a statistical model, and to be honest about what a before/after can and can't prove." },
    { verb: "AI", text: "AI is the next application of the same discipline: a clear user problem, a measured outcome, and an evaluation agreed before the demo." },
  ],
};
