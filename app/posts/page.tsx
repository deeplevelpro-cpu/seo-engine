import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";

export default async function PostsPage() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });

  return (
    <main style={{ padding: "40px" }}>
      <h1>📚 All Blogs</h1>

      {blogs.map((b) => (
        <div key={b._id} style={{ marginTop: "20px" }}>
          <Link href={`/blog/${b.slug}`}>
            <h3 style={{ cursor: "pointer", color: "cyan" }}>
              {b.topic}
            </h3>
          </Link>
        </div>
      ))}
    </main>
  );
}
