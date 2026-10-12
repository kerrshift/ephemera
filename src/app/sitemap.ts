import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";
import { site } from "@/lib/site";

// prerendered to a file at build time (static export)
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    ...docs.map((d) => ({
      url: `${site.url}/components/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: d.group === "theme" ? 0.9 : d.group === "core" ? 0.8 : 0.6,
    })),
  ];
}
