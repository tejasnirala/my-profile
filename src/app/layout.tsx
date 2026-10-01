import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PROFILE, SOCIAL_LINKS } from "@/constants/profile";
import { EXPERIENCE } from "@/constants/experience";
import { EDUCATION } from "@/constants/education";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { THEME_COLORS, themeScript } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const allSkills = PROFILE.skills.flatMap((group) => group.items);

// Kept under ~155 chars so Google doesn't truncate it in search results.
const description =
  `Software Engineer with ~${Math.round(PROFILE.yearsOfExperience)} years building scalable SaaS, enterprise, and blockchain platforms using Next.js, React, TypeScript, and Node.js.`;

// Shorter still (~110 chars) for social cards, which often truncate near 125.
const ogDescription =
  "Software Engineer building scalable SaaS, enterprise & blockchain platforms with Next.js, React, and Node.js.";

// `viewport-fit=cover` lets the page paint under the notch; `gutter` and the
// safe-area paddings keep content clear of it in landscape. The theme-color tags
// follow the OS by default; the inline theme script then overrides them with the
// site's actual theme (dark unless the visitor picked light).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title: {
    default: `${PROFILE.name} — ${PROFILE.title}`,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  keywords: [
    PROFILE.name,
    "Full Stack Developer",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Jaipur",
    ...allSkills,
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.url }],
  creator: PROFILE.name,
  applicationName: `${PROFILE.name} Portfolio`,
  alternates: {
    canonical: "/",
  },
  verification: {
    // Get this from Google Search Console → Settings → Ownership verification →
    // HTML tag, then set GOOGLE_SITE_VERIFICATION in your env (e.g. Vercel project
    // env vars). Until set, no verification tag is emitted.
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    title: `${PROFILE.name} — ${PROFILE.title}`,
    description: ogDescription,
    url: PROFILE.url,
    siteName: PROFILE.name,
    locale: "en_US",
    firstName: "Tejas",
    lastName: "Nirala",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.title}`,
    description: ogDescription,
  },
  category: "technology",
  appleWebApp: {
    capable: true,
    title: PROFILE.name,
    statusBarStyle: "default",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  url: PROFILE.url,
  jobTitle: PROFILE.title,
  email: `mailto:${PROFILE.email}`,
  telephone: PROFILE.phone,
  description: PROFILE.about,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: EXPERIENCE[0]?.company,
  },
  alumniOf: EDUCATION.filter((e) => e.school.includes("University")).map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  knowsAbout: allSkills,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="min-h-svh w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col">
          <Header />
          <main id="main" className="flex-1 container mx-auto gutter py-8 md:py-12 short:py-6 max-w-5xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
