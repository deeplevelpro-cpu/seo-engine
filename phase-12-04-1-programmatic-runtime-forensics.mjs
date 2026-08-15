import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

console.log("======================================================================");
console.log("PHASE 12.04.1 — PROGRAMMATIC SEO RUNTIME FORENSICS");
console.log("TARGET: 500s ON TOOL/BLOG KEYWORD ROUTES");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

const findPage = (dir) => {
  for (const name of ["page.tsx", "page.ts", "page.jsx", "page.js"]) {
    const p = path.join(ROOT, dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const routes = [
  {
    name: "TOOL KEYWORD",
    dir: "app/[lang]/tools/[slug]/[keyword]"
  },
  {
    name: "BLOG KEYWORD",
    dir: "app/blog/[slug]/[keyword]"
  }
];

console.log("\n===== 1. ROUTE SOURCES =====");

for (const route of routes) {
  const file = findPage(route.dir);

  if (!file) {
    console.log(`✗ ${route.name}: source missing`);
    continue;
  }

  console.log(`✓ ${route.name}: ${path.relative(ROOT, file)}`);
  console.log("------------------------------------------------------------------");
  console.log(fs.readFileSync(file, "utf8"));
  console.log("------------------------------------------------------------------");
}

console.log("\n===== 2. PARAMETER / NEXT.JS 16 FORENSICS =====");

for (const route of routes) {
  const file = findPage(route.dir);
  if (!file) continue;

  const source = fs.readFileSync(file, "utf8");

  console.log(`\n--- ${route.name} ---`);

  const checks = [
    ["async function page", /async\s+function\s+\w+\s*\(/],
    ["export default function", /export\s+default\s+(async\s+)?function/],
    ["params destructuring", /\{\s*params\s*\}/],
    ["await params", /await\s+params/],
    ["params.slug", /params\.slug/],
    ["params.keyword", /params\.keyword/],
    ["params.lang", /params\.lang/],
    ["generateMetadata", /generateMetadata/],
    ["await params inside metadata", /generateMetadata[\s\S]{0,2000}await\s+params/],
    ["generateStaticParams", /generateStaticParams/],
    ["notFound", /notFound/],
    ["redirect", /redirect\(/],
    ["fetch(", /fetch\s*\(/],
    ["database dependency", /connectDB|mongoose|Blog/],
    ["JSON parsing", /JSON\.parse|\.json\(/]
  ];

  for (const [label, regex] of checks) {
    console.log(`${regex.test(source) ? "✓" : "-"} ${label}`);
  }
}

console.log("\n===== 3. ROUTE REQUEST MATRIX =====");

const liveRoutes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",

  "/tools/word-counter",
  "/tools/seo-slug-generator",
  "/tools/keyword-density-checker",
  "/blog"
];

for (const route of liveRoutes) {
  try {
    const output = execSync(
      `curl -s -i http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const match = output.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = match ? match[1] : "unknown";

    console.log(`\n===== ${route} =====`);
    console.log(`HTTP ${status}`);

    if (status === "500") {
      console.log("----- RESPONSE BODY -----");
      console.log(output.slice(-6000));
      console.log("----- END RESPONSE BODY -----");
    } else {
      console.log(output.slice(0, 1200));
    }
  } catch (error) {
    console.log(`✗ Request failed: ${route}`);
    console.log(String(error.stdout || ""));
    console.log(String(error.stderr || ""));
  }
}

console.log("\n===== 4. NEXT CONFIG FORENSICS =====");

const nextConfigPath = path.join(ROOT, "next.config.ts");

if (fs.existsSync(nextConfigPath)) {
  const source = fs.readFileSync(nextConfigPath, "utf8");

  for (const marker of [
    "redirects",
    "rewrites",
    "trailingSlash",
    "i18n",
    "experimental"
  ]) {
    console.log(`${source.includes(marker) ? "✓" : "-"} ${marker}`);
  }

  console.log("\n----- next.config.ts -----");
  console.log(source);
  console.log("----- END CONFIG -----");
} else {
  console.log("✗ next.config.ts missing");
}

console.log("\n===== 5. CATALOG LOOKUP FORENSICS =====");

try {
  const catalog = fs.readFileSync(
    path.join(ROOT, "data/tools.ts"),
    "utf8"
  );

  for (const slug of [
    "word-counter",
    "seo-slug-generator",
    "keyword-density-checker"
  ]) {
    const index = catalog.indexOf(slug);

    if (index >= 0) {
      console.log(`✓ ${slug} found in catalog`);
      console.log(catalog.slice(Math.max(0, index - 350), index + 900));
    } else {
      console.log(`✗ ${slug} NOT found in catalog`);
    }
  }
} catch (error) {
  console.log("✗ Could not inspect catalog");
  console.log(String(error));
}

console.log("\n===== 6. ROUTE DIRECTORY STRUCTURE =====");

for (const route of routes) {
  const dir = path.join(ROOT, route.dir);

  console.log(`\n--- ${route.name} ---`);

  if (!fs.existsSync(dir)) {
    console.log("✗ Directory missing");
    continue;
  }

  for (const item of fs.readdirSync(dir)) {
    console.log(`  ${item}`);
  }
}

console.log("\n===== 7. SERVER / BUILD CACHE FORENSICS =====");

for (const dir of [".next/server/app", ".next/server/chunks"]) {
  const absolute = path.join(ROOT, dir);

  if (fs.existsSync(absolute)) {
    console.log(`✓ ${dir} exists`);
  } else {
    console.log(`- ${dir} absent`);
  }
}

console.log("\n===== 8. BUILD REGRESSION =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✓ Production build PASS");
} catch {
  console.log("✗ Production build FAILED");
}

console.log("\n======================================================================");
console.log("PHASE 12.04.1 FORENSICS COMPLETE");
console.log("======================================================================");
console.log("NO PRODUCTION SOURCE MODIFIED.");
console.log("DO NOT REPAIR YET.");
console.log("Paste the COMPLETE output.");
console.log("======================================================================");
