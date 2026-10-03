---
name: add-page
description: Add a new route/page to the portfolio (e.g. /blog, /uses, /achievements) via the page registry, which wires nav, sitemap and metadata. Use when asked to add, create or remove a page or section of the site.
---

# Add a page

Example: adding `/uses`. Replace `Uses` with the real name.

## 1. Content: `src/constants/uses.ts`
```ts
export const USES = [
  { category: "Editor", items: ["VS Code", "Claude Code"] },
];
```
Keep data in constants, not in JSX.

## 2. Section: `src/components/sections/UsesSection/index.tsx`
```tsx
import { Card, CardHeader, CardKicker, CardTitle } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { USES } from '@/constants/uses';
import { stagger } from '@/lib/motion';

export const UsesSection = () => {
  return (
    <Section innerClassName="space-y-10 pt-10 md:pt-16">
      <SectionHeader
        as="h1"
        eyebrow="uses"
        title="Tools I"
        emphasis="work with."
        intro="Tools and setup I work with."
        className="enter"
        style={stagger(0)}
      />
      <ul role="list" className="enter grid gap-4 md:grid-cols-2" style={stagger(1)}>
        {USES.map((group, index) => (
          <li key={group.category} className="reveal">
            <Card className="h-full">
              <CardHeader>
                <CardKicker index={String(index + 1).padStart(2, '0')} label={`${group.items.length} tools`} />
                <CardTitle as="h2">{group.category}</CardTitle>
                {/* items */}
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
};
```
This must be a server component (no `"use client"`). Use semantic color tokens and ui primitives. Follow the motion and accessibility rules in `.claude/rules/components.md`: the page's heading is its only `<h1>`, blocks above the fold use `enter` + `stagger(n)` in order, content below the fold uses `reveal`, lists are `<ul role="list">`, and `target="_blank"` links include `<NewTabHint />`. Check it at 320px wide, in both themes and with reduced motion on.

## 3. Register it: `src/constants/pages.ts`
Add `'uses'` to `PageId`, then add an entry to `PAGES` (array order is nav order):
```ts
{
  id: 'uses',
  path: '/uses',
  navLabel: 'Uses',
  title: 'Uses',
  description: `Tools and setup ${PROFILE.name} uses as a ${PROFILE.title}.`, // ≤155 chars (build-checked), unique
},
```
Build names, titles and places from `PROFILE`; never hardcode them. This one entry puts the page in the nav (with the active pill), the sitemap and its own metadata. The header must still fit on a 375px phone in portrait (4 items plus the theme toggle today); if it doesn't, ask before redesigning the nav.

## 4. Route: `src/app/uses/page.tsx`
```tsx
import { UsesSection } from '@/components/sections/UsesSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('uses');

export default function UsesPage() {
  return <UsesSection />;
}
```

## 5. Verify
Run the `/verify` skill and confirm `/uses` shows as `○ (Static)` in the build output.

**Removing a page** is the reverse: delete the route folder, section and constants file, and remove its entry and id from `constants/pages.ts`. Then grep for leftover imports and links (`grep -rn "/uses" src`).
