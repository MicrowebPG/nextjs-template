'use client';

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
                <span className="absolute bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-primary" />
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
