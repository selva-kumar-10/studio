import { ButtonLink } from "@/components/ui/ButtonLink";
import { emph } from "@/components/ui/Emph";

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow mono">404</span>
        <h1 className="h1">{emph("Page not *found*")}</h1>
        <p className="lead">The page you are looking for has moved or does not exist.</p>
        <div className="row" style={{ marginTop: 22 }}>
          <ButtonLink href="/" variant="o">
            Back to home
          </ButtonLink>
          <ButtonLink href="/services">See services</ButtonLink>
        </div>
      </div>
    </div>
  );
}
