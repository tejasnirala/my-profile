/**
 * Hex copies of the theme tokens in `app/globals.css`, for the places that can't
 * read CSS variables: the theme-color meta tags and manifest (`lib/theme.ts`) and
 * the images rendered by next/og (app icons, share card). Keep them equal to the
 * HSL tokens; `design/portrait/tint.py` holds the same values for the portraits.
 */
export const PALETTE = {
  light: {
    background: "#f3f4f7",
  },
  dark: {
    background: "#0b0c0f",
    foreground: "#e8eaee",
    muted: "#999ea8",
    border: "#282a2f",
    brand: "#f08b42",
    logo: "#f4b625",
    success: "#2ed26c",
  },
} as const;
