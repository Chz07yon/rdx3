import fs from 'fs';
import path from 'path';

const rootDir = 'c:\\Extacuricular\\Antigravity\\RDX3.0';

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'assets') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.js') || fullPath.endsWith('.txt')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let updated = false;
      
      // Replace exactly "RDX Studio" with "RED Studio"
      if (content.includes('RDX Studio')) {
        content = content.replace(/RDX Studio/g, 'RED Studio');
        updated = true;
      }
      // Replace exactly "RDX studio" with "RED studio" (just in case)
      if (content.includes('RDX studio')) {
        content = content.replace(/RDX studio/g, 'RED studio');
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated text in ${fullPath}`);
      }
    }
  }
}

processDir(rootDir);
console.log("Text replacement complete.");
