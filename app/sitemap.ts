import type { MetadataRoute } from "next";
import tools from "@/data/tools";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://seo-engine-mu.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];


  const categoryUrls: MetadataRoute.Sitemap = [
    ...new Set([
      "seo",
      "content",
      "developer",
      "writing",
      "marketing",
      "social-media",
      "design",
      "productivity",
      "finance",
      "education"
    ]),
  ].map((category) => ({
    url: `${siteUrl}/categories/${category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolUrls: MetadataRoute.Sitemap = Object.keys(tools).map((slug) => ({
    url: `${siteUrl}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...categoryUrls, ...toolUrls];
}
