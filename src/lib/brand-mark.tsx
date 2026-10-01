/**
 * The "TN" badge used for every app icon (favicon, Apple touch icon, PWA icons).
 * Rendered with `next/og`, so it uses inline styles and hex colors.
 */
type BrandMarkProps = {
  fontSize: number;
  letterSpacing: number;
  /** 0 for full-bleed squares that the OS masks itself (iOS, maskable PWA icons). */
  radius?: number;
};

export const brandMark = ({ fontSize, letterSpacing, radius = 0 }: BrandMarkProps) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      borderRadius: radius,
      color: "#fafafa",
      fontSize,
      fontWeight: 900,
      letterSpacing: `${letterSpacing}px`,
      fontFamily: "sans-serif",
    }}
  >
    TN
  </div>
);
