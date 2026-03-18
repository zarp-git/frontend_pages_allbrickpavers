import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yuerqsaspdqzpshs.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
