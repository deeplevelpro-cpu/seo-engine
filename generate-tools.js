const fs = require("fs");

const TOTAL = 1000; // 🔥 change to 1000 later

const baseTools = [
  "text-case-converter",
  "word-counter",
  "keyword-density-checker",
  "slug-generator",
  "meta-tag-generator",
  "password-generator",
  "random-text-generator",
  "image-alt-generator",
  "title-generator",
  "description-generator"
];

let tools = {};

for (let i = 1; i <= TOTAL; i++) {
  const name = baseTools[i % baseTools.length] + "-" + i;

  tools[name] = {
    title: name.replace(/-/g, " ").toUpperCase(),
    description: "Free online " + name.replace(/-/g, " "),
    seoTitle: name.replace(/-/g, " ") + " Free Tool",
    seoDesc: "Use our free " + name.replace(/-/g, " ") + " online tool"
  };
}

// ✅ WRITE FILE
fs.writeFileSync(
  "src/data/tools.ts",
  "const tools = " + JSON.stringify(tools, null, 2) + ";\n\nexport default tools;"
);

console.log("🔥 DONE: " + TOTAL + " tools generated!");
