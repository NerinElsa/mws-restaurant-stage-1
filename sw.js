var staticCacheName = 'restaurant-static-v1';
var contentImgsCache = 'restaurant-content-imgs';
var allCaches = [staticCacheName, contentImgsCache];

/*========== install event and wait unil =====================*/
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/restaurant.html?id=1',
        '/restaurant.html?id=2',
        '/restaurant.html?id=3',
        '/restaurant.html?id=4',
        '/restaurant.html?id=5',
        '/restaurant.html?id=6',
        '/restaurant.html?id=7',
        '/restaurant.html?id=8',
        '/restaurant.html?id=9',
        '/restaurant.html?id=10',
        //'data/restaurants.json',
        '/responsiveimages',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'css/responsive.css', 
        'css/styles.css',
        'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
        'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2'
      ]);
    }));
  });

  /*========== deleting old caches and activating new cache =========
self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
      console.log(cacheNames);
      return Promise.all(cacheNames.filter(function (cacheName) {
        return cacheName.startsWith('restaurant-') && !allCaches.includes(cacheName);
        console.log('cache deleted'+cacheName);
      }).map(function (cacheName) {
        return caches.delete(cacheName);
      }));
    }));
  });
*/

  /*========== fetch all request urls ===============================*/
/*
  self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
    console.log(requestUrl);
/*========== equates root cache to skeleton =======================*/
/*    
if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/skeleton'));
        return;
        }
        /*responding to image requests
        if (requestUrl.endsWith('.jpg)){
          event.respondWith(fetch('/img/1.jpg')
          );
        }
        /*
        if (requestUrl.pathname.startsWith('/img/')) {
            event.respondWith(servePhoto(event.request));
            console.log(requestUrl);
        return;
        }  
    }    
    event.respondWith(
        caches.match(event.request).then(function(response) {
          console.log(response);
            return response || fetch(event.request);
            })
        );
    });
     */ 
/*============== New Fetch and Caching Event ===========================*/

self.addEventListener('fetch', event => {
  var eventrequesturl = new URL(event.request.url); //comparing condition variable
  var eventrequest = event.request;
  //console.log(eventrequesturl); //INCOMING REQUEST URLS
/*
if (eventrequesturl.origin != location.origin) {
    return;
  }
  if (eventrequesturl.origin === location.origin && eventrequesturl.pathname === "/") {
    eventrequest = new Request("/index.html");
  }
  */

  event.respondWith(
    caches.open(staticCacheName).then(cache => {
      return cache.match(eventrequest).then(response => {
        //console.log(response);
        return response || fetch(eventrequest).then(response => {
          console.log('New network request:'+ eventrequest);
          cache.put(eventrequest,response.clone());
          return response;
        });
      });
    })
  );
});

/*=============== Serving Image urls =========================================
function servePhoto(request) {
    var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
    console.log(storageUrl);
    return caches.open(contentImgsCache).then(function (cache) {
      return cache.match(storageUrl).then(function (response) {
        if (response) return response;
        console.log(response); 
  
        return fetch(request).then(function (networkResponse) {
          cache.put(storageUrl, networkResponse.clone());
          return networkResponse;
        });
      });
    });
  }
  */

  self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });
  