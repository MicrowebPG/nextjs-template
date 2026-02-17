'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/features/auth/lib/auth-client';
import { useNotification } from '../hook/use-notification';

type NotifiableUser = {
  id: string;
  name: string;
  email: string;
};

export const NotificationSubscriptionForm = () => {
  const { subscription } = useNotification();
  const { data: session } = useSession();

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [users, setUsers] = useState<NotifiableUser[]>([]);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch('/api/notifications/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (session?.user) {
          setTargetUserId(session.user.id);
        }
      });
  }, [isAuthenticated, session?.user]);

  const sendNotification = async () => {
    const payload: Record<string, unknown> = { title, message };

    if (isAuthenticated && targetUserId) {
      payload.userId = targetUserId;
    } else {
      payload.subscription = subscription;
    }

    await fetch('/api/notifications', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
    setTitle('');
  };

  return (
    <div className="mt-6 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Send a Notification</h2>

      {isAuthenticated ? (
        <>
          <label className="mb-1 block text-sm font-medium text-gray-700">Destinatario</label>
          <select
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 p-2"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email}){u.id === session?.user?.id ? ' — me' : ''}
              </option>
            ))}
          </select>
        </>
      ) : (
        <p className="mb-4 text-sm text-gray-500">
          Invio tramite <strong>subscription</strong> del browser
        </p>
      )}

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
        onClick={() => sendNotification()}
        className="w-full rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
      >
        Send Notification
      </button>
    </div>
  );
};
