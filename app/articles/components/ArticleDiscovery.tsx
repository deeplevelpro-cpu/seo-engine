"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";

export default function ArticleDiscovery() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(articles.map((article) => article.category))
      ).sort(),
    []
  );

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        category === "All" ||
        article.category === category;

      if (!categoryMatch) return false;

      if (!q) return true;

      const searchableText = [
        article.title,
        article.description,
        article.category,
        ...article.tags
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [query, category]);

  return (
    <section className="article-discovery">

      <div className="article-discovery-controls">

        <div className="article-discovery-search">
          <span>⌕</span>

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search guides, errors, Linux fixes..."
            aria-label="Search articles"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter articles by category"
        >
          <option value="All">All Categories</option>

          {categories.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="article-discovery-count">
        {filteredArticles.length}{" "}
        {filteredArticles.length === 1 ? "article" : "articles"} found
      </div>

      <div className="article-discovery-grid">

        {filteredArticles.map((article) => (

          <Link
            href={`/articles/${article.slug}`}
            className="article-discovery-card"
            key={article.slug}
          >

            {article.featuredImage && (
              <img
                src={article.featuredImage}
                alt={article.title}
                loading="lazy"
              />
            )}

            <div className="article-discovery-card-body">

              <div className="article-discovery-meta">
                <span>{article.category}</span>
                <span>{article.readingTime}</span>
              </div>

              <h2>{article.title}</h2>

              <p>{article.description}</p>

              <div className="article-discovery-tags">
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <strong>Read Guide →</strong>

            </div>

          </Link>

        ))}

      </div>

      {filteredArticles.length === 0 && (
        <div className="article-discovery-empty">
          <strong>No matching guides found.</strong>
          <p>
            Try another keyword or select a different category.
          </p>
        </div>
      )}

    </section>
  );
}
