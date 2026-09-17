import { links, site } from "@/data/site";
import type { Blog } from "@/lib/blogs";

/**
 * SEO helpers.
 *
 * Set `NEXT_PUBLIC_SITE_URL` to your canonical origin (e.g.
 * https://yourname.com). On Vercel it falls back to the production domain,
 * then the deployment URL, then localhost — so builds never crash.
 */
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "http://localhost:3000";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = site.name;
export const SITE_TAGLINE = "Machine Learning Engineer · AI Researcher · Data Scientist";

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const socialProfiles = [links.github, links.linkedin, links.twitter].filter(
  (u) => u && u !== "#"
);

export const AUTHOR = {
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: SITE_URL,
  ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
};

/** schema.org NewsArticle for a blog post. */
export function articleJsonLd(blog: Blog) {
  const url = absoluteUrl(blog.url);
  const image = absoluteUrl(`${blog.url}/opengraph-image`);
  const published = new Date(`${blog.date}T00:00:00Z`).toISOString();
  const modified = new Date(
    `${blog.updated ?? blog.date}T00:00:00Z`
  ).toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.excerpt || undefined,
    image: [image],
    datePublished: published,
    dateModified: modified,
    author: [AUTHOR],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: blog.domain,
    ...(blog.tags.length ? { keywords: blog.tags.join(", ") } : {}),
    inLanguage: "en",
  };
}

/** schema.org BreadcrumbList from [name, path] pairs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** schema.org Blog for the index page. */
export function blogIndexJsonLd(blogs: Blog[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} — Blog`,
    url: absoluteUrl("/blogs"),
    description:
      "Markdown-published technical notes on ML, speech, vision, and systems.",
    author: [AUTHOR],
    blogPost: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      url: absoluteUrl(b.url),
      datePublished: new Date(`${b.date}T00:00:00Z`).toISOString(),
    })),
  };
}
