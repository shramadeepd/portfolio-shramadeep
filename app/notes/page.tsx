import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notes } from "@/data/notes";

export const metadata: Metadata = {
  title: "Notes from the lab — Shramadeep",
  description: "Technical notes on ML, speech, vision, and systems.",
};

export default function NotesIndex() {
  return (
    <main className="container-site pt-28 pb-24">
      <Link
        href="/#notes"
        className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> back to site
      </Link>

      <header className="mt-10 mb-12">
        <p className="mono-label">notes from the lab</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          Notes from the lab
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
          Written to understand things deeply — maths, models, and the
          engineering around them.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((n, i) => (
          <a
            key={n.slug}
            href={`/notes/${n.slug}`}
            className="card card-hover group flex flex-col p-6"
          >
            <div className="flex items-center justify-between font-mono text-[10.5px]">
              <span className="text-accent">{n.domain}</span>
              <span className="text-faint">
                {n.date} · {n.mins}
              </span>
            </div>
            <h2 className="mt-4 flex items-start justify-between gap-3 text-lg font-medium text-fg transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}. {n.title}
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
            </h2>
            <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-faint">
              {n.excerpt}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}