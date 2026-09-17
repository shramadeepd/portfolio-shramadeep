import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { BackToBlog } from "@/components/BackToBlog";
import { ShareLinks } from "@/components/ShareLinks";
import { site } from "@/data/site";
import {
  getAllBlogs,
  getBlogBySegments,
  formatBlogDate,
  extractHeadings,
} from "@/lib/blogs";
import {
  SITE_NAME,
  SITE_URL,
  articleJsonLd,
  breadcrumbJsonLd,
  absoluteUrl,
} from "@/lib/seo";

type RouteParams = {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({
    year: b.segments[0],
    month: b.segments[1],
    day: b.segments[2],
    slug: b.segments[3],
  }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const blog = getBlogBySegments([year, month, day, slug]);
  if (!blog) return { title: "Post not found" };

  const published = new Date(`${blog.date}T00:00:00Z`).toISOString();
  const modified = new Date(
    `${blog.updated ?? blog.date}T00:00:00Z`
  ).toISOString();

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: blog.url },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    keywords: blog.tags,
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: blog.url,
      siteName: SITE_NAME,
      publishedTime: published,
      modifiedTime: modified,
      authors: [SITE_NAME],
      section: blog.domain,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogPage({ params }: RouteParams) {
  const { year, month, day, slug } = await params;
  const exact = getBlogBySegments([year, month, day, slug]);
  const blog =
    exact ?? getAllBlogs().find((b) => b.url.endsWith(`/${slug}`));
  if (!blog) notFound();
  if (!exact) permanentRedirect(blog.url);

  const blogs = getAllBlogs();
  const idx = blogs.findIndex((b) => b.slug === blog.slug);
  const prev = blogs[idx + 1];
  const next = blogs[idx - 1];

  const headings = extractHeadings(blog.content);
  const articleUrl = absoluteUrl(blog.url);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
    { name: blog.title, path: blog.url },
  ];

  return (
    <main className="container-site max-w-3xl pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(blog)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] tracking-wide text-faint"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-fg">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blogs" className="transition-colors hover:text-fg">
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="truncate text-muted" aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

      <article className="mt-8">
        <header className="border-b border-line-soft pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] tracking-wide">
            <span className="rounded border border-accent/25 bg-accent/[0.07] px-2 py-0.5 text-accent">
              {blog.domain}
            </span>
            <time dateTime={blog.date} className="text-faint">
              {formatBlogDate(blog.date)}
            </time>
            {blog.updated ? (
              <span className="text-faint">
                Updated {formatBlogDate(blog.updated)}
              </span>
            ) : null}
            <span className="text-faint">{blog.mins}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-fg md:text-[40px]">
            {blog.title}
          </h1>

          {blog.excerpt ? (
            <p className="mt-5 text-[18px] leading-relaxed text-muted">
              {blog.excerpt}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink-2 font-mono text-[12px] text-accent">
              {site.initials}
            </span>
            <div>
              <div className="text-[13.5px] font-medium text-fg">
                {site.name}
              </div>
              <div className="font-mono text-[10px] tracking-wide text-faint">
                {site.role}
              </div>
            </div>
            <div className="ml-auto">
              <ShareLinks url={articleUrl} title={blog.title} />
            </div>
          </div>
        </header>

        {headings.length >= 3 ? (
          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-xl border border-line bg-panel/60 p-5"
          >
            <p className="mono-label mb-3">on this page</p>
            <ol className="space-y-2">
              {headings.map((h) => (
                <li key={h.id} className={h.depth === 3 ? "pl-5" : ""}>
                  <a
                    href={`#${h.id}`}
                    className="text-[14.5px] text-muted transition-colors hover:text-accent"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mt-2">
          <BlogMarkdown blog={blog} />
        </div>

        {blog.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-line bg-ink-2/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-faint"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}

        <section className="mt-14 rounded-xl border border-line bg-panel p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-ink-2 font-mono text-[13px] text-accent">
              {site.initials}
            </span>
            <div>
              <p className="mono-label">about the author</p>
              <p className="mt-2 text-[15px] font-medium text-fg">
                {site.name}
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                {site.intro}
              </p>
              <Link
                href="/"
                className="mt-3 inline-flex font-mono text-[11.5px] tracking-wide text-accent transition-colors hover:text-fg"
              >
                View portfolio →
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-line-soft pt-6">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <Link href={prev.url} className="group block max-w-[45%]">
                <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                  ← PREVIOUS
                </span>
                <span className="mt-1 block truncate text-[13.5px] text-fg/85 transition-colors group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.url}
                className="group block max-w-[45%] text-right"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                  NEXT →
                </span>
                <span className="mt-1 block truncate text-[13.5px] text-fg/85 transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <Link
            href="/blogs"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" /> all articles
          </Link>
        </footer>
      </article>

      <BackToBlog />
    </main>
  );
}
