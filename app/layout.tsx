import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seo } from "@/content/portfolio";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  authors: [{ name: "Nitesh Tiwari" }],
  openGraph: { title: seo.title, description: seo.description, type: "website", locale: "en_US" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {"@context":"https://schema.org","@type":"Person","name":"Nitesh Tiwari","jobTitle":"Senior Product Manager","description":seo.description,"knowsAbout":["Product Strategy","Growth","AI Products","Personalization","Engagement","Retention","Experimentation","EdTech","Gaming","Consumer Technology"]};
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}><body className="flex min-h-full flex-col bg-background font-sans text-foreground">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-panel">Skip to content</a>
    <SiteHeader/>{children}<SiteFooter/>
  </body></html>;
}