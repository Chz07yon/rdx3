import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import heicDecode from 'heic-decode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '..', 'Assets');

async function convertAssets() {
  console.log(`Scanning ${assetsDir}...`);
  if (!fs.existsSync(assetsDir)) {
      console.log('Assets directory not found');
      return;
  }
  const files = fs.readdirSync(assetsDir);
  
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const outPath = path.join(assetsDir, `${basename}.webp`);
    
    if (ext === '.webp') continue;
    if (fs.existsSync(outPath)) {
      console.log(`Skipping ${file}, webp already exists.`);
      continue;
    }

    try {
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        console.log(`Converting ${file} to webp...`);
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log(`  -> Saved ${basename}.webp`);
      } else if (ext === '.heic') {
        console.log(`Converting ${file} to webp using heic-decode...`);
        const buffer = fs.readFileSync(filePath);
        const { width, height, data } = await heicDecode({ buffer });
        await sharp(data, {
          raw: { width, height, channels: 4 }
        })
          .webp({ quality: 80 })
          .toFile(outPath);
        console.log(`  -> Saved ${basename}.webp`);
      }
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

convertAssets().catch(console.error);
