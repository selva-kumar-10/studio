import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { rentalHref } from "@/data/navigation";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";

const ACTIONS: Array<{ title: string; sub: string; icon: IconName; href: string; orange?: boolean; external?: boolean }> = [
  { title: "Book a shoot", sub: "Date and package", icon: "calendar", href: "/book" },
  { title: "Studio slots", sub: "From 1,200/hr", icon: "mic", href: rentalHref },
  { title: "WhatsApp", sub: "Reply in an hour", icon: "whatsapp", href: waLink(DEFAULT_WA_MESSAGE), orange: true, external: true },
];

/** Three shortcut tiles, phones only. */
export function QuickActions() {
  return (
    <div className="quick" data-reveal>
      {ACTIONS.map((action) => {
        const inner = (
          <>
            <span className={action.orange ? "qi o" : "qi"}>
              <Icon name={action.icon} small />
            </span>
            <span>
              <b>{action.title}</b>
              <span className="s">{action.sub}</span>
            </span>
          </>
        );
        return action.external ? (
          <a key={action.title} className="card" href={action.href} target="_blank" rel="noopener">
            {inner}
          </a>
        ) : (
          <Link key={action.title} className="card" href={action.href}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
