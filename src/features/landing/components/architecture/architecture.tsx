'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimateIn from '../shared/animate-in';
import { PRINCIPLES, TREE_LINES } from './constants';

const principlesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const principleItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export default function Architecture() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '0px 0px -60px 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="architecture" className="relative min-h-screen overflow-hidden px-4 py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <AnimateIn className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {'// architecture'}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Feature-based <span className="text-primary">structure</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Organize by feature, not file type. Each domain owns its components, logic, types, and
            tests.
          </p>
        </AnimateIn>

        <div ref={gridRef} className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-5"
            variants={shouldReduceMotion ? undefined : principlesVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {PRINCIPLES.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                variants={shouldReduceMotion ? undefined : principleItem}
              >
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: shouldReduceMotion ? 0 : 30 }
            }
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-lg border border-border bg-card/50 font-mono text-xs backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px]">project structure</span>
              </div>
              {/* Tree */}
              <div className="p-4 leading-6">
                {TREE_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.highlight
                        ? 'rounded-sm bg-accent/5 text-accent'
                        : 'text-muted-foreground'
                    }
                  >
                    <span className="mr-3 inline-block w-5 text-right text-[10px] opacity-30 select-none">
                      {i + 1}
                    </span>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
