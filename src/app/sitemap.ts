import type { MetadataRoute } from "next";
import { PAGES } from "@/constants/pages";
import { PROFILE } from "@/constants/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: every URL would get the build time, which tells crawlers
  // nothing (they learn to ignore it).
  const routes = PAGES.map(({ path }) => ({
    url: path === "/" ? PROFILE.url : `${PROFILE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...routes,
    {
      url: `${PROFILE.url}/Tejas_Nirala_Resume.pdf`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
