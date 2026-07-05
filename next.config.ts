import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
    })(nextConfig);
