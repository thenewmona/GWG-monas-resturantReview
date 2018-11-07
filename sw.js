const appName ="restaurant-reviews";
const staticCacheName = appName + "-v1.0";// what does the -v1.0 mean
const contentImgsCache = appName + "-images";


//caching SW 


let allCaches =[
    staticCacheName,contentImgsCache
];

self.addEventListener('install',function(cache){
    return cache.addAll([
        '/',
        '/restaurant.html',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/register-sw.js',
        '/data/restaurants.json',      

    ])
})

//activating SW

self.addEventListener('activate', function(event){
event.waitUntil(
    caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName){
               return cacheName.startsWith(appName) &&
               !allCaches.includes(cacheName); 
            }),map(function(cacheName){
                return caches.delete(cacheName);
            })
        );
    })
);
});

//fetch listener 

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    )
})