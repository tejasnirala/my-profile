import type { MetadataRoute } from "next";
import { PAGES } from "@/constants/pages";
import { PROFILE } from "@/constants/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = PAGES.map(({ path }) => ({
    url: path === "/" ? PROFILE.url : `${PROFILE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...routes,
    {
      url: `${PROFILE.url}/Tejas_Nirala_Resume.pdf`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
