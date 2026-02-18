import { withSerwist } from '@serwist/turbopack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  skipProxyUrlNormalize: true,
};

export default withSerwist(nextConfig);
