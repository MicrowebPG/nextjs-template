'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { GITHUB_URL, NAV_LINKS } from '../../types/constants';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      ref={ref}
      className="relative border-t border-border/40 px-4 py-12"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/mw-logo.png" alt="Microweb Logo" width={28} height={28} />
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-xs font-bold tracking-widest text-transparent uppercase">
              Microweb
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </nav>
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Microweb. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
