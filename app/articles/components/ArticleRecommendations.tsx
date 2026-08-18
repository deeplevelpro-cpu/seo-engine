import Image from "next/image";
import Link from "next/link";
import toolsData from "@/data/tools";
import { articles as articlesData } from "@/data/articles";

type Props = {
  currentSlug: string;
  category: string;
  tags: string[];
};

type ToolRecord = {
  title?: string;
  description?: string;
  category?: string;
  seoDesc?: string;
};

type ArticleRecord = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
};

function scoreTool(
  tool: ToolRecord,
  category: string,
  tags: string[]
) {
  const haystack = [
    tool.title || "",
    tool.description || "",
    tool.seoDesc || "",
    tool.category || ""
  ].join(" ").toLowerCase();

  let score = 0;

  if (
    tool.category &&
    tool.category.toLowerCase() === category.toLowerCase()
  ) {
    score += 8;
  }

  for (const tag of tags) {
    if (haystack.includes(tag.toLowerCase())) {
      score += 3;
    }
  }

  return score;
}

function scoreArticle(
  article: ArticleRecord,
  category: string,
  tags: string[]
) {
  let score = 0;

  if (
    article.category &&
    article.category.toLowerCase() === category.toLowerCase()
  ) {
    score += 8;
  }

  for (const tag of tags) {
    if (
      article.tags?.some(
        (item) => item.toLowerCase() === tag.toLowerCase()
      )
    ) {
      score += 4;
    }
  }

  return score;
}

export default function ArticleRecommendations({
  currentSlug,
  category,
  tags
}: Props) {
  const toolEntries = Object.entries(
    toolsData as Record<string, ToolRecord>
  );

  const recommendedTools = toolEntries
    .map(([slug, tool]) => ({
      slug,
      tool,
      score: scoreTool(tool, category, tags)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const allArticles = articlesData as ArticleRecord[];

  const relatedArticles = allArticles
    .filter((article) => article.slug !== currentSlug)
    .map((article) => ({
      article,
      score: scoreArticle(article, category, tags)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <section className="article-recommendations">
      {recommendedTools.length > 0 && (
        <div className="article-recommendation-section">
          <div className="article-recommendation-heading">
            <span className="article-recommendation-kicker">
              USEFUL TOOLS
            </span>
            <h2>Tools Related to This Article</h2>
            <p>
              Try these free tools when working through similar tasks.
            </p>
          </div>

          <div className="article-tool-grid">
            {recommendedTools.map(({ slug, tool }) => (
              <Link
                href={`/tools/${slug}`}
                className="article-tool-card"
                key={slug}
              >
                <span className="article-tool-icon">✦</span>

                <div>
                  <h3>{tool.title || slug}</h3>
                  <p>
                    {tool.description ||
                      tool.seoDesc ||
                      "Free online tool."}
                  </p>
                </div>

                <span className="article-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="article-recommendation-section">
          <div className="article-recommendation-heading">
            <span className="article-recommendation-kicker">
              KEEP READING
            </span>
            <h2>Related Articles</h2>
            <p>
              More practical guides and troubleshooting resources.
            </p>
          </div>

          <div className="article-related-grid">
            {relatedArticles.map(({ article }) => (
              <Link
                href={`/articles/${article.slug}`}
                className="article-related-card"
                key={article.slug}
              >
                {article.featuredImage && (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    loading="lazy"
                  />
                )}

                <div className="article-related-body">
                  <span>
                    {article.category || "Guide"}
                  </span>

                  <h3>{article.title}</h3>

                  <p>
                    {article.description ||
                      "Read the complete practical guide."}
                  </p>

                  <strong>Read Article →</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
