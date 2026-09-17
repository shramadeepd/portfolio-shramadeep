// Renders the block-based note content (used on note detail pages).
import type { Note } from "@/data/notes";

export function NoteBody({ note }: { note: Note }) {
  return (
    <div className="space-y-6">
      {note.blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p
                key={i}
                className="text-[15.5px] leading-[1.85] text-muted"
              >
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 font-display text-xl font-semibold text-fg"
              >
                {b.text}
              </h2>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-line bg-ink-2/80 p-4 font-mono text-[12.5px] leading-relaxed text-fg/90"
              >
                {b.text}
              </pre>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-3 text-[14.5px] leading-relaxed text-muted"
                  >
                    <span className="shrink-0 text-accent">—</span>
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-xl border border-accent/25 bg-accent/[0.06] p-4"
              >
                <p className="text-[14px] leading-relaxed text-fg/90">
                  {b.text}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}