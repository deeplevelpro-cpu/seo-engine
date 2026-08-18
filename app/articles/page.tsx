import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";
import ArticleDiscovery from "./components/ArticleDiscovery";

export const metadata: Metadata = {
  title: "How-To Guides & Troubleshooting Articles | AI Tool Engine",
  description:
    "Practical troubleshooting guides, how-to articles, Linux fixes, development solutions, SEO guides, and useful technical resources.",
  alternates: {
    canonical: "/articles"
  }
};

export default function ArticlesPage() {
  return (
    <main className="article-engine-page">
      <section className="article-engine-hero">
        <span className="article-engine-badge">
          ✦ KNOWLEDGE HUB
        </span>

        <h1>How-To Guides & Troubleshooting</h1>

        <p>
          Practical solutions for Linux, development, SEO, web problems,
          software errors, and everyday technical issues.
        </p>
      </section>

      <ArticleDiscovery />

      <section className="article-engine-grid">
        {articles.map((article) => (
          <article className="article-engine-card" key={article.slug}>
            <div className="article-engine-card-top">
              <span>{article.category}</span>
              <small>{article.readingTime}</small>
            </div>

            <h2>{article.title}</h2>

            <p>{article.description}</p>

            <div className="article-engine-tags">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link href={`/articles/${article.slug}`}>
              Read Guide →
            </Link>
          </article>
        ))}
      </section>
    
          <section className="content-tools-discovery">
            <span>USEFUL TOOLS</span>
            <h2>Put the guides into action</h2>
            <p>Explore practical browser-based tools related to the topics covered in our guides.</p>
            <a href="/tools">Explore All Tools →</a>
          </section>
</main>
  );
}
