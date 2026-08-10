import Link from "next/link";

export default function ToolCard({ tool }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: "8px" }}>{tool.name}</h3>
      <p>{tool.description}</p>

      <Link href={`/tools/${tool.slug}`} className="button">
        Use Tool →
      </Link>
    </div>
  );
}
