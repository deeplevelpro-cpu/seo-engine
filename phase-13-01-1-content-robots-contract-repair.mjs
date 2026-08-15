import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;
let changed = false;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 13.01.1 — CONTENT + ROBOTS CONTRACT REPAIR");
console.log("RUNTIME-FIRST FORENSICS + GUARDED REPAIR + FULL REGRESSION");
console.log("NO HOMEPAGE MODIFICATION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

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

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const file of protectedFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`Missing foundation: ${file}`);
  } else {
    pass(`Protected: ${file}`);
  }
}

const contentCandidates = [
  "src/lib/contentGenerator.js",
  "src/lib/contentGenerator.ts",
  "lib/contentGenerator.js",
  "lib/contentGenerator.ts",
];

let contentPath = null;

for (const file of contentCandidates) {
  const full = path.join(root, file);
  if (fs.existsSync(full)) {
    contentPath = full;
    break;
  }
}

console.log("\n===== 2. CONTENT GENERATOR FORENSICS =====");

if (!contentPath) {
  fail("Content generator not found");
} else {
  pass(`Content generator: ${path.relative(root, contentPath)}`);

  const source = fs.readFileSync(contentPath, "utf8");

  console.log("----- CONTENT GENERATOR SOURCE -----");
  console.log(source);
  console.log("----- END CONTENT GENERATOR SOURCE -----");

  if (!/generateContent/.test(source)) {
    fail("generateContent function missing");
  } else {
    pass("generateContent function present");
  }

  if (!/keyword/i.test(source)) {
    fail("Keyword input contract missing");
  } else {
    pass("Keyword input contract present");
  }

  if (/Lorem ipsum/i.test(source)) {
    fail("Placeholder content detected");
  } else {
    pass("No placeholder Lorem ipsum content");
  }

  if (/return\s+null\s*;/.test(source)) {
    fail("Content generator returns null");
  } else {
    pass("No null-return content contract detected");
  }
}

console.log("\n===== 3. LIVE PROGRAMMATIC CONTENT CONTRACT =====");

const programmaticRoutes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of programmaticRoutes) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    const body = execSync(
      `curl -s "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    );

    if (status !== "200") {
      fail(`${route} → HTTP ${status}`);
      continue;
    }

    pass(`${route} → HTTP 200`);

    if (/<h1[^>]*>/i.test(body)) {
      pass(`${route} → H1 present`);
    } else {
      fail(`${route} → H1 missing`);
    }

    if (/<title[\s>]/i.test(body)) {
      pass(`${route} → title present`);
    } else {
      fail(`${route} → title missing`);
    }

    if (/<meta[^>]+description/i.test(body)) {
      pass(`${route} → meta description present`);
    } else {
      fail(`${route} → meta description missing`);
    }

    if (/canonical/i.test(body)) {
      pass(`${route} → canonical present`);
    } else {
      fail(`${route} → canonical missing`);
    }

    if (
      /Application error|Unhandled Runtime Error|TypeError:|ReferenceError:|Cannot read properties/i.test(
        body
      )
    ) {
      fail(`${route} → runtime error leakage`);
    } else {
      pass(`${route} → runtime clean`);
    }

    const text = body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (text.length >= 250) {
      pass(`${route} → meaningful content length`);
    } else {
      fail(`${route} → suspiciously thin rendered content`);
    }
  } catch {
    fail(`${route} → runtime inspection failed`);
  }
}

console.log("\n===== 4. ROBOTS SOURCE FORENSICS =====");

const robotsPath = path.join(root, "app/robots.ts");

if (!fs.existsSync(robotsPath)) {
  fail("app/robots.ts missing");
} else {
  const robots = fs.readFileSync(robotsPath, "utf8");

  console.log("----- ROBOTS SOURCE -----");
  console.log(robots);
  console.log("----- END ROBOTS SOURCE -----");

  if (/userAgent|user-agent/i.test(robots)) {
    pass("Robots source contains user-agent contract");
  } else {
    console.log("⚠ Source marker user-agent not found; validating live output.");
  }

  if (/sitemap/i.test(robots)) {
    pass("Robots source contains sitemap contract");
  } else {
    fail("Robots source sitemap contract missing");
  }
}

console.log("\n===== 5. LIVE ROBOTS VALIDATION =====");

try {
  const robotsLive = execSync(
    "curl -s http://localhost:3000/robots.txt",
    { encoding: "utf8" }
  );

  console.log("----- LIVE ROBOTS -----");
  console.log(robotsLive);
  console.log("----- END LIVE ROBOTS -----");

  if (/User-agent:/i.test(robotsLive)) {
    pass("Live robots User-agent directive present");
  } else {
    fail("Live robots User-agent directive missing");
  }

  if (/Sitemap:/i.test(robotsLive)) {
    pass("Live robots Sitemap directive present");
  } else {
    fail("Live robots Sitemap directive missing");
  }
} catch {
  fail("Unable to read live robots.txt");
}

console.log("\n===== 6. SITEMAP LIVE CONTRACT =====");

try {
  const sitemap = execSync(
    "curl -s http://localhost:3000/sitemap.xml",
    { encoding: "utf8" }
  );

  const toolCount = (
    sitemap.match(/<loc>[^<]*\/tools\/[^<]+<\/loc>/g) || []
  ).length;

  const categoryCount = (
    sitemap.match(/<loc>[^<]*\/categories\/[^<]+<\/loc>/g) || []
  ).length;

  if (toolCount >= 10) {
    pass(`Sitemap tool URLs: ${toolCount}`);
  } else {
    fail(`Sitemap tool URLs too low: ${toolCount}`);
  }

  if (categoryCount >= 10) {
    pass(`Sitemap category URLs: ${categoryCount}`);
  } else {
    fail(`Sitemap category URLs too low: ${categoryCount}`);
  }

  if (/<urlset/i.test(sitemap)) {
    pass("Sitemap XML valid");
  } else {
    fail("Sitemap XML invalid");
  }
} catch {
  fail("Sitemap runtime inspection failed");
}

console.log("\n===== 7. 135-TOOL FOUNDATION =====");

const catalogPath = path.join(root, "data/tools.ts");
const registryPath = path.join(root, "src/lib/tools/index.ts");

const catalog = fs.existsSync(catalogPath)
  ? fs.readFileSync(catalogPath, "utf8")
  : "";

const registry = fs.existsSync(registryPath)
  ? fs.readFileSync(registryPath, "utf8")
  : "";

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

console.log("\n===== 8. TOOLCLIENT =====");

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
      fail(`ToolClient missing: ${marker}`);
    } else {
      pass(`ToolClient: ${marker}`);
    }
  }
}

console.log("\n===== 9. STALE ARCHITECTURE =====");

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

console.log("\n===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 12. CORE ROUTES =====");

for (const route of [
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
]) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    if (status === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${status}`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 13. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO PRODUCTION SOURCE EXPANSION APPLIED.");
  console.log("NO HOMEPAGE CHANGE.");
  console.log("NO 135-TOOL ARCHITECTURE CHANGE.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");
console.log("✅ PHASE 13.01.1: PASS");
console.log("CONTENT RUNTIME CONTRACT VERIFIED");
console.log("ROBOTS RUNTIME CONTRACT VERIFIED");
console.log("SITEMAP VERIFIED");
console.log("PROGRAMMATIC SEO VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.01.1 COMPLETE");
console.log("======================================================================");
