import { PricingTabs } from "@/components/pricing/PricingTabs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { emph } from "@/components/ui/Emph";
import { TermsList } from "@/components/pricing/TermsList";
import { RENTAL_SLUG, services } from "@/data/services";
import { rentalRates, site } from "@/data/site";
import { inr } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Starting prices for wedding, commercial, podcast, indoor and baby photography and podcast studio rental in Chennai. Payment terms, GST and delivery times explained.",
  path: "/pricing",
});

export default function PricingPage() {
  const rates = [
    { label: "Audio podcast", value: rentalRates.audio },
    { label: "Video podcast", value: rentalRates.video },
    { label: "Indoor photo or video", value: rentalRates.indoor },
  ];
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow mono hide-m">Pricing</span>
        <h1 className="h1">{emph("Clear *pricing*")}</h1>
        <p className="lead">Starting prices in rupees, before 18% GST. A 30% advance books your date.</p>
      </div>

      <PricingTabs services={services} />

      <section className="sec terms-sec" style={{ maxWidth: 900 }}>
        <h2 className="block-h" style={{ marginTop: 0 }}>
          {emph("Terms in plain *words*")}
        </h2>
        <TermsList />
        <p className="mut" style={{ fontSize: 14, marginTop: 16 }}>
          {site.gstNote}
        </p>
      </section>

      <section className="sec">
        <h2 className="block-h" style={{ marginTop: 0 }}>
          {emph("Studio *rental*")}
        </h2>
        <div className="price-grid" style={{ paddingTop: 12 }}>
          {rates.map((rate) => (
            <div key={rate.label} className="card price-card">
              <span className="mono mut">{rate.label}</span>
              <div className="pr">{inr(rate.value)} <span style={{ fontSize: 16, letterSpacing: 0 }} className="mut">/ hr</span></div>
              <ButtonLink href={`/services/${RENTAL_SLUG}#book-slot`} block>
                Check slots
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
