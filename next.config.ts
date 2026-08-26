import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "";
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
