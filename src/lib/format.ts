const inrNumber = new Intl.NumberFormat("en-IN");

/** Format a number as rupees with Indian digit grouping, e.g. 185000 becomes ₹1,85,000. */
export function inr(amount: number): string {
  return "₹" + inrNumber.format(Math.round(amount));
}

/** Format an ISO date (YYYY-MM-DD) for a WhatsApp message, e.g. "Thu, 12 Nov 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Today's date as YYYY-MM-DD in the visitor's time zone, for date input minimums. */
export function todayIso(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

/** Label for an hour of the day, e.g. 14 becomes "2 pm". */
export function hourLabel(hour: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const twelve = hour > 12 ? hour - 12 : hour;
  return `${twelve} ${suffix}`;
}
