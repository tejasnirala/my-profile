/** A body of work within one experience. A `feature` puts it on the Projects page. */
export type Engagement = {
  name: string;
  /** Used where the full name won't fit, e.g. project cards. */
  shortName?: string;
  achievements: string[];
  feature?: {
    summary: string;
    tags: string[];
    link: string;
  };
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  engagements: Engagement[];
};

/** Newest first. An entry whose period ends in "Present" is the current employer (`isCurrent`). */
export const EXPERIENCE: Experience[] = [
  {
    company: "Briskcovey Technologies",
    role: "Full Stack Engineer",
    period: "Jun 2025 - Aug 2026",
    location: "Jaipur, Rajasthan",
    engagements: [
      {
        name: "KBAI: Business AI Platform",
        feature: {
          summary: "A comprehensive business AI platform focusing on scalable UI and secure access.",
          tags: ["NextJs", "MUI", "Cypress", "Auth0", "i18n"],
          link: "https://app-kbai.aionsoft.it"
        },
        achievements: [
          "Architected modular, reusable, and scalable UI components using the MUI library, enforcing consistent design patterns across the platform and reducing code duplication by 25%.",
          "Engineered frontend performance improvements — code-splitting, lazy loading, debounced input handling, and component memoization — reducing initial load time by 40%.",
          "Designed fine-grained Role-Based Access Control (RBAC) at page, component, and API levels, reducing unnecessary API calls by 30%.",
          "Owned end-to-end Auth0-based authentication integration with JSON Web Tokens (JWT), enhancing system security and reducing authentication-related errors by 20%.",
          "Implemented internationalization (i18n) to enable multi-language support, adding 2 languages and expanding platform accessibility to non-English speaking users."
        ]
      },
      {
        name: "Cablinks: HR and Accounting Management System",
        shortName: "Cablinks HR System",
        feature: {
          summary: "End-to-end accounting and HR management system handling inventory, billing, and payroll.",
          tags: ["NodeJs", "Mongoose", "Payroll Logic", "Team Lead"],
          link: "https://cablinks.org/"
        },
        achievements: [
          "Led a team of 3 developers in architecting and delivering an end-to-end accounting management system covering inventory control, quotation handling, billing, and transaction recording for 500+ users.",
          "Optimized the payroll sub-module with multi-factor salary computation (attendance, allowances, taxes, deductions), reducing payroll errors by 20%."
        ]
      }
    ]
  },
  {
    company: "Cybernext Pvt Ltd",
    role: "Software Development Engineer",
    period: "Jul 2023 - Feb 2025",
    location: "Mohali, Punjab",
    engagements: [
      {
        name: "Skuchain - Blockchain-Based Supply Chain and Trade Finance Solutions",
        shortName: "Skuchain SDK Revamp",
        feature: {
          summary: "Blockchain-based supply chain solution. Migrated Cosmos-SDK to EVM chain and built CLI tools.",
          tags: ["TypeScript", "Node.js", "Yargs CLI", "OOPs", "SOLID", "DRY"],
          link: "https://www.skuchain.com"
        },
        achievements: [
          "Engineered a revamped SDK for a microservices-based distributed system, applying OOPs, SOLID, and DRY design patterns to migrate from Cosmos-SDK to an EVM-based chain, improving blockchain throughput by 15%.",
          "Designed and built 20+ RESTful API endpoints and Payload CMS hooks for a multi-tenant CMS, facilitating seamless data exchange and reducing blockchain processing latency by 12% for faster transaction confirmation.",
          "Streamlined blockchain and database management workflows via a Yargs CLI tool, minimizing manual scripting efforts and reducing human error rates during database updates by 15%.",
          "Authored detailed project documentation with VitePress, decreasing clarification requests from stakeholders by 40% and accelerating onboarding for new team members.",
          "Collaborated with teams across time zones on sprint planning, retrospectives, and daily standups to support monthly releases of 3+ features using Agile methodology."
        ]
      }
    ]
  }
];

const MONTH_NAMES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const PRESENT = /^present$/i;

/** Splits "Mon YYYY - Mon YYYY" (hyphen, en or em dash) into its two ends. */
const periodEnds = (period: string) => {
  const ends = period.split(/\s*[-–—]\s*/);
  if (ends.length !== 2) throw new Error(`Experience period must be "Mon YYYY - Mon YYYY" or "Mon YYYY - Present": "${period}"`);
  return ends as [string, string];
};

/** Whether an experience runs to "Present", i.e. is the current employer. */
export const isCurrent = ({ period }: Experience) => PRESENT.test(periodEnds(period)[1].trim());

/** A "Mon YYYY" date (or "Present", meaning the current month) as a month count. */
const toMonth = (label: string, now: Date) => {
  if (PRESENT.test(label.trim())) return now.getFullYear() * 12 + now.getMonth();
  const [month = "", year = ""] = label.trim().split(/\s+/);
  const index = MONTH_NAMES.indexOf(month.slice(0, 3).toLowerCase());
  if (index < 0 || !/^\d{4}$/.test(year)) throw new Error(`Unrecognised experience date: "${label}" (expected "Mon YYYY")`);
  return Number(year) * 12 + index;
};

/**
 * Total months worked, from the `period` of every experience. Both ends count
 * (Jul 2023 - Feb 2025 is 20 months), each calendar month is counted once so
 * overlapping roles aren't double-counted, and "Present" runs to the current
 * month. Evaluated at build time, so the figure moves forward with each deploy.
 */
export const workedMonths = (experience: Experience[], now = new Date()) => {
  const months = new Set<number>();
  for (const { period } of experience) {
    const [start, end] = periodEnds(period);
    const from = toMonth(start, now);
    const to = toMonth(end, now);
    if (from > to) throw new Error(`Experience period ends before it starts: "${period}"`);
    for (let month = from; month <= to; month++) months.add(month);
  }
  return months.size;
};

export const FEATURED_PROJECTS_INTRO = "A selection of projects I've engineered and led.";

/** Featured engagements in resume order, with the experience they belong to. */
export const FEATURED_PROJECTS = EXPERIENCE.flatMap((experience) =>
  experience.engagements.flatMap((engagement) =>
    engagement.feature
      ? [{
          ...engagement.feature,
          title: engagement.shortName ?? engagement.name,
          company: experience.company,
          role: experience.role,
        }]
      : [],
  ),
);
