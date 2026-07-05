import { ImageResponse } from "next/og";
import { PROFILE } from "../constants/profile";

export const alt = `${PROFILE.name} — ${PROFILE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // Curated marquee set for the share card, filtered to skills actually listed.
  const allSkills = PROFILE.skills.flatMap((group) => group.items);
  const topSkills = ["React.js", "Next.js", "Node.js", "TypeScript", "AWS EC2", "Docker", "MongoDB"].filter(
    (s) => allSkills.includes(s),
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)",
          padding: "80px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#fafafa",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            TN
          </div>
          <span style={{ fontSize: "30px", color: "#a1a1aa" }}>{PROFILE.url.replace("https://", "")}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: "88px", fontWeight: 800, letterSpacing: "-2px" }}>
            {PROFILE.name}
          </span>
          <span style={{ fontSize: "44px", color: "#a1a1aa", fontWeight: 600 }}>
            {PROFILE.title}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
          {topSkills.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: "26px",
                padding: "8px 22px",
                borderRadius: "999px",
                background: "#262626",
                color: "#e4e4e7",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
