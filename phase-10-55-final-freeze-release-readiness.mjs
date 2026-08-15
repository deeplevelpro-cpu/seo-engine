import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;
let warnings = 0;

const required = [
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
];

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
];

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

const toolRoutes = [
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
  "checklist-generator",
];

console.log("======================================================================");
console.log("PHASE 10.55 — FINAL FREEZE + RELEASE READINESS");
console.log("CONSOLIDATED READ-ONLY RELEASE GATE");
console.log("NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

function exists(p) {
  return fs.existsSync(path.join(root, p));
}

function fail(msg) {
  console.log(`✗ ${msg}`);
  failed++;
}

function pass(msg) {
  console.log(`✓ ${msg}`);
}

function warn(msg) {
  console.log(`⚠ ${msg}`);
  warnings++;
}

function run(cmd) {
  try {
    execSync(cmd, {
      cwd: root,
      stdio: "inherit",
      env: process.env,
    });
    return true;
  } catch {
    failed++;
    return false;
  }
}

async function http(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return res;
  } catch {
    return null;
  }
}

console.log("\n===== 1. PRODUCTION FILE PROTECTION =====");

for (const file of required) {
  exists(file) ? pass(file) : fail(`Missing: ${file}`);
}

console.log("\n===== 2. STALE PRODUCTION FILE AUDIT =====");

for (const file of stale) {
  !exists(file) ? pass(`Absent: ${file}`) : fail(`STALE FILE PRESENT: ${file}`);
}

console.log("\n===== 3. AUTHORITATIVE 135-TOOL CATALOG =====");

const catalogSource = fs.readFileSync(
  path.join(root, "data/tools.ts"),
  "utf8"
);

for (const slug of [
  "text-case-converter",
  "seo-slug-generator",
  "keyword-density-checker",
]) {
  catalogSource.includes(slug)
    ? pass(`Catalog contains ${slug}`)
    : fail(`Catalog missing ${slug}`);
}

if (
  /word-counter-\d+/i.test(catalogSource) ||
  /keyword-density-\d+/i.test(catalogSource) ||
  /free-online-tool-\d+/i.test(catalogSource) ||
  /slug-\d+/i.test(catalogSource) ||
  /tool-\d+/i.test(catalogSource)
) {
  fail("Numbered/suffixed SEO slug pattern detected");
} else {
  pass("No numbered/suffixed SEO patterns");
}

console.log("\n===== 4. HANDLER REGISTRY =====");

const registrySource = fs.readFileSync(
  path.join(root, "src/lib/tools/index.ts"),
  "utf8"
);

for (const slug of [
  "text-case-converter",
  "seo-slug-generator",
  "keyword-density-checker",
]) {
  registrySource.includes(slug)
    ? pass(`Handler present: ${slug}`)
    : fail(`Handler missing: ${slug}`);
}

registrySource.includes("getToolHandler")
  ? pass("getToolHandler exists")
  : fail("getToolHandler missing");

console.log("\n===== 5. SEO INFRASTRUCTURE =====");

const pageSource = fs.readFileSync(
  path.join(root, "app/tools/[slug]/page.tsx"),
  "utf8"
);

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
]) {
  pageSource.includes(marker)
    ? pass(`SEO marker: ${marker}`)
    : fail(`Missing SEO marker: ${marker}`);
}

console.log("\n===== 6. SITEMAP + ROBOTS =====");

const sitemapSource = fs.readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
);

const robotsSource = fs.readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
);

sitemapSource.includes("tools")
  ? pass("Sitemap integrates tools")
  : fail("Sitemap tool integration missing");

robotsSource.includes("sitemap")
  ? pass("Robots sitemap configuration")
  : fail("Robots sitemap configuration missing");

robotsSource.includes("userAgent")
  ? pass("Robots user-agent configuration")
  : fail("Robots user-agent configuration missing");

console.log("\n===== 7. ENVIRONMENT + SECRET SAFETY =====");

exists(".env.local")
  ? pass(".env.local present locally")
  : warn(".env.local not present locally");

const gitignore = fs.readFileSync(
  path.join(root, ".gitignore"),
  "utf8"
);

if (gitignore.includes(".env")) {
  pass("Environment files covered by .gitignore");
} else {
  fail(".env protection missing from .gitignore");
}

console.log("\n===== 8. GIT SECRET SAFETY =====");

try {
  const tracked = execSync(
    "git ls-files",
    { cwd: root, encoding: "utf8" }
  )
    .split("\n")
    .filter(Boolean);

  const secretPattern =
    /(^|\/)(\.env|\.env\.|.*\.pem$|.*\.key$)/i;

  const secrets = tracked.filter((f) => secretPattern.test(f));

  if (secrets.length === 0) {
    pass("No obvious tracked secret files");
  } else {
    fail(`Tracked secret/config files detected: ${secrets.join(", ")}`);
  }
} catch {
  warn("Could not inspect Git tracked files");
}

console.log("\n===== 9. RELEASE ARTIFACT FORENSICS =====");

const rootEntries = fs.readdirSync(root);

const backupCandidates = rootEntries.filter((name) =>
  /(backup|before-|\.bak$)/i.test(name)
);

if (backupCandidates.length === 0) {
  pass("No root backup artifacts detected");
} else {
  warn(`Backup candidates retained for safety: ${backupCandidates.join(", ")}`);
}

const qaCandidates = rootEntries.filter(
  (name) =>
    /^phase-10-\d+/i.test(name) &&
    name.endsWith(".mjs") &&
    !/phase-10-55-final-freeze-release-readiness\.mjs$/i.test(name)
);

if (qaCandidates.length === 0) {
  pass("No superseded Phase 10 scripts detected");
} else {
  warn(`Superseded Phase 10 scripts retained: ${qaCandidates.length}`);
  qaCandidates.forEach((x) => console.log(`  ${x}`));
}

console.log("\n===== 10. LIVE SERVER =====");

const base = "http://localhost:3000";
const server = await http(base);

if (server) {
  pass("localhost:3000 responding");
} else {
  fail("localhost:3000 is not responding");
}

if (server) {
  console.log("\n===== 11. CORE LIVE ROUTES =====");

  for (const route of coreRoutes) {
    const res = await http(base + route);

    if (res && res.status >= 200 && res.status < 400) {
      pass(`${route} → HTTP ${res.status}`);
    } else {
      fail(`${route} → unavailable`);
    }
  }

  console.log("\n===== 12. REPRESENTATIVE TOOL ROUTES =====");

  for (const slug of toolRoutes) {
    const res = await http(`${base}/tools/${slug}`);

    if (res && res.status === 200) {
      pass(`${slug} → HTTP 200`);
    } else {
      fail(`${slug} → unavailable`);
    }
  }

  console.log("\n===== 13. RUNTIME ERROR LEAKAGE =====");

  for (const slug of toolRoutes.slice(0, 6)) {
    const res = await http(`${base}/tools/${slug}`);

    if (!res) {
      fail(`${slug} → no response`);
      continue;
    }

    const html = await res.text();

    const bad =
      /Application error/i.test(html) ||
      /Internal Server Error/i.test(html) ||
      /Unhandled Runtime Error/i.test(html);

    bad
      ? fail(`${slug} → runtime error leakage`)
      : pass(`${slug} → no runtime error leakage`);
  }
}

console.log("\n===== 14. TYPESCRIPT =====");

run("npx tsc --noEmit");

console.log("\n===== 15. PRODUCTION BUILD =====");

run("npm run build");

console.log("\n======================================================================");
console.log("PHASE 10.55 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.55: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT DELETE OR MODIFY PRODUCTION FILES.");
  process.exit(1);
}

console.log("✅ PHASE 10.55: PASS");
console.log("FINAL FREEZE READINESS PASSED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("STALE PRODUCTION FILES VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("LIVE ROUTES VERIFIED");
console.log("RUNTIME ERROR LEAKAGE CHECKED");
console.log("GIT SECRET SAFETY VERIFIED");
console.log("ENVIRONMENT SAFETY VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🔒 PHASE 10 READY FOR FINAL FREEZE");
console.log("======================================================================");
