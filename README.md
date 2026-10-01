# Nitesh Tiwari · Senior Product Manager portfolio

A recruiter-first Next.js portfolio for Product Manager and Senior Product Manager roles in Growth, Consumer, and AI & Data products. It presents about 7 years in product management (since 2019) within 10+ years in technology.

## Included
- Editorial homepage ordered proof first: impact → work → experience → decision log → capability map → product thinking → AI lab → contact
- Three case studies, each told in its own shape:
  - **Adaptive Assignment Engine** (Edfora): the 3PL IRT mechanism (learner ability θ vs. question difficulty, discrimination and guessing), the documented practice flow and edge cases, the options and how each fails, an interactive decision trace, and the documented outcome
  - **Onboarding Funnel Redesign** (Witzeal): the retention-vs-activation reframe, the first-session journey, the documented before → after onboarding changes, an illustrative decision simulator, the 30/70 controlled rollout, and the documented control vs. treatment result
  - **AI Learner Diagnostic** (independent prototype): rules vs. model split, failure modes and fallbacks, evaluation rubric, guardrails, launch gate, and a playable deterministic demo
- Decision log under the case studies: six smaller decisions (signal, decision, trade-off, outcome) with progressive disclosure and deep links (`/#decision-<id>`)
- Product Capability Map: capability → evidence → case study or decision; every edge ends at something on the site
- Product thinking: principles, anti-patterns and "what I watch for" lessons, each linked to its evidence
- Evidence labels on every claim: documented outcome, product reasoning, illustrative model, independent prototype
- Charts built only from documented figures, each with a table view
- Direct résumé PDF download, email (with copy) and LinkedIn
- Accessible, responsive navigation with section tracking; reduced-motion support
- SEO: title template, per-page canonical and Open Graph metadata, generated share image, sitemap, robots, Person structured data, and `/llms.txt`

## Design system
- Tokens live in `app/globals.css`; data colors are one validated hue in two shades plus a de-emphasis gray.
- Shared primitives (evidence labels, headings, buttons) are in `components/ui.tsx`; charts and diagrams in `components/viz/`.
- Content is data: `content/portfolio.ts` (profile, metrics, decisions, capabilities, career), `content/case-studies.ts`, and `content/thinking.ts`.

## Site URL
Absolute URLs (canonical, Open Graph, sitemap) use `NEXT_PUBLIC_SITE_URL` if set, otherwise Vercel's production URL, which Vercel provides automatically. Set `NEXT_PUBLIC_SITE_URL` once a custom domain is live.

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

All professional metrics come only from the résumé and source material supplied for the portfolio. The AI Learner Diagnostic is an independent prototype and makes no real-user or production-result claims.
