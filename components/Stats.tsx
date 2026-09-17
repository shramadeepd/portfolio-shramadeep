"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/site";
import { Reveal } from "./ui";

const MATH_GLYPHS = [
  { s: "Σ", x: "6%", y: "12%", r: -6 },
  { s: "∇L", x: "88%", y: "18%", r: 5 },
  { s: "P(X|Y)", x: "12%", y: "72%", r: 4 },
  { s: "WᵀX", x: "82%", y: "78%", r: -4 },
  { s: "softmax(z)", x: "70%", y: "8%", r: 3 },
  { s: "ŷ", x: "5%", y: "45%", r: -3 },
  { s: "E[·]", x: "94%", y: "48%", r: 6 },
];

/** Eased count-up triggered once when in view. */
function CountUp({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  const padded = value < 10 ? `0${Math.round(n)}` : `${Math.round(n)}`;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {padded}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="section relative overflow-hidden pt-0!">
      {/* faint math notation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden font-mono text-[15px] text-faint opacity-[0.16] md:block"
      >
        {MATH_GLYPHS.map((g) => (
          <span
            key={g.s + g.x}
            className="absolute select-none"
            style={{
              left: g.x,
              top: g.y,
              transform: `rotate(${g.r}deg)`,
              mixBlendMode: "screen",
            }}
          >
            {g.s}
          </span>
        ))}
      </div>

      <div className="container-site">
        <Reveal>
          <div className="mb-10 flex items-center gap-3">
            <span className="mono-label">quick stats</span>
            <span className="h-px flex-1 bg-line-soft" />
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="h-full">
              <div className="h-full bg-panel p-6 transition-colors duration-300 hover:bg-panel-2 md:p-7">
                <div className="font-display text-4xl font-semibold tracking-tight text-fg md:text-[44px]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[13.5px] font-medium leading-snug text-fg/85">
                  {s.label}
                </div>
                <div className="mt-1.5 font-mono text-[10.5px] leading-relaxed tracking-wide text-faint">
                  {s.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}