import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { StudioBooker } from "@/components/studio/StudioBooker";
import { FaqList } from "@/components/ui/FaqList";
import { emph } from "@/components/ui/Emph";
import { imageSrc } from "@/data/images";
import { RENTAL_SLUG, getService, serviceSlugs } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { faqSchema, serviceSchema } from "@/lib/schema";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: slug === RENTAL_SLUG ? "Podcast studio rental in Chennai" : `${service.title} in Chennai`,
    description: service.description,
    path: `/services/${slug}`,
    image: imageSrc(service.heroImage),
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const schemas = <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />;

  if (slug === RENTAL_SLUG) {
    return (
      <>
        {schemas}
        <div className="wrap">
          <StudioBooker image={service.heroImage} included={service.included} />
          <section className="sec">
            <h2 className="block-h">{emph("Studio *rules*")}</h2>
            <div className="timeline" style={{ maxWidth: 640 }}>
              {service.how.map((step) => (
                <div key={step.title}>
                  <b>{step.title}</b>
                  <span>{step.text}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="sec" style={{ maxWidth: 900 }}>
            <h2 className="block-h">{emph("Questions")}</h2>
            <FaqList faqs={service.faqs} />
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      {schemas}
      <ServiceDetail service={service} />
    </>
  );
}
