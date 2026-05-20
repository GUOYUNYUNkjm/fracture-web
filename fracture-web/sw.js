// =============================================
// AI骨折监测系统 — Service Worker
// 版本: 1.0.0  |  全球访问 + 离线缓存
// =============================================

const CACHE_NAME = 'fracture-ai-v1';
const OFFLINE_URL = '/fracture-web/offline.html';

// 需要预缓存的核心资源
const PRECACHE_ASSETS = [
  '/fracture-web/',
  '/fracture-web/index.html',
  '/fracture-web/style.css',
  '/fracture-web/script.js',
  '/fracture-web/manifest.json',
  '/fracture-web/offline.html',
  '/fracture-web/icons/icon-192.png',
  '/fracture-web/icons/icon-512.png'
];

// ── 安装阶段：预缓存核心资源 ──────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] 预缓存核心资源...');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── 激活阶段：清理旧版本缓存 ──────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] 删除旧缓存:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── 请求拦截：网络优先，缓存备用 ──────────────
self.addEventListener('fetch', event => {
  const { request } = event;

  // 只处理 GET 请求
  if (request.method !== 'GET') return;

  // API 请求：网络优先，失败则返回离线提示
  if (request.url.includes('/api/') || request.url.includes('predict')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(
          JSON.stringify({
            error: '网络不可用，请检查网络连接后重试',
            offline: true
          }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      )
    );
    return;
  }

  // 静态资源：缓存优先，网络备用
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        return response;
      }).catch(() => {
        // 导航请求失败 → 显示离线页面
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// ── 后台同步（可选） ──────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-results') {
    console.log('[SW] 后台同步中...');
  }
});

// ── 推送通知（可选） ─────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() ?? { title: 'AI骨折监测', body: '诊断结果已就绪' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/fracture-web/icons/icon-192.png',
      badge: '/fracture-web/icons/icon-96.png'
    })
  );
});
