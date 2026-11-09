import type { Metadata } from "next";
import { site } from "@/data/site";

/** Public address of the site. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/images/og.jpg";

interface PageMeta {
  /** Leave out on the home page to use the default title. */
  title?: string;
  description: string;
  /** Path starting with a slash, e.g. "/services/baby-shoots". */
  path: string;
  image?: string;
}

/** Page metadata with canonical link and social share tags. */
export function createMetadata({ title, description, path, image = DEFAULT_OG_IMAGE }: PageMeta): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: title ?? undefined,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", description, images: [image] },
  };
}
