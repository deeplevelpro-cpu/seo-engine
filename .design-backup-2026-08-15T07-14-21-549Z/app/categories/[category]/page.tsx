import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import tools from "@/data/tools";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryDescriptions: Record<string, string> = {
  seo:
    "Free SEO tools for keyword analysis, metadata, structured data, headings, internal links, and technical SEO tasks.",
  content:
    "Free content and text tools for counting, cleaning, converting, analyzing, and preparing written content.",
  developer:
    "Free developer tools for JSON, encoding, decoding, formatting, validation, regular expressions, timestamps, and more.",
  web:
    "Free web utilities for URLs, query strings, domains, HTTP information, links, and browser-related tasks.",
  security:
    "Free browser-based security utilities for passwords, random values, hashes, secrets, and related tasks.",
  image:
    "Free image tools for alt text, filenames, dimensions, colors, conversions, and image-related tasks.",
  marketing:
    "Free marketing tools for social captions, hashtags, headlines, YouTube content, calls to action, and campaign URLs.",
  conversion:
    "Free conversion tools for transforming data between CSV, JSON, XML, numbers, binary, hexadecimal, and other formats.",
  calculators:
    "Free online calculators for percentages, ratios, averages, dates, times, interest, age, and everyday calculations.",
  productivity:
    "Simple productivity tools for lists, checklists, and everyday organization.",
};

export function generateStaticParams() {
  const categories = new Set(
    Object.values(tools).map((tool) =>
      tool.category.toLowerCase()
    )
  );

  return [...categories].map((category) => ({
    category,
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { category } = await params;

  const categoryTools = Object.values(tools).filter(
    (tool) => tool.category.toLowerCase() === category.toLowerCase()
  );

  if (!categoryTools.length) {
    return {
      title: "Category Not Found | AI Tool Engine",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const displayName = categoryTools[0].category;

  return {
    title: `${displayName} Tools - Free Online Tools`,
    description:
      categoryDescriptions[category.toLowerCase()] ||
      `Explore free ${displayName.toLowerCase()} tools online.`,
    alternates: {
      canonical: `/categories/${category.toLowerCase()}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${displayName} Tools - Free Online Tools`,
      description:
        categoryDescriptions[category.toLowerCase()] ||
        `Explore free ${displayName.toLowerCase()} tools online.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryTools = Object.entries(tools).filter(
    ([, tool]) =>
      tool.category.toLowerCase() === category.toLowerCase()
  );

  if (!categoryTools.length) {
    notFound();
  }

  const displayName = categoryTools[0][1].category;

  return (
    <main className="category-page" aria-label="Category tools">
      <nav className="category-breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/categories">Categories</Link>
        <span>›</span>
        <strong>{displayName}</strong>
      </nav>

      <section className="category-hero">
        <span className="category-eyebrow">
          {displayName.toUpperCase()} TOOLS
        </span>

        <h1>
          Free {displayName} Tools
        </h1>

        <p>
          {categoryDescriptions[category.toLowerCase()] ||
            `Explore our collection of free ${displayName.toLowerCase()} tools.`}
        </p>

        <div className="category-stat">
          {categoryTools.length} useful tools
        </div>
      </section>

      <section className="category-tools">
        <div className="category-tools-header">
          <div>
            <span>TOOL COLLECTION</span>
            <h2>{displayName} Tools</h2>
          </div>

          <Link href="/categories">
            All categories →
          </Link>
        </div>

        <div className="category-tools-grid">
          {categoryTools.map(([slug, tool], index) => (
            <Link
              key={slug}
              href={`/tools/${slug}`}
              className="category-tool-card"
            >
              <div className="category-tool-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>

              <span>
                Use this tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-bottom">
        <h2>Explore more free tools</h2>

        <p>
          Discover other categories and find more tools for your
          workflow.
        </p>

        <Link href="/categories">
          Browse all categories →
        </Link>
      </section>
    </main>
  );
}
