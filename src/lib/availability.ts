/**
 * SAMPLE studio availability.
 * Produces a repeatable pattern of booked hours for any date so the booking UI can be demonstrated.
 * Replace `bookedHours` with a call to a real calendar or booking API before launch.
 */
export const OPEN_HOURS: number[] = Array.from({ length: 12 }, (_, i) => 9 + i); // 9 am to 8 pm start times
export const CLOSING_HOUR = 21;

export function bookedHours(dateIso: string): Set<number> {
  const booked = new Set<number>();
  if (!dateIso) return booked;

  let seed = 0;
  for (let i = 0; i < dateIso.length; i++) {
    seed = (seed * 31 + dateIso.charCodeAt(i)) % 9973;
  }
  const isSunday = new Date(`${dateIso}T00:00:00`).getDay() === 0;

  OPEN_HOURS.forEach((hour, index) => {
    if ((seed + index * 7) % 5 === 0 || (isSunday && index % 3 === 0)) booked.add(hour);
  });
  return booked;
}

/** SAMPLE: marks a repeatable set of days as fully booked so the calendar can show them struck out. */
export function isFullDay(dateIso: string): boolean {
  let seed = 0;
  for (let i = 0; i < dateIso.length; i++) {
    seed = (seed * 17 + dateIso.charCodeAt(i)) % 7919;
  }
  return seed % 6 === 0;
}

/** True when the chosen start time plus duration touches a booked hour or runs past closing. */
export function hasConflict(booked: Set<number>, start: number | null, hours: number): boolean {
  if (start === null) return false;
  for (let i = 0; i < hours; i++) {
    const hour = start + i;
    if (booked.has(hour) || hour >= CLOSING_HOUR) return true;
  }
  return false;
}
