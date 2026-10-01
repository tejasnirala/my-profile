# Fully static site, no backend

Every page is prerendered at build time and content ships inside the build from `src/constants/`. There are no API routes, server actions, database or runtime data fetching, and a service worker makes the site work offline. The content changes a few times a year, so the zero-cost hosting, instant loads and offline support of a fully static build are worth having to redeploy for every edit. A page that turns dynamic in `pnpm build` is a regression, not an option.
