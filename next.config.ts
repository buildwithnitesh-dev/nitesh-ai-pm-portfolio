import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The AI prototype moved into the AI Lab; keep old links working.
  async redirects() {
    return [{ source: "/work/ai-learner-diagnostic", destination: "/ai-lab/learner-diagnostic", permanent: true }];
  },
};

export default nextConfig;
