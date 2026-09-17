import { permanentRedirect, redirect } from "next/navigation";
import { getBlog } from "@/lib/blogs";

/** Old /notes/<folder> route → the post's news-style permalink. */
export default async function NotesSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (blog) permanentRedirect(blog.url);
  redirect("/blogs");
}
