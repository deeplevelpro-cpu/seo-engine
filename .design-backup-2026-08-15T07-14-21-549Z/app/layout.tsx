import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://seo-engine-mu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "AI Tool Engine — Free Online SEO Tools",
    template: "%s | AI Tool Engine",
  },

  description:
    "Free online SEO tools for keyword research, content optimization, metadata, text analysis, and everyday SEO tasks. Fast, simple, and easy to use.",

  applicationName: "AI Tool Engine",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "AI Tool Engine",
    title: "AI Tool Engine — Free Online SEO Tools",
    description:
      "Free online SEO tools for keyword research, content optimization, metadata, text analysis, and more.",
    url: siteUrl,
  },

  twitter: {
    card: "summary",
    title: "AI Tool Engine — Free Online SEO Tools",
    description:
      "Free online SEO tools for SEO, content optimization, metadata, keywords, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "sans-serif",
          background: "#0f172a",
          color: "white",
        }}
      >
        {children}
      </body>
    </html>
  );
}
