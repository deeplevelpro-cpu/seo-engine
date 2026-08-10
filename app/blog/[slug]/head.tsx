import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export default async function Head({ params }: { params: { slug: string } }) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug });

  return (
    <>
      <title>{blog?.title || "Blog"}</title>
      <meta name="description" content={blog?.content?.slice(0, 150)} />
    </>
  );
}
