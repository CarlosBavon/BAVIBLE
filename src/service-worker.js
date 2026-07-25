/* eslint-disable no-restricted-globals */

// This file is picked up automatically by react-scripts (CRA checks for
// src/service-worker.js and wires up Workbox's InjectManifest plugin) —
// no eject needed. It's registered from src/index.js via
// serviceWorkerRegistration.register().

import { clientsClaim } from "workbox-core";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

self.skipWaiting();
clientsClaim();

// ---- 1. App shell (JS/CSS/HTML/images built by CRA) ----
// self.__WB_MANIFEST is injected at build time with the hashed list of
// every file in `build/`. This is what makes the app itself load offline.
precacheAndRoute(self.__WB_MANIFEST);

// SPA fallback: any navigation not otherwise handled (e.g. a deep link like
// /read/canon/genesis/1 opened while offline) falls back to the cached
// index.html so React Router can take over client-side.
const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/;
registerRoute(
  ({ request, url }) =>
    request.mode === "navigate" &&
    !url.pathname.startsWith("/_") &&
    !fileExtensionRegexp.test(url.pathname),
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// ---- 2. Google Fonts ----
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({ cacheName: "google-fonts-stylesheets" })
);
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 365, maxEntries: 30 }),
    ],
  })
);

// ---- 3. The live scripture APIs ----
// Network-first: always try to fetch a fresh chapter when online (so
// translations/text stay current), but fall back to whatever was last
// cached for that exact chapter when offline. This means any chapter
// you've read once stays readable offline from then on.
const scriptureApiMatch = ({ url }) =>
  url.origin === "https://bible-api.com" ||
  url.origin === "https://thedouayrheims.com" ||
  url.origin === "https://api.allorigins.win" ||
  url.origin === "https://corsproxy.io";

registerRoute(
  scriptureApiMatch,
  new NetworkFirst({
    cacheName: "scripture-api",
    networkTimeoutSeconds: 6, // fall back to cache quickly on a bad connection
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 1000, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
);
