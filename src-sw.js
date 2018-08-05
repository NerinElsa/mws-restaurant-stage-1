importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');



  workbox.routing.registerRoute(
    new RegExp('restaurant.html(.*)'),
    workbox.strategies.networkFirst({
      cacheName: 'cache-restaurant-details',
      cacheableResponse: {statuses: [0, 200]}
    })
  );

workbox.routing.registerRoute(
  new RegExp('index.html(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'cache-index.html',
    cacheableResponse: {statuses: [0, 200]}
  })
);
workbox.precaching.precacheAndRoute([]);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue');

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
  'http://localhost:1337/reviews/',
  networkWithBackgroundSync,
  'POST'
);