const CACHE_VERSION = "v2";
const CACHE_NAME = `qr-cache-${CACHE_VERSION}`;

const URLS_TO_CACHE = [
    "/qr/",             
    "/qr/index.html",
    "/qr/style.css",
    "/qr/index.js",
    "/qr/manifest.json",
    "/qr/sw.js",
    "/qr/qr.png"
];

// Install SW – cache files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
    );
    self.skipWaiting();
});

// Activate – remove old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key.startsWith("qr-cache-") && key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch – serve cache first, then network
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response ||
            fetch(event.request).catch(() => caches.match("/qr-main/index.html"))
        )
    );
});
