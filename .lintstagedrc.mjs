const config = {
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,css,scss,prettierrc}': 'oxfmt --no-error-on-unmatched-pattern',
  '*.{js,jsx,ts,tsx}': ['oxlint --fix']
};

export default config;
