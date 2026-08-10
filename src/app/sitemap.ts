import tools from "@/data/tools";

export default function sitemap() {
  const baseUrl = "http://localhost:3000";

  return Object.entries(tools).map(([slug, tool]) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
  }));
}
