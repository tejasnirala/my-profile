import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PALETTE } from "@/lib/palette";

/**
 * App icon artwork, rendered with `next/og` (inline styles, hex colors that
 * mirror the dark theme's `--background`, `--foreground` and `--logo`).
 *
 * - `portraitMark`: the hero sketch's head and shoulders on the dark tile. Used
 *   for the icon Google shows next to search results (192px), the Apple touch
 *   icon and the PWA icons.
 * - `monogramMark`: the `[n]` monogram, for browser tabs only (32px icon and
 *   favicon.ico). Those sizes aren't multiples of 48px, so Google can't pick them.
 *
 * The portrait image is `src/assets/portrait-icon.png`, generated with the hero portraits
 * by `design/portrait/tint.py` (change the crop there). It's read from disk when
 * the icons are prerendered at build time.
 */
type BrandMarkProps = {
  /** Icon edge in px. */
  size: number;
  /** 0 for full-bleed squares that the OS masks itself (iOS, maskable PWA icons). */
  radius?: number;
  /** Shrinks the portrait inside the tile, e.g. to stay in a maskable icon's safe zone. */
  scale?: number;
};

const TILE = PALETTE.dark.background;

const PORTRAIT = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "src/assets/portrait-icon.png"),
).toString("base64")}`;

export const portraitMark = ({ size, radius = 0, scale = 1 }: BrandMarkProps) => {
  const edge = Math.round(size * scale);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: TILE,
        borderRadius: radius,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
      <img src={PORTRAIT} width={edge} height={edge} alt="" />
    </div>
  );
};

const LETTER = PALETTE.dark.foreground;
const BRACKET = PALETTE.dark.logo;

/** The `[n]` monogram. Every stroke is a bordered box, so it stays crisp at 16px. */
export const monogramMark = ({ size, radius = 0 }: BrandMarkProps) => {
  const stroke = Math.max(1, Math.round(size * 0.07));
  const border = `${stroke}px solid ${BRACKET}`;
  const bracket = { width: size * 0.13, height: size * 0.56, display: "flex" };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.05,
        background: TILE,
        borderRadius: radius,
      }}
    >
      <div style={{ ...bracket, borderLeft: border, borderTop: border, borderBottom: border }} />
      {/* The "n" is an arch with the brackets' stroke, so all three parts share one weight. */}
      <div
        style={{
          display: "flex",
          width: size * 0.3,
          height: size * 0.34,
          borderLeft: `${stroke}px solid ${LETTER}`,
          borderTop: `${stroke}px solid ${LETTER}`,
          borderRight: `${stroke}px solid ${LETTER}`,
          borderTopRightRadius: size * 0.15,
        }}
      />
      <div style={{ ...bracket, borderRight: border, borderTop: border, borderBottom: border }} />
    </div>
  );
};
