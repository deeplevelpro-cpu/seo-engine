const fs = require("fs");

const keywords = fs.readFileSync("data/keywords.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

let blogKeywords = [];

keywords.forEach((k) => {
  blogKeywords.push(`what is ${k}`);
  blogKeywords.push(`how to use ${k}`);
  blogKeywords.push(`${k} guide`);
  blogKeywords.push(`${k} tutorial`);
  blogKeywords.push(`best ${k}`);
});

const unique = [...new Set(blogKeywords)];

fs.writeFileSync("data/blogs.txt", unique.join("\n"));

console.log("🧠 BLOG KEYWORDS:", unique.length);
