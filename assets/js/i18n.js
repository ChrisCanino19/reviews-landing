// Lightweight i18n loader for EN/ES. Fallback to EN if fetch fails.
// Usage: elements have [data-i18n="key"] and optional [data-i18n-list="key.for.array"]
(function(){
  const html = document.documentElement;
  const els = {
    enBtn: document.getElementById('lang-en'),
    esBtn: document.getElementById('lang-es'),
  };

  async function fetchJSON(path){
    try{
      const res = await fetch(path, {cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.json();
    }catch(e){
      console.warn('i18n fetch failed', path, e);
      return null;
    }
  }

  async function applyTranslations(dict){
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      const value = key.split('.').reduce((o,k)=> (o && o[k]!=null) ? o[k] : null, dict);
      if(typeof value === 'string'){ node.textContent = value; }
    });
    const lists = document.querySelectorAll('[data-i18n-list]');
    lists.forEach(listEl => {
      const key = listEl.getAttribute('data-i18n-list');
      const arr = key.split('.').reduce((o,k)=> (o && o[k]!=null) ? o[k] : null, dict);
      if(Array.isArray(arr)){
        listEl.innerHTML = '';
        arr.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          listEl.appendChild(li);
        });
      }
    });
    // Footer year replacement if present
    const rights = document.querySelector('.rights');
    if(rights && dict?.footer?.rights){
      rights.textContent = dict.footer.rights.replace('{year}', new Date().getFullYear());
    }
  }

  async function setLang(lang){
    const tryLang = await fetchJSON('data/'+lang+'.json');
    const dict = tryLang || await fetchJSON('data/en.json') || {};
    await applyTranslations(dict);
    // Toggle aria-pressed
    if(els.enBtn && els.esBtn){
      els.enBtn.setAttribute('aria-pressed', String(lang==='en'));
      els.esBtn.setAttribute('aria-pressed', String(lang==='es'));
    }
    html.lang = lang;
    localStorage.setItem('lang', lang);
    html.setAttribute('data-ready','true');
  }

  // Expose globally for main.js
  window.I18N = { setLang };

  // init
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);

  // hook buttons (may not exist on all pages)
  els.enBtn && els.enBtn.addEventListener('click', ()=> setLang('en'));
  els.esBtn && els.esBtn.addEventListener('click', ()=> setLang('es'));
})();
