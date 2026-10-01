import type { Metadata } from "next";
import { caseStudies, seo, type CaseSlug } from "@/content/portfolio";

const image = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.share.imageAlt };

/** Title, description, canonical URL and share metadata for a case-study route. */
export function caseMetadata(slug: CaseSlug, description: string): Metadata {
  const c = caseStudies.find((x) => x.slug === slug)!;
  return {
    title: c.title,
    description,
    alternates: { canonical: c.href },
    // A page-level openGraph replaces the root one, so the shared card (app/opengraph-image.tsx) is named here with its size and alt.
    openGraph: { title: `${c.title} · Nitesh Tiwari`, description, type: "article", url: c.href, images: [image] },
    twitter: { card: "summary_large_image", title: `${c.title} · Nitesh Tiwari`, description, images: [image] },
  };
}
