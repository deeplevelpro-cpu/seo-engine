#!/usr/bin/env node

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

function getArg(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
}

const file = getArg("--file");
const image = getArg("--image");

if (!file) {
  console.log("Usage: node scripts/publish-article.mjs --file ARTICLE.md --image IMAGE.png");
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.error("❌ Article file not found:", file);
  process.exit(1);
}

const registryPath = "data/articles.ts";

if (!fs.existsSync(registryPath)) {
  console.error("❌ Article registry not found.");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8").trim();

if (!raw.startsWith("---")) {
  console.error("❌ Article must start with frontmatter.");
  process.exit(1);
}

const end = raw.indexOf("---", 3);

if (end === -1) {
  console.error("❌ Frontmatter closing marker missing.");
  process.exit(1);
}

const frontmatter = raw.slice(3, end).trim();
const body = raw.slice(end + 3).trim();

const meta = {};

for (const line of frontmatter.split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);

  if (!match) continue;

  let value = match[2].trim();

  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }

  meta[match[1]] = value;
}

const required = [
  "title",
  "description",
  "category",
  "tags",
  "seoTitle",
  "seoDescription"
];

for (const key of required) {
  if (!meta[key]) {
    console.error("❌ Missing field:", key);
    process.exit(1);
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

const slug = slugify(meta.slug || meta.title);

const registry = fs.readFileSync(registryPath, "utf8");

if (
  registry.includes(`slug: "${slug}"`) ||
  registry.includes(`slug: '${slug}'`)
) {
  console.error("❌ Duplicate slug:", slug);
  process.exit(1);
}

const tags = meta.tags
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

const today = new Date().toISOString().slice(0, 10);

let featuredImage;

if (image) {
  const expanded = image.replace(/^~/, process.env.HOME || "~");

  if (!fs.existsSync(expanded)) {
    console.error("❌ Image not found:", expanded);
    process.exit(1);
  }

  const ext = path.extname(expanded).toLowerCase();

  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    console.error("❌ Unsupported image format:", ext);
    process.exit(1);
  }

  const destination = `public/articles/${slug}${ext}`;

  fs.copyFileSync(expanded, destination);

  featuredImage = `/articles/${slug}${ext}`;

  console.log("✓ Featured image:", featuredImage);
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];
  let current = null;
  let paragraphs = [];
  let bullets = [];
  let code = [];
  let inCode = false;

  function flush() {
    if (!current) return;

    const section = {};

    if (current.heading) section.heading = current.heading;
    if (paragraphs.length) section.paragraphs = [...paragraphs];
    if (bullets.length) section.bullets = [...bullets];
    if (code.length) section.code = code.join("\n");

    if (Object.keys(section).length) {
      sections.push(section);
    }

    current = null;
    paragraphs = [];
    bullets = [];
    code = [];
  }

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (!inCode) {
        inCode = true;
        code = [];
      } else {
        inCode = false;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    const heading = line.match(/^#{2,6}\s+(.+)$/);

    if (heading) {
      flush();
      current = { heading: heading[1].trim() };
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.+)$/);

    if (bullet) {
      current ??= {};
      bullets.push(bullet[1].trim());
      continue;
    }

    if (!line.trim()) continue;

    current ??= {};
    paragraphs.push(line.trim());
  }

  flush();
  return sections;
}

const content = parseMarkdown(body);

if (!content.length) {
  console.error("❌ No article content detected.");
  process.exit(1);
}

const article = {
  slug,
  title: meta.title,
  description: meta.description,
  category: meta.category,
  tags,
  publishedAt: meta.publishedAt || today,
  updatedAt: meta.updatedAt || today,
  author: meta.author || "AI Tool Engine",
  readingTime: meta.readingTime || "8 min read",
  ...(featuredImage ? { featuredImage } : {}),
  seoTitle: meta.seoTitle,
  seoDescription: meta.seoDescription,
  content
};

const articleText = JSON.stringify(article, null, 2);
const closing = "\n];";
const position = registry.lastIndexOf(closing);

if (position === -1) {
  console.error("❌ Could not locate article registry ending.");
  process.exit(1);
}

const updated =
  registry.slice(0, position) +
  ",\n  " +
  articleText +
  registry.slice(position);

fs.writeFileSync(registryPath, updated);

console.log("============================================================");
console.log("🎉 ARTICLE ADDED");
console.log("============================================================");
console.log("✓ Title:", meta.title);
console.log("✓ Slug:", slug);
console.log("✓ Category:", meta.category);
console.log("✓ Tags:", tags.join(", "));
console.log("✓ Sections:", content.length);
console.log("✓ URL:", `/articles/${slug}`);
console.log("============================================================");
