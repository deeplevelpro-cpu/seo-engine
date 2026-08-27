import type { Metadata } from "next";
import Link from "next/link";
import toolsData from "@/data/tools";
import { SITE_URL } from "../../../lib/site-config";
import ToolClient from "./ToolClient";

const siteUrl = SITE_URL;

type Props = {
  params: Promise<{ slug: string }>;
};

function getRelatedTools(slug: string, category: string) {
  return Object.entries(toolsData)
    .filter(
      ([otherSlug, tool]) =>
        otherSlug !== slug &&
        tool.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, 4);
}

function getUseCases(title: string, category: string) {
  const lower = title.toLowerCase();

  if (lower.includes("checker")) {
    return [
      `Review ${title.toLowerCase()} results quickly.`,
      `Find issues that may need attention before publishing or sharing.`,
      `Use the results to make more informed content or workflow decisions.`,
    ];
  }

  if (lower.includes("generator")) {
    return [
      `Create a starting point with ${title.toLowerCase()}.`,
      `Adjust the generated result to match your project or campaign.`,
      `Reuse the output in your existing workflow.`,
    ];
  }

  if (lower.includes("calculator")) {
    return [
      `Enter the values you already have.`,
      `Calculate the result without manual arithmetic.`,
      `Use the result in planning, analysis, or everyday work.`,
    ];
  }

  if (lower.includes("converter")) {
    return [
      `Provide the source value or data.`,
      `Convert it into the format you need.`,
      `Copy the converted result into your workflow.`,
    ];
  }

  if (category.toLowerCase() === "developer") {
    return [
      `Prepare or inspect development data quickly.`,
      `Reduce repetitive manual formatting or transformation work.`,
      `Copy the result directly into your development workflow.`,
    ];
  }

  return [
    `Complete the task directly in your browser.`,
    `Review the result and make any final adjustments you need.`,
    `Use the output in your next workflow step.`,
  ];
}

function getFaq(title: string, description: string) {
  return [
    {
      question: `What is ${title}?`,
      answer:
        `${title} is a browser-based tool in AI Tool Engine. ${description}`,
    },
    {
      question: `How do I use ${title}?`,
      answer:
        `Open the tool, provide the requested information, run the tool, and review the generated or calculated result.`,
    },
    {
      question: `Is ${title} available online?`,
      answer:
        `Yes. ${title} is available directly in your browser through AI Tool Engine.`,
    },
    {
      question: `Who can use ${title}?`,
      answer:
        `It can be useful for creators, marketers, developers, website owners, students, and anyone who needs the specific task handled by the tool.`,
    },
  ];
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData[slug as keyof typeof toolsData];

  if (!tool) {
    return {
      title: "Tool Not Found | AI Tool Engine",
      description: "The requested AI Tool Engine tool could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title =
    tool.seoTitle ||
    `${tool.title} - Free Online Tool`;

  const description =
    tool.seoDesc ||
    tool.description ||
    `Use ${tool.title} online with AI Tool Engine.`;

  const canonical = `${siteUrl}/tools/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AI Tool Engine",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolsData[slug as keyof typeof toolsData];

  if (!tool) {
    return null;
  }

  const relatedTools = getRelatedTools(slug, tool.category);
  const useCases = getUseCases(tool.title, tool.category);
  const faq = getFaq(tool.title, tool.description);
  const canonical = `${siteUrl}/tools/${slug}`;

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: canonical,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: tool.description,
    publisher: {
      "@type": "Organization",
      name: "AI Tool Engine",
      url: siteUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <ToolClient slug={slug} />

      <div className="tool-seo-content">

        <nav
          className="tool-seo-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/tools">Tools</Link>
          <span>›</span>
          <Link
            href={`/categories/${tool.category.toLowerCase()}`}
          >
            {tool.category}
          </Link>
          <span>›</span>
          <strong>{tool.title}</strong>
        </nav>

        <article>

          <header className="tool-seo-intro">
            <span className="tool-seo-eyebrow">
              {tool.category.toUpperCase()} TOOL
            </span>

            <h1>{tool.title}</h1>

            <p>{tool.description}</p>
          </header>

          <section className="tool-seo-section">
            <h2>About {tool.title}</h2>

            <p>
              {tool.description} AI Tool Engine provides this browser-based
              utility so you can complete the task quickly and review the
              result in one place.
            </p>
          </section>

          <section className="tool-seo-section">
            <h2>How to Use {tool.title}</h2>

            <ol>
              <li>Open the tool and review the available input fields.</li>
              <li>Enter or paste the information required for your task.</li>
              <li>Run the tool and review the result carefully.</li>
              <li>Copy, reuse, or apply the result to your workflow.</li>
            </ol>
          </section>

          <section className="tool-seo-section">
            <h2>Common Uses</h2>

            <ul>
              {useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {relatedTools.length > 0 && (
            <section className="tool-seo-section">
              <div className="tool-seo-section-heading">
                <div>
                  <span>RELATED TOOLS</span>
                  <h2>More {tool.category} Tools</h2>
                </div>

                <Link href="/tools">
                  Browse all tools →
                </Link>
              </div>

              <div className="tool-seo-related-grid">
                {relatedTools.map(([relatedSlug, relatedTool]) => (
                  <Link
                    key={relatedSlug}
                    href={`/tools/${relatedSlug}`}
                    className="tool-seo-related-card"
                  >
                    <strong>{relatedTool.title}</strong>
                    <p>{relatedTool.description}</p>
                    <span>Open tool →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="tool-seo-section tool-seo-pricing-cta">
            <span className="tool-seo-eyebrow">AI TOOL ENGINE</span>
            <h2>Need more from your workflow?</h2>
            <p>
              Explore AI Tool Engine pricing and see which plan best fits your workflow.
            </p>
            <a href="/pricing">View Pricing &amp; Plans →</a>
          </section>


          <section
            className="tool-seo-section"
            id="tool-faq"
          >
            <span className="tool-seo-eyebrow">FAQ</span>
            <h2>{tool.title} FAQ</h2>

            <div className="tool-seo-faq-list">
              {faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
