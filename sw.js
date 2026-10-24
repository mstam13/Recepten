// Minimal offline-support service worker: precaches the app shell on
// install, then serves cached responses first while refreshing them
// from the network in the background (stale-while-revalidate).
const CACHE_NAME = 'recepten-v2';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './home.js',
  './wake-lock.js',
  './recipe-interactions.js',
  './pwa-register.js',
  './manifest.webmanifest',
  './recipes/lemon-bars.html',
  './recipes/pasta-rode-pesto.html',
  './recipes/italiaanse-salade.html',
  './recipes/creme-brulee-tiramisu.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') {
    return;
  }

  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        return cached;
      });

      return cached || networkFetch;
    })
  );
});
