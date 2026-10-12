import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain files to out/, served by Cloudflare (see wrangler.jsonc).
  // Cache Components / Partial Prefetching are request-time features; a static export doesn't need them.
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
