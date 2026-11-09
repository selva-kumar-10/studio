import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { rentalHref } from "@/data/navigation";
import { photoCount } from "@/data/images";
import { services } from "@/data/services";
import { rentalRates, site } from "@/data/site";
import { inr } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: "Menu",
  description: "All pages of the studio website: services, portfolio, studio rental, pricing, about and contact.",
  path: "/menu",
});

const ITEMS = [
  { label: "Services", note: String(services.length), href: "/services" },
  { label: "Portfolio", note: `${photoCount} photos`, href: "/portfolio" },
  { label: "Studio rental", note: `From ${inr(rentalRates.audio)}/hr`, href: rentalHref },
  { label: "Pricing", note: "Packages", href: "/pricing" },
  { label: "About", note: "Since 2020", href: "/about" },
  { label: "Contact", note: "Anna Nagar", href: "/contact" },
];

export default function MenuPage() {
  return (
    <div className="wrap">
      <div className="pagehead" style={{ paddingTop: 12 }}>
        <span className="eyebrow mono">Menu</span>
      </div>
      <nav className="menu-list" aria-label="All pages">
        {ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <b>{item.label}</b>
            <span>{item.note}</span>
          </Link>
        ))}
      </nav>
      <div style={{ display: "grid", gap: 10, paddingTop: 26 }}>
        <ButtonLink href="/book" variant="o" block>
          Book a session
        </ButtonLink>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <ButtonLink href={waLink(DEFAULT_WA_MESSAGE)} block>
            WhatsApp
          </ButtonLink>
          <ButtonLink href={`tel:${site.phoneTel}`} block>
            Call
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
