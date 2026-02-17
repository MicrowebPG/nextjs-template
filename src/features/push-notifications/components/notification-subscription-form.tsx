'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/features/auth/lib/auth-client';

type NotifiableUser = { id: string; name: string; email: string };

export const NotificationSubscriptionForm = () => {
  const { data: session } = useSession();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [users, setUsers] = useState<NotifiableUser[]>([]);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    fetch('/api/notifications/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setTargetUserId(userId);
      });
  }, [userId]);

  if (!userId) return null;

  const sendNotification = async () => {
    await fetch('/api/notifications', {
      method: 'POST',
      body: JSON.stringify({ title, message, userId: targetUserId }),
      headers: { 'Content-Type': 'application/json' },
    });
    setTitle('');
    setMessage('');
  };

  return (
    <div className="mt-6 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Send a Notification</h2>

      <label className="mb-1 block text-sm font-medium text-gray-700">Destinatario</label>
      <select
        value={targetUserId}
        onChange={(e) => setTargetUserId(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 p-2"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email}){u.id === userId ? ' — me' : ''}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 p-2"
      />
      <textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 p-2"
      />
      <button
        onClick={sendNotification}
        className="w-full rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
      >
        Send Notification
      </button>
    </div>
  );
};
