import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio project images are local, hand-made SVG illustrations.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
