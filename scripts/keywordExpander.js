const fs = require("fs");

const baseKeywords = [
  "word counter",
  "image converter",
  "text to speech",
];

const modifiers = [
  "online",
  "free",
  "tool",
  "fast",
  "best",
  "2026",
  "no login",
];

let output = [];

baseKeywords.forEach(base => {
  modifiers.forEach(mod => {
    output.push(`${base} ${mod}`);
  });
});

fs.writeFileSync("data/keywords.txt", output.join("\n"));

console.log("🔥 Keywords Generated:", output.length);
