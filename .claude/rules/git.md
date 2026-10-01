# Git & deploy

- `main` auto-deploys to production on Vercel. Commit or push only when asked; never force-push.
- Commit format, matching history: `type: short lowercase summary`
  - `feat` new section/route/capability · `fix` bug or broken deploy · `polish` visual refinement
  - `content` resume/profile/project text or PDF · `seo` metadata, OG, sitemap, structured data
  - `refactor` restructuring without behavior change · `chore` deps/config
- One logical change per commit. Content updates and code changes go in separate commits.
- If dependencies changed, the commit must include `pnpm-lock.yaml`. Never commit changes to `package-lock.json`.
