import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

function check(label, condition) {
  if (condition) {
    console.log(`✓ ${label}`);
  } else {
    console.log(`✗ ${label}`);
    failed++;
  }
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

console.log("======================================================================");
console.log("PHASE 10.46 — POST-CLEANUP FINAL REGRESSION");
console.log("135-TOOL ARCHITECTURE + SEO + ROUTES + CLEANUP VERIFICATION");
console.log("======================================================================");

console.log("");
console.log("===== 1. PRODUCTION FILES =====");

const requiredFiles = [
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
  ".gitignore"
];

for (const file of requiredFiles) {
  check(`Required: ${file}`, exists(file));
}

console.log("");
console.log("===== 2. 135-TOOL CATALOG =====");

const toolsSource = fs.readFileSync(
  path.join(root, "data/tools.ts"),
  "utf8"
);

const catalogMatches =
  toolsSource.match(/["'`]([a-z0-9]+(?:-[a-z0-9]+)*)["'`]\s*:/g) || [];

const uniqueSlugs = new Set(
  catalogMatches.map((x) =>
    x.replace(/^["'`]/, "").split(/["'`]\s*:/)[0]
  )
);

console.log(`Detected catalog keys: ${uniqueSlugs.size}`);

check("Catalog = exactly 135", uniqueSlugs.size === 135);
check(
  "text-case-converter present",
  toolsSource.includes("text-case-converter")
);
check(
  "seo-slug-generator present",
  toolsSource.includes("seo-slug-generator")
);
check(
  "keyword-density-checker present",
  toolsSource.includes("keyword-density-checker")
);

console.log("");
console.log("===== 3. HANDLER REGISTRY =====");

const registrySource = fs.readFileSync(
  path.join(root, "src/lib/tools/index.ts"),
  "utf8"
);

const handlerMatches =
  registrySource.match(/["'`]([a-z0-9]+(?:-[a-z0-9]+)*)["'`]\s*:/g) || [];

const handlerKeys = new Set(
  handlerMatches.map((x) =>
    x.replace(/^["'`]/, "").split(/["'`]\s*:/)[0]
  )
);

console.log(`Detected registry keys: ${handlerKeys.size}`);

check("Registry = exactly 135", handlerKeys.size === 135);
check(
  "getToolHandler exists",
  registrySource.includes("getToolHandler")
);
check(
  "No text-to-slug handler",
  !registrySource.includes('"text-to-slug"')
);

console.log("");
console.log("===== 4. STALE FILES =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const file of staleFiles) {
  check(`Stale absent: ${file}`, !exists(file));
}

console.log("");
console.log("===== 5. OLD QA ARTIFACT CLEANUP =====");

const rootEntries = fs.readdirSync(root);

const remainingQa = rootEntries.filter((name) =>
  /^phase-10-\d+.*\.(mjs|mts|js|ts)$/i.test(name)
);

const remainingBackups = rootEntries.filter((name) =>
  /\.bak$/i.test(name) ||
  /\.before-[^/]+$/i.test(name) ||
  /^seo-backup-/i.test(name)
);

console.log(`Remaining Phase 10 QA scripts: ${remainingQa.length}`);
console.log(`Remaining backup artifacts: ${remainingBackups.length}`);

check(
  "No old Phase 10 QA artifacts remain",
  remainingQa.length === 1 &&
  remainingQa[0] === "phase-10-44-artifact-cleanup-audit.mjs"
);

check(
  "No old backup artifacts remain",
  remainingBackups.length === 0
);

check(
  "Cleanup audit retained",
  exists("phase-10-44-artifact-cleanup-audit.mjs")
);

console.log("");
console.log("===== 6. ENV SAFETY =====");

check(".env.local remains present", exists(".env.local"));

const gitignore = fs.readFileSync(
  path.join(root, ".gitignore"),
  "utf8"
);

check(
  ".env files remain ignored",
  /\.env/.test(gitignore)
);

console.log("");
console.log("===== 7. SEO INFRASTRUCTURE =====");

const pageSource = fs.readFileSync(
  path.join(root, "app/tools/[slug]/page.tsx"),
  "utf8"
);

const sitemapSource = fs.readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
);

const robotsSource = fs.readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
);

check("generateMetadata exists", pageSource.includes("generateMetadata"));
check("canonical exists", pageSource.includes("canonical"));
check("robots metadata exists", pageSource.includes("robots"));
check("openGraph exists", pageSource.includes("openGraph"));
check("twitter metadata exists", pageSource.includes("twitter"));
check("Sitemap uses catalog", sitemapSource.includes("data/tools"));
check("Robots user-agent exists", robotsSource.includes("userAgent"));
check("Robots sitemap exists", robotsSource.includes("sitemap"));

console.log("");
console.log("===== 8. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ TypeScript PASS");
} catch {
  console.log("✗ TypeScript FAILED");
  failed++;
}

console.log("");
console.log("===== 9. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ Production build PASS");
} catch {
  console.log("✗ Production build FAILED");
  failed++;
}

console.log("");
console.log("======================================================================");
console.log("PHASE 10.46 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.46: FAIL");
  console.log("DO NOT PROCEED TO DEPLOYMENT.");
  process.exit(1);
}

console.log("✅ PHASE 10.46: PASS");
console.log("POST-CLEANUP REGRESSION PASSED");
console.log("135-TOOL CATALOG INTACT");
console.log("135-TOOL REGISTRY INTACT");
console.log("STALE FILES ABSENT");
console.log("QA ARTIFACTS CLEANED");
console.log("BACKUPS CLEANED");
console.log("ENV SAFETY VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
