self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon,
      badge: '/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url,
      },
    };

    event.waitUntil(
      self.registration.getNotifications().then(function (notifications) {
        const count = notifications.length + 1;
        if (navigator.setAppBadge) {
          navigator.setAppBadge(count);
        }
        return self.registration.showNotification(data.title, options);
      }),
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.registration.getNotifications().then(function (notifications) {
      if (navigator.setAppBadge) {
        if (notifications.length === 0) {
          navigator.clearAppBadge();
        } else {
          navigator.setAppBadge(notifications.length);
        }
      }

      return clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then(function (windowClients) {
          if (windowClients.length > 0) {
            return windowClients[0].focus().then(function (client) {
              return client.navigate(targetUrl);
            });
          }
          return clients.openWindow(targetUrl);
        });
    }),
  );
});
