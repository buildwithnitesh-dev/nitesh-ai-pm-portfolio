# Nitesh Tiwari · Senior Product Manager portfolio

A recruiter-first Next.js portfolio positioned as **Senior Product Manager · Growth × Consumer × AI**, built around one thesis: **"Retention is won before the retention metric."** It presents about 7 years in product management within 10+ years in technology.

## Site structure
- **Home:** hero (role, positioning, thesis, availability line, two labelled results, Explore the work / Resume / LinkedIn) → Selected work → Range (five capabilities, gaming and EdTech) → Decisions → AI → Career → About → Contact.
- **Work** (`/work`): four flagship case studies.
  - **Doubt Resolution** (Edfora, myPAT and Glorifire) at `/work/doubt-resolution`
  - **Onboarding Funnel Redesign** (Witzeal) at `/work/onboarding-funnel-redesign`
  - **Adaptive Practice Engine** (Edfora) at `/work/adaptive-assignment-engine`
  - **Behavioural Loops & Gamification** (Edfora, Glorifire and Stakeholder) at `/work/behavioural-loops`
- **Decisions** (`/decisions`): 11 shorter decision records (D-01 to D-11), each with signal, decision and trade-off; the ones with a full case link to it.
- **About** (`/about`): portrait, How I work (four principles, each linked to its evidence), and Experience.
- **AI Lab** (`/ai-lab`, `/ai-lab/learner-diagnostic`): AI product judgment, and the AI Learner Diagnostic, an independent prototype with a deterministic baseline.
- **Redirects** (permanent): `/work/ai-learner-diagnostic` → `/ai-lab/learner-diagnostic`, `/approach` → `/about#approach`, `/work/behavioral-loops` → `/work/behavioural-loops`.

## Case structure
Each case is a sequence of stages from signal to learning: Signal, Problem or Constraint, Options, Trade-off, Decision, Experiment or Rollout, Outcome, Learning, plus "What I'd do differently" where the case has one. Not every case uses every stage. Stages marked as product reasoning are labelled on the page, separately from the documented record. Cases have Back to Work, a breadcrumb and previous / next navigation.

## Evidence
- **Labels:** every number shown in a figure, an outcome table or a decision result carries one of four labels:
  - **MEASURED:** from a test, a pilot or an audit.
  - **REPORTED:** on record, with the method, window or basis not recorded.
  - **DERIVED:** calculated from other figures, not observed.
  - **OBSERVED:** a before/after or usage reading with no control.
- **Caveats** travel with the number wherever it appears, and figures keep the precision they were reported with.
- **AI:** the professional AI decision is the doubt-resolution case, where an AI auto-resolver was evaluated and not shipped as the first solution. No AI model or LLM result from professional work is claimed.

## Code structure
- **Content is data**, defined once and read by every page, the share image, the sitemap, the structured data and `/llms.txt`:
  - `content/portfolio.ts`: profile, evidence (`deltas`), homepage, decisions, principles, AI Lab, roles, About.
  - `content/cases.ts`: the four case studies.
  - `content/ai-diagnostic.ts`: the AI Learner Diagnostic build spec and evaluation metrics.
  - `content/meta.ts` and `content/site.ts`: page metadata and the site URL.
- **Components:**
  - `components/delta.tsx`: a before → after figure with its method and caveat.
  - `components/proof-label.tsx`: the evidence label.
  - `components/case/`: the case page and its visuals.
  - `components/home/`: the homepage sections, including the hero and its decorative network background (`product-intelligence-network.tsx`).
  - `components/site-header.tsx`: the header, with the About portrait cropped to a circle by CSS.
- **Design tokens** live in `app/globals.css`: Schibsted Grotesk on near-white paper, deep ink and an oxblood accent.

## AI evaluation harness
`evals/learner-diagnostic/` and `scripts/eval-learner-diagnostic.ts` hold the evaluation for a future model-based version of the Learner Diagnostic. **No evaluation has been run, and there are no results.** The 10 cases are synthetic and their labels are drafts until an educator reviews them. The runner needs an `ANTHROPIC_API_KEY` and an explicit model, and refuses to run without them. Details: `evals/learner-diagnostic/README.md`.

## Site URL
Absolute URLs (canonical, Open Graph, sitemap) use `NEXT_PUBLIC_SITE_URL` if set, otherwise `https://buildwithnitesh.com`.

## Run locally
```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Production check
```bash
npx tsc --noEmit
npm run lint
npm run build
```

## CI
Every pull request runs Lighthouse CI (`.github/workflows/lighthouse.yml`, `lighthouserc.json`): lint, build, then 3 mobile runs per route. Performance must score at least 0.95, and accessibility, best practices and SEO must score 1.

All professional metrics come only from the Resume and the source material supplied for the portfolio. The AI Learner Diagnostic is an independent prototype and makes no real-user or production-result claims.
