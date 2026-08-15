import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => console.log(`✗ ${x}`);

const exists = (f) => fs.existsSync(path.join(ROOT, f));
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

console.log("======================================================================");
console.log("PHASE 11.12.1 — /api/save READ-ONLY RUNTIME FORENSICS");
console.log("SOURCE + LIVE METHOD DIAGNOSIS");
console.log("NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. API DIRECTORY =====");

if (exists("app/api")) {
  pass("app/api exists");
} else {
  fail("app/api missing");
}

console.log("\n===== 2. API ROUTE FILES =====");

try {
  const output = execSync(
    `find app/api -maxdepth 3 -type f | sort`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch {
  fail("Could not enumerate API files");
}

console.log("\n===== 3. SAVE ROUTE LOCATION =====");

const candidates = [
  "app/api/save/route.ts",
  "app/api/save/route.js",
  "app/api/save/route.tsx",
  "app/api/save/route.jsx"
];

let routePath = null;

for (const file of candidates) {
  if (exists(file)) {
    routePath = file;
    pass(`Save route found: ${file}`);
  }
}

if (!routePath) {
  fail("No /api/save route source found");
  process.exit(1);
}

console.log("\n===== 4. SAVE ROUTE SOURCE =====");

const source = read(routePath);

console.log("------------------------------------------------------------------");
console.log(source);
console.log("------------------------------------------------------------------");

console.log("\n===== 5. EXPORTED HANDLERS =====");

[
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS"
].forEach((method) => {
  source.includes(`export async function ${method}`)
    ? pass(`${method} handler present`)
    : console.log(`- ${method} handler absent`);
});

console.log("\n===== 6. RUNTIME DEPENDENCIES =====");

[
  "NextResponse",
  "NextRequest",
  "request.json",
  "process.env",
  "connectDB",
  "mongoose",
  "Mongo",
  "Model",
  "create",
  "save",
  "find",
  "findOne",
  "JSON.parse",
  "JSON.stringify",
  "try",
  "catch",
  "throw",
  "Response.json"
].forEach((marker) => {
  source.includes(marker)
    ? pass(`Dependency/marker: ${marker}`)
    : console.log(`- Marker absent: ${marker}`);
});

console.log("\n===== 7. LIVE GET /api/save =====");

try {
  const output = execSync(
    `curl -i -s http://localhost:3000/api/save`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 8. LIVE POST /api/save — EMPTY JSON =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save -H "Content-Type: application/json" --data '{}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 9. LIVE POST /api/save — NULL BODY =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save -H "Content-Type: application/json" --data 'null'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 10. LIVE POST /api/save — EMPTY BODY =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 11. CURRENT LIVE STATUS =====");

try {
  const status = execSync(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/save`,
    { encoding: "utf8" }
  ).trim();

  console.log(`GET /api/save → HTTP ${status}`);
} catch {
  console.log("Could not determine current status");
}

try {
  const status = execSync(
    `curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/save -H "Content-Type: application/json" --data '{}'`,
    { encoding: "utf8" }
  ).trim();

  console.log(`POST /api/save {} → HTTP ${status}`);
} catch {
  console.log("Could not determine POST status");
}

console.log("\n===== 12. BUILD ROUTE MAP =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build completed");
} catch {
  fail("Production build failed");
}

console.log("\n======================================================================");
console.log("PHASE 11.12.1 DIAGNOSIS COMPLETE");
console.log("======================================================================");
console.log("NO SOURCE FILES MODIFIED.");
console.log("DO NOT REPAIR YET.");
console.log("Paste the COMPLETE output.");
console.log("======================================================================");
