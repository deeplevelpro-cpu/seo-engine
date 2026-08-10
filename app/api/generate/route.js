import { generateBlog } from "../../../lib/ai";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    const result = await generateBlog(topic);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
