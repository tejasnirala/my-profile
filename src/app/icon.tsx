import { ImageResponse } from "next/og";
import { monogramMark, portraitMark } from "@/lib/brand-mark";

// Two icons from one file, each declared with its size:
// - "tab" (32px): the [n] monogram. Browsers pick the icon closest to the size a
//   tab draws (16-32px), so tabs show this. 32 isn't a multiple of 48, so Google
//   can't use it.
// - "search" (192px): the portrait. A multiple of 48, which Google requires, and
//   the only such icon on the site, so it's what Google shows in results.
// favicon.ico (generated from "tab" by design/favicon.py) is 16/32 only for the
// same reason.
const ICONS = {
  tab: { size: 32, mark: monogramMark },
  search: { size: 192, mark: portraitMark },
} as const;

type IconId = keyof typeof ICONS;

export function generateImageMetadata() {
  return (Object.keys(ICONS) as IconId[]).map((id) => ({
    id,
    size: { width: ICONS[id].size, height: ICONS[id].size },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const { size, mark } = ICONS[(await id) as IconId];
  // Dark rounded tile so the mark stays visible on light tabs and Google's white results.
  return new ImageResponse(mark({ size, radius: size * 0.203 }), { width: size, height: size });
}
