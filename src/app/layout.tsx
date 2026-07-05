import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PROFILE } from "../constants/profile";
import { EXPERIENCE } from "../constants/experience";
import { EDUCATION } from "../constants/education";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

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
  "Software Engineer with ~3 years building scalable SaaS, enterprise, and blockchain platforms using Next.js, React, TypeScript, and Node.js.";

// Shorter still (~110 chars) for social cards, which often truncate near 125.
const ogDescription =
  "Software Engineer building scalable SaaS, enterprise & blockchain platforms with Next.js, React, and Node.js.";

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
  sameAs: [
    `https://${PROFILE.socials.linkedin}`,
    `https://${PROFILE.socials.github}`,
    `https://${PROFILE.socials.takeuforward}`,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const isDark = savedTheme ? savedTheme === 'dark' : true;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-300 flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 md:px-8 md:py-12 max-w-5xl animate-in fade-in duration-500">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
