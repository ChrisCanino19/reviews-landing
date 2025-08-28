// Theme + Language + Interactions

(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  const storedLang = localStorage.getItem('lang') || 'en';

  function applyTheme(theme){
    if(theme === 'dark' || (theme === 'auto' && prefersDark)){
      root.classList.remove('light'); root.classList.add('dark');
    } else if(theme === 'light'){
      root.classList.remove('dark'); root.classList.add('light');
    } else {
      root.classList.remove('dark','light');
    }
    localStorage.setItem('theme', theme);
  }

  function detectTestLinks(){
    const links = Array.from(document.querySelectorAll('a[href*=\"stripe.com\"]'));
    const isTest = links.some(a => /\/test_/.test(a.getAttribute('href')));
    const banner = document.getElementById('testBanner');
    if(banner) banner.hidden = !isTest;
  }

  function applyLang(lang){
    document.querySelectorAll('[data-lang]').forEach(el => {
      const isTarget = el.getAttribute('data-lang') === lang;
      el.hidden = !isTarget;
    });
    localStorage.setItem('lang', lang);
    // Update language toggle label
    const langBtn = document.getElementById('langToggle');
    if(langBtn){ langBtn.textContent = (lang === 'en') ? 'ES' : 'EN'; }
  }

  // Set initial states
  applyTheme(storedTheme || 'auto');
  applyLang(storedLang);
  detectTestLinks();

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'auto';
    const next = current === 'dark' ? 'light' : current === 'light' ? 'auto' : 'dark';
    applyTheme(next);
  });

  // Language toggle
  document.getElementById('langToggle')?.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'en';
    const next = current === 'en' ? 'es' : 'en';
    applyLang(next);
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^=\"#\"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // IntersectionObserver reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // Sticky CTA visibility
  const sticky = document.getElementById('stickyCta');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const show = y > 500;
    if(sticky) sticky.hidden = !show;
    lastY = y;
  });

  // Tilt effect
  function addTilt(el){
    const rect = el.getBoundingClientRect();
    function move(e){
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      el.style.transform = `perspective(800px) rotateX(${y*-6}deg) rotateY(${x*6}deg) translateY(-2px)`;
    }
    function leave(){ el.style.transform = ''; }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
  }
  document.querySelectorAll('.tilt').forEach(addTilt);

  // Counters demo
  function animateNumber(el, to, duration=1200){
    let start = 0, t0 = performance.now();
    function tick(t){
      const p = Math.min(1, (t - t0)/duration);
      const val = Math.floor(p * to);
      el.textContent = '+'+val;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const c = document.getElementById('counterReviews');
  if(c) animateNumber(c, 15, 1000);

  // Back to top
  document.getElementById('toTop')?.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

})();