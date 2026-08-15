/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      {
        source: "/tools/case-converter",
        destination: "/tools/text-case-converter",
        permanent: true,
      },
      {
        source: "/tools/text-to-slug",
        destination: "/tools/seo-slug-generator",
        permanent: true,
      },
      {
        source: "/text-to-slug",
        destination: "/tools/seo-slug-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
