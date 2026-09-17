"use client";

import { useReducedMotion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { terminal } from "@/data/site";

type Line = { kind: "prompt" | "out"; text: string };

function buildLines() {
  const out: Line[] = [];
  for (const block of terminal) {
    out.push({ kind: "prompt", text: `$ ${block.prompt}` });
    for (const o of block.output) out.push({ kind: "out", text: o });
  }
  return out;
}

export function Terminal() {
  const lines = useRef<Line[] | null>(null);
  if (!lines.current) lines.current = buildLines();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const total = lines.current.reduce((a, l) => a + l.text.length, 0);

  const replay = useCallback(() => {
    setCount(0);
    setDone(false);
  }, []);

  useEffect(() => {
    if (reduce) {
      setCount(total);
      setDone(true);
      return;
    }
    setCount(0);
    setDone(false);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= total) {
          window.clearInterval(id);
          setDone(true);
          return c;
        }
        return c + 1;
      });
    }, 26);
    return () => window.clearInterval(id);
  }, [reduce, total, replay]);

  // incremental text rendering
  let remaining = count;

  return (
    <div className="card overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line-soft bg-ink-2/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/20" />
        <span className="ml-2 font-mono text-[11px] tracking-wider text-muted">
          shramadeep@lab: ~
        </span>
        <button
          onClick={replay}
          className="ml-auto inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] tracking-wider text-faint transition-colors hover:text-accent"
          title="Replay"
        >
          <RotateCw className="h-3 w-3" /> REPLAY
        </button>
      </div>

      <div className="min-h-[220px] space-y-1.5 px-4 py-4 font-mono text-[13px] leading-relaxed sm:px-5">
        {lines.current.map((line, i) => {
          const len = line.text.length;
          const shown = Math.max(0, Math.min(remaining, len));
          remaining = Math.max(0, remaining - len);
          const text = line.text.slice(0, shown);
          const hidden = shown < len;
          if (hidden) {
            return (
              <div key={i} className="flex gap-2">
                {line.kind === "prompt" ? (
                  <span className="shrink-0 text-accent">❯</span>
                ) : (
                  <span className="shrink-0 text-faint">·</span>
                )}
                <span
                  className={
                    line.kind === "prompt"
                      ? "text-fg"
                      : "text-muted truncate"
                  }
                >
                  {text}
                  <span className="caret text-accent">▌</span>
                </span>
              </div>
            );
          }
          return (
            <div key={i} className="flex gap-2">
              {line.kind === "prompt" ? (
                <span className="shrink-0 text-accent">❯</span>
              ) : (
                <span className="shrink-0 text-faint">·</span>
              )}
              <span
                className={
                  line.kind === "prompt" ? "text-fg" : "text-muted"
                }
              >
                {text}
                {done && i === lines.current!.length - 1 ? (
                  <span className="caret text-accent">▌</span>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-line-soft bg-ink-2/70 px-4 py-2.5 sm:px-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
          INTERACTIVE · CLICK REPLAY TO WATCH AGAIN
        </span>
      </div>
    </div>
  );
}