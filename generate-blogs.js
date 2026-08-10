const fs = require("fs");

const topics = [
  "best seo tools",
  "keyword research tools",
  "free ai writing tools",
  "youtube seo tips",
  "how to rank on google",
  "blogging tips for beginners",
  "on page seo guide",
  "technical seo checklist",
  "content writing tips",
  "increase website traffic"
];

const TOTAL = 20; // 🔥 increase later

if (!fs.existsSync("src/data")) {
  fs.mkdirSync("src/data", { recursive: true });
}

let posts = {};

topics.forEach((topic, i) => {
  const slug = topic.replace(/\s+/g, "-");

  posts[slug] = {
    title: topic.toUpperCase(),
    content: `This is an SEO optimized article about ${topic}. It explains everything in detail.`,
  };
});

fs.writeFileSync(
  "src/data/blogs.ts",
  "const blogs = " + JSON.stringify(posts, null, 2) + ";\n\nexport default blogs;"
);

console.log("🔥 BLOGS GENERATED!");
