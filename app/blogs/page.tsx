import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rss } from "lucide-react";
import { getAllBlogs, formatBlogDate } from "@/lib/blogs";
import { blogIndexJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Markdown-published technical notes and articles on ML, speech, vision, and systems.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsIndex() {
  const blogs = getAllBlogs();
  const [featured, ...rest] = blogs;
  const jsonLd = blogIndexJsonLd(blogs);

  return (
    <main className="container-site pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line-soft pb-8">
        <div>
          <p className="mono-label">blog · notes from the lab</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">
            Writing &amp; research
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Long-form technical articles on ML, speech, vision, and the
            engineering around them. Published from plain markdown.
          </p>
        </div>
        <a
          href="/blogs/rss.xml"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-accent"
        >
          <Rss className="h-4 w-4" /> RSS
        </a>
      </header>

      {blogs.length === 0 ? (
        <p className="mt-10 rounded-xl border border-line bg-panel p-6 font-mono text-[13px] text-faint">
          no posts yet — drop an index.md into public/blogs/&lt;slug&gt;/ and
          rebuild.
        </p>
      ) : null}

      {featured ? (
        <section className="mt-12">
          <p className="mono-label mb-4">latest</p>
          <Link
            href={featured.url}
            className="card card-hover group block p-7 md:p-9"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] tracking-wide">
              <span className="rounded border border-accent/25 bg-accent/[0.07] px-2 py-0.5 text-accent">
                {featured.domain}
              </span>
              <span className="text-faint">
                {formatBlogDate(featured.date)} · {featured.mins}
              </span>
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent md:text-3xl">
              {featured.title}
            </h2>
            {featured.excerpt ? (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                {featured.excerpt}
              </p>
            ) : null}
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-accent">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="mt-14">
          <p className="mono-label mb-4">all articles</p>
          <ul className="border-t border-line-soft">
            {rest.map((b, i) => (
              <li key={b.slug} className="border-b border-line-soft">
                <Link
                  href={b.url}
                  className="group grid gap-2 py-6 md:grid-cols-[150px_1fr_auto] md:items-baseline md:gap-6"
                >
                  <div className="font-mono text-[11px] tracking-wide text-faint">
                    <time dateTime={b.date}>{formatBlogDate(b.date)}</time>
                    <span className="mt-1 block text-accent/80">{b.domain}</span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                      {b.title}
                    </h3>
                    {b.excerpt ? (
                      <p className="mt-1.5 line-clamp-2 max-w-2xl text-[13.5px] leading-relaxed text-faint">
                        {b.excerpt}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-faint">
                    <span>{b.mins}</span>
                    <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-accent" />
                    <span className="sr-only">article {i + 2}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
