const fs = require('fs');

const navContent = fs.readFileSync('partials/nav.html', 'utf8').trim();
const footerContent = fs.readFileSync('partials/footer.html', 'utf8').trim();

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace NAV
  content = content.replace(
    /<!-- NAV:START -->[\s\S]*?<!-- NAV:END -->/,
    `<!-- NAV:START -->\n${navContent}\n<!-- NAV:END -->`
  );

  // Replace FOOTER
  content = content.replace(
    /<!-- FOOTER:START -->[\s\S]*?<!-- FOOTER:END -->/,
    `<!-- FOOTER:START -->\n${footerContent}\n<!-- FOOTER:END -->`
  );

  fs.writeFileSync(file, content);
  console.log('Inlined partials into ' + file);
}
