/**
 * Learner Diagnostic v2: evaluation schema and scoring.
 *
 * Everything here is infrastructure. No case in this folder is real learner
 * data, and no result exists until scripts/eval-learner-diagnostic.ts makes a
 * real model call. Scoring functions are pure, so they can be checked without
 * a model (`--self-test`).
 */

/* -------------------------------------------------------------------------- */
/* Inputs                                                                      */
/* -------------------------------------------------------------------------- */

/** One observed learner response. Every claim a model makes must cite these ids. */
export type EvidenceItem = {
  id: string;
  /** The skill this item tests, from the skill map. */
  skill: string;
  item: string;
  response: string;
  correct: boolean;
  hintsUsed: number;
  /** Seconds taken against the item's expected time, when relevant. */
  seconds?: number;
  expectedSeconds?: number;
};

/** What a correct diagnosis looks like for a case. Drafted, then reviewed by an educator. */
export type Expected = {
  /** A misconception id from the skill map, or null when the right answer is to abstain. */
  misconception: string | null;
  /** Evidence a sound diagnosis would rest on. */
  supportingEvidence: readonly string[];
  /** Next steps an educator would accept. */
  acceptableNextSteps: readonly string[];
  /** Skills the learner was never tested on: naming one is a hallucinated gap. */
  untestedSkills: readonly string[];
};

export type EvalCase = {
  id: string;
  /** Always true in this repository: authored for testing, never learner data. */
  synthetic: true;
  source: "authored-synthetic";
  /** Expected labels stay "draft" until an educator has reviewed them; accuracy is only reported against reviewed labels. */
  labelStatus: "draft" | "educator-reviewed";
  /** The failure mode or behaviour the case is built to probe. */
  probes: string;
  subject: string;
  evidence: readonly EvidenceItem[];
  expected: Expected;
};

export type CaseFile = {
  schemaVersion: 1;
  description: string;
  skillMap: readonly { skill: string; misconceptions: readonly string[] }[];
  cases: readonly EvalCase[];
};

/* -------------------------------------------------------------------------- */
/* Model output                                                                */
/* -------------------------------------------------------------------------- */

/** The structured output every model run must return. */
export type Diagnosis = {
  /** A misconception id from the skill map, or null to abstain. */
  misconception: string | null;
  abstain: boolean;
  /** Evidence ids the diagnosis rests on. */
  evidenceIds: readonly string[];
  /** Stated confidence, 0 to 1. */
  confidence: number;
  explanation: string;
  nextStep: string;
};

/** JSON Schema for Diagnosis, sent with the prompt and used to validate replies. */
export const diagnosisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["misconception", "abstain", "evidenceIds", "confidence", "explanation", "nextStep"],
  properties: {
    misconception: { type: ["string", "null"] },
    abstain: { type: "boolean" },
    evidenceIds: { type: "array", items: { type: "string" } },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    explanation: { type: "string" },
    nextStep: { type: "string" },
  },
} as const;

/** Returns the reasons a parsed value is not a valid Diagnosis (empty when valid). */
export function validateDiagnosis(v: unknown): string[] {
  const errors: string[] = [];
  if (typeof v !== "object" || v === null) return ["not an object"];
  const d = v as Record<string, unknown>;
  if (!(d.misconception === null || typeof d.misconception === "string")) errors.push("misconception must be string or null");
  if (typeof d.abstain !== "boolean") errors.push("abstain must be boolean");
  if (!Array.isArray(d.evidenceIds) || !d.evidenceIds.every((x) => typeof x === "string")) errors.push("evidenceIds must be string[]");
  if (typeof d.confidence !== "number" || d.confidence < 0 || d.confidence > 1) errors.push("confidence must be a number in [0, 1]");
  if (typeof d.explanation !== "string") errors.push("explanation must be string");
  if (typeof d.nextStep !== "string") errors.push("nextStep must be string");
  return errors;
}

/* -------------------------------------------------------------------------- */
/* Run records                                                                 */
/* -------------------------------------------------------------------------- */

/** Everything needed to reproduce a run. Recorded before the first call. */
export type RunConfig = {
  provider: "anthropic";
  /** The model id requested. */
  model: string;
  temperature: number;
  maxTokens: number;
  /** Runs per case, for the consistency metric. */
  repeats: number;
  promptVersion: string;
  casesFile: string;
  gitCommit: string | null;
};

export type CallRecord = {
  caseId: string;
  repeat: number;
  /** The model id the API reports having served. */
  servedModel: string | null;
  latencyMs: number;
  inputTokens: number | null;
  outputTokens: number | null;
  rawText: string | null;
  diagnosis: Diagnosis | null;
  /** Validation or transport errors. A failed call is recorded, never replaced. */
  errors: readonly string[];
};

export type RunRecord = {
  runId: string;
  startedAt: string;
  finishedAt: string;
  config: RunConfig;
  /** Always "real-model-calls": the runner never writes simulated results. */
  provenance: "real-model-calls";
  calls: readonly CallRecord[];
  metrics: Metrics;
};

/* -------------------------------------------------------------------------- */
/* Scoring                                                                     */
/* -------------------------------------------------------------------------- */

export type Metrics = {
  calls: number;
  validOutputRate: number | null;
  /** Share of valid diagnoses whose every cited evidence id exists in the case. */
  groundedness: number | null;
  /** Share of valid diagnoses that name an untested skill or cite a missing id. */
  hallucinationRate: number | null;
  /** Share of cases whose repeats all reached the same misconception (or all abstained). */
  consistency: number | null;
  /** Expected calibration error over valid diagnoses with a known right answer. */
  calibrationError: number | null;
  /** Accuracy against educator-reviewed labels only; null while all labels are drafts. */
  accuracyReviewed: number | null;
  /** Accuracy against draft labels: for debugging the harness, never for reporting. */
  accuracyDraftLabels: number | null;
  latencyP50Ms: number | null;
  latencyP95Ms: number | null;
  inputTokens: number;
  outputTokens: number;
};

/** True when every cited id exists in the case's evidence. */
export function isGrounded(d: Diagnosis, c: EvalCase): boolean {
  const ids = new Set(c.evidence.map((e) => e.id));
  return d.evidenceIds.every((id) => ids.has(id));
}

/** True when the diagnosis cites a missing id or lands on a misconception in a skill the learner wasn't tested on. */
export function isHallucinated(d: Diagnosis, c: EvalCase, file: CaseFile): boolean {
  if (!isGrounded(d, c)) return true;
  if (!d.misconception) return false;
  const skill = file.skillMap.find((s) => s.misconceptions.includes(d.misconception!))?.skill;
  return skill !== undefined && c.expected.untestedSkills.includes(skill);
}

/** Right answer: the expected misconception, or abstaining when the case expects it. */
export function isCorrect(d: Diagnosis, c: EvalCase): boolean {
  if (c.expected.misconception === null) return d.abstain || d.misconception === null;
  return !d.abstain && d.misconception === c.expected.misconception;
}

/** Expected calibration error with equal-width confidence bins. */
export function calibrationError(points: readonly { confidence: number; correct: boolean }[], bins = 5): number | null {
  if (points.length === 0) return null;
  let ece = 0;
  for (let b = 0; b < bins; b++) {
    const lo = b / bins;
    const hi = (b + 1) / bins;
    const inBin = points.filter((p) => p.confidence >= lo && (b === bins - 1 ? p.confidence <= hi : p.confidence < hi));
    if (inBin.length === 0) continue;
    const acc = inBin.filter((p) => p.correct).length / inBin.length;
    const conf = inBin.reduce((s, p) => s + p.confidence, 0) / inBin.length;
    ece += (inBin.length / points.length) * Math.abs(acc - conf);
  }
  return ece;
}

function percentile(values: readonly number[], p: number): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
}

const rate = (n: number, d: number) => (d === 0 ? null : n / d);

export function score(file: CaseFile, calls: readonly CallRecord[]): Metrics {
  const byId = new Map(file.cases.map((c) => [c.id, c]));
  const valid = calls.filter((x) => x.diagnosis !== null) as (CallRecord & { diagnosis: Diagnosis })[];

  const grounded = valid.filter((x) => isGrounded(x.diagnosis, byId.get(x.caseId)!)).length;
  const hallucinated = valid.filter((x) => isHallucinated(x.diagnosis, byId.get(x.caseId)!, file)).length;

  const caseIds = [...new Set(calls.map((x) => x.caseId))];
  const consistentCases = caseIds.filter((id) => {
    const answers = valid.filter((x) => x.caseId === id).map((x) => (x.diagnosis.abstain ? "∅" : x.diagnosis.misconception ?? "∅"));
    return answers.length > 1 && answers.every((a) => a === answers[0]);
  }).length;
  const repeatedCases = caseIds.filter((id) => valid.filter((x) => x.caseId === id).length > 1).length;

  const points = valid.map((x) => ({ confidence: x.diagnosis.confidence, correct: isCorrect(x.diagnosis, byId.get(x.caseId)!) }));
  const reviewed = valid.filter((x) => byId.get(x.caseId)!.labelStatus === "educator-reviewed");

  const latencies = calls.map((x) => x.latencyMs);
  return {
    calls: calls.length,
    validOutputRate: rate(valid.length, calls.length),
    groundedness: rate(grounded, valid.length),
    hallucinationRate: rate(hallucinated, valid.length),
    consistency: rate(consistentCases, repeatedCases),
    calibrationError: calibrationError(points),
    accuracyReviewed: rate(reviewed.filter((x) => isCorrect(x.diagnosis, byId.get(x.caseId)!)).length, reviewed.length),
    accuracyDraftLabels: rate(points.filter((p) => p.correct).length, points.length),
    latencyP50Ms: percentile(latencies, 50),
    latencyP95Ms: percentile(latencies, 95),
    inputTokens: calls.reduce((s, x) => s + (x.inputTokens ?? 0), 0),
    outputTokens: calls.reduce((s, x) => s + (x.outputTokens ?? 0), 0),
  };
}
