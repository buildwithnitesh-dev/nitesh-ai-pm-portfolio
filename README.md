# Nitesh Tiwari · Senior Product Manager portfolio

A recruiter-first Next.js portfolio positioned as **Senior Product Manager | Consumer Products, Growth, Monetization & AI**, for Product Manager and Senior Product Manager roles (growth first). It presents about 7 years in product management (since 2019) within 10+ years in technology.

## Included
- Editorial homepage ordered proof first: impact → work → experience → how I work (principles, decision log, capabilities) → AI lab → contact
- Selected work led by growth, plus the AI prototype in the AI lab:
  - **Onboarding Funnel Redesign** (Witzeal, case 01): the activation-vs-retention reframe, the five changes and free-game economics, the 30/70 controlled rollout, and the D0 and Day-7 results
  - **Adaptive Assignment Engine** (Edfora, case 02): the options and how each fails, the 3PL IRT mechanism explained once, and the 2-year before vs. after result
  - **Baazi Games** (03, in brief): the PokerBaazi matchmaking decision and the FanBlaze live-score sunset
  - **AI Learner Diagnostic** (independent prototype, linked from the AI lab): rules vs. model split, failure modes and fallbacks, evaluation rubric, guardrails, launch gate, and a playable deterministic demo
- How I work: six principles, each linked to its evidence; a decision log of six smaller decisions (signal, decision, trade-off, outcome) with progressive disclosure and deep links (`/#decision-<id>`); and a capability index pointing at the case study or decision that shows each one
- Evidence labels on every claim: documented outcome, product reasoning, illustrative model, independent prototype
- Charts built only from documented figures, each with a table view
- Direct Resume PDF download, email (with copy) and LinkedIn
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

All professional metrics come only from the Resume and source material supplied for the portfolio. The AI Learner Diagnostic is an independent prototype and makes no real-user or production-result claims.
