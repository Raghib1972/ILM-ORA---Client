/** @type {import('next').NextConfig} */
const nextConfig = {
  // Migration foundation only — no redirects/rewrites introduced.
  // Existing route URLs are preserved exactly via the app/ folder structure.
  reactStrictMode: true,

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
