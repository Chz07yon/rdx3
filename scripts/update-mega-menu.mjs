import fs from 'fs';
import path from 'path';

const dir = 'c:\\Extacuricular\\Antigravity\\RDX3.0';

const newCss = `/* Mega Menu Styles */
.mega-menu-wrapper {
  position: static; /* Important so that the fixed child works reliably on all browsers, though fixed is relative to viewport anyway */
}
.services-trigger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--rdx-white);
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
}
.dropdown-icon {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.services-trigger[aria-expanded="true"] .dropdown-icon {
  transform: rotate(180deg);
}
.mega-menu-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%) scale(0.98);
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: var(--space-xl);
  width: max-content;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255,255,255,0.05);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.4s;
  z-index: 1000;
}
.mega-menu-panel.is-open {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}
.mega-menu-grid {
  display: flex;
  flex-direction: row;
  gap: var(--space-lg);
}
.mega-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  width: 280px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
}
.mega-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--rdx-red-active);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.mega-card:hover, .mega-card:focus-visible {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  outline: none;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}
.mega-card:hover::after, .mega-card:focus-visible::after {
  transform: scaleX(1);
}
.mega-card-icon {
  width: 48px !important;
  height: 48px !important;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s;
  filter: brightness(0.8);
}
.mega-card:hover .mega-card-icon {
  transform: scale(1.1);
  filter: brightness(1);
}
.mega-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mega-card-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--rdx-white);
  line-height: 1;
  transition: color 0.3s ease;
}
.mega-card:hover .mega-card-title {
  color: var(--rdx-red-active);
}
.mega-card-desc {
  font-size: 0.9rem;
  color: var(--rdx-gray-light);
  line-height: 1.4;
}

/* Optional screen overlay to darken background behind the modal */
body.mega-menu-active::after {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  pointer-events: none;
  animation: fadeInOverlay 0.4s ease forwards;
}

@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 900px) {
  .mega-menu-panel {
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    background: transparent;
    backdrop-filter: none;
    padding: var(--space-sm) 0 0 0;
    width: 100%;
    display: none;
  }
  .mega-menu-panel.is-open {
    transform: none;
    display: block;
  }
  .mega-menu-grid {
    flex-direction: column;
  }
  .mega-card {
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: var(--space-sm);
    background: transparent;
    border: none;
  }
  .mega-card:hover {
    transform: none;
    background: rgba(255,255,255,0.05);
    box-shadow: none;
  }
  .mega-card-desc {
    display: none;
  }
  .mega-card-icon {
    width: 32px !important;
    height: 32px !important;
  }
  .mega-card-title {
    font-size: 1.25rem;
  }
}`;

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
      const regex = /\/\* Mega Menu Styles \*\/[\s\S]*?(?=\s*<\/style>)/;
      if (regex.test(content)) {
        content = content.replace(regex, newCss);
        
        // Also update script to toggle a class on body for the backdrop
        if (!content.includes("document.body.classList.add('mega-menu-active')")) {
           content = content.replace(
             /panel\.classList\.add\('is-open'\);/g, 
             "panel.classList.add('is-open');\n      if (window.innerWidth > 900) document.body.classList.add('mega-menu-active');"
           );
           content = content.replace(
             /panel\.classList\.remove\('is-open'\);/g, 
             "panel.classList.remove('is-open');\n      document.body.classList.remove('mega-menu-active');"
           );
        }
        
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(dir);
