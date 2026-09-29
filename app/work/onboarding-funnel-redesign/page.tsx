import type { Metadata } from "next";
import { GamingCaseStudyPage } from "@/components/gaming-case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "onboarding-funnel-redesign",
  "Case study: tracing onboarding drop-off to before the second session at Witzeal, redesigning the first 60 seconds, and lifting Day-7 retention from 12% to 25%.",
);

export default function Page() {
  return <GamingCaseStudyPage />;
}
