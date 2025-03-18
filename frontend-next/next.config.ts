/* eslint-disable @typescript-eslint/no-require-imports */
const webpack = require("webpack");

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(["NEXT_PUBLIC_BACKEND_URL"])
    );
    return config;
  },
};

module.exports = nextConfig;
