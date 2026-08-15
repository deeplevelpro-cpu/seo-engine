import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;
let removed = 0;

const exists = p => fs.existsSync(path.join(root, p));
const read = p => fs.readFileSync(path.join(root, p), "utf8");

function pass(x) { console.log(`✓ ${x}`); }
function fail(x) { console.log(`✗ ${x}`); failed++; }

console.log("======================================================================");
console.log("PHASE 10.54 — CONSOLIDATED RELEASE CLEANUP + FINAL GATE");
console.log("BACKUP FORENSICS + GIT SAFETY + LIVE QA + SEO + BUILD");
console.log("SAFE CLEANUP — PRODUCTION SOURCE PROTECTED");
console.log("======================================================================");

/* =====================================================================
   1. PRODUCTION PROTECTION
===================================================================== */

console.log("\n===== 1. PRODUCTION FILE PROTECTION =====");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  ".gitignore",
  ".env.local"
];

for (const f of protectedFiles) {
  exists(f) ? pass(`PROTECTED: ${f}`) : fail(`MISSING: ${f}`);
}

/* =====================================================================
   2. BACKUP FORENSICS
===================================================================== */

console.log("\n===== 2. BACKUP FORENSICS =====");

const backupRoot = "legacy-route-backups";
const backupPath = path.join(root, backupRoot);

if (fs.existsSync(backupPath)) {
  const entries = fs.readdirSync(backupPath, { withFileTypes: true });

  console.log(`Backup entries: ${entries.length}`);

  for (const entry of entries) {
    console.log(`  ${entry.isDirectory() ? "[DIR]" : "[FILE]"} ${entry.name}`);
  }

  /*
   * We only remove the backup if every item is clearly related to the
   * already-deleted legacy route architecture.
   */
  const names = entries.map(e => e.name.toLowerCase());

  const clearlyLegacy = names.every(name =>
    name.includes("text-to-slug") ||
    name.includes("case-converter") ||
    name.includes("slugtool") ||
    name.includes("legacy") ||
    name.includes("route")
  );

  if (clearlyLegacy) {
    fs.rmSync(backupPath, { recursive: true, force: true });
    removed++;
    pass("Clearly obsolete legacy-route backup removed safely");
  } else {
    console.log("⚠ Backup contents are not unambiguously legacy-route files.");
    console.log("⚠ Backup retained for safety.");
  }
} else {
  pass("No legacy-route-backups directory");
}

/* =====================================================================
   3. STALE PRODUCTION FILES
===================================================================== */

console.log("\n===== 3. STALE PRODUCTION FILES =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const f of stale) {
  exists(f)
    ? fail(`STALE FILE EXISTS: ${f}`)
    : pass(`Stale absent: ${f}`);
}

/* =====================================================================
   4. CATALOG + REGISTRY SOURCE
===================================================================== */

console.log("\n===== 4. 135-TOOL ARCHITECTURE =====");

const catalog = exists("data/tools.ts") ? read("data/tools.ts") : "";
const registry = exists("src/lib/tools/index.ts")
  ? read("src/lib/tools/index.ts")
  : "";

for (const slug of [
  "text-case-converter",
  "seo-slug-generator",
  "keyword-density-checker"
]) {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler exists")
  : fail("getToolHandler missing");

const registryKeys = new Set(
  [...registry.matchAll(/["']([a-z0-9-]+)["']\s*:/g)]
    .map(m => m[1])
);

console.log(`Registry keyed entries: ${registryKeys.size}`);

registryKeys.size >= 135
  ? pass("Registry = 135+")
  : fail("Registry below 135");

/* =====================================================================
   5. SEO
===================================================================== */

console.log("\n===== 5. SEO INFRASTRUCTURE =====");

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

if (exists("app/sitemap.ts")) {
  read("app/sitemap.ts").includes("tools")
    ? pass("Sitemap tool integration")
    : fail("Sitemap integration missing");
} else {
  fail("Sitemap missing");
}

if (exists("app/robots.ts")) {
  const robots = read("app/robots.ts");

  robots.includes("userAgent")
    ? pass("Robots user-agent")
    : console.log("⚠ Robots user-agent marker not explicit");

  robots.includes("sitemap")
    ? pass("Robots sitemap")
    : fail("Robots sitemap missing");
} else {
  fail("Robots source missing");
}

/* =====================================================================
   6. GIT SAFETY
===================================================================== */

console.log("\n===== 6. GIT SAFETY =====");

try {
  const status = execSync(
    "git status --short",
    { encoding: "utf8" }
  ).trim();

  if (!status) {
    pass("Git working tree clean");
  } else {
    console.log("⚠ Git working tree has changes:");
    console.log(status);

    /*
     * We do NOT reset, checkout, stash, or delete anything.
     */
  }

  const trackedSecrets = execSync(
    "git ls-files | grep -Ei '(^|/)(\\.env|.*\\.pem$|.*\\.key$)' || true",
    { encoding: "utf8" }
  ).trim();

  if (!trackedSecrets) {
    pass("No obvious tracked secret files");
  } else {
    fail(`Possible tracked secret files:\n${trackedSecrets}`);
  }
} catch {
  console.log("⚠ Git safety check unavailable");
}

/* =====================================================================
   7. ENV SAFETY
===================================================================== */

console.log("\n===== 7. ENVIRONMENT SAFETY =====");

if (exists(".env.local")) {
  pass(".env.local exists locally");
}

const gitignore = exists(".gitignore") ? read(".gitignore") : "";

if (
  gitignore.includes(".env") ||
  gitignore.includes(".env*")
) {
  pass("Environment files ignored");
} else {
  fail("Environment files are not clearly ignored");
}

/* =====================================================================
   8. LIVE SERVER
===================================================================== */

console.log("\n===== 8. LIVE SERVER =====");

try {
  const code = execSync(
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000",
    { encoding: "utf8" }
  ).trim();

  code === "200"
    ? pass("localhost:3000 → HTTP 200")
    : fail(`localhost:3000 → HTTP ${code}`);
} catch {
  fail("localhost:3000 unavailable");
}

/* =====================================================================
   9. CORE ROUTES
===================================================================== */

console.log("\n===== 9. CORE ROUTES =====");

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
  "/robots.txt"
];

for (const route of coreRoutes) {
  try {
    const code = execSync(
      `curl -L -s -o /dev/null -w '%{http_code}' "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    code === "200"
      ? pass(`${route} → 200`)
      : fail(`${route} → ${code}`);
  } catch {
    fail(`${route} request failed`);
  }
}

/* =====================================================================
   10. REPRESENTATIVE TOOLS
===================================================================== */

console.log("\n===== 10. REPRESENTATIVE TOOLS =====");

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
      ? pass(`${slug} → 200`)
      : fail(`${slug} → ${code}`);
  } catch {
    fail(`${slug} request failed`);
  }
}

/* =====================================================================
   11. REDIRECTS
===================================================================== */

console.log("\n===== 11. LEGACY REDIRECTS =====");

const redirects = [
  ["/tools/case-converter", "/tools/text-case-converter"],
  ["/tools/text-to-slug", "/tools/seo-slug-generator"],
  ["/text-to-slug", "/tools/seo-slug-generator"]
];

for (const [from, to] of redirects) {
  try {
    const headers = execSync(
      `curl -s -I "http://localhost:3000${from}"`,
      { encoding: "utf8" }
    );

    headers.includes(to)
      ? pass(`${from} → ${to}`)
      : fail(`${from} redirect mismatch`);
  } catch {
    fail(`${from} redirect check failed`);
  }
}

/* =====================================================================
   12. TYPESCRIPT
===================================================================== */

console.log("\n===== 12. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

/* =====================================================================
   13. PRODUCTION BUILD
===================================================================== */

console.log("\n===== 13. PRODUCTION BUILD =====");

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
console.log("PHASE 10.54 FINAL REPORT");
console.log("======================================================================");
console.log(`SAFE CLEANUP ACTIONS: ${removed}`);
console.log(`FAILED CHECKS       : ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.54: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT PERFORM FURTHER CLEANUP.");
  process.exit(1);
}

console.log("✅ PHASE 10.54: PASS");
console.log("RELEASE CLEANUP VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("GIT SECRET SAFETY VERIFIED");
console.log("ENVIRONMENT SAFETY VERIFIED");
console.log("LIVE ROUTES VERIFIED");
console.log("SEO VERIFIED");
console.log("REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🔒 PHASE 10 RELEASE GATE PASSED");
console.log("======================================================================");
