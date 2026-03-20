import Link from 'next/link';
import { GITHUB_URL } from '../../types/constants';
import Terminal from './terminal';

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`ml-2 h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="flex min-h-screen animate-[fadeSlideDown_1s_ease] flex-col items-center justify-center gap-20 p-4 pt-32 pb-20 md:pt-40 md:pb-20">
      <div className="container flex w-full flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
          <span className="size-3 animate-pulse rounded-full bg-green-500"></span>
          <span>Production ready template</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-pretty sm:text-5xl">
          Build Scalable Apps <span className="text-primary">with Feature-Based Architecture</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          A starter template for building scalable applications with Next.js and a feature-based
          architecture. All-in one tools, from scratch to production with Next.js, Better Auth and
          Drizzle.
        </p>
        <div className="flex gap-4">
          <Link
            href="#features"
            className="group inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-nowrap text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          >
            <p>Get Started</p>
            <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-foreground/5 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          >
            View on GitHub
          </Link>
        </div>
      </div>

      <Terminal />
    </section>
  );
}
