import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const exists = p => fs.existsSync(path.join(root, p));
const read = p => fs.readFileSync(path.join(root, p), "utf8");

function pass(x) { console.log(`✓ ${x}`); }
function fail(x) { console.log(`✗ ${x}`); failed++; }

console.log("======================================================================");
console.log("PHASE 10.53 — FINAL LIVE RELEASE AUDIT");
console.log("135 TOOLS + SEO + ROUTES + SITEMAP + ROBOTS + BACKUP FORENSICS");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFIED");
console.log("======================================================================");

/* =====================================================================
   1. BACKUP FORENSICS
===================================================================== */

console.log("\n===== 1. BACKUP FORENSICS =====");

const backupDir = path.join(root, "legacy-route-backups");

if (fs.existsSync(backupDir)) {
  console.log("Backup directory exists: legacy-route-backups");

  const items = fs.readdirSync(backupDir, { withFileTypes: true });

  console.log(`Backup entries: ${items.length}`);

  for (const item of items) {
    const rel = path.join("legacy-route-backups", item.name);
    const full = path.join(root, rel);

    if (item.isDirectory()) {
      console.log(`  [DIR]  ${rel}`);
    } else {
      const size = fs.statSync(full).size;
      console.log(`  [FILE] ${rel} (${size} bytes)`);
    }
  }

  console.log("⚠ Backup directory NOT deleted.");
  console.log("⚠ Manual cleanup decision will be made only after inspection.");
} else {
  pass("No legacy-route-backups directory exists");
}

/* =====================================================================
   2. CATALOG SOURCE MARKERS
===================================================================== */

console.log("\n===== 2. AUTHORITATIVE CATALOG =====");

if (!exists("data/tools.ts")) {
  fail("data/tools.ts missing");
} else {
  const src = read("data/tools.ts");

  for (const slug of [
    "text-case-converter",
    "seo-slug-generator",
    "keyword-density-checker"
  ]) {
    src.includes(slug)
      ? pass(`Catalog contains ${slug}`)
      : fail(`Catalog missing ${slug}`);
  }

  pass("Authoritative catalog source present");
}

/* =====================================================================
   3. HANDLER REGISTRY
===================================================================== */

console.log("\n===== 3. HANDLER REGISTRY =====");

const registry = exists("src/lib/tools/index.ts")
  ? read("src/lib/tools/index.ts")
  : "";

if (!registry) {
  fail("Handler registry missing");
} else {
  for (const slug of [
    "text-case-converter",
    "seo-slug-generator",
    "keyword-density-checker"
  ]) {
    registry.includes(`"${slug}"`)
      ? pass(`Handler present: ${slug}`)
      : fail(`Handler missing: ${slug}`);
  }

  registry.includes("getToolHandler")
    ? pass("getToolHandler present")
    : fail("getToolHandler missing");

  const keys = [
    ...registry.matchAll(/["']([a-z0-9-]+)["']\s*:/g)
  ].map(m => m[1]);

  const unique = new Set(keys);

  console.log(`Registry keyed entries detected: ${unique.size}`);

  unique.size >= 135
    ? pass("Registry contains 135+ handlers")
    : fail("Registry appears incomplete");
}

/* =====================================================================
   4. STALE FILES
===================================================================== */

console.log("\n===== 4. STALE PRODUCTION FILES =====");

for (const f of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
]) {
  exists(f)
    ? fail(`STALE FILE EXISTS: ${f}`)
    : pass(`Stale absent: ${f}`);
}

/* =====================================================================
   5. SEO SOURCE
===================================================================== */

console.log("\n===== 5. SEO SOURCE =====");

const toolPage = exists("app/tools/[slug]/page.tsx")
  ? read("app/tools/[slug]/page.tsx")
  : "";

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  toolPage.includes(marker)
    ? pass(marker)
    : fail(`Missing SEO marker: ${marker}`);
}

/* =====================================================================
   6. SITEMAP + ROBOTS
===================================================================== */

console.log("\n===== 6. SITEMAP + ROBOTS =====");

if (exists("app/sitemap.ts")) {
  const sitemap = read("app/sitemap.ts");
  sitemap.includes("tools")
    ? pass("Sitemap integrates tools")
    : fail("Sitemap tool integration missing");
} else {
  fail("app/sitemap.ts missing");
}

if (exists("app/robots.ts")) {
  const robots = read("app/robots.ts");

  robots.includes("sitemap")
    ? pass("Robots sitemap configuration")
    : fail("Robots sitemap missing");

  robots.includes("userAgent")
    ? pass("Robots user-agent configuration")
    : console.log("⚠ Robots user-agent marker not explicit");
} else {
  fail("app/robots.ts missing");
}

/* =====================================================================
   7. LOCAL LIVE SERVER
===================================================================== */

console.log("\n===== 7. LIVE SERVER =====");

let serverStarted = false;

try {
  execSync("curl -fsS -o /dev/null -w '%{http_code}' http://localhost:3000", {
    stdio: ["ignore", "pipe", "ignore"]
  });

  pass("localhost:3000 is responding");
} catch {
  console.log("⚠ localhost:3000 is not currently responding");
}

/* =====================================================================
   8. CORE ROUTES
===================================================================== */

console.log("\n===== 8. CORE LIVE ROUTES =====");

const routes = [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt"
];

for (const route of routes) {
  try {
    const code = execSync(
      `curl -L -s -o /dev/null -w '%{http_code}' "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    code === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${code}`);
  } catch {
    fail(`${route} → request failed`);
  }
}

/* =====================================================================
   9. REPRESENTATIVE TOOLS
===================================================================== */

console.log("\n===== 9. REPRESENTATIVE TOOL ROUTES =====");

const tools = [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator"
];

for (const slug of tools) {
  try {
    const code = execSync(
      `curl -L -s -o /dev/null -w '%{http_code}' "http://localhost:3000/tools/${slug}"`,
      { encoding: "utf8" }
    ).trim();

    code === "200"
      ? pass(`${slug} → HTTP 200`)
      : fail(`${slug} → HTTP ${code}`);
  } catch {
    fail(`${slug} → request failed`);
  }
}

/* =====================================================================
   10. LEGACY REDIRECTS
===================================================================== */

console.log("\n===== 10. LEGACY REDIRECTS =====");

const redirects = [
  ["/tools/case-converter", "/tools/text-case-converter"],
  ["/tools/text-to-slug", "/tools/seo-slug-generator"],
  ["/text-to-slug", "/tools/seo-slug-generator"]
];

for (const [from, to] of redirects) {
  try {
    const location = execSync(
      `curl -s -I "http://localhost:3000${from}" | tr -d '\\r' | grep -i '^location:' | head -1`,
      { encoding: "utf8" }
    ).trim();

    location.includes(to)
      ? pass(`${from} → ${to}`)
      : fail(`${from} redirect mismatch: ${location || "NO LOCATION"}`);
  } catch {
    fail(`${from} redirect check failed`);
  }
}

/* =====================================================================
   11. TYPESCRIPT
===================================================================== */

console.log("\n===== 11. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

/* =====================================================================
   12. PRODUCTION BUILD
===================================================================== */

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

/* =====================================================================
   FINAL
===================================================================== */

console.log("\n======================================================================");
console.log("PHASE 10.53 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.53: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT DELETE THE BACKUP DIRECTORY.");
  process.exit(1);
}

console.log("✅ PHASE 10.53: PASS");
console.log("LIVE RELEASE AUDIT PASSED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("CORE ROUTES VERIFIED");
console.log("SEO VERIFIED");
console.log("SITEMAP VERIFIED");
console.log("ROBOTS VERIFIED");
console.log("REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🔒 READY FOR FINAL RELEASE DECISION");
console.log("======================================================================");
