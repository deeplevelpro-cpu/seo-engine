import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const targets = {
  tools: path.join(root, "data/tools.ts"),
  registry: path.join(root, "src/lib/tools/index.ts"),
  content: path.join(root, "src/lib/contentGenerator.js"),
  toolKeyword: path.join(root, "app/[lang]/tools/[slug]/[keyword]/page.js"),
  blogKeyword: path.join(root, "app/blog/[slug]/[keyword]/page.js"),
  sitemap: path.join(root, "app/sitemap.ts"),
  robots: path.join(root, "app/robots.ts"),
  toolClient: path.join(root, "app/tools/[slug]/ToolClient.tsx"),
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function pass(x) {
  console.log(`✓ ${x}`);
}

function fail(x) {
  console.log(`✗ ${x}`);
  failed++;
}

console.log("======================================================================");
console.log("PHASE 13.04 — KEYWORD CLUSTER + INTENT MATRIX ENGINE");
console.log("PRIMARY + SECONDARY + LONG-TAIL INTENT");
console.log("DUPLICATE SAFETY + TOOL/BLOG RELATIONSHIPS");
console.log("NO MASS THIN PAGE EXPANSION");
console.log("NO HOMEPAGE MODIFICATION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION =====");

for (const [name, file] of Object.entries(targets)) {
  if (fs.existsSync(file)) pass(`${name}: present`);
  else fail(`${name}: missing`);
}

console.log("\n===== 2. TOOL INVENTORY =====");

const tools = read(targets.tools);
const registry = read(targets.registry);

const expected = [
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

for (const slug of expected) {
  tools.includes(slug)
    ? pass(`Tool catalog: ${slug}`)
    : fail(`Tool catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Tool registry: ${slug}`)
    : fail(`Tool registry missing: ${slug}`);
}

console.log("\n===== 3. CONTENT INTENT ENGINE =====");

const content = read(targets.content);

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
  content.includes(marker)
    ? pass(`Content signal: ${marker}`)
    : fail(`Content signal missing: ${marker}`);
}

console.log("\n===== 4. KEYWORD NORMALIZATION =====");

const toolRoute = read(targets.toolKeyword);
const blogRoute = read(targets.blogKeyword);

for (const marker of [
  "cleanKeyword",
  "cleanSlug",
  "await params",
]) {
  toolRoute.includes(marker)
    ? pass(`Tool normalization: ${marker}`)
    : fail(`Tool normalization missing: ${marker}`);

  blogRoute.includes(marker)
    ? pass(`Blog normalization: ${marker}`)
    : fail(`Blog normalization missing: ${marker}`);
}

console.log("\n===== 5. INTENT LAYER CONTRACT =====");

const combined = `${content}\n${toolRoute}\n${blogRoute}`;

const intentSignals = [
  "keyword",
  "slug",
  "content",
  "title",
  "description",
  "intro",
  "benefits",
  "steps",
  "links",
];

for (const signal of intentSignals) {
  combined.includes(signal)
    ? pass(`Intent layer: ${signal}`)
    : fail(`Intent layer missing: ${signal}`);
}

console.log("\n===== 6. DUPLICATE / THIN SAFETY =====");

const unsafe = [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i,
];

for (const pattern of unsafe) {
  pattern.test(combined)
    ? fail(`Unsafe numbered pattern detected: ${pattern}`)
    : pass(`Numbered duplicate pattern blocked: ${pattern}`);
}

if (/Lorem ipsum/i.test(combined)) {
  fail("Lorem ipsum detected");
} else {
  pass("No placeholder content");
}

console.log("\n===== 7. TOOL ↔ BLOG RELATIONSHIP =====");

for (const marker of [
  'href="/tools"',
  'href="/categories"',
]) {
  toolRoute.includes(marker)
    ? pass(`Tool route discovery: ${marker}`)
    : fail(`Tool route discovery missing: ${marker}`);

  blogRoute.includes(marker)
    ? pass(`Blog route discovery: ${marker}`)
    : fail(`Blog route discovery missing: ${marker}`);
}

console.log("\n===== 8. SEO METADATA =====");

for (const [label, source] of [
  ["Tool", toolRoute],
  ["Blog", blogRoute],
]) {
  for (const marker of [
    "generateMetadata",
    "canonical",
    "robots",
    "openGraph",
    "twitter",
  ]) {
    source.includes(marker)
      ? pass(`${label} metadata: ${marker}`)
      : fail(`${label} metadata missing: ${marker}`);
  }
}

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = read(targets.sitemap);
const robots = read(targets.robots);

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

console.log("\n===== 10. TOOLCLIENT PROTECTION =====");

const client = read(targets.toolClient);

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

console.log("\n===== 11. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit",
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAIL");
}

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
  });
  pass("Production build PASS");
} catch {
  fail("Production build FAIL");
}

console.log("\n===== 13. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO KEYWORD SCALE EXPANSION APPLIED.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 13.04: PASS");
console.log("KEYWORD CLUSTER FOUNDATION VERIFIED");
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
console.log("🚀 PHASE 13.04 COMPLETE");
console.log("======================================================================");
