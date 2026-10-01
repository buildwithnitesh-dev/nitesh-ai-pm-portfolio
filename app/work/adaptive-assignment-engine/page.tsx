import type { Metadata } from "next";
import { AdaptiveAssignmentCaseStudy } from "@/components/case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "adaptive-assignment-engine",
  "Case study: a 3PL IRT-based adaptive practice engine at Edfora matched question difficulty to each learner’s ability. Across a 2-year academic-cycle dataset, assignment completion was 18% on the static path and 45% after.",
);

export default function Page() { return <AdaptiveAssignmentCaseStudy/>; }
