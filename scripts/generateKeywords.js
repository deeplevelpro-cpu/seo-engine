const fs = require("fs");

const baseKeywords = [
  "calculator",
  "converter",
  "generator",
  "checker",
  "tool",
];

const modifiers = [
  "online",
  "free",
  "best",
  "fast",
  "2026",
];

let results = [];

baseKeywords.forEach((base) => {
  modifiers.forEach((mod) => {
    results.push(`${mod} ${base}`);
    results.push(`${base} ${mod}`);
  });
});

fs.writeFileSync("data/keywords.txt", results.join("\n"));

console.log("✅ Keywords Generated:", results.length);

