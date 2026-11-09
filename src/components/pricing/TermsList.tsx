import { Icon } from "@/components/ui/Icon";
import { pricingTerms } from "@/data/pricing";

/** Payment, travel and delivery terms. Each row shows the headline fact and opens for the full wording. */
export function TermsList() {
  return (
    <div className="terms term-list">
      {pricingTerms.map((term) => (
        <details key={term.title}>
          <summary>
            <b>{term.title === "Reschedule and cancel" ? "Reschedule" : term.title}</b>
            <span>{term.short}</span>
            <Icon name="right" small />
          </summary>
          <div className="ans">{term.text}</div>
        </details>
      ))}
    </div>
  );
}
