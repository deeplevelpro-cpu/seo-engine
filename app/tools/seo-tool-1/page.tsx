export default function Page() {

const keywords = ["seo tool", "keyword generator", "free seo", "rank website"];

return (
  <main>
    <h1>SEO Tool</h1>

    <div>
      <h2>Generated Keywords</h2>
      <ul>
        {keywords.map((k, i) => (
          <li key={i}>{k}</li>
        ))}
      </ul>
    </div>

  </main>
);
}
