# Learner Diagnostic v2: evaluation

Infrastructure for the first real AI build. **No evaluation has been run.** There are no results in this folder until a real model call writes one.

## What is here

| File | What it is |
|---|---|
| `schema.ts` | Case, output and run-record types; the JSON Schema a model must return; pure scoring functions. |
| `cases.json` | 10 **synthetic** cases authored for testing. None of this is learner data. Every expected label is a **draft** until an educator reviews it. |
| `../../scripts/eval-learner-diagnostic.ts` | The runner. |

## Running it

```sh
node scripts/eval-learner-diagnostic.ts --validate    # checks the case file
node scripts/eval-learner-diagnostic.ts --self-test   # checks the scoring functions; no model
ANTHROPIC_API_KEY=… node scripts/eval-learner-diagnostic.ts --model <model-id> --repeats 3
```

The runner:

- refuses to run without `ANTHROPIC_API_KEY`, and has **no default model**, because choosing one is still an open product decision;
- never simulates, imputes or back-fills a result, and records a failed call as failed;
- writes `results/<run-id>.json` only when at least one real model response came back, with the requested model, the model the API reports serving, temperature, max tokens, repeats, prompt version and git commit;
- reports accuracy against **educator-reviewed** labels only. Accuracy against draft labels is kept separately, for debugging the harness, and is never for reporting.

Never commit an API key. `.env*` files are git-ignored.

## What it measures

| Metric | How |
|---|---|
| Groundedness | Share of valid diagnoses whose cited evidence ids all exist in the case. |
| Hallucination rate | Share citing a missing id, or naming a misconception in a skill the learner was never tested on. |
| Consistency | Share of cases where every repeat reached the same diagnosis (or all abstained). |
| Calibration | Expected calibration error of stated confidence against correctness. |
| Diagnostic accuracy | Against educator-reviewed labels only. |
| Usefulness | Not automated: an educator rates next steps against `acceptableNextSteps`. Planned. |
| Latency | p50 and p95 per call. |
| Cost | Input and output tokens are recorded. Price per token isn't hard-coded, so cost is computed when the budget is set. |

## Before any result is published

1. An educator reviews every expected label (`labelStatus: "educator-reviewed"`).
2. Latency and cost budgets are set.
3. The rules-only baseline is scored on the same cases, so the model has a bar to beat.
