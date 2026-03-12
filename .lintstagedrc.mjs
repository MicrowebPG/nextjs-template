const config = {
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,css,scss,prettierrc}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': ['oxlint --fix'],
};

export default config;
