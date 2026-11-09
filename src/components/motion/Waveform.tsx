import type { CSSProperties } from "react";

/** Animated audio bars. Heights are computed, not random, so server and browser render the same markup. */
export function Waveform({ bars = 30 }: { bars?: number }) {
  return (
    <div className="wave" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => {
        const height = 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.55));
        return <i key={i} style={{ height: `${Math.round(height * 100)}%`, "--i": i } as CSSProperties} />;
      })}
    </div>
  );
}
