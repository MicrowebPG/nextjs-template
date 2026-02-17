import { NotificationProvider } from '@/features/push-notifications/hook/use-notification';
import { PwaInstallPrompt, RegisterServiceWorker } from '@/features/pwa-install';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Microweb NextJS Template',
  description:
    'A starter Next.js template for building Scalable Applications with Feature-Based Architecture.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Microweb PWA',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RegisterServiceWorker />
        <PwaInstallPrompt />
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
