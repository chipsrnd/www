/** @type {import('next').NextConfig} */

import path from "node:path";

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: false,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    implementation: "sass-embedded",
    additionalData: `@use "${path.join(
      process.cwd(),
      "_mantine"
    )}" as mantine;`,
  },
};

export default nextConfig;
