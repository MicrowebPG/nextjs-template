import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'standalone', // Uncomment this for Docker deployments
  skipProxyUrlNormalize: true
};

export default nextConfig;
