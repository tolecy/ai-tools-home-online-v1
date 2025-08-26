// 本地开发环境的Service Worker
// 用于覆盖生产环境缓存的Service Worker

self.addEventListener('install', function(event) {
  console.log('本地开发Service Worker已安装');
  // 强制激活新的Service Worker
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('本地开发Service Worker已激活');
  // 清除所有缓存
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('删除缓存:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      // 控制所有打开的标签页
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  // 对于本地开发，不拦截任何请求，让所有请求正常通过
  return;
});