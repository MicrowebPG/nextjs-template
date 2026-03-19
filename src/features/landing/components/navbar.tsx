'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GITHUB_URL, NAV_LINKS } from '../types/constants';

function GithubIcon() {
  return (
    <svg
      className="h-5 w-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

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
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
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
      className={`fixed top-5 left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-3xl transition-all duration-500 lg:w-3/4 ${!visible ? '-translate-y-[calc(100%+1.25rem)]' : ''} ${
        scrolled
          ? 'border border-primary/20 bg-background/80 shadow-lg shadow-primary/5 backdrop-blur-xl'
          : 'border border-border/40 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="animate-[fadeSlideDown_0.4s_ease_both]">
          <NavLogo />
        </div>

        {/* Desktop nav links */}
        <div className="hidden animate-[fadeSlideDown_0.4s_0.08s_ease_both] items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative rounded-xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-primary [box-shadow:0_0_6px_var(--color-primary)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden animate-[fadeSlideDown_0.4s_0.16s_ease_both] sm:flex">
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
        </div>

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
      {mobileOpen ? (
        <div className="border-t border-border/40 px-4 pb-4 sm:hidden">
          <div className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
            >
              <GithubIcon />
              Github
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
