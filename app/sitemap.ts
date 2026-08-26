import { SITE_URL } from "../lib/site-config";
import type { MetadataRoute } from "next";
import tools from "@/data/tools";

const siteUrl = SITE_URL;

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
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
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
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
      priority: 0.5,
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

  // Build category URLs directly from the authoritative tool registry.
  const categories = [
    ...new Set(
      Object.values(tools)
        .map((tool) => tool.category.trim().toLowerCase())
        .filter(Boolean)
    ),
  ].sort();

  const categoryUrls: MetadataRoute.Sitemap = categories.map(
    (category) => ({
      url: `${siteUrl}/categories/${encodeURIComponent(category)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  // Build canonical tool URLs from the same registry used by
  // /tools/[slug].
  const toolUrls: MetadataRoute.Sitemap = Object.keys(tools).map(
    (slug) => ({
      url: `${siteUrl}/tools/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // Safety: deduplicate the final sitemap by URL.
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...toolUrls,
  ];

  const seen = new Set<string>();

  return allUrls.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}
