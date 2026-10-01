---
name: add-page
description: Add a new route/page to the portfolio (e.g. /blog, /uses, /achievements) wired into nav, sitemap, metadata and content constants. Use when asked to add, create or remove a page or section of the site.
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { USES } from '@/constants/uses';

export const UsesSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Uses</h2>
        <p className="text-muted-foreground">Tools and setup I work with.</p>
      </div>
      {/* render USES with ui primitives */}
    </div>
  );
};
```
This must be a server component (no `"use client"`). Use semantic color tokens and ui primitives, and check it at mobile width.

## 3. Route: `src/app/uses/page.tsx`
```tsx
import type { Metadata } from 'next';
import { UsesSection } from '@/components/sections/UsesSection';

export const metadata: Metadata = {
  title: 'Uses',
  description: '<≤155 chars, unique, mentions Tejas Nirala>',
  alternates: { canonical: '/uses' },
};

export default function UsesPage() {
  return <UsesSection />;
}
```

## 4. Wire it up
- `src/components/layout/NavLinks/index.tsx`: add `{ label: 'Uses', href: '/uses' }` to `NAV_ITEMS`. The header must still fit on a 375px phone in portrait (it already has 4 items plus the theme toggle); if it doesn't, ask before redesigning the nav. The active-page pill follows `aria-current` automatically.
- `src/app/sitemap.ts`: add `"/uses"` to the `routes` array.

## 5. Verify
Run the `/verify` skill and confirm `/uses` shows as `○ (Static)` in the build output.

**Removing a page** is the reverse: delete the route folder, section and constants file, and remove the route from `NAV_ITEMS` and `sitemap.ts`. Then grep for leftover imports and links (`grep -rn "/uses" src`).
