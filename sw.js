// Set a name for the current cache
var cacheName = 'v1_selenapp';

// Default files to always cache
var cacheFiles = [
  './',
  './script.js',
  './css/bootstrap.min.css',
  './css/styles.css',
  './fonts/Friendly-Schoolmates.otf',
  './fonts/Mithella-Regular.otf',
  './img/icons/16.png',
  './img/icons/24.png',
  './img/icons/32.png',
  './img/icons/64.png',
  './img/icons/128.png',
  './img/icons/256.png',
  './img/icons/512.png'
]

/**
 * Event Install Service Worker
 * @author Daniel Valencia <2022/07/01>
 */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

/**
 * Event Activate Service Worker
 * @author Daniel Valencia <2022/07/01>
 */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        if (thisCacheName !== cacheName) return caches.delete(thisCacheName);
      }));
    })
  );
});

/**
 * Event Fetch Service Worker
 * @author Daniel Valencia <2022/07/01>
 */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        if (response) return response;
        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {
            if (!response) return response;
            var responseClone = response.clone();
            caches.open(cacheName).then(function (cache) {
              cache.put(e.request, responseClone);
              return response;
            });
          })
          .catch(function (err) { });
      })
  );
});