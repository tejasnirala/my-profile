import { ImageResponse } from "next/og";
import { portraitMark } from "@/lib/brand-mark";

// Apple touch icon (iOS home screen). iOS applies its own rounded mask, so the
// image itself stays a full square with no transparency.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(portraitMark({ size: size.width }), { ...size });
}
