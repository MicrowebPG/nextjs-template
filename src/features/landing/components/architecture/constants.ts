export const TREE_LINES = [
  { text: 'src/', highlight: false },
  { text: '├── app/', highlight: false },
  { text: '│   ├── api/auth/[...all]/', highlight: false },
  { text: '│   ├── globals.css', highlight: false },
  { text: '│   ├── layout.tsx', highlight: false },
  { text: '│   └── page.tsx', highlight: false },
  { text: '├── db/', highlight: false },
  { text: '│   ├── schema/', highlight: false },
  { text: '│   ├── index.ts', highlight: false },
  { text: '│   └── utils.ts', highlight: false },
  { text: '├── features/', highlight: true },
  { text: '│   └── auth/', highlight: true },
  { text: '│       ├── components/', highlight: true },
  { text: '│       ├── lib/', highlight: true },
  { text: '│       ├── types/', highlight: true },
  { text: '│       └── index.ts', highlight: true },
  { text: '└── lib/', highlight: false },
  { text: '    └── utils.ts', highlight: false }
];

export const PRINCIPLES = [
  {
    title: 'Co-located features',
    desc: 'Each feature contains its own components, hooks, types, and utilities — everything in one place.'
  },
  {
    title: 'Clear boundaries',
    desc: 'Features communicate through well-defined interfaces. No cross-feature imports creating hidden coupling.'
  },
  {
    title: 'Scale naturally',
    desc: 'Add new features by creating a new folder. Remove features by deleting one. Zero entanglement.'
  }
];
