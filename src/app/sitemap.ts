import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/services";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: 0.9 })),
    { path: "/book", priority: 0.8 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/pricing", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];
  return pages.map(({ path, priority }) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, lastModified: now, priority }));
}
