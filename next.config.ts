import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The AI prototype moved into the AI Lab; keep old links working.
  async redirects() {
    return [
      { source: "/work/ai-learner-diagnostic", destination: "/ai-lab/learner-diagnostic", permanent: true },
      // Approach now lives on About, as "How I work".
      { source: "/approach", destination: "/about#approach", permanent: true },
      // American spelling of the behavioural loops case.
      { source: "/work/behavioral-loops", destination: "/work/behavioural-loops", permanent: true },
    ];
  },
};

export default nextConfig;
