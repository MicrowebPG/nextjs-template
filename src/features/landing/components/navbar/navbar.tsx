'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GITHUB_URL, NAV_LINKS } from '../../types/constants';
import { CloseIcon, GithubIcon, MenuIcon } from './icons';

function NavLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src="/mw-logo.png"
          alt="Microweb Logo"
          width={36}
          height={36}
          priority
          className="relative"
        />
      </div>
      <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase">
        Microweb
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setVisible(true);
      } else if (y > lastScrollY.current + 8) {
        setVisible(false);
        setMobileOpen(false);
      } else if (y < lastScrollY.current - 8) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith('#') ? activeHash === href : pathname === href;

  return (
    <nav
      className={`fixed top-5 left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-3xl border border-border/40 bg-background backdrop-blur-md transition-all duration-500 lg:w-3/4 ${!visible ? '-translate-y-[calc(100%+1.25rem)]' : ''} `}
    >
      <div className="flex items-center justify-between p-4">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <NavLogo />
        </motion.div>

        {/* Desktop nav links */}
        <motion.div
          className="hidden items-center gap-1 sm:flex"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative rounded-xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
              onClick={() => setActiveHash(link.href.startsWith('#') ? link.href : '')}
            >
              {link.name}
              {isActive(link.href) && (
                <motion.span
                  layoutId="navActiveIndicator"
                  className="absolute bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </motion.div>

        {/* Desktop CTA */}
        <motion.div
          className="hidden sm:flex"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
        >
          <Link
            href="https://github.com/MicrowebPG/nextjs-template"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
          >
            <GithubIcon />
            <span>Github</span>
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground sm:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="border-t border-border/40 px-4 pb-4 sm:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              className="flex flex-col gap-1 pt-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.04,
                    delayChildren: 0.05
                  }
                }
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveHash(link.href.startsWith('#') ? link.href : '');
                      setMobileOpen(false);
                    }}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  onClick={() => {
                    setActiveHash('');
                    setMobileOpen(false);
                  }}
                  className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
                >
                  <GithubIcon />
                  Github
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
