import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
    ],
    // Higher-quality default so logos/fills don't look compressed on retina.
    qualities: [75, 85, 90, 100],
    // Extra small-image breakpoints so logos in the 200–500 css-px range pick
    // a 2x variant on retina (default stops at 384, too low for a 244-wide logo
    // on a 2x display which needs ≥488px physical).
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 896],
  },
};

export default nextConfig;
