// Single source for years of experience: feeds `about`, the site description and
// the /resume description.
const YEARS_OF_EXPERIENCE = 2.8;

export const PROFILE = {
  name: "Tejas Nirala",
  title: "Software Engineer",
  url: "https://tejas.niralas.in",
  email: "tejasnirala4@gmail.com",
  phone: "+91-9771957520",
  yearsOfExperience: YEARS_OF_EXPERIENCE,
  address: { city: "Jaipur", region: "Rajasthan", country: "India", countryCode: "IN" },
  socials: {
    linkedin: "linkedin.com/in/tejas-nirala",
    github: "github.com/tejasnirala",
    takeuforward: "takeuforward.org/profile/tejas_nirala"
  },
  about: `Software Engineer specializing in React and Node.js with ${YEARS_OF_EXPERIENCE} years architecting scalable SaaS, enterprise, and blockchain platforms across fintech, supply chain, and HR domains. I own features end-to-end — from system design to delivery — building performant frontend systems, designing distributed backend services, and driving measurable improvements in reliability, security, and team productivity.`,
  headline: { lead: "Building digital", emphasis: "experiences that matter." },
  /** One line for the footer and other tight spots. */
  tagline: "Software engineer building fast, scalable web platforms with React, Node.js and AWS.",
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

export const SOCIAL_LINKS = [
  { id: "linkedin", label: "LinkedIn", href: `https://${PROFILE.socials.linkedin}` },
  { id: "github", label: "GitHub", href: `https://${PROFILE.socials.github}` },
  { id: "takeuforward", label: "TakeUForward", href: `https://${PROFILE.socials.takeuforward}` },
] as const;

/** The 2×2 numbers grid on the home page. All figures come from the resume. */
export const STATS = [
  { value: String(YEARS_OF_EXPERIENCE), unit: "yrs", label: "Experience", detail: "React · Node.js · AWS" },
  { value: "40", unit: "%", label: "Faster loads", detail: "code-splitting on KBAI", featured: true },
  { value: "500+", unit: "", label: "Users served", detail: "Cablinks HR & accounting" },
  { value: "15", unit: "%", label: "Throughput", detail: "Skuchain blockchain SDK" },
] as const;

export const HIGHLIGHTS = [
  {
    icon: "terminal",
    label: "Systems",
    title: "Backend & Systems",
    body: "Experience optimizing blockchain throughput by 15% and reducing API latency. Proficient in C++, TypeScript, and Node.js microservices.",
  },
  {
    icon: "globe",
    label: "Interfaces",
    title: "Frontend Architecture",
    body: "Expert in building scalable UI libraries with React and MUI. Focus on performance metrics, reducing initial load times by 40% through code-splitting.",
  },
] as const;
