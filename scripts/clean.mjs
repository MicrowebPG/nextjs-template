import { execSync } from 'node:child_process';
import { rm } from 'node:fs/promises';

try {
  console.log('\n⏳ Cleaning...');

  await rm('.next', { recursive: true, force: true });
  execSync('npm cache clean --force && npm dedupe && npm prune', {
    stdio: 'inherit'
  });

  console.log('\n✅ Clean Completed!');
} catch (err) {
  console.error(`❌ ${err.message}`);
}
