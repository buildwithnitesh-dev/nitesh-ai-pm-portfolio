import type { Metadata } from "next";
import { AdaptiveAssignmentCaseStudy } from "@/components/case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "adaptive-assignment-engine",
  "Case study: how a 3PL IRT-based adaptive practice engine at Edfora matched question difficulty to each learner’s ability, where assignment completion went from 18% to 45%.",
);

export default function Page() { return <AdaptiveAssignmentCaseStudy/>; }
