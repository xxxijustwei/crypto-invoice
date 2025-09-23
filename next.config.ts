import { execSync } from "node:child_process";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GIT_COMMIT: execSync("git rev-parse HEAD").toString().trim(),
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
