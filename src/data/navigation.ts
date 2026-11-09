import { RENTAL_SLUG } from "@/data/services";

export interface NavItem {
  label: string;
  href: string;
}

export const rentalHref = `/services/${RENTAL_SLUG}`;

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Studio rental", href: rentalHref },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Studio rental lives under /services but has its own nav item, so Services skips it. */
export function isActive(item: NavItem, pathname: string): boolean {
  if (item.href === rentalHref) return pathname === rentalHref;
  if (item.href === "/services") {
    return pathname === "/services" || (pathname.startsWith("/services/") && pathname !== rentalHref);
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}
