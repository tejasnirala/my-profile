---
name: update-content
description: Update portfolio content — new job, role/title change, years of experience, skills, projects, achievements, education, certifications, or a new resume PDF — and keep every place that repeats those facts in sync. Use when asked to update the resume, profile, experience, skills or projects, or to "sync the site with my resume".
---

# Update site content

The site mirrors the resume. Most changes are data-only, in `src/constants/`. The risk is a fact repeated somewhere else that goes stale.

## Where each fact lives

| Fact | Update in |
|---|---|
| Name, title, email, phone, location, socials | `constants/profile.ts`. Title also feeds page titles, OG image, manifest and JSON-LD automatically. Social URLs flow through `SOCIAL_LINKS` to the header buttons, contact card, footer and JSON-LD `sameAs`. |
| About paragraph | `constants/profile.ts` → `about` (also the JSON-LD `description`) |
| **Years of experience** | `YEARS_OF_EXPERIENCE` in `constants/profile.ts` only. `about`, the site description (rounded, "~3 years") and the /resume description derive from it. |
| Skills | `constants/profile.ts` `skills`. If a skill in `featuredSkills` (shown on the share image) is renamed or removed, update that list too. |
| Hero headline, About highlight cards | `constants/profile.ts` `headline` and `HIGHLIGHTS` |
| Contact page copy | `constants/contact.ts` |
| Jobs, engagements and achievements | `constants/experience.ts`, newest first (`[0]` = current employer, used by JSON-LD `worksFor`) |
| Featured projects | `constants/experience.ts`: give the engagement a `feature` (`summary`, `tags`, `link`) and, if its name is long, a `shortName`. The Projects page lists featured engagements in resume order. Summaries never contain metrics; those live in achievements. |
| Education | `constants/education.ts` (schools containing "University" go into JSON-LD `alumniOf`) |
| Certifications | `CERTIFICATIONS` in `constants/certification.ts` + file in `public/` (`file: "/Name.jpg"`) |
| Hobbies | `constants/hobbies.ts` |
| Resume PDF | Replace `public/Tejas_Nirala_Resume.pdf` in place and keep the filename |
| Site/OG descriptions that mention the stack or domains | `app/layout.tsx` (`description` ≤ 155 chars, `ogDescription` ≤ 110 chars) and the description in each `app/*/page.tsx` |

## Process
1. Get the new facts from the user, or from the resume PDF if they provide one. Don't invent metrics, dates or wording beyond what they give.
2. Edit the constants first, then every location from the table above that repeats the fact.
3. Search for stale values and confirm no old value remains:
   `grep -rnE "<old value>|years|<old title>|<old company>" src`
4. Re-check description character counts after any text change.
5. Run the `/verify` skill.
6. Commit as `content: <summary>`. If the PDF changed, use a separate `content: update resume PDF` commit to match history.
