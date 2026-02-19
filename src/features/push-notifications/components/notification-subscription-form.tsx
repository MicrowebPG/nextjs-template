'use client';

import { useSession } from '@/features/auth/lib/auth-client';
import { CheckCircle, ChevronDown, Loader2, Send, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

type NotifiableUser = { id: string; name: string | null; email: string };
type SendStatus = 'idle' | 'loading' | 'success' | 'error';

export const NotificationSubscriptionForm = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [users, setUsers] = useState<NotifiableUser[]>([]);
  const [status, setStatus] = useState<SendStatus>('idle');

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    fetch('/api/notifications/users')
      .then((res) => res.json())
      .then((data: NotifiableUser[]) => {
        setUsers(data);
        setTargetUserId(userId);
      });
  }, [userId]);

  if (!userId) return null;

  const sendNotification = async () => {
    if (!title.trim() || !message.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        body: JSON.stringify({ title, message, userId: targetUserId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to send');
      setTitle('');
      setMessage('');
      setStatus('success');
      window.dispatchEvent(new Event('notificationsent'));
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Send className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Send Notification</h2>
          <p className="text-sm text-gray-500">Push a message to a subscriber</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Users className="h-3.5 w-3.5" />
            Recipient
          </label>
          <div className="relative">
            <select
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name ?? u.email}
                  {u.id === userId ? ' (me)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="e.g. New message"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
          <textarea
            placeholder="Type your message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            <CheckCircle className="h-4 w-4 shrink-0" />
            Notification sent!
          </div>
        )}
        {status === 'error' && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Failed to send. Please try again.
          </div>
        )}

        <button
          onClick={sendNotification}
          disabled={isLoading || !title.trim() || !message.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isLoading ? 'Sending…' : 'Send Notification'}
        </button>
      </div>
    </div>
  );
};
