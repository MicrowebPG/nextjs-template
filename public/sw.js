self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function (event) {
  let title = 'New Notification';
  let options = {
    body: '',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: { url: '/' },
  };

  try {
    if (event.data) {
      const data = event.data.json();
      title = data.title || title;
      options.body = data.body || '';
      options.icon = data.icon || options.icon;
      options.data.url = data.url || '/';
    }
  } catch (e) {
    // fallback to defaults above
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(title, options),
      self.registration.getNotifications().then((notifications) => {
        if (navigator.setAppBadge) {
          // +1 for the notification we just showed
          navigator.setAppBadge(notifications.length + 1);
        }
      }),
    ]),
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.registration.getNotifications().then(function (notifications) {
      if (navigator.setAppBadge) {
        if (notifications.length === 0) {
          navigator.setAppBadge(0);
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
