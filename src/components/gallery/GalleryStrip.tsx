"use client";

import { useRef, useState } from "react";
import { Viewer } from "@/components/gallery/Viewer";
import { Photo } from "@/components/ui/Photo";
import { getImage } from "@/data/images";

/** Photos in a sideways strip on phones and a grid on larger screens. Tapping one opens the viewer. */
export function GalleryStrip({ paths }: { paths: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  return (
    <>
      <div className="gstrip">
        {paths.map((path, index) => (
          <button
            key={path}
            type="button"
            className="pc"
            aria-label={`Open photo: ${getImage(path).alt}`}
            onClick={(event) => {
              lastTrigger.current = event.currentTarget;
              setOpen(index);
            }}
          >
            <Photo path={path} fill sizes="(max-width: 720px) 400px, (max-width: 1100px) 300px, 500px" />
          </button>
        ))}
      </div>
      {open !== null ? (
        <Viewer
          paths={paths}
          index={open}
          onIndexChange={setOpen}
          onClose={() => {
            setOpen(null);
            lastTrigger.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}
