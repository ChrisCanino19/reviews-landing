(() => {
  const buttons = document.querySelectorAll('.lang-btn');
  let currentLang = localStorage.getItem('lang') || 'en';

  // Initialize language state on buttons
  function updateButtons() {
    buttons.forEach(btn => {
      const lang = btn.id.replace('lang-', '');
      btn.setAttribute('aria-pressed', String(lang === currentLang));
    });
  }

  async function loadLang(lang) {
    try {
      const res = await fetch(`data/${lang}.json`);
      if (!res.ok) throw new Error('lang file not found');
      const data = await res.json();
      applyTranslations(data);
    } catch (e) {
      if (lang !== 'en') {
        // fallback to English if requested lang fails
        currentLang = 'en';
        localStorage.setItem('lang', 'en');
        loadLang('en');
      }
    }
  }

  function applyTranslations(data) {
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNested(data, key);
      if (value !== undefined) {
        if (Array.isArray(value)) {
          if (el.tagName === 'UL') {
            el.innerHTML = value.map(item => `<li>${item}</li>`).join('');
          } else {
            el.textContent = value.join(', ');
          }
        } else if (typeof value === 'object') {
          // For nested objects we skip direct assignment
        } else {
          el.textContent = value;
        }
      }
    });
    // Update package lists specifically
    updatePackageList('starter', data);
    updatePackageList('standard', data);
    updatePackageList('pro', data);
    // Build FAQ section
    buildFAQ(data.faq || {});
    // Update year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    // Mark page ready
    document.documentElement.setAttribute('data-ready', '');
  }

  function updatePackageList(name, data) {
    const listEl = document.getElementById(`${name}-list`);
    if (!listEl) return;
    const pkg = data.packages && data.packages[name];
    if (pkg && Array.isArray(pkg.items)) {
      listEl.innerHTML = pkg.items.map(item => `<li>${item}</li>`).join('');
    }
  }

  function buildFAQ(faq) {
    const container = document.querySelector('.faq-list');
    if (!container) return;
    container.innerHTML = '';
    const indices = Object.keys(faq)
      .filter(key => key.startsWith('q'))
      .map(key => key.replace('q', ''))
      .sort((a, b) => parseInt(a) - parseInt(b));
    indices.forEach(index => {
      const question = faq['q' + index];
      const answer = faq['a' + index];
      if (question && answer) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = question;
        details.appendChild(summary);
        const p = document.createElement('p');
        p.textContent = answer;
        details.appendChild(p);
        container.appendChild(details);
      }
    });
  }

  function getNested(obj, key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
  }

  function setLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    updateButtons();
    loadLang(lang);
  }

  // Initial state
  document.documentElement.lang = currentLang;
  updateButtons();
  loadLang(currentLang);

  // Event listeners
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.replace('lang-', '');
      setLang(lang);
    });
  });
})();