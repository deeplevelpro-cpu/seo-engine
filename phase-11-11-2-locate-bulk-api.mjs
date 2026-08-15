import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

console.log("======================================================================");
console.log("PHASE 11.11.2 — /api/bulk ACTUAL IMPLEMENTATION LOCATOR");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. API DIRECTORY FORENSICS =====");

const apiDir = path.join(ROOT, "app/api");

if (!fs.existsSync(apiDir)) {
  console.log("✗ app/api directory not found");
  process.exit(1);
}

console.log("✓ app/api exists");

console.log("\n===== 2. API ROUTE FILES =====");

function walk(dir) {
  const results = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name.startsWith(".")
    ) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }

  return results;
}

const files = walk(apiDir);

for (const file of files) {
  console.log(`FILE: ${path.relative(ROOT, file)}`);
}

console.log("\n===== 3. BULK REFERENCES =====");

const sourceFiles = walk(ROOT).filter((file) =>
  /\.(ts|tsx|js|jsx|mjs|json)$/.test(file)
);

const matches = [];

for (const file of sourceFiles) {
  try {
    const text = fs.readFileSync(file, "utf8");

    if (
      text.includes("/api/bulk") ||
      text.includes("api/bulk") ||
      text.includes("bulk") &&
      (
        text.includes("NextResponse") ||
        text.includes("fetch(") ||
        text.includes("POST")
      )
    ) {
      matches.push(file);
    }
  } catch {}
}

for (const file of matches) {
  console.log(`✓ BULK-RELATED: ${path.relative(ROOT, file)}`);
}

console.log("\n===== 4. ROUTE CONFIGURATION =====");

const nextConfig = [
  "next.config.ts",
  "next.config.js",
  "next.config.mjs"
].find((file) => fs.existsSync(path.join(ROOT, file)));

if (nextConfig) {
  const text = fs.readFileSync(path.join(ROOT, nextConfig), "utf8");

  console.log(`✓ Config: ${nextConfig}`);

  [
    "rewrites",
    "redirects",
    "/api/bulk",
    "api"
  ].forEach((marker) => {
    text.includes(marker)
      ? console.log(`✓ Config marker: ${marker}`)
      : console.log(`- Config marker absent: ${marker}`);
  });
} else {
  console.log("⚠ No next.config file detected");
}

console.log("\n===== 5. LIVE ENDPOINT =====");

try {
  const output = execSync(
    `curl -i -s http://localhost:3000/api/bulk`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 6. NEXT BUILD ROUTE MAP =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✓ Build completed");
} catch {
  console.log("✗ Build failed");
}

console.log("\n======================================================================");
console.log("PHASE 11.11.2 LOCATOR COMPLETE");
console.log("======================================================================");
console.log("NO PRODUCTION SOURCE MODIFIED.");
console.log("Paste the COMPLETE output.");
console.log("======================================================================");
