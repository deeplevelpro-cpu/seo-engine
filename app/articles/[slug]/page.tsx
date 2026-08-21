import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";
import ArticleRecommendations from "../components/ArticleRecommendations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | AI Tool Engine",
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: `/articles/${article.slug}`
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      ...(article.featuredImage
        ? {
            images: [
              {
                url: article.featuredImage,
                width: 1536,
                height: 1024,
                alt: article.title
              }
            ]
          }
        : {})
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "/articles"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `/articles?category=${encodeURIComponent(article.category)}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title
      }
    ]
  };

  return (
    <main className="article-engine-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
      />

      <div className="article-engine-breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/articles">Articles</Link>
        <span>›</span>
        <span>{article.category}</span>
      </div>

      <header className="article-engine-detail-header">
        <span className="article-engine-badge">
          {article.category.toUpperCase()}
        </span>

        <h1>{article.title}</h1>

        <p>{article.description}</p>

        <div className="article-engine-meta">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
          <span>•</span>
          <span>Updated {article.updatedAt}</span>
        </div>
      </header>

      {article.featuredImage && (
        <figure className="article-engine-featured-image">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="eager"
          />
        </figure>
      )}

      <article className="article-engine-content">
        {article.content.map((section, index) => (
          <section key={`${article.slug}-${index}`}>
            {section.heading && <h2>{section.heading}</h2>}

            {section.paragraphs?.map((paragraph, index) => (
              <p key={`paragraph-${index}-${paragraph}`}>{paragraph}</p>
            ))}

            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}

            {section.code && (
              <pre>
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}
      </article>

      <ArticleRecommendations
        currentSlug={article.slug}
        category={article.category}
        tags={article.tags || []}
      />


      <footer className="article-engine-related">
        <Link href="/articles">← Back to all guides</Link>
        <Link href="/tools">Explore Free Tools →</Link>
      </footer>
    </main>
  );
}
