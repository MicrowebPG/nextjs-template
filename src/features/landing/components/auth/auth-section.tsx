'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import AnimateIn from '../shared/animate-in';
import { AUTH_FEATURES } from './constants';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export default function AuthSection() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '0px 0px -60px 0px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="auth" className="relative min-h-screen overflow-hidden px-4 py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto">
        <AnimateIn className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-mono text-xs tracking-[0.3em] text-primary uppercase">
            {'// authentication'}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Auth that <span className="text-primary">just works</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Better Auth handles the complexity. Email/password, roles, sessions — configured and
            ready to go.
          </p>
        </AnimateIn>

        <motion.div
          ref={gridRef}
          className="grid gap-3 sm:grid-cols-2"
          variants={shouldReduceMotion ? undefined : gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {AUTH_FEATURES.map((feature) => (
            <motion.div
              key={feature.tag}
              variants={shouldReduceMotion ? undefined : cardVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="group relative h-full rounded-lg border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.4)]" />
                  <span className="font-mono text-[10px] tracking-wider text-primary/70">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
