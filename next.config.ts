import type { NextConfig } from "next";
import { serviceSlugs } from "./src/data/services";

/** Old static-site URLs (for example /wedding-photography.html) redirect to the new routes. */
const legacyRedirects = [
  { source: "/index.html", destination: "/", permanent: true },
  ...["services", "portfolio", "pricing", "about", "contact"].map((page) => ({
    source: `/${page}.html`,
    destination: `/${page}`,
    permanent: true,
  })),
  ...serviceSlugs.map((slug) => ({
    source: `/${slug}.html`,
    destination: `/services/${slug}`,
    permanent: true,
  })),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
