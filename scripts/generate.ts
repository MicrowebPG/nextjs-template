import { is } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as schema from '../db/schema/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function toPascalCase(name: string): string {
  const clean = name.replace(/Table$/, '');
  return clean
    .replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
}

function main() {
  const entries = Object.entries(schema).filter(([, value]) => is(value, PgTable));

  if (entries.length === 0) {
    console.warn('⚠️ No tables found in db/schema/index.ts');
    return;
  }

  const importNames = entries.map(([key]) => key);
  const typeBlocks = entries.map(([key]) => {
    const pascal = toPascalCase(key);
    return `export type ${pascal} = InferSelectModel<typeof ${key}>;
export type New${pascal} = InferInsertModel<typeof ${key}>;`;
  });

  const fileContent = `// Regenerate with: npm run db:types

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { ${importNames.join(', ')} } from './schema/index';

${typeBlocks.join('\n\n')}
`;

  const outPath = join(__dirname, '../db/types.ts');
  writeFileSync(outPath, fileContent, 'utf-8');
  console.log(`✅ ${entries.length} types generated in ${outPath}`);
  console.log(`   ${entries.map(([k]) => toPascalCase(k)).join(', ')}`);
}

main();
