const fs = require("fs");

const seeds = [
  "loan calculator",
  "age calculator",
  "emi calculator",
  "percentage calculator"
];

const modifiers = [
  "online",
  "free",
  "advanced",
  "fast",
  "2026",
  "accurate",
  "simple",
];

let results = [];

seeds.forEach((seed) => {
  modifiers.forEach((mod) => {
    results.push(`${mod} ${seed}`);
    results.push(`${seed} ${mod}`);
    results.push(`${seed} for students`);
    results.push(`${seed} for business`);
  });
});

fs.writeFileSync("data/keywords.txt", results.join("\n"));

console.log("🔥 CLUSTER GENERATED:", results.length);
