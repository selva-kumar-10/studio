import { GalleryStrip } from "@/components/gallery/GalleryStrip";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { emph } from "@/components/ui/Emph";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { equipment, story, team } from "@/data/about";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About",
  description: "Meet the Chennai photo, film and podcast studio team. Our story, equipment and the studio in Anna Nagar.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="wrap">
      <div className="pagehead about-head">
        <div>
          <span className="eyebrow mono hide-m">About</span>
          <h1 className="h1">{emph("A studio built around the *shoot*")}</h1>
          <div className="prose" style={{ marginTop: 18 }}>
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="photo">
          <Photo path="studio/camera-hands" fill={false} preload sizes="(max-width: 1100px) 100vw, 640px" />
        </div>
      </div>

      <section className="sec">
        <SectionHead eyebrow="Crew" title="The *team*" />
        <div className="team">
          {team.map((member) => (
            <div key={member.name} className="card" data-reveal>
              <div className="av">{member.initials}</div>
              <h3 className="h3">{member.name}</h3>
              <p style={{ fontWeight: 600, marginTop: 4 }}>{member.role}</p>
              <p className="mut" style={{ fontSize: 14.5, marginTop: 6 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <SectionHead eyebrow="Studio" title="Where we *work*" />
        <p className="lead" style={{ marginBottom: 16 }}>
          {site.address}
        </p>
        <GalleryStrip paths={["studio/lighting-room", "studio/set-pink", "studio/shoot-in-progress"]} />
      </section>

      <section className="sec">
        <SectionHead eyebrow="Kit" title="Our *equipment*" />
        <div className="kit">
          {equipment.map((item) => (
            <div key={item.kit} className="item" style={{ alignItems: "flex-start" }}>
              <b>{item.kit}</b>
              <span>{item.details}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <CtaPanel title="Come and see the *studio*" image="studio/lighting-room" href="/contact" label="Plan a visit" />
      </section>
    </div>
  );
}
