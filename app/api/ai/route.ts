import { NextResponse } from "next/server";
import knowledge from "../../assistant-data.json";

type Tool = {
  name: string;
  href: string;
};

const tools: Tool[] = knowledge.tools || [];

const aliases: Record<string, string[]> = {
  "keyword density": [
    "keyword density",
    "keyword density checker",
    "keyword percentage",
    "keyword frequency",
  ],
  "image compression": [
    "image compress",
    "compress image",
    "reduce image size",
    "smaller image",
    "image size",
    "photo size",
  ],
  "meta description": [
    "meta description",
    "meta tag",
    "seo description",
    "description generator",
  ],
  plagiarism: [
    "plagiarism",
    "duplicate content",
    "copied content",
    "content uniqueness",
  ],
  "word counter": [
    "word count",
    "count words",
    "words count",
    "character count",
  ],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreTool(query: string, tool: Tool) {
  const q = normalize(query);
  const name = normalize(tool.name);

  let score = 0;

  // Exact tool-name match is strongest.
  if (q.includes(name)) {
    score += 25;
  }

  const queryWords = q.split(/\s+/).filter(Boolean);
  const toolWords = name.split(/\s+/).filter(Boolean);

  // Only count meaningful tool-name words.
  for (const word of toolWords) {
    if (word.length < 4) continue;

    if (queryWords.includes(word)) {
      score += 6;
    }
  }

  // Strong intent aliases.
  for (const [intent, phrases] of Object.entries(aliases)) {
    const matched = phrases.some((phrase) =>
      q.includes(normalize(phrase))
    );

    if (matched && name.includes(intent)) {
      score += 30;
    }
  }

  return score;
}

function findTool(query: string) {
  const ranked = tools
    .map((tool) => ({
      tool,
      score: scoreTool(query, tool),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  // Do NOT return weak/random matches.
  if (!best || best.score < 12) {
    return null;
  }

  return best.tool;
}

function contains(query: string, words: string[]) {
  const q = normalize(query);
  return words.some((word) => q.includes(normalize(word)));
}

function answer(query: string) {
  const q = normalize(query);
  const tool = findTool(q);

  if (tool) {
    return {
      result:
        `Aapke liye ${tool.name} best match lagta hai. ` +
        `Neeche button se seedha tool open kar sakte hain.`,
      action: {
        type: "tool",
        label: `Open ${tool.name} →`,
        href: tool.href,
      },
    };
  }

  if (
    contains(q, [
      "pricing",
      "price",
      "plan",
      "subscription",
      "trial",
      "standard",
      "pro",
    ])
  ) {
    return {
      result:
        "AI Tool Engine offers a Free Trial at $0 for the first month, " +
        "then $6/month. Standard is $5/month or $50/year, and Pro is " +
        "$12/month or $120/year.",
      action: {
        type: "page",
        label: "View Pricing & Plans →",
        href: "/pricing",
      },
    };
  }

  if (
    contains(q, [
      "guide",
      "tutorial",
      "how to",
      "troubleshooting",
      "problem",
      "error",
      "fix",
    ])
  ) {
    return {
      result:
        "Our Guides section contains practical how-to and troubleshooting " +
        "articles. I can take you there.",
      action: {
        type: "page",
        label: "Browse Guides →",
        href: "/articles",
      },
    };
  }

  if (
    contains(q, [
      "category",
      "categories",
      "browse category",
      "tool category",
    ])
  ) {
    return {
      result:
        "You can browse AI Tool Engine tools by category to find the right " +
        "type of tool for your task.",
      action: {
        type: "page",
        label: "Browse Categories →",
        href: "/categories",
      },
    };
  }

  if (
    contains(q, [
      "contact",
      "support",
      "whatsapp",
      "team",
      "help me",
    ])
  ) {
    return {
      result:
        "You can contact the AI Tool Engine team through the Contact page " +
        "or WhatsApp support.",
      action: {
        type: "page",
        label: "Contact Support →",
        href: "/contact",
      },
    };
  }

  if (
    contains(q, [
      "blog",
      "article",
      "articles",
      "post",
      "posts",
    ])
  ) {
    return {
      result:
        "You can explore our Blog for practical tutorials, tips and tool-related content.",
      action: {
        type: "page",
        label: "Open the Blog →",
        href: "/blog",
      },
    };
  }

  if (
    contains(q, [
      "password",
      "generate password",
      "strong password",
      "random password",
      "password generator",
    ])
  ) {
    const passwordTool = tools.find((tool) => {
      const n = normalize(tool.name);
      const h = normalize(tool.href);

      return (
        n.includes("password") ||
        h.includes("password")
      );
    });

    if (passwordTool) {
      return {
        result:
          `I found a password-related tool: ${passwordTool.name}.`,
        action: {
          type: "tool",
          label: `Open ${passwordTool.name} →`,
          href: passwordTool.href,
        },
      };
    }

    return {
      result:
        "I couldn't find a password generator in the current AI Tool Engine tool catalog. I don't want to send you to the wrong tool.",
      action: null,
    };
  }


  if (
    contains(q, [
      "password",
      "password generator",
      "generate password",
      "strong password",
      "random password",
    ])
  ) {
    const passwordTool = tools.find((tool) => {
      const name = normalize(tool.name);
      const href = normalize(tool.href);

      return (
        name.includes("password") ||
        href.includes("password")
      );
    });

    if (passwordTool) {
      return {
        result:
          `Password generate karne ke liye ${passwordTool.name} available hai.`,
        action: {
          type: "tool",
          label: `Open ${passwordTool.name} →`,
          href: passwordTool.href,
        },
      };
    }

    return {
      result:
        "Mujhe abhi AI Tool Engine ke current tool catalog mein password generator nahi mila, isliye main aapko galat tool par nahi bhejunga.",
      action: null,
    };
  }

  if (
    contains(q, [
      "tool",
      "tools",
      "what can i use",
      "which tool",
      "find tool",
    ])
  ) {
    return {
      result:
        `AI Tool Engine currently has ${tools.length}+ discovered tools. ` +
        "Tell me what you want to accomplish and I'll try to find the most relevant one.",
      action: {
        type: "page",
        label: "Browse All Tools →",
        href: "/tools",
      },
    };
  }

  return {
    result:
      "I'm the AI Tool Engine website assistant. I can help you find a " +
      "tool, explain which section to use, show guides, explain pricing, " +
      "or help you contact the team. Tell me what you're trying to do.",
    action: null,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt =
      typeof body?.prompt === "string"
        ? body.prompt.trim()
        : "";

    if (!prompt) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    return NextResponse.json(answer(prompt));
  } catch {
    return NextResponse.json(
      {
        error: "Assistant request failed.",
      },
      { status: 500 }
    );
  }
}
