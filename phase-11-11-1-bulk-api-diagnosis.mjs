import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const routePath = path.join(ROOT, "app/api/bulk/route.ts");

console.log("======================================================================");
console.log("PHASE 11.11.1 — /api/bulk 500 DIAGNOSIS");
console.log("READ-ONLY — NO SOURCE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. ROUTE SOURCE =====");

if (!fs.existsSync(routePath)) {
  console.log("✗ app/api/bulk/route.ts not found");
  process.exit(1);
}

console.log("✓ app/api/bulk/route.ts exists");

const source = fs.readFileSync(routePath, "utf8");

console.log("\n===== 2. EXPORTED METHODS =====");

for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
  const pattern = new RegExp(`export\\s+(?:async\\s+)?function\\s+${method}\\b`);
  source.match(pattern)
    ? console.log(`✓ ${method} handler present`)
    : console.log(`- ${method} handler absent`);
}

console.log("\n===== 3. ROUTE SOURCE — RELEVANT MARKERS =====");

[
  "request",
  "NextResponse",
  "json",
  "try",
  "catch",
  "process.env",
  "fetch",
  "Promise.all",
  "POST"
].forEach((marker) => {
  source.includes(marker)
    ? console.log(`✓ marker: ${marker}`)
    : console.log(`- marker absent: ${marker}`);
});

console.log("\n===== 4. LIVE GET RESPONSE =====");

try {
  const output = execSync(
    `curl -i -s http://localhost:3000/api/bulk`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log("✗ GET request failed");
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 5. LIVE POST — EMPTY BODY =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/bulk -H "Content-Type: application/json" --data "{}"`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log("POST command returned non-zero status");
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 6. LIVE POST — EMPTY ARRAY =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/bulk -H "Content-Type: application/json" --data '{"items":[]}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log("POST command returned non-zero status");
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 7. NEXT BUILD CACHE / SERVER CHECK =====");

try {
  const output = execSync(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/bulk`,
    { encoding: "utf8" }
  ).trim();

  console.log(`✓ Current /api/bulk status: ${output}`);
} catch {
  console.log("✗ Could not query /api/bulk");
}

console.log("\n======================================================================");
console.log("PHASE 11.11.1 DIAGNOSIS COMPLETE");
console.log("======================================================================");
console.log("NO SOURCE FILES MODIFIED.");
console.log("Paste the COMPLETE output above before making any repair.");
console.log("======================================================================");
