import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
  },
};

export default nextConfig;
