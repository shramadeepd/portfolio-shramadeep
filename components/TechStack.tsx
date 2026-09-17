"use client";

import { useState } from "react";
import { stack, stackCore } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

/* grid positions for the 8 categories around the core (3×3 map) */
const POS: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

function StackMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Reveal>
      <div className="card relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-line-soft bg-ink-2/70 px-4 py-3">
          <span className="mono-label">stack map</span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
            HOVER A NODE
          </span>
        </div>

        <div className="relative p-4 sm:p-6">
          {/* connection lines (desktop) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            aria-hidden
            viewBox="0 0 3 3"
            preserveAspectRatio="none"
          >
            {stack.map((c, i) => {
              const [r, col] = POS[i];
              const isActive = active === i;
              return (
                <line
                  key={c.short}
                  x1="1.5"
                  y1="1.5"
                  x2={col + 0.5}
                  y2={r + 0.5}
                  stroke={c.color}
                  strokeWidth={1}
                  strokeOpacity={isActive ? 0.75 : 0.14}
                  style={{ transition: "stroke-opacity .3s" }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          <div className="hidden grid-cols-3 gap-3 sm:grid">
            {stack.map((c, i) => {
              const [r, col] = POS[i];
              const isActive = active === i;
              const isDim = active !== null && !isActive;
              return (
                <div
                  key={c.short}
                  className={`relative rounded-xl border p-3 transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-panel-2"
                      : "border-line bg-panel/60"
                  } ${isDim ? "opacity-40 saturate-50" : ""}`}
                  style={{
                    gridRow: r + 1,
                    gridColumn: col + 1,
                    ...(isActive
                      ? { borderColor: `${c.color}66`, boxShadow: `0 0 0 1px ${c.color}44` }
                      : {}),
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: c.color, opacity: isActive ? 1 : 0.5 }}
                    />
                    <span className="text-[12.5px] font-medium text-fg">
                      {c.name}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.items.map((it) => (
                      <span
                        key={it}
                        className="rounded border border-line-soft bg-ink-2/70 px-1.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* core node */}
            <div
              className="relative row-start-2 col-start-2 z-10 flex flex-col items-center justify-center rounded-full text-center"
              style={{
                minHeight: 92,
                background:
                  "radial-gradient(circle at 30% 25%, rgba(110,155,255,0.18), rgba(157,134,255,0.08) 70%)",
                border: "1px solid rgba(110,155,255,0.35)",
              }}
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-accent">
                HUB
              </span>
              <span className="mt-1 px-2 font-display text-[15px] font-semibold text-fg">
                {stackCore.name}
              </span>
            </div>
          </div>

          {/* mobile stack list */}
          <div className="grid gap-3 sm:hidden">
            <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-4 text-center">
              <span className="font-display text-[15px] font-semibold text-fg">
                {stackCore.name}
              </span>
            </div>
            {stack.map((c) => (
              <div key={c.short} className="rounded-xl border border-line bg-panel/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-[13px] font-medium text-fg">{c.name}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {c.items.map((it) => (
                    <span
                      key={it}
                      className="rounded border border-line-soft bg-ink-2/70 px-1.5 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container-site">
        <SectionHeading
          index="06"
          label="technical stack"
          title={<>Tools I reach for, as a map</>}
          sub="Everything orbits a core: understanding models well enough to build systems around them. Hover a node to see its orbit."
        />
        <StackMap />
      </div>
    </section>
  );
}