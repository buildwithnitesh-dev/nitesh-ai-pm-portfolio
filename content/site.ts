/**
 * Absolute base URL for metadata, sitemap and structured data.
 * NEXT_PUBLIC_SITE_URL wins (set it once a custom domain exists); otherwise
 * Vercel's production URL, which Vercel sets automatically at build time.
 */
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercel ? `https://${vercel}` : "http://localhost:3000")).replace(/\/$/, "");
