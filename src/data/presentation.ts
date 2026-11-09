import { RENTAL_SLUG } from "@/data/services";
import { rentalRates } from "@/data/site";
import { inr } from "@/lib/format";
import type { ImageCategory, Service } from "@/types";

/** One-line description shown on service photo cards. */
export const cardSub: Record<string, string> = {
  "wedding-photography": "Photo and film",
  "commercial-shoots": "Product and brand",
  "podcast-shoots": "Multi-camera",
  "podcast-studio-rental": "Book by the hour",
  "indoor-shoots": "Portrait, maternity",
  "baby-shoots": "Newborn, milestones",
};

/** Short price tag for a service card. */
export function priceTag(service: Service): string {
  if (service.slug === RENTAL_SLUG) return `${inr(rentalRates.audio)}/hr`;
  return `${inr(service.from)}+`;
}

export const categoryLabel: Record<ImageCategory, string> = {
  wedding: "Wedding",
  bridal: "Bridal",
  commercial: "Brand",
  food: "Food",
  podcast: "Podcast",
  studio: "Studio",
  indoor: "Indoor",
  baby: "Baby",
};

/** Which service a portfolio photo belongs to, for the "Book this style" button. */
export const categoryService: Record<ImageCategory, string> = {
  wedding: "wedding-photography",
  bridal: "wedding-photography",
  commercial: "commercial-shoots",
  food: "commercial-shoots",
  podcast: "podcast-shoots",
  studio: "indoor-shoots",
  indoor: "indoor-shoots",
  baby: "baby-shoots",
};
