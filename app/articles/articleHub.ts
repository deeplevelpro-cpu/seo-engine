import { articles } from "@/data/articles";

export function getLatestArticles(limit = 6) {
  return [...articles]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.publishedAt).getTime();
      const dateB = new Date(b.updatedAt || b.publishedAt).getTime();

      return dateB - dateA;
    })
    .slice(0, limit);
}

export function getFeaturedArticles(limit = 3) {
  return getLatestArticles(limit);
}

export function getArticleCategories() {
  return Array.from(
    new Set(
      articles
        .map((article) => article.category)
        .filter(Boolean)
    )
  ).sort();
}

export function getArticleCount() {
  return articles.length;
}
