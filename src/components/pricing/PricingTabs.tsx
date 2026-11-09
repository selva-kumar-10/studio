"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { inr } from "@/lib/format";
import type { Service } from "@/types";

interface Group {
  key: string;
  label: string;
  slugs: string[];
}

const GROUPS: Group[] = [
  { key: "wedding", label: "Wedding", slugs: ["wedding-photography"] },
  { key: "brand", label: "Brand", slugs: ["commercial-shoots"] },
  { key: "podcast", label: "Podcast", slugs: ["podcast-shoots"] },
  { key: "family", label: "Family", slugs: ["indoor-shoots", "baby-shoots"] },
];

/** Packages by type of shoot. A segmented control switches between them. */
export function PricingTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState(GROUPS[0].key);
  const group = GROUPS.find((g) => g.key === active) ?? GROUPS[0];
  const shown = services.filter((s) => group.slugs.includes(s.slug));

  return (
    <>
      <div className="seg" role="group" aria-label="Type of shoot" style={{ marginTop: 20, maxWidth: 520 }}>
        {GROUPS.map((g) => (
          <button key={g.key} type="button" className={g.key === active ? "on" : undefined} aria-pressed={g.key === active} onClick={() => setActive(g.key)}>
            {g.label}
          </button>
        ))}
      </div>

      {shown.map((service) => (
        <div key={service.slug}>
          {shown.length > 1 ? (
            <h2 className="block-h" style={{ marginBottom: 0 }}>
              {service.name}
            </h2>
          ) : null}
          <div className="price-grid">
            {service.tiers.map((tier) => (
              <div key={`${service.slug}-${tier.name}`} className={cn("card price-card", tier.highlight && "ink")}>
                <div className="row between">
                  <b style={{ fontSize: 17, letterSpacing: "-.02em" }}>{tier.name}</b>
                  {tier.highlight ? <span className="badge">Most booked</span> : <span className="mono mut">{tier.tag ?? tier.bullets[0]}</span>}
                </div>
                <div className="pr">{inr(tier.price)}</div>
                <p style={{ fontSize: 14, color: tier.highlight ? "#b9bcbf" : "var(--mut)" }}>{tier.blurb ?? `${tier.forWho}. ${tier.bullets[1]}.`}</p>
                <ButtonLink href={`/book?service=${service.slug}&package=${encodeURIComponent(tier.name)}`} variant={tier.highlight ? "o" : "default"} block className="">
                  Choose {tier.name}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
