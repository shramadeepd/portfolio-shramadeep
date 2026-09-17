import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { NoteBody } from "@/components/NoteBody";
import { notes, getNote } from "@/data/notes";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };
  return {
    title: `${note.title} — Shramadeep`,
    description: note.excerpt,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const prev = notes.findIndex((n) => n.slug === slug);

  return (
    <main className="container-site max-w-3xl pt-28 pb-24">
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> all notes
      </Link>

      <article>
        <header className="mt-10 mb-10 border-b border-line-soft pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] tracking-wide">
            <span className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">
              {note.domain}
            </span>
            <span className="text-faint">{note.date}</span>
            <span className="text-faint">{note.mins}</span>
            <span className="text-faint">
              note {String(prev + 1).padStart(2, "0")} /{" "}
              {String(notes.length).padStart(2, "0")}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-fg md:text-4xl">
            {note.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {note.excerpt}
          </p>
        </header>

        <NoteBody note={note} />

        <footer className="mt-14 border-t border-line-soft pt-6">
          <p className="font-mono text-[11px] tracking-wide text-faint">
            {"// end of note — "}
            {note.title}
          </p>
        </footer>
      </article>
    </main>
  );
}