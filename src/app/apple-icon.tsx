import { ImageResponse } from "next/og";

// Apple touch icon (iOS home screen). iOS applies its own rounded mask, so the
// image itself stays a full square with no transparency.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 108,
          fontWeight: 900,
          letterSpacing: "-8px",
          fontFamily: "sans-serif",
        }}
      >
        TN
      </div>
    ),
    { ...size },
  );
}
