import type { Metadata } from "next";
import Link from "next/link";
import toolsData from "@/data/tools";
import { SITE_URL } from "../../../lib/site-config";
import ToolClient from "./ToolClient";
import { getToolSeoContent } from "../../../lib/tool-seo-content";

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
  const seoContent = getToolSeoContent(tool.title, tool.category);
  const useCases = seoContent.useCases;
  const faq = [
    {
      question: `What does ${tool.title} do?`,
      answer: seoContent.intro,
    },
    {
      question: `How do I use ${tool.title}?`,
      answer: seoContent.howTo.join(" "),
    },
    {
      question: `What can I use ${tool.title} for?`,
      answer: seoContent.useCases.slice(0, 2).join(" "),
    },
    {
      question: `What should I check before using ${tool.title}?`,
      answer: seoContent.tips[0],
    },
  ];
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

            <p>{seoContent.intro}</p>
          </section>

          <section className="tool-seo-section">
            <h2>How to Use {tool.title}</h2>

            <ol>
              {seoContent.howTo.map((step) => (
                <li key={step}>{step}</li>
              ))}
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

          <section className="tool-seo-section">
            <h2>Tips for Using {tool.title}</h2>

            <ul>
              {seoContent.tips.map((tip) => (
                <li key={tip}>{tip}</li>
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
