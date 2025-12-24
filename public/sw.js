// Service Worker cho PWA
// Cache static assets và cung cấp offline support

const CACHE_NAME = 'phamthehien-portfolio-v1'
const RUNTIME_CACHE = 'runtime-cache-v1'

// Assets cần cache ngay khi install
const PRECACHE_ASSETS = [
  '/',
  '/favicon.svg',
  '/manifest.json',
]

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        return self.skipWaiting() // Activate ngay lập tức
      })
      .catch((error) => {
        // Service worker là optional, không cần throw error
        console.error('Service Worker install failed:', error)
      })
  )
})

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Xóa các cache cũ không còn dùng
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        return self.clients.claim() // Take control ngay lập tức
      })
      .catch((error) => {
        console.error('Service Worker activate failed:', error)
      })
  )
})

// Fetch event - Serve từ cache hoặc network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Chỉ cache GET requests
  if (request.method !== 'GET') {
    return
  }

  // Bỏ qua các requests không phải từ cùng origin
  if (url.origin !== self.location.origin) {
    return
  }

  // Bỏ qua các API calls và analytics
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('google-analytics') ||
    url.pathname.includes('plausible') ||
    url.pathname.includes('emailjs') ||
    url.pathname.includes('_next')
  ) {
    return
  }

  // Strategy: Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone response để cache
        const responseToCache = response.clone()

        // Cache successful responses
        if (response.status === 200) {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache)
          })
        }

        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Nếu không có trong cache và là navigation request, trả về index
          if (request.mode === 'navigate') {
            return caches.match('/')
          }

          // Trả về empty response
          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
          })
        })
      })
  )
})

// Message event - Handle messages từ main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

