const CACHE_NAME = "pwa-cache";
const urlsToCache = [
  "/Imposter-game3/",
  "/Imposter-game3/index.html",
  "/Imposter-game3/icon-192.png",
  "/Imposter-game3/icon-512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
