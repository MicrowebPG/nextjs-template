'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimateIn from '../shared/animate-in';
import { DB_FEATURES, SCHEMA_LINES } from './constants';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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

export default function DatabaseSection() {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: '0px 0px -60px 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="database" className="relative min-h-screen overflow-hidden px-4 py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0, 255, 204, 0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <AnimateIn className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {'// database'}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Schema to <span className="text-accent">query</span>, type-safe
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Drizzle ORM with PostgreSQL. Define schemas in TypeScript, get full type inference
            everywhere.
          </p>
        </AnimateIn>

        <div ref={contentRef} className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceMotion ? 0 : -30 }
            }
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-lg border border-border bg-card/50 font-mono text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] text-muted-foreground">schema/auth.ts</span>
              </div>
              <div className="p-4 leading-6">
                {SCHEMA_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.accent
                        ? 'text-accent'
                        : line.dim
                          ? 'text-muted-foreground/50'
                          : 'text-muted-foreground'
                    }
                  >
                    <span className="mr-3 inline-block w-5 text-right text-[10px] opacity-30 select-none">
                      {i + 1}
                    </span>
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={shouldReduceMotion ? undefined : listVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {DB_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={shouldReduceMotion ? undefined : itemVariants}
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <div className="group flex gap-4 rounded-lg border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card/80">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_6px_1px_rgba(0,255,204,0.3)]" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
