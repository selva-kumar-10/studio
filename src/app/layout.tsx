import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono, Noto_Sans_Tamil } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { SideRail } from "@/components/layout/SideRail";
import { TabBar } from "@/components/layout/TabBar";
import { TopBar } from "@/components/layout/TopBar";
import { Motion } from "@/components/motion/Motion";
import { site } from "@/data/site";
import { DEFAULT_OG_IMAGE, siteUrl } from "@/lib/metadata";
import "@/styles/globals.css";

const uiFont = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-ui", display: "swap" });
const serifFont = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const monoFont = JetBrains_Mono({ subsets: ["latin"], weight: "500", variable: "--font-mono", display: "swap" });
const tamilFont = Noto_Sans_Tamil({ subsets: ["tamil"], weight: "500", variable: "--font-tamil", display: "swap" });

const defaultTitle = `${site.name} | ${site.tagline} in ${site.city}`;
const defaultDescription =
  "Photo, film and podcast studio in Chennai. Wedding photography and films, commercial and product shoots, podcast production, baby and indoor portraits, and a podcast studio to rent by the hour.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fonts = [uiFont, serifFont, monoFont, tamilFont].map((font) => font.variable).join(" ");
  return (
    <html lang="en-IN" className={fonts}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Motion />
        <SideRail />
        <div className="shell">
          <TopBar />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <TabBar />
      </body>
    </html>
  );
}
