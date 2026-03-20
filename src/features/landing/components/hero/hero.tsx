'use client';

import { motion, useReducedMotion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const safeContainerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : containerVariants;

  const safeItemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : itemVariants;

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-20 p-4 pt-32 pb-20 md:pt-40 md:pb-20">
      <motion.div
        className="container flex w-full flex-col items-center gap-6 text-center"
        variants={safeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={safeItemVariants}
          className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500"
        >
          <span className="size-3 animate-pulse rounded-full bg-green-500"></span>
          <span>Production ready template</span>
        </motion.div>

        <motion.h1
          variants={safeItemVariants}
          className="text-4xl font-bold tracking-tight text-pretty sm:text-5xl"
        >
          Build Scalable Apps <span className="text-primary">with Feature-Based Architecture</span>
        </motion.h1>

        <motion.p variants={safeItemVariants} className="max-w-xl text-lg text-muted-foreground">
          A starter template for building scalable applications with Next.js and a feature-based
          architecture. All-in one tools, from scratch to production with Next.js, Better Auth and
          Drizzle.
        </motion.p>

        <motion.div variants={safeItemVariants} className="flex gap-4">
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
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full max-w-2xl min-w-0"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Terminal />
      </motion.div>
    </section>
  );
}
