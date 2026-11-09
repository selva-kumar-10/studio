"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandName } from "@/components/ui/BrandName";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ShareButton } from "@/components/ui/ShareButton";
import { isActive, navItems } from "@/data/navigation";
import { RENTAL_SLUG, services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";

/** Phone pages that show a back arrow and a title instead of the logo. */
const BACK_LABELS: Record<string, string> = { "/pricing": "Pricing", "/contact": "Contact", "/about": "About" };

/** Logo row. Phones show call and chat icons, tablets and desktops show buttons, desktops also show the menu. */
export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // These phone screens have their own header (back button, step counter).
  const backLabel = BACK_LABELS[pathname];
  const isMenu = pathname === "/menu";
  const ownHeader = pathname.startsWith("/services/") || pathname.startsWith("/book");
  // On tablets the service pages swap the logo row for back, "Services / Name" and share.
  const isBook = pathname.startsWith("/book");
  const detail = pathname.startsWith("/services/") ? services.find((s) => pathname === `/services/${s.slug}`) : undefined;

  return (
    <header className={cn("top", isHome && "is-home", ownHeader && "own-m", (detail || isBook) && "detail-t", backLabel && "back-m", isMenu && "menu-m")}>
      <Link className="logo" href="/" aria-label={`${site.name} home`}>
        <BrandName />
      </Link>

      <nav className="nav" aria-label="Main">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isActive(item, pathname) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      {backLabel ? (
        <div className="top-back">
          <Link className="iconbtn line" href="/menu" aria-label="Back to menu">
            <Icon name="back" />
          </Link>
          <span className="mono mut">{backLabel}</span>
          <span style={{ width: 44 }} />
        </div>
      ) : null}

      {isMenu ? (
        <div className="lang menu-lang" aria-label="Language">
          <span className="on">EN</span>
          <span className="ta" lang="ta" title="Coming soon">
            தமிழ்
          </span>
        </div>
      ) : null}

      {detail ? (
        <div className={cn("top-detail", detail.slug === RENTAL_SLUG && "rental")}>
          {detail.slug === RENTAL_SLUG ? (
            <>
              <span className="mono mut">Studio rental</span>
              <ButtonLink href={waLink(DEFAULT_WA_MESSAGE)} size="sm">
                Ask first
              </ButtonLink>
            </>
          ) : (
            <>
              <Link className="iconbtn line" href="/services" aria-label="Back to services">
                <Icon name="back" />
              </Link>
              <span className="mono mut">Services / {detail.name}</span>
              <ShareButton title={detail.title} variant="line" />
            </>
          )}
        </div>
      ) : null}

      {isBook ? (
        <div className="top-detail rental">
          <span className="mono mut">Book a session</span>
          <ButtonLink href={waLink(DEFAULT_WA_MESSAGE)} size="sm">
            Prefer to chat?
          </ButtonLink>
        </div>
      ) : null}

      <div className="top-icons">
        <a className="iconbtn line" href={`tel:${site.phoneTel}`} aria-label="Call the studio">
          <Icon name="phone" />
        </a>
        <a className="iconbtn line" href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener" aria-label="Message on WhatsApp">
          <Icon name="whatsapp" />
        </a>
      </div>

      <div className="top-btns">
        <ButtonLink href={waLink(DEFAULT_WA_MESSAGE)} size="sm">
          WhatsApp
        </ButtonLink>
        <ButtonLink href="/book" variant="o" size="sm">
          Book a session
        </ButtonLink>
      </div>
    </header>
  );
}
