import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">🔥 AI Tools</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
