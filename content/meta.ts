import type { Metadata } from "next";
import { profile, seo } from "./portfolio";

/** The shared share card (app/opengraph-image.tsx), named explicitly because a page-level openGraph replaces the root one. */
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: seo.share.imageAlt };

/** Title, description, canonical URL and share metadata for one route. */
export function pageMetadata({ path, title, description, type = "website" }: { path: string; title: string; description: string; type?: "website" | "article" }): Metadata {
  const shareTitle = `${title} · ${profile.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: shareTitle, description, type, url: path, siteName: profile.name, images: [image] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image] },
  };
}
