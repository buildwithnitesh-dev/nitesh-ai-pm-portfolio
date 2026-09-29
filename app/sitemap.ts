import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/portfolio";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({ url: `${siteUrl}${c.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
