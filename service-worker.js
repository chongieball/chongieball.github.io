importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

const CACHE_NAME = "foo-match-v3";
let urlsToCache = [
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/css/materialize.min.css"', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/images/logo.png', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/index.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/layout.js', revision: '1' },
    { url: '/js/detail.js', revision: '1' },
    { url: '/js/moment.min.js', revision: '1' }
    // { url: '/index.html', revision: '1' },
    // { url: '/index.html', revision: '1' },
    // { url: '/index.html', revision: '1' },
    // "/pages/next.html",
    // "/pages/past.html",
    // "/pages/favorite.html",
    // "/css/materialize.min.css",
    // "/css/main.css",
    // "/images/logo.png",
    // "/js/materialize.min.js",
    // "/js/nav.js",
    // "/js/api.js",
    // "/js/index.js",
    // "/js/idb.js",
    // "/js/db.js",
    // "/js/layout.js",
    // "/js/detail.js",
    // "/js/moment.min.js"
];

workbox.precaching.precacheAndRoute(urlsToCache)

workbox.routing.registerRoute(
    new RegExp('.(?:js|css|png)'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

self.addEventListener("fetch", function (event) {
    let base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('push', function(event) {
    let body;

    if (event.data) {
        body = event.data.text()
    } else {
        body = 'Push message no payload';
    }

    let options = {
        body: body,
        icon: 'images/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
})