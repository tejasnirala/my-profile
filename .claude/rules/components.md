---
paths: ["src/components/**", "src/lib/**", "src/app/**/*.tsx"]
---
# Components & UI

- Keep components as server components. Add `"use client"` only for state, effects, browser APIs or event handlers, and push it down to the smallest leaf (see `ThemeToggle`).
- Links that look like buttons: `<a className={buttonClasses('outline', 'sm', 'gap-2')}>`. Don't wrap them in `<Button>`.
- Reuse `src/components/ui/*` (Button, Card*, Badge, Section, SectionHeader, CommandLine, Logo, TimelineItem) before writing new markup. New primitives go in `ui/<Name>/index.tsx` and follow the same variant-map pattern as `Button`/`Badge`.
- Styling: Tailwind utilities with semantic tokens only. To add a token, define the HSL variable in both `:root` and `.dark` in `globals.css` and map it in `@theme`.
- Must work in both themes and at mobile width (layout is mobile-first; check `sm:`/`md:` breakpoints).
- Page structure: a page is a stack of `<Section>` bands. Its top heading is a `SectionHeader as="h1"` (`// eyebrow`, title, orange `emphasis`), later bands use `SectionHeader` as h2, and card/timeline titles are h3 (`text-lg font-bold`). Accents are `text-brand`; the single primary action uses `buttonClasses('default')` (amber). Tracking is size-specific: tighter as text grows, slightly positive (`tracking-[0.01em]`) on `text-xs` labels.
- External links: `target="_blank" rel="noopener noreferrer"` and a `<NewTabHint />` inside the link. Icon-only controls need `aria-label`; decorative elements get `aria-hidden`. Repeated link text ("View Certificate") gets an `sr-only` suffix that makes it unique.
- Accessibility (WCAG 2.2 AA, see CLAUDE.md): one `<h1>` per page, no skipped heading levels (`CardTitle as="h2"` when it continues an h1), lists as `<ul|ol role="list">`, focus styles use `focus-visible:outline-hidden` + ring (never `outline-none`, which disappears in Windows High Contrast), toggle buttons expose `aria-pressed`, and state is never shown by a low-contrast background alone.
- Content strings belong in `src/constants/*`, not inline in JSX (short UI labels like headings are fine).
- Motion: page content enters with the `enter` utility plus `style={stagger(n)}` from `@/lib/motion`; content below the fold uses `reveal` (scroll-linked). Press feedback is `motion-safe:active:scale-[0.97]`; hover movement is `motion-safe:group-hover:…`. Use the `ease-out` / `ease-in-out` tokens from `globals.css` and list exact properties in `transition-[…]` (Tailwind v4 uses the `translate`/`scale`/`rotate` properties, not `transform`). Never `transition-all`. Tailwind's `hover:`/`group-hover:` are redefined in `globals.css` to need `(hover: hover) and (pointer: fine)`, so hover styles never stick on touch.
- Touch targets: interactive elements reach 44px on touch screens (`pointer-coarse:` variants). Use `gutter` for horizontal page padding so content clears the notch in landscape.
- No manual `useMemo`/`useCallback`/`React.memo`, because the React Compiler is on.
- Use `lucide-react` for icons. Don't add another icon library.
