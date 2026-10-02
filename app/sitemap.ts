import type { MetadataRoute } from "next";
import { aiLab, flagships } from "@/content/portfolio";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/decisions", "/ai-lab", "/about"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p ? 0.8 : 1 })),
    ...flagships.map((c) => ({ url: `${siteUrl}${c.href}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...aiLab.builds.map((b) => ({ url: `${siteUrl}${b.href}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
