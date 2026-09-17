import { notFound, permanentRedirect } from "next/navigation";
import { getBlog } from "@/lib/blogs";

/**
 * Legacy /blogs/<folder> links (and the old /notes/<folder> targets) → the
 * post's news-style permalink. Unknown slugs 404.
 */
export default async function LegacyBlogRedirect({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const blog = getBlog(year);
  if (blog) permanentRedirect(blog.url);
  notFound();
}
