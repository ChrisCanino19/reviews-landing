/* Main interactivity and i18n */
(() => {
  // Language translations
  const translations = {
    en: {
      testBanner: "TEST MODE — All payment links are for testing purposes only",
      logo: "Reviews Request Machine",
      navPackages: "Packages",
      navHowItWorks: "How it works",
      navCompliance: "Compliance",
      navFaq: "FAQs",
      navContact: "Contact",
      heroTitle: "Google Reviews Request Machine (EN/ES)",
      heroSubtitle: "Turn last month's happy customers into honest Google reviews—compliant, bilingual, live in 48 hours.",
      heroCtaStarter: "Get Starter – $99",
      heroCtaStandard: "Standard – $199",
      heroCtaPro: "Rush/Pro – $299",
      socialProofTitle: "What Our Clients Say",
      packagesTitle: "Choose Your Package",
      packageStarterTitle: "Starter",
      packageStarterFeature1: "Up to 100 review requests",
      packageStarterFeature2: "English or Spanish",
      packageStarterFeature3: "Basic setup",
      packageStarterFeature4: "Email support",
      packageStarterCta: "Get Starter",
      packageStandardTitle: "Standard",
      packageStandardFeature1: "Up to 300 review requests",
      packageStandardFeature2: "Bilingual (EN/ES)",
      packageStandardFeature3: "Custom branding",
      packageStandardFeature4: "Priority support",
      packageStandardCta: "Get Standard",
      packageProTitle: "Rush/Pro",
      packageProFeature1: "Up to 500 review requests",
      packageProFeature2: "Bilingual (EN/ES)",
      packageProFeature3: "24-hour setup",
      packageProFeature4: "Dedicated support",
      packageProCta: "Get Rush/Pro",
      packageNote: "You'll complete a 3-minute onboarding after checkout.",
      howItWorksTitle: "How It Works",
      step1Title: "Buy & Onboard",
      step1Desc: "Select your package and complete our simple 3-minute onboarding process.",
      step2Title: "We Send Requests",
      step2Desc: "We send personalized review requests to your customers with a polite follow-up reminder.",
      step3Title: "Get Results",
      step3Desc: "Receive weekly summary reports with your new review count and customer feedback.",
      complianceTitle: "Compliance Guaranteed",
      complianceIntro: "We strictly follow Google's review guidelines and best practices:",
      compliancePoint1: "No incentives",
      compliancePoint2: "No review gating",
      compliancePoint3: "We ask all recent customers",
      compliancePoint4: "Clear opt-out in every email",
      complianceConsent: "We only use consented contact lists provided by you.",
      complianceNote: "All emails can be in English, Spanish, or both languages according to your preference.",
      complianceGoogleNote: "Google prohibits incentivized or gated reviews; we comply fully with all guidelines.",
      faqTitle: "Frequently Asked Questions",
      faqQuestion1: "Is this service compliant with Google's review policies?",
      faqAnswer1: "Yes, we strictly follow Google's review guidelines. We never offer incentives for reviews, don't gate reviews, and always include a clear opt-out option in every email we send.",
      faqQuestion2: "How quickly can I get started?",
      faqAnswer2: "After purchase, you'll complete a brief onboarding process. We'll launch your review request campaign within 48 hours, or 24 hours for the Rush/Pro package.",
      faqQuestion3: "What information do you need from me?",
      faqAnswer3: "We need your Google review link or QR code, a consented contact list of recent customers, your preferred sender email address, and your logo/brand tone information.",
      faqQuestion4: "How is customer data handled?",
      faqAnswer4: "We only use the contact list you provide and never share it with third parties. All customer data is securely stored and deleted after the campaign is complete.",
      faqQuestion5: "What email domain will be used to send requests?",
      faqAnswer5: "We can use your business email domain or our dedicated sending domain. Both options are configured for optimal deliverability and compliance.",
      faqQuestion6: "What kind of results can I expect?",
      faqAnswer6: "Results vary by industry and customer satisfaction, but our clients typically see a 20-40% increase in Google reviews within the first month of using our service.",
      contactTitle: "Ready to Get Started?",
      contactSubtitle: "Have questions? Reach out to our team for more information.",
      contactEmail: "Email Us",
      contactOnboarding: "Start Onboarding",
      contactTestNote: "Note: Stripe test links are for preview purposes only.",
      footerProduct: "Product",
      footerPackages: "Packages",
      footerHowItWorks: "How It Works",
      footerCompliance: "Compliance",
      footerCompany: "Company",
      footerFaq: "FAQ",
      footerContact: "Contact",
      footerLegal: "Legal",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms of Service",
      footerCopyright: "© 2023 Reviews Request Machine. All rights reserved.",
      footerComplianceNote: "Google prohibits incentivized or gated reviews; we comply fully."
    },
    es: {
      testBanner: "MODO DE PRUEBA — Todos los enlaces de pago son solo para fines de prueba",
      logo: "Máquina de Solicitud de Reseñas",
      navPackages: "Paquetes",
      navHowItWorks: "Cómo funciona",
      navCompliance: "Cumplimiento",
      navFaq: "Preguntas",
      navContact: "Contacto",
      heroTitle: "Máquina de Solicitud de Reseñas de Google (EN/ES)",
      heroSubtitle: "Convierta a los clientes felices del mes pasado en reseñas honestas de Google: cumplimiento, bilingüe, en vivo en 48 horas.",
      heroCtaStarter: "Obtener Starter – $99",
      heroCtaStandard: "Estándar – $199",
      heroCtaPro: "Rush/Pro – $299",
      socialProofTitle: "Lo Que Dicen Nuestros Clientes",
      packagesTitle: "Elija Su Paquete",
      packageStarterTitle: "Starter",
      packageStarterFeature1: "Hasta 100 solicitudes de reseña",
      packageStarterFeature2: "Inglés o español",
      packageStarterFeature3: "Configuración básica",
      packageStarterFeature4: "Soporte por correo electrónico",
      packageStarterCta: "Obtener Starter",
      packageStandardTitle: "Estándar",
      packageStandardFeature1: "Hasta 300 solicitudes de reseña",
      packageStandardFeature2: "Bilingüe (EN/ES)",
      packageStandardFeature3: "Marca personalizada",
      packageStandardFeature4: "Soporte prioritario",
      packageStandardCta: "Obtener Estándar",
      packageProTitle: "Rush/Pro",
      packageProFeature1: "Hasta 500 solicitudes de reseña",
      packageProFeature2: "Bilingüe (EN/ES)",
      packageProFeature3: "Configuración en 24 horas",
      packageProFeature4: "Soporte dedicado",
      packageProCta: "Obtener Rush/Pro",
      packageNote: "Completará una incorporación de 3 minutos después del pago.",
      howItWorksTitle: "Cómo Funciona",
      step1Title: "Compre e Incorpórese",
      step1Desc: "Seleccione su paquete y complete nuestro simple proceso de incorporación de 3 minutos.",
      step2Title: "Enviamos Solicitudes",
      step2Desc: "Enviamos solicitudes de reseña personalizadas a sus clientes con un recordatorio de seguimiento educado.",
      step3Title: "Obtenga Resultados",
      step3Desc: "Reciba informes de resumen semanales con su nuevo recuento de reseñas y comentarios de los clientes.",
      complianceTitle: "Cumplimiento Garantizado",
      complianceIntro: "Seguimos estrictamente las pautas y mejores prácticas de revisión de Google:",
      compliancePoint1: "Sin incentivos",
      compliancePoint2: "Sin bloqueo de reseñas",
      compliancePoint3: "Preguntamos a todos los clientes recientes",
      compliancePoint4: "Opción de exclusión clara en cada correo electrónico",
      complianceConsent: "Solo usamos listas de contactos consentidas proporcionadas por usted.",
      complianceNote: "Todos los correos electrónicos pueden estar en inglés, español o ambos idiomas según su preferencia.",
      complianceGoogleNote: "Google prohíbe las reseñas incentivadas o bloqueadas; cumplimos plenamente con todas las pautas.",
      faqTitle: "Preguntas Frecuentes",
      faqQuestion1: "¿Este servicio cumple con las políticas de reseñas de Google?",
      faqAnswer1: "Sí, seguimos estrictamente las pautas de reseñas de Google. Nunca ofrecemos incentivos para las reseñas, no bloqueamos las reseñas y siempre incluimos una opción clara de exclusión en cada correo electrónico que enviamos.",
      faqQuestion2: "¿Qué tan rápido puedo empezar?",
      faqAnswer2: "Después de la compra, completará un breve proceso de incorporación. Lanzaremos su campaña de solicitud de reseñas dentro de las 48 horas, o 24 horas para el paquete Rush/Pro.",
      faqQuestion3: "¿Qué información necesitan de mí?",
      faqAnswer3: "Necesitamos su enlace de reseña de Google o código QR, una lista de contactos consentidos de clientes recientes, su dirección de correo electrónico remitente preferida y su información de logo/tono de marca.",
      faqQuestion4: "¿Cómo se manejan los datos de los clientes?",
      faqAnswer4: "Solo usamos la lista de contactos que proporciona y nunca la compartimos con terceros. Todos los datos de los clientes se almacenan de forma segura y se eliminan después de que se completa la campaña.",
      faqQuestion5: "¿Qué dominio de correo electrónico se usará para enviar las solicitudes?",
      faqAnswer5: "Podemos usar su dominio de correo electrónico comercial o nuestro dominio de envío dedicado. Ambas opciones están configuradas para una capacidad de entrega y cumplimiento óptimos.",
      faqQuestion6: "¿Qué tipo de resultados puedo esperar?",
      faqAnswer6: "Los resultados varían según la industria y la satisfacción del cliente, pero nuestros clientes generalmente ven un aumento del 20-40% en las reseñas de Google dentro del primer mes de usar nuestro servicio.",
      contactTitle: "¿Listo para Empezar?",
      contactSubtitle: "¿Tiene preguntas? Comuníquese con nuestro equipo para obtener más información.",
      contactEmail: "Envíenos un Correo",
      contactOnboarding: "Comenzar Incorporación",
      contactTestNote: "Nota: Los enlaces de prueba de Stripe son solo para fines de vista previa.",
      footerProduct: "Producto",
      footerPackages: "Paquetes",
      footerHowItWorks: "Cómo Funciona",
      footerCompliance: "Cumplimiento",
      footerCompany: "Empresa",
      footerFaq: "Preguntas",
      footerContact: "Contacto",
      footerLegal: "Legal",
      footerPrivacy: "Política de Privacidad",
      footerTerms: "Términos de Servicio",
      footerCopyright: "© 2023 Máquina de Solicitud de Reseñas. Todos los derechos reservados.",
      footerComplianceNote: "Google prohíbe las reseñas incentivadas o bloqueadas; cumplimos plenamente."
    }
  };

  // Initialize language
  let currentLang = localStorage.getItem('lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update active button & aria
    const enBtn = document.getElementById('langEn');
    const esBtn = document.getElementById('langEs');
    if (enBtn && esBtn) {
      enBtn.classList.toggle('active', lang === 'en');
      esBtn.classList.toggle('active', lang === 'es');
      enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
      esBtn.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
    }

    // Update all text elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }

  // Initialize Lottie animation
  let lottieAnimation;
  function initLottie() {
    const heroLottie = document.getElementById('heroLottie');
    if (heroLottie && typeof lottie !== 'undefined') {
      lottieAnimation = lottie.loadAnimation({
        container: heroLottie,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_1pxqjqps.json'
      });
    }
  }

  // Initialize GSAP animations
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-content h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-content p', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-cta .btn', { y: 30, opacity: 0, duration: 1, delay: 0.4, stagger: 0.1, ease: 'power3.out' });

    // Parallax effect for hero background
    gsap.to('.hero-bg .circle:nth-child(1)', {
      y: -100,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero-bg .circle:nth-child(2)', {
      y: -50,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Section reveal animations
    gsap.utils.toArray('.social-proof, .packages, .how-it-works, .compliance, .faq, .contact').forEach((section) => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none none' }
      });
    });

    // Card animations
    gsap.utils.toArray('.testimonial-card, .package-card, .step').forEach((card) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%', end: 'bottom 10%', toggleActions: 'play none none none' }
      });
    });
  }

  // FAQ accordion
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        if (answer) answer.classList.toggle('active');

        // Close other open answers
        faqQuestions.forEach((other) => {
          if (other !== question && other.classList.contains('active')) {
            other.classList.remove('active');
            const sibling = other.nextElementSibling;
            if (sibling) sibling.classList.remove('active');
          }
        });
      });
    });
  }

  // Back to top
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const toggle = () => {
      if (window.pageYOffset > 900) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', toggle);
    toggle();

    const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.addEventListener('click', goTop);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goTop();
      }
    });
  }

  // Magnetic button effect (guard if gsap is present)
  function initMagneticButtons() {
    if (typeof gsap === 'undefined') return;
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * 10;
          gsap.to(button, { x: x * strength * 0.2, y: y * strength * 0.2, duration: 0.3 });
        }
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.3 });
      });
    });
  }

  // Card tilt (guard if gsap is present)
  function initCardTilt() {
    if (typeof gsap === 'undefined') return;
    const cards = document.querySelectorAll('.package-card, .testimonial-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        gsap.to(card, { rotateX, rotateY, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3 });
      });
    });
  }

  // Ripple effect for buttons
  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Confetti on primary CTAs (respect reduced motion)
  function createConfetti(e) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!e.target.classList.contains('btn-primary') || prefersReduced) return;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
    const confettiCount = 30;
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = e.clientX + 'px';
      confetti.style.top = e.clientY + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      confetti.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // Smooth scrolling for internal anchor links (guard invalid targets like href="#")
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return; // allow default for placeholders; avoid errors
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Bind button effects (after DOM is ready)
  function initButtons() {
    document.querySelectorAll('.btn').forEach((btn) => btn.addEventListener('click', createRipple));
    document.querySelectorAll('.btn-primary').forEach((btn) => btn.addEventListener('click', createConfetti));
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Language toggle events
    document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('langEs')?.addEventListener('click', () => setLanguage('es'));

    // Initialize selected language (from localStorage default)
    setLanguage(localStorage.getItem('lang') || 'en');

    initLottie();
    initGSAP();
    initFAQ();
    initBackToTop();
    initMagneticButtons();
    initCardTilt();
    initButtons();
    initSmoothScroll();
  });

  // Refresh ScrollTrigger on resize if available
  window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
      ScrollTrigger.refresh();
    }
  });
})();