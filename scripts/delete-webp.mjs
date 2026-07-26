import fs from 'fs';
import path from 'path';

const assetsDir = 'c:\\Extacuricular\\Antigravity\\RDX3.0\\assets';

function deleteWebp(directory) {
  let count = 0;
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      count += deleteWebp(fullPath);
    } else if (fullPath.endsWith('.webp')) {
      fs.unlinkSync(fullPath);
      count++;
      console.log(`Deleted: ${fullPath}`);
    }
  }
  return count;
}

const total = deleteWebp(assetsDir);
console.log(`Total .webp files deleted: ${total}`);
