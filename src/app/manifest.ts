import type { MetadataRoute } from "next";
import { PROFILE } from "@/constants/profile";
import { THEME_COLORS } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.title}`,
    short_name: PROFILE.name,
    description: `Portfolio of ${PROFILE.name}, ${PROFILE.title}.`,
    start_url: "/",
    display: "standalone",
    // No `orientation`: the installed app follows the device in portrait and landscape.
    background_color: THEME_COLORS.dark,
    theme_color: THEME_COLORS.dark,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
