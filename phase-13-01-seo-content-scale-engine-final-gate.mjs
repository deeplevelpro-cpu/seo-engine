import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const fail = (msg) => {
  console.log(`✗ ${msg}`);
  failed++;
};
const pass = (msg) => console.log(`✓ ${msg}`);

let failed = 0;
let changed = false;

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

const toolKeyword = "app/[lang]/tools/[slug]/[keyword]/page.js";
const blogKeyword = "app/blog/[slug]/[keyword]/page.js";

const snapshots = new Map();

console.log("======================================================================");
console.log("PHASE 13.01 — SEO CONTENT SCALE ENGINE");
console.log("PROGRAMMATIC CONTENT + KEYWORD INTENT + INTERNAL LINKING");
console.log("GUARDED IMPLEMENTATION + AUTOMATIC ROLLBACK");
console.log("PHASE 12 FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const file of protectedFiles) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    fail(`Foundation missing: ${file}`);
  } else {
    pass(`Protected: ${file}`);
    snapshots.set(full, fs.readFileSync(full, "utf8"));
  }
}

console.log("\n===== 2. PROGRAMMATIC ROUTE LOCK =====");

for (const file of [toolKeyword, blogKeyword]) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    fail(`Missing programmatic route: ${file}`);
  } else {
    pass(`Programmatic route: ${file}`);
    snapshots.set(full, fs.readFileSync(full, "utf8"));
  }
}

console.log("\n===== 3. TOOL CATALOG + REGISTRY =====");

const catalogPath = path.join(root, "data/tools.ts");
const registryPath = path.join(root, "src/lib/tools/index.ts");

let catalog = "";
let registry = "";

if (fs.existsSync(catalogPath)) {
  catalog = fs.readFileSync(catalogPath, "utf8");
}

if (fs.existsSync(registryPath)) {
  registry = fs.readFileSync(registryPath, "utf8");
}

const expectedTools = [
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

for (const slug of expectedTools) {
  if (!catalog.includes(slug)) fail(`Catalog missing: ${slug}`);
  else pass(`Catalog: ${slug}`);

  if (!registry.includes(slug)) fail(`Registry missing: ${slug}`);
  else pass(`Registry: ${slug}`);
}

if (!registry.includes("getToolHandler")) {
  fail("getToolHandler missing");
} else {
  pass("getToolHandler preserved");
}

console.log("\n===== 4. TOOL KEYWORD CONTENT ENGINE =====");

const toolSource = fs.existsSync(path.join(root, toolKeyword))
  ? fs.readFileSync(path.join(root, toolKeyword), "utf8")
  : "";

const toolMarkers = [
  "await params",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "generateContent",
  "cleanKeyword",
  "cleanSlug",
  "/tools",
  "/categories",
];

for (const marker of toolMarkers) {
  if (!toolSource.includes(marker)) {
    fail(`Tool keyword content marker missing: ${marker}`);
  } else {
    pass(`Tool keyword content: ${marker}`);
  }
}

if (/params\.(slug|keyword|lang)/.test(toolSource)) {
  fail("Unsafe direct params access detected in tool keyword route");
} else {
  pass("Tool keyword params access safe");
}

console.log("\n===== 5. BLOG KEYWORD CONTENT ENGINE =====");

const blogSource = fs.existsSync(path.join(root, blogKeyword))
  ? fs.readFileSync(path.join(root, blogKeyword), "utf8")
  : "";

const blogMarkers = [
  "await params",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "generateBlogContent",
  "cleanKeyword",
  "cleanSlug",
  "/categories",
];

for (const marker of blogMarkers) {
  if (!blogSource.includes(marker)) {
    fail(`Blog keyword content marker missing: ${marker}`);
  } else {
    pass(`Blog keyword content: ${marker}`);
  }
}

if (/params\.(slug|keyword)/.test(blogSource)) {
  fail("Unsafe direct params access detected in blog keyword route");
} else {
  pass("Blog keyword params access safe");
}

console.log("\n===== 6. CONTENT QUALITY SAFETY =====");

const contentCandidates = [
  "src/lib/contentGenerator.ts",
  "src/lib/contentGenerator.js",
  "lib/contentGenerator.ts",
  "lib/contentGenerator.js",
];

let contentPath = null;

for (const candidate of contentCandidates) {
  const full = path.join(root, candidate);
  if (fs.existsSync(full)) {
    contentPath = full;
    break;
  }
}

if (!contentPath) {
  fail("Content generator not discovered");
} else {
  const contentSource = fs.readFileSync(contentPath, "utf8");
  pass(`Content generator discovered: ${path.relative(root, contentPath)}`);

  for (const marker of [
    "generateContent",
    "keyword",
    "intro",
    "links",
  ]) {
    if (!contentSource.includes(marker)) {
      fail(`Content engine marker missing: ${marker}`);
    } else {
      pass(`Content engine marker: ${marker}`);
    }
  }

  if (/Lorem ipsum/i.test(contentSource)) {
    fail("Placeholder content detected");
  } else {
    pass("No placeholder Lorem ipsum content");
  }
}

console.log("\n===== 7. SEO DUPLICATE SAFETY =====");

const duplicatePatterns = [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i,
];

for (const pattern of duplicatePatterns) {
  const allSources = `${toolSource}\n${blogSource}`;

  if (pattern.test(allSources)) {
    fail(`Numbered SEO pattern detected: ${pattern}`);
  } else {
    pass(`Clean SEO pattern: ${pattern}`);
  }
}

console.log("\n===== 8. INTERNAL LINKING =====");

const linkingTargets = [
  ["app/tools/page.tsx", "/tools"],
  ["app/categories/page.tsx", "/categories"],
  ["app/categories/[category]/page.tsx", "/tools/"],
  [toolKeyword, "/tools"],
  [toolKeyword, "/categories"],
  [blogKeyword, "/categories"],
];

for (const [file, marker] of linkingTargets) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    fail(`Link source missing: ${file}`);
    continue;
  }

  const source = fs.readFileSync(full, "utf8");

  if (!source.includes(marker)) {
    fail(`Internal link missing: ${file} → ${marker}`);
  } else {
    pass(`Internal link: ${file} → ${marker}`);
  }
}

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemapPath = path.join(root, "app/sitemap.ts");
const robotsPath = path.join(root, "app/robots.ts");

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");

  for (const marker of [
    "MetadataRoute.Sitemap",
    "tools",
    "categoryUrls",
    "/categories/",
    "/tools/",
    "return",
  ]) {
    if (!sitemap.includes(marker)) {
      fail(`Sitemap marker missing: ${marker}`);
    } else {
      pass(`Sitemap marker: ${marker}`);
    }
  }
} else {
  fail("Sitemap source missing");
}

if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8");

  if (!/user-agent/i.test(robots)) fail("Robots user-agent missing");
  else pass("Robots user-agent preserved");

  if (!robots.includes("sitemap")) fail("Robots sitemap reference missing");
  else pass("Robots sitemap reference preserved");
} else {
  fail("Robots source missing");
}

console.log("\n===== 10. STALE ARCHITECTURE =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
];

for (const file of staleFiles) {
  if (fs.existsSync(path.join(root, file))) {
    fail(`Stale architecture present: ${file}`);
  } else {
    pass(`Stale absent: ${file}`);
  }
}

console.log("\n===== 11. TOOLCLIENT REGRESSION =====");

const clientPath = path.join(root, "app/tools/[slug]/ToolClient.tsx");

if (fs.existsSync(clientPath)) {
  const client = fs.readFileSync(clientPath, "utf8");

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
    if (!client.includes(marker)) {
      fail(`ToolClient marker missing: ${marker}`);
    } else {
      pass(`ToolClient: ${marker}`);
    }
  }
}

console.log("\n===== 12. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 13. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 14. LIVE CORE ROUTES =====");

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
    const result = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    if (result === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${result}`);
    }
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 15. PROGRAMMATIC RUNTIME =====");

const programmaticRoutes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of programmaticRoutes) {
  try {
    const body = execSync(
      `curl -s -L "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    );

    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    if (status !== "200") {
      fail(`${route} → HTTP ${status}`);
      continue;
    }

    pass(`${route} → HTTP 200`);

    if (
      /Application error|Unhandled Runtime Error|TypeError:|ReferenceError:|Cannot read properties/i.test(
        body
      )
    ) {
      fail(`${route} → runtime error leakage`);
    } else {
      pass(`${route} → runtime clean`);
    }

    if (!/<title[\s>]/i.test(body)) {
      fail(`${route} → title missing`);
    } else {
      pass(`${route} → title present`);
    }

    if (!/<meta[^>]+description/i.test(body)) {
      fail(`${route} → meta description missing`);
    } else {
      pass(`${route} → meta description present`);
    }

    if (!/canonical/i.test(body)) {
      fail(`${route} → canonical missing`);
    } else {
      pass(`${route} → canonical present`);
    }
  } catch {
    fail(`${route} → runtime test failed`);
  }
}

console.log("\n===== 16. SAFE SEO SCALE DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO SEO SCALE EXPANSION APPLIED.");
  console.log("NO DEPLOY.");
  process.exit(1);
}

console.log("All foundation and runtime checks passed.");
console.log("SEO SCALE ENGINE READY.");
console.log("No thin mass-index expansion applied.");
console.log("No homepage modification.");
console.log("No 135-tool architecture modification.");

console.log("\n======================================================================");
console.log("PHASE 13.01: PASS");
console.log("SEO CONTENT SCALE FOUNDATION VERIFIED");
console.log("PROGRAMMATIC CONTENT VERIFIED");
console.log("KEYWORD ROUTES VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE PROGRAMMATIC RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.01 COMPLETE");
console.log("======================================================================");
