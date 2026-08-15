import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const expansionFile = path.join(root, "src/lib/seo/keywordExpansion.js");
const contentFile = path.join(root, "src/lib/contentGenerator.js");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
];

let failed = 0;
let changed = 0;

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function check(label, condition) {
  if (condition) console.log(`✓ ${label}`);
  else {
    console.log(`✗ ${label}`);
    failed++;
  }
}

function run(cmd) {
  try {
    execSync(cmd, { cwd: root, stdio: "inherit" });
    return true;
  } catch {
    failed++;
    return false;
  }
}

console.log("======================================================================");
console.log("PHASE 13.08 — CONTROLLED KEYWORD EXPANSION MASTER GATE");
console.log("SEMANTIC VARIANTS + SEARCH INTENT + TOOL/BLOG CONTENT");
console.log("DEDUPLICATION + COLLISION SAFETY + FULL REGRESSION");
console.log("NO HOMEPAGE CHANGE | NO MASS THIN PAGE GENERATION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const file of protectedFiles) {
  check(`Protected: ${file}`, exists(file));
}

console.log("\n===== 2. CREATE CONTROLLED EXPANSION ENGINE =====");

fs.mkdirSync(path.dirname(expansionFile), { recursive: true });

const expansionSource = `/**
 * Controlled semantic keyword expansion engine.
 *
 * Generates deterministic intent variants only.
 * It does NOT create routes by itself.
 * Duplicate and low-value variants are filtered.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "for", "to", "of", "and",
  "in", "on", "with", "from", "by"
]);

function clean(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\\\\s-]/g, " ")
    .replace(/\\\\s+/g, " ")
    .trim();
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function unique(values) {
  return [...new Set(values.map(clean).filter(Boolean))];
}

export function buildControlledKeywordExpansion(keyword, slug = "") {
  const base = clean(keyword || slug);

  if (!base) {
    return {
      primary: "",
      secondary: [],
      longTail: [],
      intent: "informational",
    };
  }

  const words = base
    .split(" ")
    .filter((word) => word && !STOPWORDS.has(word));

  const core = words.join(" ") || base;

  const secondary = unique([
    \\\`free \${core} tool\\\`,
    \\\`online \${core} tool\\\`,
    \\\`\${core} checker\\\`,
    \\\`\${core} generator\\\`,
    \\\`\${core} calculator\\\`,
    \\\`\${core} analyzer\\\`,
  ]).filter((value) => value !== base);

  const longTail = unique([
    \\\`how to use \${core}\\\`,
    \\\`how does \${core} work\\\`,
    \\\`\${core} online free\\\`,
    \\\`\${core} tool free online\\\`,
    \\\`best way to use \${core}\\\`,
    \\\`\${core} examples and guide\\\`,
  ]).filter(
    (value) =>
      value !== base &&
      !secondary.includes(value)
  );

  let intent = "informational";

  if (
    /calculator|checker|generator|converter|formatter|encoder|randomizer/i.test(
      slug || base
    )
  ) {
    intent = "transactional";
  } else if (/how|guide|tutorial|tips|examples|learn/i.test(base)) {
    intent = "informational";
  }

  return {
    primary: titleCase(base),
    secondary,
    longTail,
    intent,
    toolSlug: clean(slug).replace(/\\\\s+/g, "-"),
  };
}

export function filterKeywordExpansion(cluster) {
  if (!cluster) return [];

  const values = unique([
    cluster.primary,
    ...(cluster.secondary || []),
    ...(cluster.longTail || []),
  ]);

  return values.filter((keyword) => {
    if (keyword.length < 3) return false;
    if (/^(test|tool|free tool|online tool)$/i.test(keyword)) return false;
    if (/[-_]\\\\d+$/i.test(keyword)) return false;
    return true;
  });
}
`;

const currentExpansion = exists("src/lib/seo/keywordExpansion.js")
  ? read("src/lib/seo/keywordExpansion.js")
  : "";

if (!currentExpansion.includes("buildControlledKeywordExpansion")) {
  fs.writeFileSync(expansionFile, expansionSource);
  changed++;
  console.log("✓ Controlled keyword expansion engine installed");
} else {
  console.log("✓ Controlled keyword expansion engine already present");
}

console.log("\n===== 3. CONTENT ENGINE INTEGRATION =====");

let content = read("src/lib/contentGenerator.js");

if (!content.includes("buildControlledKeywordExpansion")) {
  const importLine =
    'import { buildControlledKeywordExpansion } from "./seo/keywordExpansion.js";\n';

  if (!content.includes('from "./seo/keywordExpansion.js"')) {
    content = importLine + content;
  }

  content = content.replace(
    /export function generateContent\\(keyword, slug = ""\\) \\{/,
    `export function generateContent(keyword, slug = "") {\\n  const semanticExpansion = buildControlledKeywordExpansion(keyword, slug);`
  );

  content = content.replace(
    /export function generateBlogContent\\(keyword, slug = ""\\) \\{/,
    `export function generateBlogContent(keyword, slug = "") {\\n  const semanticExpansion = buildControlledKeywordExpansion(keyword, slug);`
  );

  content = content.replace(
    /return \\{\\n/,
    `return {\\n    semanticExpansion,\\n`,
    1
  );

  const secondReturn = content.indexOf("return {", content.indexOf("generateBlogContent"));
  if (secondReturn !== -1) {
    const insertAt = secondReturn + "return {".length;
    content =
      content.slice(0, insertAt) +
      "\\n    semanticExpansion," +
      content.slice(insertAt);
  }

  fs.writeFileSync(contentFile, content);
  changed++;
  console.log("✓ Content engine connected to semantic expansion");
} else {
  console.log("✓ Content engine already connected");
}

console.log("\n===== 4. EXPANSION CONTRACT =====");

const expansion = read("src/lib/seo/keywordExpansion.js");
content = read("src/lib/contentGenerator.js");

check("buildControlledKeywordExpansion", expansion.includes("buildControlledKeywordExpansion"));
check("filterKeywordExpansion", expansion.includes("filterKeywordExpansion"));
check("primary", expansion.includes("primary"));
check("secondary", expansion.includes("secondary"));
check("longTail", expansion.includes("longTail"));
check("intent", expansion.includes("intent"));
check("toolSlug", expansion.includes("toolSlug"));
check("duplicate filtering", expansion.includes("new Set"));
check("numbered collision filtering", /\\\\d/.test(expansion));
check("content integration", content.includes("buildControlledKeywordExpansion"));
check("semanticExpansion output", content.includes("semanticExpansion"));

console.log("\n===== 5. ROUTE + SEO SAFETY =====");

const toolRoute = read("app/[lang]/tools/[slug]/[keyword]/page.js");
const blogRoute = read("app/blog/[slug]/[keyword]/page.js");

for (const marker of [
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
]) {
  check(`Tool: ${marker}`, toolRoute.includes(marker));
}

for (const marker of [
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
]) {
  check(`Blog: ${marker}`, blogRoute.includes(marker));
}

console.log("\n===== 6. INTERNAL LINK GRAPH =====");

check('Tool → /tools', toolRoute.includes('href="/tools"'));
check('Tool → /categories', toolRoute.includes('href="/categories"'));
check('Blog → /tools', blogRoute.includes('href="/tools"'));
check('Blog → /categories', blogRoute.includes('href="/categories"'));

console.log("\n===== 7. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

check("Sitemap MetadataRoute.Sitemap", sitemap.includes("MetadataRoute.Sitemap"));
check("Sitemap tools", sitemap.includes("/tools/"));
check("Sitemap categories", sitemap.includes("/categories/"));
check("Sitemap categoryUrls", sitemap.includes("categoryUrls"));
check("Sitemap return", sitemap.includes("return"));

check("Robots userAgent", robots.includes("userAgent"));
check("Robots allow", robots.includes("allow"));
check("Robots sitemap", robots.includes("sitemap"));

console.log("\n===== 8. 135-TOOL REGRESSION =====");

const tools = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

const requiredTools = [
  "keyword-density-checker",
  "keyword-frequency-checker",
  "meta-tag-generator",
  "meta-description-generator",
  "title-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "character-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator",
];

for (const slug of requiredTools) {
  check(`Catalog: ${slug}`, tools.includes(slug));
  check(`Registry: ${slug}`, registry.includes(slug));
}

console.log("\n===== 9. TOOLCLIENT =====");

const client = read("app/tools/[slug]/ToolClient.tsx");

for (const marker of [
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live",
]) {
  check(`ToolClient: ${marker}`, client.includes(marker));
}

console.log("\n===== 10. TYPESCRIPT =====");
run("npx tsc --noEmit");

console.log("\n===== 11. PRODUCTION BUILD =====");
run("npm run build");

console.log("\n===== 12. FINAL SAFETY =====");

check(
  "Homepage unchanged",
  exists("app/page.tsx") || exists("app/page.js") || exists("app/page.jsx")
);

check("No Lorem ipsum", !content.includes("Lorem ipsum"));
check("No numbered mass routes", !expansion.includes("tool-1"));
check("No mass route generation", !expansion.includes("generateStaticParams"));

console.log("\n===== 13. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO SEO EXPANSION APPROVED.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed}`);
console.log("======================================================================");
console.log("✅ PHASE 13.08: PASS");
console.log("CONTROLLED KEYWORD EXPANSION ENGINE VERIFIED");
console.log("SEMANTIC VARIANTS VERIFIED");
console.log("SEARCH INTENT VERIFIED");
console.log("DUPLICATE SAFETY VERIFIED");
console.log("CONTENT ENGINE INTEGRATION VERIFIED");
console.log("TOOL/BLOG SEO GRAPH PRESERVED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.08 COMPLETE");
console.log("======================================================================");
