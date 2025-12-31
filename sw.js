const CACHE_NAME = 'imposter-game-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// عند تثبيت الـ Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // إجبار الـ SW الجديد على العمل فوراً دون انتظار إغلاق المتصفح
  self.skipWaiting();
});

// عند تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// جلب الملفات من الكاش لضمان السرعة وظهور الأيقونات
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
