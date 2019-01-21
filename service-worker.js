importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

let urlsToCache = [
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/css/materialize.min.css"', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/images/logo.png', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '2' },
    { url: '/js/index.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/layout.js', revision: '1' },
    { url: '/js/detail.js', revision: '1' },
    { url: '/js/moment.min.js', revision: '1' }
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