"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Fade-up on scroll. Elements with data-reveal start hidden (only once this script is running)
 * and fade in when they enter the screen. Elements already on screen appear straight away.
 */
export function Motion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    items.forEach((el, index) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", String(index % 5));
    });

    if (reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const vh = window.innerHeight;
    const later: HTMLElement[] = [];
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add("is-in");
      else later.push(el);
    });
    root.classList.add("motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    later.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
