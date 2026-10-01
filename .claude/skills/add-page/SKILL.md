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

## 3. Register it: `src/constants/pages.ts`
Add `'uses'` to `PageId`, then add an entry to `PAGES` (array order is nav order):
```ts
{
  id: 'uses',
  path: '/uses',
  navLabel: 'Uses',
  title: 'Uses',
  description: `Tools and setup ${PROFILE.name} uses as a ${PROFILE.title}.`, // ≤155 chars, unique
},
```
Build names, titles and places from `PROFILE`; never hardcode them. This one entry puts the page in the nav (with the active pill), the sitemap and its own metadata. The header must still fit on a 375px phone in portrait (4 items plus the theme toggle today); if it doesn't, ask before redesigning the nav.

## 4. Route: `src/app/uses/page.tsx`
```tsx
import { UsesSection } from '@/components/sections/UsesSection';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata('uses');

export default function UsesPage() {
  return <UsesSection />;
}
```

## 5. Verify
Run the `/verify` skill and confirm `/uses` shows as `○ (Static)` in the build output.

**Removing a page** is the reverse: delete the route folder, section and constants file, and remove its entry and id from `constants/pages.ts`. Then grep for leftover imports and links (`grep -rn "/uses" src`).
