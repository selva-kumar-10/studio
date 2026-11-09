"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Waveform } from "@/components/motion/Waveform";
import { rentalHref } from "@/data/navigation";
import { rentalRates } from "@/data/site";
import { OPEN_HOURS, bookedHours } from "@/lib/availability";
import { hourLabel, inr } from "@/lib/format";

interface OpenSlots {
  /** "today", "tomorrow" or a weekday name. */
  when: string;
  /** Short date, e.g. "Mon 9 Nov". */
  date: string;
  hours: number[];
}

function localIso(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** First day in the next week with a free hour, computed in the browser so the date is always right. */
function useOpenSlots(): OpenSlots | null {
  const [open, setOpen] = useState<OpenSlots | null>(null);
  useEffect(() => {
    const now = new Date();
    for (let offset = 0; offset < 7; offset++) {
      const day = new Date(now);
      day.setDate(now.getDate() + offset);
      const booked = bookedHours(localIso(day));
      const hours = OPEN_HOURS.filter((hour) => !booked.has(hour) && (offset > 0 || hour > now.getHours()));
      if (hours.length > 0) {
        const when = offset === 0 ? "today" : offset === 1 ? "tomorrow" : day.toLocaleDateString("en-IN", { weekday: "long" });
        const date = `${day.toLocaleDateString("en-IN", { weekday: "short" })} ${day.getDate()} ${day.toLocaleDateString("en-IN", { month: "short" })}`;
        setOpen({ when, date, hours });
        return;
      }
    }
    setOpen({ when: "this week", date: "", hours: [] });
  }, []);
  return open;
}

/** "Studio today" panel. `card` is the black block on the page, `float` is the glass card on the hero. */
export function StudioToday({ variant }: { variant: "card" | "float" }) {
  const open = useOpenSlots();
  const count = open?.hours.length ?? 0;
  const shown = (open?.hours ?? []).slice(0, variant === "float" ? 3 : 4);
  const href = `${rentalHref}#book-slot`;
  const when = open?.when ?? "live";
  const heading = open === null ? "Live slots" : count > 0 ? `${count} slot${count === 1 ? "" : "s"} open` : "Fully booked";

  if (variant === "float") {
    return (
      <>
        <div className="row between">
          <span className="mono mut">Studio {when}</span>
          <span className="row mono hide-t" style={{ gap: 6, color: "var(--ok)" }}>
            <i className="dot" style={{ background: "var(--ok)", width: 7, height: 7 }} />
            Live
          </span>
        </div>
        <b className="float-title">{heading}</b>
        <div className="float-slots">
          {shown.map((hour, i) => (
            <span key={hour} className={i === 1 ? "chip o" : "chip"}>
              {hourLabel(hour)}
            </span>
          ))}
        </div>
        <ButtonLink href={href} variant="k" size="sm" block className="hide-t">
          Reserve a slot
        </ButtonLink>
      </>
    );
  }

  const slotChips = shown.map((hour, i) => (
    <span key={hour} className={i === 1 ? "chip o" : "chip"}>
      {hourLabel(hour)}
    </span>
  ));

  return (
    <div className="card ink studio-card" data-reveal>
      <div>
        {/* Phone: live slots for the next open day. Tablet and desktop: the studio pitch. */}
        <div className="row between show-m">
          <span className="eyebrow mono" style={{ color: "#b9bcbf" }}>
            Podcast studio, {when}
          </span>
          <span className="mono" style={{ color: "#b9bcbf" }}>
            {open?.date}
          </span>
        </div>
        <span className="eyebrow mono hide-m" style={{ color: "#b9bcbf" }}>
          Podcast studio rental
        </span>
        <h3 className="show-m">
          {heading.replace(/open$/, "")}
          {heading.endsWith("open") ? <em className="it">open</em> : null}
        </h3>
        <h3 className="hide-m">
          Walk in. Plug in. <em className="it">Record.</em>
        </h3>
        <p className="show-m">Soundproof room, four mics, three 4K cameras. From {inr(rentalRates.audio)} an hour.</p>
        <p className="hide-m">
          <span className="hide-d">From {inr(rentalRates.audio)} an hour with mics, cameras and lights included.</span>
          <span className="show-d">Soundproof room, four mics, three 4K cameras and lights. From {inr(rentalRates.audio)} an hour.</span>
        </p>
      </div>
      <div>
        <Waveform />
        <div className="slotrow show-m">{slotChips}</div>
        <div className="row">
          <ButtonLink href={href} variant="o" block className="show-m">
            {shown.length > 1 ? `Reserve ${hourLabel(shown[1])} slot` : "Check live slots"}
          </ButtonLink>
          <ButtonLink href={href} variant="o" className="hide-m">
            Check live slots
          </ButtonLink>
          <span className="show-d">
            <ButtonLink href={rentalHref} variant="gw">
              Studio details
            </ButtonLink>
          </span>
        </div>
      </div>
    </div>
  );
}
