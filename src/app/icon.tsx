import { ImageResponse } from "next/og";

// 192 is a multiple of 48 (Google's recommended favicon grid) and doubles as a
// crisp PWA icon size.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Dark background so the mark stays visible on Google's white results page.
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: "-6px",
          fontFamily: "sans-serif",
        }}
      >
        TN
      </div>
    ),
    { ...size },
  );
}
