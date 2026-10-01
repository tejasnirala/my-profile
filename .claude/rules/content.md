---
paths: ["src/constants/**", "public/**"]
---
# Site content

`src/constants/*` is the single source of truth for everything shown on the site, and it mirrors the resume PDF.

- **Facts are written once.** Years of experience is `YEARS_OF_EXPERIENCE` in `constants/profile.ts`; `about`, the site description and the /resume description all derive from it. Socials go through `SOCIAL_LINKS`. Don't hardcode a fact in a component or metadata string. Project facts (e.g. "500+ users") appear in both `constants/projects.ts` and `constants/experience.ts`. Use the `/update-content` skill for resume-driven updates.
- `EXPERIENCE` is newest-first, and `EXPERIENCE[0]` feeds JSON-LD `worksFor`.
- Achievement bullets: start with a past-tense action verb and include a metric where the resume has one.
- `public/Tejas_Nirala_Resume.pdf` is linked from ResumeSection and the sitemap. Replace the file in place and keep the filename.
- Certificate files live in `public/` and are referenced by `file: "/<name>"` in `CERTIFICATIONS` (`constants/certification.ts`).
- Don't invent or embellish facts, metrics, dates or employers. If something is unclear, ask.
