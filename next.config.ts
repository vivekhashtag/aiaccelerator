import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Build output dir. Defaults to ".next" (unchanged for `next dev` and Vercel).
  // CI/verification builds can set NEXT_DIST_DIR to a separate folder so a
  // production `next build` never clobbers a running `next dev` server's state.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Allow loading the dev server from other devices on the LAN (e.g. testing
  // the responsive layout on a phone via the machine's LAN IP). Without this,
  // Next.js 16 blocks cross-origin dev resources, so the client JS never
  // hydrates and nothing interactive works (hamburger, sidebar expand, etc.).
  // Production (Vercel) is unaffected — this only applies to `next dev`.
  allowedDevOrigins: ["192.168.27.115", "192.168.27.*", "192.168.0.*", "192.168.1.*"],
};

export default nextConfig;
