"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notes } from "@/data/notes";
import { Reveal, SectionHeading } from "./ui";

export function Notes() {
  return (
    <section id="notes" className="section">
      <div className="container-site">
        <SectionHeading
          index="11"
          label="notes from the lab"
          title={<>Notes from the lab</>}
          sub="Technical notes written to actually understand things — short explanations of concepts I've used in projects, useful for my future self too."
          action={
            <Link
              href="/notes"
              className="link-line font-mono text-[12px] tracking-wide text-accent"
            >
              ALL NOTES →
            </Link>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {notes.slice(0, 6).map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/notes/${n.slug}`}
                className="card card-hover group flex h-full flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                    {n.domain}
                  </span>
                  <span className="font-mono text-[10px] text-faint">
                    {n.mins}
                  </span>
                </div>
                <h3 className="mt-3.5 text-[16px] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-faint">
                  {n.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-accent">
                  Read note
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}