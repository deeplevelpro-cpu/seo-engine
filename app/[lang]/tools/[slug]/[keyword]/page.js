import { generateContent } from "@/lib/contentGenerator";

export default async function ToolPage({ params }) {
  const { lang, slug, keyword } = params;

  const cleanKeyword = keyword.replace(/-/g, " ");

  const content = await generateContent(cleanKeyword, lang);

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>{cleanKeyword} ({lang})</h1>

      <p>{content.intro}</p>

      <h2>Related Tools</h2>
      {content.links.map((link, i) => (
        <div key={i}>
          <a href={link}>{link}</a>
        </div>
      ))}
    </div>
  );
}
