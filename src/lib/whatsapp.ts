import { site } from "@/data/site";

/** Build a wa.me link that opens WhatsApp with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE = "Hi, I would like to know more about your services.";
