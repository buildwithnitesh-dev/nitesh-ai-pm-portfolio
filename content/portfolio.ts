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

export const nav = [
  { href: "#about", label: "About" },
  { href: "#metrics", label: "Impact" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#ai", label: "AI Lab" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Senior Product Manager  ·  AI Product Manager",
  headline: "I build products that earn the next session.",
  lede:
    "10+ years across EdTech, Gaming, and Consumer Technology. I connect product strategy, growth, personalization, and AI with measurable product outcomes.",
  primaryCta: { href: "#work", label: "Explore selected work" },
  secondaryCta: { href: "#contact", label: "Talk about a product problem" },
};

export const about = {
  eyebrow: "About",
  title: "Product thinking grounded in users, systems, and outcomes.",
  body:
    "I work across strategy, discovery, UX, experimentation, and growth. My strongest work sits where a messy user problem becomes a measurable product system — with clear trade-offs, instrumentation, and a reason for every feature.",
  highlights: [
    "10+ years across EdTech, Gaming, and Consumer Technology",
    "100K+ learners impacted through learning and engagement products",
    "Adaptive assignment work improved completion by approximately 18–25%",
    "Gaming onboarding improved Day-7 retention from 12% → 25%",
    "Quiz and gamification work increased DAU by approximately 12–15%",
    "Session time increased by approximately 15%",
    "Faculty engagement dashboards contributed to approximately 8–12% retention improvement",
    "A/B testing and segmentation drove approximately 10% week-over-week GMV growth",
    "Bonus expenditure reduced approximately 20% while maintaining retention",
  ],
};

export const metrics = [
  ["100K+", "Learners impacted", "Across learning, personalization, and engagement experiences."],
  ["18–25%", "Assignment completion uplift", "Adaptive assignment experience designed around learner behavior."],
  ["12% → 25%", "Day-7 retention", "End-to-end redesign of a gaming onboarding funnel."],
  ["12–15%", "DAU growth", "Quiz and gamification experiences."],
  ["~15%", "Session time", "Engagement and personalization improvements."],
  ["8–12%", "Student retention", "Faculty engagement dashboards."],
  ["~10% WoW", "GMV growth", "A/B testing and user segmentation."],
  ["~20%", "Bonus spend reduction", "Targeted incentives while maintaining retention."],
] as const;

export const expertise = [
  ["Product strategy", "Frame the user, business problem, strategic choices, and sequence of bets."],
  ["Growth systems", "Design activation, habit, retention, and experimentation as connected product loops."],
  ["AI products", "Start with the decision or workflow that should change, then choose model, data, and UX."],
  ["Personalization", "Use behavioral signals to make the next experience more relevant without creating unnecessary complexity."],
  ["Experimentation", "Turn product opinions into hypotheses, tests, guardrails, and learning loops."],
  ["Product analytics", "Connect journeys and funnels to a small set of metrics that represent real user value."],
] as const;

export const caseStudies = [
  {
    index: "01",
    domain: "EdTech · Professional experience",
    title: "Adaptive Assignment Engine",
    summary:
      "Redesigned assignment progression around learner behavior and personalization, improving assignment completion by approximately 18–25%.",
    href: "/work/adaptive-assignment-engine",
    tags: ["Personalization", "Learning", "Retention"],
  },
  {
    index: "02",
    domain: "Gaming · Professional experience",
    title: "Onboarding Funnel Redesign",
    summary:
      "End-to-end onboarding work that improved Day-7 retention from 12% to 25%, using funnel analysis, experimentation, and behavioral segmentation.",
    href: "#metrics",
    tags: ["Growth", "Activation", "Experimentation"],
  },
  {
    index: "03",
    domain: "AI Product · Independent build",
    title: "AI Learner Diagnostic",
    summary:
      "A self-built AI PM portfolio product: diagnose skill gaps, generate a learning path, evaluate outputs, and design the human-in-the-loop experience.",
    href: "/work/ai-learner-diagnostic",
    tags: ["LLMs", "Evaluation", "Product Design"],
  },
] as const;

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
];

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
