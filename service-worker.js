// Service Worker for Hack Beyond Limits: Online Odyssey

const CACHE_NAME = 'hackbeyondlimits-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/reset.css',
  '/css/styles.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/animations.js',
  '/js/three-scene.js',
  '/js/particles.js',
  '/js/ai-assistant.js',
  '/js/easter-eggs.js',
  '/js/world-map.js',
  '/js/audio-controller.js',
  '/assets/images/favicon.png',
  '/assets/images/favicon-512.png',
  '/assets/images/logo.png',
  '/assets/images/ai-icon.svg',
  '/assets/images/web3-icon.svg',
  '/assets/images/calendar-icon.svg',
  '/assets/images/location-icon.svg',
  '/assets/images/first-prize.svg',
  '/assets/images/second-prize.svg',
  '/assets/images/third-prize.svg',
  '/assets/images/innovation-icon.svg',
  '/assets/images/impact-icon.svg',
  '/assets/images/design-icon.svg',
  '/assets/images/fusion-icon.svg',
  '/assets/images/ai-avatar.svg',
  '/assets/images/send-icon.svg',
  '/assets/images/discord-icon.svg',
  '/assets/images/twitter-icon.svg',
  '/assets/images/linkedin-icon.svg',
  '/assets/images/github-icon.svg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Network first, then cache strategy for API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache first, then network strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            
            // For HTML requests, return the offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Push notification event
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body || 'New update from Hack Beyond Limits',
    icon: '/assets/images/favicon-512.png',
    badge: '/assets/images/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Hack Beyond Limits',
      options
    )
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});