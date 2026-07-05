import { ImageResponse } from "next/og";

// Rendered at 256 for a sharp master; browsers/Google downscale as needed.
export const size = { width: 256, height: 256 };
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
          // Dark rounded badge so the mark stays visible on Google's white results.
          background: "#0a0a0a",
          borderRadius: 52,
          color: "#fafafa",
          fontSize: 150,
          fontWeight: 900,
          letterSpacing: "-10px",
          fontFamily: "sans-serif",
        }}
      >
        TN
      </div>
    ),
    { ...size },
  );
}
