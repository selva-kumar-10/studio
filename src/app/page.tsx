import { Hero } from "@/components/home/Hero";
import { RecentWork, ServiceScroller, Stats } from "@/components/home/HomeSections";
import { QuickActions } from "@/components/home/QuickActions";
import { ReviewCard, ReviewsRow } from "@/components/home/Reviews";
import { StudioToday } from "@/components/home/StudioToday";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { businessSchema } from "@/lib/schema";

export const metadata = createMetadata({
  description:
    "Photo, film and podcast studio in Chennai. Wedding photography and films, commercial and product shoots, podcast production, baby and indoor portraits, and a podcast studio to rent by the hour.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessSchema()} />
      <Hero />
      <QuickActions />

      <div className="wrap">
        <Stats />
      </div>

      <section className="wrap sec">
        <SectionHead eyebrow="Services" title="What we *shoot*" moreHref="/services" moreLabel={`All ${services.length} services`} moreShort="All" />
        <ServiceScroller services={services} />
      </section>

      <section className="wrap sec">
        <div className="duo">
          <StudioToday variant="card" />
          <ReviewCard className="review-t" />
          <div className="duo-img pc" data-reveal>
            <Photo path="podcast/set-sofa" fill sizes="1280px" />
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <SectionHead eyebrow="Portfolio" title="Recent *work*" moreHref="/portfolio" moreLabel="See all" />
        <RecentWork />
      </section>

      <section className="wrap sec review-m">
        <ReviewCard />
      </section>

      <section className="wrap sec show-d">
        <SectionHead eyebrow="Reviews" title="What clients *say*" />
        <ReviewsRow />
      </section>

      <section className="wrap sec">
        <CtaPanel />
      </section>
    </>
  );
}
