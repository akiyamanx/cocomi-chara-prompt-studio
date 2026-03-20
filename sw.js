// COCOMI CharaPrompt Studio (CPS) - Service Worker v1.0
// PWAオフライン対応・キャッシュ管理

const CACHE_NAME = 'cps-v1.1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './presets.js',
  './bg-data.js',
  './db.js',
  './manifest.json',
  './icon.svg'
];

// インストール時にアセットをキャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ時: キャッシュ優先、なければネットワーク
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
