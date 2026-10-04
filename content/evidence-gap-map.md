# Evidence gap map

Every important claim on the portfolio, traced to its source. Nothing here is
new evidence: blank or unknown fields stay unknown, and anything that needs a
fact only Nitesh has is marked **NEEDS_USER_INPUT**.

**Sources**
- **R**: résumé PDF (`public/Nitesh_Product_Manager_Resume.pdf`, frozen)
- **M**: pre-rebuild site content on `main` at `66f8291` (`content/portfolio.ts`, `content/case-studies.ts`, `public/llms.txt`)
- **C**: current canonical content (`content/portfolio.ts`, `content/cases.ts`, `content/ai-diagnostic.ts`)
- **U**: evidence supplied by Nitesh on 2026-10-03, describing Edfora platform screens
- **V**: evidence supplied by Nitesh on 2026-10-03 (second supply), the myPAT doubt-resolution decision

**Classes:** VERIFIED (documented fact, no comparison involved) · CONTEXTUAL (scale or setting, not an outcome) · BEFORE_AFTER · EXPERIMENTAL (concurrent control) · DIRECTIONAL (direction documented, magnitude or method thin) · UNKNOWN (method or definition absent) · NEEDS_USER_INPUT

---

## 1. Witzeal: Onboarding Funnel Redesign (flagship)

### 1.1 Day-7 retention 12.2% → 25.4%
| Field | Value |
|---|---|
| Source | M (case-studies, metrics, impact), C. R rounds it: "D7 retention went from 12% to 25%". |
| Definition | "Day-7 retention". **Denominator not recorded** (all signups? users who played on D0? active on day 7 or by day 7?). |
| Baseline | 12.2% (control arm) |
| Comparison | Control 30% vs treatment 70%, concurrent |
| Method | Controlled rollout · ~50K users · 3 weeks |
| Attribution | Bundle of five changes, including a ₹15 free-game incentive; no single change isolated |
| Limitation | Statistical significance not recorded. D7 maturity for late cohorts in a 3-week window not recorded. Randomization unit not recorded. |
| Current wording | "Day-7 retention 12.2% → 25.4% · 30/70 controlled rollout · ~50K users · 3 weeks" |
| Risk | High: the strongest number on the site has no definition; the incentive bundled in it undercuts the thesis if left unaddressed |
| Class | **EXPERIMENTAL** (definition and significance: **NEEDS_USER_INPUT**) |
| Treatment | Keep. Show "Definition not captured in the original experiment record" until supplied. Add the bundle/attribution limitation beside the number. Never add a significance claim. |

### 1.2 D0 gameplay 12% → 33%
| Field | Value |
|---|---|
| Source | M, C. Not on R. |
| Definition | "Share of new users who played a game on their first day" (M) |
| Baseline | 12%, the pre-redesign signal |
| Comparison | **Sources conflict.** M's metric list says "before and after the redesign". M's case lists the D0 result among the controlled rollout's documented results, and its measurement plan reads "D0 gameplay and Day-7 retention, treatment against a control". Whether 33% was the treatment arm against a concurrent control, or a post-launch level against the pre-period, is not recorded. |
| Method | Unknown (see above) |
| Attribution | Same bundle as 1.1 |
| Limitation | Comparison type unresolved |
| Current wording | Method label: "before vs. after" (inherited from M's metric list) |
| Risk | High: shown in the same result panel as an experiment while labelled a before/after |
| Class | **NEEDS_USER_INPUT** (comparison type) |
| Treatment | Label it explicitly: "Comparison type not recorded: 12% is the pre-redesign baseline; whether 33% was measured against the concurrent control isn't in the record." Show it visually separate from the controlled D7 result. |

### 1.3 +13.2 percentage points
| Source | Derived from 1.1 (25.4 − 12.2) · **Class:** EXPERIMENTAL (arithmetic) · **Treatment:** keep, as absolute points. Never convert to a relative "+108%". |
|---|---|

### 1.4 Rollout design: 30/70, ~50K users, ~3 weeks
| Source | M (listed as documented), C · **Class:** VERIFIED · **Treatment:** keep. Randomization unit, assignment method and exposure definition: NEEDS_USER_INPUT, shown as "not recorded". |
|---|---|

### 1.5 The five changes
Simplified signup/login · email fetched automatically · OTP auto-read · first 3 games free · live gameplay tutorial.
| Source | M, C · **Class:** VERIFIED · **Treatment:** keep. Group them honestly in the isolation matrix: friction (signup/login, email, OTP) vs incentive (free games) vs guidance (tutorial). |
|---|---|

### 1.6 Free-game economics: ₹15 bonus (₹5 × first 3 games), ₹20 minimum first deposit, 5+ game-play goal
| Field | Value |
|---|---|
| Source | M, C |
| Class | VERIFIED (design parameters, not outcomes) |
| Missing | Deposit conversion, NGR or cost per retained user: **not measured in the original analysis** (M says "No deposit-conversion result is claimed") |
| Risk | High: the thesis says "fix the product before reaching for incentives" |
| Treatment | Keep, and name the tension directly: "One thing the test could not isolate". State that the business outcome was not measured. |

### 1.7 Diagnosis: loss before the first game (funnel + OTP API success/failure rates + delivery time)
| Field | Value |
|---|---|
| Source | M, C. R words it differently: "Traced most onboarding drop-off to before a user's second session … redesigned the first 60 seconds". |
| Class | VERIFIED (that the analysis was done); the step-level drop-off numbers and OTP rates are **not in any source** |
| Treatment | Keep the qualitative diagnosis. Do not draw a funnel with numbers. Restore "first 60 seconds" (M and R both use it). |

### 1.8 "Positive direction continued into M0; later figures aren't available"
| Source | M, C · **Class:** DIRECTIONAL · **Treatment:** keep as written. |
|---|---|

### 1.9 "I owned growth, onboarding, monetization and lifecycle" / "the strategy, the funnel analysis …"
| Source | C (from M; R: "Owned lifecycle messaging") · **Class:** CONTEXTUAL (self-reported scope) · **Risk:** "strategy" asserted without a strategic choice · **Treatment:** describe what was decided (the activation reading over the retention reading) instead of the word "strategy". |
|---|---|

### 1.10 "No user interviews behind this case"
| Source | C · **Class:** VERIFIED (absence stated) · **Treatment:** keep. It is honest and pre-empts the question. |
|---|---|

---

## 2. Edfora: Adaptive Assignment Engine (flagship)

### 2.1 Assignment completion 18% → 45%
| Field | Value |
|---|---|
| Source | M, C, R ("increased from 18% to 45%"; R does not carry the caveat) |
| Definition | **Not recorded** (per assignment started? per assigned? per learner?) |
| Baseline | 18% under the static learning path |
| Comparison | After the adaptive system was introduced |
| Method | 2-year academic-cycle dataset, before/after |
| Attribution | Not attributed to the adaptive system alone: concurrent changes are not on record |
| Limitation | No holdout. Cohort mix may differ across years. **No learning-outcome (mastery) metric.** Difficulty actually served is not recorded, so "completion rose because questions got easier" can't be ruled out. |
| Class | **BEFORE_AFTER** (definition: NEEDS_USER_INPUT) |
| Treatment | Keep, with the definition placeholder and the existing caveat. Add: "Completion was the measured outcome; learning mastery was not captured in this analysis." |

### 2.2 "Practice drop-offs also reduced" (R: "fewer students dropped off mid-practice")
| Class | DIRECTIONAL (no magnitude) · **Treatment:** keep as text, no visual. |
|---|---|

### 2.3 "Low assignment completion was a key driver of learner drop-off"
| Source | R, M, C · **Class:** UNKNOWN (the analysis behind "key driver" isn't recorded) · **Treatment:** keep as the stated diagnosis, framed as the reading he made, not a proven causal link. |
|---|---|

### 2.4 Team: 1 PM (me), 1 APM, 1 designer, 5–7 engineers, 2–3 academic leads
| Source | M, C · **Class:** VERIFIED · **Treatment:** keep. It is the clearest scope signal on the site. **Do not** describe the APM as a direct report (not recorded). |
|---|---|

### 2.5 3PL IRT system: θ per concept, difficulty/discrimination/guessing, update after each response; edge cases (no history, missing parameters, ties)
| Field | Value |
|---|---|
| Source | M, C |
| Class | VERIFIED (design) |
| Missing | How the item parameters were calibrated, and on what response volume; how cold start was actually handled; teacher controls over the engine. **NEEDS_USER_INPUT.** |
| Treatment | Show cold start as a named problem with "handling not recorded" unless supplied. Do not invent a teacher-control feature. |

### 2.6 100K+ learners
| Source | R ("reaching 100K+ users"), M, C · **Definition:** reach of Edfora's learning and engagement products overall; not active users; not engine-specific · **Class:** CONTEXTUAL · **Treatment:** keep the scope note wherever it appears. |
|---|---|

### 2.7 "Regular interviews and usability tests with students and faculty … fed a RICE-based roadmap; 5+ features shipped"
| Field | Value |
|---|---|
| Source | R, M, C (About) |
| Class | CONTEXTUAL (the practice is documented; no specific finding is) |
| Treatment | Can be surfaced as how the Edfora roadmap was prioritized. **Not** as a user insight for the adaptive engine: no finding is recorded. |

### 2.8 Edfora title: R says "Senior Product Manager | Growth & AI"; M and C say "Senior Product Manager"
| Class | NEEDS_USER_INPUT (is "Growth & AI" part of the official title?) · **Treatment:** keep "Senior Product Manager" until confirmed. The site must not imply AI work at Edfora beyond the IRT engine, which is statistical. |
|---|---|

### 2.9 Edfora behavioural loops across students and faculty (decision D-10)
| Field | Value |
|---|---|
| Source | U |
| What it is | Product-system evidence. Students: points, streaks, badges, avatars, Hall of Fame, leaderboards. Faculty: analytics, leaderboards, configurable behaviour-based actionable items. "Confirmation of myPlan Accuracy": system-generated myPlan information → faculty verification → Correct / Incorrect feedback → 100 points for accurate feedback. |
| Outcome | None recorded for this system. The DAU ~12–15% result (3.11) belongs to the quiz and gamification layer as reported on the résumé; whether that layer is the same system isn't recorded. |
| Class | VERIFIED (that the system exists, per U); no outcome |
| Treatment | Shown as a "System" decision card framed as a behavioural feedback/reinforcement loop. No engagement or accuracy result attributed. myPlan is not described as AI, and is not linked to the 3PL IRT engine (the relationship isn't recorded). |

---

## 3. Decision library and role highlights

| # | Claim | Source | Definition / window / baseline / method | Attribution | Class | Treatment |
|---|---|---|---|---|---|---|
| 3.1 | Bonus & discount spend ~20% ↓, "retention held" | R ("Cut … 20%; retention held steady"), M, C | No window, no base, "held" undefined | Allocation change (flat tiers → expected ROI per segment) | DIRECTIONAL | Keep as text with a DIRECTIONAL tag. Remove the indexed 100→80 bar (false precision). State the objective (incremental NGR per rupee) and that **the NGR outcome was not measured in the record**. |
| 3.2 | GMV ~10% WoW, sustained over 11 months | R ("Drove GMV growth to 10% week-over-week"), M (adds "11 months") | No base; window 11 months (M) | Not attributed to testing alone (M, C). R's "Drove" is stronger than M and C. | DIRECTIONAL | Demote from any number treatment; text only, with "no starting GMV recorded". Taken literally, 10% WoW over ~47 weeks compounds to ~88×; NEEDS_USER_INPUT (base, or whether it was a peak rate rather than a sustained average). |
| 3.3 | 20+ A/B tests, end to end (hypothesis, sample size, significance) | R, M, C | Count | — | VERIFIED (self-reported count) | Keep. |
| 3.4 | "Core funnel conversion up ~15% across the tests" | R ("together improved … 15%"), M, C | Aggregated across tests; method of aggregation not recorded | — | UNKNOWN | Removed from the site entirely (results, notes and role highlights): the aggregation isn't defined by any source. Remains on the frozen résumé. |
| 3.5 | "A fair number came back inconclusive or negative" | R, M, C | — | — | VERIFIED (qualitative) | Keep; it is a seniority signal. |
| 3.6 | Segmented journeys: session duration ~35% ↑, retention ~25% ↑ | R, M, C | Method, window, relative vs absolute: not recorded | Behavioral clustering redesign | UNKNOWN | Text only, with "method not recorded". |
| 3.7 | Fraud losses ~18% ↓ (rules-based anomaly detection) | R ("protecting net revenue margin"), M, C | Base, window, false-positive rate: not recorded | — | UNKNOWN | Text only. Can be used as the fraud → loss → margin chain in words (R supports the margin link qualitatively). |
| 3.8 | Lifecycle: long-term retention "stabilized at 48%" | R, M, C | Horizon and definition: not recorded. A level, not an uplift (M). | Segmented cohorts | UNKNOWN | Text only, with "definition not recorded". |
| 3.9 | FanBlaze: <6% of active match-day users used live scores; sessions ~2 min longer; no meaningful uplift in contest joins, lineup changes or re-deposits | M, C | Observational usage after launch | Feature-level | VERIFIED (observational) | Keep. This is the most complete evidence chain in the library. |
| 3.10 | PokerBaazi: peak server latency <60 ms; lower D1 bankruptcy rate; net revenue kept growing alongside higher D30 retention | M, C | Latency is an operational figure. The others have no magnitude. | — | Latency VERIFIED; others DIRECTIONAL | Keep latency. Mark the others DIRECTIONAL. |
| 3.11 | Edfora DAU ~12–15% ↑, session ~15% ↑ after a two-month plateau | R, M, C | Implied before/after; window not recorded | Quiz/gamification layer | DIRECTIONAL | Text with "before/after, window not recorded". |
| 3.12 | Edfora student retention ~8–12% ↑ after real-time dashboards | R ("as a result"), M, C | Definition, method: not recorded | Dashboards (myAdvisor explicitly excluded) | UNKNOWN | Text only; keep the myAdvisor exclusion note. |
| 3.13 | myAdvisor alert design (priorities, module-level, timing around the teacher's schedule) | M | Product documentation, no outcome | — | CONTEXTUAL | Can enrich D-08 as design depth; no outcome claimed. |
| 3.14 | PwC: release process for a web app deployed to 150+ Fortune companies; 4 distributed teams; UX A/B tests lifted client engagement ~25%; introduced agile ceremonies | R, M, C | 25%: method not recorded | — | 150+ / 4 teams CONTEXTUAL; 25% UNKNOWN | Keep the scope; text-only for 25%. |
| 3.15 | Direct Create: crash rate ~30% ↓; 4.6+ Play Store rating; 400+ maker shops, 100+ designers | R, M, C | Operational figures | Platform scale is context, not a result (C) | DIRECTIONAL / CONTEXTUAL | Keep as is. |

---

## 4. Identity, seniority, availability

| # | Claim | Source | Class | Treatment |
|---|---|---|---|---|
| 4.1 | ~7 years product management, 10+ years technology | R | VERIFIED | Keep. |
| 4.2 | "Making the prioritization call when [Engineering, Design, Analytics, Business] didn't agree on what came first" | R (summary) | CONTEXTUAL: a general statement; **no specific instance is recorded** | Do not build a stakeholder story from it. A specific story is NEEDS_USER_INPUT. |
| 4.3 | RICE/ICE prioritization, RICE-based roadmap at Edfora | R, M, C | CONTEXTUAL | Surface as the Edfora prioritization method only. No invented roadmap items. |
| 4.4 | SQL, event schema design, LTV:CAC, revenue forecasting, pricing strategy (R competencies) | R | UNKNOWN (no case evidence) | Do not surface as claims. |
| 4.5 | Current status: Edfora ends Jul 2026; current availability | R | **NEEDS_USER_INPUT** | Placeholder only. Do not state "available" or "open to work" beyond the existing "Open to Senior Product Manager and Product Manager roles". |
| 4.6 | Certifications (Jul 2026): Becoming an AI-First Product Leader; Generative AI for Product Managers; Data-Driven Product Management (LinkedIn Learning) | R | VERIFIED | Optional: list factually in About. Never present as AI experience. |
| 4.7 | Photo | To be supplied by Nitesh | About only | Authentic photo, cropped ~4:5, no retouching or generated face; not on the homepage hero, never a circular avatar. Renders only once the file is at `public/about/nitesh-portrait.jpg`. |

---

## 5. AI Learner Diagnostic

| # | Claim | Source | Class | Treatment |
|---|---|---|---|---|
| 5.1 | Independent prototype, deterministic demo, no real users, no model results | M, C | VERIFIED | Keep, verbatim, wherever the build is shown. |
| 5.2 | Rules/model/teacher split; six failure modes; six evaluation criteria; launch gate | M, C | VERIFIED (design artifacts) | Keep. Label each as DESIGNED. |
| 5.3 | Model decision, prompts, RAG/context, evaluation dataset, latency and cost budgets, monitoring | — | Partly built | Status tags on the site: IMPLEMENTED (baseline, override, output schema, evaluation harness), DESIGNED, PLANNED (model decision, retrieval, monitoring, model-based diagnosis), NEEDS INPUT (educator label review, latency and cost budgets, API access). |
| 5.4 | Any evaluation result | — | None exists | Never shown until a real run produces it. |
| 5.5 | Edfora adaptive engine as "AI" | C | Correctly scoped: statistical (3PL IRT), not an LLM | Keep the existing professional-context note. |
| 5.6 | Tools: "OpenAI API", "Prompt engineering" | R | CONTEXTUAL (listed skills, no artifact) | Do not surface as evidence. |

---

## 6. Summary of NEEDS_USER_INPUT

1. D7 retention: denominator / definition; statistical significance (if it was computed); randomization unit.
2. D0 gameplay: was 33% measured in the treatment arm against the concurrent control, or as a post-launch level against the pre-period?
3. Witzeal: was deposit conversion, NGR or cost per retained user measured for the redesign? (If not, the site says "not measured".)
4. Bonus allocation: was incremental NGR per rupee measured? What did "retention held" mean, and over what window?
5. GMV: starting base, or confirmation that ~10% WoW was a sustained average across 11 months.
6. Edfora: completion definition; how 3PL parameters were calibrated; how cold start was handled; any teacher-facing control.
7. Edfora title: is "Growth & AI" part of the official title?
8. Current availability after Jul 2026.
9. Any specific, documentable stakeholder disagreement or prioritization decision (PM era).
10. AI Diagnostic v2: latency and cost budget targets; who authors or validates gold labels for evaluation cases (an educator).

---

## 7. Edfora evidence audit (2026-10-03)

What was actually available in this project. "PRD (text)" means the content was relayed in the conversation; the file itself is not in the repository.

| Item | Evidence available | Problem it demonstrates | Capability | Where | Safe claim | Can't claim | Class |
|---|---|---|---|---|---|---|---|
| Adaptive Practice PRD (3PL IRT) | PRD (text): θ per concept from historical performance; 3PL b/a/c; P(θ) selection near current ability; correct → harder, incorrect → easier; discrimination prioritizes comparable candidates; concept selection; full loop; inputs (raw student data, 3PL parameters, content IDs); edge cases (initial ability, missing parameters, same median P(θ)); code examples | A fixed sequence gives poor difficulty fit | Personalization; systems thinking; translating learning requirements into product logic | Flagship case 02 | The loop, selection rule, inputs and edge cases as specified | That it is an LLM or AI model; how initial ability is estimated; calibration method; learning outcomes | **A** |
| Adaptive outcome 18% → 45% | User correction (supersedes "18–25%"); R | Completion on the static path vs after | Measuring a product change honestly | Case 02, hero-adjacent cards, share card | 18% → 45%, before/after, 2-year academic-cycle dataset, not attributed to the engine alone | Causality; mastery; significance | **A** |
| Team and scope | User brief, M | — | Scope signal | Case 02 context | 1 PM (me), 1 APM, 1 designer, 5–7 engineers, 2–3 academic leads | APM as a direct report | **A** |
| myAdvisor | Feature list from the original brief and M: high/medium alerts, module-level alerting, history, module/date filters, deep links, schedule-aware timing, unread handling | Signals arrive too late or too broadly for a teacher to act | Turning data into action; attention design | Decision D-08 | Documented design; dashboards' retention result is separate | Any usage or outcome for myAdvisor | **C** |
| Real-time faculty dashboards | R, M | Monthly spreadsheet lag | Data product | D-08 | Retention ~8–12% after dashboards (method not captured) | Method, definition | **C** |
| myPlan accuracy confirmation | U: system-generated myPlan → faculty verification → Correct/Incorrect → 100 points | Keeping a system's plan checked by a person | Behavioural feedback loop design | D-10 | The loop as described | AI impact; plan accuracy; participation rates | **C** |
| Glorifire student platform | U: points, streaks, badges, avatars, Hall of Fame, leaderboards | Engagement mechanics for learners | Behavioural loops | D-10 | The system's components | Engagement or business outcome from screens alone | **C** |
| Glorifire faculty/stakeholder platform | U: analytics, leaderboards, configurable behaviour-based actions | Faculty tooling around the same loop | Stakeholder tooling | D-10 | The components | Outcomes | **C** |
| Quiz and gamification layer | R, M: teachers found prototypes "too game-y"; DAU ~12–15%, session ~15% | Engagement vs teacher credibility | Trade-off judgment | D-09 | The tension and the directional result | That D-09's result came from the D-10 system (relationship not recorded) | **C** |
| Assignment Reattempt | Never supplied in this session (Figma not accessible) | — | — | — | — | Anything | **NEEDS INPUT** (D until reviewed) |
| Other product documentation areas (AI Chatbot, Alerts and Escalation, Analytics, Research, Product Planning, VOD Analytics, Author Platform, Content Improvement) | Names only, from the original brief | — | Breadth | — | — | Any detail; "AI Chatbot" is ambiguous and must not imply LLM work | **D** |
| Interviews and usability tests → RICE roadmap; 5+ features | R, M | — | Prioritization practice | Case 02 context | The practice | Any specific finding or prioritization decision | **B** |

**Decision on a second featured story:** Edfora personalization already is the second featured story (case 02), and the PRD supports it as a system story. The engagement evidence (myPlan loop, Glorifire, myAdvisor) is product-system design without outcomes, so it stays in the Decision Library rather than becoming another case.

---

## 8. myPAT doubt-resolution decision (D-01)

| Claim | Source | Definition / method | Class | Treatment |
|---|---|---|---|---|
| Turnaround approached ~24 h at peak exam preparation | V | Pre-change condition | VERIFIED (as supplied) | Signal stage; "before" of the delta |
| Median TAT <15 min | V | Median timestamp delta, `doubt_created` → `first_qualifying_resolution_event` | VERIFIED (measured) | Delta on D-01 and the homepage Prioritization proof row; always "median" |
| D14 return rate ~18% higher than holdout | V | Pilot A/B holdout: instant-hint access vs. standard response queue | EXPERIMENTAL | Relative wording only (no percentage points); not attributed to one component; no significance claimed |
| ~60% support-cost avoidance | V | Modeled: avoided paid SME/faculty headcount against projected ticket-volume growth | MODELED | Always "modeled support-cost avoidance"; never a cost or budget reduction |
| ~70% repetitive / pattern-matching doubts | V | Initial sample tagging of logged tickets and question-ID overlap; sample size not supplied | DIRECTIONAL (sample-derived) | Always "approximate, sample-derived"; never an automated classifier |
| Stakeholder positions, options, RICE + unit economics, guardrails, 1,000-student pilot, 90% circuit-breaker with rollback | V | — | VERIFIED (as supplied) | Decision stages; AI described only as an option considered |
| Role on this decision | Resolved by Nitesh (2026-10-03): myPAT is an Edfora product, not an employment context | Senior Product Manager · Edfora, Jul 2023 – Jul 2026 | VERIFIED | Role "Senior Product Manager"; product "myPAT · Doubt resolution" |

---

## 9. Edfora product hierarchy (resolved 2026-10-03)

Edfora is the employer; the role is Senior Product Manager (Jul 2023 – Jul 2026). Products and systems worked on, as supplied: myPAT, Glorifire, Stakeholder, Glorifire Ops, Adaptive Practice / Adaptive Assignment, myAdvisor, myPlan. They appear as product context on decisions and in the Edfora role summary. No relationships between them are described beyond what was supplied (for example, the faculty dashboards in D-08 are not assigned to a product, and Adaptive Practice is not placed inside myPAT).

---

## 10. Finalization pass (2026-10-03)

| Claim | Treatment | Why |
|---|---|---|
| "About 65% of new users did not play a game on D0" (production site only) | Not used anywhere in the preview. D0 is "12% of new users played a game on day one" everywhere; D7 is "12.2%". The "~12%" shorthand is gone. | Contradicts the documented 12% D0 baseline (88% did not play). No new number invented. |
| GMV ~10% WoW over 11 months | Removed from the site (D-06 result, Witzeal role highlight). D-06 now states no outcome is attributed. | No baseline, comparison, attribution, or whether it is an average or a sustained rate. |
| Long-term retention "stabilized at 48%" | Removed. | Horizon and definition not recorded; a level, not an uplift. |
| Student retention +8–12% (faculty dashboards) | Removed from D-08 and the Edfora role. | No unit, comparison or method. |
| "Practice drop-offs also reduced" | Removed. | No magnitude or method. |
| PokerBaazi: lower D1 bankruptcy; net revenue kept growing; <60 ms latency | Removed from D-05; a note says why. | No magnitude; latency is an infrastructure figure with unrecorded ownership. |
| PwC: "150+ Fortune companies"; client engagement ~25% | Removed; the release work is described without the ambiguous count. | Ambiguous wording; 25% has no method. |
| "OpenAI API", "Prompt engineering" | Removed from the tool list. | No artifact behind them; no production LLM claim is made. |
| 100K+ learners | Always "on products that reach 100K+ learners". | Product reach, not personal attribution. |
| Doubt resolution: median TAT, D14, ~60% | Promoted to a flagship case (/work/doubt-resolution). Median always stated; D14 always "relative"; ~60% always "modeled", "not an observed budget reduction". The hybrid is attributed to "Product & growth", not to Nitesh personally. | As supplied in §8. |
| ~20% bonus spend (retention held), ~18% fraud losses | Promoted: ~20% in the hero proof; ~18% in "Same PM. Different domains." Both keep their basis (directional / method not captured). | Business evidence, with caveats. |

---

## 11. Behavioural loops case and story architecture (2026-10-03)

| Item | Treatment | Why |
|---|---|---|
| Behavioural loops / gamification | Promoted to flagship case 04 (/work/behavioural-loops). The system itself is the evidence: configurable actionable items → points, streaks, badges → avatars, rank and level → leaderboards, Hall of Fame → analytics; student and faculty/stakeholder workflows; the myPlan accuracy loop (100 points). | As supplied (U) and in this round's brief. |
| Screenshots | None exist in the repository, so none are shown; the system is drawn in the site's own visual language and the case says screens aren't reproduced. | No manufactured UI. |
| Signal: DAU flat two months; teachers flagged prototypes "too game-y" | Used as the case signal and trade-off. | Résumé (R). |
| DAU +12–15%, session time ~15% | Not attributed to the behavioural system. Kept only on D-08 with the basis "as recorded on the résumé: before/after, no method or control". | No attribution in any source. |
| 100K+ learners | Edfora product reach only; the case says it is not this system's reach. | — |
| FanBlaze | Removed from the flagship stories; leads the decision library (D-01) as a stopped bet. | Product judgment, not a success case. |
| myPlan accuracy loop | Its own decision snapshot (D-09) and a stage of case 04. | — |

---

## 12. Doubt Resolution case audit (2026-10-04)

| Item | Treatment |
|---|---|
| Structure | Signal → Tension → Options → Basis → Trade-off → Decision → Quality gate → Pilot → Outcome → Not shipped → Learning. The header pairs the median TAT with the decision path (considered → selected → gate → not shipped). |
| RICE and unit economics | Shown as the decision basis; the scores and cost inputs are **not in the record** and the page says so. No numbers invented. |
| 90% accuracy | Shown as the gate (threshold, SME sampling of hints marked resolved, satisfaction ratings, rollback). **Not shown as achieved**: no measured accuracy figure is in the record, and the page says so. |
| Pilot | 1,000 active JEE batch subscribers, cohort-gated, instant hints vs. standard queue. Duration, split, holdout size and significance are **not in the record** and the page says so. |
| Outcomes | Median TAT ~24 h → <15 min; D14 ~18% relative vs. holdout; ~60% modeled support-cost avoidance (not a saving). |
| Trade-off matrix | Qualitative cells (product reasoning), labelled as such; not scores. |
| Not shipped / Learning | Labelled product reasoning. No production AI, model or LLM claim. The hybrid is attributed to product & growth, not to Nitesh personally. |

---

## 13. Witzeal evidence visuals (2026-10-04)

| Item | Treatment |
|---|---|
| D7 | Hero evidence: 12.2% control → 25.4% treatment, **+13.2 percentage points** (computed only because `comparisonValid` is true). Context: ~50K users · ~3 weeks · 30/70 controlled rollout. Caveats: bundle of five changes incl. ₹15 free games (causal isolation limited); Day-7 definition and significance not recorded. Caption: "The redesigned onboarding arm recorded 13.2 percentage points higher Day-7 retention than the concurrent control." |
| D0 | Supporting only: 12% → 33%, "Comparison basis not recorded", `comparisonValid: false` so no change is computed or drawn. |
| Business chain | D0 and D7 measured; first deposit and NGR not measured. Caption: "The experiment measured activation and retention; the original analysis did not establish the downstream revenue impact." |
| Excluded | GMV ~10% WoW, 48% retention, relative uplifts (+108%, 2×), significance, confidence intervals, retention curves, invented D0 arm values, funnel percentages. Bonus spend stays in its own decision (D-02), not in this case. |

## 14. Adaptive Practice visuals (2026-10-04)

| Item | Treatment |
|---|---|
| Hero loop | Inputs (raw student data, 3PL question parameters, content IDs) → Ability (θ per concept, from historical performance) → Score (P(θ) from b, a, c) → Select (near current ability; the more discriminating question when candidates are comparable) → Respond (correct → harder, incorrect → easier) → Update θ → back to Score. Label: "3PL Item Response Theory · statistical model · not an LLM". Only PRD mechanics shown. |
| Edge cases | Pinned to their steps: initial ability estimation (method not recorded), questions missing 3PL parameters, several questions with the same median P(θ). Handling is not described because it isn't in the evidence. |
| Completion | Supporting figure: 18% static path → 45% after the adaptive system, "Before / after · 2-year academic-cycle dataset". `comparisonValid: false`, `evidenceType: "before-after"`, so no change is computed or drawn. Caveats: observed, not attributed to the engine alone; how completion was counted isn't recorded; learning mastery was not captured. |
| Problem | "A fixed sequence couldn't adapt to different learner ability levels: some questions were too hard, others too easy." No drop-off reduction claim, no research findings. |
| Scope | Core Practice & Learning Experience. 100K+ appears only as Edfora's overall product reach. Team unchanged; the APM is not described as a report. |
| Excluded | "+27 percentage points" / "+27pp" / relative uplift, AI/ML/LLM framing, mastery or learning-curve claims, causal attribution of 18 → 45, RICE scores, stakeholder disagreement, significance, confidence intervals. |
