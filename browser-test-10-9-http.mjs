import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
});

try {
  const page = await browser.newPage();

  const slug = "http-status-code-lookup";

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

  await inputs.nth(0).fill("404");

  console.log("✓ 404 entered");

  const generateButton = page.getByRole("button", {
    name: /generate result/i,
  });

  if (await generateButton.count() === 0) {
    throw new Error("Generate button not found");
  }

  console.log("✓ Generate button found");

  await generateButton.click();
  await page.waitForTimeout(700);

  const body = await page.locator("body").innerText();

  console.log();
  console.log("===== RESULT BODY =====");
  console.log(body);
  console.log("======================");

  if (
    body.includes("Application error") ||
    body.includes("Unhandled Runtime Error")
  ) {
    throw new Error("Application/runtime error detected");
  }

  if (!body.includes("404")) {
    throw new Error('Expected "404" not found in rendered result');
  }

  console.log("✓ HTTP status result contains 404");

  const resultBox = page.locator(".resultBox");

  if (await resultBox.count() > 0) {
    console.log();
    console.log("===== RESULT BOX =====");
    console.log(await resultBox.innerText());
    console.log("======================");
  }

  console.log();
  console.log("✓ HTTP STATUS ISOLATION TEST: PASS");
} finally {
  await browser.close();
}
