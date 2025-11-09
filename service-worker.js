// Nom du cache
const CACHE_NAME = 'super-site-cache-v1';
const urlsToCache = [
  '/test-appli-windows/',
  '/test-appli-windows/index.html',
  '/test-appli-windows/styles.css',
  '/test-appli-windows/script.js',
  '/test-appli-windows/icons/icon-192x192.png',
  '/test-appli-windows/icons/icon-512x512.png'
];

// Installation : mise en cache des ressources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation : nettoyage des vieux caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
