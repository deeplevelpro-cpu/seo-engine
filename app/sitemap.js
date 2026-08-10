import fs from "fs";
import path from "path";

export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const filePath = path.join(process.cwd(), "data/keywords.txt");

  if (!fs.existsSync(filePath)) return [];

  const keywords = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .filter(Boolean);

  const urls = keywords.map((k) => ({
    url: `${baseUrl}/tools/tool/${k.replace(/\s+/g, "-")}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...urls,
  ];
}
