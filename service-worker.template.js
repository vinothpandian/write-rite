const prefix = "write-rite-";
const cacheName = `${prefix}__CACHE_VERSION__`;
const urls = __PRECACHE_FILES__.map((path) => new URL(path, self.registration.scope).href);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(
    names.filter((name) => name.startsWith(prefix) && name !== cacheName).map((name) => caches.delete(name))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match(new URL("index.html", self.registration.scope).href)));
  } else if (urls.includes(event.request.url)) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
  }
});
