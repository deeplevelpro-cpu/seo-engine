import tools from "@/data/tools";
import { generateGuide } from "@/lib/generateGuide";
import InternalLinks from "@/components/InternalLinks";
import { Metadata } from "next";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = (tools as any)[params.slug];
const slug = params.slug;

  if (!tool) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${tool.title} (2026 Guide)`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "article",
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = (tools as any)[params.slug];
const slug = params.slug;

  if (!tool) {
    return <div>Not Found</div>;
  }

  const guide = generateGuide(tool.title);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>

      <p className="mb-6 text-gray-600">{tool.description}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        How to Fix
      </h2>

      <p className="mb-4">{guide.intro}</p>

      <ol className="list-decimal pl-6 space-y-2">
        {guide.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Conclusion
      </h2>

      <p>{guide.conclusion}</p>

      <InternalLinks currentSlug={slug} />
    </main>
  );
}
