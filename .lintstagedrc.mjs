import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const config = {
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,css,scss,prettierrc}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default config;
