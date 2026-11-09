import { StudioToday } from "@/components/home/StudioToday";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Photo path="wedding/couple-garden" fill preload sizes="100vw" />
      </div>
      <div className="hero-shade" />
      <div className="hero-body">
        <span className="chip glassc">
          <span className="dot" />
          Now booking wedding season 2026-27
        </span>
        <h1 className="h1">
          Photography and film for the days you <em>replay.</em>
        </h1>
        <p className="lead">
          Weddings, brands and families in {site.city}, plus a podcast studio you can book by the hour.
        </p>
        <div className="cta">
          <ButtonLink href="/book" variant="o">
            Book a session
          </ButtonLink>
          <ButtonLink href="/portfolio" variant="gw" icon="play">
            <span className="show-m">Reel</span>
            <span className="show-t">Watch reel</span>
            <span className="show-d">Watch the reel</span>
          </ButtonLink>
        </div>
      </div>
      <div className="hero-float">
        <StudioToday variant="float" />
      </div>
    </section>
  );
}
