import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenNow } from "@/components/ui/OpenNow";
import { emph } from "@/components/ui/Emph";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: "Contact",
  description: "Message us on WhatsApp, call or visit the photo, film and podcast studio in Anna Nagar, Chennai.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow mono hide-m">Contact</span>
        <h1 className="h1">{emph("Visit the *studio*")}</h1>
      </div>

      <div className="contact-grid" style={{ paddingTop: 18 }}>
        <div className="map" role="img" aria-label="Map showing the studio in Anna Nagar, Chennai">
          <i style={{ left: -20, top: 70, width: 700, height: 16, transform: "rotate(-14deg)" }} />
          <i style={{ left: -20, top: 150, width: 700, height: 10, transform: "rotate(8deg)" }} />
          <i style={{ left: 120, top: -20, width: 14, height: 400, transform: "rotate(12deg)" }} />
          <i style={{ left: 270, top: -20, width: 10, height: 400, transform: "rotate(-6deg)" }} />
          <i className="park" style={{ left: 30, top: 20, width: 80, height: 44 }} />
          <i className="park" style={{ left: 300, top: 110, width: 70, height: 60 }} />
          <i className="pin" />
          <div className="go">
            <ButtonLink href={site.mapsUrl} variant="k" size="sm">
              Directions
            </ButtonLink>
          </div>
        </div>

        <div>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div>
              <b style={{ display: "block", fontSize: 18, letterSpacing: "-.025em" }}>{site.name}</b>
              <span className="mut" style={{ fontSize: 14.5, display: "block", marginTop: 4, maxWidth: 260 }}>
                {site.address}
              </span>
            </div>
            <OpenNow />
          </div>
          <div className="hr" style={{ margin: "16px 0" }} />
          <div className="row between">
            <span className="mut">Open daily</span>
            <b>{site.hours.replace(/^Daily, /, "")}</b>
          </div>
          <div className="hr" style={{ margin: "16px 0" }} />
          <div className="row between">
            <span className="mut">Parking</span>
            <b>Free, 2 cars</b>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 24 }}>
            <ButtonLink href={waLink(DEFAULT_WA_MESSAGE)} variant="o" icon="whatsapp" className="block" block>
              WhatsApp us
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneTel}`} icon="phone">
              Call
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} icon="mail">
              Email
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
