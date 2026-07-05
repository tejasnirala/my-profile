import type { MetadataRoute } from "next";
import { PROFILE } from "../constants/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PROFILE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${PROFILE.url}/Tejas_Nirala_Resume.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
