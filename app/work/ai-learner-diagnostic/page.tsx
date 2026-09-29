import type { Metadata } from "next";
import { AiLearnerDiagnosticPage } from "@/components/ai-case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "ai-learner-diagnostic",
  "Independent AI product prototype: splitting work between rules, a model and the teacher, with failure modes, evaluation, confidence and human override designed in. No real-user or production results claimed.",
);

export default function Page() { return <AiLearnerDiagnosticPage/>; }
