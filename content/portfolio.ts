export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager",
  experience: "~7 yrs product · 10+ yrs technology",
  domains: ["EdTech", "Gaming", "Consumer Technology"] as const,
  /** Ordered by positioning: growth first, AI last. */
  strengths: [
    "Growth", "Monetization", "Personalization", "Product Strategy", "Experimentation",
    "Consumer Products", "AI Products", "Retention", "Product Analytics",
  ] as const,
  /** Exactly the tools listed on the résumé, for keyword scanning. */
  tools: [
    "Mixpanel", "CleverTap", "GA4", "Firebase", "Jira", "Figma",
    "Postman", "Notion", "Miro", "OpenAI API", "Prompt engineering",
  ] as const,
};

export const seo = {
  title: `${profile.name} · Senior Product Manager | Consumer Products, Growth, Monetization & AI`,
  description:
    "Senior Product Manager for consumer products, growth, monetization and AI, with about 7 years in product management and 10+ years across technology, most recently at Edfora. Case studies on onboarding and retention, adaptive learning and real-money gaming decisions, each with its documented outcome, plus an independent AI product prototype.",
  /** Shorter title and description for link previews (WhatsApp, LinkedIn, Slack, X). */
  share: {
    title: "Nitesh Tiwari — Senior Product Manager | Consumer, Growth & AI",
    description: "7 years in Product · 10+ years in Technology · Building products that drive retention, revenue & engagement.",
    imageAlt: "Nitesh Tiwari, Senior Product Manager: Consumer Products, Growth, Monetization and AI. Day-7 retention 12.2% to 25.4%, assignment completion 18% to 45%, 100K+ learners.",
  },
};

/** Ordered to match the page: proof first, then experience, then how I work. */
export const nav = [
  { href: "/#metrics", id: "metrics", label: "Impact" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#how-i-work", id: "how-i-work", label: "How I work" },
  { href: "/#ai", id: "ai", label: "AI Lab" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Senior Product Manager  ·  Consumer Products  ·  Growth  ·  Monetization  ·  AI",
  headline: "I build products that earn the next session.",
  lede:
    "I find where users drop before they reach value, and fix the product before spending more to bring them back. About 7 years in product management, across EdTech and real-money gaming.",
  primaryCta: { href: "#work", label: "View my work" },
};

export const about = {
  eyebrow: "About",
  title: "Product thinking grounded in users, systems, and outcomes.",
  body:
    "A lot of my work has started with a number that stopped moving: flat DAU, inconsistent monetization, retention data that arrived a month late. The job is to find the behavior underneath it, choose the one change worth making, and measure it so the team learns something even when the result is flat.",
  facts: [
    ["Experience", "About 7 years in product management (since 2019) · 10+ years in technology"],
    ["Domains", "EdTech · Real-money gaming · Consumer and enterprise software"],
    ["Scale", "100K+ learners reached at Edfora"],
    ["Looking for", "Product Manager and Senior Product Manager roles, especially in growth, consumer products, monetization and AI"],
    ["Location", "Delhi NCR, and Mumbai where relevant"],
  ],
};

export type MetricArea = "Retention" | "Engagement" | "Learning" | "Monetization";
export const metricAreas: readonly MetricArea[] = ["Retention", "Engagement", "Learning", "Monetization"];

export type Metric = {
  id: string;
  value: string;
  label: string;
  detail: string;
  areas: readonly MetricArea[];
  precision: "Exact" | "Approximate" | "Range";
  /** Reported improvement in %, charted only when the unit is comparable. */
  chart?: { low: number; high: number; direction: "up" | "down" };
};

export const metrics: readonly Metric[] = [
  { id: "learners", value: "100K+", label: "Learners reached", detail: "Reach of Edfora’s learning and engagement products overall, not of a single feature.", areas: ["Learning"], precision: "Approximate" },
  { id: "completion", value: "18% → 45%", label: "Assignment completion", detail: "Edfora, 2-year academic-cycle dataset: 18% under the static learning path, 45% after the adaptive system was introduced (+27 percentage points). Not attributed to the adaptive system alone. A change in level, so it is not plotted.", areas: ["Learning"], precision: "Exact" },
  { id: "d7", value: "12.2% → 25.4%", label: "Day-7 retention", detail: "Witzeal onboarding redesign: control vs. treatment in a 3-week controlled rollout, ~50K users.", areas: ["Retention"], precision: "Exact" },
  { id: "d0", value: "12% → 33%", label: "D0 gameplay", detail: "Share of new users who played a game on their first day, before and after the Witzeal onboarding redesign. A change in level, so it is not plotted.", areas: ["Engagement"], precision: "Exact" },
  { id: "dau", value: "12–15%", label: "DAU growth", detail: "Quiz and gamification layer at Edfora, after DAU had been flat for two months.", areas: ["Engagement"], precision: "Range", chart: { low: 12, high: 15, direction: "up" } },
  { id: "session", value: "~15%", label: "Average session time", detail: "Quiz and gamification layer at Edfora.", areas: ["Engagement"], precision: "Approximate", chart: { low: 15, high: 15, direction: "up" } },
  { id: "student-retention", value: "8–12%", label: "Student retention", detail: "Real-time engagement dashboards for faculty at Edfora, replacing a monthly spreadsheet pull.", areas: ["Retention", "Learning"], precision: "Range", chart: { low: 8, high: 12, direction: "up" } },
  { id: "gmv", value: "~10% WoW", label: "GMV growth", detail: "Witzeal Technologies: a ~10% week-over-week GMV growth trajectory sustained over 11 months, alongside an experimentation roadmap across pricing and reward loops. Not attributed to testing alone. A weekly rate, so it is not plotted.", areas: ["Monetization"], precision: "Approximate" },
  { id: "bonus", value: "~20%", label: "Bonus spend reduction", detail: "Witzeal Technologies: bonus allocation moved from flat tiers to expected ROI per player segment. Retention held steady.", areas: ["Monetization", "Retention"], precision: "Approximate", chart: { low: 20, high: 20, direction: "down" } },
  { id: "lifecycle", value: "48%", label: "Long-term retention, stabilized", detail: "Lifecycle messaging moved from one blast to segmented cohorts at Witzeal Technologies. A retention level rather than an uplift, so it is not plotted.", areas: ["Retention"], precision: "Exact" },
];

export const retentionHeadline = { before: 12.2, after: 25.4, label: "Day-7 retention", context: "Witzeal · first-60-seconds onboarding redesign" };

/** Ordered by strength of the growth story. The AI prototype has a page but is shown in the AI Lab, not Selected Work. */
export const caseStudies = [
  {
    index: "01",
    slug: "onboarding-funnel-redesign",
    short: "Onboarding Funnel",
    domain: "Gaming · Witzeal Technologies · Product Manager",
    title: "Onboarding Funnel Redesign",
    summary:
      "Only 12% of new users played a game on their first day, and Day-7 retention was ~12%. A redesigned first session, tested against a 30% control, lifted D0 gameplay to 33% and Day-7 retention to 25.4%.",
    href: "/work/onboarding-funnel-redesign",
    tags: ["Growth", "Activation", "Experimentation"],
    outcome: "12.2% → 25.4% Day-7 retention",
    evidence: "verified",
    inside: ["Activation, not retention", "₹15 bonus, ₹20 first deposit", "30/70 controlled rollout"],
    readTime: "3 min",
  },
  {
    index: "02",
    slug: "adaptive-assignment-engine",
    short: "Adaptive Assignments",
    domain: "EdTech · Edfora · Senior Product Manager",
    title: "Adaptive Assignment Engine",
    summary:
      "A fixed practice sequence gave every learner the same next question. A 3PL IRT-based engine matched difficulty to each learner instead. Across a 2-year academic-cycle dataset, completion was 18% on the static path and 45% after the adaptive system.",
    href: "/work/adaptive-assignment-engine",
    tags: ["Personalization", "3PL IRT", "Learning"],
    outcome: "Assignment completion: 18% → 45%",
    evidence: "verified",
    inside: ["Three options, one chosen", "How the matching works", "2-year before vs. after"],
    readTime: "3 min",
  },
  {
    index: "Prototype",
    slug: "ai-learner-diagnostic",
    short: "AI Diagnostic",
    domain: "AI Product · Independent prototype",
    title: "AI Learner Diagnostic",
    summary:
      "A self-built prototype that diagnoses a learner’s skill gaps and proposes a next step. It is built to show the parts of AI product work a demo hides: where rules beat a model, how confidence is shown, what happens when it is wrong, and how a teacher overrules it.",
    href: "/work/ai-learner-diagnostic",
    tags: ["AI product", "Evaluation", "Human oversight"],
    outcome: "Independent prototype · no real users or model results",
    evidence: "prototype",
    inside: ["Playable prototype", "Rules vs. model split", "Failure modes and fallbacks"],
    readTime: "8 min",
  },
] as const;

export type CaseSlug = (typeof caseStudies)[number]["slug"];

/**
 * Two Baazi Games decisions told in brief inside Selected Work: one call that
 * worked and one feature that was sunset. Facts as supplied by Nitesh; no
 * numbers beyond those stated.
 */
export type Story = {
  id: string;
  product: string;
  area: string;
  title: string;
  steps: readonly { term: string; text: string }[];
  outcomes: readonly { value: string; label: string }[];
  results?: readonly string[];
  learning?: string;
};

export const baazi = {
  company: "Baazi Games",
  role: "Product Manager",
  period: "2019–2022",
  stories: [
    {
      id: "pokerbaazi-matchmaking",
      product: "PokerBaazi",
      area: "Real-money poker",
      title: "Match new players to tables they can survive.",
      steps: [
        { term: "Problem", text: "Optimize for D7 liquidity and player survival, not only D0 ARPPU or raw server latency." },
        { term: "Decision", text: "Contextual matchmaking on historical wallet size and skill band, so new players see fewer inappropriate high-stakes tables." },
        { term: "Trade-off", text: "Client-side polling only for active seat counts; static table metadata served from edge CDN cache." },
      ],
      outcomes: [{ value: "<60 ms", label: "peak server latency" }],
      results: ["Lower D1 bankruptcy rate for new users", "Net revenue kept growing alongside higher D30 retention"],
    },
    {
      id: "fanblaze-live-scores",
      product: "FanBlaze",
      area: "Fantasy sports · a feature sunset",
      title: "Sunset live scores. Build for pre-match intent.",
      steps: [
        { term: "Hypothesis", text: "In-app live football scores would cut context switching and lift live engagement and contest joins." },
        { term: "Built", text: "A live score and play-by-play ticker, contest and match-lobby integration, match-event pushes." },
        { term: "Why it missed", text: "Users already followed scores elsewhere, fantasy intent was mostly pre-match, and the low-latency sports API added cost without matching value." },
        { term: "Decision", text: "Sunset it, and move the effort to starting-XI notifications, injury alerts and head-to-head stats." },
      ],
      outcomes: [
        { value: "<6%", label: "of match-day users used it" },
        { value: "~2 min", label: "longer sessions" },
      ],
      results: ["No meaningful uplift in mid-match contest joins, lineup changes or re-deposits"],
      learning: "Users came for fantasy execution, not passive score consumption.",
    },
  ] satisfies Story[],
};

/**
 * Smaller product decisions, told in the same shape as the case studies but
 * shorter. Every fact comes from the résumé or the product documentation
 * supplied for this portfolio. `tradeoff` is product reasoning and is labelled
 * as such on the page; `note` states what is and isn't claimed.
 */
export type Decision = {
  id: string;
  /** Short name used in links and chips. */
  short: string;
  company: string;
  role: string;
  area: string;
  title: string;
  tension: string;
  signal: string;
  decision: readonly string[];
  tradeoff: string;
  outcomes: readonly { value: string; label: string }[];
  /** Plain-language context beside the outcomes, or instead of them when there is no metric. */
  result?: string;
  note?: string;
  /** Optional signal → decision → action loop, drawn as a small diagram. */
  loop?: readonly { stage: string; text: string }[];
  /** Optional compact detail, e.g. segments and mechanics. */
  details?: readonly { term: string; items: readonly string[] }[];
};

export const decisions: readonly Decision[] = [
  {
    id: "bonus-roi",
    short: "Bonus allocation",
    company: "Witzeal Technologies",
    role: "Product Manager",
    area: "Monetization",
    title: "Stop paying the same bonus to every player.",
    tension: "Incentive cost vs. retention risk",
    signal:
      "Reward costs were eating into margin without a clear retention payoff. Bonuses were allocated in flat tiers.",
    decision: [
      "Replace flat bonus tiers with expected ROI per segment, optimizing for incremental NGR (net gaming revenue) per rupee of bonus spend.",
    ],
    tradeoff:
      "Cutting incentives in a real-money gaming product can quietly hurt retention, and that was the main risk going in. The change only reads as a win because both numbers moved the right way: spend fell and retention held.",
    outcomes: [
      { value: "~20%", label: "less bonus and discount spend" },
      { value: "Held", label: "retention, the main risk going in" },
    ],
    details: [
      { term: "Segments", items: ["New / onboarding", "High-value / core LTV drivers", "Low-value / recreational", "Dormant / at-risk"] },
      { term: "Mechanics", items: ["High-value: targeted loss-protection and liquidity-matched bonuses", "Low-value / at-risk: friction-reduction top-ups tied to deposit triggers"] },
    ],
    result: "Goal: maximize incremental NGR per rupee of bonus spend",
  },
  {
    id: "faculty-signals",
    short: "Faculty signals",
    company: "Edfora",
    role: "Senior Product Manager",
    area: "Data product",
    title: "Turn a monthly spreadsheet into a signal a teacher can act on.",
    tension: "Complete data vs. timely action",
    signal:
      "Students were disengaging well before faculty found out. Retention data reached faculty through a monthly spreadsheet pull, so by the time anyone saw it, it described students who had already drifted.",
    decision: [
      "Replace the monthly pull with real-time engagement dashboards, so faculty could step in while a student was still reachable.",
      "The next layer in the product documentation, myAdvisor, moves from dashboards to alerts. It specifies high and medium priority alerts, alerting at module level, a history view, filters by module and date, and deep links that open the part of the product where the teacher can act. Unread alerts are handled deliberately, and notifications are timed around a teacher’s schedule instead of firing the moment a threshold trips.",
    ],
    tradeoff:
      "A dashboard shows everything and leaves the teacher to find the problem. An alert picks the problem for them, which only helps if it is the right problem and it arrives when the teacher can do something about it. Send too many and teachers stop reading them, so priority, timing and unread handling matter as much as the signal itself.",
    outcomes: [{ value: "8–12%", label: "student retention, after real-time dashboards" }],
    note: "The retention result belongs to the dashboards. myAdvisor is shown as product design from the documentation, and no outcome is claimed for it.",
    loop: [
      { stage: "Signal", text: "A module-level alert, marked high or medium priority" },
      { stage: "Decision", text: "The teacher triages it in context, with history and filters by module and date" },
      { stage: "Action", text: "A deep link opens the part of the product where they can act, timed around their schedule" },
    ],
  },
  {
    id: "gamification",
    short: "Gamification",
    company: "Edfora",
    role: "Senior Product Manager",
    area: "Engagement",
    title: "Make practice more engaging without making it look like a game.",
    tension: "Student engagement vs. teacher credibility",
    signal:
      "DAU had plateaued for two straight months. The response was a quiz and gamification layer, and the risk showed up early: teachers flagged the early prototypes as “too game-y”.",
    decision: [
      "Keep the quiz and gamification layer, and work with design to keep the mechanics from feeling gimmicky to teachers.",
    ],
    tradeoff:
      "The most attention-grabbing mechanics are often the ones most likely to lose teachers. In a classroom product, teacher trust is part of the engagement loop, so it can be worth trading some raw engagement for credibility.",
    outcomes: [
      { value: "12–15%", label: "DAU growth" },
      { value: "~15%", label: "longer average sessions" },
    ],
  },
  {
    id: "experimentation-roadmap",
    short: "Testing roadmap",
    company: "Witzeal Technologies",
    role: "Product Manager",
    area: "Experimentation",
    title: "Replace one-off monetization bets with a testing roadmap.",
    tension: "Speed per idea vs. knowing what worked",
    signal:
      "Monetization results were inconsistent from one change to the next, and the diagnosis was a lack of structured testing.",
    decision: [
      "Build an experimentation roadmap across pricing and reward loops, with each change written as a hypothesis and run as an A/B test.",
    ],
    tradeoff:
      "Testing is slower per idea than shipping on conviction. The return is that every result, including the flat ones, narrows the next bet.",
    outcomes: [{ value: "~10% WoW", label: "GMV growth trajectory, sustained over 11 months" }],
    note: "Supporting context: the GMV trajectory spans the period the roadmap ran in. It is not attributed to testing alone, and no starting GMV is shown.",
  },
  {
    id: "segmented-journeys",
    short: "Segmented journeys",
    company: "Baazi Games",
    role: "Product Manager",
    area: "Personalization",
    title: "Stop designing one journey for every kind of player.",
    tension: "One journey to maintain vs. several that fit",
    signal: "A single default journey was underperforming across different player segments.",
    decision: [
      "Use behavioral clustering to find the segments that actually behaved differently, then redesign the journey for each of them.",
    ],
    tradeoff:
      "Every extra journey is something more to build, test and maintain. Segmentation pays off when the segments are few and clearly different in behavior.",
    outcomes: [
      { value: "~35%", label: "longer sessions" },
      { value: "~25%", label: "higher retention" },
    ],
  },
  {
    id: "one-app",
    short: "One app, three roles",
    company: "Direct Create",
    role: "Android Developer",
    area: "Product and engineering",
    title: "Ship one app with three roles, not three apps.",
    tension: "Tailored apps vs. what a small team can sustain",
    signal:
      "The platform connected three kinds of users in the handmade industry: makers, buyers and designers. The alternative was separate apps for each role.",
    decision: [
      "As the sole Android developer, I proposed a single app where people choose their role, then built it from scratch. Requirements came out of discussions with the CEO and CTO, and the UX was worked through with the designer before implementation.",
    ],
    tradeoff:
      "One app means more role logic inside the product and slightly less tailoring per role. Against that: a small team, limited time and budget, one codebase to maintain, one app to run and market instead of three, and a lower technology bill.",
    outcomes: [],
    result: "Platform context: 400+ maker shops and 100+ designers",
    note: "This was an Android Developer role, not a product management role; the product contribution came from working directly with the CEO and CTO on what to build. The 400+ maker shops and 100+ designers describe the platform’s scale. They are not claimed as a result of the one-app decision.",
  },
];

export type CapabilityId =
  | "ai-data" | "personalization" | "consumer-ux" | "growth"
  | "product-analytics" | "experimentation" | "monetization";

export type Capability = {
  id: CapabilityId;
  title: string;
  /** What I practice: the working method, in one sentence. */
  practice: string;
  /** Capabilities this one is built on (drawn as thin connecting lines). */
  buildsOn: readonly CapabilityId[];
  /** Case studies that demonstrate it; `note` says what in the case shows it. */
  cases: readonly { slug: CaseSlug; role: "primary" | "supporting"; note: string }[];
  /** Decisions (ids in `decisions`) that demonstrate it. */
  decisions: readonly string[];
  /** Documented outcomes (ids in `metrics`) that demonstrate it. */
  metrics: readonly string[];
  /** Other documented experience, quoted from the Experience section. */
  context?: string;
};

/**
 * Demonstrated capabilities, not self-ratings: every entry points only at
 * evidence that already exists on this site (a case study, a decision, or a
 * documented metric). Platform thinking is deliberately absent because
 * nothing here documents it yet.
 */
export const capabilities: readonly Capability[] = [
  {
    id: "growth",
    title: "Growth",
    practice: "Treat activation, habit and retention as one connected loop, and find where it actually breaks before adding incentives.",
    buildsOn: [],
    cases: [{ slug: "onboarding-funnel-redesign", role: "primary", note: "Only 12% of new users played a game on D0; after the redesign, 33% did (Witzeal)." }],
    decisions: ["segmented-journeys", "bonus-roi"],
    metrics: ["d7", "lifecycle"],
    context: "Lifecycle messaging across push, in-app and email moved from one blast to segmented cohorts (Witzeal).",
  },
  {
    id: "monetization",
    title: "Monetization",
    practice: "Spend on incentives where they change behavior, test pricing and rewards as hypotheses, and hold retention as the guardrail.",
    buildsOn: [],
    cases: [],
    decisions: ["bonus-roi", "experimentation-roadmap"],
    metrics: ["gmv", "bonus"],
  },
  {
    id: "personalization",
    title: "Personalization",
    practice: "Use behavioral signals to change the next experience only where it measurably helps, and keep a stable default everywhere else.",
    buildsOn: ["product-analytics", "growth"],
    cases: [
      { slug: "adaptive-assignment-engine", role: "primary", note: "Question difficulty matched to each learner’s estimated ability." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "Next step recommended from a diagnosed gap." },
    ],
    decisions: ["segmented-journeys", "bonus-roi"],
    metrics: ["completion"],
  },
  {
    id: "experimentation",
    title: "Experimentation",
    practice: "Turn product opinions into hypotheses, tests and decision rules, and treat a flat result as information, not failure.",
    buildsOn: [],
    cases: [],
    decisions: ["experimentation-roadmap"],
    metrics: ["gmv"],
    context: "Ran 20+ A/B tests end to end at Baazi Games. A fair number came back inconclusive or negative, which changed how later tests were scoped.",
  },
  {
    id: "consumer-ux",
    title: "Consumer Products",
    practice: "Design each step around the question the user is silently asking, so the next action is obvious.",
    buildsOn: ["experimentation", "monetization"],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "primary", note: "First session redesigned after finding that only 12% of new users played a game on D0." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "Adaptation that changes the path without confusing the learner." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "UX for uncertainty: evidence, confidence, override." },
    ],
    decisions: ["gamification", "one-app"],
    metrics: ["dau", "session"],
  },
  {
    id: "ai-data",
    title: "AI & Data Products",
    practice: "Name the decision a model or data product should change, use rules where rules are enough, and design evaluation, confidence and human override in before scale.",
    buildsOn: ["personalization", "consumer-ux"],
    cases: [
      { slug: "adaptive-assignment-engine", role: "primary", note: "Professional (Edfora): 3PL IRT-based adaptive practice; learner ability (θ) estimated per concept and matched against question difficulty, discrimination and guessing." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "Independent prototype, not shipped: rules vs. model split, failure modes, evaluation rubric and educator override." },
    ],
    decisions: ["faculty-signals"],
    metrics: [],
  },
  {
    id: "product-analytics",
    title: "Product Analytics",
    practice: "Tie journeys and funnels to a small set of metrics that reflect real user value, and get them to the people who can act while it still matters.",
    buildsOn: [],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "supporting", note: "Found that about 65% of new users did not play a game on D0." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "One primary outcome, with supporting signals to explain movement." },
    ],
    decisions: ["faculty-signals", "segmented-journeys"],
    metrics: ["student-retention"],
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  /** The stage of the career this role represents. */
  phase: "Engineering foundation" | "Program & release management" | "Product management" | "Senior product management";
  summary: string;
  /** For the product roles I owned end to end: the scope, in one line. */
  owned?: readonly string[];
  highlights: readonly string[];
};

/** Documented career timeline, most recent first. */
export const career: readonly Role[] = [
  {
    company: "Edfora",
    title: "Senior Product Manager",
    period: "Jul 2023 – Jul 2026",
    location: "Gurugram",
    phase: "Senior product management",
    summary: "Owned product strategy and roadmap for learning and engagement experiences on web and mobile, working with engineering, design, content and business teams.",
    owned: [
      "Product discovery and PRDs",
      "UI/UX design collaboration",
      "Sprint planning",
      "Post-launch analytics: retention, DAU, feature adoption",
    ],
    highlights: [
      "3PL IRT-based Adaptive Assignment Engine matched question difficulty to each learner’s ability. Across a 2-year academic-cycle dataset, assignment completion was 18% on the static path and 45% after it was introduced",
      "Quiz and gamification layer, shaped by teachers who found early prototypes “too game-y”: DAU up ~12–15%, average session time up ~15%",
      "Replaced a monthly spreadsheet pull with real-time engagement dashboards for faculty: student retention up ~8–12%",
      "Regular interviews and usability tests with students and faculty fed a RICE-based roadmap; 5+ features shipped across web and mobile, reaching 100K+ learners",
    ],
  },
  {
    company: "Witzeal Technologies",
    title: "Product Manager",
    period: "May 2022 – Mar 2023",
    location: "Gurugram",
    phase: "Product management",
    summary: "Growth, onboarding, monetization and lifecycle for a real-money gaming platform.",
    highlights: [
      "Found that only 12% of new users played a game on D0 and redesigned the first session: D0 gameplay 12% → 33%, Day-7 retention 12.2% → 25.4% in a controlled rollout",
      "Built an experimentation roadmap across pricing and reward loops, during an 11-month ~10% week-over-week GMV growth trajectory",
      "Moved bonus allocation from flat tiers to expected ROI per player segment: bonus and discount spend down ~20%, with retention holding steady",
      "Moved lifecycle messaging (push, in-app and email) from a single blast to segmented cohorts: long-term retention stabilized at 48%",
    ],
  },
  {
    company: "Baazi Games",
    title: "Product Manager",
    period: "Jun 2019 – May 2022",
    location: "New Delhi",
    phase: "Product management",
    summary: "Experimentation, segmentation and risk across a multi-game platform including PokerBaazi, Lagai Khai and FanBlaze. Product work on the first-deposit funnel, churn, game discovery and monetization.",
    highlights: [
      "Ran 20+ A/B tests end to end, from hypothesis and sample size to significance: core funnel conversion up ~15%. A fair number came back inconclusive or negative, which changed how later tests were scoped",
      "Used behavioral clustering to replace one default journey with journeys by player segment: session duration up ~35%, retention up ~25%",
      "Built a rules-based anomaly detection layer for fraudulent transactions: fraud losses down ~18%",
    ],
  },
  {
    company: "PwC India",
    title: "Program & Release Manager",
    period: "Jan 2019 – Jun 2019",
    location: "Gurgaon",
    phase: "Program & release management",
    summary: "Program and release management for enterprise web applications, including EwayBill and an LMS. The step between engineering and product: owning delivery across teams and clients.",
    highlights: [
      "Standardized release processes for a web application deployed to 150+ Fortune companies",
      "Coordinated four distributed teams across development, QA, UAT and deployment",
      "Ran client UAT, root-cause analysis and defect management, and introduced sprint planning and retros to a team that had been working ad hoc",
      "Ran A/B tests on UX changes that lifted client engagement by ~25%",
    ],
  },
  {
    company: "Direct Create",
    title: "Android Developer",
    period: "May 2014 – Dec 2018",
    location: "Gurgaon",
    phase: "Engineering foundation",
    summary: "Sole Android developer on a collaboration platform for the handmade industry, connecting makers, buyers and designers. Built the app from scratch and worked directly with the CEO and CTO on what to build.",
    highlights: [
      "Proposed one app with role selection instead of separate Maker, Buyer and Designer apps: one codebase and one product to market for a small team",
      "The platform grew to 400+ maker shops and 100+ designers",
      "Real-time chat and file sharing on Firebase; crash rate down ~30% through better state handling and testing",
      "OAuth 2.0 and encrypted local storage; a 4.6+ Play Store rating kept through iterative UX fixes",
    ],
  },
];

/** The progression the timeline shows, oldest first. */
export const careerArc = [
  { phase: "Engineering foundation", years: "2014–2018" },
  { phase: "Program & release management", years: "2019" },
  { phase: "Product management", years: "2019–2023" },
  { phase: "Senior product management", years: "2023–2026" },
] as const;

export const aiCapabilities = [
  ["Rules first, a model where it earns it", "Much of a learning product can run on deterministic logic. A model belongs where judgment is needed and a wrong answer is recoverable."],
  ["Evaluation before scale", "A representative test set, a rubric, named failure categories and a launch threshold, agreed before anyone argues about the demo."],
  ["Uncertainty is a UX problem", "Show the evidence, say how confident the system is, define what happens when it isn’t, and let a person overrule it."],
  ["Cost and latency are product constraints", "If it can’t run at every learner checkpoint at an acceptable speed and cost, it is a demo feature, not a product."],
] as const;

/** The AI product loop, taken from the AI Learner Diagnostic user journey. */
export const aiLoop = [
  ["Assess", "Collect a small, representative set of learner evidence."],
  ["Diagnose", "Identify the skill gaps the evidence actually supports."],
  ["Explain", "Show the learner and educator why, with evidence before the verdict."],
  ["Recommend", "Propose a learning path the educator can accept or override."],
  ["Practice", "Generate targeted practice for the diagnosed gap."],
  ["Evaluate", "Score the outcome against a rubric, not a demo prompt."],
  ["Adapt", "Feed the result back into the next decision."],
] as const;

export const contact = {
  eyebrow: "Open to Product Manager and Senior Product Manager roles",
  title: "Hiring for a product role? Let’s talk.",
  body:
    "I’m open to Product Manager and Senior Product Manager roles, especially in growth, consumer products, monetization and AI, in Delhi NCR and, where it makes sense, Mumbai. If user behavior and business outcomes have to move together on your problem, I’d like to hear about it.",
  email: "buildwithnitesh@gmail.com",
  linkedin: "https://www.linkedin.com/in/buildwithnitesh/",
  /** The résumé PDF, served from /public. */
  resumeUrl: "/Nitesh_Product_Manager_Resume.pdf",
};

export const footer = {
  credit: "Nitesh Tiwari",
  line: "Senior Product Manager  ·  Consumer Products  ·  Growth  ·  Monetization  ·  AI",
};
