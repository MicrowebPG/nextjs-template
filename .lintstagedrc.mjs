const config = {
  "*.{ts,tsx}": () => "tsc --noEmit",
  "*.{js,jsx,ts,tsx}": [
    "oxlint --fix",
    "oxfmt --no-error-on-unmatched-pattern",
  ],
  "*.{json,md,css,scss}": "oxfmt --no-error-on-unmatched-pattern",
};

export default config;
