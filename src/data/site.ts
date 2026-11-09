import type { RentalRates, SiteConfig } from "@/types";

/** Studio details. SAMPLE values: replace with the studio's real information before launch. */
export const site: SiteConfig = {
  "name": "Frame&Co Studio",
  "shortName": "FRAME&CO",
  "tagline": "Photo, film and podcast studio",
  "city": "Chennai",
  "url": "https://www.frameandco.in",
  "phoneDisplay": "+91 99999 99999",
  "phoneTel": "+919999999999",
  "whatsapp": "919999999999",
  "email": "hello@frameandco.in",
  "address": "No. 12, 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
  "street": "No. 12, 2nd Avenue, Anna Nagar",
  "region": "Tamil Nadu",
  "postcode": "600040",
  "hours": "Daily, 9 am to 8 pm",
  "instagram": "https://www.instagram.com/",
  "youtube": "https://www.youtube.com/",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Anna+Nagar+Chennai",
  "rating": "4.9",
  "reviewsCount": "180+",
  "gstNote": "All prices are starting prices in INR and exclude 18% GST."
};

/** Hourly studio rental rates in INR, plus add-on prices. */
export const rentalRates: RentalRates = {
  "audio": 1200,
  "video": 2000,
  "indoor": 1500,
  "crew": 800,
  "reel": 2500
};
