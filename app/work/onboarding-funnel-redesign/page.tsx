import type { Metadata } from "next";
import { GamingCaseStudyPage } from "@/components/gaming-case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "onboarding-funnel-redesign",
  "Case study: why only about 35% of new players at Witzeal reached a game on day one, what changed in the first 60 seconds, and a controlled rollout where Day-7 retention was 25.4% against 12.2%.",
);

export default function Page() {
  return <GamingCaseStudyPage />;
}
