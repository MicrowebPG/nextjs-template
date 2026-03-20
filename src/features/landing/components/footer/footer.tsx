import Image from 'next/image';
import Link from 'next/link';
import { GITHUB_URL, NAV_LINKS } from '../../types/constants';

export default function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-4 py-12">
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
    </footer>
  );
}
