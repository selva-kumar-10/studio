import { PortfolioBrowser } from "@/components/gallery/PortfolioBrowser";
import { photoCount } from "@/data/images";
import { emph } from "@/components/ui/Emph";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Wedding, bridal, commercial, food, podcast, studio and baby photography portfolio from a Chennai photo and film studio.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow mono">Portfolio</span>
        <div className="countline">
          <h1 className="h1">{emph("Our *work*")}</h1>
          <span className="mono mut" style={{ paddingBottom: 8 }}>
            {photoCount} photos
          </span>
        </div>
      </div>
      <PortfolioBrowser />
    </div>
  );
}
