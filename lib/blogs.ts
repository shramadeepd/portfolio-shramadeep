import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Blog engine.
 *
 * Each post is a folder under `public/blogs/<slug>/` containing:
 *   index.md      — frontmatter (title, date, domain, mins, excerpt, tags) + markdown body
 *   any images    — referenced relative to the md, e.g. ![caption](./chart.png)
 *
 * Files live under /public so images are served as static assets at
 * `/blogs/<folder>/<image>`. Pages are served at news-style date permalinks:
 * `/blogs/YYYY/MM/DD/<title-slug>`.
 */

const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");

export type Blog = {
  slug: string; // folder name — stable internal id
  title: string;
  date: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD, optional frontmatter `updated`
  domain: string;
  mins: string;
  excerpt: string;
  tags: string[];
  content: string; // raw markdown
  imageBase: string; // "/blogs/<slug>"
  segments: string[]; // news-style path segments: [year, month, day, title-slug]
  url: string; // "/blogs/2026/09/18/article-title"
};

/** Normalise a gray-matter date (YAML coerces to Date) to YYYY-MM-DD. */
function normaliseDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

const FALLBACK: Pick<Blog, "domain" | "mins" | "excerpt" | "tags"> = {
  domain: "LAB",
  mins: "5 min read",
  excerpt: "",
  tags: [],
};

function parseBlog(dirName: string): Blog | null {
  const mdPath = path.join(BLOGS_DIR, dirName, "index.md");
  if (!fs.existsSync(mdPath)) return null;
  const raw = fs.readFileSync(mdPath, "utf8");
  const { data, content } = matter(raw);

  const title = data.title;
  if (typeof title !== "string") return null;

  const date = normaliseDate(data.date);
  if (!date) return null;

  const updated = normaliseDate(data.updated) || undefined;

  // News-style permalink: /blogs/YYYY/MM/DD/<title-slug>.
  // A frontmatter `slug` overrides the final segment.
  const [year, month, day] = date.split("-");
  const titleSlug =
    typeof data.slug === "string" && data.slug.trim()
      ? slugify(data.slug)
      : slugify(title);
  const segments = [year, month, day, titleSlug];
  const url = `/blogs/${segments.join("/")}`;

  return {
    slug: dirName,
    title,
    date,
    updated,
    domain: typeof data.domain === "string" ? data.domain : FALLBACK.domain,
    mins: typeof data.mins === "string" ? data.mins : FALLBACK.mins,
    excerpt:
      typeof data.excerpt === "string" ? data.excerpt : FALLBACK.excerpt,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : FALLBACK.tags,
    content,
    imageBase: `/blogs/${dirName}`,
    segments,
    url,
  };
}

export function getAllBlogs(): Blog[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const entries = fs.readdirSync(BLOGS_DIR, { withFileTypes: true });
  const blogs = entries
    .filter((e) => e.isDirectory())
    .map((e) => parseBlog(e.name))
    .filter((b): b is Blog => b !== null);
  return blogs.sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlog(slug: string): Blog | null {
  return parseBlog(slug);
}

/** Look up a post by its news-style path segments (catch-all route params). */
export function getBlogBySegments(segments: string[]): Blog | null {
  const path = segments.join("/");
  return getAllBlogs().find((b) => b.segments.join("/") === path) ?? null;
}

/**
 * Resolve an image src written in markdown to an absolute URL.
 * Relative refs (./x.png or x.png) resolve against the post's folder.
 */
export function resolveImageSrc(src: string | undefined, imageBase: string): string {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  return `${imageBase}/${src.replace(/^\.\//, "")}`;
}

export function formatBlogDate(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Stable anchor id for a heading — shared by the renderer and the TOC. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type Heading = { depth: 2 | 3; text: string; id: string };

/**
 * Extract h2/h3 headings from markdown for the table of contents. Fenced
 * code blocks are ignored; inline markdown is stripped to plain text so the
 * slug matches the rendered heading.
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\s+#+\s*$/, "")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();

    if (text) headings.push({ depth, text, id: slugify(text) });
  }

  return headings;
}