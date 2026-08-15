import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const route = path.join(ROOT, "app/api/bulk/route.js");

console.log("======================================================================");
console.log("PHASE 11.11.3 — /api/bulk RUNTIME FORENSICS");
console.log("SOURCE INSPECTION + LIVE METHOD TESTS");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

if (!fs.existsSync(route)) {
  console.log("❌ app/api/bulk/route.js not found");
  process.exit(1);
}

const source = fs.readFileSync(route, "utf8");

console.log("\n===== 1. ROUTE SOURCE METADATA =====");
console.log(`✓ Route found: app/api/bulk/route.js`);
console.log(`✓ Source length: ${source.length} characters`);

console.log("\n===== 2. EXPORTED HANDLERS =====");

for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
  const patterns = [
    new RegExp(`export\\s+(?:async\\s+)?function\\s+${method}\\b`),
    new RegExp(`export\\s+(?:const|let|var)\\s+${method}\\b`)
  ];

  patterns.some((p) => p.test(source))
    ? console.log(`✓ ${method} handler present`)
    : console.log(`- ${method} handler absent`);
}

console.log("\n===== 3. IMPORTANT RUNTIME DEPENDENCIES =====");

[
  "NextResponse",
  "NextRequest",
  "request.json",
  "process.env",
  "fetch(",
  "JSON.parse",
  "JSON.stringify",
  "try",
  "catch",
  "throw",
  "Promise",
  "getToolHandler",
  "tools"
].forEach((marker) => {
  source.includes(marker)
    ? console.log(`✓ ${marker}`)
    : console.log(`- ${marker} not detected`);
});

console.log("\n===== 4. ROUTE SOURCE =====");
console.log("------------------------------------------------------------------");
console.log(source);
console.log("------------------------------------------------------------------");

function curl(label, command) {
  console.log(`\n===== ${label} =====`);

  try {
    const output = execSync(command, {
      encoding: "utf8",
      timeout: 10000
    });

    console.log(output || "(empty response)");
  } catch (error) {
    console.log(String(error.stdout || ""));
    console.log(String(error.stderr || ""));
  }
}

curl(
  "5. GET /api/bulk",
  `curl -i -s http://localhost:3000/api/bulk`
);

curl(
  "6. POST /api/bulk — EMPTY JSON",
  `curl -i -s -X POST http://localhost:3000/api/bulk -H "Content-Type: application/json" --data "{}"`
);

curl(
  "7. POST /api/bulk — EMPTY ARRAY",
  `curl -i -s -X POST http://localhost:3000/api/bulk -H "Content-Type: application/json" --data '{"items":[]}'`
);

curl(
  "8. POST /api/bulk — NULL BODY",
  `curl -i -s -X POST http://localhost:3000/api/bulk -H "Content-Type: application/json" --data 'null'`
);

console.log("\n===== 9. LIVE STATUS SUMMARY =====");

try {
  const status = execSync(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/bulk`,
    { encoding: "utf8" }
  ).trim();

  console.log(`Current GET status: HTTP ${status}`);
} catch {
  console.log("Could not determine live status");
}

console.log("\n======================================================================");
console.log("PHASE 11.11.3 FORENSICS COMPLETE");
console.log("======================================================================");
console.log("NO PRODUCTION SOURCE MODIFIED.");
console.log("DO NOT REPAIR YET.");
console.log("Paste the COMPLETE output.");
console.log("======================================================================");
