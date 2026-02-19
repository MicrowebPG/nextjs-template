import { RegisterServiceWorker } from '@/components/register-service-worker';
import { NotificationProvider } from '@/features/push-notifications/hook/use-notification';
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RegisterServiceWorker />
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
