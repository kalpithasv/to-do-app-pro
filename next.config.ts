import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack config (Next.js 16 uses Turbopack by default)
  turbopack: {},
  // Ensure server-side modules work correctly
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
