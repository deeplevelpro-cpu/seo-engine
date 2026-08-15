import { connectDB } from "@/lib/db";
import Blog from "../../../models/Blog";
import slugify from "slugify";

const topics = [
  "AI tools for students",
  "Best SEO strategies 2026",
  "Make money online with AI",
  "ChatGPT business ideas",
  "Top freelancing skills",
  "Passive income ideas",
  "YouTube automation guide",
  "Dropshipping for beginners",
  "Digital marketing tips",
  "Blogging for beginners"
];

async function generateContent(topic) {
  const res = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    body: JSON.stringify({ topic }),
  });

  const data = await res.json();
  return data.content;
}

export async function GET() {
  try {

  await connectDB();

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const content = await generateContent(topic);

    const slug = slugify(topic + "-" + Date.now(), {
      lower: true,
      strict: true,
    });

    await Blog.create({ topic, content, slug });
  }

  return Response.json({ success: true, message: "Blogs Generated 🚀" });

  } catch (error) {
    console.error("[api/bulk] generation failed:", error);
    return Response.json(
      {
        success: false,
        error: "Bulk generation failed",
      },
      { status: 500 }
    );
  }
}
