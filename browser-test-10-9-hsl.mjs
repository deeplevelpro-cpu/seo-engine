import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
});

try {
  const page = await browser.newPage();

  const slug = "hsl-color-converter";

  console.log(`===== ${slug} =====`);

  await page.goto(`http://localhost:3000/tools/${slug}`, {
    waitUntil: "networkidle",
  });

  console.log("✓ Page loaded");

  const inputs = page.locator("input, textarea");
  const count = await inputs.count();

  console.log(`Input fields found: ${count}`);

  if (count !== 1) {
    throw new Error(`Expected 1 input field, found ${count}`);
  }

  await inputs.nth(0).fill("0,100,50");

  console.log("✓ HSL comma input entered");

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

  if (
    result.includes("Application error") ||
    result.includes("Unhandled Runtime Error")
  ) {
    throw new Error("Application/runtime error detected");
  }

  if (!result.includes("RGB")) {
    throw new Error('Expected "RGB" not found');
  }

  console.log("✓ HSL converter returned RGB result");

  console.log();
  console.log("✓ HSL ISOLATION TEST: PASS");
} finally {
  await browser.close();
}
