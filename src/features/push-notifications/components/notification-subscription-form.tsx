'use client';

import { useState } from 'react';
import { useNotification } from '../hook/use-notification';

export const NotificationSubscriptionForm = () => {
  const { subscription } = useNotification();

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const sendNotification = async () => {
    await fetch('/api/notifications', {
      method: 'POST',
      body: JSON.stringify({ title, message, subscription }),
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

      {/* Title Input */}
      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 p-2"
      />

      {/* Message Input */}
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
