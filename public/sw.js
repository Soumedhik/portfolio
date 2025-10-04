// Simple Service Worker for PWA capabilities and caching
const CACHE_NAME = 'soumedhiks-portfolio-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/profile.jpg',
  '/lockscreen.jpg',
  '/images/apps/chrome.png',
  '/images/apps/explorer.png',
  '/images/apps/folder.png',
  '/images/folders/resume.png',
  '/images/folders/skills.png',
  '/images/folders/projects.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(() => {
        // Silently fail if caching fails
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle same-origin GET requests and allow large media (video) to bypass caching
  if (request.method !== 'GET') {
    return;
  }

  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  if (request.destination === 'video' || request.url.endsWith('.mp4')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(request);
      })
      .catch(() => {
        // Return a fallback page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});