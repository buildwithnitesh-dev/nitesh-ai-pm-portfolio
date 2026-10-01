/**
 * Absolute base URL for metadata (canonical, og:url, og:image), sitemap and
 * structured data: the custom domain, so shared links and previews always
 * point at it. NEXT_PUBLIC_SITE_URL can override it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildwithnitesh.com").replace(/\/$/, "");
