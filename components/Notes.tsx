import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllBlogs, formatBlogDate } from "@/lib/blogs";
import { Reveal, SectionHeading } from "./ui";

export function Notes() {
  const blogs = getAllBlogs();

  return (
    <section id="notes" className="section">
      <div className="container-site">
        <SectionHeading
          index="11"
          label="notes from the lab"
          title={<>Notes from the lab</>}
          sub="Technical notes written to actually understand things — short explanations of concepts I've used in projects. Published from plain markdown."
          action={
            <Link
              href="/blogs"
              className="link-line font-mono text-[12px] tracking-wide text-accent"
            >
              ALL POSTS →
            </Link>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogs.slice(0, 6).map((b, i) => (
            <Reveal key={b.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={b.url}
                className="card card-hover group flex h-full flex-col p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                    {b.domain}
                  </span>
                  <span className="font-mono text-[10px] text-faint">
                    {formatBlogDate(b.date)} · {b.mins}
                  </span>
                </div>
                <h3 className="mt-3.5 text-[16px] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                  {b.title}
                </h3>
                {b.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-faint">
                    {b.excerpt}
                  </p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-[11px] tracking-wide text-muted transition-colors group-hover:text-accent">
                  Read post
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