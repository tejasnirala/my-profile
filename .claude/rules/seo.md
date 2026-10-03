---
paths: ["src/app/**"]
---
# SEO & metadata

- Every page is registered in `constants/pages.ts` and its `page.tsx` exports `metadata = pageMetadata('<id>')`, which supplies `title` (the layout template appends ` | Tejas Nirala`), `description` and the canonical URL. Descriptions build names and places from `PROFILE`.
- Description lengths: page and site descriptions **≤ 155 chars** (Google truncates beyond that); OG/Twitter descriptions **≤ 110 chars**. `lib/seo.ts` enforces both at build time.
- Nav and `app/sitemap.ts` read the same registry, so adding a page is one entry (see the `/add-page` skill).
- Canonical URLs and `robots: index` are set per page by `pageMetadata()`, never in the layout, so `app/not-found.tsx` stays `noindex` with no canonical URL (Next adds the `noindex` itself; don't add a second one).
- Build absolute URLs from `PROFILE.url` (`metadataBase` is set in the layout). Never hardcode `tejas.niralas.in`.
- Link previews are per page: `pageMetadata()` sets `og:url`, title and a ≤110-char `socialDescription` from the page registry. The OG image (`opengraph-image.tsx`, re-exported in each route folder because page-level `openGraph` drops the root image; X falls back to it, so there is no twitter-image) is 1200×630 in the site's dark style, set in JetBrains Mono (`assets/fonts`). Keep text large, the layout flex-only (Satori), and the output under ~300 KB (WhatsApp skips larger previews); check its size after changing it.
- Icons: Google shows the portrait, tabs show the `[n]` monogram. `icon.tsx` renders `/icon/search` (192px portrait; Google requires a multiple of 48) and `/icon/tab` (32px monogram). Keep every icon of 48px or more as the portrait, or Google may pick the monogram. `app/favicon.ico` is the monogram at 16/32 only, generated from `/icon/tab` by `design/favicon.py`; regenerate it whenever the monogram changes.
- Site metadata and the schema.org `Person` JSON-LD live in `lib/seo.ts` (the layout only renders them). Keep them consistent with the visible content.
- `GOOGLE_SITE_VERIFICATION` is an optional Vercel env var. When unset, no verification tag is output.
