"use client";

import SiteNav from "@/components/SiteNav";

import { useState } from "react";
import Adsense from "../components/Adsense";

type DemoPost = {
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
};

const DEMO_POSTS: DemoPost[] = [
  {
    title: "The Benefits of AI in Digital Marketing",
    date: "May 15, 2024",
    readTime: "8 min read",
    category: "Digital Marketing",
    excerpt:
      "Artificial Intelligence is transforming digital marketing by enhancing personalization, improving targeting, and automating repetitive tasks. Discover how AI can help businesses create smarter and more effective marketing campaigns.",
    image: "/blog-demos/ai-marketing.svg",
    alt: "AI in Digital Marketing illustration",
  },
  {
    title: "SEO Best Practices for 2024",
    date: "May 14, 2024",
    readTime: "7 min read",
    category: "SEO",
    excerpt:
      "Stay ahead in search rankings with the latest SEO best practices. Learn practical strategies for keyword optimization, content planning, technical SEO, and sustainable organic growth.",
    image: "/blog-demos/seo-best-practices.svg",
    alt: "SEO best practices illustration",
  },
  {
    title: "How to Improve Website Performance",
    date: "May 13, 2024",
    readTime: "6 min read",
    category: "Web Development",
    excerpt:
      "A fast website not only improves user experience but can also strengthen search visibility. Learn practical ways to improve website speed, performance, and overall technical quality.",
    image: "/blog-demos/website-performance.svg",
    alt: "Website performance illustration",
  },
];

export default function BlogPage() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium (~800 words)");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<DemoPost[]>(DEMO_POSTS);

  const generate = async () => {
    if (!topic.trim() || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
          tone,
          length,
        }),
      });

      const data = await res.json();
      const generatedContent = data?.content || "";

      setContent(generatedContent);

      await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          content: generatedContent,
        }),
      });
    } catch (error) {
      console.error("Blog generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyPost = async (post: DemoPost) => {
    try {
      await navigator.clipboard.writeText(
        `${post.title}\n\n${post.excerpt}`
      );
    } catch {
      console.error("Copy failed");
    }
  };

  const downloadPost = (post: DemoPost) => {
    const blob = new Blob(
      [`${post.title}\n\n${post.excerpt}`],
      { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const deletePost = (index: number) => {
    setPosts((current) => current.filter((_, i) => i !== index));
  };

  return (
    <div className="blog-reference-page">
      <SiteNav />
      <style jsx>{`
        .blog-reference-page {
          min-height: 100vh;
          padding: 34px 24px 70px;
          background:
            radial-gradient(circle at 8% 5%, rgba(99, 102, 241, 0.10), transparent 28%),
            radial-gradient(circle at 94% 12%, rgba(168, 85, 247, 0.11), transparent 30%),
            linear-gradient(180deg, #f8faff 0%, #f6f8ff 100%);
          color: #101a35;
        }

        .blog-reference-shell {
          width: min(100%, 1120px);
          margin: 0 auto;
        }

        .blog-hero {
          position: relative;
          overflow: hidden;
          padding: 34px 36px 28px;
          border: 1px solid rgba(113, 124, 255, 0.16);
          border-radius: 16px;
          background:
            radial-gradient(circle at 92% 8%, rgba(126, 87, 255, 0.18), transparent 27%),
            radial-gradient(circle at 5% 18%, rgba(76, 120, 255, 0.11), transparent 30%),
            rgba(255, 255, 255, 0.94);
          box-shadow:
            0 24px 70px rgba(46, 61, 120, 0.10),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .blog-hero::after {
          content: "";
          position: absolute;
          right: -45px;
          top: -85px;
          width: 330px;
          height: 280px;
          background:
            radial-gradient(circle at 30% 35%, rgba(255,255,255,.75) 0 2px, transparent 3px),
            radial-gradient(circle at 72% 27%, rgba(255,255,255,.65) 0 2px, transparent 3px),
            linear-gradient(135deg, transparent 20%, rgba(139, 92, 246, .10) 21%, rgba(99,102,241,.08) 70%, transparent 71%);
          transform: rotate(-10deg);
          pointer-events: none;
        }

        .blog-title-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 14px;
        }

        .blog-title-icon {
          width: 74px;
          height: 74px;
          display: grid;
          place-items: center;
          flex: 0 0 74px;
          border-radius: 14px;
          background: linear-gradient(145deg, #eef0ff, #e5dcff);
          box-shadow:
            0 12px 28px rgba(88, 76, 230, 0.13),
            inset 0 1px 0 rgba(255,255,255,.9);
          font-size: 43px;
        }

        .blog-title {
          margin: 0;
          font-size: clamp(42px, 6vw, 62px);
          line-height: .98;
          letter-spacing: -2.7px;
          font-weight: 800;
          color: #0d1733;
        }

        .blog-subtitle {
          position: relative;
          z-index: 2;
          margin: 0 0 24px;
          max-width: 720px;
          color: #435579;
          font-size: 17px;
          line-height: 1.65;
        }

        .blog-subtitle span {
          display: block;
        }

        .blog-generator-card {
          position: relative;
          z-index: 3;
          padding: 24px 22px 20px;
          border: 1px solid rgba(107, 119, 165, 0.20);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 18px 45px rgba(42, 58, 110, 0.09),
            inset 0 1px 0 rgba(255,255,255,.9);
        }

        .field-label {
          display: block;
          margin: 0 0 8px 2px;
          color: #17223d;
          font-size: 15px;
          font-weight: 700;
        }

        .topic-wrap {
          position: relative;
        }

        .topic-input {
          width: 100%;
          height: 54px;
          padding: 0 58px 0 14px;
          border: 1px solid #d5dbea;
          border-radius: 10px;
          outline: none;
          background: #fff;
          color: #18233f;
          font-size: 16px;
          box-sizing: border-box;
          transition: .2s ease;
        }

        .topic-input::placeholder {
          color: #8a96b0;
        }

        .topic-input:focus {
          border-color: #6376ff;
          box-shadow: 0 0 0 4px rgba(99, 118, 255, .10);
        }

        .topic-count {
          position: absolute;
          right: 13px;
          bottom: -20px;
          color: #677492;
          font-size: 12px;
        }

        .select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          margin-top: 30px;
        }

        .select-field {
          position: relative;
        }

        .select-control {
          width: 100%;
          height: 50px;
          padding: 0 42px 0 13px;
          border: 1px solid #d5dbea;
          border-radius: 10px;
          background: #fff;
          color: #17223d;
          font-size: 15px;
          outline: none;
          appearance: none;
          cursor: pointer;
          box-sizing: border-box;
        }

        .select-control:focus {
          border-color: #6376ff;
          box-shadow: 0 0 0 4px rgba(99, 118, 255, .10);
        }

        .select-arrow {
          position: absolute;
          right: 14px;
          bottom: 15px;
          pointer-events: none;
          color: #17223d;
          font-size: 13px;
        }

        .select-icon {
          position: absolute;
          left: 13px;
          bottom: 14px;
          pointer-events: none;
          font-size: 18px;
        }

        .select-control.has-icon {
          padding-left: 43px;
        }

        .generate-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .generate-button {
          min-width: 310px;
          height: 54px;
          border: 0;
          border-radius: 11px;
          padding: 0 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: white;
          background: linear-gradient(100deg, #315fff 0%, #673eff 48%, #8b3ff2 100%);
          box-shadow:
            0 15px 30px rgba(85, 70, 244, .24),
            inset 0 1px 0 rgba(255,255,255,.20);
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
        }

        .generate-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 19px 34px rgba(85, 70, 244, .30),
            inset 0 1px 0 rgba(255,255,255,.20);
        }

        .generate-button:disabled {
          opacity: .72;
          cursor: wait;
          transform: none;
        }

        .generate-icon {
          font-size: 21px;
        }

        .generate-arrow {
          font-size: 21px;
          margin-left: auto;
        }

        .powered-strip {
          margin-top: 15px;
          min-height: 46px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 9px;
          background: linear-gradient(100deg, #eef0ff, #f7f1ff);
          color: #273866;
          font-size: 13px;
        }

        .powered-icon {
          color: #4e63ff;
          font-size: 18px;
        }

        .ad-wrapper {
          margin-top: 30px;
          padding: 12px;
          border-radius: 14px;
          background: #19263f;
          box-shadow: 0 14px 35px rgba(23, 38, 68, .13);
        }

        .ad-inner {
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          border: 1px dashed rgba(190, 203, 232, .30);
          border-radius: 9px;
          color: white;
        }

        .ad-money {
          font-size: 45px;
        }

        .ad-title {
          margin: 0;
          color: white;
          font-size: 20px;
          font-weight: 800;
        }

        .ad-copy {
          margin: 4px 0 0;
          color: #b7c4df;
          font-size: 14px;
        }

        .real-adsense {
          display: none;
        }

        .recent-section {
          margin-top: 34px;
        }

        .recent-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
        }

        .recent-heading-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          color: white;
          background: linear-gradient(135deg, #315fff, #7a3ff0);
          box-shadow: 0 8px 18px rgba(75, 72, 235, .20);
          font-size: 19px;
        }

        .recent-heading h2 {
          margin: 0;
          color: #111b38;
          font-size: 22px;
          line-height: 1.15;
          letter-spacing: -.4px;
        }

        .recent-heading p {
          margin: 5px 0 0;
          color: #687897;
          font-size: 13px;
        }

        .recent-list {
          display: grid;
          gap: 11px;
        }

        .recent-card {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr) auto;
          align-items: center;
          gap: 24px;
          padding: 15px;
          border: 1px solid #e0e5f1;
          border-radius: 15px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 11px 28px rgba(41, 56, 101, .07);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }

        .recent-card:hover {
          transform: translateY(-2px);
          border-color: #cbd2ff;
          box-shadow: 0 17px 35px rgba(41, 56, 101, .11);
        }

        .recent-thumb {
          width: 220px;
          height: 172px;
          overflow: hidden;
          border-radius: 11px;
          background: #101d55;
        }

        .recent-thumb img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .recent-content {
          min-width: 0;
          align-self: center;
        }

        .recent-content h3 {
          margin: 0 0 9px;
          color: #111b38;
          font-size: 20px;
          line-height: 1.2;
          letter-spacing: -.4px;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 9px;
          color: #70809f;
          font-size: 12px;
        }

        .blog-category-pill {
          padding: 4px 10px;
          border-radius: 999px;
          color: #6042df;
          background: #f0eaff;
          font-weight: 700;
        }

        .recent-excerpt {
          max-width: 720px;
          margin: 0;
          color: #617292;
          font-size: 13px;
          line-height: 1.7;
        }

        .read-button {
          display: inline-flex;
          align-items: center;
          margin-top: 14px;
          padding: 9px 14px;
          border: 1px solid #d9def2;
          border-radius: 8px;
          color: #3158ed;
          background: #f8f9ff;
          font-size: 13px;
          font-weight: 800;
        }

        .recent-actions {
          display: flex;
          align-items: center;
          gap: 7px;
          align-self: center;
        }

        .action-button {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid #dce2ef;
          border-radius: 9px;
          background: white;
          color: #435271;
          font-size: 17px;
          cursor: pointer;
          transition: .18s ease;
        }

        .action-button:hover {
          border-color: #aeb9ff;
          color: #4d54ef;
          transform: translateY(-1px);
        }

        .action-button.delete:hover {
          border-color: #ffb8b8;
          color: #ef4444;
          background: #fff7f7;
        }

        .generated-output {
          margin-top: 24px;
          padding: 24px;
          border: 1px solid #dce2ef;
          border-radius: 14px;
          background: white;
          box-shadow: 0 10px 28px rgba(41, 56, 101, .07);
        }

        .generated-output h2 {
          margin: 0 0 12px;
          color: #111b38;
          font-size: 21px;
        }

        .generated-output-content {
          color: #536584;
          line-height: 1.8;
          white-space: pre-wrap;
        }

        .tip-bar {
          margin-top: 17px;
          padding: 12px 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 9px;
          color: #425680;
          background: linear-gradient(100deg, #eff1ff, #f5efff);
          font-size: 12px;
        }

        .tip-bar strong {
          color: #283b73;
        }

        @media (max-width: 850px) {
          .blog-reference-page {
            padding: 20px 14px 50px;
          }

          .blog-hero {
            padding: 25px 20px 20px;
          }

          .select-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .generate-row {
            justify-content: stretch;
          }

          .generate-button {
            width: 100%;
            min-width: 0;
          }

          .recent-card {
            grid-template-columns: 150px minmax(0, 1fr);
            gap: 16px;
          }

          .recent-thumb {
            width: 150px;
            height: 125px;
          }

          .recent-actions {
            grid-column: 2;
            justify-content: flex-start;
          }
        }

        @media (max-width: 600px) {
          .blog-title-row {
            align-items: flex-start;
            gap: 12px;
          }

          .blog-title-icon {
            width: 55px;
            height: 55px;
            flex-basis: 55px;
            font-size: 32px;
          }

          .blog-title {
            font-size: 38px;
            letter-spacing: -1.7px;
          }

          .blog-subtitle {
            font-size: 14px;
          }

          .blog-generator-card {
            padding: 18px 14px 15px;
          }

          .recent-card {
            grid-template-columns: 1fr;
          }

          .recent-thumb {
            width: 100%;
            height: 190px;
          }

          .recent-actions {
            grid-column: auto;
          }

          .recent-content h3 {
            font-size: 18px;
          }

          .ad-inner {
            padding: 16px;
          }

          .ad-money {
            font-size: 35px;
          }

          .ad-title {
            font-size: 17px;
          }
        }
      `}</style>

      <div className="blog-reference-shell">
        <section className="blog-hero">
          <div className="blog-title-row">
            <div className="blog-title-icon" aria-hidden="true">
              📝
            </div>

            <h1 className="blog-title">
              AI Blog Generator
            </h1>
          </div>

          <p className="blog-subtitle">
            <span>Create high-quality, SEO-friendly blog posts in seconds.</span>
            <span>Enter a topic and let AI craft the perfect article for you.</span>
          </p>

          <div className="blog-generator-card">
            <label className="field-label" htmlFor="blog-topic">
              Enter your blog topic
            </label>

            <div className="topic-wrap">
              <input
                id="blog-topic"
                className="topic-input"
                type="text"
                maxLength={120}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generate();
                }}
                placeholder="e.g. Benefits of AI in Digital Marketing"
              />

              <span className="topic-count">
                {topic.length} / 120
              </span>
            </div>

            <div className="select-grid">
              <div className="select-field">
                <label className="field-label" htmlFor="language">
                  Language
                </label>

                <span className="select-icon" aria-hidden="true">🌐</span>

                <select
                  id="language"
                  className="select-control has-icon"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Portuguese</option>
                </select>

                <span className="select-arrow">⌄</span>
              </div>

              <div className="select-field">
                <label className="field-label" htmlFor="tone">
                  Tone
                </label>

                <span className="select-icon" aria-hidden="true">☺</span>

                <select
                  id="tone"
                  className="select-control has-icon"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Casual</option>
                  <option>Persuasive</option>
                  <option>Informative</option>
                </select>

                <span className="select-arrow">⌄</span>
              </div>

              <div className="select-field">
                <label className="field-label" htmlFor="article-length">
                  Article Length
                </label>

                <span className="select-icon" aria-hidden="true">☷</span>

                <select
                  id="article-length"
                  className="select-control has-icon"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option>Short (~500 words)</option>
                  <option>Medium (~800 words)</option>
                  <option>Long (~1500 words)</option>
                  <option>Detailed (~2500 words)</option>
                </select>

                <span className="select-arrow">⌄</span>
              </div>
            </div>

            <div className="generate-row">
              <button
                type="button"
                className="generate-button"
                onClick={generate}
                disabled={loading || !topic.trim()}
              >
                <span className="generate-icon">✎</span>
                <span>{loading ? "Generating..." : "Generate Blog"}</span>
                <span className="generate-arrow">›</span>
              </button>
            </div>

            <div className="powered-strip">
              <span className="powered-icon">◉</span>
              <span>
                Powered by advanced AI to create unique, engaging & SEO-optimized content.
              </span>
            </div>
          </div>

          <div className="ad-wrapper">
            <div className="ad-inner">
              <span className="ad-money" aria-hidden="true">💰</span>
              <div>
                <p className="ad-title">Adsense Ad Space</p>
                <p className="ad-copy">Your ad will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="real-adsense">
            <Adsense />
          </div>
        </section>

        {content && (
          <section className="generated-output">
            <h2>Generated Blog</h2>
            <div className="generated-output-content">
              {content}
            </div>
          </section>
        )}

        <section className="recent-section" aria-labelledby="recent-generated-blogs">
          <div className="recent-heading">
            <div className="recent-heading-icon" aria-hidden="true">
              ▤
            </div>

            <div>
              <h2 id="recent-generated-blogs">
                Recent Generated Blogs
              </h2>

              <p>
                Your recently generated AI blog posts will appear here.
              </p>
            </div>
          </div>

          <div className="recent-list">
            {posts.map((post, index) => (
              <article className="recent-card" key={`${post.title}-${index}`}>
                <div className="recent-thumb">
                  <img src={post.image} alt={post.alt} />
                </div>

                <div className="recent-content">
                  <h3>{post.title}</h3>

                  <div className="blog-meta">
                    <span>▣ {post.date}</span>
                    <span>•</span>
                    <span>◷ {post.readTime}</span>
                    <span>•</span>
                    <span className="blog-category-pill">
                      {post.category}
                    </span>
                  </div>

                  <p className="recent-excerpt">
                    {post.excerpt}
                  </p>

                  <span className="read-button">
                    Read Full Blog →
                  </span>
                </div>

                <div className="recent-actions">
                  <button
                    type="button"
                    className="action-button"
                    aria-label={`Copy ${post.title}`}
                    title="Copy"
                    onClick={() => copyPost(post)}
                  >
                    ▣
                  </button>

                  <button
                    type="button"
                    className="action-button"
                    aria-label={`Download ${post.title}`}
                    title="Download"
                    onClick={() => downloadPost(post)}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    className="action-button delete"
                    aria-label={`Delete ${post.title}`}
                    title="Delete"
                    onClick={() => deletePost(index)}
                  >
                    ♡
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="tip-bar">
            <strong>ⓘ Tip:</strong>
            <span>
              Be specific with your topic to get the best results. You can edit and regenerate anytime!
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
