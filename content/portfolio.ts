export const profile = {
  name: "Nitesh Tiwari",
  firstName: "Nitesh",
  role: "Senior Product Manager | AI Product Manager",
  experience: "10+ years",
  domains: ["EdTech", "Gaming", "Consumer Technology"] as const,
  strengths: [
    "Product Strategy",
    "Growth",
    "AI Products",
    "Personalization",
    "Engagement",
    "Retention",
    "Experimentation",
  ] as const,
};

export const seo = {
  title: `${profile.name} — Senior Product Manager & AI Product Manager`,
  description:
    "Senior Product Manager and AI Product Manager with 10+ years across EdTech, Gaming, and Consumer Technology. Product strategy, growth, personalization, engagement, retention, and experimentation.",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#metrics", label: "Impact" },
  { href: "#expertise", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#ai", label: "AI" },
  { href: "#thinking", label: "Thinking" },
  { href: "#contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Senior Product Manager  ·  AI Product Manager",
  headline: "I lead products people return to — and the systems that keep them growing.",
  lede: `${profile.experience} across EdTech, Gaming, and Consumer Technology. I connect product strategy, growth, and AI so personalization, engagement, and retention are designed outcomes — then proven through experimentation.`,
  primaryCta: { href: "#work", label: "See selected work" },
  secondaryCta: { href: "#contact", label: "Start a conversation" },
};

export const about = {
  eyebrow: "About",
  title: "Senior Product Manager · AI Product Manager",
  body: "Over 10+ years, I have led products across EdTech, Gaming, and Consumer Technology — always with the same focus: design outcomes that people return to, then prove them with data. I work at the intersection of product strategy, growth systems, and AI, building personalization, engagement, and retention into the product surface rather than bolting them on after launch.",
  highlights: [
    "10+ years across EdTech, Gaming, and Consumer Technology",
    "Impacted 100,000+ learners through adaptive learning and engagement systems",
    "Improved assignment completion by approximately 18–25% through adaptive assignment design",
    "Improved Day-7 retention from 12% to 25% through gaming onboarding redesign",
    "Increased DAU by approximately 12–15% through quiz and gamification experiences",
    "Increased session time by approximately 15%",
    "Improved student retention by approximately 8–12% through faculty engagement dashboards",
    "Increased GMV approximately 10% week-over-week through A/B testing and user segmentation",
    "Reduced bonus expenditure approximately 20% while maintaining retention",
  ],
};

export const metrics = [
  {
    value: "100K+",
    label: "Learners impacted",
    detail: "Built and improved learning experiences used by 100,000+ learners across engagement, personalization, and adaptive learning journeys.",
  },
  {
    value: "18–25%",
    label: "Assignment completion uplift",
    detail: "Improved assignment completion by approximately 18–25% through an adaptive assignment experience designed around learner behavior.",
  },
  {
    value: "12% → 25%",
    label: "Day-7 retention",
    detail: "Improved Day-7 retention from 12% to 25% through an end-to-end redesign of the gaming onboarding funnel.",
  },
  {
    value: "12–15%",
    label: "DAU growth",
    detail: "Increased daily active users by approximately 12–15% through quiz and gamification experiences.",
  },
  {
    value: "+15%",
    label: "Session time increase",
    detail: "Increased session time by approximately 15% through engagement and personalization improvements.",
  },
  {
    value: "8–12%",
    label: "Student retention improvement",
    detail: "Improved student retention by approximately 8–12% through faculty engagement dashboards.",
  },
  {
    value: "+10% WoW",
    label: "GMV growth",
    detail: "Increased GMV approximately 10% week-over-week through A/B testing and user segmentation.",
  },
  {
    value: "~20%",
    label: "Bonus expenditure reduction",
    detail: "Reduced bonus expenditure approximately 20% while maintaining retention through targeted incentives.",
  },
];

export const signals = [
  {
    value: "100K+",
    label: "Learners impacted",
    detail:
      "Built and improved learning experiences used by 100,000+ learners across engagement, personalization, and adaptive learning journeys.",
  },
  {
    value: "18–25%",
    label: "Completion uplift",
    detail:
      "Improved assignment completion by approximately 18–25% through an adaptive assignment experience designed around learner behavior.",
  },
  {
    value: "12% → 25%",
    label: "Day-7 retention",
    detail:
      "Improved Day-7 retention from 12% to 25% through an end-to-end redesign of the gaming onboarding funnel.",
  },
  {
    value: "12–15%",
    label: "DAU growth",
    detail:
      "Increased daily active users by approximately 12–15% through quiz and gamification experiences.",
  },
] as const;

export const expertise = [
  {
    title: "Product strategy",
    body: "Clarify the user, the market motion, and the few bets that matter. Translate ambition into a sequence teams can actually ship.",
  },
  {
    title: "Growth systems",
    body: "Treat acquisition, activation, and expansion as a product surface — not a campaign calendar. Design loops, not one-off spikes.",
  },
  {
    title: "AI products",
    body: "Put intelligence where it changes a decision or a habit. Scope the job to be done, the failure modes, and the human remaining in the loop.",
  },
  {
    title: "Personalization",
    body: "Make the next experience feel chosen for the person in front of you — relevant enough to trust, restrained enough not to feel extracted.",
  },
  {
    title: "Engagement & retention",
    body: "Build reasons to return that survive novelty. Habit, progress, social proof, and well-timed friction — measured over weeks, not days.",
  },
  {
    title: "Experimentation",
    body: "Turn opinions into tests. Protect the metric that represents real value, then let evidence retire the rest of the roadmap.",
  },
] as const;

export const caseStudies = [
  {
    index: "01",
    domain: "EdTech",
    title: "Learning products that keep people progressing",
    summary:
      "Education products fail when motivation is assumed. I focus on the path from first session to lasting progress: clearer jobs-to-be-done, personalization that reduces overwhelm, and engagement designed around learning — not empty streaks.",
    focus: ["Product strategy", "Personalization", "Engagement"],
  },
  {
    index: "02",
    domain: "Gaming",
    title: "Attention is rented. Retention has to be earned.",
    summary:
      "Interactive entertainment competes in the hardest attention market. I work the craft of session quality, live engagement, and long-horizon retention — using experimentation to separate what players actually repeat from what merely looks exciting.",
    focus: ["Engagement", "Retention", "Experimentation"],
  },
  {
    index: "03",
    domain: "Consumer Technology",
    title: "AI that feels useful in everyday products",
    summary:
      "Consumer products live or die on habit. I look for where AI and personalization change a real moment — discovery, decision, or follow-through — then grow that moment with discipline instead of bolting on features.",
    focus: ["AI products", "Growth", "Personalization"],
  },
] as const;

export const experience = [
  {
    period: "Decade+",
    title: "Product leadership across three consumer domains",
    body: "A through-line of shipping for real users: framing the problem, choosing the bet, aligning design and engineering, and staying with the product after launch — when engagement and retention tell the truth.",
  },
  {
    period: "EdTech",
    title: "Progress, not just activity",
    body: "Building for learners means designing for uneven motivation and high drop-off. Strategy here is about the next meaningful step, not more content for its own sake.",
  },
  {
    period: "Gaming",
    title: "Live products, restless users",
    body: "Gaming sharpens instincts for session value, systems thinking, and experimentation under competition. What players do on day 30 matters more than what they notice on day one.",
  },
  {
    period: "Consumer & AI",
    title: "Intelligence as a product surface",
    body: "Consumer technology plus AI is a judgment problem: where models help, where they harm trust, and how personalization stays in service of the person’s goal.",
  },
] as const;

export const aiCapabilities = [
  {
    title: "Problem first, model second",
    body: "Start with the decision, workflow, or habit that should change. Only then choose data, models, and UX. AI is in the product because it earns its place.",
  },
  {
    title: "Experience design for uncertainty",
    body: "Probabilistic systems need honest empty states, recoverable errors, and controls people understand. Trust is part of the product spec.",
  },
  {
    title: "Personalization with restraint",
    body: "Use signals to reduce effort and increase relevance. Draw a bright line between helpful adaptation and manipulation.",
  },
  {
    title: "Evaluation as a product practice",
    body: "Pair offline quality checks with online experimentation. Define what good looks like before shipping intelligence into the loop.",
  },
] as const;

export const philosophy = [
  {
    title: "Strategy is a sequence of choices",
    body: "If everything is a priority, nothing is. I make the tradeoffs visible: who we serve, what we will not build, and which metric represents value.",
  },
  {
    title: "Growth is a product, not a department",
    body: "Sustainable growth lives in the experience — activation, habit, and expansion — then in the experiments that keep that system honest.",
  },
  {
    title: "Ship to learn, not to decorate the roadmap",
    body: "A release is a question. Instrumentation, qualitative signal, and the courage to kill a bet are how senior product work compounds.",
  },
] as const;

export const contact = {
  eyebrow: "Let’s talk",
  title: "Open to conversations with product leaders, founders, and hiring teams.",
  body: "If you are building in EdTech, gaming, consumer technology, or AI-native products — and you need senior product leadership that can hold strategy, growth, and intelligence together — I would like to hear about the problem.",
  note: "Preferred contact details can be added here when you are ready to publish them. Until then, this page is the brief.",
};

export const footer = {
  credit: `${profile.name}`,
  line: "Senior Product Manager  ·  AI Product Manager",
};