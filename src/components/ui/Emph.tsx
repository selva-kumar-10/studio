import { Fragment, type ReactNode } from "react";

/** Turns *word* markers into the orange serif-italic emphasis used in headings. */
export function emph(text: string): ReactNode {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part, i) => (part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>));
}
