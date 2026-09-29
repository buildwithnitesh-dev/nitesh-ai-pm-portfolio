import type { Metadata } from "next";
import { caseStudies, type CaseSlug } from "@/content/portfolio";

/** Title, description, canonical URL and share metadata for a case-study route. */
export function caseMetadata(slug: CaseSlug, description: string): Metadata {
  const c = caseStudies.find((x) => x.slug === slug)!;
  return {
    title: c.title,
    description,
    alternates: { canonical: c.href },
    openGraph: { title: `${c.title} · Nitesh Tiwari`, description, type: "article", url: c.href, images: ["/opengraph-image"] },
  };
}
