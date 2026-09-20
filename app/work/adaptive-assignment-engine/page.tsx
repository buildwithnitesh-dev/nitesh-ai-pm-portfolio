import type { Metadata } from "next";
import { AdaptiveAssignmentCaseStudy } from "@/components/case-study-page";
export const metadata: Metadata = {
  title: "Adaptive Assignment Engine — Nitesh Tiwari",
  description: "Product case study on adaptive assignment design and an approximately 18–25% improvement in assignment completion.",
};
export default function Page() { return <AdaptiveAssignmentCaseStudy/>; }