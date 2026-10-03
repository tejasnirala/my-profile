---
paths: ["src/constants/**", "public/**"]
---
# Site content

`src/constants/*` is the single source of truth for everything shown on the site, and it mirrors the resume PDF.

- **Facts are written once.** Experience is never typed in: `workedMonths()` (`constants/experience.ts`) counts the months in every `EXPERIENCE` period ("Present" = the build month), and `constants/profile.ts` turns that into `experienceDuration` (years.months: 3 years 1 month is "3.1 years", 2 years 11 months is "2.11 years"), the stats card and `yearsOfExperience` (decimal, rounded to "~3" in the site description). `about`, the stats grid, the /resume intro and both descriptions derive from it, so it moves forward on each deploy. The phone number is deliberately not on the site (not in components, contact links or JSON-LD); contact is by email. Socials are one table (`SOCIALS` in `constants/profile.ts`): a row per profile with `groups` ("contact" = Contact page + footer Contact column, "elsewhere" = footer coding profiles); read them with `socialsIn(group)`, and every profile goes into JSON-LD `sameAs`. Don't hardcode a fact in a component or metadata string. Featured projects are engagements with a `feature` in `constants/experience.ts`; there is no separate projects list. Use the `/update-content` skill for resume-driven updates.
- `EXPERIENCE` is newest-first. The experience whose period ends in "Present" is the current employer (JSON-LD `worksFor`); the build fails if two do.
- Achievement bullets: start with a past-tense action verb and include a metric where the resume has one.
- `public/Tejas_Nirala_Resume.pdf` is linked from ResumeSection and the sitemap. Replace the file in place and keep the filename.
- Certificate files live in `public/` and are referenced by `file: "/<name>"` in `CERTIFICATIONS` (`constants/certification.ts`).
- Don't invent or embellish facts, metrics, dates or employers. If something is unclear, ask.
