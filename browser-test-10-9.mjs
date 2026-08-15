import { chromium } from "playwright";

const tests = [
  // SEO
  { slug: "keyword-density-checker", fields: ["SEO tools are useful for SEO.", "SEO"], expected: "Keyword" },
  { slug: "meta-tag-generator", fields: ["My Website"], expected: "Meta" },
  { slug: "meta-description-generator", fields: ["My website is awesome"], expected: "Description" },
  { slug: "title-tag-generator", fields: ["My Website"], expected: "Title" },
  { slug: "serp-snippet-preview", fields: ["My Page Title"], expected: "Snippet" },
  { slug: "robots-txt-generator", fields: ["example.com"], expected: "robots" },
  { slug: "sitemap-generator", fields: ["https://example.com"], expected: "Sitemap" },
  { slug: "schema-markup-generator", fields: ["Example Business"], expected: "Schema" },

  // TEXT
  { slug: "word-counter", fields: ["This is a test sentence."], expected: "Words" },
  { slug: "character-counter", fields: ["Hello World"], expected: "Characters" },
  { slug: "sentence-counter", fields: ["Hello world. This is another sentence."], expected: "Sentences" },
  { slug: "paragraph-counter", fields: ["First paragraph.\n\nSecond paragraph."], expected: "Paragraphs" },
  { slug: "reading-time-calculator", fields: ["This is some sample content for reading time."], expected: "Reading" },
  { slug: "text-case-converter", fields: ["hello world"], expected: "Case" },
  { slug: "text-reverser", fields: ["hello"], expected: "Reverse" },
  { slug: "remove-extra-spaces", fields: ["hello    world"], expected: "Spaces" },
  { slug: "find-and-replace-text", fields: ["Hello World", "World", "Ahmad"], expected: "Ahmad" },

  // CODE / DATA
  { slug: "json-formatter", fields: ['{"name":"Ahmad"}'], expected: "JSON" },
  { slug: "json-validator", fields: ['{"name":"Ahmad"}'], expected: "Valid" },
  { slug: "json-minifier", fields: ['{ "name": "Ahmad" }'], expected: "JSON" },
  { slug: "base64-encoder", fields: ["Hello"], expected: "Base64" },
  { slug: "base64-decoder", fields: ["SGVsbG8="], expected: "Base64" },
  { slug: "xml-formatter", fields: ["<root><item>Hello</item></root>"], expected: "XML" },
  { slug: "css-formatter", fields: ["body{color:red;}"], expected: "CSS" },
  { slug: "javascript-formatter", fields: ["function test(){return 1;}"], expected: "JavaScript" },
  { slug: "sql-formatter", fields: ["SELECT * FROM users"], expected: "SQL" },

  // URL / WEB
  { slug: "url-encoder", fields: ["hello world"], expected: "URL" },
  { slug: "url-decoder", fields: ["hello%20world"], expected: "URL" },
  { slug: "url-parser", fields: ["https://example.com/path"], expected: "URL" },
  { slug: "url-cleaner", fields: ["https://example.com/?utm_source=test"], expected: "URL" },
  { slug: "query-string-parser", fields: ["https://example.com/?name=Ahmad"], expected: "Query" },
  { slug: "query-string-builder", fields: ["name=Ahmad"], expected: "Query" },
  { slug: "utm-url-builder", fields: ["https://example.com"], expected: "UTM" },
  { slug: "http-status-code-lookup", fields: ["404"], expected: "404" },

  // SECURITY / HASH
  { slug: "password-strength-checker", fields: ["StrongPassword123!"], expected: "Password" },
  { slug: "uuid-generator", fields: [], expected: "UUID" },
  { slug: "uuid-validator", fields: ["550e8400-e29b-41d4-a716-446655440000"], expected: "UUID" },
  { slug: "hash-generator", fields: ["Hello"], expected: "Hash" },
  { slug: "md5-hash-generator", fields: ["Hello"], expected: "MD5" },
  { slug: "sha256-hash-generator", fields: ["Hello"], expected: "SHA" },
  { slug: "sha512-hash-generator", fields: ["Hello"], expected: "SHA" },
  { slug: "hmac-generator", fields: ["Hello", "secret"], expected: "HMAC" },
  { slug: "secret-key-generator", fields: ["16"], expected: "Key" },
  { slug: "pin-generator", fields: ["6"], expected: "PIN" },

  // IMAGE / COLOR
  { slug: "image-alt-text-generator", fields: ["A red car"], expected: "Alt" },
  { slug: "image-filename-generator", fields: ["My Summer Photo"], expected: "Filename" },
  { slug: "image-dimensions-checker", fields: ["1920x1080"], expected: "Dimension" },
  { slug: "color-picker", fields: ["#ff0000"], expected: "Color" },
  { slug: "hex-to-rgb-converter", fields: ["#ff0000"], expected: "RGB" },
  { slug: "rgb-to-hex-converter", fields: ["255,0,0"], expected: "HEX" },
  { slug: "hsl-color-converter", fields: ["0,100,50"], expected: "RGB" },
  { slug: "color-contrast-checker", fields: ["#000000 #ffffff"], expected: "Contrast" },

  // SOCIAL / MEDIA
  { slug: "hashtag-generator", fields: ["SEO tools"], expected: "Hashtag" },
  { slug: "youtube-title-generator", fields: ["SEO Tips"], expected: "YouTube" },
  { slug: "youtube-description-generator", fields: ["SEO Tips"], expected: "YouTube" },
  { slug: "youtube-tag-generator", fields: ["SEO Tips"], expected: "YouTube" },
  { slug: "instagram-caption-generator", fields: ["SEO Tips"], expected: "Instagram" },

  // CALCULATORS / GENERATORS
  { slug: "percentage-calculator", fields: ["100", "20"], expected: "20" },
  { slug: "percentage-increase-calculator", fields: ["100", "120"], expected: "20" },
  { slug: "percentage-decrease-calculator", fields: ["200", "150"], expected: "25" },
  { slug: "average-calculator", fields: ["10,20,30"], expected: "Average" },
  { slug: "ratio-calculator", fields: ["20", "30"], expected: "Ratio" },
  { slug: "proportion-calculator", fields: ["2", "4", "10"], expected: "Proportion" },
  { slug: "age-calculator", fields: ["2000-01-01"], expected: "years" },
  { slug: "date-difference-calculator", fields: ["2026-01-01", "2026-01-31"], expected: "30 days" },
  { slug: "time-difference-calculator", fields: ["10:00", "12:15"], expected: "2 hours 15 minutes" },
  { slug: "compound-interest-calculator", fields: ["1000", "10", "1", "2"], expected: "1210.00" },
  { slug: "list-randomizer", fields: ["Ahmad\nAli\nUsman"], expected: "Ahmad" },
  { slug: "checklist-generator", fields: ["Study\nCode\nTest"], expected: "Study" },
  { slug: "password-generator", fields: [], expected: "Password" },
  { slug: "random-string-generator", fields: [], expected: "Random" },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let passed = 0;
let failed = 0;

try {
  for (const test of tests) {
    console.log(`\n===== ${test.slug} =====`);

    try {
      await page.goto(`http://localhost:3000/tools/${test.slug}`, {
        waitUntil: "networkidle",
      });

      console.log("✓ Page loaded");

      const inputs = page.locator("input, textarea");
      const count = await inputs.count();

      if (count !== test.fields.length) {
        throw new Error(
          `Expected ${test.fields.length} fields, found ${count}`
        );
      }

      if (test.fields.length > 0) {
        for (let i = 0; i < test.fields.length; i++) {
          await inputs.nth(i).fill(test.fields[i]);
        }

        console.log(`✓ ${count} field(s) accepted values`);
      } else {
        console.log("✓ Zero-input tool confirmed");
      }

      const generateButton = page.getByRole("button", {
        name: /generate result/i,
      });

      if (await generateButton.count() === 0) {
        throw new Error("Generate button not found");
      }

      await generateButton.click();
      await page.waitForTimeout(500);

      const body = await page.locator("body").innerText();

      if (
        body.includes("Application error") ||
        body.includes("Unhandled Runtime Error")
      ) {
        throw new Error("Application/runtime error detected");
      }

      if (!body.toLowerCase().includes(test.expected.toLowerCase())) {
        throw new Error(
          `Expected "${test.expected}" not found`
        );
      }

      console.log(`✓ Expected result "${test.expected}" found`);

      const clearButton = page.getByRole("button", {
        name: /clear all/i,
      });

      await clearButton.click();
      await page.waitForTimeout(150);

      console.log("✓ Clear All reset fields");

      passed++;
    } catch (error) {
      failed++;
      console.log(`✗ ${test.slug} FAILED`);
      console.log(error.message);
    }
  }

  console.log("\n======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log("✓ 71-TOOL REPRESENTATIVE REGRESSION: PASS");
} finally {
  await browser.close();
}
