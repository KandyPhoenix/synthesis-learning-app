// Minimal service worker — enables "Add to Home Screen" + an offline shell.
// Network-first for app code (so updates always reach you), cache-first
// for the heavy data.js + inline-books-*.js so the app launches instantly on second visit.

const CACHE_VERSION = 'synthesis-v22';
// Relative paths so this works at GitHub Pages subdirectory too.
// Only the app shell + scripts used across nearly every view go here — the
// 170+ per-book -data.js/-ext-data.js files are intentionally NOT precached
// (that would balloon install time); they're picked up lazily by the
// network-first fetch handler below on first visit to that book.
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './gamification.js',
  './exam-center.js',
  './exam-center.css',
  './premium-features.js',
  './fitness-tracker.js',
  './recipe-assistant.js',
  './active-recall.js',
  './random-workout-generator.js',
  './toast.js',
  './firebase-sync.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(c => c.addAll(CORE_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never intercept Firebase / Google auth / Firestore traffic — must hit live
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('google.com') ||
      url.hostname.includes('firebase')) {
    return; // let the browser handle it normally
  }

  // For data.js (large, mostly static) — cache-first, falls back to network
  if (url.pathname.endsWith('/data.js') || url.pathname.endsWith('/medical-coding-data.js') ||
      /\/inline-books-[a-z0-9-]+\.js$/.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async cache => {
        const cached = await cache.match(req);
        if (cached) {
          // Refresh in the background so next launch sees newest data
          fetch(req).then(resp => { if (resp.ok) cache.put(req, resp.clone()); }).catch(() => {});
          return cached;
        }
        const resp = await fetch(req);
        if (resp.ok) cache.put(req, resp.clone());
        return resp;
      })
    );
    return;
  }

  // For everything else — network-first, fall back to cache
  event.respondWith(
    fetch(req)
      .then(resp => {
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(req))
  );
});
