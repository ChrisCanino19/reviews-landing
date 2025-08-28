/* Main interactions
 - Stripe CTAs + Test banner
 - Smooth anchor scrolling
 - IntersectionObserver reveals
 - Scroll progress bar
 - Sticky header shadow
 - Parallax on decorative SVG
 - Confetti pulse on CTA click
 - Language toggle triggers I18N.setLang (handled in i18n.js)
 - Respects prefers-reduced-motion
*/

// ====== CONFIG ======
// Flip testMode to false and paste LIVE Payment Links when ready.
const CONFIG = {
  businessName: "Google Reviews Request Machine",
  email: "your@email.here",                     // TODO: replace
  onboardingUrl: "#",                           // TODO: replace when form is ready
  testMode: true,                               // shows TEST banner
  stripe: {
    starter:  "https://buy.stripe.com/test_cNi28qbzv57e8nfaJO2sM00",
    standard: "https://buy.stripe.com/test_28E28qgTP1V27jb6ty2sM01",
    pro:      "https://buy.stripe.com/test_cNi6oGcDz2Z6gTLcRW2sM02"
  }
};

(function(){
  const d = document;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Test banner
  if(CONFIG.testMode){
    const b = d.createElement('div');
    b.className = 'test-banner';
    b.setAttribute('role','note');
    b.textContent = 'TEST MODE: Stripe links are in test mode.';
    d.body.insertBefore(b, d.body.firstChild);
  }

  // Header shadow & mobile menu
  const header = d.getElementById('site-header');
  function onScrollHdr(){
    if(window.scrollY > 6) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }
  onScrollHdr();
  window.addEventListener('scroll', onScrollHdr, {passive:true});

  const menuToggle = d.getElementById('menu-toggle');
  const navLinks = d.getElementById('nav-links');
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Stripe CTAs
  const planUrl = {
    starter: CONFIG.stripe.starter,
    standard: CONFIG.stripe.standard,
    pro: CONFIG.stripe.pro
  };
  d.querySelectorAll('.btn-cta').forEach(btn => {
    const plan = btn.getAttribute('data-plan');
    if(plan && planUrl[plan]){
      btn.href = planUrl[plan];
      btn.target = '_blank';
      btn.rel = 'noopener';
    }
    btn.addEventListener('click', (e)=>{
      // Confetti pulse
      if(!prefersReduced) confetti(btn, e);
    });
  });

  // Smooth anchor scroll for in-page links
  d.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length > 1){
        e.preventDefault();
        const el = d.querySelector(id);
        if(el){
          el.scrollIntoView({behavior: prefersReduced ? 'auto' : 'smooth', block: 'start'});
          el.setAttribute('tabindex','-1'); el.focus({preventScroll:true});
        }
      }
    });
  });

  // Progress bar
  const progress = d.getElementById('progress');
  function updateProgress(){
    const h = d.documentElement;
    const scrollTop = h.scrollTop || d.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);

  // IntersectionObserver reveals
  const observer = new IntersectionObserver((ents)=>{
    ents.forEach(ent => {
      if(ent.isIntersecting){ ent.target.classList.add('visible'); observer.unobserve(ent.target); }
    });
  }, {threshold: 0.1});
  if(!prefersReduced){
    d.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  }else{
    d.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
  }

  // Parallax decorative SVG
  const deco = d.getElementById('decorative-dots');
  let rafId = null;
  function onScrollParallax(){
    if(prefersReduced || !deco) return;
    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(()=>{
      const max = 16; // clamp
      const pct = Math.min(1, Math.max(0, window.scrollY / 600));
      const y = (pct * max) - (max/2);
      deco.style.transform = `translateY(${y.toFixed(1)}px)`;
    });
  }
  window.addEventListener('scroll', onScrollParallax, {passive:true});

  // Packages tabs
  const tabs = d.querySelectorAll('.tab');
  const panels = d.querySelectorAll('.panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', ()=>{
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const plan = tab.getAttribute('data-plan');
      const panel = d.getElementById('panel-' + plan);
      if(panel) panel.classList.add('active');
    });
  });

  // Copy policy text
  const policy = d.getElementById('policy-text');
  const copyBtn = d.getElementById('copy-policy');
  if(copyBtn && policy){
    copyBtn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(policy.textContent.trim());
        copyBtn.textContent = copyBtn.textContent.replace(/Copied!.*/,'Copied!');
        setTimeout(()=>{ I18N.setLang(document.documentElement.lang); }, 1200);
      }catch(e){ console.warn('Clipboard failed', e); }
    });
  }

  // Set email and onboarding link from CONFIG
  const emailLink = d.getElementById('contact-email');
  if(emailLink){ emailLink.href = 'mailto:'+CONFIG.email; emailLink.textContent = CONFIG.email; }

  // Confetti generator using simple DOM nodes and CSS vars
  function confetti(btn, ev){
    btn.classList.add('confetti');
    for(let i=0;i<14;i++){
      const s = d.createElement('span');
      s.className = 'confetti-piece';
      const angle = (i / 14) * Math.PI * 2;
      const dist = 40 + Math.random()*28;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist * 0.7 - 10;
      const rot = (Math.random()*180 - 90)+'deg';
      const colors = ['#06b6d4','#22d3ee','#a3e635','#f59e0b','#ef4444','#8b5cf6','#10b981'];
      s.style.setProperty('--dx', dx+'px');
      s.style.setProperty('--dy', dy+'px');
      s.style.setProperty('--rot', rot);
      s.style.background = colors[i % colors.length];
      s.style.left = (ev.offsetX)+'px';
      s.style.top = (ev.offsetY)+'px';
      btn.appendChild(s);
      s.addEventListener('animationend', ()=> s.remove());
    }
    setTimeout(()=> btn.classList.remove('confetti'), 700);
  }

})();