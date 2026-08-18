const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
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

export async function POST(req) {
  try {
    if (isRateLimited(req)) {
      return Response.json(
        {
          success: false,
          error: "Too many generation requests. Please try again shortly.",
        },
        { status: 429 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") || 0);

    if (contentLength > 8_000) {
      return Response.json(
        {
          success: false,
          error: "Request body is too large.",
        },
        { status: 413 }
      );
    }

    let body;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        {
          success: false,
          error: "Invalid JSON body.",
        },
        { status: 400 }
      );
    }

    const topic =
      typeof body?.topic === "string"
        ? body.topic.trim()
        : "";

    if (!topic) {
      return Response.json(
        {
          success: false,
          error: "Topic is required.",
        },
        { status: 400 }
      );
    }

    if (topic.length > 180) {
      return Response.json(
        {
          success: false,
          error: "Topic is too long.",
        },
        { status: 422 }
      );
    }

    const { generateBlog } = await import("../../../lib/ai");

    const result = await generateBlog(topic);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("POST /api/generate failed:", error);

    return Response.json(
      {
        success: false,
        error: "Generation failed.",
      },
      { status: 500 }
    );
  }
}
