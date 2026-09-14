import type { NextConfig } from "next";

// No remote image patterns needed: product placeholders are generated
// locally as inline SVG data URIs (see src/lib/image.ts) instead of being
// fetched from an external image service.
const nextConfig: NextConfig = {};

export default nextConfig;
