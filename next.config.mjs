/** @type {import('next').NextConfig} */
const nextConfig = {
  // Migration foundation only — no redirects/rewrites introduced.
  // Existing route URLs are preserved exactly via the app/ folder structure.
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },

    async redirects() {
    return [
      { source: "/Ilmora-cisco", destination: "/cisco", permanent: true },
      { source: "/Ilmora-workshops", destination: "/workshops", permanent: true },
      { source: "/ilmora-microsoft-certification", destination: "/microsoft", permanent: true },
      { source: "/ilmora-Microsoft-certification", destination: "/microsoft", permanent: true },
      { source: "/ilmora-google-certification", destination: "/google", permanent: true },
      { source: "/ilmora-Google-certification", destination: "/google", permanent: true },
      { source: "/ilmora-aws-certification", destination: "/aws", permanent: true },
      { source: "/ilmora-aws-certification/:path*", destination: "/aws/:path*", permanent: true },
      { source: "/ilm-ora-meet", destination: "/calendry", permanent: true },
      { source: "/ilm-ora-gulf/:path*", destination: "/gulf/:path*", permanent: true },
      { source: "/ilm-ora-talk", destination: "/talk", permanent: true },
      { source: "/ilmora-talk", destination: "/talk", permanent: true },
      { source: "/platforms", destination: "/career", permanent: true },
      { source: "/school-class/:path*", destination: "/board/:path*", permanent: true },
    ];
  },

  // Decouples "does the production build succeed" from "is the code
  // lint-clean" so each can be reported independently (see Day 2 report).
  // `next lint` is still run separately to surface real findings — most
  // are react/no-unescaped-entities on text that was copied verbatim from
  // the existing app, which never ran this lint rule under Vite.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Vite handles `import x from "./video.mp4"` as an asset-URL import out of
  // the box; Next's default webpack config has no loader for video files.
  // This adds the equivalent asset/resource rule so the same import syntax
  // used throughout the copied pages (hero-1.mp4, etc.) keeps working.
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;