"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { rentalHref } from "@/data/navigation";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";

interface RailItem {
  label: string;
  href: string;
  icon: IconName;
  match: (path: string) => boolean;
}

const ITEMS: RailItem[] = [
  { label: "Home", href: "/", icon: "home", match: (p) => p === "/" },
  { label: "Services", href: "/services", icon: "layers", match: (p) => p === "/services" || (p.startsWith("/services/") && p !== rentalHref) },
  { label: "Work", href: "/portfolio", icon: "work", match: (p) => p.startsWith("/portfolio") },
  { label: "Studio", href: rentalHref, icon: "mic", match: (p) => p === rentalHref },
  { label: "Book", href: "/book", icon: "calendar", match: (p) => p.startsWith("/book") },
];

/** Left navigation rail, tablets only. */
export function SideRail() {
  const pathname = usePathname();
  return (
    <nav className="rail" aria-label="Main">
      <Link className="mark" href="/" aria-label="Home">
        F<span>&amp;</span>C
      </Link>
      {ITEMS.map((item) => (
        <Link key={item.href} className="rl" href={item.href} aria-current={item.match(pathname) ? "page" : undefined}>
          <Icon name={item.icon} />
          {item.label}
        </Link>
      ))}
      <div className="grow" />
      <a className="rl" href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener">
        <Icon name="whatsapp" />
        Chat
      </a>
    </nav>
  );
}
