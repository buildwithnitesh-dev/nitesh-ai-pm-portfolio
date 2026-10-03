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
  /** Exactly the tools listed on the résumé. */
  tools: [
    "Mixpanel", "CleverTap", "GA4", "Firebase", "Jira", "Figma",
    "Postman", "Notion", "Miro", "OpenAI API", "Prompt engineering",
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
    "Senior Product Manager · Growth × Consumer × AI. Day-7 retention 12.2% → 25.4% in a controlled rollout, adaptive learning at Edfora, and an independent AI prototype.",
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
};

export const deltas: Record<DeltaId, Delta> = {
  d0: {
    label: "D0 gameplay",
    before: "12%", after: "33%", from: 12, to: 33, max: 40,
    method: "New users who played a game on day one · comparison not recorded",
    definition: "Share of new users who played a game on their first day.",
    detail: "12% is the documented baseline before the redesign. The record lists 33% among the rollout's results but doesn't say whether it was read against the concurrent control or as the level after launch, so it is shown as a change in level, not as a test result.",
    context: "Witzeal · onboarding redesign",
    href: "/work/onboarding-funnel-redesign#result",
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
  },
  bonus: {
    label: "Bonus & discount spend",
    after: "~20% ↓",
    method: "Directional · flat tiers → expected ROI per segment",
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
    detail: "Turnaround before the change approached 24 hours during peak exam preparation.",
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
  lede: "I find where users drop before they reach value, diagnose why, and fix the product before reaching for incentives — with an engineer's view of how it gets built.",
  /** The one result the hero carries; every other number has its own home further down. */
  proof: "d7" as const satisfies DeltaId,
};

/** The share card keeps its three proof points (app/opengraph-image.tsx). */
export const shareProof = ["d7", "completion"] as const satisfies readonly DeltaId[];

/**
 * Proof beyond the three stories: one capability, one number, how it was
 * measured. `weight: "context"` keeps a thinly documented number visible
 * without letting it carry a headline.
 */
export const proofWall: readonly {
  capability: string;
  /** A headline figure, when the evidence supports one. */
  value?: string;
  claim: string;
  basis: string;
  context: string;
  href: string;
  weight: "headline" | "context";
}[] = [
  { capability: "Prioritization", value: "<15 min", claim: "median doubt-resolution time, down from ~24 hours, after choosing peer answers and step-wise hints with faculty escalation over a tutor marketplace, piloted behind a 90% accuracy circuit-breaker", basis: "Measured · median", context: "Edfora · myPAT", href: "/decisions#doubt-resolution", weight: "headline" },
  { capability: "Incentive economics", value: "~20%", claim: "less bonus and discount spend, with retention held, after moving from flat tiers to expected ROI per segment", basis: "Directional", context: "Witzeal Technologies", href: "/decisions#bonus-allocation", weight: "headline" },
  { capability: "Experimentation", claim: "A testing program run end to end, from hypothesis and sample size to significance. A fair number of tests came back inconclusive or negative, and those results reshaped how later tests were scoped", basis: "Practice, not a measured effect", context: "Baazi Games", href: "/decisions#experimentation", weight: "headline" },
  { capability: "Risk", value: "~18%", claim: "lower fraud losses after a rules-based anomaly-detection layer for fraudulent transactions", basis: "Method not captured", context: "Baazi Games", href: "/about#baazi", weight: "context" },
];

/** Built → Shipped → Measured → Grew → Personalized → AI: what each phase taught, and the proof. */
export const arc = [
  { verb: "Built", field: "Android engineering", org: "Direct Create", years: "2014–2018", taught: "How software gets built.", proof: "Sole Android developer: built the app from scratch, crash rate down ~30%." },
  { verb: "Shipped", field: "Program & release", org: "PwC India", years: "2019", taught: "How software ships.", proof: "Release process for a web app deployed to 150+ Fortune companies, across four distributed teams." },
  { verb: "Measured", field: "Experimentation", org: "Baazi Games", years: "2019–2022", taught: "How users behave, and how to measure it.", proof: "Experimentation, segmentation and risk across PokerBaazi, Lagai Khai and FanBlaze." },
  { verb: "Grew", field: "Growth", org: "Witzeal Technologies", years: "2022–2023", taught: "How growth and monetization work.", proof: "Onboarding, bonus economics and lifecycle messaging for a real-money gaming platform." },
  { verb: "Personalized", field: "Learning products", org: "Edfora", years: "2023–2026", taught: "How a product adapts to each user.", proof: "A 3PL IRT adaptive engine in a product line that reached 100K+ learners." },
  { verb: "AI", field: "Current direction", org: "Independent", years: "Now", taught: "The same discipline, applied to AI-native products.", proof: "AI Learner Diagnostic: an independent prototype, evaluation designed before any model work." },
] as const;

/* -------------------------------------------------------------------------- */
/* Flagship cases (index; the stories live in content/cases.ts)                */
/* -------------------------------------------------------------------------- */

export const flagships = [
  {
    index: "01",
    slug: "onboarding-funnel-redesign",
    href: "/work/onboarding-funnel-redesign",
    capability: "Activation",
    headline: "Fixing the path to first value",
    company: "Witzeal Technologies",
    domain: "Real-money gaming",
    role: "Product Manager · 2022–2023",
    title: "Onboarding Funnel Redesign",
    opening: "Only ~12% of new users played on day one.",
    summary: "Read as a retention problem, it pointed to reminders and rewards. The funnel said activation. Five changes to the first 60 seconds, tested against a 30% control, and a clear account of what the test could and couldn't isolate.",
    delta: "d0" as DeltaId,
  },
  {
    index: "02",
    slug: "adaptive-assignment-engine",
    href: "/work/adaptive-assignment-engine",
    capability: "Personalization",
    headline: "Personalizing the learning path",
    company: "Edfora",
    domain: "EdTech",
    role: "Senior Product Manager · 2023–2026",
    title: "Adaptive Assignment Engine",
    opening: "Every learner was getting the same next question.",
    summary: "Three ways to fix difficulty fit, one chosen: a 3PL IRT engine that estimates each learner's ability and matches the question to it.",
    delta: "completion" as DeltaId,
  },
] as const;

export type CaseSlug = (typeof flagships)[number]["slug"];

/** The third homepage story: not another metric, but a decision to stop. */
export const sunsetStory = {
  index: "03",
  capability: "Product judgment",
  headline: "Sunsetting a feature on usage evidence",
  company: "Baazi Games",
  product: "FanBlaze",
  domain: "Fantasy sports",
  role: "Product Manager · 2019–2022",
  opening: "Fewer than 6% of match-day users used live scores.",
  summary: "Live scores were built to cut context switching and lift contest joins. Usage said fantasy intent was pre-match. The feature was sunset, and the effort moved to what users came for.",
  href: "/decisions#fanblaze",
  figure: { value: "<6%", label: "of active match-day users used it", basis: "Observed after launch" },
  opportunity: "Effort moved to starting-XI notifications, injury alerts and head-to-head stats.",
};

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
  /** Shown on the homepage. */
  featured?: boolean;
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
    featured: true,
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
      { text: "D14 return rate ~18% higher than the holdout cohort", basis: "Pilot A/B holdout: instant-hint access vs. the standard response queue" },
      { text: "~60% modeled support-cost avoidance", basis: "Modeled: avoided paid SME and faculty headcount against projected ticket-volume growth; not an observed budget reduction" },
    ],
    note: "D14 is reported as the controlled-cohort result, not attributed to any one component. AI was one option considered; no AI resolver shipped in this decision.",
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
    id: "fanblaze",
    code: "D-03",
    title: "Sunset live scores. Build for pre-match intent.",
    company: "Baazi Games",
    product: "FanBlaze",
    area: "Fantasy sports",
    role: "Product Manager",
    verdict: "Sunset",
    featured: true,
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
    id: "experimentation",
    code: "D-04",
    title: "Run experiments to reduce uncertainty, not to win.",
    company: "Baazi Games",
    area: "Experimentation",
    role: "Product Manager",
    verdict: "Program",
    featured: true,
    stages: [
      { term: "Practice", text: "20+ A/B tests run end to end: hypothesis, sample size and significance." },
      { term: "Signal", text: "A fair number came back inconclusive or negative." },
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
    featured: true,
    stages: [
      { term: "Problem", text: "Optimize for D7 liquidity and player survival, not only D0 ARPPU or raw server latency." },
      { term: "Decision", text: "Contextual matchmaking on historical wallet size and skill band, so new players see fewer inappropriate high-stakes tables." },
      { term: "Trade-off", text: "Client-side polling only for active seat counts; static table metadata served from edge CDN cache." },
    ],
    results: [{ text: "Peak server latency under 60 ms" }, { text: "Lower D1 bankruptcy rate for new users", basis: "Directional" }, { text: "Net revenue kept growing alongside higher D30 retention", basis: "Directional" }],
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
    results: [{ text: "GMV on a ~10% week-over-week growth trajectory over 11 months", basis: "Directional" }],
    note: "The trajectory spans the period the roadmap ran in. It isn't attributed to testing alone, and no starting GMV is recorded.",
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
    results: [{ text: "Session duration up ~35%, retention up ~25%", basis: "Method not captured" }],
  },
  {
    id: "faculty-signals",
    code: "D-08",
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
    results: [{ text: "Student retention up ~8–12% after real-time dashboards", basis: "Method not captured" }],
    details: [
      { term: "myAdvisor, as documented", items: ["High- and medium-priority alerts, raised at module level", "History, with filters by module and date", "Deep links into the part of the product where the teacher can act"] },
      { term: "Designed for attention", items: ["Notifications timed around a teacher's schedule", "Unread alerts handled deliberately"] },
    ],
    note: "The retention result belongs to the dashboards. myAdvisor is product design from the documentation; no outcome is claimed for it.",
  },
  {
    id: "gamification",
    code: "D-09",
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
    results: [{ text: "DAU up ~12–15%, average session time up ~15%", basis: "Directional" }],
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
    example: { text: "A ~12% Day-7 number pointed to reminders and rewards. The funnel showed only 12% of new users played on day one: an activation problem, with a different fix.", label: "Witzeal · Diagnosis", href: "/work/onboarding-funnel-redesign#diagnosis" },
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
    example: { text: "For the AI Learner Diagnostic, the evaluation rubric and launch gate were designed before any model work. They have not been run yet.", label: "AI Lab · Learner Diagnostic", href: "/ai-lab/learner-diagnostic#evaluation" },
  },
] as const;

/* -------------------------------------------------------------------------- */
/* AI Lab                                                                      */
/* -------------------------------------------------------------------------- */

export const aiLab = {
  headline: "How I build AI products",
  sub: "Strong AI product judgment; production evidence in progress. No evaluation has been run.",
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
      "Real-time engagement dashboards for faculty replaced a monthly spreadsheet pull: student retention up ~8–12%",
      "Interviews and usability tests with students and faculty fed a RICE-based roadmap; 5+ features shipped across web and mobile, reaching 100K+ learners",
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
      "Experimentation roadmap across pricing and reward loops, during an 11-month ~10% week-over-week GMV growth trajectory",
      "Bonus allocation by expected ROI per segment: bonus and discount spend down ~20%, retention held",
      "Lifecycle messaging (push, in-app, email) moved from one blast to segmented cohorts: long-term retention stabilized at 48%",
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
      "Standardized releases for a web application deployed to 150+ Fortune companies",
      "Coordinated four distributed teams across development, QA, UAT and deployment",
      "Ran A/B tests on UX changes that lifted client engagement by ~25%",
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
  phases: [
    { verb: "Built", text: "Writing the app from scratch taught me what a feature really costs, and that one well-scoped app can beat three tailored ones." },
    { verb: "Shipped", text: "Release management taught me that a product is only as good as the way it reaches people: process, sequencing, four teams in step." },
    { verb: "Measured", text: "Gaming taught me how users behave, and how to measure it. Twenty-plus experiments, many of them inconclusive, taught me to scope bets smaller." },
    { verb: "Grew", text: "Growth taught me to find where users drop before they reach value, and to fix the product before paying them to come back." },
    { verb: "Personalized", text: "EdTech taught me to adapt a product to each person with a statistical model, and to be honest about what a before/after can and can't prove." },
    { verb: "AI", text: "AI is the next application of the same discipline: a clear user problem, a measured outcome, and an evaluation agreed before the demo." },
  ],
};
