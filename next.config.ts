import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict output for Vercel serverless/edge deployment
  output: "standalone",

  // Improve build performance and catch issues early
  typescript: {
    ignoreBuildErrors: false,
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
