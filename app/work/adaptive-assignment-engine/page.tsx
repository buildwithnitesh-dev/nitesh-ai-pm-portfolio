import type { Metadata } from "next";
import { AdaptiveAssignmentCaseStudy } from "@/components/case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "adaptive-assignment-engine",
  "Case study: how an adaptive practice engine at Edfora matched question difficulty to each learner’s ability, and improved assignment completion by roughly 18–25%.",
);

export default function Page() { return <AdaptiveAssignmentCaseStudy/>; }
