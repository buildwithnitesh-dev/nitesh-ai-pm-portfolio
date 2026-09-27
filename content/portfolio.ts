export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager | AI Product Manager",
  experience: "10+ years",
  domains: ["EdTech", "Gaming", "Consumer Technology"] as const,
  strengths: [
    "Product Strategy", "Growth", "AI Products", "Personalization",
    "Engagement", "Retention", "Experimentation",
  ] as const,
};

export const seo = {
  title: `${profile.name} — Senior Product Manager & AI Product Manager`,
  description:
    "Senior Product Manager and AI Product Manager with 10+ years across EdTech, Gaming, and Consumer Technology.",
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
  eyebrow: "Senior Product Manager  ·  AI Product Manager",
  headline: "I build products that earn the next session.",
  lede:
    "10+ years across EdTech, Gaming, and Consumer Technology — from Android engineering to senior product management. I work on growth, personalization, experimentation, and AI-led product experiences, judged by measurable outcomes.",
  primaryCta: { href: "#work", label: "Explore selected work" },
  secondaryCta: { href: "#contact", label: "Talk about a product problem" },
};

/** Lets a time-boxed reader choose how deep to go instead of scrolling blind. */
export const readingPaths = [
  { time: "30 sec", title: "The outcomes", body: "Verified results, charted with the precision available.", href: "#metrics" },
  { time: "5 min", title: "How I make product decisions", body: "Three case studies told as decisions, not deliverables.", href: "#work" },
  { time: "10 min", title: "Try the AI prototype", body: "Run the diagnostic loop and override the AI yourself.", href: "/work/ai-learner-diagnostic#prototype" },
] as const;

export const about = {
  eyebrow: "About",
  title: "Product thinking grounded in users, systems, and outcomes.",
  body:
    "I work across strategy, discovery, UX, experimentation, and growth. My strongest work sits where a messy user problem becomes a measurable product system — with clear trade-offs, instrumentation, and a reason for every feature.",
  facts: [
    ["Experience", "10+ years in technology · product management since 2019"],
    ["Domains", "EdTech · Gaming · Consumer Technology"],
    ["Scale", "100K+ learners impacted"],
    ["Looking for", "Senior / Principal PM — Growth, Consumer, AI-led experiences"],
    ["Location", "Delhi NCR · Mumbai where relevant"],
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
  { id: "learners", value: "100K+", label: "Learners impacted", detail: "Reach of Edfora’s broader learning and engagement work — not a single feature.", areas: ["Learning"], precision: "Approximate" },
  { id: "completion", value: "18–25%", label: "Assignment completion uplift", detail: "Adaptive Assignment Engine at Edfora; practice drop-offs also reduced.", areas: ["Learning"], precision: "Range", chart: { low: 18, high: 25, direction: "up" } },
  { id: "d7", value: "12% → 25%", label: "Day-7 retention", detail: "Redesign of the first 60 seconds of onboarding at Witzeal Technologies.", areas: ["Retention"], precision: "Exact" },
  { id: "dau", value: "12–15%", label: "DAU growth", detail: "Quiz and gamification features at Edfora.", areas: ["Engagement"], precision: "Range", chart: { low: 12, high: 15, direction: "up" } },
  { id: "session", value: "~15%", label: "Average session time", detail: "Quiz and gamification features at Edfora.", areas: ["Engagement"], precision: "Approximate", chart: { low: 15, high: 15, direction: "up" } },
  { id: "student-retention", value: "8–12%", label: "Student retention", detail: "Improved following engagement dashboards at Edfora — the dashboards contributed; they were not the only factor.", areas: ["Retention", "Learning"], precision: "Range", chart: { low: 8, high: 12, direction: "up" } },
  { id: "gmv", value: "~10% WoW", label: "GMV growth", detail: "Experimentation roadmap across pricing and reward loops, with hypothesis-led A/B tests, at Witzeal Technologies. A weekly rate, so it is not plotted against one-time uplifts.", areas: ["Monetization"], precision: "Approximate" },
  { id: "bonus", value: "~20%", label: "Bonus spend reduction", detail: "Bonus and reward allocation rebuilt around expected ROI per user segment at Witzeal Technologies; retention held steady.", areas: ["Monetization", "Retention"], precision: "Approximate", chart: { low: 20, high: 20, direction: "down" } },
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
      "Made assignment progression adapt to each learner — an LLM API adjusted question difficulty from student performance history — improving assignment completion by approximately 18–25% and reducing practice drop-offs.",
    href: "/work/adaptive-assignment-engine",
    tags: ["Personalization", "Learning", "Retention"],
    outcome: "18–25% completion uplift",
    evidence: "verified",
    inside: ["Journey map", "Interactive decision tree", "Outcome range"],
    readTime: "6 min",
  },
  {
    index: "02",
    slug: "onboarding-funnel-redesign",
    short: "Onboarding Funnel",
    domain: "Gaming · Witzeal Technologies · Product Manager",
    title: "Onboarding Funnel Redesign",
    summary:
      "Redesigned the first 60 seconds of onboarding, improving Day-7 retention from 12% to 25% — with experimentation used to test changes rather than opinion.",
    href: "/work/onboarding-funnel-redesign",
    tags: ["Growth", "Activation", "Experimentation"],
    outcome: "12% → 25% Day-7 retention",
    evidence: "verified",
    inside: ["First-session journey", "Experiment loop", "Before / after"],
    readTime: "5 min",
  },
  {
    index: "03",
    slug: "ai-learner-diagnostic",
    short: "AI Diagnostic",
    domain: "AI Product · Independent build",
    title: "AI Learner Diagnostic",
    summary:
      "A self-built AI PM portfolio product: diagnose skill gaps, generate a learning path, evaluate outputs, and design the human-in-the-loop experience.",
    href: "/work/ai-learner-diagnostic",
    tags: ["LLMs", "Evaluation", "Product Design"],
    outcome: "Independent prototype · deterministic demo, no real-user results",
    evidence: "prototype",
    inside: ["Playable prototype", "System map", "Evaluation rubric"],
    readTime: "8 min",
  },
] as const;

export type CaseSlug = (typeof caseStudies)[number]["slug"];

export type CapabilityId =
  | "ai-product" | "personalization" | "consumer-ux" | "growth"
  | "product-analytics" | "experimentation" | "gamification";

export type Capability = {
  id: CapabilityId;
  title: string;
  /** What I practice — the working method, in one sentence. */
  practice: string;
  /** Capabilities this one is built on (drawn as thin connecting lines). */
  buildsOn: readonly CapabilityId[];
  /** Case studies that demonstrate it; `note` says what in the case shows it. */
  cases: readonly { slug: CaseSlug; role: "primary" | "supporting"; note: string }[];
  /** Documented outcomes (ids in `metrics`) that demonstrate it. */
  metrics: readonly string[];
  /** Other documented experience, quoted from the Experience section. */
  context?: string;
};

/**
 * Demonstrated capabilities, not self-ratings: every entry points only at
 * evidence that already exists on this site (a case study or a documented metric).
 * Platform thinking is deliberately absent — nothing here documents it yet.
 */
export const capabilities: readonly Capability[] = [
  {
    id: "ai-product",
    title: "AI Product",
    practice: "Start with the decision or workflow that should change, then choose model, data, and UX — with evaluation and human override designed in before scale.",
    buildsOn: ["personalization", "consumer-ux"],
    cases: [
      { slug: "ai-learner-diagnostic", role: "primary", note: "Diagnostic loop, evaluation rubric, guardrails, and educator override — an independent prototype." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "Professional: an LLM API adjusted question difficulty from student performance history (Edfora)." },
    ],
    metrics: [],
  },
  {
    id: "personalization",
    title: "Personalization",
    practice: "Use behavioral signals to make the next experience more relevant without creating unnecessary complexity.",
    buildsOn: ["product-analytics", "growth"],
    cases: [
      { slug: "adaptive-assignment-engine", role: "primary", note: "Adaptive decision points inside the assignment journey." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "Learning-path recommendation from diagnosed gaps." },
    ],
    metrics: ["completion"],
  },
  {
    id: "consumer-ux",
    title: "Consumer UX",
    practice: "Design each step around the question the user is silently asking, so the next action is obvious.",
    buildsOn: ["experimentation", "gamification"],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "primary", note: "First-session journey redesigned around the first meaningful action." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "Adaptation that changes the path without confusing the learner." },
      { slug: "ai-learner-diagnostic", role: "supporting", note: "AI UX for uncertainty: evidence, confidence, override." },
    ],
    metrics: [],
  },
  {
    id: "growth",
    title: "Growth",
    practice: "Design activation, habit, retention, and experimentation as connected product loops.",
    buildsOn: [],
    cases: [{ slug: "onboarding-funnel-redesign", role: "primary", note: "Redesign of the first 60 seconds of onboarding (Witzeal)." }],
    metrics: ["d7", "gmv", "bonus"],
    context: "Owned lifecycle messaging across push, in-app, and email, using segmented cohorts rather than one generic blast (Witzeal).",
  },
  {
    id: "product-analytics",
    title: "Product Analytics",
    practice: "Connect journeys and funnels to a small set of metrics that represent real user value.",
    buildsOn: [],
    cases: [
      { slug: "onboarding-funnel-redesign", role: "supporting", note: "Funnel analysis and behavioral segmentation to find where momentum was lost." },
      { slug: "adaptive-assignment-engine", role: "supporting", note: "One primary outcome, with supporting signals to explain movement." },
    ],
    metrics: ["student-retention"],
    context: "Behavioral clustering used to redesign journeys by player segment (Baazi Games).",
  },
  {
    id: "experimentation",
    title: "Experimentation",
    practice: "Turn product opinions into hypotheses, tests, guardrails, and learning loops.",
    buildsOn: [],
    cases: [{ slug: "onboarding-funnel-redesign", role: "primary", note: "A/B tests read by segment to explain why retention moved." }],
    metrics: ["gmv"],
    context: "Ran 20+ A/B tests end-to-end (Baazi Games); built an experimentation roadmap across pricing and reward loops (Witzeal).",
  },
  {
    id: "gamification",
    title: "Gamification",
    practice: "Use quiz and game mechanics to give people a reason to come back — judged by daily engagement, not novelty.",
    buildsOn: [],
    cases: [],
    metrics: ["dau", "session"],
    context: "Quiz and gamification features at Edfora.",
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
  highlights: readonly string[];
};

/** Verified career timeline, most recent first. */
export const career: readonly Role[] = [
  {
    company: "Edfora",
    title: "Senior Product Manager",
    period: "Jul 2023 – Jul 2026",
    location: "Gurugram",
    phase: "Senior product management",
    summary: "Owned the end-to-end strategy, product roadmap, and delivery of the core digital learning and engagement ecosystem, across web and mobile.",
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
      "Breaking business goals into epics, user stories, and release milestones",
    ],
    highlights: [
      "Adaptive Assignment Engine — an LLM API adjusted question difficulty from student performance history: assignment completion up ~18–25%, practice drop-offs reduced",
      "Quiz and gamification: DAU up ~12–15%, average session time up ~15%",
      "Engagement dashboards contributed to improved student retention (~8–12%)",
      "The broader learning and engagement work reached 100K+ learners",
    ],
  },
  {
    company: "Witzeal Technologies",
    title: "Product Manager",
    period: "May 2022 – Mar 2023",
    location: "Gurugram",
    phase: "Product management",
    summary: "Growth, onboarding, experimentation, and lifecycle for a gaming product.",
    highlights: [
      "Redesigned the first 60 seconds of onboarding: Day-7 retention from 12% to 25%",
      "Built an experimentation roadmap across pricing and reward loops with hypothesis-led A/B tests: GMV growth reached ~10% week over week",
      "Rebuilt bonus and reward allocation around expected ROI per user segment: bonus and discount spend down ~20%, retention held steady",
      "Owned lifecycle messaging across push, in-app, and email, using segmented cohorts rather than one generic blast",
    ],
  },
  {
    company: "Baazi Games",
    title: "Product Manager",
    period: "Jun 2019 – May 2022",
    location: "New Delhi",
    phase: "Product management",
    summary: "Experimentation, player segmentation, and fraud detection for a gaming product.",
    highlights: [
      "Ran 20+ A/B tests end-to-end: core funnel conversion up ~15%",
      "Used behavioral clustering to redesign journeys by player segment: session duration up ~35%, retention up ~25%",
      "Rules-based anomaly detection reduced fraud losses by ~18%",
    ],
  },
  {
    company: "PwC India",
    title: "Program & Release Manager",
    period: "Jan 2019 – Jun 2019",
    location: "Gurgaon",
    phase: "Program & release management",
    summary: "Release and delivery management — the bridge from engineering into product.",
    highlights: [
      "Standardized release processes for a web application deployed to 150+ Fortune companies",
      "Coordinated four distributed teams across development, QA, UAT, and deployment",
      "Ran UX A/B tests that lifted client engagement by ~25%",
      "Introduced basic Agile ceremonies to improve delivery predictability",
    ],
  },
  {
    company: "Direct Create",
    title: "Android Developer",
    period: "May 2014 – Dec 2018",
    location: "Gurgaon",
    phase: "Engineering foundation",
    summary: "Built a B2B collaboration platform for the global handmade industry.",
    highlights: [
      "Real-time chat and file sharing using Firebase",
      "Reduced crash rate by ~30%",
      "Iterative UX fixes; maintained a 4.6+ Play Store rating",
      "Implemented OAuth 2.0 authentication and encrypted local storage with SQLite",
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
  ["Problem first, model second", "Define the user decision or workflow before choosing an LLM, retrieval strategy, or automation."],
  ["Evaluation as a product practice", "Create representative datasets, rubrics, failure categories, and launch thresholds before scaling AI."],
  ["AI UX for uncertainty", "Design confidence, citations, recovery, feedback, and human control into the experience."],
  ["Cost, latency, quality", "Treat model selection as a product trade-off across quality, speed, reliability, privacy, and unit economics."],
] as const;

/** The AI product loop, taken from the AI Learner Diagnostic user journey. */
export const aiLoop = [
  ["Assess", "Collect a small, representative set of learner evidence."],
  ["Diagnose", "Identify the skill gaps the evidence actually supports."],
  ["Explain", "Show the learner and educator why — evidence before verdict."],
  ["Recommend", "Propose a learning path the educator can accept or override."],
  ["Practice", "Generate targeted practice for the diagnosed gap."],
  ["Evaluate", "Score the outcome against a rubric, not a demo prompt."],
  ["Adapt", "Feed the result back into the next decision."],
] as const;

export const contact = {
  eyebrow: "Open to Senior PM / Principal PM conversations",
  title: "Have a product problem worth solving?",
  body:
    "I’m exploring Senior Product Manager and Principal Product Manager opportunities across Delhi NCR and, where relevant, Mumbai — especially Growth, Consumer Products, and AI-led experiences.",
  email: "buildwithnitesh@gmail.com",
  linkedin: "https://www.linkedin.com/in/buildwithnitesh/",
  /**
   * Set to a real file (e.g. "/Nitesh-Tiwari-Resume.pdf" placed in /public) to turn the
   * résumé CTA into a download. Until then it is a request-by-email link — never a fake URL.
   */
  resumeUrl: null as string | null,
};

export const footer = {
  credit: "Nitesh Tiwari",
  line: "Senior Product Manager  ·  AI Product Manager",
};
