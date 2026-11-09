import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { cardSub, priceTag } from "@/data/presentation";
import { recentWork } from "@/data/home";
import { getImage } from "@/data/images";
import { site } from "@/data/site";
import type { Service } from "@/types";

const STATS = [
  { value: "850", suffix: "+", label: "Shoots delivered" },
  { value: "320", suffix: "+", label: "Weddings filmed" },
  { value: "120", suffix: "+", label: "Podcast episodes" },
  { value: site.rating, suffix: "", label: `Google rating, ${site.reviewsCount} reviews` },
];

/** Four big numbers, desktop only. */
export function Stats() {
  return (
    <div className="stats" data-reveal>
      {STATS.map((stat) => (
        <div key={stat.label}>
          <b>
            {stat.value}
            <i>{stat.suffix}</i>
          </b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Service photo cards: sideways scroll on phones, a grid on larger screens. */
export function ServiceScroller({ services }: { services: Service[] }) {
  return (
    <div className="svc-scroll" data-reveal>
      {services.map((service) => (
        <PhotoCard
          key={service.slug}
          href={`/services/${service.slug}`}
          path={service.tileImage}
          title={service.name}
          sub={cardSub[service.slug]}
          tag={
            service.slug.includes("rental") ? (
              priceTag(service)
            ) : (
              <>
                <span className="show-m">from {priceTag(service).replace("+", "")}</span>
                <span className="hide-m">{priceTag(service)}</span>
              </>
            )
          }
          tagOrange={service.slug.includes("rental")}
        />
      ))}
    </div>
  );
}

const MOBILE_WORK: Array<Array<{ path: string; height: number }>> = [
  [
    { path: "wedding/bride-pink", height: 236 },
    { path: "commercial/jewellery-set", height: 156 },
    { path: "baby/baby-hat", height: 200 },
  ],
  [
    { path: "wedding/haldi-powder", height: 156 },
    { path: "indoor/portrait-green", height: 236 },
    { path: "podcast/control-room", height: 156 },
  ],
];

/** Recent photos: two columns of different heights on phones, a row of photos on larger screens. */
export function RecentWork() {
  return (
    <>
      <div className="work-m" data-reveal>
        {MOBILE_WORK.map((column, index) => (
          <div key={index} className="workcol">
            {column.map((item) => (
              <Link key={item.path} className="pc" href="/portfolio" style={{ height: item.height }} aria-label={`Portfolio: ${getImage(item.path).alt}`}>
                <Photo path={item.path} fill sizes="400px" />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="work" data-reveal>
        {recentWork.map((path) => (
          <Link key={path} className="pc" href="/portfolio" aria-label={`Portfolio: ${getImage(path).alt}`}>
            <Photo path={path} sizes="(max-width: 1100px) 50vw, 460px" />
          </Link>
        ))}
      </div>
    </>
  );
}
