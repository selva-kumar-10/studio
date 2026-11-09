"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { rentalRates, site } from "@/data/site";
import { OPEN_HOURS, bookedHours, hasConflict } from "@/lib/availability";
import { cn } from "@/lib/cn";
import { formatDate, hourLabel, inr } from "@/lib/format";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";
import type { RentalRates } from "@/types";

type Use = "audio" | "video" | "photo";

const USES: Array<{ key: Use; label: string; rate: keyof RentalRates; blurb: string; name: string }> = [
  { key: "audio", label: "Audio", rate: "audio", blurb: "Mics, mixer and a quiet room", name: "Audio podcast" },
  { key: "video", label: "Video", rate: "video", blurb: "Video podcast, 3 cameras and lights", name: "Video podcast" },
  { key: "photo", label: "Photo", rate: "indoor", blurb: "Indoor shoot with backdrops and lights", name: "Indoor photo or video shoot" },
];

interface Day {
  iso: string;
  dow: string;
  date: number;
}

function localIso(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

interface StudioBookerProps {
  image: string;
  included: string[];
}

/** Studio rental: choose a use, day, start time and length. The estimate updates live and the request goes to WhatsApp. */
export function StudioBooker({ image, included }: StudioBookerProps) {
  const [days, setDays] = useState<Day[]>([]);
  const [use, setUse] = useState<Use>("video");
  const [iso, setIso] = useState("");
  const [hours, setHours] = useState(3);
  const [start, setStart] = useState<number | null>(null);
  const [crew, setCrew] = useState(false);
  const [reel, setReel] = useState(false);
  const [note, setNote] = useState("");
  const [nowHour, setNowHour] = useState(0);

  useEffect(() => {
    const today = new Date();
    setNowHour(today.getHours());
    const list: Day[] = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return { iso: localIso(d), dow: d.toLocaleDateString("en-IN", { weekday: "short" }), date: d.getDate() };
    });
    setDays(list);
    // Start on the first day that still has a free hour.
    const firstOpen = list.find((day, index) => {
      const taken = bookedHours(day.iso);
      return OPEN_HOURS.some((hour) => !taken.has(hour) && (index > 0 || hour > today.getHours()));
    });
    setIso((firstOpen ?? list[0]).iso);
  }, []);

  const today = days[0]?.iso;
  const booked = useMemo(() => {
    const set = new Set(bookedHours(iso));
    if (iso && iso === today) OPEN_HOURS.forEach((h) => h <= nowHour && set.add(h));
    return set;
  }, [iso, today, nowHour]);

  const current = USES.find((u) => u.key === use) ?? USES[1];
  const rate = rentalRates[current.rate];
  const total = rate * hours + (crew ? rentalRates.crew * hours : 0) + (reel ? rentalRates.reel : 0);
  const conflict = hasConflict(booked, start, hours);
  const monthLabel = iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "";

  function pickDay(next: string) {
    setIso(next);
    const set = bookedHours(next);
    if (start !== null && set.has(start)) setStart(null);
  }

  function send() {
    if (!iso) return setNote("Choose a day.");
    if (start === null) return setNote("Pick a start time.");
    if (conflict) return setNote("That time overlaps a booked hour. Pick another start time or fewer hours.");
    const addOns = [crew ? "camera operator" : "", reel ? "quick-cut reel" : ""].filter(Boolean).join(", ") || "none";
    const lines = [
      `Hi ${site.name}, I would like to request a studio slot.`,
      "",
      `Use: ${current.name} (${inr(rate)} / hr)`,
      `Date: ${formatDate(iso)}`,
      `Time: ${hourLabel(start)} to ${hourLabel(start + hours)} (${hours} hr)`,
      `Add-ons: ${addOns}`,
      `Estimate: ${inr(total)} + GST`,
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setNote(`Opening WhatsApp with your request. If it did not open, message us on ${site.phoneDisplay}.`);
  }

  const message = conflict ? "That time overlaps a booked hour. Pick another start time or fewer hours." : note;
  const dayLabel = iso ? formatDate(iso).replace(/,? \d{4}$/, "") : "Choose a day";

  const summary = (
    <>
      <span className="mono mut">Your booking</span>
      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        <div className="kv" style={{ marginTop: 0 }}>
          <span>Use</span>
          <b>{current.name}</b>
        </div>
        <div className="kv" style={{ marginTop: 0 }}>
          <span>Day</span>
          <b>{dayLabel}</b>
        </div>
        <div className="kv" style={{ marginTop: 0 }}>
          <span>Time</span>
          <b>{start !== null ? `${hourLabel(start)} to ${hourLabel(start + hours)}` : "Pick a start time"}</b>
        </div>
        {crew || reel ? (
          <div className="kv hide-t" style={{ marginTop: 0 }}>
            <span>Add-ons</span>
            <b>{[crew ? "Camera operator" : "", reel ? "Reel" : ""].filter(Boolean).join(", ")}</b>
          </div>
        ) : null}
      </div>
      <div className="hr" style={{ margin: "18px 0" }} />
      <div className="show-t">
        <span className="mono mut">Add-ons</span>
        <div className="addons-t">
          <div className="item">
            <div style={{ flex: 1 }}>
              <b style={{ display: "block", fontSize: 14.5, letterSpacing: "-.02em" }}>Camera operator</b>
              <span className="mut" style={{ fontSize: 12.5 }}>
                {inr(rentalRates.crew)} / hr
              </span>
            </div>
            <button className="switch" type="button" role="switch" aria-checked={crew} aria-label="Camera operator" onClick={() => setCrew((v) => !v)} />
          </div>
          <div className="item">
            <div style={{ flex: 1 }}>
              <b style={{ display: "block", fontSize: 14.5, letterSpacing: "-.02em" }}>Quick-cut reel</b>
              <span className="mut" style={{ fontSize: 12.5 }}>
                {inr(rentalRates.reel)}
              </span>
            </div>
            <button className="switch" type="button" role="switch" aria-checked={reel} aria-label="Quick-cut reel" onClick={() => setReel((v) => !v)} />
          </div>
        </div>
        <div className="hr" style={{ margin: "18px 0" }} />
      </div>
      <span className="mono mut">Estimate before GST</span>
      <b className="pr-big" style={{ marginBottom: 16 }}>
        {inr(total)}
      </b>
      <button className="btn o lg block" type="button" onClick={send}>
        <Icon name="whatsapp" />
        Request on WhatsApp
      </button>
      <p className="form-msg" role="status" style={{ textAlign: "center", marginTop: 12 }}>
        {message || "Opens WhatsApp with these details."}
      </p>
    </>
  );

  return (
    <div className="studio" id="book-slot">
      <div className="studio-main">
        <div className="studio-top">
          <Link className="iconbtn line" href="/" aria-label="Back to home">
            <Icon name="back" />
          </Link>
          <span className="mono mut">Studio rental</span>
          <a className="iconbtn line" href={waLink(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener" aria-label="Message on WhatsApp">
            <Icon name="whatsapp" />
          </a>
        </div>
        <div className="studio-img">
          <Photo path={image} fill preload sizes="(max-width: 1100px) 100vw, 800px" />
          <span className="rec">
            <i />
            Rec
          </span>
        </div>
        <span className="eyebrow mono" style={{ marginTop: 22 }}>
          Podcast studio rental
        </span>
        <h1 className="h1">
          Walk in. Plug in. <em>Record.</em>
        </h1>
        <div className="chips hide-t" style={{ flexWrap: "wrap" }}>
          <span className="chip" style={{ height: 34, fontSize: 13 }}>
            4 XLR mics
          </span>
          <span className="chip" style={{ height: 34, fontSize: 13 }}>
            3 cameras 4K
          </span>
          <span className="chip" style={{ height: 34, fontSize: 13 }}>
            Up to 6 guests
          </span>
          <span className="chip show-d" style={{ height: 34, fontSize: 13 }}>
            AC and Wi-Fi
          </span>
        </div>

        <section className="uses">
          <span className="lbl hide-t">What are you recording</span>
          <div className="seg" style={{ marginTop: 10 }} role="group" aria-label="What are you recording">
            {USES.map((item) => (
              <button key={item.key} type="button" className={item.key === use ? "on" : undefined} aria-pressed={item.key === use} onClick={() => setUse(item.key)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="row between hide-t" style={{ marginTop: 12 }}>
            <span className="mut" style={{ fontSize: 14 }}>
              {current.blurb}
            </span>
            <b style={{ fontSize: 16, whiteSpace: "nowrap" }}>{inr(rate)} / hr</b>
          </div>
        </section>

        <section>
          <div className="row between">
            <span className="lbl">Pick a day</span>
            <span className="mono mut">{monthLabel}</span>
          </div>
          <div className="daystrip" role="group" aria-label="Pick a day">
            {days.map((day) => (
              <button key={day.iso} type="button" className={cn("dy", day.iso === iso && "on")} aria-pressed={day.iso === iso} onClick={() => pickDay(day.iso)}>
                <span className="mono mut">{day.dow}</span>
                <b>{day.date}</b>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="row between">
            <span className="lbl">Start time</span>
            <span className="mono mut">Struck out is booked</span>
          </div>
          <div className="slotgrid" role="group" aria-label="Start time">
            {OPEN_HOURS.map((hour) => (
              <button
                key={hour}
                type="button"
                className={cn("chip", start === hour && "on")}
                disabled={!iso || booked.has(hour)}
                aria-pressed={start === hour}
                onClick={() => setStart(hour)}
              >
                {hourLabel(hour)}
              </button>
            ))}
          </div>
        </section>

        <section className="two-up">
          <div>
            <span className="lbl">Duration</span>
            <div className="card stepper">
              <button type="button" aria-label="One hour less" disabled={hours <= 1} onClick={() => setHours((h) => Math.max(1, h - 1))}>
                <Icon name="minus" />
              </button>
              <div className="val">
                <b>
                  {hours} {hours === 1 ? "hour" : "hours"}
                </b>
                <span>{start !== null ? `${hourLabel(start)} to ${hourLabel(start + hours)}` : "Pick a start time"}</span>
              </div>
              <button className="add" type="button" aria-label="One hour more" disabled={hours >= 8} onClick={() => setHours((h) => Math.min(8, h + 1))}>
                <Icon name="plus" />
              </button>
            </div>
          </div>
          <div className="hide-t">
            <span className="lbl">Add-ons</span>
            <div>
              <div className="item">
                <div style={{ flex: 1 }}>
                  <b style={{ display: "block", fontSize: 16, letterSpacing: "-.02em" }}>Camera operator</b>
                  <span className="mut" style={{ fontSize: 13.5 }}>
                    Framing and switching, {inr(rentalRates.crew)} / hr
                  </span>
                </div>
                <button className="switch" type="button" role="switch" aria-checked={crew} aria-label="Camera operator" onClick={() => setCrew((v) => !v)} />
              </div>
              <div className="item">
                <div style={{ flex: 1 }}>
                  <b style={{ display: "block", fontSize: 16, letterSpacing: "-.02em" }}>Quick-cut reel</b>
                  <span className="mut" style={{ fontSize: 13.5 }}>
                    Vertical clip in 24 hours, {inr(rentalRates.reel)}
                  </span>
                </div>
                <button className="switch" type="button" role="switch" aria-checked={reel} aria-label="Quick-cut reel" onClick={() => setReel((v) => !v)} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="card mist included">
            <b style={{ fontSize: 16, letterSpacing: "-.02em" }}>Always included</b>
            <ul>
              {included.slice(0, 4).map((item) => (
                <li key={item}>
                  <i className="dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <aside className="studio-side">
        <div className="studio-img">
          <Photo path={image} fill sizes="900px" />
          <span className="rec">
            <i />
            Rec
          </span>
        </div>
        <div className="panel sticky">{summary}</div>
      </aside>

      <div className="summary-bar">
        <div className="row between">
          <div>
            <span className="mono mut">Estimate before GST</span>
            <b className="est">{inr(total)}</b>
          </div>
          <span className="mono mut">
            {dayLabel}, {hours} {hours === 1 ? "hr" : "hrs"}
          </span>
        </div>
        <button className="btn o block" type="button" onClick={send}>
          Request on WhatsApp
        </button>
        {message ? (
          <p className="form-msg" role="status" style={{ marginTop: -4 }}>
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
