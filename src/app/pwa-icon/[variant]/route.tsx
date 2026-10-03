import { ImageResponse } from "next/og";
import { portraitMark } from "@/lib/brand-mark";

// Icons the web app manifest needs for "Install app": 192 and 512 PNGs, plus a
// maskable 512 that Android crops to its own shape. Proportions follow icon.tsx;
// the maskable mark is smaller so it stays inside the 80% safe zone.
const VARIANTS = {
  "192": { size: 192, maskable: false },
  "512": { size: 512, maskable: false },
  "maskable-512": { size: 512, maskable: true },
} as const;

type Variant = keyof typeof VARIANTS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { size, maskable } = VARIANTS[(await params).variant as Variant];
  const mark = maskable
    ? portraitMark({ size, scale: 0.72 })
    : portraitMark({ size, radius: size * 0.203 });
  return new ImageResponse(mark, { width: size, height: size });
}
