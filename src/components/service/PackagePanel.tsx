"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { inr } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import type { Service } from "@/types";

/** Package chooser with a live quote. Tablets and desktops show it beside the service details. */
export function PackagePanel({ service }: { service: Service }) {
  const { tiers } = service;
  const [selected, setSelected] = useState(Math.max(0, tiers.findIndex((t) => t.highlight)));
  const tier = tiers[selected];
  if (!tier) return null;

  return (
    <div className="panel sticky" data-reveal>
      <span className="mono mut">Choose a package</span>
      <div style={{ marginTop: 14 }}>
        {tiers.map((item, index) => (
          <button key={item.name} type="button" className={cn("opt", index === selected && "sel")} aria-pressed={index === selected} onClick={() => setSelected(index)}>
            <span className={cn("radio", index === selected && "on")} />
            <span style={{ flex: 1 }}>
              <b className="t">{item.name}</b>
              <span className="s" style={{ display: "block" }}>
                {item.tag ?? item.forWho}
              </span>
            </span>
            <b>{inr(item.price)}</b>
          </button>
        ))}
      </div>
      <div className="hr" style={{ margin: "18px 0" }} />
      <div className="kv">
        <span>Advance (30%)</span>
        <b>{inr(Math.round(tier.price * 0.3))}</b>
      </div>
      <div style={{ margin: "16px 0 4px" }}>
        <span className="mono mut">Quote before GST</span>
        <b className="pr-big">{inr(tier.price)}</b>
      </div>
      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
        <ButtonLink href={`/book?service=${service.slug}&package=${encodeURIComponent(tier.name)}`} variant="o" size="lg" block>
          Book this package
        </ButtonLink>
        <ButtonLink href={waLink(`Hi, I am interested in the ${tier.name} package for ${service.title.toLowerCase()}.`)} icon="whatsapp" block>
          Ask on WhatsApp
        </ButtonLink>
      </div>
      <p className="mut" style={{ fontSize: 13, textAlign: "center", marginTop: 14 }}>
        We reply within an hour, 9 am to 8 pm.
      </p>
    </div>
  );
}
