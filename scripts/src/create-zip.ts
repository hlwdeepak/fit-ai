import { createRequire } from 'module';
import * as fs from 'fs';
import * as path from 'path';

const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

const ROOT = path.resolve(process.cwd(), '..');
const OUT  = path.resolve(ROOT, 'FitAI_GitHub.zip');

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', 'dist', '.cache', 'coverage',
  '.replit-artifact', '.local', 'attached_assets',
]);

const EXCLUDE_FILES = new Set([
  '.replit', 'replit.nix', '.breakpoints',
  'FitAI_GitHub.zip',
]);

const EXCLUDE_EXTS = new Set(['.tsbuildinfo', '.map']);

const output = fs.createWriteStream(OUT);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () => {
  const kb = (archive.pointer() / 1024).toFixed(1);
  console.log(`ZIP created: ${OUT}  (${kb} KB)`);
});

archive.on('warning', (err: any) => {
  if (err.code !== 'ENOENT') throw err;
});

archive.on('error', (err: any) => { throw err; });

archive.pipe(output);

function walk(dir: string, zipBase: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const arcPath  = (zipBase + '/' + entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(fullPath, arcPath);
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      const ext = path.extname(entry.name);
      if (EXCLUDE_EXTS.has(ext)) continue;
      archive.file(fullPath, { name: arcPath });
    }
  }
}

walk(ROOT, 'FitAI');
archive.finalize();
