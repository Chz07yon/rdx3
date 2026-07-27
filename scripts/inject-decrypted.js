const fs = require('fs');
const path = require('path');

const dir = 'c:\\Extacuricular\\Antigravity\\RDX3.0';
const scriptToInject = `<script>if(localStorage.getItem('max_red_auth')) document.documentElement.classList.add('is-decrypted');</script>`;

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove it if it's already there to avoid duplicates
      content = content.replace(/<script>if\(localStorage\.getItem\('max_red_auth'\)\) document\.documentElement\.classList\.add\('is-decrypted'\);<\/script>/g, '');
      
      // Inject before </head>
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${scriptToInject}\n</head>`);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(dir);
console.log('Injection complete.');
