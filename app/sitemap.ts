import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getAllBlogs();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blogs"),
      lastModified: blogs[0]
        ? new Date(`${blogs[0].updated ?? blogs[0].date}T00:00:00Z`)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs.map((b) => ({
      url: absoluteUrl(b.url),
      lastModified: new Date(`${b.updated ?? b.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
