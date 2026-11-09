"use client";

import { useEffect, useState } from "react";

/** "Open now" or "Closed now" chip, worked out in the browser from the opening hours (9 am to 8 pm). */
export function OpenNow() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const hour = new Date().getHours();
    setOpen(hour >= 9 && hour < 20);
  }, []);

  const label = open === null ? "Open daily" : open ? "Open now" : "Closed now";
  const live = open !== false;
  return (
    <span className="chip" style={{ height: 30, fontSize: 12, borderColor: live ? "#cfe7da" : "var(--line)", background: live ? "#eaf6ef" : "var(--mist)", color: live ? "var(--ok)" : "var(--mut)" }}>
      <i className="dot" style={{ background: live ? "var(--ok)" : "#9a9da1", width: 7, height: 7 }} />
      {label}
    </span>
  );
}
