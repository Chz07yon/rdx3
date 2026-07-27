const fs = require('fs');

let content = fs.readFileSync('team.html', 'utf8');

// Replace all instances of `rgba(227, 6, 19,` with `rgba(var(--rdx-red-rgb),`
content = content.replace(/rgba\(\s*227\s*,\s*6\s*,\s*19\s*,/g, 'rgba(var(--rdx-red-rgb),');
content = content.replace(/--accent-red:\s*#E8001D;/g, '--accent-red: var(--rdx-red);');

fs.writeFileSync('team.html', content, 'utf8');
console.log('Fixed red hardcodes in team.html');
