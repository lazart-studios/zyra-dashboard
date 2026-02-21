import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/zyra-dashboard',
  assetPrefix: '/zyra-dashboard',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
