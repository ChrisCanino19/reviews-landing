/*
 * Main script for the Google Reviews Request Machine site.
 * This script wires up interactive elements such as language toggle, stripe CTA buttons,
 * scroll progress, tabbed packages, smooth scrolling, reveal animations, parallax effects, and confetti.
 * To switch to live mode, set CONFIG.testMode to false and replace the test Payment Links in CONFIG.stripe
 * with your live Stripe Payment Link URLs.
 */

const CONFIG = {
  businessName: "Google Reviews Request Machine",
  email: "your@email.here",                     // TODO: replace
  onboardingUrl: "#",                           // TODO: replace when form is ready
  testMode: true,                                // shows TEST banner
  stripe: {
    starter:  "https://buy.stripe.com/test_cNi28qbzv57e8nfaJO2sM00",
    standard: "https://buy.stripe.com/test_28E28qgTP1V27jb6ty2sM01",
    pro:      "https://buy.stripe.com/test_cNi6oGcDz2Z6gTLcRW2sM02"
  }
};

(function() {
  // Show test banner if test mode is enabled
  const testBanner = document.getElementById('test-banner');
  if (CONFIG.testMode && testBanner) {
    testBanner.style.display = 'block';
  }
  // Set year if not handled by i18n
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // Handle Stripe CTA buttons
  const ctaButtons = document.querySelectorAll('.package-btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkg = btn.getAttribute('data-package');
      const url = CONFIG.stripe[pkg];
      if (url) {
        // Confetti animation
        confettiPulse(btn);
        // Open Stripe link in new tab
        window.open(url, '_blank', 'noopener');
      }
    });
  });
  // Tabs for packages
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      // Show corresponding panel
      panels.forEach(panel => {
        if (panel.id === `panel-${target}`) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });
  });
  // Mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('active');
    });
    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  // Scroll progress bar, header shadow, parallax
  const header = document.getElementById('header');
  const progressBar = document.getElementById('scroll-progress');
  const heroBg = document.querySelector('.hero-bg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }
    if (header) {
      header.classList.toggle('scrolled', scrollTop > 10);
    }
    // Parallax effect on hero background
    if (heroBg && !prefersReducedMotion) {
      heroBg.style.transform = `translateY(${scrollTop * -0.1}px)`;
    }
  });
  // Intersection observer for reveal
  if (!prefersReducedMotion) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  } else {
    // Immediately reveal for reduced motion
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }
  // Copy policy text to clipboard
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetKey = btn.getAttribute('data-copy-target');
      const targetEl = document.querySelector(`[data-i18n="${targetKey}"]`);
      const text = targetEl ? targetEl.textContent.trim() : '';
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      }).catch(() => {
        // fallback: do nothing
      });
    });
  });
  // Confetti pulse animation
  function confettiPulse(btn) {
    if (prefersReducedMotion) return;
    const rect = btn.getBoundingClientRect();
    const container = document.createElement('div');
    container.className = 'confetti-container';
    // Place container relative to viewport
    container.style.position = 'fixed';
    container.style.left = rect.left + 'px';
    container.style.top = rect.top + 'px';
    container.style.width = rect.width + 'px';
    container.style.height = rect.height + 'px';
    // Determine colors from CSS variables
    const computed = getComputedStyle(document.documentElement);
    const colors = [
      computed.getPropertyValue('--primary').trim(),
      computed.getPropertyValue('--secondary').trim(),
      computed.getPropertyValue('--tertiary').trim(),
      computed.getPropertyValue('--accent').trim()
    ];
    const numPieces = 20;
    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      const dx = (Math.random() - 0.5) * 150 + 'px';
      const dy = (Math.random() - 0.8) * 200 + 'px';
      piece.style.setProperty('--dx', dx);
      piece.style.setProperty('--dy', dy);
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.top = (Math.random() * 100) + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(() => {
      container.remove();
    }, 800);
  }
})();