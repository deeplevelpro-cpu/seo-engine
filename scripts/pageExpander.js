const fs = require("fs");

const file = "data/keywords.txt";

const keywords = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(Boolean);

let expanded = [];

keywords.forEach(k => {
  expanded.push(k);
  expanded.push(`${k} tool`);
  expanded.push(`${k} online`);
  expanded.push(`${k} free`);
  expanded.push(`best ${k}`);
});

const unique = [...new Set(expanded)];

fs.writeFileSync(file, unique.join("\n"));

console.log("TOTAL:", unique.length);
