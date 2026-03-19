import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin']
});

const instrumentMono = Instrument_Sans({
  variable: '--font-instrument-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Microweb Next.js Template',
  description:
    'A starter Next.js template for building Scalable Applications with Feature-Based Architecture.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} ${instrumentMono.className} dark antialiased`}>
        {children}
      </body>
    </html>
  );
}
