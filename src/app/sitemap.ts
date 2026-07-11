import type { MetadataRoute } from "next";
import { siteUrl } from "@content/site-url";
import { workEntries } from "@content/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...workEntries.map((w) => ({
      url: `${siteUrl}/work/${w.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
