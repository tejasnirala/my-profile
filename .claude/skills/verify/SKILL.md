---
name: verify
description: Run this portfolio's full check sequence (typecheck, lint against the known baseline, production build) and report pass/fail. Use after any code change, before committing, or when asked to "verify", "check", or "make sure it builds".
---

# Verify my-profile

Run these in order from the repo root and stop at the first real failure.

1. **Typecheck:** `pnpm exec tsc --noEmit`. It must exit 0.
2. **Lint:** `pnpm lint`
   - The baseline is **0 errors and 0 warnings**. Any new error or warning is a failure.
3. **Build:** `pnpm build` (runs `next build --webpack`; this is what Vercel runs).
   - Every route in the table must be `○ (Static)`. A `ƒ (Dynamic)` route is a regression.
   - Ignore the `baseline-browser-mapping … over two months old` warnings.
4. **Lockfile sanity:** if `package.json` changed (`git diff --name-only`), `pnpm-lock.yaml` must also have changed, and `package-lock.json` must not.

## Report
One line per step: ✅/❌ plus the relevant error lines. If everything passes, end with a single line: "All checks pass."

If the change was visual, also suggest running `pnpm dev` and checking the affected page in both themes, at phone and tablet widths in portrait and landscape, and with reduced motion turned on. For PWA/offline changes, use `pnpm build && pnpm start` instead.
