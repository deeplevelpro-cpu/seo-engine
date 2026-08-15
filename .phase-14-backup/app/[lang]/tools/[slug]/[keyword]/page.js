import { generateContent } from "@/lib/contentGenerator";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = String(resolvedParams?.lang || "en");
  const slug = String(resolvedParams?.slug || "");
  const keyword = String(resolvedParams?.keyword || "");

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ").trim();
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ").trim();

  return {
    title: `${cleanKeyword} — ${cleanSlug}`,
    description: `Explore ${cleanKeyword} with ${cleanSlug}. Use this online tool for fast results.`,
    alternates: {
      canonical: `/${lang}/tools/${slug}/${keyword}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${cleanKeyword} — ${cleanSlug}`,
      description: `Explore ${cleanKeyword} with ${cleanSlug}.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanKeyword} — ${cleanSlug}`,
      description: `Explore ${cleanKeyword} with ${cleanSlug}.`,
    },
  };
}

export default async function ToolPage({ params }) {
  const resolvedParams = await params;

  const lang = String(resolvedParams?.lang || "en");
  const slug = String(resolvedParams?.slug || "");
  const keyword = String(resolvedParams?.keyword || "");

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ").trim();
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ").trim();

  const content = await generateContent(cleanKeyword);

  const benefits = Array.isArray(content?.benefits)
    ? content.benefits
    : [];

  const steps = Array.isArray(content?.steps)
    ? content.steps
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
            {content?.description ||
              `Learn how to use ${cleanKeyword} with ${cleanSlug}.`}
          </p>

          <p>
            {content?.intro ||
              `This guide explains ${cleanKeyword}, what it does,
              how it works, and practical ways to use it effectively.`}
          </p>
        </header>

        <section>
          <h2>About {cleanKeyword}</h2>
          <p>
            {content?.content ||
              `Use this ${cleanKeyword} resource to understand the
              workflow, important features, common use cases, and practical
              recommendations before using the tool.`}
          </p>
        </section>

        <section>
          <h2>Benefits</h2>
          {benefits.length > 0 ? (
            <ul>
              {benefits.map((benefit, index) => (
                <li key={index}>{String(benefit)}</li>
              ))}
            </ul>
          ) : (
            <ul>
              <li>Fast and easy browser-based workflow.</li>
              <li>Useful for common SEO and content tasks.</li>
              <li>Simple interface with practical results.</li>
            </ul>
          )}
        </section>

        <section>
          <h2>How to Use It</h2>
          {steps.length > 0 ? (
            <ol>
              {steps.map((step, index) => (
                <li key={index}>{String(step)}</li>
              ))}
            </ol>
          ) : (
            <ol>
              <li>Open the tool and review the available input.</li>
              <li>Enter your information and run the tool.</li>
              <li>Review the generated result and apply it to your workflow.</li>
            </ol>
          )}
        </section>

        <section>
          <h2>Related Resources</h2>

          <p>
            <a href="/tools">Browse all tools</a>
          </p>

          <p>
            <a href="/categories">Browse tool categories</a>
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
            Language: {lang} · Tool: {cleanSlug}
          </p>
        </footer>
      </article>
    </main>
  );
}
