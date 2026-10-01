import type { Metadata } from "next";
import { GamingCaseStudyPage } from "@/components/gaming-case-study-page";
import { caseMetadata } from "@/content/case-metadata";

export const metadata: Metadata = caseMetadata(
  "onboarding-funnel-redesign",
  "Case study: only 12% of new players at Witzeal played a game on day one. Five onboarding changes, tested in a 30/70 controlled rollout: D0 gameplay 12% → 33%, Day-7 retention 12.2% → 25.4%.",
);

export default function Page() {
  return <GamingCaseStudyPage />;
}
