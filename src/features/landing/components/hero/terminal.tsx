'use client';

import { useState } from 'react';
import { GITHUB_URL } from '../../types/constants';

const CopyIcon = ({ width = '16px', height = '16px', color = 'currentColor', ...props }) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = ({ width = '16px', height = '16px', color = 'currentColor', ...props }) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Terminal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card font-mono text-xs">
      <div className="flex h-full items-center gap-2 rounded-tl-lg rounded-tr-lg bg-foreground/10 p-3 brightness-50">
        <span className="h-3 w-3 rounded-full bg-destructive"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
        <span className="h-3 w-3 rounded-full bg-green-500"></span>

        <button
          className="ml-auto"
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          onClick={handleCopy}
        >
          {copied ? (
            <CheckIcon className="cursor-pointer text-green-500 transition-all" />
          ) : (
            <CopyIcon className="cursor-pointer transition-all hover:brightness-75" />
          )}
        </button>
      </div>
      <div className="h-full overflow-x-auto rounded-br-lg rounded-bl-lg bg-card/10 px-5 py-4">
        <p className="text-muted-foreground"># Clone the repository</p>
        <pre>
          <code>git clone {GITHUB_URL}</code>
        </pre>
      </div>
    </div>
  );
}
