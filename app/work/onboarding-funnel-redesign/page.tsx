import type { Metadata } from "next";
import { GamingCaseStudyPage } from "@/components/gaming-case-study-page";

export const metadata: Metadata = {
  title: "Onboarding Funnel Redesign — Nitesh Tiwari",
  description: "Product case study on onboarding, experimentation, segmentation, and a Day-7 retention improvement from 12% to 25%.",
};

export default function Page() {
  return <GamingCaseStudyPage />;
}
