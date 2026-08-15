import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

const exists = (file) =>
  fs.existsSync(path.join(ROOT, file));

const read = (file) =>
  fs.readFileSync(path.join(ROOT, file), "utf8");

console.log("======================================================================");
console.log("PHASE 11.12.2 — /api/save VALID PAYLOAD + DEPENDENCY FORENSICS");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. SAVE ROUTE =====");

const route = read("app/api/save/route.js");

console.log(route);

console.log("\n===== 2. DATABASE MODULE =====");

const dbCandidates = [
  "lib/db.js",
  "lib/db.ts",
  "src/lib/db.js",
  "src/lib/db.ts"
];

let dbFile = null;

for (const file of dbCandidates) {
  if (exists(file)) {
    dbFile = file;
    console.log(`✓ DB module found: ${file}`);
  }
}

if (dbFile) {
  console.log("\n----- DB SOURCE -----");
  console.log(read(dbFile));
  console.log("----- END DB SOURCE -----");
} else {
  console.log("✗ DB module source not found in expected locations");
}

console.log("\n===== 3. BLOG MODEL =====");

const modelCandidates = [
  "models/Blog.js",
  "models/Blog.ts",
  "models/Blog.jsx",
  "models/Blog.tsx"
];

let blogFile = null;

for (const file of modelCandidates) {
  if (exists(file)) {
    blogFile = file;
    console.log(`✓ Blog model found: ${file}`);
  }
}

if (blogFile) {
  console.log("\n----- BLOG MODEL SOURCE -----");
  console.log(read(blogFile));
  console.log("----- END BLOG MODEL SOURCE -----");
} else {
  console.log("✗ Blog model source not found");
}

console.log("\n===== 4. ENVIRONMENT MARKERS =====");

const envFiles = [
  ".env.local",
  ".env",
  ".env.production",
  ".env.development"
];

for (const file of envFiles) {
  if (exists(file)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`- ${file} absent`);
  }
}

console.log("\n===== 5. VALID JSON PAYLOAD =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save ` +
    `-H "Content-Type: application/json" ` +
    `--data '{"topic":"Phase 11 Save Smoke Test","content":"Temporary runtime smoke test content."}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 6. MISSING TOPIC =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save ` +
    `-H "Content-Type: application/json" ` +
    `--data '{"content":"Missing topic test"}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 7. MISSING CONTENT =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save ` +
    `-H "Content-Type: application/json" ` +
    `--data '{"topic":"Missing content test"}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 8. INVALID JSON =====");

try {
  const output = execSync(
    `curl -i -s -X POST http://localhost:3000/api/save ` +
    `-H "Content-Type: application/json" ` +
    `--data '{invalid-json}'`,
    { encoding: "utf8" }
  );

  console.log(output);
} catch (error) {
  console.log(String(error.stdout || ""));
  console.log(String(error.stderr || ""));
}

console.log("\n===== 9. PACKAGE DATABASE DEPENDENCIES =====");

try {
  const packageJson = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, "package.json"),
      "utf8"
    )
  );

  const deps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };

  Object.entries(deps)
    .filter(([name]) =>
      /mongoose|mongodb|slugify/i.test(name)
    )
    .forEach(([name, version]) => {
      console.log(`${name}: ${version}`);
    });

} catch {
  console.log("Could not inspect package dependencies");
}

console.log("\n===== 10. BUILD REGRESSION =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✓ Production build PASS");
} catch {
  console.log("✗ Production build FAILED");
}

console.log("\n======================================================================");
console.log("PHASE 11.12.2 COMPLETE");
console.log("======================================================================");
console.log("NO PRODUCTION SOURCE MODIFIED.");
console.log("DO NOT REPAIR YET.");
console.log("Paste the COMPLETE output.");
console.log("======================================================================");
