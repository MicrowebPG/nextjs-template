'use client';

import { AuthForm } from '@/features/auth/components/auth-form';
import { UserStatus } from '@/features/auth/components/user-status';
import { useSession } from '@/features/auth/lib/auth-client';
import { NotificationSubscriptionForm } from '@/features/push-notifications/components/notification-subscription-form';
import NotificationSubscriptionStatus from '@/features/push-notifications/components/notification-subscription-status';
import { UnsupportedNotificationMessage } from '@/features/push-notifications/components/unsupported-notification-message';
import { useNotification } from '@/features/push-notifications/hook/use-notification';

export default function Home() {
  const { isSupported, isSubscribed } = useNotification();
  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Feature-Based Design
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          MicrowebPG Next.js Template with Feature-Based Architecture
        </p>
      </div>

      {/* User Status */}
      <UserStatus />

      {/* Auth Form (shown when not authenticated) */}
      {!isAuthenticated && <AuthForm />}

      {/* Notification Status */}
      {!isSupported ? <UnsupportedNotificationMessage /> : <NotificationSubscriptionStatus />}

      {isSubscribed && <NotificationSubscriptionForm />}
    </main>
  );
}
