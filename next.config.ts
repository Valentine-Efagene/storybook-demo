import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2skujpo3a5f3y.cloudfront.net',
        port: '',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;