import { ImageResponse } from "next/og";
import { getAllBlogs, getBlogBySegments } from "@/lib/blogs";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article cover";

export function generateStaticParams() {
  return getAllBlogs().map((b) => ({
    year: b.segments[0],
    month: b.segments[1],
    day: b.segments[2],
    slug: b.segments[3],
  }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}) {
  const { year, month, day, slug } = await params;
  const blog = getBlogBySegments([year, month, day, slug]);

  const title = blog?.title ?? "Blog";
  const domain = blog?.domain ?? "NOTES";
  const meta = blog ? `${blog.date} · ${blog.mins}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 80% 0%, #16233f 0%, #0a0a0a 55%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#6e9bff" }}>
            ~/
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 10,
              fontSize: 30,
              fontWeight: 600,
              color: "#e8e8ea",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 22,
              letterSpacing: 4,
              color: "#909098",
            }}
          >
            BLOG
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              color: "#6e9bff",
              marginBottom: 28,
            }}
          >
            {domain}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#909098" }}>
          {meta}
        </div>
      </div>
    ),
    size
  );
}
