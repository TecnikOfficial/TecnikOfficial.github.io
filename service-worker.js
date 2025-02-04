const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/404.html', // Ensure this is included
    // Add other assets you want to cache
];

// Install event: Cache the necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: Serve cached content or fallback to 404.html
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the request is in the cache, return it
                if (response) {
                    return response;
                }
                // If the request is not in the cache, try to fetch it
                return fetch(event.request).catch(() => {
                    // If the fetch fails (e.g., offline), return the 404 page
                    return caches.match('/404.html');
                });
            })
    );
});

// Activate event: Clean up old caches if necessary
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
