'use client';

import { useSession } from '@/features/auth/lib/auth-client';
import { Bell, Clock, Inbox, Loader2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type NotificationRecord = {
  id: string;
  title: string;
  message: string;
  sentAt: string;
};

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (sec < 60) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hour < 24) return `${hour}h ago`;
  if (day < 7) return `${day}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export const NotificationHistory = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data: NotificationRecord[] = await res.json();
        setNotifications(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    fetchNotifications();
  }, [session?.user, fetchNotifications]);

  useEffect(() => {
    const handler = () => fetchNotifications();
    window.addEventListener('notificationsent', handler);
    return () => window.removeEventListener('notificationsent', handler);
  }, [fetchNotifications]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  if (!session?.user) return null;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
          <Bell className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">Notification History</h2>
          <p className="text-sm text-gray-500">
            {loading
              ? 'Loading…'
              : `${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
          <Inbox className="h-10 w-10" />
          <p className="text-sm">No notifications yet</p>
        </div>
      ) : (
        <ul className="max-h-96 divide-y divide-gray-100 overflow-y-auto">
          {notifications.map((n) => (
            <li key={n.id} className="flex items-start gap-3 px-6 py-4 transition hover:bg-gray-50">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{n.title}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-gray-500">{n.message}</p>
                <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(n.sentAt)}
                </div>
              </div>
              <button
                onClick={() => handleDelete(n.id)}
                disabled={deletingId === n.id}
                title="Delete notification"
                className="mt-0.5 shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
              >
                {deletingId === n.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
