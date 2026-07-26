const fs = require('fs');
const path = require('path');

const navContent = fs.readFileSync('partials/nav.html', 'utf8');
const footerContent = fs.readFileSync('partials/footer.html', 'utf8');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('<div id="nav-placeholder"></div>', navContent);
  content = content.replace('<div id="footer-placeholder"></div>', footerContent);
  fs.writeFileSync(file, content);
  console.log('Inlined partials into ' + file);
}
