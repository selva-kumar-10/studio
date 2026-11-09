import { emph } from "@/components/ui/Emph";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";

interface CtaPanelProps {
  title?: string;
  image?: string;
  href?: string;
  label?: string;
}

/** Photo panel with a headline and one orange button. */
export function CtaPanel({
  title = "Plan your shoot in *two minutes.*",
  image = "wedding/mandap-hall",
  href = "/book",
  label = "Start booking",
}: CtaPanelProps) {
  return (
    <div className="cta-panel" data-reveal>
      <Photo path={image} fill sizes="(max-width: 1100px) 100vw, 1312px" />
      <div className="in">
        <h2 className="h2">{emph(title)}</h2>
        <div className="row">
          <ButtonLink href={href} variant="o" className="block">
            {label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
