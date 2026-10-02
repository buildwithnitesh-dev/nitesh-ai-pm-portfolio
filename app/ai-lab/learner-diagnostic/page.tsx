import { AiLearnerDiagnosticPage } from "@/components/ai-case-study-page";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/ai-lab/learner-diagnostic",
  title: "AI Learner Diagnostic",
  description: "Independent AI product prototype: splitting work between rules, a model and the teacher, with failure modes, an evaluation rubric, confidence and human override designed in. Deterministic demo; no real-user or model results claimed.",
  type: "article",
});

export default function Page() {
  return <AiLearnerDiagnosticPage />;
}
