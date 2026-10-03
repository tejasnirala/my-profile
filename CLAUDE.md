# my-profile — Tejas Nirala's portfolio

Personal portfolio + resume site, live at **https://tejas.niralas.in** (deployed on Vercel from `main`).
Fully static: every route is prerendered (SSG) and the site works offline as a PWA.

## Stack
- **Next.js 16** (App Router) · **React 19.2** with the **React Compiler** on (`reactCompiler: true`)
- **TypeScript** (strict) · **Tailwind CSS v4** (CSS-first config, no `tailwind.config`)
- **Serwist** service worker (`@serwist/next`) · **lucide-react** icons · JetBrains Mono via `next/font`
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
│   ├── layout.tsx        Root shell: viewport, no-flash theme script, JSON-LD tag, skip link, Header/Footer
│   ├── page.tsx          /          → AboutSection
│   ├── resume/page.tsx   /resume    → ResumeSection
│   ├── projects/page.tsx /projects  → ProjectsSection
│   ├── contact/page.tsx  /contact   → ContactSection
│   ├── sitemap.ts · robots.ts · manifest.ts
│   ├── icon.tsx · apple-icon.tsx · <route>/opengraph-image.tsx   (generated images via next/og)
│   ├── sw.ts             Serwist service worker source (compiled to public/sw.js at build)
│   └── globals.css       Tailwind v4 tokens (light + .dark), easing tokens, motion + safe-area utilities
├── components/
│   ├── layout/           Header, Footer, NavLinks (client), ThemeToggle (client)
│   ├── sections/         One section per page: About, Resume, Projects, Contact
│   └── ui/               Tiny local primitives: Button (+ buttonClasses), Card (+ CardKicker), Badge, Section, SectionHeader, CommandLine (+ CopyButton, client), Logo, Portrait, TimelineItem
├── assets/               Images imported through next/image (the theme-tinted portrait WebPs)
├── constants/            ALL site content: profile (+ SOCIALS/socialsIn, HIGHLIGHTS, STATS), experience (+ FEATURED_PROJECTS), education, certification, hobbies, contact, pages (the page registry)
└── lib/
    ├── seo.ts            Search + social: siteMetadata, pageMetadata(id), personJsonLd, and build-time SEO checks
    ├── theme.ts          The whole theme: inline no-flash script, toggle, theme-color (localStorage key `theme`)
    ├── palette.ts        Hex copies of the theme tokens for theme-color, the manifest and next/og images
    └── motion.ts         `stagger(n)` for the `enter` entrance utility
public/                   Resume PDF, certificate images/PDFs (served and precached by the service worker, so keep it small)
design/                   Source art and dev-only scripts, not deployed: portrait sketches + tint.py, favicon.py
```

**Data flow:** `constants/*` → `components/sections/*` → `app/<route>/page.tsx`. Each `page.tsx` only exports `metadata = pageMetadata('<id>')` and renders its section. `constants/pages.ts` is the single list of pages; nav and sitemap read it too. Content edits almost never need component changes.

## Key conventions
- **Server components by default.** Only `NavLinks`, `ThemeToggle` and `CopyButton` are `"use client"`. To style a link as a button, use `buttonClasses()` on an `<a>`/`<Link>` instead of `<Button>`, so the component stays server-rendered.
- **React Compiler handles memoization.** Don't add `useMemo`, `useCallback` or `React.memo`.
- **Colors come from semantic tokens** (`bg-background`, `text-muted-foreground`, `border-border`, `bg-primary`…) defined in `globals.css`. Never hardcode colors in components. Places that can't read CSS variables (theme-color meta, manifest, `next/og` images) import hex values from `lib/palette.ts`; keep it equal to the tokens.
- **Components:** one folder per component with `index.tsx`, a named arrow-function export (`export const X = () =>`), props typed as `type XProps = {…}`, and `className` merged with template strings (there's no `clsx`/`cn`).
- **Imports:** use the `@/` alias (`@/components/...`, `@/constants/...`) in new code. Older files use relative paths; leave them alone unless you're already editing that file.
- **Quotes:** match the file you're in (components use single quotes; app/config files use double quotes).
- **Canonical URL:** always derive URLs from `PROFILE.url`. Never hardcode the domain.
- **`vercel-react-best-practices` skill** (installed via `npx skills`, tracked in `skills-lock.json`): use it for performance guidance, but this file wins on conflicts. Skip its `rerender-memo*`/`useMemo`/`useCallback` advice (the React Compiler does this) and its data-fetching/SWR/server-action rules (the site is static with no data fetching).
- **Design/motion skills** (`emil-design-eng`, `animate`, `review-animations`, `apple-design`, etc. from `emilkowalski/skills`): prefer CSS transitions/WAAPI over adding a motion library, keep animated pieces as small client leaves, and respect `prefers-reduced-motion`. The motion system already exists, so extend it rather than adding a parallel one: easing tokens in `globals.css`, the `enter`/`reveal`/`scroll-progress` utilities, press feedback in `buttonClasses`, the clip-path nav pill in `NavLinks`, and the View Transition theme crossfade in `lib/theme.ts`. See `.claude/rules/components.md` for the class patterns. `/prototype` routes (`src/app/prototypes/**`) are temporary: never commit them or add them to the sitemap. Any library `/pick-ui-library` suggests is installed with `pnpm add`.
- **Fonts:** the whole site is set in JetBrains Mono, deliberately: the monospace, developer-tool look is the brand. It's loaded through `next/font`, so it's self-hosted, preloaded and has no layout shift. The `--font-mono` token lives in `@theme inline` because next/font defines its variable on `<body>`, not `:root`; a plain `@theme` token would resolve to nothing and fall back to sans-serif.
- **Visual language** (modelled on px0.ai): square corners (`--radius: 0`), hairline borders, a fixed `bg-texture` (grid + scanlines) behind the page, full-width `Section` bands divided by hairlines, `// eyebrow` + headline with an orange second half (`SectionHeader`), numbered caps kickers on cards (`CardKicker`), `brand` orange for accents, `highlight` amber for the one primary action per view, `logo` amber for the wordmark brackets, and an oversized faded wordmark closing the footer.
- **App icons:** tabs show the `[n]` monogram; Google results, iOS and the PWA show the portrait. `icon.tsx` emits two icons via `generateImageMetadata`: `/icon/tab` (32px, `monogramMark`) and `/icon/search` (192px, `portraitMark`). Browsers pick the size closest to a tab; Google only accepts multiples of 48px, so every icon ≥48px must be the portrait and the monogram must stay below 48 (`app/favicon.ico` is 16/32 only, generated from `/icon/tab` by `python3 design/favicon.py` against a running `pnpm start`). `apple-icon.tsx` and the PWA icons (`app/pwa-icon/[variant]`) use `portraitMark` too. The portrait crop (`assets/portrait-icon.png`) is made by `design/portrait/tint.py`.
- **Share cards:** each page has its own link-preview card, rendered by `lib/share-card.tsx` from `app/<route>/opengraph-image.tsx` (X falls back to it; there is no twitter-image). `CARDS` there sets each page's eyebrow, heading (matching the page header), byline and chips; every card has the portrait (`assets/portrait-share.png`) and the availability line, in JetBrains Mono TTFs from `assets/fonts` (OFL, keep `OFL.txt`; next/og can't use the site's woff2). Keep every card under ~300 KB or WhatsApp drops the preview: the share portrait is drawn at its exact size and posterized to 16 grey levels in `tint.py` for that reason.
- **Portrait:** `ui/Portrait` shows `assets/portrait-{dark,light}.webp`, swapped by the `.dark` class (dark is preloaded, light is lazy). Both are generated from the sketches in `design/portrait/` by `python3 design/portrait/tint.py`, which maps grey levels onto the theme colors; rerun it if the palette changes. Never put the multi-MB source PNGs in `public/`.
- **Responsive targets:** phones and tablets in portrait and landscape, plus desktop. `short:` is a custom variant for landscape phones (wide but under 32rem tall); `pointer-coarse:` gives 44px touch targets; `gutter` clears the notch.

## Accessibility
Target: **WCAG 2.2 AA** on every page, both themes, 320px wide upward.
- Structure: one `<h1>` per page, no skipped levels, real lists (`role="list"` restores list semantics that Safari drops under Tailwind's `list-style: none`), landmarks `header`/`nav` (labelled)/`main`/`footer`, and a skip link to `#main`.
- Contrast: text ≥ 4.5:1 (`--muted-foreground` was tuned for this on `--secondary` chips); the active nav page is shown by text contrast as well as the pill, plus an underline in forced-colors mode.
- Focus: visible ring on everything interactive, `outline-hidden` (not `outline-none`) so it survives Windows High Contrast, and `scroll-padding-top` keeps focus clear of the fixed header.
- Names: external links announce the new tab (`NewTabHint`), the resume link says "(PDF)", the theme toggle is "Dark mode" with `aria-pressed`.
- Motion: every animation has a `prefers-reduced-motion` version; print styles disable reveals so the resume prints fully.
- Verify with Chrome DevTools → Lighthouse → Accessibility (or the axe extension) on `pnpm build && pnpm start`, keyboard-only navigation, and VoiceOver.

## Gotchas
- **Use pnpm only for installs.** Never run `npm install`/`npm i`, which updates only the stale `package-lock.json` and breaks the Vercel deploy (`ERR_PNPM_OUTDATED_LOCKFILE`). `pnpm-workspace.yaml` is git-ignored on purpose.
- **Measure performance and SEO only on a production build.** `pnpm dev` serves unminified JS and streams metadata into the page late, so Lighthouse reports a slow LCP and a missing meta description/canonical that don't exist in production. `pnpm dev` also overwrites the production output in `.next`, so always `pnpm build` again before `pnpm start`. Use an Incognito window so extensions don't show up as "unused JS" or third parties. Baseline (mobile): Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- **CSS is inlined into the HTML** (`experimental.inlineCss` in `next.config.ts`) to remove a render-blocking request on slow networks. Next also embeds the CSS in the page data, so keep the stylesheet small.
- **Serwist is production-only.** `next.config.ts` skips the Serwist wrapper in dev, and `build` must keep `--webpack` (Serwist conflicts with Turbopack). To test offline/PWA behavior, run `pnpm build && pnpm start`, not `pnpm dev`. `public/sw.js` is generated and git-ignored.
- **Theme logic lives only in `lib/theme.ts`.** It builds the inline `<head>` script (no flash of the wrong theme, keeps `<meta name="theme-color">` in sync, and enables `:active` on iOS) and the toggle. Dark is the default. The toggle icon is picked by CSS (`dark:`), not React state.
- **SEO rules fail the build.** `lib/seo.ts` checks on load that descriptions fit (155 site/page, 110 social), at most one experience runs to "Present" (that one is JSON-LD `worksFor`), and every `featuredSkills` entry is a listed skill. A `SEO check failed:` error in `pnpm build` means fix the data, not the check. `alumniOf` lists education with `level: "university"`.
- **The share image shows `PROFILE.featuredSkills`**, filtered against `PROFILE.skills`. If a skill is renamed, update `featuredSkills` too.
- **`next/og` (Satori) layout:** any `<div>` with more than one child needs `display: "flex"` or the build fails.
- **Ignore the `baseline-browser-mapping` "data is over two months old" build warning.** It's harmless, and that package was removed on purpose (commit 96a9789).
- **Lint baseline:** `pnpm lint` is clean (0 errors, 0 warnings). Generated `public/sw.js` is ignored in `eslint.config.mjs`. Keep it clean.

## Workflow
- After changes: `pnpm exec tsc --noEmit` → `pnpm lint` (must stay clean) → `pnpm build` for anything touching `app/`, config or dependencies.
- Commit style: `type: summary` with `feat`, `fix`, `polish`, `content`, `seo`, `refactor`, `chore`. See `.claude/rules/git.md`.
- Pushing to `main` deploys to production, so only push when asked.
