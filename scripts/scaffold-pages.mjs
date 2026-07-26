import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const pages = [
  { name: 'index.html', title: 'RDX Studios | Home' },
  { name: 'about.html', title: 'About | RDX Studios' },
  { name: 'services.html', title: 'Services | RDX Studios' },
  { name: 'portfolio.html', title: 'Portfolio | RDX Studios' },
  { name: 'journal.html', title: 'Journal | RDX Studios' },
  { name: 'contact.html', title: 'Contact | RDX Studios' }
];

const template = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="RDX Studios - Dark luxury design system">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/global.css">
</head>
<body class="rdx-grain">
  
  <!-- Page Transition Shutter -->
  <div id="page-transition" class="active"></div>

  <!-- Shared Nav Placeholder -->
  <div id="nav-placeholder"></div>

  <main style="min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <!-- Shell Content -->
    <h1 class="rdx-fade-up" style="font-size: 4rem; color: var(--rdx-red);">${title.split(' | ')[0]}</h1>
    <p class="rdx-fade-up" style="transition-delay: 100ms; font-family: var(--font-body); color: var(--rdx-gray-light); margin-top: 1rem;">Coming Soon</p>
  </main>

  <!-- Shared Footer Placeholder -->
  <div id="footer-placeholder"></div>

  <script src="js/main.js"></script>
</body>
</html>`;

for (const page of pages) {
  const filePath = path.join(rootDir, page.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(page.title));
    console.log(`Created ${page.name}`);
  } else {
    console.log(`Skipped ${page.name}, already exists`);
  }
}
