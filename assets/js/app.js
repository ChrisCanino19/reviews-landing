// Basic interactions, language toggle, reveal animations, and Stripe link handling

(function(){
  const cfg = window.APP_CONFIG || {stripe:{}, onboardingURL:"#"};

  // Test mode banner if any Stripe link contains '/test_'
  const isTest = Object.values(cfg.stripe || {}).some(u => typeof u === "string" && u.includes("/test_"));
  const banner = document.getElementById("testBanner");
  if (banner && isTest) banner.hidden = false;

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Scroll progress
  const progress = document.getElementById("progress");
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + "%";
  };
  document.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add("reveal-in"); io.unobserve(e.target);} });
  }, {threshold: 0.1});
  document.querySelectorAll("[data-reveal]").forEach(el=>io.observe(el));

  // Stripe buy buttons
  document.querySelectorAll(".btn.buy").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const plan = btn.getAttribute("data-plan");
      const url = (cfg.stripe||{})[plan];
      if (url){ btn.setAttribute("href", url); }
      else { e.preventDefault(); alert("Stripe link not configured for: " + plan); }
    });
  });

  // Onboarding button
  const ob = document.getElementById("onboardingBtn");
  if (ob){
    ob.addEventListener("click",(e)=>{
      if (!cfg.onboardingURL || cfg.onboardingURL === "#"){
        e.preventDefault();
        alert("Onboarding form URL will be added after setup.");
      } else {
        ob.setAttribute("href", cfg.onboardingURL);
      }
    });
  }

  // Language toggle
  const langToggle = document.getElementById("langToggle");
  const dict = {
    "en": {
      "nav.pricing":"Pricing","nav.how":"How it works","nav.compliance":"Compliance","nav.faq":"FAQ",
      "cta.getStarted":"Get started","cta.viewPricing":"View pricing","cta.seeHow":"See how it works","cta.onboard":"Open onboarding",
      "hero.title":"Google Reviews Request Machine <span class='accent'>(EN/ES)</span>",
      "hero.subtitle":"Launch a compliant email flow that asks <em>all</em> recent customers for an honest Google review—<strong>no incentives</strong>, <strong>no gating</strong>—live in 48 hours.",
      "hero.note":"We only use consented lists. Every email includes an opt‑out and postal address.",
      "demo.sample":"Sample","demo.kpis":"Opens · Clicks · Reviews","demo.compliant":"Compliant (no incentives/gating)",
      "hi.compliantTitle":"Compliant by design","hi.compliantBody":"Google prohibits incentivized or gated reviews; our flow follows the rules.",
      "hi.fastTitle":"Fast 48h setup","hi.fastBody":"Launch within 48 hours after onboarding—then weekly summaries.",
      "hi.bilingualTitle":"Bilingual EN/ES","hi.bilingualBody":"English and Spanish templates increase response and trust.",
      "how.title":"How it works",
      "how.s1t":"Buy & onboard (3 min)","how.s1b":"Choose a package, then share your Google review link/QR, logo, and consented list.",
      "how.s2t":"Send the request","how.s2b":"We send a polite review request with a single reminder to non‑clickers.",
      "how.s3t":"Track & improve","how.s3b":"You get weekly opens/clicks plus updated review counts.",
      "pricing.title":"Pricing",
      "p.starter.f1":"1 campaign (≤300 contacts)","p.starter.f2":"1 reminder to non‑clickers","p.starter.f3":"EN/ES templates","p.starter.f4":"Weekly KPI email (2 weeks)",
      "p.standard.f1":"Up to 1,000 contacts","p.standard.f2":"2 reminders to non‑clickers","p.standard.f3":"Branded sender setup guide","p.standard.f4":"Weekly KPI email (4 weeks)",
      "p.pro.f1":"Same‑day launch (assets ready)","p.pro.f2":"Custom segments (recency/type)","p.pro.f3":"Review‑count monitor + chart","p.pro.f4":"Team brief",
      "pricing.note":"Payment is captured up‑front. Launch within 48 hours post‑onboarding, or your setup fee is refunded.",
      "comp.title":"Compliance",
      "comp.b1":"<strong>No incentives.</strong> We never offer discounts or gifts in exchange for reviews.",
      "comp.b2":"<strong>No gating.</strong> We don’t filter by satisfaction; we ask all recent customers.",
      "comp.b3":"<strong>Email rules.</strong> Clear opt‑out, truthful headers, and a postal address in every message.",
      "comp.b4":"<strong>Consent only.</strong> We use lists the client confirms are consent‑based.",
      "faq.title":"FAQs",
      "faq.q1":"Is this compliant with Google’s policies?","faq.a1":"Yes—no incentives, no gating, and we ask all recent customers. We include opt‑out links and a postal address.",
      "faq.q2":"What do you need from me?","faq.a2":"Your Google review link/QR, brand logo, and a consented customer list (CSV). We launch after onboarding is complete.",
      "faq.q3":"How long until it’s live?","faq.a3":"Within 48 hours of receiving your onboarding inputs. Rush/Pro can launch same day if assets are ready.",
      "faq.q4":"Do you send reminders?","faq.a4":"Yes, we send one to two polite reminders to non‑clickers only—never based on sentiment.",
      "footer.addr":"[Your business postal address here]","footer.next":"Next step","footer.disclaimer":"We comply with Google’s review and email policies. No incentives. No gating."
    },
    "es": {
      "nav.pricing":"Precios","nav.how":"Cómo funciona","nav.compliance":"Cumplimiento","nav.faq":"Preguntas",
      "cta.getStarted":"Comenzar","cta.viewPricing":"Ver precios","cta.seeHow":"Ver cómo funciona","cta.onboard":"Abrir onboarding",
      "hero.title":"Máquina de Solicitud de Reseñas en Google <span class='accent'>(EN/ES)</span>",
      "hero.subtitle":"Lanza un flujo de correos cumplido que pide una reseña honesta a <em>todos</em> los clientes recientes—<strong>sin incentivos</strong>, <strong>sin filtrar</strong>—activo en 48 horas.",
      "hero.note":"Usamos listas con consentimiento. Cada correo incluye baja (opt‑out) y dirección postal.",
      "demo.sample":"Ejemplo","demo.kpis":"Aperturas · Clics · Reseñas","demo.compliant":"Cumplido (sin incentivos/filtrado)",
      "hi.compliantTitle":"Cumplimiento por diseño","hi.compliantBody":"Google prohíbe reseñas incentivadas o filtradas; seguimos las reglas.",
      "hi.fastTitle":"Configuración en 48h","hi.fastBody":"Lanzamos en 48 horas tras el onboarding; luego, resúmenes semanales.",
      "hi.bilingualTitle":"Bilingüe EN/ES","hi.bilingualBody":"Plantillas en inglés y español mejoran respuesta y confianza.",
      "how.title":"Cómo funciona",
      "how.s1t":"Compra y onboarding (3 min)","how.s1b":"Elige un plan y comparte tu enlace/QR de reseñas, logo y lista con consentimiento.",
      "how.s2t":"Enviar la solicitud","how.s2b":"Enviamos una solicitud amable y un recordatorio a quienes no hicieron clic.",
      "how.s3t":"Medir y mejorar","how.s3b":"Recibes aperturas/clics semanales y el total de reseñas actualizado.",
      "pricing.title":"Precios",
      "p.starter.f1":"1 campaña (≤300 contactos)","p.starter.f2":"1 recordatorio a no‑clics","p.starter.f3":"Plantillas EN/ES","p.starter.f4":"Resumen semanal (2 semanas)",
      "p.standard.f1":"Hasta 1,000 contactos","p.standard.f2":"2 recordatorios a no‑clics","p.standard.f3":"Guía de remitente con marca","p.standard.f4":"Resumen semanal (4 semanas)",
      "p.pro.f1":"Lanzamiento el mismo día (con insumos)","p.pro.f2":"Segmentos a medida (recencia/tipo)","p.pro.f3":"Monitoreo de reseñas + gráfico","p.pro.f4":"Resumen para el equipo",
      "pricing.note":"El pago se captura por adelantado. Lanzamos en 48h tras el onboarding o devolvemos la tarifa de configuración.",
      "comp.title":"Cumplimiento",
      "comp.b1":"<strong>Sin incentivos.</strong> Nunca ofrecemos descuentos o regalos a cambio de reseñas.",
      "comp.b2":"<strong>Sin filtrado.</strong> No filtramos por satisfacción; pedimos a todos los clientes recientes.",
      "comp.b3":"<strong>Reglas de email.</strong> Baja clara, encabezados veraces y dirección postal en cada mensaje.",
      "comp.b4":"<strong>Solo con consentimiento.</strong> Usamos listas que el cliente confirma con consentimiento.",
      "faq.title":"Preguntas",
      "faq.q1":"¿Cumple con las políticas de Google?","faq.a1":"Sí—sin incentivos ni filtrado y pedimos a todos los clientes recientes. Incluimos baja y dirección postal.",
      "faq.q2":"¿Qué necesitas de mí?","faq.a2":"Tu enlace/QR de reseñas de Google, logo y lista con consentimiento (CSV). Lanzamos tras el onboarding.",
      "faq.q3":"¿Cuánto tarda?","faq.a3":"Dentro de 48h de recibir la información. Rush/Pro puede lanzar el mismo día si los insumos están listos.",
      "faq.q4":"¿Envían recordatorios?","faq.a4":"Sí, uno o dos recordatorios amables solo a no‑clics, nunca por sentimiento.",
      "footer.addr":"[Tu dirección postal de negocio]","footer.next":"Siguiente paso","footer.disclaimer":"Cumplimos las políticas de reseñas y email de Google. Sin incentivos. Sin filtrado."
    }
  };

  function setLang(lang){
    const dictLang = dict[lang] || dict.en;
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dictLang[key];
      if (val){
        if (val.includes("<") || val.includes("&")) el.innerHTML = val;
        else el.textContent = val;
      }
    });
    if (langToggle){
      langToggle.textContent = lang === "en" ? "ES" : "EN";
      langToggle.setAttribute("aria-pressed", lang === "es");
    }
  }

  if (langToggle){
    langToggle.addEventListener("click", ()=>{
      const current = document.documentElement.getAttribute("lang") || "en";
      setLang(current === "en" ? "es" : "en");
    });
  }

  // init language from localStorage or browser
  const saved = localStorage.getItem("lang");
  setLang(saved || (navigator.language || "en").substring(0,2).toLowerCase().startsWith("es") ? "es" : "en");

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.querySelectorAll(".shimmer").forEach(el => el.classList.remove("shimmer"));
  }
})();