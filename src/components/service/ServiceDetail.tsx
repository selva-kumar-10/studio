import Link from "next/link";
import { GalleryStrip } from "@/components/gallery/GalleryStrip";
import { PackagePanel } from "@/components/service/PackagePanel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { emph } from "@/components/ui/Emph";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { ShareButton } from "@/components/ui/ShareButton";
import { inr } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import type { Service } from "@/types";

/** Service page: photo, facts, what is included, how it runs, gallery, packages and questions. */
export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="wrap detail">
      <div className="detail-grid">
        <div className="detail-main">
          <p className="crumbs mono mut hide-m hide-t">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / {service.name}
          </p>

          <div className="detail-img">
            <Photo path={service.heroImage} fill preload sizes="(max-width: 1100px) 100vw, 812px" />
            <div className="over show-m">
              <Link className="iconbtn glass" href="/services" aria-label="Back to services">
                <Icon name="back" />
              </Link>
              <ShareButton title={service.title} />
            </div>
          </div>

          <div className="sheet">
            <span className="eyebrow mono sheet-eyebrow">{service.name}</span>
            <h1 className="h1">{emph(service.title.replace(/(\S+)$/, "*$1*"))}</h1>
            <p className="lead">{service.lead.split(". ")[0]}.</p>

            <div className="facts">
              {service.facts.map((fact) => (
                <div key={fact.label}>
                  <span className="mono mut">{fact.label}</span>
                  <b>{fact.value}</b>
                </div>
              ))}
            </div>

            <div className="seg show-m">
              <a className="on" href="#included">
                Overview
              </a>
              <a href="#packages">Packages</a>
              <a href="#gallery">Gallery</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="two-col" id="included">
              <div>
                <h2 className="block-h">{emph("What is *included*")}</h2>
                <ul>
                  {service.included.map((item) => (
                    <li key={item} className="item" style={{ fontSize: 15 }}>
                      <span className="check on">
                        <Icon name="check" small />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="block-h">{emph(service.howTitle.replace(/(\S+)$/, "*$1*"))}</h2>
                <div className="timeline">
                  {service.how.map((step) => (
                    <div key={step.title}>
                      <b>{step.title}</b>
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section id="gallery">
              <div className="sh" style={{ marginTop: 32 }}>
                <h2 className="block-h" style={{ margin: 0 }}>
                  Gallery
                </h2>
                <Link className="link" href="/portfolio">
                  View all
                </Link>
              </div>
              <GalleryStrip paths={service.gallery.slice(0, 6)} />
            </section>

            <section id="packages" className="pkg-wrap">
              <div className="sh" style={{ marginTop: 32 }}>
                <h2 className="block-h" style={{ margin: 0 }}>
                  Packages
                </h2>
                <span className="mono mut">+ GST</span>
              </div>
              <div className="pkg-scroll">
                {service.tiers.map((tier) => (
                  <div key={tier.name} className={tier.highlight ? "card ink pkg" : "card pkg"}>
                    <div className="row between">
                      <b style={{ fontSize: 16 }}>{tier.name}</b>
                      {tier.highlight ? <span className="badge">Most booked</span> : null}
                    </div>
                    <div className="pr">{inr(tier.price)}</div>
                    <span style={{ fontSize: 13.5, color: tier.highlight ? "#b9bcbf" : "var(--mut)" }}>{tier.forWho}</span>
                    <ul>
                      {tier.bullets.slice(0, 2).map((bullet) => (
                        <li key={bullet}>
                          <i className="dot" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq">
              <h2 className="block-h">{emph("Questions")}</h2>
              <FaqList faqs={service.faqs} />
            </section>
          </div>
        </div>

        <aside className="detail-panel">
          <PackagePanel service={service} />
        </aside>
      </div>

      <div className="actionbar">
        <div className="price" style={{ flex: 1 }}>
          <span className="mono mut">From</span>
          <b>{inr(service.from)}</b>
        </div>
        <ButtonLink href={waLink(service.whatsappMessage)} variant="k" icon="whatsapp" className="icon">
          <span className="sr-only">WhatsApp</span>
        </ButtonLink>
        <ButtonLink href={`/book?service=${service.slug}`} variant="o" className="grow-btn">
          Book this
        </ButtonLink>
      </div>
    </div>
  );
}
