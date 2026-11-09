import { site } from "@/data/site";
import { siteUrl } from "@/lib/metadata";
import type { Faq, Service } from "@/types";

/** schema.org LocalBusiness, used on the home page. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/og.jpg`,
    telephone: site.phoneTel,
    email: site.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postcode,
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 09:00-20:00",
    sameAs: [site.instagram, site.youtube],
  };
}

/** schema.org Service, used on each service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: site.name, url: siteUrl },
    areaServed: { "@type": "AdministrativeArea", name: site.region },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(service.from),
      url: `${siteUrl}/services/${service.slug}`,
    },
  };
}

/** schema.org FAQPage. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
