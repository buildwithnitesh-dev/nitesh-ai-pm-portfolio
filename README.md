# Nitesh Tiwari · Senior Product Manager portfolio

A recruiter-first Next.js portfolio positioned as **Senior Product Manager · Growth × Consumer × AI**, with the thesis "Retention is won before the retention metric." It presents about 7 years in product management (since 2019) within 10+ years in technology.

## Included
- Homepage, in the order a hiring manager asks: hero → proof (four measured results) → selected work → same PM, different domains (gaming vs. EdTech evidence) → decisions (short snapshots) → AI product judgment → career → about → contact
- Selected work, ordered by signal, each case on one spine (Signal → Problem → Options → Trade-off → Decision → Experiment / Rollout → Outcome → Learning) with an at-a-glance summary, Back to Work, a breadcrumb, and Previous / All Work / Next in work order:
  - **01 Doubt Resolution** (Edfora · myPAT): three operating models, stakeholder positions, a hybrid piloted behind a 90% accuracy gate; the AI resolver not shipped
  - **02 Witzeal Onboarding**: the activation-vs-retention reframe and a 30/70 controlled rollout, with the bundle's attribution limit shown
  - **03 Adaptive Practice** (Edfora): a 3PL IRT engine, measured as a labelled before/after
  - **04 FanBlaze** (Baazi Games): a live-score feature sunset on usage evidence
- Decisions: a library of shorter calls (signal, decision, trade-off, result); cases with a full write-up link to it
- AI Lab: AI product judgment, and the AI Learner Diagnostic, an independent deterministic prototype with no real users or model results
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
