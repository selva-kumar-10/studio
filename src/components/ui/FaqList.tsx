import type { Faq } from "@/types";
import { Icon } from "@/components/ui/Icon";

/** Accordion built on native <details>, so it works without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq">
      {faqs.map(({ q, a }, index) => (
        <details key={q} open={index === 0}>
          <summary>
            {q}
            <span className="pm">
              <Icon name="plus" small />
            </span>
          </summary>
          <div className="ans">{a}</div>
        </details>
      ))}
    </div>
  );
}
