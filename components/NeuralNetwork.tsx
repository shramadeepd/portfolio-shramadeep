"use client";

import { useEffect, useRef } from "react";

type NodeN = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  layer: number;
};

type EdgeN = { a: number; b: number };

/**
 * Lightweight animated computational graph.
 * Slow drift + cursor influence on nearby nodes. Static frame when
 * reduced-motion is set or the canvas is off-screen.
 */
export function NeuralNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const interactive = !reduce && !coarse;

    // Read theme colors from CSS tokens; refresh when data-theme changes.
    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        accent: cs.getPropertyValue("--color-accent").trim() || "#6e9bff",
        fg: cs.getPropertyValue("--color-fg").trim() || "#e8e8ea",
      };
    };
    let palette = readPalette();
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let nodes: NodeN[] = [];
    let edges: EdgeN[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Layer sizes — fewer nodes on small screens.
      const small = width < 720;
      const layers = small ? [4, 5, 3] : [6, 8, 8, 4];
      const gapTop = 40;
      const gapBottom = 40;

      nodes = [];
      let id = 0;
      const layerNodes: number[][] = layers.map(() => []);
      layers.forEach((count, li) => {
        const stepY = (height - gapTop - gapBottom) / Math.max(1, count - 1);
        for (let i = 0; i < count; i++) {
          const x = ((li + 0.5) / layers.length) * width;
          const y = gapTop + i * stepY + (Math.random() - 0.5) * 12;
          nodes.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
            r: 1.1 + Math.random() * 1.3,
            layer: li,
          });
          layerNodes[li].push(id);
          id++;
        }
      });

      // Edges: nearest node in the next layer (plus one extra random).
      edges = [];
      for (let li = 0; li < layers.length - 1; li++) {
        const cur = layerNodes[li];
        const next = layerNodes[li + 1];
        for (const a of cur) {
          const na = nodes[a];
          let best = next[0];
          let bestD = Infinity;
          for (const b of next) {
            const d = Math.hypot(nodes[b].x - na.x, nodes[b].y - na.y);
            if (d < bestD) {
              bestD = d;
              best = b;
            }
          }
          edges.push({ a, b: best });
          if (Math.random() > 0.55) {
            edges.push({ a, b: next[(Math.random() * next.length) | 0] });
          }
        }
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = mouse.y = -9999;
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      // drift
      for (const n of nodes) {
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
        if (n.x < 6 && n.vx < 0) n.vx = -n.vx;
        if (n.x > width - 6 && n.vx > 0) n.vx = -n.vx;
        if (n.y < 6 && n.vy < 0) n.vy = -n.vy;
        if (n.y > height - 6 && n.vy > 0) n.vy = -n.vy;
      }

      // excitement from cursor
      const active = new Set<number>();
      if (mouse.active) {
        nodes.forEach((n, i) => {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < 130 && interactive) {
            active.add(i);
            const f = (1 - d / 130) * 0.6;
            n.x += ((mouse.x - n.x) / d || 0) * f;
            n.y += ((mouse.y - n.y) / d || 0) * f;
          }
        });
      }

      // edges
      for (const e of edges) {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        const hot = interactive && (active.has(e.a) || active.has(e.b));
        ctx.globalAlpha = hot ? 0.35 : 0.06;
        ctx.strokeStyle = hot ? palette.accent : palette.fg;
        ctx.lineWidth = hot ? 1 : 0.7;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const hot = interactive && active.has(i);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.globalAlpha = hot ? 0.95 : 0.28;
        ctx.fillStyle = hot ? palette.accent : palette.fg;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (hot) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
          ctx.globalAlpha = 0.25;
          ctx.strokeStyle = palette.accent;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      // draw one static frame
      frame(last);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      build();
      if (!running) frame(last);
    });
    ro.observe(wrap);

    build();

    if (interactive) {
      canvas.addEventListener("pointermove", onPointer, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }

    if (interactive) {
      raf = requestAnimationFrame(frame);
    } else {
      frame(last);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}