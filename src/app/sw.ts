import { defaultCache } from "@serwist/next/worker";
import { Serwist, type PrecacheEntry } from "serwist";

// `self.__SW_MANIFEST` is injected by Serwist at build time with the list of
// static assets to precache. We cast rather than pull in the "webworker" lib so
// this file still type-checks under the app's DOM lib during `next build`.
const manifest = (self as unknown as {
  __SW_MANIFEST: (PrecacheEntry | string)[];
}).__SW_MANIFEST;

const serwist = new Serwist({
  precacheEntries: manifest,
  // Activate a new service worker as soon as it's ready so users get updates
  // on the next visit instead of being stuck on a stale cache.
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
