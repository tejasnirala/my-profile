import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROFILE } from "@/constants/profile";
import { PALETTE } from "@/lib/palette";

export const alt = `${PROFILE.name} — ${PROFILE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card follows the site's dark theme. next/og needs inline styles,
// hex colors (these mirror the dark tokens in globals.css) and font files it can
// read: JetBrains Mono TTFs (OFL, see assets/fonts/OFL.txt) and a PNG portrait
// (next/og can't read WebP; made by design/portrait/tint.py).
const COLORS = {
  ...PALETTE.dark,
  grid: "rgba(227, 229, 235, 0.06)",
};

const asset = (path: string) => readFileSync(join(process.cwd(), "src/assets", path));

// Read once per build, not once per render (each route re-exports this card).
const PORTRAIT = `data:image/png;base64,${asset("portrait-share.png").toString("base64")}`;
const FONTS = [
  { name: "JetBrains Mono", data: asset("fonts/JetBrainsMono-Regular.ttf"), weight: 400 as const },
  { name: "JetBrains Mono", data: asset("fonts/JetBrainsMono-ExtraBold.ttf"), weight: 800 as const },
];

export default function OpengraphImage() {
  // Curated set for the share card. lib/seo checks each one is a listed skill.
  const topSkills = PROFILE.featuredSkills;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.background,
          color: COLORS.foreground,
          fontFamily: "JetBrains Mono",
        }}
      >
        {/* Texture: the site's hairline grid, a warm glow top-left, both fading out. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${COLORS.grid} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.grid} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(to bottom, transparent 0%, ${COLORS.background} 85%), radial-gradient(circle at 0% 0%, rgba(240, 139, 66, 0.12), transparent 55%)`,
          }}
        />

        {/* Portrait, bottom-right, dissolving into the card at its base. */}
        <img
          src={PORTRAIT}
          width={520}
          height={500}
          alt=""
          style={{ position: "absolute", right: 24, bottom: 0 }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 600,
            height: 140,
            display: "flex",
            backgroundImage: `linear-gradient(to bottom, transparent, ${COLORS.background})`,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            height: "100%",
            padding: "64px 0 64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1.5 }}>
            <span>tejas</span>
            <span style={{ color: COLORS.logo }}>[</span>
            <span>n</span>
            <span style={{ color: COLORS.logo }}>]</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.05 }}>
                {PROFILE.name}
              </span>
              <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: -2, color: COLORS.brand }}>
                {`${PROFILE.title}.`}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {topSkills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 20,
                    padding: "6px 14px",
                    border: `1px solid ${COLORS.border}`,
                    background: "rgba(11, 12, 15, 0.7)",
                    color: COLORS.muted,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 22, color: COLORS.muted }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 12, height: 12, background: COLORS.success, display: "flex" }} />
              {PROFILE.availability}
            </div>
            <span>{PROFILE.url.replace("https://", "")}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: FONTS,
    },
  );
}
