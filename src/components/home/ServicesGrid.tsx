"use client";

import { useState } from "react";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { cardSub, priceTag } from "@/data/presentation";
import type { Service } from "@/types";

const GROUPS: Array<{ key: string; label: string; slugs: string[] | null }> = [
  { key: "all", label: "All", slugs: null },
  { key: "weddings", label: "Weddings", slugs: ["wedding-photography"] },
  { key: "brands", label: "Brands", slugs: ["commercial-shoots"] },
  { key: "podcast", label: "Podcast", slugs: ["podcast-shoots", "podcast-studio-rental"] },
  { key: "family", label: "Family", slugs: ["indoor-shoots", "baby-shoots"] },
];

/** Service cards with filter chips. */
export function ServicesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState("all");
  const group = GROUPS.find((g) => g.key === active) ?? GROUPS[0];
  const shown = group.slugs ? services.filter((s) => group.slugs?.includes(s.slug)) : services;

  return (
    <>
      <div className="chips" role="group" aria-label="Filter services" style={{ paddingTop: 18 }}>
        {GROUPS.map((g) => (
          <button key={g.key} type="button" className={g.key === active ? "chip on" : "chip"} aria-pressed={g.key === active} onClick={() => setActive(g.key)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="grid-svc">
        {shown.map((service) => (
          <PhotoCard
            key={service.slug}
            href={`/services/${service.slug}`}
            path={service.tileImage}
            title={service.name}
            sub={cardSub[service.slug]}
            tag={priceTag(service)}
            tagOrange={service.slug.includes("rental")}
          />
        ))}
      </div>
    </>
  );
}
