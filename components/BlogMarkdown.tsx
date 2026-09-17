import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import { resolveImageSrc, slugify, type Blog } from "@/lib/blogs";
import type { ReactNode } from "react";

type Dims = { width: number; height: number } | null;

function measureImage(blog: Blog, src: string): Dims {
  try {
    if (/\.svg$/i.test(src)) return null;
    const urlPath = decodeURIComponent(
      resolveImageSrc(src, blog.imageBase).replace(/^\//, "")
    );
    const abs = path.join(process.cwd(), "public", urlPath);
    if (!fs.existsSync(abs)) return null;
    const buf = fs.readFileSync(abs);
    const dims = imageSize(new Uint8Array(buf));
    if (!dims || !dims.width || !dims.height) return null;
    return { width: dims.width, height: dims.height };
  } catch {
    return null;
  }
}

/** Flatten rendered children to plain text (for heading anchors). */
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return "";
}

function Figure({
  dims,
  alt,
  resolved,
}: {
  dims: Dims;
  alt: string;
  resolved: string;
}) {
  return (
    <figure className="my-9">
      {dims ? (
        <div className="overflow-hidden rounded-xl border border-line">
          <Image
            src={resolved}
            alt={alt}
            width={dims.width}
            height={dims.height}
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto w-full"
            quality={90}
          />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          loading="lazy"
          className="h-auto w-full rounded-xl border border-line"
        />
      )}
      {alt ? (
        <figcaption className="mt-3 text-center font-mono text-[11px] leading-relaxed tracking-wide text-faint">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Renders a blog post's markdown body with news-article styling.
 * Relative images are resolved against the post folder and served via
 * next/image (dimensions measured at build time). SVGs render as-is.
 * Headings get stable ids that match `extractHeadings`.
 */
export function BlogMarkdown({ blog }: { blog: Blog }) {
  return (
    <div className="article-body space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-[17.5px] leading-[1.85] text-muted">{children}</p>
          ),
          h2: ({ children }) => {
            const id = slugify(toText(children));
            return (
              <h2
                id={id}
                className="group scroll-mt-24 pt-8 font-display text-[26px] font-semibold tracking-tight text-fg"
              >
                {children}
                <a
                  href={`#${id}`}
                  aria-label="Link to this section"
                  className="heading-anchor ml-2 font-mono text-[18px] text-accent opacity-0 transition-opacity"
                >
                  #
                </a>
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = slugify(toText(children));
            return (
              <h3
                id={id}
                className="group scroll-mt-24 pt-5 font-display text-[20px] font-semibold text-fg"
              >
                {children}
                <a
                  href={`#${id}`}
                  aria-label="Link to this section"
                  className="heading-anchor ml-2 font-mono text-[15px] text-accent opacity-0 transition-opacity"
                >
                  #
                </a>
              </h3>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc space-y-2.5 pl-5 marker:text-accent/70">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2.5 pl-5 marker:font-mono marker:text-[13px] marker:text-accent/80">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 text-[16.5px] leading-relaxed text-muted">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="rounded-xl border border-accent/25 bg-accent/[0.06] p-4 text-[16.5px] leading-relaxed text-fg/90">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-fg">{children}</strong>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="link-line text-accent"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-line-soft" />,
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-xl border border-line bg-ink-2/80 p-4 font-mono text-[14px] leading-relaxed text-fg/90">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isBlock = className;
            return isBlock ? (
              <code className="font-mono">{children}</code>
            ) : (
              <code className="mx-0.5 rounded-md border border-line-soft bg-panel-2 px-1.5 py-0.5 font-mono text-[14px] text-accent-cyan">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full border-collapse text-left text-[15.5px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-panel-2 text-fg">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide text-muted">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-line-soft px-4 py-2.5 text-muted">
              {children}
            </td>
          ),
          img: ({ src, alt }) => {
            const srcStr = typeof src === "string" ? src : undefined;
            const resolved = resolveImageSrc(srcStr, blog.imageBase);
            const dims = measureImage(blog, srcStr ?? "");
            return (
              <Figure
                dims={dims}
                alt={alt ?? ""}
                resolved={resolved}
              />
            );
          },
        }}
      >
        {blog.content}
      </ReactMarkdown>
    </div>
  );
}
