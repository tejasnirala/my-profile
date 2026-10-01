---
paths: ["src/app/**"]
---
# SEO & metadata

- Every page is registered in `constants/pages.ts` and its `page.tsx` exports `metadata = pageMetadata('<id>')`, which supplies `title` (the layout template appends ` | Tejas Nirala`), `description` and the canonical URL. Descriptions build names and places from `PROFILE`.
- Description lengths: page and site descriptions **≤ 155 chars** (Google truncates beyond that); OG/Twitter descriptions **≤ 110 chars**. `lib/seo.ts` enforces both at build time.
- Nav and `app/sitemap.ts` read the same registry, so adding a page is one entry (see the `/add-page` skill).
- Build absolute URLs from `PROFILE.url` (`metadataBase` is set in the layout). Never hardcode `tejas.niralas.in`.
- The OG image (`opengraph-image.tsx`, re-exported by `twitter-image.tsx`) is 1200×630. Keep text large and the layout flex-only (Satori).
- Icons: `icon.tsx` (256px) and `apple-icon.tsx` render the "TN" badge. Keep them visually consistent with each other.
- Site metadata and the schema.org `Person` JSON-LD live in `lib/seo.ts` (the layout only renders them). Keep them consistent with the visible content.
- `GOOGLE_SITE_VERIFICATION` is an optional Vercel env var. When unset, no verification tag is output.
