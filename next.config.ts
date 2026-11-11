import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin access during development (e.g. mobile/Tailscale/LAN)
  allowedDevOrigins: [
    "100.119.24.127",
    "100.119.24.127:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
  ],

  // Strict output for Vercel serverless/edge deployment
  output: "standalone",

  // Image optimization for Unsplash
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

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
