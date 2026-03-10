// /BaseDatos/sw.js

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Por si en alguna versión anterior se usó cache, lo limpiamos
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));

    await self.clients.claim();
  })());
});

// requerido por Chrome para "installability"
self.addEventListener("fetch", () => {
  // passthrough
});

// ✅ recibir push y mostrar notificación
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}

  const title = data.title || "🎂 Cumpleaños";
  const body  = data.body  || "Hoy hay cumpleaños.";
  const url   = data.url   || "/BaseDatos/";

  const options = {
    body,
    // ✅ usa los iconos reales que tienes en /BaseDatos/
    icon: "/BaseDatos/icono-192.png",
    badge: "/BaseDatos/icono-192.png",
    data: { url },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ click en notificación => abrir la app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/BaseDatos/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        // si ya hay ventana abierta dentro del scope, enfocar
        if (client.url.includes("/BaseDatos/") && "focus" in client) return client.focus();
      }
      // si no, abrir
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});