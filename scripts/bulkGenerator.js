import { languages } from "../src/config/languages.js";

const keywords = [
  "word-counter",
  "character-counter",
  "paragraph-counter",
];

for (const lang of languages) {
  for (const keyword of keywords) {
    console.log(`Generating page: /${lang}/tools/tool/${keyword}`);
  }
}
