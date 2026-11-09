import Link from "next/link";
import { emph } from "@/components/ui/Emph";

interface SectionHeadProps {
  title: string;
  eyebrow?: string;
  moreHref?: string;
  moreLabel?: string;
  /** Shorter link text for phones. */
  moreShort?: string;
}

/** Section heading with a small label above it. Wrap a word of the title in *asterisks* for the orange accent. */
export function SectionHead({ title, eyebrow, moreHref, moreLabel, moreShort }: SectionHeadProps) {
  return (
    <div className="sh" data-reveal>
      <div>
        {eyebrow ? <span className="eyebrow mono">{eyebrow}</span> : null}
        <h2 className="h2">{emph(title)}</h2>
      </div>
      {moreHref && moreLabel ? (
        <Link className="link" href={moreHref}>
          {moreShort ? (
            <>
              <span className="show-m">{moreShort}</span>
              <span className="hide-m">{moreLabel}</span>
            </>
          ) : (
            moreLabel
          )}
        </Link>
      ) : null}
    </div>
  );
}
