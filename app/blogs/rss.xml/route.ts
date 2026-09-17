import { getAllBlogs } from "@/lib/blogs";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const DESCRIPTION =
  "Markdown-published technical notes on ML, speech, vision, and systems.";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const blogs = getAllBlogs();

  const items = blogs
    .map((b) => {
      const url = absoluteUrl(b.url);
      const categories = b.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(b.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(b.excerpt)}</description>
      <pubDate>${new Date(`${b.date}T00:00:00Z`).toUTCString()}</pubDate>${categories ? `\n${categories}` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${absoluteUrl("/blogs")}</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/blogs/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
