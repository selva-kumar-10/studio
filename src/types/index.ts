export type ImageCategory =
  | "wedding"
  | "bridal"
  | "commercial"
  | "food"
  | "podcast"
  | "studio"
  | "indoor"
  | "baby";

export interface ImageAsset {
  /** Path under /public/images without extension, e.g. "wedding/couple-sofa". */
  path: string;
  alt: string;
  category: ImageCategory;
  width: number;
  height: number;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  url: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  email: string;
  address: string;
  street: string;
  region: string;
  postcode: string;
  hours: string;
  instagram: string;
  youtube: string;
  mapsUrl: string;
  rating: string;
  reviewsCount: string;
  gstNote: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Addon {
  name: string;
  price: string;
  note: string;
}

export interface Tier {
  name: string;
  price: number;
  forWho: string;
  /** Short label shown beside the name, e.g. "Half day". Falls back to the first bullet. */
  tag?: string;
  /** One-sentence summary for price cards. Falls back to forWho plus the second bullet. */
  blurb?: string;
  bullets: string[];
  highlight: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Short label used in tiles and navigation. */
  name: string;
  /** Full page title. */
  title: string;
  description: string;
  tileImage: string;
  heroImage: string;
  from: number;
  fromLabel: string;
  lead: string;
  facts: Fact[];
  included: string[];
  howTitle: string;
  how: Step[];
  addons: Addon[];
  tiers: Tier[];
  faqs: Faq[];
  gallery: string[];
  related: string[];
  whatsappMessage: string;
}

export interface Review {
  quote: string;
  name: string;
  context: string;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
}

export interface RentalRates {
  audio: number;
  video: number;
  indoor: number;
  crew: number;
  reel: number;
}

export type RentalUse = "audio" | "video" | "indoor";
