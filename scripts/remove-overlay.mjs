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
      
      // Remove the overlay CSS block
      const overlayRegex = /\/\* Optional screen overlay to darken background behind the modal \*\/[\s\S]*?@keyframes fadeInOverlay {\s*from { opacity: 0; }\s*to { opacity: 1; }\s*}/;
      if (overlayRegex.test(content)) {
        content = content.replace(overlayRegex, '');
        fs.writeFileSync(fullPath, content);
        console.log(`Removed overlay CSS in ${fullPath}`);
      }
    }
  }
}

processDir(dir);
