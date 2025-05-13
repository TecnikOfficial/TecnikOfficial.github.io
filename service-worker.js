const CACHE_NAME = 'my-site-cache-v4.30-' + new Date().getTime(); // Append timestamp
const urlsToCache = [
    '/',
    '/index.html',
    '/404.html',
];

// Install event: Cache the necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache resources during install:', error);
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
                return fetch(event.request)
                    .catch(() => {
                        // If the fetch fails (e.g., offline), check if the request is for index.html
                        if (event.request.mode === 'navigate' && event.request.destination === 'document') {
                            return caches.match('/404.html'); // Serve 404.html for navigation requests
                        }
                        // Fallback for other requests, return an offline response
                        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
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
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
