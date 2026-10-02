/**
 * Learner Diagnostic v2: evaluation runner.
 *
 *   node scripts/eval-learner-diagnostic.ts --validate
 *   node scripts/eval-learner-diagnostic.ts --self-test
 *   ANTHROPIC_API_KEY=… node scripts/eval-learner-diagnostic.ts --model <model-id> [--repeats 3] [--temperature 0]
 *
 * Rules this runner enforces:
 * - It refuses to call a model without ANTHROPIC_API_KEY, and there is no default model:
 *   choosing one is still an open product decision.
 * - It never simulates, imputes or back-fills a result. A failed call is recorded as failed.
 * - It writes a results file only when at least one real model response came back,
 *   with the model, served model, configuration and git commit recorded.
 * - Cases are synthetic and say so; accuracy is reported against educator-reviewed labels only.
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  diagnosisJsonSchema,
  score,
  validateDiagnosis,
  type CallRecord,
  type CaseFile,
  type Diagnosis,
  type EvalCase,
  type RunConfig,
  type RunRecord,
} from "../evals/learner-diagnostic/schema.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const casesPath = join(root, "evals/learner-diagnostic/cases.json");
const resultsDir = join(root, "evals/learner-diagnostic/results");
const PROMPT_VERSION = "diagnostic-v2.0";
const API_URL = process.env.EVAL_API_URL ?? "https://api.anthropic.com/v1/messages";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

function loadCases(): CaseFile {
  return JSON.parse(readFileSync(casesPath, "utf8")) as CaseFile;
}

/** Structural checks on the case file; no model involved. */
function validateCases(file: CaseFile): string[] {
  const errors: string[] = [];
  const misconceptions = new Set(file.skillMap.flatMap((s) => s.misconceptions));
  const ids = new Set<string>();
  for (const c of file.cases) {
    if (ids.has(c.id)) errors.push(`${c.id}: duplicate id`);
    ids.add(c.id);
    if (c.synthetic !== true || c.source !== "authored-synthetic") errors.push(`${c.id}: must be marked synthetic`);
    const evidence = new Set(c.evidence.map((e) => e.id));
    for (const id of c.expected.supportingEvidence) if (!evidence.has(id)) errors.push(`${c.id}: expected evidence ${id} is not in the case`);
    if (c.expected.misconception !== null && !misconceptions.has(c.expected.misconception)) errors.push(`${c.id}: unknown misconception ${c.expected.misconception}`);
  }
  return errors;
}

function prompt(file: CaseFile, c: EvalCase): { system: string; user: string } {
  const system = [
    "You diagnose a learner's likely misconception from a small set of their answers, for a teacher to review.",
    "Rules:",
    "- Name a misconception only from the skill map provided, and only if the evidence supports it.",
    "- Cite the evidence ids your diagnosis rests on. Never cite an id that is not in the evidence.",
    "- If the evidence is thin, contradictory or shows no consistent error, abstain: set abstain to true and misconception to null.",
    "- Confidence is your probability that the diagnosis is right, from 0 to 1.",
    "- Describe the gap and the next step, never the learner.",
    `Reply with JSON only, matching this schema: ${JSON.stringify(diagnosisJsonSchema)}`,
  ].join("\n");
  const user = JSON.stringify({ skillMap: file.skillMap, subject: c.subject, evidence: c.evidence });
  return { system, user };
}

function parseDiagnosis(text: string): { diagnosis: Diagnosis | null; errors: string[] } {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return { diagnosis: null, errors: ["no JSON object in reply"] };
  try {
    const value = JSON.parse(text.slice(start, end + 1));
    const errors = validateDiagnosis(value);
    return errors.length ? { diagnosis: null, errors } : { diagnosis: value as Diagnosis, errors: [] };
  } catch (e) {
    return { diagnosis: null, errors: [`invalid JSON: ${(e as Error).message}`] };
  }
}

async function callModel(key: string, config: RunConfig, file: CaseFile, c: EvalCase, repeat: number): Promise<CallRecord & { responded: boolean }> {
  const { system, user } = prompt(file, c);
  const started = performance.now();
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: config.model, max_tokens: config.maxTokens, temperature: config.temperature, system, messages: [{ role: "user", content: user }] }),
    });
    const latencyMs = Math.round(performance.now() - started);
    const body = (await res.json()) as {
      model?: string;
      content?: { type: string; text?: string }[];
      usage?: { input_tokens?: number; output_tokens?: number };
      error?: { message?: string };
    };
    if (!res.ok) {
      return { caseId: c.id, repeat, servedModel: null, latencyMs, inputTokens: null, outputTokens: null, rawText: null, diagnosis: null, errors: [`HTTP ${res.status}: ${body.error?.message ?? "error"}`], responded: false };
    }
    const rawText = (body.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join("");
    const { diagnosis, errors } = parseDiagnosis(rawText);
    return {
      caseId: c.id, repeat, servedModel: body.model ?? null, latencyMs,
      inputTokens: body.usage?.input_tokens ?? null, outputTokens: body.usage?.output_tokens ?? null,
      rawText, diagnosis, errors, responded: true,
    };
  } catch (e) {
    return { caseId: c.id, repeat, servedModel: null, latencyMs: Math.round(performance.now() - started), inputTokens: null, outputTokens: null, rawText: null, diagnosis: null, errors: [`transport: ${(e as Error).message}`], responded: false };
  }
}

/** Checks the scoring functions on hand-built diagnoses. Writes nothing and calls no model. */
function selfTest(file: CaseFile): void {
  const c = file.cases.find((x) => x.id === "frac-01")!;
  const right: Diagnosis = { misconception: "adds-numerators-and-denominators", abstain: false, evidenceIds: ["e1", "e2"], confidence: 0.8, explanation: "", nextStep: "" };
  const ungrounded: Diagnosis = { ...right, evidenceIds: ["e9"] };
  const call = (d: Diagnosis, repeat: number): CallRecord => ({ caseId: c.id, repeat, servedModel: "self-test", latencyMs: 0, inputTokens: 0, outputTokens: 0, rawText: null, diagnosis: d, errors: [] });
  const m = score(file, [call(right, 0), call(right, 1), call(ungrounded, 2)]);
  const checks: [string, boolean][] = [
    ["groundedness counts the uncited id", Math.abs((m.groundedness ?? 0) - 2 / 3) < 1e-9],
    ["hallucination counts the uncited id", Math.abs((m.hallucinationRate ?? 0) - 1 / 3) < 1e-9],
    ["consistency: one case, all repeats agree", m.consistency === 1],
    ["no accuracy against draft labels is reported", m.accuracyReviewed === null],
    ["schema rejects confidence above 1", validateDiagnosis({ ...right, confidence: 1.5 }).length > 0],
  ];
  for (const [name, ok] of checks) console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (checks.some(([, ok]) => !ok)) process.exit(1);
}

async function main() {
  const file = loadCases();
  const caseErrors = validateCases(file);
  if (caseErrors.length) {
    console.error(caseErrors.join("\n"));
    process.exit(1);
  }
  if (flag("validate")) {
    console.log(`${file.cases.length} synthetic cases valid. Labels: ${file.cases.filter((c) => c.labelStatus === "educator-reviewed").length} reviewed, ${file.cases.filter((c) => c.labelStatus === "draft").length} draft.`);
    return;
  }
  if (flag("self-test")) return selfTest(file);

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.error("Refusing to run: ANTHROPIC_API_KEY is not set. No model was called and no results were written.");
    process.exit(2);
  }
  const model = arg("model") ?? process.env.EVAL_MODEL;
  if (!model) {
    console.error("Refusing to run: no model given (--model or EVAL_MODEL). There is deliberately no default.");
    process.exit(2);
  }

  let gitCommit: string | null = null;
  try { gitCommit = execSync("git rev-parse HEAD", { cwd: root }).toString().trim(); } catch { /* not a git checkout */ }
  const config: RunConfig = {
    provider: "anthropic",
    model,
    temperature: Number(arg("temperature") ?? 0),
    maxTokens: Number(arg("max-tokens") ?? 800),
    repeats: Number(arg("repeats") ?? 3),
    promptVersion: PROMPT_VERSION,
    casesFile: "evals/learner-diagnostic/cases.json",
    gitCommit,
  };

  const startedAt = new Date().toISOString();
  const calls: (CallRecord & { responded: boolean })[] = [];
  for (const c of file.cases) {
    for (let r = 0; r < config.repeats; r++) {
      const result = await callModel(key, config, file, c, r);
      calls.push(result);
      console.log(`${c.id} #${r}: ${result.responded ? (result.diagnosis ? "ok" : `invalid (${result.errors.join("; ")})`) : `failed (${result.errors.join("; ")})`}`);
    }
  }

  if (!calls.some((c) => c.responded)) {
    console.error("No model responded. Nothing was written.");
    process.exit(1);
  }

  const record: RunRecord = {
    runId: `${startedAt.replace(/[:.]/g, "-")}-${model}`,
    startedAt,
    finishedAt: new Date().toISOString(),
    config,
    provenance: "real-model-calls",
    calls: calls.map(({ responded: _responded, ...rest }) => rest),
    metrics: score(file, calls),
  };
  mkdirSync(resultsDir, { recursive: true });
  const out = join(resultsDir, `${record.runId}.json`);
  writeFileSync(out, `${JSON.stringify(record, null, 2)}\n`);
  console.log(`Wrote ${out}`);
  console.log(JSON.stringify(record.metrics, null, 2));
}

main();
