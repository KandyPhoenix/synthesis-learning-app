const CACHE = 'ignite-v1';
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'quiz.js', 'sources.js', 'content-core.js',
  'content-pattern-initiation.js', 'content-pattern-overthinker.js', 'content-pattern-deadline.js',
  'content-pattern-interest.js', 'content-pattern-anxiety.js', 'content-pattern-perfectionism.js',
  'articles.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Network-first, cache fallback (works offline once visited). */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); }
    return res;
  }).catch(() => caches.match(e.request)));
});
