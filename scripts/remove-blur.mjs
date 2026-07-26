import fs from 'fs';
import path from 'path';

const dir = 'c:\\Extacuricular\\Antigravity\\RDX3.0';

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove backdrop-filter from body overlay
      if (content.includes('backdrop-filter: blur(4px);')) {
        content = content.replace(/backdrop-filter: blur\(4px\);/g, '');
        fs.writeFileSync(fullPath, content);
        console.log(`Removed background blur in ${fullPath}`);
      }
    }
  }
}

processDir(dir);
