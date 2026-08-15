import type { Metadata } from "next";
import toolsData from "@/data/tools";
import ToolClient from "./ToolClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://seo-engine-mu.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData[slug as keyof typeof toolsData];

  if (!tool) {
    return {
      title: "Tool Not Found | AI Tool Engine",
      description: "The requested SEO tool could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title =
    tool.seoTitle ||
    `${tool.title} - Free Online SEO Tool`;

  const description =
    tool.seoDesc ||
    tool.description ||
    `Use ${tool.title} free online.`;

  const canonical = `${siteUrl}/tools/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AI Tool Engine",
      type: "website",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  return <ToolClient slug={slug} />
      {/* PHASE_12_03_TOOL_DISCOVERY_LINK */}
      <div>
        <a href="/tools">Explore all tools</a>
      </div>;
}
