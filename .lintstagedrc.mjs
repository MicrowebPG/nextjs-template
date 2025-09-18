import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const config = {
  '*.{ts,tsx}': () => 'npm run tsc',
  '*.{js,jsx,ts,tsx,json,md,css,scss,prettierrc}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

export default config;
