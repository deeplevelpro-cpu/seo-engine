import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

console.log("======================================================================");
console.log("PHASE 10.50 — FINAL RELEASE GATE");
console.log("135-TOOL PRODUCTION RELEASE + SEO + ROUTES + CLEANUP");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFIED");
console.log("======================================================================");

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

console.log("");
console.log("===== 1. AUTHORITATIVE PRODUCTION FILES =====");

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
  if (exists(file)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ MISSING: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 2. AUTHORITATIVE CATALOG =====");

const catalogTest = path.join(root, ".phase-10-50-catalog.mts");

fs.writeFileSync(
  catalogTest,
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

  if ("default" in value) {
    const found = findCatalog((value as any).default);
    if (found) return found;
  }

  if ("module.exports" in value) {
    const found = findCatalog(
      (value as any)["module.exports"]
    );
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
    "npx --yes tsx .phase-10-50-catalog.mts",
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  process.stdout.write(output);

  const match = output.match(/CATALOG_COUNT=(\d+)/);
  const count = match ? Number(match[1]) : 0;

  if (count === 135) {
    console.log("✓ CATALOG = 135");
  } else {
    console.log(`✗ CATALOG = ${count}, expected 135`);
    failed++;
  }

  for (const [name, marker] of [
    ["text-case-converter", "TEXT_CASE=true"],
    ["seo-slug-generator", "SEO_SLUG=true"],
    ["keyword-density-checker", "KEYWORD_DENSITY=true"]
  ]) {
    if (output.includes(marker)) {
      console.log(`✓ ${name} present`);
    } else {
      console.log(`✗ ${name} missing`);
      failed++;
    }
  }
} catch {
  console.log("✗ Catalog runtime verification failed");
  failed++;
} finally {
  if (exists(".phase-10-50-catalog.mts")) {
    fs.unlinkSync(catalogTest);
    console.log("✓ Temporary catalog test removed");
  }
}

console.log("");
console.log("===== 3. HANDLER REGISTRY =====");

const registryTest = path.join(root, ".phase-10-50-registry.mts");

fs.writeFileSync(
  registryTest,
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

  if ("toolRegistry" in value) {
    const found = findRegistry(
      (value as any).toolRegistry
    );
    if (found) return found;
  }

  if ("default" in value) {
    const found = findRegistry((value as any).default);
    if (found) return found;
  }

  if ("module.exports" in value) {
    const found = findRegistry(
      (value as any)["module.exports"]
    );
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
    "npx --yes tsx .phase-10-50-registry.mts",
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  process.stdout.write(output);

  const match = output.match(/REGISTRY_COUNT=(\d+)/);
  const count = match ? Number(match[1]) : 0;

  if (
    output.includes("REGISTRY_FOUND=true") &&
    count === 135
  ) {
    console.log("✓ REGISTRY = 135");
  } else {
    console.log(`✗ REGISTRY = ${count}, expected 135`);
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
  console.log("✗ Registry runtime verification failed");
  failed++;
} finally {
  if (exists(".phase-10-50-registry.mts")) {
    fs.unlinkSync(registryTest);
    console.log("✓ Temporary registry test removed");
  }
}

console.log("");
console.log("===== 4. STALE + BACKUP ARTIFACTS =====");

const forbidden = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const file of forbidden) {
  if (!exists(file)) {
    console.log(`✓ ABSENT: ${file}`);
  } else {
    console.log(`✗ EXISTS: ${file}`);
    failed++;
  }
}

const rootFiles = fs.readdirSync(root);

const backups = rootFiles.filter(
  (f) =>
    /\.bak$/i.test(f) ||
    /\.before-[^/]+$/i.test(f) ||
    /^seo-backup-/i.test(f)
);

if (backups.length === 0) {
  console.log("✓ ZERO backup artifacts");
} else {
  for (const file of backups) {
    console.log(`✗ BACKUP: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 5. ENVIRONMENT SAFETY =====");

if (exists(".env.local")) {
  console.log("✓ .env.local present");
}

const gitignore = fs.readFileSync(
  path.join(root, ".gitignore"),
  "utf8"
);

if (
  gitignore.includes(".env") ||
  gitignore.includes(".env.local")
) {
  console.log("✓ Environment files ignored");
} else {
  console.log("✗ Environment ignore rule missing");
  failed++;
}

console.log("");
console.log("===== 6. SEO INFRASTRUCTURE =====");

const page = fs.readFileSync(
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
  if (page.includes(marker)) {
    console.log(`✓ ${marker}`);
  } else {
    console.log(`✗ Missing: ${marker}`);
    failed++;
  }
}

const sitemap = fs.readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
);

const robots = fs.readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
);

if (/tools/i.test(sitemap)) {
  console.log("✓ Sitemap tool integration");
} else {
  console.log("✗ Sitemap tool integration missing");
  failed++;
}

if (/user.?agent/i.test(robots)) {
  console.log("✓ Robots User-agent");
} else {
  console.log("✗ Robots User-agent missing");
  failed++;
}

if (/sitemap/i.test(robots)) {
  console.log("✓ Robots Sitemap");
} else {
  console.log("✗ Robots Sitemap missing");
  failed++;
}

console.log("");
console.log("===== 7. TYPESCRIPT =====");

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
console.log("===== 8. PRODUCTION BUILD =====");

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
console.log("PHASE 10.50 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.50: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 10.50: PASS");
console.log("135-TOOL CATALOG VERIFIED");
console.log("135-TOOL REGISTRY VERIFIED");
console.log("STALE FILES ABSENT");
console.log("BACKUPS = ZERO");
console.log("ENV SAFETY VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("PHASE 10 IS READY FOR RELEASE DECISION");
console.log("======================================================================");
