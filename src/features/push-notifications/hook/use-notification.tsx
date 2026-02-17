'use client';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  isNotificationSupported,
  getNotificationPermission,
  subscribeToPush,
  saveSubscription,
  removeSubscription,
} from '../service/notification.client.service';

interface NotificationContextType {
  isSupported: boolean;
  isSubscribed: boolean;
  isGranted: boolean;
  isDenied: boolean;
  subscription: PushSubscription | null;
  errorMessage: string | null;
  handleSubscribe: () => void;
  handleUnsubscribe: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * Provides push notification state and subscription logic to the component tree.
 * Checks browser support on mount and auto-subscribes if permission was already granted.
 */
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isGranted = permission === 'granted';
  const isDenied = permission === 'denied';
  const isSubscribed = subscription !== null;

  /**
   * Subscribes to push notifications via the service worker
   * and syncs the permission state regardless of success or failure.
   */
  const handleSubscribe = useCallback(async () => {
    try {
      const sub = await subscribeToPush();
      setSubscription(sub);
      await saveSubscription(sub);
    } catch (e) {
      console.error('Failed to subscribe:', e);
      setErrorMessage(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setPermission(getNotificationPermission());
    }
  }, []);

  const handleUnsubscribe = useCallback(async () => {
    try {
      if (subscription) {
        await removeSubscription(subscription.endpoint);
        await subscription.unsubscribe();
        setSubscription(null);
      }
    } catch (e) {
      console.error('Failed to unsubscribe:', e);
      setErrorMessage(e instanceof Error ? e.message : 'Unknown error');
    }
  }, [subscription]);

  useEffect(() => {
    if (!isNotificationSupported()) return;

    setIsSupported(true);
    setPermission(getNotificationPermission());

    if (getNotificationPermission() === 'granted') {
      handleSubscribe();
    }
  }, [handleSubscribe]);

  const contextValue = useMemo<NotificationContextType>(
    () => ({
      isSupported,
      isSubscribed,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      handleSubscribe,
      handleUnsubscribe,
    }),
    [
      isSupported,
      isSubscribed,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      handleSubscribe,
      handleUnsubscribe,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

/**
 * Consumes the {@link NotificationProvider} context.
 * Must be called within a `NotificationProvider`, otherwise it throws.
 */
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
