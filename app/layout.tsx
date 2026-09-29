import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { career, contact, profile, seo } from "@/content/portfolio";
import { siteUrl } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s · ${profile.name}` },
  description: seo.description,
  authors: [{ name: profile.name, url: contact.linkedin }],
  openGraph: { title: seo.title, description: seo.description, type: "profile", locale: "en_US", url: "/", siteName: profile.name },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
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
    ...career.map((r) => ({ "@type": "Organization", name: r.company })),
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}><body className="flex min-h-full flex-col bg-background font-sans text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-panel">Skip to content</a>
    <SiteHeader/>{children}<SiteFooter/>
  </body></html>;
}
