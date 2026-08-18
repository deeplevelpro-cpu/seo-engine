import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link href="/">Home</Link>
      <Link href="/tools">Tools</Link>
      <Link href="/blog">Blog</Link>
          <Link href="/articles">Guides</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
