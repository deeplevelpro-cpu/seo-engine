import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ✅ Proper Type Definition (NO ERROR EVER)
type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: Props) {
  await connectDB();

  const blog = await Blog.findOne({ slug: params.slug });

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-6">{blog.createdAt?.toString()}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
