import { generateBlogContent } from "@/lib/contentGenerator";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const slug = String(resolvedParams?.slug || "");
  const keyword = String(resolvedParams?.keyword || "");

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ").trim();
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ").trim();

  return {
    title: `${cleanKeyword} — ${cleanSlug}`,
    description: `Learn about ${cleanKeyword} with practical information, guidance, and useful resources.`,
    alternates: {
      canonical: `/blog/${slug}/${keyword}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${cleanKeyword} — ${cleanSlug}`,
      description: `Learn about ${cleanKeyword} with practical information and guidance.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanKeyword} — ${cleanSlug}`,
      description: `Learn about ${cleanKeyword} with practical information and guidance.`,
    },
  };
}

export default async function BlogPage({ params }) {
  const resolvedParams = await params;

  const slug = String(resolvedParams?.slug || "");
  const keyword = String(resolvedParams?.keyword || "");

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ").trim();
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ").trim();

  const content = await generateBlogContent(cleanKeyword);

  const sections = Array.isArray(content?.sections)
    ? content.sections
    : [];

  const links = Array.isArray(content?.links)
    ? content.links
    : [];

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <article>
        <header>
          <h1>{content?.title || cleanKeyword}</h1>

          <p>
            {content?.intro ||
              `A practical guide to ${cleanKeyword}, including
              useful concepts, workflows, and recommendations.`}
          </p>
        </header>

        <section>
          <h2>Overview</h2>
          <p>
            {content?.content ||
              `This article explains ${cleanKeyword} in a practical way,
              covering important concepts, useful workflows, common mistakes,
              and actionable recommendations.`}
          </p>
        </section>

        {sections.length > 0 ? (
          sections.map((section, index) => (
            <section key={index}>
              <h2>
                {String(section?.title || `Guide Section ${index + 1}`)}
              </h2>

              <p>
                {String(
                  section?.content ||
                  section?.description ||
                  section?.text ||
                  ""
                )}
              </p>
            </section>
          ))
        ) : (
          <>
            <section>
              <h2>Key Considerations</h2>
              <p>
                Understanding the purpose, workflow, and expected result makes
                it easier to use {cleanKeyword} effectively. Focus on the
                specific task, verify the output, and keep the process simple.
              </p>
            </section>

            <section>
              <h2>Practical Tips</h2>
              <p>
                Start with a clear objective, use the relevant inputs, review
                the generated result, and refine your approach when necessary.
                These steps help turn {cleanKeyword} into a repeatable workflow.
              </p>
            </section>
          </>
        )}

        <section>
          <h2>Useful Links</h2>

          <p>
            <a href="/categories">Browse categories</a>
          </p>

          <p>
            <a href="/tools">Explore tools</a>
          </p>

          {links.length > 0 && (
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={String(link)}>{String(link)}</a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer>
          <p>
            Topic: {cleanKeyword} · Article: {cleanSlug}
          </p>
        </footer>
      </article>
    </main>
  );
}
