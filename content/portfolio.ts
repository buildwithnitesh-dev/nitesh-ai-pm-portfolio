export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager",
  experience: "~7 yrs product · 10+ yrs technology",
  domains: ["EdTech", "Gaming", "Consumer Technology"] as const,
  strengths: [
    "Product Strategy", "Growth", "Personalization", "Experimentation", "Product Analytics",
    "Consumer UX", "Retention", "Monetization", "AI and Data Products",
  ] as const,
};

export const seo = {
  title: `${profile.name} · Senior Product Manager, Growth, Consumer, AI & Data`,
  description:
    "Product Manager with about 7 years in product management and 10+ years across technology, most recently Senior Product Manager at Edfora. Case studies on adaptive learning, onboarding and retention, and AI product design, each with its documented outcome.",
};

/** Ordered to match the page: proof first, then how I think, then biography. */
export const nav = [
  { href: "/#metrics", id: "metrics", label: "Impact" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#expertise", id: "expertise", label: "Capabilities" },
  { href: "/#about", id: "about", label: "Thinking" },
  { href: "/#ai", id: "ai", label: "AI Lab" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Senior Product Manager  ·  Growth, Consumer, AI & Data",
  headline: "I build products that earn the next session.",
  lede:
    "About 7 years in product management and 10+ years across technology, consumer products and enterprise software. I work across growth, personalization, experimentation and AI-enabled products, most recently in EdTech at Edfora and before that in real-money gaming. I started as an Android developer, so I scope with engineering, not around it.",
  primaryCta: { href: "#work", label: "See the case studies" },
  secondaryCta: { href: "#contact", label: "Talk about a product problem" },
};

/** Lets a time-boxed reader choose how deep to go instead of scrolling blind. */
export const readingPaths = [
  { time: "30 sec", title: "The outcomes", body: "Documented results, shown with the precision they were reported in.", href: "#metrics" },
  { time: "5 min", title: "Three case studies", body: "Each told as a decision: what we saw, what we chose, what it cost.", href: "#work" },
  { time: "7 min", title: "One decision, in depth", body: "Why a fixed practice sequence lost learners, and how the engine matched difficulty instead.", href: "/work/adaptive-assignment-engine" },
] as const;

export const about = {
  eyebrow: "About",
  title: "Product thinking grounded in users, systems, and outcomes.",
  body:
    "A lot of my work has started with a number that stopped moving: flat DAU, inconsistent monetization, retention data that arrived a month late. The job is to find the behavior underneath it, choose the one change worth making, and measure it so the team learns something even when the result is flat.",
  facts: [
    ["Experience", "About 7 years in product management (since 2019) · 10+ years in technology"],
    ["Domains", "EdTech · Real-money gaming · Consumer and enterprise software"],
    ["Scale", "100K+ learners reached at Edfora"],
    ["Looking for", "Product Manager and Senior Product Manager roles in Growth, Consumer, and AI & Data products"],
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
  { id: "completion", value: "18–25%", label: "Assignment completion uplift", detail: "Adaptive Assignment Engine at Edfora. Practice drop-offs also reduced.", areas: ["Learning"], precision: "Range", chart: { low: 18, high: 25, direction: "up" } },
  { id: "d7", value: "12% → 25%", label: "Day-7 retention", detail: "Redesign of the first 60 seconds of onboarding at Witzeal Technologies.", areas: ["Retention"], precision: "Exact" },
  { id: "dau", value: "12–15%", label: "DAU growth", detail: "Quiz and gamification layer at Edfora, after DAU had been flat for two months.", areas: ["Engagement"], precision: "Range", chart: { low: 12, high: 15, direction: "up" } },
  { id: "session", value: "~15%", label: "Average session time", detail: "Quiz and gamification layer at Edfora.", areas: ["Engagement"], precision: "Approximate", chart: { low: 15, high: 15, direction: "up" } },
  { id: "student-retention", value: "8–12%", label: "Student retention", detail: "Real-time engagement dashboards for faculty at Edfora, replacing a monthly spreadsheet pull.", areas: ["Retention", "Learning"], precision: "Range", chart: { low: 8, high: 12, direction: "up" } },
  { id: "gmv", value: "~10% WoW", label: "GMV growth", detail: "Experimentation roadmap across pricing and reward loops at Witzeal Technologies. A weekly rate, so it is not plotted against one-time uplifts.", areas: ["Monetization"], precision: "Approximate" },
  { id: "bonus", value: "~20%", label: "Bonus spend reduction", detail: "Bonus allocation rebuilt around expected ROI per user segment at Witzeal Technologies. Retention held steady.", areas: ["Monetization", "Retention"], precision: "Approximate", chart: { low: 20, high: 20, direction: "down" } },
  { id: "lifecycle", value: "48%", label: "Long-term retention, stabilized", detail: "Lifecycle messaging moved from one blast to segmented cohorts at Witzeal Technologies. A retention level rather than an uplift, so it is not plotted.", areas: ["Retention"], precision: "Exact" },
];

export const retentionHeadline = { before: 12, after: 25, label: "Day-7 retention", context: "Witzeal · first-60-seconds onboarding redesign" };

export const caseStudies = [
  {
    index: "01",
    slug: "adaptive-assignment-engine",
    short: "Adaptive Assignments",
    domain: "EdTech · Edfora · Senior Product Manager",
    title: "Adaptive Assignment Engine",
    summary:
      "A fixed practice sequence gave every learner the same next question, so some stalled and others coasted. The engine matched difficulty to each learner instead. Assignment completion rose by roughly 18–25%, and fewer students dropped off mid-practice.",
    href: "/work/adaptive-assignment-engine",
    tags: ["Personalization", "Learning systems", "AI & data"],
    outcome: "18–25% completion uplift",
    evidence: "verified",
    inside: ["How the matching works", "Options and trade-offs", "Interactive decision trace"],
    readTime: "7 min",
  },
  {
    index: "02",
    slug: "onboarding-funnel-redesign",
    short: "Onboarding Funnel",
    domain: "Gaming · Witzeal Technologies · Product Manager",
    title: "Onboarding Funnel Redesign",
    summary:
      "Most new players who left were gone before their second session. After the first 60 seconds of the experience were redesigned, Day-7 retention went from 12% to 25%.",
    href: "/work/onboarding-funnel-redesign",
    tags: ["Growth", "Activation", "Retention"],
    outcome: "12% → 25% Day-7 retention",
    evidence: "verified",
    inside: ["Where the drop-off really was", "Interactive decision simulator", "Before and after"],
    readTime: "6 min",
  },
  {
    index: "03",
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
  /** Plain-language outcome when there is no metric. */
  result?: string;
  note?: string;
  /** Optional signal → decision → action loop, drawn as a small diagram. */
  loop?: readonly { stage: string; text: string }[];
};

export const decisions: readonly Decision[] = [
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
      "Rebuild allocation logic around the expected ROI of a reward for each user segment, instead of flat bonus tiers.",
    ],
    tradeoff:
      "Cutting incentives in a real-money gaming product can quietly hurt retention, and that was the main risk going in. The change only reads as a win because both numbers moved the right way: spend fell and retention held.",
    outcomes: [
      { value: "~20%", label: "less bonus and discount spend" },
      { value: "Held", label: "retention, the main risk going in" },
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
    outcomes: [{ value: "~10%", label: "week-over-week GMV growth through continuous testing" }],
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
    id: "ai-data",
    title: "AI & Data Products",
    practice: "Name the decision a model or data product should change, use rules where rules are enough, and design evaluation, confidence and human override in before scale.",
    buildsOn: ["personalization", "consumer-ux"],
    cases: [
      { slug: "adaptive-assignment-engine", role: "primary", note: "Professional (Edfora): learner ability estimated and matched against question difficulty, discrimination and guessing, with an LLM API adjusting difficulty from performance history." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "Independent prototype, not shipped: rules vs. model split, failure modes, evaluation rubric and educator override." },
    ],
    decisions: ["faculty-signals"],
    metrics: [],
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
    id: "consumer-ux",
    title: "Consumer UX",
    practice: "Design each step around the question the user is silently asking, so the next action is obvious.",
    buildsOn: ["experimentation", "monetization"],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "primary", note: "First 60 seconds redesigned after drop-off was traced to before the second session." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "Adaptation that changes the path without confusing the learner." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "UX for uncertainty: evidence, confidence, override." },
    ],
    decisions: ["gamification", "one-app"],
    metrics: ["dau", "session"],
  },
  {
    id: "growth",
    title: "Growth",
    practice: "Treat activation, habit and retention as one connected loop, and find where it actually breaks before adding incentives.",
    buildsOn: [],
    cases: [{ slug: "onboarding-funnel-redesign", role: "primary", note: "Drop-off traced to before the second session; first 60 seconds redesigned (Witzeal)." }],
    decisions: ["segmented-journeys", "bonus-roi"],
    metrics: ["d7", "lifecycle"],
    context: "Lifecycle messaging across push, in-app and email moved from one blast to segmented cohorts (Witzeal).",
  },
  {
    id: "product-analytics",
    title: "Product Analytics",
    practice: "Tie journeys and funnels to a small set of metrics that reflect real user value, and get them to the people who can act while it still matters.",
    buildsOn: [],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "supporting", note: "Drop-off traced to before the second session." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "One primary outcome, with supporting signals to explain movement." },
    ],
    decisions: ["faculty-signals", "segmented-journeys"],
    metrics: ["student-retention"],
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
    id: "monetization",
    title: "Monetization",
    practice: "Spend on incentives where they change behavior, test pricing and rewards as hypotheses, and hold retention as the guardrail.",
    buildsOn: [],
    cases: [],
    decisions: ["bonus-roi", "experimentation-roadmap"],
    metrics: ["gmv", "bonus"],
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
  /** For the product roles I owned end to end: scope and independent decisions. */
  owned?: readonly string[];
  decided?: readonly string[];
  /** Product areas covered by documentation, where that is on record. */
  documented?: readonly string[];
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
    decided: [
      "Daily sprint prioritization and feature scoping",
      "UI/UX interaction flows",
      "A/B experiment design",
      "Core engineering trade-offs",
      "Breaking business goals into epics, user stories and release milestones",
    ],
    documented: [
      "Adaptive", "AI Chatbot", "Alerts and Escalation", "Gamification", "Quiz", "Analytics", "Research",
      "Product Planning", "Stakeholder Platform", "VOD Analytics", "Author Platform", "Content Improvement",
    ],
    highlights: [
      "Adaptive Assignment Engine matched question difficulty to each learner: assignment completion up ~18–25%, practice drop-offs reduced",
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
      "Traced most onboarding drop-off to before a player’s second session and redesigned the first 60 seconds: Day-7 retention from 12% to 25%",
      "Built an experimentation roadmap across pricing and reward loops: GMV growth reached ~10% week over week",
      "Rebuilt bonus allocation around expected ROI per user segment: bonus and discount spend down ~20%, with retention holding steady",
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
  title: "Have a product problem worth solving?",
  body:
    "I’m open to Product Manager and Senior Product Manager roles in Growth, Consumer and AI & Data products, in Delhi NCR and, where it makes sense, Mumbai. If user behavior and business outcomes have to move together on your problem, I’d like to hear about it.",
  email: "buildwithnitesh@gmail.com",
  linkedin: "https://www.linkedin.com/in/buildwithnitesh/",
  /** The résumé PDF, served from /public. */
  resumeUrl: "/Nitesh_Product_Manager_Resume.pdf",
};

export const footer = {
  credit: "Nitesh Tiwari",
  line: "Senior Product Manager  ·  Growth, Consumer, AI & Data products",
};
