"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { rentalHref } from "@/data/navigation";

interface Tab {
  label: string;
  href: string;
  icon: IconName;
  book?: boolean;
  match: (path: string) => boolean;
}

const TABS: Tab[] = [
  { label: "Home", href: "/", icon: "home", match: (p) => p === "/" },
  { label: "Work", href: "/portfolio", icon: "work", match: (p) => p.startsWith("/portfolio") },
  { label: "Book a session", href: "/book", icon: "calendar", book: true, match: (p) => p.startsWith("/book") },
  { label: "Studio", href: rentalHref, icon: "mic", match: (p) => p === rentalHref },
  {
    label: "More",
    href: "/menu",
    icon: "menu",
    match: (p) => ["/menu", "/pricing", "/about", "/contact", "/services"].some((s) => p === s) || (p.startsWith("/services/") && p !== rentalHref),
  },
];

/** Pages that carry their own sticky action bar on phones, so the floating tab bar steps aside. */
function hasActionBar(path: string) {
  return path.startsWith("/services/") || path.startsWith("/book");
}

/** Floating dark tab bar, phones only. */
export function TabBar() {
  const pathname = usePathname();
  const hidden = hasActionBar(pathname);

  useEffect(() => {
    document.body.classList.toggle("has-actionbar", hidden);
    document.body.classList.toggle("has-tabbar", !hidden);
    return () => document.body.classList.remove("has-actionbar", "has-tabbar");
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={tab.book ? "book" : undefined}
          aria-label={tab.book ? tab.label : undefined}
          aria-current={tab.match(pathname) ? "page" : undefined}
        >
          <Icon name={tab.icon} />
          {tab.book ? null : tab.label}
        </Link>
      ))}
    </nav>
  );
}
