# Nitesh Tiwari — AI Product Manager Portfolio

A recruiter-focused Next.js portfolio for Senior Product Manager / Principal Product Manager opportunities.

## Included
- Editorial homepage ordered proof-first: impact → work → capability map → product thinking → AI lab → experience → contact
- Product Capability Map: capability → evidence → case study graph (stacked accordion on phones); every edge ends at a case study or a documented outcome
- Product thinking: principles, anti-patterns, and "changed my mind" lessons behind accessible tabs, each linked to its evidence
- Illustrative onboarding decision simulator (qualitative only, clearly labelled as not historical performance) inside the Onboarding case study
- "Choose your depth" reading paths for time-boxed readers (30 sec / 5 min / 10 min)
- Evidence labels on every claim: verified outcome, product reasoning, illustrative model, independent prototype
- Data visualizations built only from verified figures (Day-7 retention before/after, reported uplift ranges), each with a table view
- Case studies with a 30-second summary, sticky chapter navigation, reading progress, journey maps, an interactive decision tree, and an experiment loop
- Interactive AI Learner Diagnostic prototype with evidence trace, calibrated confidence, low-confidence fallback, and educator override
- Senior PM / AI PM positioning, direct email (with copy) and LinkedIn CTA
- Accessible, responsive navigation with section tracking; reduced-motion support
- SEO metadata and structured data

## Design system
- Tokens live in `app/globals.css`; data colors are one validated hue in two shades plus a de-emphasis gray.
- Shared primitives (evidence labels, headings, buttons) are in `components/ui.tsx`; charts and diagrams in `components/viz/`.
- Content is data: `content/portfolio.ts`, `content/case-studies.ts`, and `content/thinking.ts`.

## Run locally
```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Production check
```bash
npm run lint
npm run build
```

All professional metrics are based only on verified information supplied for the portfolio. The AI Learner Diagnostic is explicitly an independent prototype and makes no real-user or production-result claims.
