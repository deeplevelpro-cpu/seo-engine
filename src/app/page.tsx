import tools from "@/data/tools";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Free SEO Tools</h1>
      <p>Use our powerful SEO tools to boost your rankings.</p>

      <ul style={{ marginTop: "20px" }}>
        {Object.entries(tools).map(([slug, tool]) => (
          <li key={slug} style={{ marginBottom: "10px" }}>
            <Link href={`/tools/${slug}`}>
              {tool.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
