"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle cursor spotlight. Purely decorative, pointer-events none.
 * Disabled for coarse pointers and reduced-motion users.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 240}px, ${y - 240}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[480px] w-[480px] rounded-full opacity-[0.05] mix-blend-screen lg:block"
      style={{
        background:
          "radial-gradient(circle, #6e9bff 0%, rgba(110,155,255,0.35) 40%, transparent 70%)",
      }}
    />
  );
}