import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { EDUCATION } from "@/constants/education";
import { EXPERIENCE, FEATURED_PROJECTS } from "@/constants/experience";
import { PAGES, type PageId } from "@/constants/pages";
import { PROFILE, socialsIn } from "@/constants/profile";
import { PALETTE } from "@/lib/palette";

/**
 * The link-preview cards (Open Graph; X falls back to them), one per page. Each
 * `app/<route>/opengraph-image.tsx` renders its page's card, so a shared
 * /resume link previews the resume, not the home page.
 *
 * next/og needs inline styles, hex colors (`lib/palette.ts`) and font files it
 * can read: JetBrains Mono TTFs (OFL, see assets/fonts/OFL.txt) and a PNG
 * portrait (next/og can't read WebP; made by design/portrait/tint.py). Keep each
 * card under ~300 KB or WhatsApp drops the preview.
 */

type ShareCardContent = {
  /** Shown as "// eyebrow" above the heading, like the page's own header. */
  eyebrow?: string;
  title: string;
  /** Second line of the heading, in orange. */
  emphasis: string;
  /** A muted line under the heading. */
  byline?: string;
  chips: string[];
};

const universities = EDUCATION.filter((e) => e.level === "university").map((e) => e.school);

/** What each page's card says. Headings match the page headers on the site. */
const CARDS: Record<PageId, ShareCardContent> = {
  about: {
    title: PROFILE.name,
    emphasis: `${PROFILE.title}.`,
    // Curated set; lib/seo checks each one is a listed skill.
    chips: PROFILE.featuredSkills,
  },
  resume: {
    eyebrow: "resume",
    title: "Experience &",
    emphasis: "education.",
    byline: `${PROFILE.name} · ${PROFILE.experienceDuration} of experience`,
    chips: [...EXPERIENCE.map((e) => e.company), ...universities],
  },
  projects: {
    eyebrow: "projects",
    title: "Featured",
    emphasis: "work.",
    byline: `${PROFILE.name} · ${PROFILE.title}`,
    chips: FEATURED_PROJECTS.map((project) => project.title),
  },
  contact: {
    eyebrow: "contact",
    title: "Get in",
    emphasis: "touch.",
    byline: `${PROFILE.name} · ${PROFILE.title}`,
    chips: ["Email", ...socialsIn("contact").map((link) => link.label)],
  },
};

export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

/** Alt text: "Tejas Nirala — Software Engineer" on the home card, "Resume — Tejas Nirala" elsewhere. */
export const shareCardAlt = (id: PageId) => {
  const page = PAGES.find((p) => p.id === id);
  return page?.title ? `${page.title} — ${PROFILE.name}` : `${PROFILE.name} — ${PROFILE.title}`;
};

const COLORS = {
  ...PALETTE.dark,
  grid: "rgba(227, 229, 235, 0.06)",
};

const asset = (path: string) => readFileSync(join(process.cwd(), "src/assets", path));

// Read once per build, not once per card.
const PORTRAIT = `data:image/png;base64,${asset("portrait-share.png").toString("base64")}`;
const FONTS = [
  { name: "JetBrains Mono", data: asset("fonts/JetBrainsMono-Regular.ttf"), weight: 400 as const },
  { name: "JetBrains Mono", data: asset("fonts/JetBrainsMono-ExtraBold.ttf"), weight: 800 as const },
];

export const shareCard = (id: PageId) => {
  const { eyebrow, title, emphasis, byline, chips } = CARDS[id];

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
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={PORTRAIT} width={520} height={500} alt="" style={{ position: "absolute", right: 24, bottom: 0 }} />
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

        {/* Heading block, vertically centred; the status line sits at the bottom. */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
            width: 700,
            height: "100%",
            padding: "64px 0 96px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {eyebrow && <span style={{ fontSize: 26, color: COLORS.brand, marginBottom: 10 }}>{`// ${eyebrow}`}</span>}
            <span style={{ fontSize: 76, fontWeight: 800, letterSpacing: -3.5, lineHeight: 1.05 }}>{title}</span>
            <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: -2, color: COLORS.brand }}>{emphasis}</span>
            {byline && <span style={{ fontSize: 24, color: COLORS.muted, marginTop: 14 }}>{byline}</span>}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontSize: 20,
                  padding: "6px 14px",
                  border: `1px solid ${COLORS.border}`,
                  background: "rgba(11, 12, 15, 0.7)",
                  color: COLORS.muted,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: COLORS.muted,
          }}
        >
          <div style={{ width: 12, height: 12, background: COLORS.success, display: "flex" }} />
          {PROFILE.availability}
        </div>
      </div>
    ),
    { ...SHARE_CARD_SIZE, fonts: FONTS },
  );
};
