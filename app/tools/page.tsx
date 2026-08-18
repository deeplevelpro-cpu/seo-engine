"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import tools from "@/data/tools";

const PAGE_SIZE = 12;

const CATEGORY_META: Record<string, { icon: string; tone: string }> = {
  SEO: { icon: "⌁", tone: "blue" },
  Content: { icon: "✦", tone: "purple" },
  Developer: { icon: "</>", tone: "indigo" },
  Web: { icon: "◉", tone: "cyan" },
  Security: { icon: "◆", tone: "red" },
  Image: { icon: "▣", tone: "pink" },
  Marketing: { icon: "↗", tone: "orange" },
  Conversion: { icon: "⇄", tone: "green" },
  Calculators: { icon: "＋", tone: "violet" },
  Productivity: { icon: "✓", tone: "teal" },
};

export default function ToolsPage() {
  const toolEntries = Object.entries(tools);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();

    for (const [, tool] of toolEntries) {
      counts.set(tool.category, (counts.get(tool.category) || 0) + 1);
    }

    return [
      { name: "All Categories", count: toolEntries.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, [toolEntries]);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popular");

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = toolEntries.filter(([slug, tool]) => {
      const categoryMatch =
        activeCategory === "All Categories" ||
        tool.category === activeCategory;

      if (!categoryMatch) return false;
      if (!q) return true;

      return (
        slug.toLowerCase().includes(q) ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
      );
    });

    if (sort === "az") {
      result.sort((a, b) => a[1].title.localeCompare(b[1].title));
    }

    if (sort === "category") {
      result.sort((a, b) => {
        const categoryCompare = a[1].category.localeCompare(b[1].category);
        return categoryCompare || a[1].title.localeCompare(b[1].title);
      });
    }

    return result;
  }, [toolEntries, query, activeCategory, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTools.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  const visibleTools = filteredTools.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const setCategory = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };

  const setSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => index + 1
  );

  return (
      <>
    


    <main className="tools-directory phase-14-12-tools">
      <div className="tools-directory-glow tools-directory-glow-blue" />
      <div className="tools-directory-glow tools-directory-glow-purple" />
      <div className="tools-directory-grid" />

      <div className="tools-directory-shell">

        {/* HERO */}
        <section className="tools-premium-hero">
          <div className="tools-premium-hero-copy">
            <div className="tools-directory-eyebrow">
              <span />
              TOOL COLLECTION
            </div>

            <h1>
              Find the right
              <br />
              <strong>tool</strong>
            </h1>

            <p>
              Search the complete collection or browse by category
              to find the perfect tool for your needs.
            </p>

            <div className="tools-premium-trust">
              <span>✓ 100% Free</span>
              <span>⚡ Instant Results</span>
              <span>♙ No Sign Up</span>
              <span>◎ Browser Based</span>
            </div>
          </div>

          <div className="tools-premium-hero-stats">
            <div className="premium-stat-card stat-blue">
              <div className="premium-stat-icon">▦</div>
              <strong>{toolEntries.length}+</strong>
              <b>Free Tools</b>
              <small>Ready to use</small>
            </div>

            <div className="premium-stat-card stat-purple">
              <div className="premium-stat-icon">◉</div>
              <strong>{categories.length - 1}</strong>
              <b>Categories</b>
              <small>Organized by type</small>
            </div>

            <div className="premium-stat-card stat-green">
              <div className="premium-stat-icon">⚡</div>
              <strong>100%</strong>
              <b>Online</b>
              <small>Always available</small>
            </div>

            <div className="premium-stat-card stat-orange">
              <div className="premium-stat-icon">★</div>
              <strong>Free</strong>
              <b>No Signup</b>
              <small>Start instantly</small>
            </div>
          </div>
        </section>

        {/* DIRECTORY */}
        <section className="tools-premium-directory">

          <div className="tools-premium-directory-heading">
            <div>
              <span className="tools-directory-kicker">
                TOOL COLLECTION
              </span>
              <h2>Browse all tools</h2>
              <p>
                Explore our complete collection of useful browser-based tools.
              </p>
            </div>

            <div className="premium-result-count">
              <strong>{filteredTools.length}</strong>
              <span>matching tools</span>
            </div>
          </div>

          <div className="tools-premium-browser">

            {/* SIDEBAR */}
            <aside className="tools-category-sidebar premium-sidebar">
              <div className="sidebar-heading">
                <strong>Categories</strong>
                <span>{categories.length - 1}</span>
              </div>

              <div className="category-list">
                {categories.map((category) => {
                  const meta =
                    CATEGORY_META[category.name] || {
                      icon: "✦",
                      tone: "blue",
                    };

                  const active = activeCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      className={`category-item ${active ? "active" : ""}`}
                      onClick={() => setCategory(category.name)}
                    >
                      <span
                        className={`category-item-icon ${meta.tone}`}
                      >
                        {category.name === "All Categories"
                          ? "▦"
                          : meta.icon}
                      </span>

                      <span className="category-item-name">
                        {category.name}
                      </span>

                      <span className="category-item-count">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="sidebar-help">
                <span>✦</span>
                <strong>Can't find a tool?</strong>
                <p>
                  Tell us what you need and it may become part of
                  the collection.
                </p>
                <a href="/contact">Request a Tool →</a>
              </div>
            </aside>

            {/* RESULTS */}
            <div className="tools-directory-results premium-results">

              <div className="tools-premium-controls">
                <label className="tools-search premium-search">
                  <span>⌕</span>

                  <input
                    value={query}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tools..."
                    aria-label="Search tools"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </label>

                <div className="premium-sort">
                  <span>Sort by:</span>

                  <select
                    value={sort}
                    onChange={(event) => {
                      setSort(event.target.value);
                      setPage(1);
                    }}
                    aria-label="Sort tools"
                  >
                    <option value="popular">Popular</option>
                    <option value="az">A-Z</option>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>

              

              <div className="directory-tool-list premium-tool-list">
                {visibleTools.map(([slug, tool], index) => {
                  const meta =
                    CATEGORY_META[tool.category] || {
                      icon: "✦",
                      tone: "blue",
                    };

                  const number =
                    (safePage - 1) * PAGE_SIZE + index + 1;

                  return (
                    <Link
                      href={`/tools/${slug}`}
                      key={slug}
                      className="directory-tool-card premium-tool-card"
                    >
                      <div
                        className={`directory-tool-icon premium-tool-icon ${meta.tone}`}
                      >
                        {meta.icon}
                      </div>

                      <div className="directory-tool-main">
                        <div className="directory-tool-title-row">
                          <h3>{tool.title}</h3>

                          <span className="directory-category-pill">
                            {tool.category}
                          </span>
                        </div>

                        <p>{tool.description}</p>
                      </div>

                      <div className="directory-tool-meta">
                        <span className="directory-tool-number">
                          {String(number).padStart(2, "0")}
                        </span>

                        <span className="directory-open">
                          Open Tool <b>→</b>
                        </span>
                      </div>
                    </Link>
                  );
                })}

                {visibleTools.length === 0 && (
                  <div className="tools-empty-state">
                    <div>⌕</div>
                    <h3>No tools found</h3>
                    <p>
                      Try a different search term or choose another category.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCategory("All Categories");
                      }}
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="tools-pagination premium-pagination">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>

                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      type="button"
                      className={safePage === number ? "active" : ""}
                      onClick={() => setPage(number)}
                    >
                      {number}
                    </button>
                  ))}

                  {totalPages > 5 && <span>...</span>}

                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setPage((value) =>
                        Math.min(totalPages, value + 1)
                      )
                    }
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tools-premium-cta">
          <div className="premium-cta-art">
            <div>✦</div>
            <div>⚡</div>
            <div>▣</div>
          </div>

          <div>
            <span>BUILT FOR YOUR WORKFLOW</span>
            <h2>Can't find the tool you need?</h2>
            <p>
              We're always building useful tools for SEO, content,
              development and everyday digital work.
            </p>
          </div>

          <Link href="/contact">
            Request a Tool <b>→</b>
          </Link>
        </section>

      </div>
    
          <div className="tools-directory-pricing-link">
            <span>Need premium features?</span>
            <a href="/pricing">View Pricing &amp; Plans →</a>
          </div>
</main>
      </>
  );
}
