import type { ReactNode } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";

interface PhotoCardProps {
  href: string;
  path: string;
  title: string;
  sub: string;
  tag?: ReactNode;
  tagOrange?: boolean;
  sizes?: string;
  className?: string;
}

/** Photo with a dark fade, a price tag and a name. Used for services. */
export function PhotoCard({ href, path, title, sub, tag, tagOrange, sizes, className }: PhotoCardProps) {
  return (
    <Link className={className ? `pc scrim ${className}` : "pc scrim"} href={href}>
      <Photo path={path} fill sizes={sizes ?? "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 640px"} />
      {tag ? <span className={tagOrange ? "tag o" : "tag"}>{tag}</span> : null}
      <div className="cap">
        <b>{title}</b>
        <span>{sub}</span>
      </div>
    </Link>
  );
}
