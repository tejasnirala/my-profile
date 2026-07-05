import type { MetadataRoute } from "next";
import { PROFILE } from "../constants/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PROFILE.url}/sitemap.xml`,
    host: PROFILE.url,
  };
}
