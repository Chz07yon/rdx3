import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const teamFile = path.join(__dirname, '..', 'team.html');

let content = fs.readFileSync(teamFile, 'utf8');

// 1. Add new CSS links to head
const headEnd = '</head>';
if (!content.includes('css/tokens.css')) {
  content = content.replace(headEnd, `    <link rel="stylesheet" href="css/tokens.css">\n    <link rel="stylesheet" href="css/global.css">\n${headEnd}`);
}

// 2. Add page transition shutter right after <body>
const bodyStart = /<body[^>]*>/i;
if (!content.includes('id="page-transition"')) {
  content = content.replace(bodyStart, (match) => `${match}\n    <!-- Page Transition Shutter -->\n    <div id="page-transition" class="active"></div>\n`);
}

// 3. Replace <header> or <nav> with nav placeholder
// We will look for <header...  </header> or <nav... </nav>
content = content.replace(/<header[\s\S]*?<\/header>/i, '<!-- Shared Nav Placeholder -->\n    <div id="nav-placeholder"></div>');
content = content.replace(/<nav[\s\S]*?<\/nav>/i, '<!-- Shared Nav Placeholder -->\n    <div id="nav-placeholder"></div>');

// 4. Replace <footer> with footer placeholder
content = content.replace(/<footer[\s\S]*?<\/footer>/i, '<!-- Shared Footer Placeholder -->\n    <div id="footer-placeholder"></div>');

// 5. Add script tag at the end of body
const bodyEnd = '</body>';
if (!content.includes('js/main.js')) {
  content = content.replace(bodyEnd, `    <script src="js/main.js"></script>\n${bodyEnd}`);
}

// Write back
fs.writeFileSync(teamFile, content);
console.log('team.html successfully wired into the new system.');
