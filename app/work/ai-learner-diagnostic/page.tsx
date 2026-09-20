import type { Metadata } from "next";
import { AiLearnerDiagnosticPage } from "@/components/ai-case-study-page";
export const metadata: Metadata = {
  title: "AI Learner Diagnostic — Nitesh Tiwari",
  description: "Independent AI Product Manager portfolio project covering diagnosis, recommendations, evaluation, and guardrails.",
};
export default function Page() { return <AiLearnerDiagnosticPage/>; }