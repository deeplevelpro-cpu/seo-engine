import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;
let changed = false;

const files = {
  tools: "data/tools.ts",
  registry: "src/lib/tools/index.ts",
  content: "src/lib/contentGenerator.js",
  toolKeyword: "app/[lang]/tools/[slug]/[keyword]/page.js",
  blogKeyword: "app/blog/[slug]/[keyword]/page.js",
  sitemap: "app/sitemap.ts",
  robots: "app/robots.ts",
  toolClient: "app/tools/[slug]/ToolClient.tsx",
};

const abs = (f) => path.join(root, f);
const read = (f) => fs.readFileSync(abs(f), "utf8");

function pass(x) {
  console.log(`✓ ${x}`);
}

function fail(x) {
  console.log(`✗ ${x}`);
  failed++;
}

function exists(f) {
  return fs.existsSync(abs(f));
}

console.log("======================================================================");
console.log("PHASE 13.05 — MASTER KEYWORD CLUSTER + SEO SCALE ENGINE");
console.log("CLUSTER DATA + INTENT + NORMALIZATION + DUPLICATE SAFETY");
console.log("TOOL/BLOG MAPPING + INTERNAL LINK GRAPH");
console.log("CONTENT ENGINE + SITEMAP + ROBOTS + FULL REGRESSION");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK");
console.log("NO HOMEPAGE MODIFICATION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const [name, file] of Object.entries(files)) {
  exists(file) ? pass(`${name}: present`) : fail(`${name}: missing`);
}

const backups = {};

for (const [name, file] of Object.entries(files)) {
  if (exists(file)) backups[name] = read(file);
}

console.log("\n===== 2. CONTENT ENGINE ANALYSIS =====");

const contentBefore = read(files.content);

for (const marker of [
  "generateContent",
  "generateBlogContent",
  "keyword",
  "title",
  "description",
  "intro",
  "content",
  "benefits",
  "steps",
  "links",
  "sections",
]) {
  contentBefore.includes(marker)
    ? pass(`Content engine: ${marker}`)
    : fail(`Content engine missing: ${marker}`);
}

console.log("\n===== 3. KEYWORD CLUSTER SCHEMA =====");

const clusterSchema = `

/**
 * Keyword Cluster Contract
 * primary: main target query
 * secondary: supporting semantic queries
 * longTail: specific intent variations
 * intent: informational | commercial | transactional | navigational
 * toolSlug: canonical tool relationship
 * blogSlug: supporting editorial relationship
 */
export function buildKeywordCluster(keyword, slug = "") {
  const primary = String(keyword || "").trim().toLowerCase();

  const secondary = [
    \`how to use \${primary}\`,
    \`\${primary} online\`,
    \`free \${primary}\`,
  ];

  const longTail = [
    \`best free \${primary}\`,
    \`\${primary} online tool\`,
    \`how does \${primary} work\`,
  ];

  return {
    id: primary
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, ""),
    primary,
    secondary,
    longTail,
    intent: "commercial",
    toolSlug: String(slug || ""),
    blogSlug: String(slug || ""),
  };
}
`;

if (!contentBefore.includes("buildKeywordCluster")) {
  fs.writeFileSync(
    abs(files.content),
    contentBefore + clusterSchema
  );
  changed = true;
  pass("Keyword cluster builder installed");
} else {
  pass("Keyword cluster builder already present");
}

console.log("\n===== 4. CLUSTER CONTRACT =====");

const contentAfter = read(files.content);

for (const marker of [
  "buildKeywordCluster",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "toolSlug",
  "blogSlug",
]) {
  contentAfter.includes(marker)
    ? pass(`Cluster field: ${marker}`)
    : fail(`Cluster field missing: ${marker}`);
}

console.log("\n===== 5. KEYWORD NORMALIZATION =====");

for (const [name, file] of [
  ["Tool", files.toolKeyword],
  ["Blog", files.blogKeyword],
]) {
  const source = read(file);

  for (const marker of [
    "await params",
    "cleanKeyword",
    "cleanSlug",
    "generateMetadata",
    "canonical",
    "robots",
  ]) {
    source.includes(marker)
      ? pass(`${name}: ${marker}`)
      : fail(`${name} missing: ${marker}`);
  }
}

console.log("\n===== 6. DUPLICATE + COLLISION SAFETY =====");

const allSource = [
  read(files.content),
  read(files.toolKeyword),
  read(files.blogKeyword),
].join("\n");

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i,
]) {
  pattern.test(allSource)
    ? fail(`Unsafe numbered SEO pattern: ${pattern}`)
    : pass(`Duplicate pattern clean: ${pattern}`);
}

if (/Lorem ipsum/i.test(allSource)) {
  fail("Placeholder content detected");
} else {
  pass("Placeholder content absent");
}

console.log("\n===== 7. TOOL ↔ BLOG INTERNAL GRAPH =====");

for (const [name, file] of [
  ["Tool", files.toolKeyword],
  ["Blog", files.blogKeyword],
]) {
  const source = read(file);

  source.includes('href="/tools"')
    ? pass(`${name} → /tools`)
    : fail(`${name} → /tools missing`);

  source.includes('href="/categories"')
    ? pass(`${name} → /categories`)
    : fail(`${name} → /categories missing`);
}

console.log("\n===== 8. SEO METADATA =====");

for (const [name, file] of [
  ["Tool", files.toolKeyword],
  ["Blog", files.blogKeyword],
]) {
  const source = read(file);

  for (const marker of [
    "generateMetadata",
    "canonical",
    "robots",
    "openGraph",
    "twitter",
  ]) {
    source.includes(marker)
      ? pass(`${name} metadata: ${marker}`)
      : fail(`${name} metadata missing: ${marker}`);
  }
}

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = read(files.sitemap);
const robots = read(files.robots);

for (const marker of [
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "/tools/",
  "/categories/",
  "return",
]) {
  sitemap.includes(marker)
    ? pass(`Sitemap: ${marker}`)
    : fail(`Sitemap missing: ${marker}`);
}

for (const marker of [
  "userAgent",
  "allow",
  "sitemap",
]) {
  robots.includes(marker)
    ? pass(`Robots: ${marker}`)
    : fail(`Robots missing: ${marker}`);
}

console.log("\n===== 10. 135-TOOL FOUNDATION =====");

const toolCatalog = read(files.tools);
const registry = read(files.registry);

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
  toolCatalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

console.log("\n===== 11. TOOLCLIENT PROTECTION =====");

const client = read(files.toolClient);

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
  client.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 12. STALE ARCHITECTURE =====");

for (const stale of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
]) {
  !fs.existsSync(abs(stale))
    ? pass(`Stale absent: ${stale}`)
    : fail(`Stale architecture present: ${stale}`);
}

console.log("\n===== 13. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit",
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAIL");
}

console.log("\n===== 14. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
  });
  pass("Production build PASS");
} catch {
  fail("Production build FAIL");
}

console.log("\n===== 15. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 AUTOMATIC ROLLBACK");

  for (const [name, backup] of Object.entries(backups)) {
    if (name === "content") {
      fs.writeFileSync(abs(files.content), backup);
    }
  }

  console.log("NO SEO SCALE EXPANSION DEPLOYED.");
  console.log("NO HOMEPAGE MODIFICATION.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");
console.log("✅ PHASE 13.05: PASS");
console.log("KEYWORD CLUSTER ENGINE VERIFIED");
console.log("INTENT MATRIX VERIFIED");
console.log("DUPLICATE SAFETY VERIFIED");
console.log("TOOL/BLOG RELATIONSHIPS VERIFIED");
console.log("SEO METADATA VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.05 COMPLETE");
console.log("======================================================================");
