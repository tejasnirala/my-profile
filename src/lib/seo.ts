import type { Metadata } from "next";
import { EDUCATION } from "@/constants/education";
import { EXPERIENCE } from "@/constants/experience";
import { PAGES, type PageId } from "@/constants/pages";
import { PROFILE, SOCIAL_LINKS } from "@/constants/profile";

/**
 * How the site appears to search engines and in social previews: site-wide
 * metadata, per-page metadata and the Person JSON-LD.
 *
 * The rules this output depends on are checked when the module loads, so a
 * violation fails `pnpm build` (and therefore the Vercel deploy).
 */

/** Google truncates longer descriptions in search results. */
const MAX_DESCRIPTION = 155;
/** Social cards often truncate near 125; keep a margin. */
const MAX_SOCIAL_DESCRIPTION = 110;

const allSkills = PROFILE.skills.flatMap((group) => group.items);

const description =
  `Software Engineer with ~${Math.round(PROFILE.yearsOfExperience)} years building scalable SaaS, enterprise, and blockchain platforms using Next.js, React, TypeScript, and Node.js.`;

const ogDescription =
  "Software Engineer building scalable SaaS, enterprise & blockchain platforms with Next.js, React, and Node.js.";

const [firstName, ...otherNames] = PROFILE.name.split(" ");
const lastName = otherNames.join(" ");

/** The experience whose period runs to "Present", if any. */
const currentExperience = EXPERIENCE.find((e) => e.period.endsWith("Present"));

export const siteMetadata: Metadata = {
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
    PROFILE.address.city,
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
    firstName,
    lastName,
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

/** schema.org Person, rendered as JSON-LD on every page. */
export const personJsonLd = {
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
    addressLocality: PROFILE.address.city,
    addressRegion: PROFILE.address.region,
    addressCountry: PROFILE.address.countryCode,
  },
  ...(currentExperience && {
    worksFor: {
      "@type": "Organization",
      name: currentExperience.company,
    },
  }),
  alumniOf: EDUCATION.filter((e) => e.level === "university").map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  knowsAbout: allSkills,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

const getPage = (id: PageId) => {
  const page = PAGES.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown page: ${id}`);
  return page;
};

/** Title, description and canonical URL for a page, from the page registry. */
export const pageMetadata = (id: PageId): Metadata => {
  const { path, title, description } = getPage(id);
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: { canonical: path },
  };
};

// --- Build-time checks -------------------------------------------------------

const check = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`SEO check failed: ${message}`);
};

check(
  description.length <= MAX_DESCRIPTION,
  `site description is ${description.length} chars (max ${MAX_DESCRIPTION})`,
);
check(
  ogDescription.length <= MAX_SOCIAL_DESCRIPTION,
  `social description is ${ogDescription.length} chars (max ${MAX_SOCIAL_DESCRIPTION})`,
);
for (const page of PAGES) {
  check(
    !page.description || page.description.length <= MAX_DESCRIPTION,
    `"${page.id}" description is ${page.description?.length} chars (max ${MAX_DESCRIPTION})`,
  );
}
check(
  EXPERIENCE.filter((e) => e.period.endsWith("Present")).length <= 1,
  "more than one experience runs to \"Present\"",
);
for (const skill of PROFILE.featuredSkills) {
  check(allSkills.includes(skill), `featured skill "${skill}" is not in PROFILE.skills`);
}
