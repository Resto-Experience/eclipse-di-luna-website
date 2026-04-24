import fs from 'node:fs';
import path from 'node:path';
const root = '/Users/SantiagoRWeber/Documents/Downloads/Webs/Claude/eclipse-di-luna/public';
function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full, out);
    else if (/\.(avif|webp|png|jpg|jpeg|mp4|webm)$/i.test(f.name)) out.push(full);
  }
  return out;
}
const files = walk(root).map(f => ({ path: f.slice(root.length + 1), size: fs.statSync(f).size }));
files.sort((a, b) => b.size - a.size).slice(0, 20).forEach(f => {
  console.log(`${(f.size / 1024).toFixed(0).padStart(5)} KB  ${f.path}`);
});
const total = files.reduce((a, b) => a + b.size, 0);
console.log(`\nTotal: ${(total / 1024 / 1024).toFixed(1)} MB across ${files.length} files`);
