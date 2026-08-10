import { generateBlogContent } from "@/lib/contentGenerator";

export default async function BlogPage({ params }) {
  const keyword = params.keyword.replace(/-/g, " ");
  const content = await generateBlogContent(keyword);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>{content.title}</h1>

      <p>{content.intro}</p>

      <h2>Use Tool</h2>
      <a href={`/tools/${params.slug}/${params.keyword}`}>
        Try {keyword} Tool
      </a>
    </div>
  );
}
