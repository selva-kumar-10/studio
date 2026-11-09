import { CtaPanel } from "@/components/ui/CtaPanel";
import { emph } from "@/components/ui/Emph";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Photography, film and podcast services in Chennai",
  description:
    "Wedding, commercial, podcast, studio rental, indoor and baby photography and film services from a Chennai studio. See what is included and starting prices.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow mono">Services</span>
        <h1 className="h1">{emph("Six ways to *work* with us")}</h1>
        <p className="lead">Every shoot has a named crew, a written quote and a delivery date.</p>
      </div>
      <ServicesGrid services={services} />
      <section className="sec">
        <CtaPanel title="Not sure which one *fits?*" image="studio/set-pink" />
      </section>
    </div>
  );
}
