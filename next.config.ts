import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first (smallest for the sketched portrait), WebP for older browsers.
    formats: ["image/avif", "image/webp"],
    // The only next/image is the portrait (14–25rem wide, 1–3x screens). Next's
    // default 16 widths add ~47 URLs to the HTML and the 1080–3840 ones all return
    // the same 880px source, so offer just the widths that differ.
    deviceSizes: [640, 750, 828],
    imageSizes: [256, 384],
  },
  experimental: {
    // Ship the stylesheet (~9.5 KB gzipped) inside the HTML instead of as a
    // render-blocking request. Measured on a first visit (Slow 4G, 4x CPU, cold
    // cache): first paint 380 ms inlined vs 644 ms as a file. The cost is a heavier
    // HTML (Next also embeds the CSS in the RSC payload), so keep the CSS small.
    inlineCss: true,
  },
};

const isDev = process.env.NODE_ENV === "development";

// Serwist injects a webpack config, which conflicts with Turbopack (the `next dev`
// default). We only need the service worker for production, so we don't even invoke
// the wrapper in dev — dev stays on fast Turbopack, `next build --webpack` gets the SW.
export default isDev
  ? nextConfig
  : withSerwistInit({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      // Precache only what the app actually loads. public/ holds the resume and
      // certificates (fetched on demand, then runtime-cached) — nothing to preload.
      globPublicPatterns: [],
      exclude: [
        // Serwist's defaults (an explicit list replaces them).
        /\.map$/,
        /^manifest.*\.js$/,
        // Never requested: the portrait is served through /_next/image, and the
        // App Router doesn't load the Pages Router runtime or legacy polyfills.
        /static\/media\/portrait-/,
        /static\/chunks\/framework-/,
        /static\/chunks\/main-(?!app)/,
        /static\/chunks\/polyfills-/,
      ],
    })(nextConfig);
