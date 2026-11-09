"use client";

import { Icon } from "@/components/ui/Icon";

/** Round glass button that shares the current page (or copies its link where sharing is not available). */
export function ShareButton({ title, variant = "glass" }: { title: string; variant?: "glass" | "line" }) {
  return (
    <button
      className={variant === "line" ? "iconbtn line" : "iconbtn glass"}
      type="button"
      aria-label="Share"
      onClick={() => {
        const url = window.location.href;
        if (navigator.share) navigator.share({ title, url }).catch(() => undefined);
        else navigator.clipboard?.writeText(url).catch(() => undefined);
      }}
    >
      <Icon name="share" />
    </button>
  );
}
