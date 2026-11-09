import Link from "next/link";
import { BrandName } from "@/components/ui/BrandName";
import { services } from "@/data/services";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="cols">
        <div>
          <Link className="logo" href="/">
            <BrandName />
          </Link>
          <p>
            {site.tagline} in {site.city}. Weddings, brands, podcasts and families.
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>{site.address}</li>
            <li>{site.hours}</li>
            <li>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener">
                Instagram
              </a>{" "}
              &middot;{" "}
              <a href={site.youtube} target="_blank" rel="noopener">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>
          &copy; {new Date().getFullYear()} {site.name}. {site.gstNote}
        </span>
        <span>{site.city}, Tamil Nadu</span>
      </div>
    </footer>
  );
}
