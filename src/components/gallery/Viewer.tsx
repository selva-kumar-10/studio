"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/data/images";
import { categoryLabel, categoryService } from "@/data/presentation";
import { site } from "@/data/site";

interface ViewerProps {
  paths: string[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Full-screen photo viewer: swipe or use the arrow keys, save a favourite, jump to booking. */
export function Viewer({ paths, index, onIndexChange, onClose }: ViewerProps) {
  const count = paths.length;
  const asset = getImage(paths[index]);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const go = (step: number) => onIndexChange((index + step + count) % count);

  useEffect(() => {
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      else if (event.key === "ArrowRight") onIndexChange((index + 1) % count);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndexChange]);

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div
        className="viewer-stage"
        onPointerDown={(e) => {
          touchStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchStart.current === null) return;
          const dx = e.clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}
      >
        <Photo path={asset.path} fill sizes="100vw" priority style={{ objectFit: "contain" }} />
      </div>
      <div className="viewer-shade" />

      <div className="viewer-top">
        <button ref={closeButton} className="iconbtn glass" type="button" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
        <span className="viewer-count mono">
          {index + 1} / {count}
        </span>
        <button
          className="iconbtn glass"
          type="button"
          aria-label="Share"
          onClick={() => {
            const url = window.location.href;
            if (navigator.share) navigator.share({ title: asset.alt, url }).catch(() => undefined);
            else navigator.clipboard?.writeText(url).catch(() => undefined);
          }}
        >
          <Icon name="share" />
        </button>
      </div>

      <button className="viewer-nav prev" type="button" aria-label="Previous photo" onClick={() => go(-1)}>
        <Icon name="left" small />
      </button>
      <button className="viewer-nav next" type="button" aria-label="Next photo" onClick={() => go(1)}>
        <Icon name="right" small />
      </button>

      <div className="viewer-info">
        <div className="tags">
          <span>{categoryLabel[asset.category]}</span>
          <span>{site.city}</span>
        </div>
        <h2>{asset.alt}</h2>
        <p>Shot by our crew. Tell us what you like about it and we will plan the same look for you.</p>
        <div className="acts">
          <button
            className={saved[asset.path] ? "btn gw" : "btn gw"}
            type="button"
            aria-label={saved[asset.path] ? "Remove from favourites" : "Save to favourites"}
            aria-pressed={!!saved[asset.path]}
            style={saved[asset.path] ? { background: "#fff", color: "var(--o)" } : undefined}
            onClick={() => setSaved((s) => ({ ...s, [asset.path]: !s[asset.path] }))}
          >
            <Icon name="heart" />
          </button>
          <Link className="btn o" href={`/book?service=${categoryService[asset.category]}`} onClick={onClose}>
            Book this style
          </Link>
        </div>
      </div>
    </div>
  );
}
