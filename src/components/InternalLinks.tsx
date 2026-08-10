type ToolWithSlug = { slug: string } & any;
import Link from "next/link";
import tools from "@/data/tools";

export default function InternalLinks({ currentSlug }: { currentSlug: string }) {
  const related = Object.entries(tools)
    .filter(([slug]) => slug !== currentSlug)
    .slice(0,3)
    .map(([slug, tool]) => ({ slug, ...tool }));

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-3">
        Related Guides
      </h3>

      <ul className="list-disc pl-6 space-y-2">
        {related.map((item) => (
          <li key={item.slug}>
            <Link href={`/tools/${item.slug}`} className="text-blue-600 underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
