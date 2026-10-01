import { ImageResponse } from "next/og";
import { brandMark } from "@/lib/brand-mark";

// Rendered at 256 for a sharp master; browsers/Google downscale as needed.
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  // Dark rounded badge so the mark stays visible on Google's white results.
  return new ImageResponse(
    brandMark({ fontSize: 150, letterSpacing: -10, radius: 52 }),
    { ...size },
  );
}
