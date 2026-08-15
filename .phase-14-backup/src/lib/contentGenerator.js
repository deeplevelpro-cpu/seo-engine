import { buildControlledKeywordExpansion } from "./seo/keywordExpansion.js";
export function generateContent(keyword, slug = "") {
  const cleanKeyword = String(keyword || "online tool")
    .trim()
    .replace(/-/g, " ");

  const cleanSlug = String(slug || cleanKeyword)
    .trim()
    .replace(/-/g, " ");

  const safeKeyword =
    cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);

  return {
    title: safeKeyword,
    description:
      `Use this ${cleanSlug} guide and online utility for ${cleanKeyword}. Get practical results quickly with a simple browser-based workflow.`,

    intro:
      `This page explains how to use ${cleanKeyword} with the ${cleanSlug} tool. It provides a practical starting point, useful guidance, and a direct path to the main tool.`,

    content:
      `The ${cleanKeyword} workflow is useful when you need a fast and straightforward way to work with this task online. Start by reviewing the input requirements, enter your information, run the tool, and check the generated result. For the best result, use clear input and verify the output before using it in your project or workflow. This page is designed to help users understand the purpose of the tool as well as complete the task efficiently.`,

    benefits: [
      `Fast browser-based ${cleanKeyword} workflow`,
      `Simple instructions for getting started`,
      `Useful guidance for checking the final result`,
      `Direct access to the main ${cleanSlug} tool`,
    ],

    steps: [
      `Open the ${cleanSlug} tool`,
      `Enter the required information`,
      `Run the tool and review the result`,
      `Adjust the input if necessary and repeat`,
    ],

    links: [
      "/tools",
      "/categories",
      `/tools/${encodeURIComponent(String(slug || "").trim())}`,
    ],
  };
}

export function generateBlogContent(keyword, slug = "") {
  const cleanKeyword = String(keyword || "SEO")
    .trim()
    .replace(/-/g, " ");

  const cleanSlug = String(slug || cleanKeyword)
    .trim()
    .replace(/-/g, " ");

  const safeKeyword =
    cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);

  const semanticExpansion = buildControlledKeywordExpansion(cleanKeyword, slug);

  return {
    semanticExpansion,
    title: safeKeyword,

    description:
      `Learn about ${cleanKeyword}, practical SEO workflows, common mistakes, and useful ways to improve your results with online tools.`,

    intro:
      `This guide covers ${cleanKeyword} from a practical perspective, including how the workflow works, what to check, and how online tools can make the process easier.`,

    content:
      `Understanding ${cleanKeyword} can make common SEO and content tasks easier to manage. A useful workflow starts with identifying the goal, choosing the appropriate method, checking the input, and reviewing the final result. The ${cleanSlug} topic is especially useful when you want a repeatable process rather than relying on guesswork. Use the information on this page as a practical reference and verify important results before publishing or implementing them.`,

    sections: [
      {
        heading: `What is ${safeKeyword}?`,
        content:
          `${safeKeyword} is a useful topic for people working with websites, content, SEO, and online workflows. Understanding its basic purpose helps you choose the right approach.`,
      },
      {
        heading: `How to approach ${safeKeyword}`,
        content:
          `Start with a clear objective, prepare accurate input, use the appropriate tool or workflow, and review the result. Keeping the process consistent makes it easier to identify mistakes and improve future work.`,
      },
      {
        heading: `Common mistakes`,
        content:
          `Avoid unclear input, unnecessary repetition, and publishing results without checking them. A simple verification step can prevent many avoidable problems.`,
      },
    ],

    links: [
      "/tools",
      "/categories",
      `/tools/${encodeURIComponent(String(slug || "").trim())}`,
    ],
  };
}


/**
 * Keyword Cluster Contract
 * primary: main target query
 * secondary: supporting semantic queries
 * longTail: specific intent variations
 * intent: informational | commercial | transactional | navigational
 * toolSlug: canonical tool relationship
 * blogSlug: supporting editorial relationship
 */
export function buildKeywordCluster(keyword, slug = "") {
  const primary = String(keyword || "").trim().toLowerCase();

  const secondary = [
    `how to use ${primary}`,
    `${primary} online`,
    `free ${primary}`,
  ];

  const longTail = [
    `best free ${primary}`,
    `${primary} online tool`,
    `how does ${primary} work`,
  ];

  return {
    id: primary
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, ""),
    primary,
    secondary,
    longTail,
    intent: "commercial",
    toolSlug: String(slug || ""),
    blogSlug: String(slug || ""),
  };
}
