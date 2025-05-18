/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  basePath: "/the-money-brief",
  assetPrefix: "/the-money-brief/",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
