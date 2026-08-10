import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";

export async function POST(req) {
  const { topic, content } = await req.json();

  await connectDB();

  const slug = slugify(topic, { lower: true, strict: true });

  const blog = await Blog.create({ topic, content, slug });

  return Response.json({ success: true, blog });
}
