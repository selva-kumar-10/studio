"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Viewer } from "@/components/gallery/Viewer";
import { Photo } from "@/components/ui/Photo";
import { getImage, images, portfolioFilters } from "@/data/images";

/** Photo heights in each column, repeated down the page. They match the approved design for 2, 3 and 4 columns. */
const HEIGHTS: Record<number, number[][]> = {
  2: [
    [262, 150, 210],
    [170, 262, 150],
  ],
  3: [
    [284, 170, 262, 150],
    [196, 304, 170, 196],
    [240, 288, 196, 160],
  ],
  4: [
    [380, 240, 300],
    [260, 400, 240],
    [340, 280, 260],
    [240, 360, 280],
  ],
};

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
function columnsNow() {
  const width = window.innerWidth;
  return width >= 1100 ? 4 : width >= 720 ? 3 : 2;
}
/** Number of photo columns for the current screen width. Starts at 2 on the server and corrects after load. */
function useColumns(): number {
  return useSyncExternalStore(subscribe, columnsNow, () => 2);
}

/** Interleave categories so the "All" view mixes weddings, brands, podcasts and babies. */
function mixCategories(): string[] {
  const buckets = new Map<string, string[]>();
  for (const asset of Object.values(images)) {
    const list = buckets.get(asset.category) ?? [];
    list.push(asset.path);
    buckets.set(asset.category, list);
  }
  const lists = [...buckets.values()];
  const mixed: string[] = [];
  while (lists.some((list) => list.length > 0)) {
    for (const list of lists) {
      const next = list.shift();
      if (next) mixed.push(next);
    }
  }
  return mixed;
}

/** Filter chips, photo columns and full-screen viewer. */
export function PortfolioBrowser() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const columns = useColumns();
  const all = useMemo(mixCategories, []);
  const shown = useMemo(() => (filter === "all" ? all : all.filter((path) => images[path].category === filter)), [all, filter]);

  const pattern = HEIGHTS[columns];
  const cols = Array.from({ length: columns }, (_, c) => shown.map((path, index) => ({ path, index })).filter((_, i) => i % columns === c));

  return (
    <>
      <div className="chips pf-chips" role="group" aria-label="Filter portfolio" style={{ paddingTop: 16 }}>
        {portfolioFilters.map((item) => (
          <button key={item.value} type="button" className={filter === item.value ? "chip on" : "chip"} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} photos
      </p>
      <div className="mason">
        {cols.map((items, c) => (
          <div key={c} className="mcol">
            {items.map(({ path, index }, i) => (
              <button
                key={path}
                type="button"
                className="pc"
                style={{ height: pattern[c][i % pattern[c].length] }}
                aria-label={`Open photo: ${getImage(path).alt}`}
                onClick={(event) => {
                  lastTrigger.current = event.currentTarget;
                  setOpen(index);
                }}
              >
                <Photo path={path} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 480px" />
              </button>
            ))}
          </div>
        ))}
      </div>
      {open !== null ? (
        <Viewer
          paths={shown}
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
