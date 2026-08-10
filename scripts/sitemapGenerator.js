const fs = require("fs");

const baseUrl = "https://yourdomain.com"; // ⚠️ CHANGE THIS

const keywords = fs.readFileSync("data/keywords.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

let urls = [];

keywords.forEach(k => {
  const slug = k.replace(/ /g, "-");

  urls.push(`${baseUrl}/tools/tools/${slug}`);
  urls.push(`${baseUrl}/blog/tools/${slug}`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
  </url>
`).join("")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemap);

console.log("✅ Sitemap Generated:", urls.length);
