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
workbox.precaching.precacheAndRoute([
  {
    "url": "css/progressive-image.min.css",
    "revision": "d24a4c4e0e21ee9a37683a66ce58e10b"
  },
  {
    "url": "css/responsive.css",
    "revision": "7a153e4f20986554529c4911bd8d1eb4"
  },
  {
    "url": "css/styles.css",
    "revision": "d71c195531ae66882b0222731a3a94b6"
  },
  {
    "url": "img/1.jpg",
    "revision": "cc074688becddd2725114187fba9471c"
  },
  {
    "url": "img/10.jpg",
    "revision": "2bd68efbe70c926de6609946e359faa2"
  },
  {
    "url": "img/2.jpg",
    "revision": "759b34e9a95647fbea0933207f8fc401"
  },
  {
    "url": "img/3.jpg",
    "revision": "81ee36a32bcfeea00db09f9e08d56cd8"
  },
  {
    "url": "img/4.jpg",
    "revision": "23f21d5c53cbd8b0fb2a37af79d0d37f"
  },
  {
    "url": "img/5.jpg",
    "revision": "0a166f0f4e10c36882f97327b3835aec"
  },
  {
    "url": "img/6.jpg",
    "revision": "eaf1fec4ee66e121cadc608435fec72f"
  },
  {
    "url": "img/7.jpg",
    "revision": "bd0ac197c58cf9853dc49b6d1d7581cd"
  },
  {
    "url": "img/8.jpg",
    "revision": "6e0e6fb335ba49a4a732591f79000bb4"
  },
  {
    "url": "img/9.jpg",
    "revision": "ba4260dee2806745957f4ac41a20fa72"
  },
  {
    "url": "img/default.jpg",
    "revision": "7677b752c42fef5dd6ef7439ee4961d6"
  },
  {
    "url": "index.html",
    "revision": "65a24e62f10d17211506f36f7ba31345"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "81d7430d8047faf38df420c3378be06a"
  },
  {
    "url": "js/idb.js",
    "revision": "4251b7b82afb6f0a789c35486485e041"
  },
  {
    "url": "js/main.js",
    "revision": "b75e31e63677cda80c37e610356dcfef"
  },
  {
    "url": "js/post-new-review.js",
    "revision": "8b04f8f79d1c62d47883bc715ef9aa8c"
  },
  {
    "url": "js/progressive-image.min.js",
    "revision": "3cad37bfa1a7158902e7a438c29d1b76"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "b4ad6e56bcf114be7eba9a7db577153c"
  },
  {
    "url": "responsiveimages/1-large_2x.jpg",
    "revision": "00bdf568d665ffa5c5e44f4a5170bf84"
  },
  {
    "url": "responsiveimages/1-medium_0.80x.jpg",
    "revision": "57f95030f08e6d04fe15c1bae894efbe"
  },
  {
    "url": "responsiveimages/1-small_0.50x.jpg",
    "revision": "68d5ae60755b4d8474a6f9ae7986b56e"
  },
  {
    "url": "responsiveimages/1.jpg",
    "revision": "cc074688becddd2725114187fba9471c"
  },
  {
    "url": "responsiveimages/10-large_2x.jpg",
    "revision": "f7ce9c0a648940f7f34c63cf6a5a54ea"
  },
  {
    "url": "responsiveimages/10-medium_0.80x.jpg",
    "revision": "a17e747ebd9a7403a47bbb566b539eb7"
  },
  {
    "url": "responsiveimages/10-small_0.50x.jpg",
    "revision": "5382a51ff13962e6d6c84784a35ab780"
  },
  {
    "url": "responsiveimages/10.jpg",
    "revision": "2bd68efbe70c926de6609946e359faa2"
  },
  {
    "url": "responsiveimages/2-large_2x.jpg",
    "revision": "cfcafcf292459098877c817f127e28f3"
  },
  {
    "url": "responsiveimages/2-medium_0.80x.jpg",
    "revision": "1420b75fe3c95848171d1178debfaa00"
  },
  {
    "url": "responsiveimages/2-small_0.50x.jpg",
    "revision": "8984f12e2a0912a4fe8ab55ae8c9d52e"
  },
  {
    "url": "responsiveimages/2.jpg",
    "revision": "759b34e9a95647fbea0933207f8fc401"
  },
  {
    "url": "responsiveimages/3-large_2x.jpg",
    "revision": "49cd874517a2402fb5e04f2b193b307a"
  },
  {
    "url": "responsiveimages/3-medium_0.80x.jpg",
    "revision": "23092ee5c01198b4fe3d2ce351bf4e1c"
  },
  {
    "url": "responsiveimages/3-small_0.50x.jpg",
    "revision": "0b97f88536b32d3de1cd73364d456c79"
  },
  {
    "url": "responsiveimages/3.jpg",
    "revision": "81ee36a32bcfeea00db09f9e08d56cd8"
  },
  {
    "url": "responsiveimages/4-large_2x.jpg",
    "revision": "ff18324c663197c78c71b145b45d8a6c"
  },
  {
    "url": "responsiveimages/4-medium_0.80x.jpg",
    "revision": "953353febc2c189d13f1227e73eca5f4"
  },
  {
    "url": "responsiveimages/4-small_0.50x.jpg",
    "revision": "cc7c54c597bc8f043ae986a2ea623d37"
  },
  {
    "url": "responsiveimages/4.jpg",
    "revision": "23f21d5c53cbd8b0fb2a37af79d0d37f"
  },
  {
    "url": "responsiveimages/5-large_2x.jpg",
    "revision": "1ba2c0bbf9f7d0b5973e9ded3c4ae505"
  },
  {
    "url": "responsiveimages/5-medium_0.80x.jpg",
    "revision": "9dd52bea2e9108324457a606f30b5e53"
  },
  {
    "url": "responsiveimages/5-small_0.50x.jpg",
    "revision": "b655c695354384b1e356a9962a9bdc2c"
  },
  {
    "url": "responsiveimages/5.jpg",
    "revision": "0a166f0f4e10c36882f97327b3835aec"
  },
  {
    "url": "responsiveimages/6-large_2x.jpg",
    "revision": "91879ab2b21a715c3cadfc4ded86cf26"
  },
  {
    "url": "responsiveimages/6-medium_0.80x.jpg",
    "revision": "e46e420ddc43ac119ccb480c157cf124"
  },
  {
    "url": "responsiveimages/6-small_0.50x.jpg",
    "revision": "a26630db0ecba8fced0b8d7b11893bb0"
  },
  {
    "url": "responsiveimages/6.jpg",
    "revision": "eaf1fec4ee66e121cadc608435fec72f"
  },
  {
    "url": "responsiveimages/7-large_2x.jpg",
    "revision": "7de12c0ec0f318731c649d12f8af782f"
  },
  {
    "url": "responsiveimages/7-medium_0.80x.jpg",
    "revision": "2cc848693dc858ad7d6dd612f65889c3"
  },
  {
    "url": "responsiveimages/7-small_0.50x.jpg",
    "revision": "44465011c90142bb3b03b006e6a62143"
  },
  {
    "url": "responsiveimages/7.jpg",
    "revision": "bd0ac197c58cf9853dc49b6d1d7581cd"
  },
  {
    "url": "responsiveimages/8-large_2x.jpg",
    "revision": "329105d685de9dd46c967610d965dc2a"
  },
  {
    "url": "responsiveimages/8-medium_0.80x.jpg",
    "revision": "3c129569db77f444f7ff49fcc11070db"
  },
  {
    "url": "responsiveimages/8-small_0.50x.jpg",
    "revision": "c673d87c30d338c24d6826e380e7c512"
  },
  {
    "url": "responsiveimages/8.jpg",
    "revision": "6e0e6fb335ba49a4a732591f79000bb4"
  },
  {
    "url": "responsiveimages/9-large_2x.jpg",
    "revision": "54cbeb325da64bbac4a23a192c950012"
  },
  {
    "url": "responsiveimages/9-medium_0.80x.jpg",
    "revision": "73bca0c9e1c29a2efeeda45f2d5976ab"
  },
  {
    "url": "responsiveimages/9-small_0.50x.jpg",
    "revision": "21c3fc7ba6369f290fae020b2bbf0aa6"
  },
  {
    "url": "responsiveimages/9.jpg",
    "revision": "ba4260dee2806745957f4ac41a20fa72"
  },
  {
    "url": "responsiveimages/default-large_2x.jpg",
    "revision": "7677b752c42fef5dd6ef7439ee4961d6"
  },
  {
    "url": "responsiveimages/default-medium_0.80x.jpg",
    "revision": "7677b752c42fef5dd6ef7439ee4961d6"
  },
  {
    "url": "responsiveimages/default-small_0.50x.jpg",
    "revision": "7677b752c42fef5dd6ef7439ee4961d6"
  },
  {
    "url": "responsiveimages/default.jpg",
    "revision": "7677b752c42fef5dd6ef7439ee4961d6"
  },
  {
    "url": "restaurant.html",
    "revision": "f3b40c4441521afc02087a03a242c1d2"
  }
]);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue');

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
  'http://localhost:1337/reviews/',
  networkWithBackgroundSync,
  'POST'
);