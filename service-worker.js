self.addEventListener('install', event => {
  // Pre-cache aplikacji
  event.waitUntil(
    caches.open('mwd-cache-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'script.js',
        'manifest.json',
        'icons/icon-192.png',
        'icons/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Usuwanie starych cache
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== 'mwd-cache-v1').map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Network-first dla nawigacji, cache-first dla reszty
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
