# my-profile — Tejas Nirala's portfolio

Personal portfolio + resume site, live at **https://tejas.niralas.in** (deployed on Vercel from `main`).
Fully static: every route is prerendered (SSG) and the site works offline as a PWA.

## Stack
- **Next.js 16** (App Router) · **React 19.2** with the **React Compiler** on (`reactCompiler: true`)
- **TypeScript** (strict) · **Tailwind CSS v4** (CSS-first config, no `tailwind.config`)
- **Serwist** service worker (`@serwist/next`) · **lucide-react** icons · Geist fonts via `next/font`
- No backend, no API routes, no database, no tests.

## Commands
Package manager is **pnpm** (`pnpm-lock.yaml` is what Vercel installs with `--frozen-lockfile`).

| Task | Command |
|---|---|
| Dev server (Turbopack, no service worker) | `pnpm dev` → http://localhost:3000 |
| Typecheck | `pnpm exec tsc --noEmit` |
| Lint | `pnpm lint` |
| Production build (webpack + service worker) | `pnpm build` |
| Serve the production build | `pnpm start` |
| Add/update a dependency | `pnpm add <pkg>` — then commit `pnpm-lock.yaml` |

Use the `/verify` skill to run the full check sequence.

## Architecture
```
src/
├── app/                  Routes + metadata (server components)
│   ├── layout.tsx        Global <head>: site metadata, JSON-LD Person schema, no-flash theme script, Header/Footer
│   ├── page.tsx          /          → AboutSection
│   ├── resume/page.tsx   /resume    → ResumeSection
│   ├── projects/page.tsx /projects  → ProjectsSection
│   ├── contact/page.tsx  /contact   → ContactSection
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── icon.tsx · apple-icon.tsx · opengraph-image.tsx · twitter-image.tsx   (generated images via next/og)
│   ├── sw.ts             Serwist service worker source (compiled to public/sw.js at build)
│   └── globals.css       Tailwind v4 tokens (light + .dark), easing tokens, motion + safe-area utilities
├── components/
│   ├── layout/           Header, Footer, NavLinks (client), ThemeToggle (client)
│   ├── sections/         One section per page: About, Resume, Projects, Contact
│   └── ui/               Tiny local primitives: Button (+ buttonClasses), Card, Badge, Separator, TimelineItem
├── constants/            ALL site content: profile (+ SOCIAL_LINKS, HIGHLIGHTS), experience (+ FEATURED_PROJECTS), education, certification, hobbies, contact, pages (the page registry)
└── lib/
    ├── pages.ts          `pageMetadata(id)` for each page.tsx, from the page registry
    ├── theme.ts          The whole theme: inline no-flash script, toggle, theme-color (localStorage key `theme`)
    └── motion.ts         `stagger(n)` for the `enter` entrance utility
public/                   Resume PDF, certificate images/PDFs
```

**Data flow:** `constants/*` → `components/sections/*` → `app/<route>/page.tsx`. Each `page.tsx` only exports `metadata = pageMetadata('<id>')` and renders its section. `constants/pages.ts` is the single list of pages; nav and sitemap read it too. Content edits almost never need component changes.

## Key conventions
- **Server components by default.** Only `NavLinks` and `ThemeToggle` are `"use client"`. To style a link as a button, use `buttonClasses()` on an `<a>`/`<Link>` instead of `<Button>`, so the component stays server-rendered.
- **React Compiler handles memoization.** Don't add `useMemo`, `useCallback` or `React.memo`.
- **Colors come from semantic tokens** (`bg-background`, `text-muted-foreground`, `border-border`, `bg-primary`…) defined in `globals.css`. Never hardcode colors in components. The only exception is `next/og` image files, which need inline styles and hex values.
- **Components:** one folder per component with `index.tsx`, a named arrow-function export (`export const X = () =>`), props typed as `type XProps = {…}`, and `className` merged with template strings (there's no `clsx`/`cn`).
- **Imports:** use the `@/` alias (`@/components/...`, `@/constants/...`) in new code. Older files use relative paths; leave them alone unless you're already editing that file.
- **Quotes:** match the file you're in (components use single quotes; app/config files use double quotes).
- **Canonical URL:** always derive URLs from `PROFILE.url`. Never hardcode the domain.
- **`vercel-react-best-practices` skill** (installed via `npx skills`, tracked in `skills-lock.json`): use it for performance guidance, but this file wins on conflicts. Skip its `rerender-memo*`/`useMemo`/`useCallback` advice (the React Compiler does this) and its data-fetching/SWR/server-action rules (the site is static with no data fetching).
- **Design/motion skills** (`emil-design-eng`, `animate`, `review-animations`, `apple-design`, etc. from `emilkowalski/skills`): prefer CSS transitions/WAAPI over adding a motion library, keep animated pieces as small client leaves, and respect `prefers-reduced-motion`. The motion system already exists, so extend it rather than adding a parallel one: easing tokens in `globals.css`, the `enter`/`reveal`/`scroll-edge` utilities, press feedback in `buttonClasses`, the clip-path nav pill in `NavLinks`, and the View Transition theme crossfade in `lib/theme.ts`. See `.claude/rules/components.md` for the class patterns. `/prototype` routes (`src/app/prototypes/**`) are temporary: never commit them or add them to the sitemap. Any library `/pick-ui-library` suggests is installed with `pnpm add`.
- **Responsive targets:** phones and tablets in portrait and landscape, plus desktop. `short:` is a custom variant for landscape phones (wide but under 32rem tall); `pointer-coarse:` gives 44px touch targets; `gutter` clears the notch.

## Gotchas
- **Use pnpm only for installs.** Never run `npm install`/`npm i`, which updates only the stale `package-lock.json` and breaks the Vercel deploy (`ERR_PNPM_OUTDATED_LOCKFILE`). `pnpm-workspace.yaml` is git-ignored on purpose.
- **Serwist is production-only.** `next.config.ts` skips the Serwist wrapper in dev, and `build` must keep `--webpack` (Serwist conflicts with Turbopack). To test offline/PWA behavior, run `pnpm build && pnpm start`, not `pnpm dev`. `public/sw.js` is generated and git-ignored.
- **Theme logic lives only in `lib/theme.ts`.** It builds the inline `<head>` script (no flash of the wrong theme, keeps `<meta name="theme-color">` in sync, and enables `:active` on iOS) and the toggle. Dark is the default. The toggle icon is picked by CSS (`dark:`), not React state.
- **JSON-LD depends on data order:** `worksFor` uses `EXPERIENCE[0]`, so the current job must stay first, and `alumniOf` only includes schools whose name contains "University".
- **The share image shows `PROFILE.featuredSkills`**, filtered against `PROFILE.skills`. If a skill is renamed, update `featuredSkills` too.
- **`next/og` (Satori) layout:** any `<div>` with more than one child needs `display: "flex"` or the build fails.
- **Ignore the `baseline-browser-mapping` "data is over two months old" build warning.** It's harmless, and that package was removed on purpose (commit 96a9789).
- **Lint baseline:** `pnpm lint` is clean (0 errors, 0 warnings). Generated `public/sw.js` is ignored in `eslint.config.mjs`. Keep it clean.

## Workflow
- After changes: `pnpm exec tsc --noEmit` → `pnpm lint` (must stay clean) → `pnpm build` for anything touching `app/`, config or dependencies.
- Commit style: `type: summary` with `feat`, `fix`, `polish`, `content`, `seo`, `refactor`, `chore`. See `.claude/rules/git.md`.
- Pushing to `main` deploys to production, so only push when asked.
