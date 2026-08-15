import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

console.log("======================================================================");
console.log("PHASE 10.49 — FINAL POST-CLEANUP REGRESSION");
console.log("135-TOOL ARCHITECTURE + SEO + ROUTES + CLEANUP");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFIED");
console.log("======================================================================");

console.log("");
console.log("===== 1. REMAINING PHASE 10 ARTIFACTS =====");

const files = fs.readdirSync(root);

const phaseScripts = files
  .filter((f) => /^phase-10-\d+.*\.mjs$/i.test(f))
  .sort();

for (const file of phaseScripts) {
  console.log(`  ${file}`);
}

console.log(`Remaining Phase 10 scripts: ${phaseScripts.length}`);

const allowedScripts = [
  "phase-10-44-artifact-cleanup-audit.mjs",
  "phase-10-46-post-cleanup-final-regression.mjs",
  "phase-10-48-final-authoritative-catalog-loader.mjs",
  "phase-10-49-final-post-cleanup-regression.mjs"
];

for (const file of phaseScripts) {
  if (allowedScripts.includes(file)) {
    console.log(`✓ Allowed verification artifact: ${file}`);
  } else {
    console.log(`✗ Unexpected Phase 10 artifact: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 2. BACKUP ARTIFACTS =====");

const backups = files.filter(
  (f) =>
    /\.bak$/i.test(f) ||
    /\.before-[^/]+$/i.test(f) ||
    /^seo-backup-/i.test(f)
);

if (backups.length === 0) {
  console.log("✓ ZERO backup artifacts");
} else {
  for (const file of backups) {
    console.log(`✗ Backup remains: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 3. AUTHORITATIVE CATALOG =====");

const tempCatalog = path.join(
  root,
  ".phase-10-49-catalog-test.mts"
);

fs.writeFileSync(
  tempCatalog,
  `
import * as toolsModule from "./data/tools.ts";

function findCatalog(value: any): any | null {
  if (!value || typeof value !== "object") return null;

  const required = [
    "keyword-density-checker",
    "text-case-converter",
    "seo-slug-generator"
  ];

  if (required.every((key) =>
    Object.prototype.hasOwnProperty.call(value, key)
  )) {
    return value;
  }

  if (Object.prototype.hasOwnProperty.call(value, "default")) {
    const found = findCatalog(value.default);
    if (found) return found;
  }

  if (Object.prototype.hasOwnProperty.call(value, "module.exports")) {
    const found = findCatalog(value["module.exports"]);
    if (found) return found;
  }

  return null;
}

const catalog = findCatalog(toolsModule);

if (!catalog) {
  console.log("CATALOG_FOUND=false");
  process.exit(2);
}

console.log("CATALOG_FOUND=true");
console.log("CATALOG_COUNT=" + Object.keys(catalog).length);
console.log(
  "TEXT_CASE=" +
  Object.prototype.hasOwnProperty.call(
    catalog,
    "text-case-converter"
  )
);
console.log(
  "SEO_SLUG=" +
  Object.prototype.hasOwnProperty.call(
    catalog,
    "seo-slug-generator"
  )
);
console.log(
  "KEYWORD_DENSITY=" +
  Object.prototype.hasOwnProperty.call(
    catalog,
    "keyword-density-checker"
  )
);
`
);

try {
  const output = execSync(
    "npx --yes tsx .phase-10-49-catalog-test.mts",
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  process.stdout.write(output);

  const countMatch = output.match(/CATALOG_COUNT=(\d+)/);
  const count = countMatch ? Number(countMatch[1]) : 0;

  if (count === 135) {
    console.log("✓ CATALOG = EXACTLY 135");
  } else {
    console.log(`✗ CATALOG = ${count}, expected 135`);
    failed++;
  }

  for (const [label, marker] of [
    ["text-case-converter", "TEXT_CASE=true"],
    ["seo-slug-generator", "SEO_SLUG=true"],
    ["keyword-density-checker", "KEYWORD_DENSITY=true"]
  ]) {
    if (output.includes(marker)) {
      console.log(`✓ ${label} present`);
    } else {
      console.log(`✗ ${label} missing`);
      failed++;
    }
  }
} catch {
  console.log("✗ Catalog runtime resolution failed");
  failed++;
} finally {
  if (fs.existsSync(tempCatalog)) {
    fs.unlinkSync(tempCatalog);
    console.log("✓ Temporary catalog test removed");
  }
}

console.log("");
console.log("===== 4. HANDLER REGISTRY =====");

const tempRegistry = path.join(
  root,
  ".phase-10-49-registry-test.mts"
);

fs.writeFileSync(
  tempRegistry,
  `
import * as registryModule from "./src/lib/tools/index.ts";

function findRegistry(value: any): any | null {
  if (!value || typeof value !== "object") return null;

  if (
    Object.prototype.hasOwnProperty.call(
      value,
      "keyword-density-checker"
    ) &&
    Object.keys(value).length >= 100
  ) {
    return value;
  }

  if (Object.prototype.hasOwnProperty.call(value, "toolRegistry")) {
    const found = findRegistry(value.toolRegistry);
    if (found) return found;
  }

  if (Object.prototype.hasOwnProperty.call(value, "default")) {
    const found = findRegistry(value.default);
    if (found) return found;
  }

  if (Object.prototype.hasOwnProperty.call(value, "module.exports")) {
    const found = findRegistry(value["module.exports"]);
    if (found) return found;
  }

  return null;
}

const registry = findRegistry(registryModule);

console.log("REGISTRY_FOUND=" + Boolean(registry));

if (registry) {
  console.log("REGISTRY_COUNT=" + Object.keys(registry).length);
  console.log(
    "TEXT_CASE=" +
    Object.prototype.hasOwnProperty.call(
      registry,
      "text-case-converter"
    )
  );
  console.log(
    "SEO_SLUG=" +
    Object.prototype.hasOwnProperty.call(
      registry,
      "seo-slug-generator"
    )
  );
}
`
);

try {
  const output = execSync(
    "npx --yes tsx .phase-10-49-registry-test.mts",
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  process.stdout.write(output);

  const countMatch = output.match(/REGISTRY_COUNT=(\d+)/);
  const count = countMatch ? Number(countMatch[1]) : 0;

  if (output.includes("REGISTRY_FOUND=true") && count === 135) {
    console.log("✓ REGISTRY = EXACTLY 135");
  } else {
    console.log(`✗ REGISTRY invalid: ${count}`);
    failed++;
  }

  if (!output.includes("TEXT_CASE=true")) {
    console.log("✗ text-case-converter handler missing");
    failed++;
  }

  if (!output.includes("SEO_SLUG=true")) {
    console.log("✗ seo-slug-generator handler missing");
    failed++;
  }
} catch {
  console.log("✗ Registry runtime resolution failed");
  failed++;
} finally {
  if (fs.existsSync(tempRegistry)) {
    fs.unlinkSync(tempRegistry);
    console.log("✓ Temporary registry test removed");
  }
}

console.log("");
console.log("===== 5. STALE PRODUCTION FILES =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const file of stale) {
  if (!fs.existsSync(path.join(root, file))) {
    console.log(`✓ ABSENT: ${file}`);
  } else {
    console.log(`✗ EXISTS: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 6. REQUIRED PRODUCTION FILES =====");

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
  ".gitignore"
];

for (const file of required) {
  if (fs.existsSync(path.join(root, file))) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ MISSING: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 7. ENV SAFETY =====");

if (fs.existsSync(path.join(root, ".env.local"))) {
  console.log("✓ .env.local present");
} else {
  console.log("⚠ .env.local not present");
}

const gitignore = fs.readFileSync(
  path.join(root, ".gitignore"),
  "utf8"
);

if (
  gitignore.includes(".env") ||
  gitignore.includes(".env.local")
) {
  console.log("✓ Environment files are ignored");
} else {
  console.log("✗ Environment ignore rule missing");
  failed++;
}

console.log("");
console.log("===== 8. SEO INFRASTRUCTURE =====");

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
  "twitter"
]) {
  if (pageSource.includes(marker)) {
    console.log(`✓ ${marker}`);
  } else {
    console.log(`✗ Missing SEO marker: ${marker}`);
    failed++;
  }
}

console.log("");
console.log("===== 9. SITEMAP + ROBOTS SOURCE =====");

const sitemapSource = fs.readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
);

const robotsSource = fs.readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
);

if (sitemapSource.includes("tools")) {
  console.log("✓ Sitemap tool catalog integration exists");
} else {
  console.log("✗ Sitemap catalog integration missing");
  failed++;
}

if (/user.?agent/i.test(robotsSource)) {
  console.log("✓ Robots User-agent configuration exists");
} else {
  console.log("✗ Robots User-agent configuration missing");
  failed++;
}

if (/sitemap/i.test(robotsSource)) {
  console.log("✓ Robots Sitemap configuration exists");
} else {
  console.log("✗ Robots Sitemap configuration missing");
  failed++;
}

console.log("");
console.log("===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ TYPESCRIPT PASS");
} catch {
  console.log("✗ TYPESCRIPT FAILED");
  failed++;
}

console.log("");
console.log("===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ PRODUCTION BUILD PASS");
} catch {
  console.log("✗ PRODUCTION BUILD FAILED");
  failed++;
}

console.log("");
console.log("======================================================================");
console.log("PHASE 10.49 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.49: FAIL");
  console.log("DO NOT DELETE OR MODIFY ANY MORE FILES.");
  process.exit(1);
}

console.log("✅ PHASE 10.49: PASS");
console.log("135-TOOL CATALOG VERIFIED");
console.log("135-TOOL REGISTRY VERIFIED");
console.log("STALE FILES ABSENT");
console.log("BACKUPS VERIFIED");
console.log("ENV SAFETY VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
