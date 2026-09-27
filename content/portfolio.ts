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

/** Ordered to match the page: proof first, biography second. */
export const nav = [
  { href: "/#metrics", id: "metrics", label: "Impact" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#expertise", id: "expertise", label: "Expertise" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#ai", id: "ai", label: "AI Lab" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Senior Product Manager  ·  AI Product Manager",
  headline: "I build products that earn the next session.",
  lede:
    "10+ years across EdTech, Gaming, and Consumer Technology. I connect product strategy, growth, personalization, and AI with measurable product outcomes.",
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
    ["Experience", "10+ years in product"],
    ["Domains", "EdTech · Gaming · Consumer Technology"],
    ["Scale", "100K+ learners impacted"],
    ["Looking for", "Senior / Principal PM — Growth, Consumer, AI-led experiences"],
    ["Location", "Delhi NCR · Mumbai where relevant"],
  ],
};

/** Principles lifted from the case studies, so each one links back to where it was earned. */
export const principles = [
  { quote: "Optimize the journey, not just the feature.", source: "Adaptive Assignment Engine", href: "/work/adaptive-assignment-engine#reflection" },
  { quote: "Retention is won before the retention metric.", source: "Onboarding Funnel Redesign", href: "/work/onboarding-funnel-redesign#reflection" },
  { quote: "Problem first, model second.", source: "AI product lab", href: "#ai" },
] as const;

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
  { id: "learners", value: "100K+", label: "Learners impacted", detail: "Across learning, personalization, and engagement experiences.", areas: ["Learning"], precision: "Approximate" },
  { id: "completion", value: "18–25%", label: "Assignment completion uplift", detail: "Adaptive assignment experience designed around learner behavior.", areas: ["Learning"], precision: "Range", chart: { low: 18, high: 25, direction: "up" } },
  { id: "d7", value: "12% → 25%", label: "Day-7 retention", detail: "End-to-end redesign of a gaming onboarding funnel.", areas: ["Retention"], precision: "Exact" },
  { id: "dau", value: "12–15%", label: "DAU growth", detail: "Quiz and gamification experiences.", areas: ["Engagement"], precision: "Range", chart: { low: 12, high: 15, direction: "up" } },
  { id: "session", value: "~15%", label: "Session time", detail: "Engagement and personalization improvements.", areas: ["Engagement"], precision: "Approximate", chart: { low: 15, high: 15, direction: "up" } },
  { id: "student-retention", value: "8–12%", label: "Student retention", detail: "Faculty engagement dashboards.", areas: ["Retention", "Learning"], precision: "Range", chart: { low: 8, high: 12, direction: "up" } },
  { id: "gmv", value: "~10% WoW", label: "GMV growth", detail: "A/B testing and user segmentation. A weekly rate, so it is not plotted against one-time uplifts.", areas: ["Monetization"], precision: "Approximate" },
  { id: "bonus", value: "~20%", label: "Bonus spend reduction", detail: "Targeted incentives while maintaining retention.", areas: ["Monetization", "Retention"], precision: "Approximate", chart: { low: 20, high: 20, direction: "down" } },
];

export const retentionHeadline = { before: 12, after: 25, label: "Day-7 retention", context: "Gaming onboarding funnel redesign" };

export const caseStudies = [
  {
    index: "01",
    slug: "adaptive-assignment-engine",
    short: "Adaptive Assignments",
    domain: "EdTech · Professional experience",
    title: "Adaptive Assignment Engine",
    summary:
      "Redesigned assignment progression around learner behavior and personalization, improving assignment completion by approximately 18–25%.",
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
    domain: "Gaming · Professional experience",
    title: "Onboarding Funnel Redesign",
    summary:
      "End-to-end onboarding work that improved Day-7 retention from 12% to 25%, using funnel analysis, experimentation, and behavioral segmentation.",
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
    outcome: "Working prototype · no real-user results claimed",
    evidence: "prototype",
    inside: ["Playable prototype", "System map", "Evaluation rubric"],
    readTime: "8 min",
  },
] as const;

export type CaseSlug = (typeof caseStudies)[number]["slug"];

/**
 * Claims mapped to proof. "primary" = the case study is built around this skill;
 * "supporting" = the skill is visibly used but is not the headline.
 */
export const expertise: readonly { title: string; body: string; evidence: Partial<Record<CaseSlug, "primary" | "supporting">> }[] = [
  { title: "Product strategy", body: "Frame the user, business problem, strategic choices, and sequence of bets.", evidence: { "adaptive-assignment-engine": "supporting", "onboarding-funnel-redesign": "supporting", "ai-learner-diagnostic": "primary" } },
  { title: "Growth systems", body: "Design activation, habit, retention, and experimentation as connected product loops.", evidence: { "onboarding-funnel-redesign": "primary" } },
  { title: "AI products", body: "Start with the decision or workflow that should change, then choose model, data, and UX.", evidence: { "ai-learner-diagnostic": "primary" } },
  { title: "Personalization", body: "Use behavioral signals to make the next experience more relevant without creating unnecessary complexity.", evidence: { "adaptive-assignment-engine": "primary", "ai-learner-diagnostic": "supporting" } },
  { title: "Experimentation", body: "Turn product opinions into hypotheses, tests, guardrails, and learning loops.", evidence: { "onboarding-funnel-redesign": "primary", "adaptive-assignment-engine": "supporting", "ai-learner-diagnostic": "supporting" } },
  { title: "Product analytics", body: "Connect journeys and funnels to a small set of metrics that represent real user value.", evidence: { "onboarding-funnel-redesign": "primary", "adaptive-assignment-engine": "supporting" } },
];

export const experience = [
  ["10+ years", "Product leadership across EdTech, Gaming, and Consumer Technology", "Framing problems, prioritizing bets, aligning design and engineering, and measuring outcomes after launch."],
  ["EdTech", "Learning progress as a product outcome", "Adaptive learning, personalization, gamification, learner engagement, and faculty-facing product experiences."],
  ["Gaming", "Retention and growth under competition", "Onboarding, session quality, experimentation, segmentation, incentives, and long-horizon retention."],
  ["AI", "Building the next layer of product judgment", "RAG, LLM evaluation, AI UX, guardrails, human-in-the-loop design, and measurable AI product outcomes."],
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
  linkedin: "https://www.linkedin.com/in/buildwithnitesh",
};

export const footer = {
  credit: "Nitesh Tiwari",
  line: "Senior Product Manager  ·  AI Product Manager",
};
