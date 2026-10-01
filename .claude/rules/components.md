---
paths: ["src/components/**", "src/lib/**", "src/app/**/*.tsx"]
---
# Components & UI

- Keep components as server components. Add `"use client"` only for state, effects, browser APIs or event handlers, and push it down to the smallest leaf (see `ThemeToggle`).
- Links that look like buttons: `<a className={buttonClasses('outline', 'sm', 'gap-2')}>`. Don't wrap them in `<Button>`.
- Reuse `src/components/ui/*` (Button, Card*, Badge, Separator, TimelineItem) before writing new markup. New primitives go in `ui/<Name>/index.tsx` and follow the same variant-map pattern as `Button`/`Badge`.
- Styling: Tailwind utilities with semantic tokens only. To add a token, define the HSL variable in both `:root` and `.dark` in `globals.css` and map it in `@theme`.
- Must work in both themes and at mobile width (layout is mobile-first; check `sm:`/`md:` breakpoints).
- Section headings follow the existing scale: `text-3xl font-bold tracking-tight` for h2 and `text-xl font-bold text-primary` for timeline item titles.
- External links: `target="_blank" rel="noopener noreferrer"`. Icon-only controls need `aria-label`.
- Content strings belong in `src/constants/*`, not inline in JSX (short UI labels like headings are fine).
- Motion: page content enters with the `enter` utility plus `style={stagger(n)}` from `@/lib/motion`; content below the fold uses `reveal` (scroll-linked). Press feedback is `motion-safe:active:scale-[0.97]`; hover movement is `motion-safe:group-hover:…`. Use the `ease-out` / `ease-in-out` tokens from `globals.css` and list exact properties in `transition-[…]` (Tailwind v4 uses the `translate`/`scale`/`rotate` properties, not `transform`). Never `transition-all`.
- Touch targets: interactive elements reach 44px on touch screens (`pointer-coarse:` variants). Use `gutter` for horizontal page padding so content clears the notch in landscape.
- No manual `useMemo`/`useCallback`/`React.memo`, because the React Compiler is on.
- Use `lucide-react` for icons. Don't add another icon library.
