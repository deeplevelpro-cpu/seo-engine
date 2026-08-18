import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const requestLog = new Map();

function getClientKey(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  return ip;
}

function isRateLimited(req) {
  const key = getClientKey(req);
  const now = Date.now();

  const previous = requestLog.get(key) || [];
  const recent = previous.filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );

  recent.push(now);
  requestLog.set(key, recent);

  return recent.length > RATE_MAX;
}

function sameOriginAllowed(req) {
  const origin = req.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const requestOrigin = new URL(req.url).origin;
    return origin === requestOrigin;
  } catch {
    return false;
  }
}

export async function POST(req) {
  try {
    if (!sameOriginAllowed(req)) {
      return Response.json(
        {
          success: false,
          error: "Cross-origin requests are not allowed.",
        },
        { status: 403 }
      );
    }

    if (isRateLimited(req)) {
      return Response.json(
        {
          success: false,
          error: "Too many save requests. Please try again shortly.",
        },
        { status: 429 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") || 0);

    if (contentLength > 900_000) {
      return Response.json(
        {
          success: false,
          error: "Content payload is too large.",
        },
        { status: 413 }
      );
    }

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

    const cleanTopic = topic.trim();
    const cleanContent = content.trim();

    if (cleanTopic.length > 180) {
      return Response.json(
        { success: false, error: "Topic is too long" },
        { status: 422 }
      );
    }

    if (cleanContent.length > 700_000) {
      return Response.json(
        { success: false, error: "Content is too large" },
        { status: 422 }
      );
    }

    await connectDB();

    const slug = slugify(cleanTopic, {
      lower: true,
      strict: true,
    });

    if (!slug) {
      return Response.json(
        { success: false, error: "Unable to create a valid slug" },
        { status: 422 }
      );
    }

    const blog = await Blog.create({
      topic: cleanTopic,
      content: cleanContent,
      slug,
    });

    return Response.json({
      success: true,
      blog: {
        id: String(blog._id),
        topic: blog.topic,
        slug: blog.slug,
        createdAt: blog.createdAt,
      },
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
