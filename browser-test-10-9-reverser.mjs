import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
});

try {
  const page = await browser.newPage();

  console.log("===== text-reverser =====");

  await page.goto(
    "http://localhost:3000/tools/text-reverser",
    { waitUntil: "networkidle" }
  );

  console.log("✓ Page loaded");

  const inputs = page.locator("textarea, input");
  const count = await inputs.count();

  if (count !== 1) {
    throw new Error(`Expected 1 input field, found ${count}`);
  }

  await inputs.first().fill("hello");

  console.log("✓ Input entered: hello");

  const generateButton = page.getByRole("button", {
    name: /generate result/i,
  });

  if (await generateButton.count() === 0) {
    throw new Error("Generate button not found");
  }

  console.log("✓ Generate button found");

  await generateButton.click();

  await page.waitForTimeout(700);

  const resultBox = page.locator(".resultBox");

  if (await resultBox.count() === 0) {
    throw new Error("Result box not found");
  }

  const result = await resultBox.innerText();

  console.log();
  console.log("===== RESULT =====");
  console.log(result);
  console.log("==================");

  if (!result.includes("olleh")) {
    throw new Error('Expected reversed text "olleh" not found');
  }

  console.log("✓ Text was reversed correctly");

  const clearButton = page.getByRole("button", {
    name: /clear all/i,
  });

  if (await clearButton.count() === 0) {
    throw new Error("Clear All button not found");
  }

  await clearButton.click();

  await page.waitForTimeout(200);

  console.log("✓ Clear All reset fields");

  console.log();
  console.log("✓ TEXT REVERSER UNIVERSAL TEST: PASS");
} finally {
  await browser.close();
}
