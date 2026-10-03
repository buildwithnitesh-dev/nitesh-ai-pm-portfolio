import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, profile, roles, seo } from "@/content/portfolio";
import { siteUrl } from "@/content/site";
import "./globals.css";

const grotesk = Schibsted_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s · ${profile.name}` },
  description: seo.description,
  authors: [{ name: profile.name, url: contact.linkedin }],
  openGraph: { title: seo.share.title, description: seo.share.description, type: "profile", locale: "en_US", url: "/", siteName: profile.name },
  twitter: { card: "summary_large_image", title: seo.share.title, description: seo.share.description },
  robots: { index: true, follow: true },
};

/** Structured data: who this is, what they work on, and where they have worked. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  description: seo.description,
  email: `mailto:${contact.email}`,
  sameAs: [contact.linkedin],
  address: { "@type": "PostalAddress", addressRegion: "Delhi NCR", addressCountry: "IN" },
  knowsAbout: [...profile.strengths, "EdTech", "Gaming", "Consumer Technology"],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "SHUATS, Allahabad" },
    ...roles.map((r) => ({ "@type": "Organization", name: r.company })),
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${grotesk.variable} h-full antialiased`}><body className="flex min-h-full flex-col bg-background font-sans text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-panel">Skip to content</a>
    <SiteHeader/>{children}<SiteFooter/>
  </body></html>;
}
