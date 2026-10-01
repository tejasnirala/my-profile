# CSS-first motion, no animation library

All motion uses the platform (CSS transitions, keyframes, scroll-driven animations and the View Transitions API) rather than Motion/Framer Motion or GSAP. The site has no drags, swipes or sheets, so it needs no springs or velocity handoff. Staying CSS-only keeps every page a server component, ships no animation JavaScript, and degrades to static content in browsers missing a feature. Revisit this if a real gesture is added; then add `motion` with `pnpm add`.
