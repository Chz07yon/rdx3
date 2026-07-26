// Main application logic for RDX3.0 Shell

document.addEventListener('DOMContentLoaded', () => {
  initPartials();
  initAnimations();
  initPageTransitions();
});

/**
 * Loads partials (nav, footer) via fetch
 */
async function initPartials() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  try {
    if (navPlaceholder) {
      const navRes = await fetch('partials/nav.html');
      if (navRes.ok) {
        navPlaceholder.innerHTML = await navRes.text();
        initNavScroll();
        initHamburger();
      }
    }

    if (footerPlaceholder) {
      const footerRes = await fetch('partials/footer.html');
      if (footerRes.ok) {
        footerPlaceholder.innerHTML = await footerRes.text();
        // Set copyright year inside footer
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      }
    }
  } catch (error) {
    console.error('Error loading partials:', error);
  }
}

/**
 * Sticky transparent-to-solid nav behavior
 */
function initNavScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('is-solid');
    } else {
      nav.classList.remove('is-solid');
    }
  }, { passive: true });
}

/**
 * Mobile hamburger menu toggle
 */
function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Intersection Observer for scroll animations (fade-up, slide-in)
 */
function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.rdx-fade-up, .rdx-slide-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Page Transitions — intercepts internal link clicks
 * Skips if page is opened via file:// protocol to avoid issues
 */
function initPageTransitions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const transitionOverlay = document.getElementById('page-transition');
  if (!transitionOverlay) return;

  // On page load, remove the active class to reveal page
  setTimeout(() => {
    transitionOverlay.classList.remove('active');
  }, 50);

  // Use event delegation on the document since partials are injected dynamically
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');
    
    // Ignore external links, mailto, tel, hashes, and blank targets
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || target === '_blank') {
      return;
    }
    
    e.preventDefault();
    
    transitionOverlay.classList.add('active');
    
    setTimeout(() => {
      window.location.href = href;
    }, 350);
  });
}
