"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { rentalHref } from "@/data/navigation";
import { cardSub } from "@/data/presentation";
import { RENTAL_SLUG, services } from "@/data/services";
import { site } from "@/data/site";
import { isFullDay } from "@/lib/availability";
import { cn } from "@/lib/cn";
import { formatDate, inr } from "@/lib/format";
import { isValidPhone } from "@/lib/validators";
import { waLink } from "@/lib/whatsapp";

const WHEN = ["Morning", "Full day", "Evening"] as const;
type When = (typeof WHEN)[number];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function iso(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

interface Status {
  tone: "idle" | "error" | "ok";
  text: string;
  field?: "name" | "phone";
}

/**
 * Booking in three choices: what, when, your details. Phones show one step at a time;
 * tablets and desktops show all three together. Sending opens WhatsApp with the request written out.
 */
export function BookingWizard() {
  const params = useSearchParams();
  const requested = services.find((s) => s.slug === params.get("service") && s.slug !== RENTAL_SLUG)?.slug;
  const packageName = params.get("package") ?? "";

  const [serviceSlug, setServiceSlug] = useState(requested ?? "wedding-photography");
  const [step, setStep] = useState(1);
  const [today, setToday] = useState("");
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [date, setDate] = useState("");
  const [when, setWhen] = useState<When>("Full day");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });

  useEffect(() => {
    const t = new Date();
    setToday(iso(t.getFullYear(), t.getMonth(), t.getDate()));
    setMonth({ y: t.getFullYear(), m: t.getMonth() });
  }, []);

  useEffect(() => {
    if (requested) setServiceSlug(requested);
  }, [requested]);

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];
  const tier = service.tiers.find((t) => t.name === packageName);
  const fromPrice = tier ? tier.price : service.from;

  const grid = useMemo(() => {
    if (!month) return null;
    const first = (new Date(month.y, month.m, 1).getDay() + 6) % 7;
    const count = new Date(month.y, month.m + 1, 0).getDate();
    return { first, count, label: new Date(month.y, month.m, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) };
  }, [month]);

  const isCurrentMonth = !!month && !!today && today.slice(0, 7) === iso(month.y, month.m, 1).slice(0, 7);
  const dateLabel = date ? formatDate(date) : "";
  const whenLabel = when === "Full day" ? "full day" : when.toLowerCase();

  const message = [
    `Hi ${site.name}, I would like to book ${service.title.toLowerCase()}${tier ? ` (${tier.name} package)` : ""}${date ? ` on ${dateLabel} (${whenLabel})` : ""}.`,
    name.trim() ? `Name: ${name.trim()}.` : "",
    phone.trim() ? `Phone: ${phone.trim()}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  function shiftMonth(delta: number) {
    if (!month) return;
    const next = new Date(month.y, month.m + delta, 1);
    setMonth({ y: next.getFullYear(), m: next.getMonth() });
  }

  function send() {
    if (!date) {
      setStep(2);
      return setStatus({ tone: "error", text: "Choose a date first." });
    }
    if (!name.trim()) return setStatus({ tone: "error", text: "Enter your name.", field: "name" });
    if (!isValidPhone(phone)) return setStatus({ tone: "error", text: "Enter a valid 10-digit mobile number.", field: "phone" });
    window.open(waLink(message), "_blank", "noopener");
    setStatus({ tone: "ok", text: `Opening WhatsApp with your request. If it did not open, message us on ${site.phoneDisplay}.` });
  }

  const invalid = (field: "name" | "phone") => (status.tone === "error" && status.field === field ? "input invalid" : "input");

  return (
    <div className="book">
      <div className="mobilehead show-m">
        {step > 1 ? (
          <button className="iconbtn line" type="button" aria-label="Back" onClick={() => setStep(step - 1)}>
            <Icon name="back" />
          </button>
        ) : (
          <Link className="iconbtn line" href="/" aria-label="Close">
            <Icon name="close" />
          </Link>
        )}
        <span className="mono mut">Step {step} of 3</span>
        <span style={{ width: 44 }} />
      </div>
      <div className="steps show-m" style={{ gridColumn: "1 / -1", marginBottom: 24 }} aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= step ? "on" : undefined} />
        ))}
      </div>

      <div className="book-col-left">
        {/* 1: what */}
        <section className={cn("book-step", step === 1 && "active")}>
          <h1 className="h1 show-m" style={{ fontSize: 36, marginBottom: 10 }}>
            What are you <em>planning?</em>
          </h1>
          <p className="lead show-m" style={{ fontSize: 15, marginBottom: 18 }}>
            Pick one. We will confirm the rest on WhatsApp.
          </p>
          <div className="stephead hide-m">
            <span className="num">1</span>What are you planning
          </div>
          <div className="optlist">
            {services.map((s) => {
              const rental = s.slug === RENTAL_SLUG;
              const content = (
                <>
                  <Photo path={s.tileImage} fill={false} sizes="200px" />
                  <span className="txt">
                    <b>{s.name}</b>
                    <span className="s">{rental ? "By the hour, opens slot picker" : `${cardSub[s.slug]}, from ${inr(s.from)}`}</span>
                  </span>
                  <span className={cn("radio", s.slug === serviceSlug && "on")} />
                </>
              );
              return rental ? (
                <Link key={s.slug} className="opt-card" href={rentalHref}>
                  {content}
                </Link>
              ) : (
                <button key={s.slug} type="button" className={cn("opt-card", s.slug === serviceSlug && "sel")} aria-pressed={s.slug === serviceSlug} onClick={() => setServiceSlug(s.slug)}>
                  {content}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2: when */}
        <section className={cn("book-step", step === 2 && "active")}>
          <h1 className="h1 show-m" style={{ fontSize: 36, marginBottom: 18, marginTop: -2 }}>
            When is the <em>day?</em>
          </h1>
          <div className="stephead hide-m">
            <span className="num">2</span>When is the day
          </div>
          <div className="cal">
            <div className="cal-head">
              <b>{grid?.label ?? " "}</b>
              <div className="row" style={{ gap: 6 }}>
                <button className="iconbtn line" style={{ width: 40, height: 40 }} type="button" aria-label="Previous month" disabled={!!isCurrentMonth} onClick={() => shiftMonth(-1)}>
                  <Icon name="left" small />
                </button>
                <button className="iconbtn line" style={{ width: 40, height: 40 }} type="button" aria-label="Next month" onClick={() => shiftMonth(1)}>
                  <Icon name="right" small />
                </button>
              </div>
            </div>
            <div className="cal-grid" role="grid" aria-label="Choose a date">
              {WEEKDAYS.map((d) => (
                <span key={d} className="wd mono mut">
                  {d}
                </span>
              ))}
              {grid && month
                ? [
                    ...Array.from({ length: grid.first }, (_, i) => <span key={`b${i}`} />),
                    ...Array.from({ length: grid.count }, (_, i) => {
                      const day = i + 1;
                      const value = iso(month.y, month.m, day);
                      const past = !!today && value < today;
                      const full = !past && isFullDay(value);
                      return (
                        <button
                          key={value}
                          type="button"
                          className={cn(value === today && "today", value === date && "sel", full && "bz")}
                          disabled={past || full}
                          aria-pressed={value === date}
                          aria-label={`${formatDate(value)}${full ? ", booked" : ""}`}
                          onClick={() => setDate(value)}
                        >
                          {day}
                        </button>
                      );
                    }),
                  ]
                : null}
            </div>
            <div className="legend mono mut hide-t">
              <span>
                <i className="dot" />
                Selected
              </span>
              <span>
                <i className="dot" style={{ background: "#bfc0c3" }} />
                Booked
              </span>
            </div>
          </div>
          <div style={{ marginTop: 25 }}>
            <span className="lbl hide-t">Time of day</span>
            <div className="row time-row" style={{ gap: 8, marginTop: 15 }} role="group" aria-label="Time of day">
              {WHEN.map((w) => (
                <button key={w} type="button" className={cn("chip", w === when && "on")} style={{ flex: 1, justifyContent: "center", padding: 0 }} aria-pressed={w === when} onClick={() => setWhen(w)}>
                  {w}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3: details */}
      <section className={cn("book-step step3", step === 3 && "active")}>
        <h1 className="h1 show-m" style={{ fontSize: 36, marginBottom: 16, marginTop: -2 }}>
          Almost <em>done</em>
        </h1>
        <div className="stephead hide-m hide-t">
          <span className="num">3</span>Your details
        </div>
        <div className="card mist summary-card show-m" style={{ marginBottom: 18 }}>
          <div className="item">
            <span className="mono mut" style={{ width: 74 }}>
              Service
            </span>
            <b style={{ flex: 1, fontSize: 15.5 }}>{service.name}</b>
            <button className="link" type="button" style={{ background: "none", border: "0", borderBottom: "2px solid var(--o)", fontSize: 13, lineHeight: "17px", padding: 0 }} onClick={() => setStep(1)}>
              Edit
            </button>
          </div>
          <div className="item">
            <span className="mono mut" style={{ width: 74 }}>
              Date
            </span>
            <b style={{ flex: 1, fontSize: 15.5 }}>{date ? `${dateLabel.replace(/,/g, "")}, ${whenLabel}` : "Not chosen"}</b>
            <button className="link" type="button" style={{ background: "none", border: "0", borderBottom: "2px solid var(--o)", fontSize: 13, lineHeight: "17px", padding: 0 }} onClick={() => setStep(2)}>
              Edit
            </button>
          </div>
          <div className="item">
            <span className="mono mut" style={{ width: 74 }}>
              Quote
            </span>
            <b style={{ flex: 1, fontSize: 15.5 }}>From {inr(fromPrice)} + GST</b>
          </div>
        </div>

        <div className="panel sticky">
          <div className="stephead show-t">
            <span className="num">3</span>Your details
          </div>
          <div style={{ display: "grid", gap: 15 }}>
            <div className="field">
              <label htmlFor="b-name">Your name</label>
              <input id="b-name" className={invalid("name")} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ravi Kumar" />
            </div>
            <div className="field">
              <label htmlFor="b-phone">Mobile number</label>
              <input id="b-phone" className={invalid("phone")} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
            </div>
          </div>
          <div className="hide-m">
            <div className="hr" style={{ margin: "20px 0" }} />
            <div style={{ display: "grid", gap: 10 }}>
              <div className="kv" style={{ marginTop: 0 }}>
                <span>Service</span>
                <b>{service.name}</b>
              </div>
              <div className="kv" style={{ marginTop: 0 }}>
                <span>Date</span>
                <b>{date ? dateLabel : "Choose a date"}</b>
              </div>
              <div className="kv" style={{ marginTop: 0 }}>
                <span>Time</span>
                <b style={{ textTransform: "capitalize" }}>{whenLabel}</b>
              </div>
              <div className="kv" style={{ marginTop: 0 }}>
                <span>From</span>
                <b>{inr(fromPrice)} + GST</b>
              </div>
            </div>
          </div>
          <span className="lbl hide-t" style={{ marginTop: 25 }}>
            Message we will send
          </span>
          <div className="bubble">{message}</div>
          <button className="btn o lg block hide-m" type="button" style={{ marginTop: 18 }} onClick={send}>
            <Icon name="whatsapp" />
            Send on WhatsApp
          </button>
          <p className={cn("form-msg", status.tone === "error" && "err", status.tone === "ok" && "ok")} role="status" style={{ marginTop: 10 }}>
            {status.text}
          </p>
        </div>
      </section>

      <div className={cn("book-actions show-m", step === 3 && "col")}>
        {step < 3 ? (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className="mono mut">Selected</span>
              <b style={{ display: "block", fontSize: 16, letterSpacing: "-.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {step === 1 ? service.name : date ? `${dateLabel}, ${whenLabel}` : "Choose a date"}
              </b>
            </div>
            <button className="btn o" type="button" style={{ width: 180 }} disabled={step === 2 && !date} onClick={() => setStep(step + 1)}>
              Continue
            </button>
          </>
        ) : (
          <>
            <button className="btn o block" type="button" onClick={send}>
              <Icon name="whatsapp" />
              Send on WhatsApp
            </button>
            <p>Opens WhatsApp. We reply within an hour.</p>
          </>
        )}
      </div>
    </div>
  );
}
