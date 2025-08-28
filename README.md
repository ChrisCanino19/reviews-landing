# Reviews Landing — Packaged

This ZIP contains a production-ready project structure for the **Google Reviews Request Machine (EN/ES)** landing page.

## File tree
```
reviews-landing/
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── main.js
```

## Notes & fixes applied
- **Bug fix:** Smooth scroll now ignores placeholder links (`href="#"`) to avoid a browser error.
- **Resilience:** All GSAP-powered effects (magnetic buttons, card tilt) are guarded so the page degrades gracefully if GSAP fails to load.
- **Resize safety:** `ScrollTrigger.refresh()` is called only if the plugin is available.
- **Confetti CSS:** Removed duplicate `position` declaration; confetti is now fixed to the viewport as intended.
- **Security:** Added `rel="noopener noreferrer"` to all `target="_blank"` links.
- **A11y:** Added focus-visible styles, ARIA labels/pressed states for the language toggles, and keyboard support for Back-to-Top.
- **Utilities:** Added missing `.text-center`, `.mt-3`, and `.btn-block` classes used in the markup.
- **Performance:** External libraries are loaded with `defer`; custom JS/CSS are split into `assets/`.

## TODOs
- Replace the `#` placeholder in **Start Onboarding** with the real onboarding URL when available.
- Optionally swap the Open Graph placeholder image for a real, absolute URL hosted on your domain.
