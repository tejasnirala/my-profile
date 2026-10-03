import { EXPERIENCE, workedMonths } from "./experience";

// Experience is derived from the dates in `EXPERIENCE`, never typed in: it feeds
// `about`, the stats grid, the site description and the /resume description.
const MONTHS_WORKED = workedMonths(EXPERIENCE);
const YEARS = Math.floor(MONTHS_WORKED / 12);
const MONTHS = MONTHS_WORKED % 12;
/**
 * Years and months written as "years.months": 3 years 1 month is "3.1",
 * 2 years 11 months is "2.11", a whole number of years is just "3".
 */
const EXPERIENCE_FIGURE = MONTHS ? `${YEARS}.${MONTHS}` : String(YEARS);
/** "3.1 years", for prose. */
const EXPERIENCE_DURATION = `${EXPERIENCE_FIGURE} ${EXPERIENCE_FIGURE === "1" ? "year" : "years"}`;

export const PROFILE = {
  name: "Tejas Nirala",
  title: "Software Engineer",
  url: "https://tejas.niralas.in",
  email: "tejasnirala4@gmail.com",
  /** Decimal years, e.g. 3.1, for places that round it ("~3 years"). */
  yearsOfExperience: Math.round((MONTHS_WORKED / 12) * 10) / 10,
  /** "3.1 years" (years.months), for prose. */
  experienceDuration: EXPERIENCE_DURATION,
  address: { city: "Jaipur", region: "Rajasthan", country: "India", countryCode: "IN" },
  about: `Software Engineer specializing in React and Node.js with ${EXPERIENCE_DURATION} of experience architecting scalable SaaS, enterprise, and blockchain platforms across fintech, supply chain, and HR domains. I own features end-to-end — from system design to delivery — building performant frontend systems, designing distributed backend services, and driving measurable improvements in reliability, security, and team productivity.`,
  headline: { lead: "Building digital", emphasis: "experiences that matter." },
  /** One line for the footer and other tight spots. */
  tagline: "Software engineer building fast, scalable web platforms with React, Node.js and AWS.",
  /** Alt text for the sketched portrait on the home page. */
  portraitAlt: "Pencil-sketch portrait of Tejas Nirala in a dark blazer and white shirt",
  /** The status chip at the top of the home page and in the footer. */
  availability: "Open to new opportunities",
  skills: [
    { label: "Languages", items: ["C++", "TypeScript", "JavaScript", "Python", "SQL"] },
    { label: "Frontend", items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "MUI", "Shadcn/ui"] },
    { label: "Backend & Databases", items: ["Node.js", "REST APIs", "MongoDB", "PostgreSQL", "Redis"] },
    { label: "Cloud Infrastructure", items: ["AWS EC2", "S3", "IAM", "CloudWatch"] },
    { label: "DevOps", items: ["Docker", "CI/CD Pipeline", "Nginx", "Git", "Postman"] },
  ],
  // Shown on the social share image. Must match names in `skills` above.
  featuredSkills: ["React.js", "Next.js", "Node.js", "TypeScript", "AWS EC2", "Docker", "MongoDB"],
};

/** Where a profile is listed besides the structured data every profile goes into. */
type SocialGroup = "contact" | "elsewhere";

type Social = {
  id: string;
  label: string;
  /** Without the scheme; shown as-is on the Contact page. */
  url: string;
  /** "contact": the Contact page and the footer's Contact column (after Email).
      "elsewhere": the footer's Elsewhere column (coding profiles). None: listed
      only in JSON-LD `sameAs` (GitHub also has the header icon). */
  groups: SocialGroup[];
};

/** Every profile, in display order. To add one, add a row here. */
const SOCIALS: Social[] = [
  { id: "linkedin", label: "LinkedIn", url: "linkedin.com/in/tejasnirala", groups: ["contact"] },
  { id: "github", label: "GitHub", url: "github.com/tejasnirala", groups: [] },
  { id: "takeuforward", label: "TakeUForward", url: "takeuforward.org/profile/tejasnirala", groups: ["elsewhere"] },
  { id: "instagram", label: "Instagram", url: "instagram.com/tejas_nirala", groups: ["contact"] },
  { id: "x", label: "X (Twitter)", url: "x.com/tejas_nirala", groups: ["contact"] },
  { id: "leetcode", label: "LeetCode", url: "leetcode.com/u/tejas_nirala", groups: ["elsewhere"] },
  { id: "codechef", label: "CodeChef", url: "codechef.com/users/tejas_nirala", groups: ["elsewhere"] },
  { id: "hackerrank", label: "HackerRank", url: "hackerrank.com/profile/tejasnirala4", groups: ["elsewhere"] },
];

export const SOCIAL_LINKS = SOCIALS.map((social) => ({ ...social, href: `https://${social.url}` }));

/** The profiles listed in one place, in display order. */
export const socialsIn = (group: SocialGroup) => SOCIAL_LINKS.filter((link) => link.groups.includes(group));

/** Intro under the Resume page heading. */
export const RESUME_INTRO = `${PROFILE.title} with ${PROFILE.experienceDuration} of experience across SaaS, enterprise and blockchain platforms.`;

/** Intro under the "Tools I ship with." heading on the home page. */
export const SKILLS_INTRO = "The languages, frameworks and infrastructure I reach for, from the first commit to production.";

/** The 2×2 numbers grid on the home page. All figures come from the resume. */
export const STATS = [
  {
    parts: [{ value: EXPERIENCE_FIGURE, unit: EXPERIENCE_FIGURE === "1" ? "yr" : "yrs" }],
    label: "Experience",
    detail: "React · Node.js · AWS",
  },
  { parts: [{ value: "40", unit: "%" }], label: "Faster loads", detail: "code-splitting on KBAI", featured: true },
  { parts: [{ value: "500+", unit: "" }], label: "Users served", detail: "Cablinks HR & accounting" },
  { parts: [{ value: "15", unit: "%" }], label: "Throughput", detail: "Skuchain blockchain SDK" },
] as const;

export const HIGHLIGHTS = [
  {
    label: "Systems",
    title: "Backend & Systems",
    body: "Experience optimizing blockchain throughput by 15% and reducing API latency. Proficient in C++, TypeScript, and Node.js microservices.",
  },
  {
    label: "Interfaces",
    title: "Frontend Architecture",
    body: "Expert in building scalable UI libraries with React and MUI. Focus on performance metrics, reducing initial load times by 40% through code-splitting.",
  },
] as const;
