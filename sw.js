
const CACHE_NAME = 'ashyus-books-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx',
  'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Não cacheia API de dados em tempo real ou requisições de Admin
  if (url.origin.includes('supabase') || url.origin.includes('google')) return;

  // Estratégia Stale-While-Revalidate para ativos e navegação
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request).then((res) => {
        // Cacheia novas requisições GET bem-sucedidas (como imagens de capas externas)
        if (event.request.method === 'GET' && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => {
          // Se falhar a rede e for uma navegação, retorna o index.html (SPA fallback)
          if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
          }
          return cached;
      });
      return cached || networked;
    })
  );
});
