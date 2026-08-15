import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";

export async function POST(req) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { topic, content } = body || {};

    if (
      typeof topic !== "string" ||
      !topic.trim()
    ) {
      return Response.json(
        { success: false, error: "Topic is required" },
        { status: 400 }
      );
    }

    if (
      typeof content !== "string" ||
      !content.trim()
    ) {
      return Response.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const slug = slugify(topic.trim(), {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create({
      topic: topic.trim(),
      content,
      slug,
    });

    return Response.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("POST /api/save failed:", error);

    return Response.json(
      {
        success: false,
        error: "Unable to save blog",
      },
      { status: 500 }
    );
  }
}
