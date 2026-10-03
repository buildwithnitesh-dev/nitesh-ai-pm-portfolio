/**
 * The canonical content model. Every page, the share card, structured data and
 * /llms.txt read from here, so a fact lives in exactly one place.
 *
 * Evidence rules: numbers keep the precision they were reported with (ranges
 * stay ranges, "~" stays "~"), each one says how it was measured, and any
 * attribution caveat travels with the number wherever it is shown. Sources and
 * classes for every claim: content/evidence-gap-map.md.
 */

export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager",
  positioning: "Growth × Consumer × AI",
  thesis: "Retention is won before the retention metric.",
  experience: "~7 years product management · 10+ years technology",
  location: "Delhi NCR · open to Mumbai",
  /** For structured data (knowsAbout). */
  strengths: [
    "Growth", "Monetization", "Personalization", "Product Strategy", "Experimentation",
    "Consumer Products", "AI Products", "Retention", "Product Analytics",
  ] as const,
  /**
   * Analytics and product tools from the résumé. "OpenAI API" and "Prompt
   * engineering" are listed there too but have no supporting artifact
   * (evidence map 5.6), so they are not shown on the site.
   */
  tools: ["Mixpanel", "CleverTap", "GA4", "Firebase", "Jira", "Figma", "Postman", "Notion", "Miro"] as const,
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
    "Senior Product Manager · Growth × Consumer × AI. Doubt-resolution median turnaround ~24 h → <15 min at Edfora, Day-7 retention 12.2% → 25.4% in a controlled rollout at Witzeal, adaptive learning, and a feature sunset on usage evidence.",
  /** Shorter title and description for link previews (WhatsApp, LinkedIn, Slack, X). */
  share: {
    title: "Nitesh Tiwari · Senior Product Manager · Growth × Consumer × AI",
    description: "Retention is won before the retention metric. ~7 years in product management, 10+ in technology: find where users drop before they reach value, and fix the product first.",
    imageAlt: "Nitesh Tiwari, Senior Product Manager, Growth × Consumer × AI. Day-7 retention 12.2% to 25.4% in a controlled rollout; assignment completion 18% to 45%, before vs. after, not attributed to one system alone.",
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

export type DeltaId = "d0" | "d7" | "completion" | "bonus" | "learners" | "tat" | "d14" | "supportCost" | "fraud" | "fanblaze";

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
};

export const deltas: Record<DeltaId, Delta> = {
  tat: {
    label: "Median doubt-resolution time",
    before: "~24 h", after: "<15 min",
    method: "Measured · median, doubt created → first qualifying resolution",
    definition: "Median timestamp delta between doubt_created and first_qualifying_resolution_event.",
    detail: "Turnaround before the change approached 24 hours during peak exam preparation. The record doesn't say whether the median covers the 1,000-student pilot only or a wider rollout.",
    context: "Edfora · myPAT doubt resolution",
    href: "/work/doubt-resolution#outcome",
  },
  d14: {
    label: "D14 return rate vs. holdout",
    after: "~18% higher",
    method: "Pilot A/B holdout · relative difference, not percentage points",
    definition: "Day-14 return rate of pilot students with instant-hint access, against a holdout on the standard response queue.",
    detail: "Reported as the controlled-cohort result for the hybrid model as a whole; it isn't attributed to any one component, and no statistical significance is claimed.",
    context: "Edfora · myPAT pilot",
    note: "Relative to holdout · not attributed to one component",
    href: "/work/doubt-resolution#outcome",
  },
  supportCost: {
    label: "Support-cost avoidance",
    after: "~60%",
    method: "Modeled · not an observed saving",
    definition: "Avoided paid SME and faculty headcount, modeled against projected ticket-volume growth.",
    detail: "A projection used in the decision, not a measured cost or budget reduction.",
    context: "Edfora · myPAT doubt resolution",
    note: "Modeled, not an observed cost reduction",
    href: "/work/doubt-resolution#outcome",
  },
  d7: {
    label: "Day-7 retention",
    before: "12.2%", after: "25.4%", from: 12.2, to: 25.4, max: 30,
    method: "Controlled rollout · 30/70 · ~50K users · 3 weeks",
    definition: "Definition not recorded: the original experiment record doesn't capture the denominator.",
    detail: "Control (existing onboarding) against treatment (redesigned), concurrently. The treatment bundled five changes, one of them an incentive, so the lift belongs to the bundle. Statistical significance wasn't recorded.",
    context: "Witzeal · onboarding redesign",
    note: "Five changes bundled · no single change isolated",
    href: "/work/onboarding-funnel-redesign#outcome",
  },
  d0: {
    label: "D0 gameplay",
    before: "12%", after: "33%", from: 12, to: 33, max: 40,
    method: "Change in level · comparison type not recorded",
    definition: "Share of new users who played a game on their first day.",
    detail: "12% is the documented baseline before the redesign. The record lists 33% among the rollout's results but doesn't say whether it was read against the concurrent control or as the level after launch, so it is shown as a change in level, not as a test result.",
    context: "Witzeal · onboarding redesign",
    href: "/work/onboarding-funnel-redesign#outcome",
  },
  completion: {
    label: "Assignment completion",
    before: "18%", after: "45%", from: 18, to: 45, max: 60,
    method: "Before/after · 2-year academic-cycle dataset",
    definition: "Definition not recorded: how completion was counted isn't captured in the analysis.",
    detail: "The static learning path before, the adaptive system after; no holdout. Concurrent product changes aren't on record. Completion was the measured outcome; learning mastery was not captured in this analysis.",
    context: "Edfora · adaptive assignments",
    note: "Not attributed to the adaptive system alone",
    href: "/work/adaptive-assignment-engine#outcome",
  },
  bonus: {
    label: "Bonus & discount spend",
    after: "~20% ↓",
    method: "Directional · flat tiers → expected ROI per segment",
    definition: "Bonus and discount spend after allocation moved from flat tiers to expected ROI per segment.",
    detail: "No time window or baseline is recorded. The objective was incremental NGR per rupee of bonus spend; the NGR outcome wasn't captured, so the result is reported as spend and retention.",
    context: "Witzeal · bonus allocation",
    note: "Retention held steady · window not recorded",
    href: "/decisions#bonus-allocation",
  },
  fraud: {
    label: "Fraud losses",
    after: "~18% ↓",
    method: "Method not recorded · rules-based anomaly detection",
    definition: "Fraud losses after a rules-based anomaly-detection layer for fraudulent transactions.",
    detail: "Base, window and false-positive rate are not recorded.",
    context: "Baazi Games",
    href: "/about#baazi",
  },
  fanblaze: {
    label: "Match-day users who used live scores",
    after: "<6%",
    method: "Observed after launch · usage, not a test",
    definition: "Share of active match-day users who used the in-app live-score module.",
    context: "Baazi Games · FanBlaze",
    href: "/work/fanblaze#signal",
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
  headline: profile.thesis,
  positioning: profile.positioning,
  lede: "I find where users drop before they reach value, diagnose why, and fix the product before reaching for incentives — with an engineer's view of how it gets built.",
};

/** The share card keeps its proof points (app/opengraph-image.tsx). */
export const shareProof = ["d7", "completion"] as const satisfies readonly DeltaId[];

/** The four strongest defensible results, directly under the hero. Each keeps its method label. */
export const proof: readonly { id: DeltaId; capability: string }[] = [
  { id: "d7", capability: "Retention" },
  { id: "tat", capability: "Prioritization" },
  { id: "bonus", capability: "Incentive economics" },
  { id: "fraud", capability: "Risk" },
];

/* -------------------------------------------------------------------------- */
/* Selected work: ordered by hiring-manager signal, not chronology              */
/* -------------------------------------------------------------------------- */

export type CaseSlug = "doubt-resolution" | "onboarding-funnel-redesign" | "adaptive-assignment-engine" | "fanblaze";

export const work: readonly {
  index: string;
  slug: CaseSlug;
  href: string;
  /** The case's short name, used in navigation. */
  short: string;
  headline: string;
  /** What the case shows a hiring manager. */
  positioning: readonly string[];
  company: string;
  product?: string;
  domain: string;
  role: string;
  signal: string;
  decision: string;
  /** The measured outcome, drawn from the evidence model. */
  delta: DeltaId;
}[] = [
  {
    index: "01",
    slug: "doubt-resolution",
    href: "/work/doubt-resolution",
    short: "Doubt Resolution",
    headline: "Faster doubt resolution without scaling faculty linearly",
    positioning: ["Senior PM", "Strategy", "Consumer", "AI judgment"],
    company: "Edfora",
    product: "myPAT",
    domain: "EdTech",
    role: "Senior Product Manager · 2023–2026",
    signal: "Doubt-resolution turnaround approached 24 hours during peak exam preparation.",
    decision: "A hybrid of step-wise hints, verified peer answers and SME escalation, over an AI-first resolver and a tutor marketplace. Piloted with 1,000 students behind a 90% accuracy gate.",
    delta: "tat",
  },
  {
    index: "02",
    slug: "onboarding-funnel-redesign",
    href: "/work/onboarding-funnel-redesign",
    short: "Witzeal Onboarding",
    headline: "Fixing the path to first value",
    positioning: ["Growth", "Activation", "Retention", "Experimentation"],
    company: "Witzeal Technologies",
    domain: "Real-money gaming",
    role: "Product Manager · 2022–2023",
    signal: "Only ~12% of new users played on day one.",
    decision: "Five changes to the first 60 seconds, tested against a 30% control.",
    delta: "d7",
  },
  {
    index: "03",
    slug: "adaptive-assignment-engine",
    href: "/work/adaptive-assignment-engine",
    short: "Adaptive Practice",
    headline: "Matching each question to the learner",
    positioning: ["Personalization", "Product logic", "Technical depth"],
    company: "Edfora",
    product: "Adaptive Practice",
    domain: "EdTech",
    role: "Senior Product Manager · 2023–2026",
    signal: "Every learner got the same next question; completion stood at 18%.",
    decision: "A 3PL IRT engine that estimates each learner's ability and matches question difficulty to it.",
    delta: "completion",
  },
  {
    index: "04",
    slug: "fanblaze",
    href: "/work/fanblaze",
    short: "FanBlaze",
    headline: "Killing a weak bet on usage evidence",
    positioning: ["Product judgment", "Killing weak bets"],
    company: "Baazi Games",
    product: "FanBlaze",
    domain: "Fantasy sports",
    role: "Product Manager · 2019–2022",
    signal: "Fewer than 6% of active match-day users used live scores.",
    decision: "Sunset the feature and move the effort to pre-match intent: starting-XI notifications, injury alerts, head-to-head stats.",
    delta: "fanblaze",
  },
];

/* -------------------------------------------------------------------------- */
/* Same PM. Different domains.                                                 */
/* -------------------------------------------------------------------------- */

export type DomainEvidence = { text: string; href: string };

/** One capability, applied in gaming and in EdTech. Every cell points at evidence already on the site. */
export const domainMap: readonly { capability: string; gaming: DomainEvidence; edtech: DomainEvidence }[] = [
  {
    capability: "Activation",
    gaming: { text: "Read a ~12% Day-7 number as an activation problem; D0 gameplay 12% → 33%", href: "/work/onboarding-funnel-redesign#problem" },
    edtech: { text: "Time to a first answer for a stuck learner: median ~24 h → <15 min", href: "/work/doubt-resolution#outcome" },
  },
  {
    capability: "Retention",
    gaming: { text: "Day-7 retention 12.2% → 25.4%, control vs. treatment", href: "/work/onboarding-funnel-redesign#outcome" },
    edtech: { text: "D14 return rate ~18% higher than holdout (relative)", href: "/work/doubt-resolution#outcome" },
  },
  {
    capability: "Experimentation",
    gaming: { text: "20+ A/B tests end to end; a 30/70 controlled rollout", href: "/decisions#experimentation" },
    edtech: { text: "A cohort-gated 1,000-student pilot with a holdout", href: "/work/doubt-resolution#pilot" },
  },
  {
    capability: "Segmentation",
    gaming: { text: "Behavioral clustering into journeys by player segment", href: "/decisions#segmented-journeys" },
    edtech: { text: "Ability (θ) estimated per learner, per concept", href: "/work/adaptive-assignment-engine#decision" },
  },
  {
    capability: "Incentive economics",
    gaming: { text: "Bonuses by expected ROI per segment: spend ~20% ↓, retention held", href: "/decisions#bonus-allocation" },
    edtech: { text: "Points for accurate faculty feedback on myPlan (design; no outcome claimed)", href: "/decisions#behavioural-loops" },
  },
  {
    capability: "Risk & quality",
    gaming: { text: "Rules-based fraud detection: losses ~18% ↓ (method not recorded)", href: "/about#baazi" },
    edtech: { text: "A 90% accuracy circuit-breaker with an agreed rollback", href: "/work/doubt-resolution#pilot" },
  },
  {
    capability: "Funnel optimization",
    gaming: { text: "Traced the drop to signup and OTP friction before the first game", href: "/work/onboarding-funnel-redesign#problem" },
    edtech: { text: "Assignment completion 18% → 45% (before/after)", href: "/work/adaptive-assignment-engine#outcome" },
  },
  {
    capability: "Behavioral engagement",
    gaming: { text: "Live scores sunset at <6% usage; effort moved to pre-match intent", href: "/work/fanblaze" },
    edtech: { text: "Gamification kept credible to teachers: DAU ~12–15% ↑ (directional)", href: "/decisions#gamification" },
  },
];

/* -------------------------------------------------------------------------- */
/* Decision library: short product-judgment snapshots                           */
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
  /** Shown on the homepage as a signal → decision → outcome snapshot. */
  featured?: boolean;
  /** The one-line outcome for the homepage snapshot. */
  outcome?: string;
  /** When the decision has a full case study. */
  caseHref?: string;
  /** Ordered stages; the grammar is shared across every card. */
  stages: readonly { term: string; text: string }[];
  /** Evidence: a Delta, or plain documented results, each with how it was measured where that is short. */
  delta?: DeltaId;
  results?: readonly { text: string; basis?: string }[];
  details?: readonly { term: string; items: readonly string[] }[];
  learning?: string;
  note?: string;
};

export const decisions: readonly Decision[] = [
  {
    id: "doubt-resolution",
    code: "D-01",
    title: "Reduce doubt-resolution friction without scaling human support linearly.",
    company: "Edfora",
    product: "myPAT · Doubt resolution",
    area: "Prioritization",
    role: "Senior Product Manager",
    verdict: "Pilot",
    caseHref: "/work/doubt-resolution",
    stages: [
      { term: "Signal", text: "During peak exam preparation, doubt-resolution turnaround approached 24 hours." },
      { term: "Decision", text: "A hybrid: structured step-wise hints, peer answers with verification, and escalation to SMEs and faculty, chosen with RICE and unit economics over an AI-first resolver and a tutor marketplace." },
      { term: "Guardrails", text: "A cohort-gated pilot of 1,000 students and a hard 90% accuracy circuit-breaker, with an agreed rollback." },
    ],
    delta: "tat",
    results: [{ text: "D14 return rate ~18% higher than the holdout", basis: "Relative, pilot A/B holdout" }],
    note: "The full decision, including the AI option that wasn't shipped, is in the case study.",
  },
  {
    id: "bonus-allocation",
    code: "D-02",
    title: "Stop paying the same bonus to every player.",
    company: "Witzeal Technologies",
    area: "Monetization",
    role: "Product Manager",
    verdict: "Shipped",
    featured: true,
    outcome: "Bonus and discount spend ~20% ↓, retention held · directional",
    stages: [
      { term: "Signal", text: "Reward costs were eating into margin without a clear retention payoff. Bonuses were allocated in flat tiers." },
      { term: "Decision", text: "Replace flat tiers with expected ROI per segment, optimizing for incremental NGR (net gaming revenue) per rupee of bonus spend." },
      { term: "Trade-off", text: "Cutting incentives in real-money gaming can quietly hurt retention, the main risk going in. It only reads as a win because both numbers moved the right way." },
    ],
    delta: "bonus",
    note: "The objective was incremental NGR per rupee of bonus spend. The NGR outcome wasn't captured, so the result is reported as spend and retention.",
    details: [
      { term: "Segments", items: ["New / onboarding", "High-value / core LTV drivers", "Low-value / recreational", "Dormant / at-risk"] },
      { term: "Mechanics", items: ["High-value: targeted loss-protection and liquidity-matched bonuses", "Low-value / at-risk: friction-reduction top-ups tied to deposit triggers"] },
    ],
  },
  {
    id: "fanblaze",
    code: "D-03",
    title: "Sunset live scores. Build for pre-match intent.",
    company: "Baazi Games",
    product: "FanBlaze",
    area: "Fantasy sports",
    role: "Product Manager",
    verdict: "Sunset",
    caseHref: "/work/fanblaze",
    stages: [
      { term: "Signal", text: "Fewer than 6% of active match-day users used live scores, with no meaningful uplift in mid-match contest joins, lineup changes or re-deposits." },
      { term: "Decision", text: "Sunset the feature and move the effort to starting-XI notifications, injury alerts and head-to-head stats." },
    ],
    results: [{ text: "<6% of match-day users used it", basis: "Observed after launch" }],
    learning: "Users came for fantasy execution, not passive score consumption.",
  },
  {
    id: "experimentation",
    code: "D-04",
    title: "Run experiments to reduce uncertainty, not to win.",
    company: "Baazi Games",
    area: "Experimentation",
    role: "Product Manager",
    verdict: "Program",
    featured: true,
    outcome: "A fair number of tests came back inconclusive or negative, and changed how later tests were scoped",
    stages: [
      { term: "Signal", text: "20+ A/B tests run end to end, from hypothesis and sample size to significance. A fair number came back inconclusive or negative." },
      { term: "Decision", text: "Use those results to change how later tests were scoped, instead of treating them as failures." },
    ],
    learning: "Experiments are not successful because they win. They are successful because they reduce uncertainty.",
  },
  {
    id: "pokerbaazi-matchmaking",
    code: "D-05",
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
    results: [{ text: "Peak server latency held under 60 ms", basis: "An operating constraint, not a user outcome" }],
    note: "No player-outcome magnitude is recorded for this decision, so none is shown.",
  },
  {
    id: "testing-roadmap",
    code: "D-06",
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
    results: [{ text: "GMV on a ~10% week-over-week growth trajectory over the period", basis: "Directional · no starting GMV recorded" }],
    note: "The trajectory spans the period the roadmap ran in and isn't attributed to testing alone. No starting GMV is recorded, and whether ~10% was a sustained weekly average isn't recorded either.",
  },
  {
    id: "segmented-journeys",
    code: "D-07",
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
    results: [{ text: "Session duration up ~35%, retention up ~25%", basis: "Method not recorded" }],
  },
  {
    id: "faculty-signals",
    code: "D-08",
    title: "Turn a monthly spreadsheet into a signal a teacher can act on.",
    company: "Edfora",
    product: "myAdvisor",
    area: "Data product",
    role: "Senior Product Manager",
    verdict: "Shipped",
    featured: true,
    outcome: "Real-time dashboards shipped; myAdvisor alerts designed · no outcome claimed for the alerts",
    stages: [
      { term: "Signal", text: "Students disengaged well before faculty found out: retention data arrived through a monthly spreadsheet pull." },
      { term: "Decision", text: "Real-time dashboards, so faculty could act while a student was still reachable; then myAdvisor: prioritized alerts timed around a teacher's schedule." },
      { term: "Trade-off", text: "A dashboard shows everything and leaves the teacher to find the problem; an alert picks the problem for them, so priority, timing and unread handling matter as much as the signal." },
    ],
    details: [
      { term: "myAdvisor, as documented", items: ["High- and medium-priority alerts, raised at module level", "History, with filters by module and date", "Deep links into the part of the product where the teacher can act"] },
      { term: "Designed for attention", items: ["Notifications timed around a teacher's schedule", "Unread alerts handled deliberately"] },
    ],
    note: "myAdvisor is product design from the documentation; no outcome is claimed for it. A retention figure for the dashboards is on the résumé, but its definition and method aren't recorded, so it isn't shown here.",
  },
  {
    id: "gamification",
    code: "D-09",
    title: "Make practice more engaging without making it look like a game.",
    company: "Edfora",
    area: "Engagement",
    role: "Senior Product Manager",
    verdict: "Shipped",
    featured: true,
    outcome: "DAU ~12–15% ↑, average session ~15% ↑ · directional, window not recorded",
    stages: [
      { term: "Signal", text: "DAU had been flat for two months. Teachers flagged early quiz prototypes as “too game-y”." },
      { term: "Decision", text: "Keep the quiz and gamification layer, and work with design so the mechanics don't feel gimmicky to teachers." },
      { term: "Trade-off", text: "In a classroom product, teacher trust is part of the engagement loop, so some raw engagement is worth trading for credibility." },
    ],
    results: [{ text: "DAU up ~12–15%, average session time up ~15%", basis: "Directional · before/after, window not recorded" }],
  },
  {
    id: "behavioural-loops",
    code: "D-10",
    title: "Designing behavioural loops across students and faculty.",
    company: "Edfora",
    product: "Glorifire · Stakeholder · myPlan",
    area: "Engagement system",
    role: "Senior Product Manager",
    verdict: "System",
    stages: [
      { term: "Students", text: "Points, streaks, badges, avatars, a Hall of Fame and leaderboards." },
      { term: "Faculty", text: "Analytics, leaderboards and configurable, behaviour-based actionable items." },
      { term: "Feedback loop", text: "The system generates a learner's myPlan. Faculty confirm whether it is correct or incorrect, and accurate feedback earns 100 points, so verification is reinforced as part of the loop." },
    ],
    details: [
      { term: "myPlan confirmation", items: ["System-generated myPlan information", "Faculty verification", "Correct / Incorrect feedback", "100 points for accurate feedback"] },
    ],
    note: "Product-system evidence from the platform's screens, not an outcome. No engagement or accuracy result is attributed to this system; the DAU result in D-09 belongs to the quiz and gamification layer as reported.",
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
    example: { text: "A ~12% Day-7 number pointed to reminders and rewards. The funnel showed only 12% of new users played on day one: an activation problem, with a different fix.", label: "Witzeal · Problem", href: "/work/onboarding-funnel-redesign#problem" },
  },
  {
    n: "02",
    title: "Turn a disagreement into a threshold.",
    body: "When teams want different things for good reasons, agree what would have to be true, and measure it.",
    example: { text: "Engineering wanted an AI-first resolver for scale; faculty wanted human answers for accuracy. The hybrid was piloted behind a 90% accuracy circuit-breaker with an agreed rollback.", label: "Doubt Resolution · Pilot", href: "/work/doubt-resolution#pilot" },
  },
  {
    n: "03",
    title: "Experiments can fail.",
    body: "Experiments are not successful because they win. They are successful because they reduce uncertainty.",
    example: { text: "20+ A/B tests at Baazi Games, a fair number inconclusive or negative, and they changed how later tests were scoped. FanBlaze live scores were sunset at under 6% usage.", label: "Decisions · Experimentation", href: "/decisions#experimentation" },
  },
  {
    n: "04",
    title: "AI needs evaluation.",
    body: "Agree the rubric, the failure modes and the launch gate before anyone argues about the demo.",
    example: { text: "For the AI Learner Diagnostic, the evaluation rubric and launch gate were designed before any model work. They have not been run yet.", label: "AI Lab · Learner Diagnostic", href: "/ai-lab/learner-diagnostic#evaluation" },
  },
] as const;

/* -------------------------------------------------------------------------- */
/* AI Lab                                                                      */
/* -------------------------------------------------------------------------- */

export const aiLab = {
  label: "AI product judgment",
  headline: "Problem first. Model second.",
  sub: "How I decide where AI belongs, and where it doesn't. Strong judgment, production evidence in progress: no production LLM work is claimed here, and no evaluation has been run yet.",
  spine: ["Problem", "AI role", "System", "Evaluation", "Failure modes", "Product metric"],
  /** What the judgment covers, and where each piece is shown. `kind` keeps professional decisions and prototype design visibly apart. */
  judgment: [
    { practice: "When not to ship AI", text: "An AI-first doubt resolver was considered at Edfora and not shipped; accuracy and academic integrity came first.", href: "/work/doubt-resolution#decision", kind: "Professional decision" },
    { practice: "AI vs. non-AI", text: "The adaptive engine at Edfora is 3PL IRT, a statistical model, not an LLM.", href: "/work/adaptive-assignment-engine#decision", kind: "Professional decision" },
    { practice: "Quality gate", text: "A 90% accuracy circuit-breaker, measured by SME sampling, with an agreed rollback.", href: "/work/doubt-resolution#pilot", kind: "Professional decision" },
    { practice: "Deterministic baseline", text: "A rules-only diagnostic: the bar any model has to beat.", href: "/ai-lab/learner-diagnostic#baseline", kind: "Independent prototype" },
    { practice: "Evaluation", text: "Rubric and harness built before model work. Not yet run.", href: "/ai-lab/learner-diagnostic#evaluation", kind: "Independent prototype" },
    { practice: "Failure modes & guardrails", text: "Six failure modes designed before the happy path, each with a fallback.", href: "/ai-lab/learner-diagnostic#failure-modes", kind: "Independent prototype" },
    { practice: "Human in the loop", text: "The teacher keeps the final call; overrides are logged.", href: "/ai-lab/learner-diagnostic#status", kind: "Independent prototype" },
  ],
  principles: [
    ["Rules first, a model where it earns it", "Much of a learning product can run on deterministic logic. A model belongs where judgment is needed and a wrong answer is recoverable."],
    ["Evaluation before scale", "A representative test set, a rubric, named failure categories and a launch threshold, agreed before anyone argues about the demo."],
    ["Uncertainty is a UX problem", "Show the evidence, say how confident the system is, define what happens when it isn't, and let a person overrule it."],
    ["Cost and latency are product constraints", "If it can't run at every checkpoint at an acceptable speed and cost, it is a demo feature, not a product."],
  ],
  professional: "Professional context: at Edfora the adaptive engine used 3PL Item Response Theory, a statistical model rather than an LLM, and the AI-first doubt resolver was an option considered, not shipped.",
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
/* Career and About                                                            */
/* -------------------------------------------------------------------------- */

/** Engineer → Builder → Growth PM → Senior PM → AI product thinker: what each phase taught, and the proof. */
export const arc = [
  { verb: "Engineer", org: "Direct Create", years: "2014–2018", taught: "How software gets built.", proof: "Sole Android developer: built the app from scratch, crash rate down ~30%." },
  { verb: "Builder", org: "PwC India · Baazi Games", years: "2019–2022", taught: "How software ships, and how users behave once it does.", proof: "Release process for a web app deployed to 150+ Fortune companies; then 20+ A/B tests, segmentation and fraud rules at Baazi Games." },
  { verb: "Growth PM", org: "Witzeal Technologies", years: "2022–2023", taught: "Where users drop before they reach value.", proof: "Day-7 retention 12.2% → 25.4% in a controlled rollout; bonus spend ~20% down with retention held." },
  { verb: "Senior PM", org: "Edfora", years: "2023–2026", taught: "How to decide across teams, and adapt a product to each user.", proof: "myPAT doubt resolution (median ~24 h → <15 min) and a 3PL IRT adaptive engine, in a product line that reached 100K+ learners." },
  { verb: "AI product thinker", org: "Independent", years: "Now", taught: "The same discipline, applied to AI-native products.", proof: "An AI-first resolver considered and not shipped at Edfora; an independent prototype with evaluation designed before any model work." },
] as const;

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
      "myPAT doubt resolution: a hybrid of step-wise hints, verified peer answers and SME escalation, piloted with 1,000 students behind a 90% accuracy circuit-breaker; median resolution time ~24 h → <15 min",
      "3PL IRT-based adaptive assignments: across a 2-year academic-cycle dataset, completion was 18% on the static path and 45% after (not attributed to the engine alone)",
      "Quiz and gamification layer shaped by teachers who found early prototypes “too game-y”: DAU up ~12–15%, average session time up ~15% (directional)",
      "Real-time engagement dashboards for faculty replaced a monthly spreadsheet pull",
      "Interviews and usability tests with students and faculty fed a RICE-based roadmap; 5+ features shipped across web and mobile, in products that reached 100K+ learners",
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
      "Onboarding redesign: Day-7 retention 12.2% → 25.4% in a 30/70 controlled rollout (five changes bundled); D0 gameplay 12% → 33%",
      "Bonus allocation by expected ROI per segment: bonus and discount spend down ~20%, retention held",
      "Experimentation roadmap across pricing and reward loops: each change written as a hypothesis and run as an A/B test",
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
      "Behavioral clustering replaced one default journey with journeys by segment: session duration up ~35%, retention up ~25% (method not recorded)",
      "Rules-based anomaly detection for fraudulent transactions: fraud losses down ~18% (method not recorded)",
      "FanBlaze live scores sunset at under 6% match-day usage, with effort moved to pre-match intent",
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
      "Standardized releases for a web application deployed to 150+ Fortune companies",
      "Coordinated four distributed teams across development, QA, UAT and deployment",
      "Ran A/B tests on UX changes that lifted client engagement by ~25% (method not recorded)",
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

/** What each phase taught (About). First-person draft copy, built only from the facts above, for Nitesh to approve. */
export const about = {
  opening: "I started by writing the product.",
  intro: "Before I owned roadmaps, I was the only Android developer on a marketplace app, and then the person standardizing releases for a web app used by 150+ Fortune companies. That order still shapes how I work: I scope with engineering, not around it.",
  /** One per arc phase, in the same order. */
  phases: [
    { verb: "Engineer", text: "Writing the app from scratch taught me what a feature really costs, and that one well-scoped app can beat three tailored ones." },
    { verb: "Builder", text: "Release management taught me how a product reaches people. Gaming then taught me how users behave, and how to measure it: twenty-plus experiments, many inconclusive, taught me to scope bets smaller." },
    { verb: "Growth PM", text: "Growth taught me to find where users drop before they reach value, and to fix the product before paying them to come back." },
    { verb: "Senior PM", text: "EdTech taught me to work through decisions where engineering and faculty wanted different things, to adapt a product to each person, and to be honest about what a before/after can and can't prove." },
    { verb: "AI product thinker", text: "AI is the next application of the same discipline: a clear user problem, a measured outcome, and an evaluation agreed before the demo." },
  ],
};
