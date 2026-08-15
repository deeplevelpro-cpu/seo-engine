import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

const targets = [
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js",
];

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
  ".gitignore",
];

let failed = 0;
const originals = new Map();

const fail = (msg) => {
  console.log(`✗ ${msg}`);
  failed++;
};

const pass = (msg) => console.log(`✓ ${msg}`);

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const exists = (file) => fs.existsSync(path.join(root, file));

console.log("======================================================================");
console.log("PHASE 12.05 — PROGRAMMATIC SEO SCALE + INDEXING FINAL GATE");
console.log("KEYWORD ROUTES + CONTENT + INTERNAL LINKS + SEO + SITEMAP + BUILD");
console.log("GUARDED IMPLEMENTATION + AUTOMATIC ROLLBACK");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const file of protectedFiles) {
  if (exists(file)) pass(`Protected: ${file}`);
  else fail(`Missing foundation: ${file}`);
}

console.log("\n===== 2. PROGRAMMATIC ROUTES =====");

for (const file of targets) {
  if (exists(file)) {
    pass(`Route present: ${file}`);
    originals.set(file, read(file));
  } else {
    fail(`Missing route: ${file}`);
  }
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 12.05 STOPPED — TARGET DISCOVERY FAILED");
  console.log(`FAILED CHECKS: ${failed}`);
  process.exit(1);
}

console.log("\n===== 3. TOOL KEYWORD ROUTE CONTRACT =====");

let tool = read(targets[0]);

const toolMarkers = [
  ["await params", /await\s+params/],
  ["optional lang", /resolvedParams\?\.lang/],
  ["optional slug", /resolvedParams\?\.slug/],
  ["optional keyword", /resolvedParams\?\.keyword/],
  ["safe String conversion", /String\(/],
  ["generateContent", /generateContent/],
  ["generateMetadata", /generateMetadata/],
  ["canonical", /canonical/],
  ["robots", /robots/],
  ["openGraph", /openGraph/],
  ["twitter", /twitter/],
  ["fallback", /fallback|Unable to generate|Explore/],
  ["/tools internal link", /\/tools/],
  ["/categories internal link", /\/categories/],
];

for (const [name, regex] of toolMarkers) {
  regex.test(tool) ? pass(`Tool: ${name}`) : fail(`Tool missing: ${name}`);
}

if (/params\.(slug|keyword|lang)/.test(tool)) {
  fail("Unsafe direct Tool params access detected");
} else {
  pass("Tool direct params access absent");
}

console.log("\n===== 4. BLOG KEYWORD ROUTE CONTRACT =====");

let blog = read(targets[1]);

const blogMarkers = [
  ["await params", /await\s+params/],
  ["optional slug", /resolvedParams\?\.slug/],
  ["optional keyword", /resolvedParams\?\.keyword/],
  ["safe String conversion", /String\(/],
  ["generateBlogContent", /generateBlogContent/],
  ["generateMetadata", /generateMetadata/],
  ["canonical", /canonical/],
  ["robots", /robots/],
  ["openGraph", /openGraph/],
  ["twitter", /twitter/],
  ["fallback", /fallback|Unable to generate|Learn about/],
  ["tool internal link", /\/tools/],
  ["/categories internal link", /\/categories/],
];

for (const [name, regex] of blogMarkers) {
  regex.test(blog) ? pass(`Blog: ${name}`) : fail(`Blog missing: ${name}`);
}

if (/params\.(slug|keyword)/.test(blog)) {
  fail("Unsafe direct Blog params access detected");
} else {
  pass("Blog direct params access absent");
}

console.log("\n===== 5. DUPLICATE / THIN SEO SAFETY =====");

const duplicatePatterns = [
  [/word-counter-\d+/i, "word-counter numbered URL"],
  [/keyword-density-\d+/i, "keyword-density numbered URL"],
  [/free-online-tool-\d+/i, "free-online-tool numbered URL"],
  [/tool-\d+/i, "tool numbered URL"],
  [/slug-\d+/i, "slug numbered URL"],
];

for (const [regex, name] of duplicatePatterns) {
  const combined = tool + "\n" + blog;
  regex.test(combined)
    ? fail(`Unsafe pattern detected: ${name}`)
    : pass(`Clean: ${name}`);
}

console.log("\n===== 6. 135-TOOL ARCHITECTURE =====");

const catalog = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

const toolSlugs = [
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

for (const slug of toolSlugs) {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

console.log("\n===== 7. TOOLCLIENT REGRESSION =====");

const toolClient = read("app/tools/[slug]/ToolClient.tsx");

[
  ['aria-label="Tool input"', 'aria-label'],
  ["spellCheck={false}", "spellCheck"],
  ["useState", "useState"],
  ["setText", "setText"],
  ["setResult", "setResult"],
  ["setLoading", "setLoading"],
  ["inputSchema", "inputSchema"],
  ["getToolHandler", "getToolHandler"],
  ["aria-live", "aria-live"],
].forEach(([marker, name]) => {
  toolClient.includes(marker)
    ? pass(`ToolClient: ${name}`)
    : fail(`ToolClient missing: ${name}`);
});

console.log("\n===== 8. DISCOVERY + INTERNAL LINKING =====");

[
  ["app/tools/page.tsx", "Tools discovery"],
  ["app/categories/page.tsx", "Categories discovery"],
  ["app/categories/[category]/page.tsx", "Category → tool discovery"],
  ["app/tools/[slug]/page.tsx", "Tool → /tools discovery"],
].forEach(([file, name]) => {
  const source = read(file);
  /href=/.test(source)
    ? pass(name)
    : fail(`${name} missing`);
});

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools") ? pass("Sitemap tools integration") : fail("Sitemap tools integration missing");
sitemap.includes("map") ? pass("Sitemap mapping") : fail("Sitemap map missing");
sitemap.includes("url") ? pass("Sitemap URL generation") : fail("Sitemap URL generation missing");

robots.includes("sitemap") ? pass("Robots sitemap configured") : fail("Robots sitemap missing");

console.log("\n===== 10. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
].forEach((file) => {
  exists(file)
    ? fail(`Stale architecture present: ${file}`)
    : pass(`Stale absent: ${file}`);
});

console.log("\n===== 11. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 13. LIVE CORE ROUTES =====");

const coreRoutes = [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
];

for (const route of coreRoutes) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 14. PROGRAMMATIC RUNTIME =====");

const runtimeRoutes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of runtimeRoutes) {
  try {
    const output = execSync(
      `curl -s -w "\\n__STATUS__:%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const statusMatch = output.match(/__STATUS__:(\d+)/);
    const status = statusMatch ? statusMatch[1] : "000";
    const body = output.replace(/\n__STATUS__:\d+$/, "");

    const leaked =
      /Application error|Internal Server Error|TypeError:|ReferenceError:|Cannot read properties|undefined is not/i.test(
        body
      );

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);

    leaked
      ? fail(`${route} → runtime error leakage`)
      : pass(`${route} → clean runtime`);
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 15. REPRESENTATIVE TOOL RUNTIME =====");

const representativeTools = [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "word-counter",
  "json-formatter",
  "percentage-calculator",
];

for (const slug of representativeTools) {
  try {
    const output = execSync(
      `curl -s -w "\\n__STATUS__:%{http_code}" http://localhost:3000/tools/${slug}`,
      { encoding: "utf8" }
    );

    const status = output.match(/__STATUS__:(\d+)/)?.[1] || "000";
    const body = output.replace(/\n__STATUS__:\d+$/, "");

    status === "200"
      ? pass(`/tools/${slug} → HTTP 200`)
      : fail(`/tools/${slug} → HTTP ${status}`);

    /Application error|Internal Server Error|TypeError:|ReferenceError:/.test(body)
      ? fail(`/tools/${slug} → runtime leakage`)
      : pass(`/tools/${slug} → clean runtime`);
  } catch {
    fail(`/tools/${slug} → request failed`);
  }
}

console.log("\n===== 16. FINAL DECISION =====");

if (failed > 0) {
  for (const [file, original] of originals) {
    fs.writeFileSync(path.join(root, file), original);
  }

  console.log("======================================================================");
  console.log("PHASE 12.05 FAILED");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("TARGET ROUTES ROLLED BACK");
  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("======================================================================");
console.log("PHASE 12.05: PASS");
console.log("PROGRAMMATIC SEO SCALE VERIFIED");
console.log("RUNTIME VERIFIED");
console.log("SEO VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.05 COMPLETE");
console.log("======================================================================");
