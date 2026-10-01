---
paths: ["src/app/**"]
---
# SEO & metadata

- Every route's `page.tsx` exports `metadata` with `title` (the layout template appends ` | Tejas Nirala`), `description` and `alternates: { canonical: '/<route>' }`.
- Description lengths: page and site descriptions **≤ 155 chars** (Google truncates beyond that); OG/Twitter descriptions **≤ 110 chars**.
- Adding or removing a route also means updating the `routes` array in `app/sitemap.ts` and `NAV_ITEMS` in `components/layout/NavLinks`.
- Build absolute URLs from `PROFILE.url` (`metadataBase` is set in the layout). Never hardcode `tejas.niralas.in`.
- The OG image (`opengraph-image.tsx`, re-exported by `twitter-image.tsx`) is 1200×630. Keep text large and the layout flex-only (Satori).
- Icons: `icon.tsx` (256px) and `apple-icon.tsx` render the "TN" badge. Keep them visually consistent with each other.
- JSON-LD in `layout.tsx` is a schema.org `Person`. Keep it consistent with the visible content.
- `GOOGLE_SITE_VERIFICATION` is an optional Vercel env var. When unset, no verification tag is output.
