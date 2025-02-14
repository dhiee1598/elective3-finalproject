import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Important for correct routing
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
  },
  output: "standalone", // Helpful for deployment on Vercel
};

export default nextConfig;
