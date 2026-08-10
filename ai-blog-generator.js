const fs = require("fs");
require("dotenv").config();

const topics = [
  "best seo tools 2026",
  "how to rank website fast",
  "ai tools for blogging",
];

async function generate() {
  let posts = {};

  for (let topic of topics) {
    const res = await fetch("http://localhost:3000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `Write a 1000 word SEO optimized blog on: ${topic}`
      })
    });

    const data = await res.json();

    const slug = topic.replace(/\s+/g, "-");

    posts[slug] = {
      title: topic,
      content: data.result
    };
  }

  fs.writeFileSync(
    "src/data/blogs.ts",
    "const blogs = " + JSON.stringify(posts, null, 2) + ";\n\nexport default blogs;"
  );

  console.log("🔥 AI BLOGS GENERATED!");
}

generate();
