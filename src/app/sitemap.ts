import type { MetadataRoute } from "next";
import { PROFILE } from "../constants/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/resume", "/projects", "/contact"].map((path) => ({
    url: `${PROFILE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
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
