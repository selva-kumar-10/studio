import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  /** o = orange primary, k = ink, w = white, gw = ghost on dark, default = outline. */
  variant?: "default" | "o" | "k" | "w" | "gw";
  size?: "sm" | "lg";
  block?: boolean;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

/** A link styled as a button. External links open in a new tab. */
export function ButtonLink({ href, variant = "default", size, block, icon, className, children }: ButtonLinkProps) {
  const classes = cn("btn", variant !== "default" && variant, size, block && "block", className);
  const content = (
    <>
      {icon ? <Icon name={icon} small={size === "sm"} /> : null}
      {children}
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener">
        {content}
      </a>
    );
  }
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
