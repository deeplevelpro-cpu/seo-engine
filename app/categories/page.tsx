import Link from "next/link";
import tools from "@/data/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Tool Categories",
  description:
    "Explore free online tools by category, including SEO, content, developer, web, security, image, marketing, conversion, calculator, and productivity tools.",
  alternates: {
    canonical: "/categories",
  },
};

const categoryDescriptions: Record<string, string> = {
  SEO:
    "Improve search visibility with practical SEO tools for keywords, metadata, structured data, headings, links, and technical SEO.",
  Content:
    "Analyze, clean, transform, and prepare written content with fast browser-based text tools.",
  Developer:
    "Format, validate, encode, decode, test, and transform common developer data and code formats.",
  Web:
    "Work with URLs, query strings, HTTP information, domains, links, and other useful web utilities.",
  Security:
    "Generate and inspect passwords, random values, hashes, and other security-related data locally in your browser.",
  Image:
    "Work with image metadata, colors, dimensions, formats, alt text, and image-related utilities.",
  Marketing:
    "Create marketing assets, social media content, campaign URLs, headlines, and promotional ideas.",
  Conversion:
    "Convert data between common formats such as CSV, JSON, XML, numbers, binary, hexadecimal, and more.",
  Calculators:
    "Solve common percentage, ratio, date, time, finance, and other everyday calculations.",
  Productivity:
    "Use simple utilities that help organize lists, create checklists, and handle everyday tasks faster.",
};

export default function CategoriesPage() {
  const categories = Object.entries(
    Object.entries(tools).reduce<Record<string, number>>((acc, [, tool]) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <main className="categories-page" aria-label="Category discovery">
      <section className="categories-hero">
        <span className="categories-eyebrow">
          TOOL CATEGORIES
        </span>

        <h1>
          Find the right tool
          <br />
          <span>for your task.</span>
        </h1>

        <p>
          Explore our collection of free online tools organized into
          focused categories for SEO, content, development, web utilities,
          security, marketing, images, conversions, calculations, and more.
        </p>
      </section>

      <section className="categories-grid">
        {categories.map(([category, count]) => {
          const description =
            categoryDescriptions[category] ||
            `Explore useful ${category.toLowerCase()} tools.`;

          return (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="category-card"
            >
              <div className="category-card-top">
                <span className="category-count">
                  {count} tools
                </span>

                <span className="category-arrow">↗</span>
              </div>

              <h2>{category} Tools</h2>

              <p>{description}</p>

              <span className="category-link">
                Explore category →
              </span>
            </Link>
          );
        })}
      </section>

      <section className="categories-footer">
        <Link href="/tools">
          Browse all 135 tools →
        </Link>
      </section>
    </main>
  );
}
