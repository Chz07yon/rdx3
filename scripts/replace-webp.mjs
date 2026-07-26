import fs from 'fs';
import path from 'path';

const rootDir = 'c:\\Extacuricular\\Antigravity\\RDX3.0';
const assetsDir = path.join(rootDir, 'assets');

function getOriginalExt(basename) {
  const exts = ['.png', '.jpg', '.jpeg', '.svg', '.heic'];
  for (const ext of exts) {
    if (fs.existsSync(path.join(assetsDir, basename + ext))) {
      return ext;
    }
  }
  return null; // No original found
}

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'assets') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let updated = false;
      const newContent = content.replace(/([^/"'\\]+)\.webp/gi, (match, basename) => {
        const ext = getOriginalExt(basename);
        if (ext) {
          updated = true;
          return basename + ext;
        }
        return match;
      });

      if (updated && newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated references in ${fullPath}`);
      }
    }
  }
}

processDir(rootDir);
console.log("Asset reference update complete.");
