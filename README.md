# Reviews Landing — Pro Package

Static, bilingual, conversion‑focused landing page for the **Google Reviews Request Machine**.  
Built for **GitHub Pages** (no dependencies).

## Quick start
1) Upload the `reviews-landing-pro/` folder to your GitHub repo (root).  
2) Enable **Settings → Pages** → `main` branch → `/root`.  
3) Open your site URL (e.g., `https://USERNAME.github.io/REPO/`).

## Customize
- Replace Stripe links in `index.html` or set via global `window.STRIPE_LINKS`.
- Update contact email in the **Contact** section.
- Swap test to live: use live Stripe Payment Links and the test banner will auto-hide when links no longer contain `/test_`.

## Structure
- `index.html` — page markup
- `assets/css/style.css` — styles, animations, responsive
- `assets/js/main.js` — language toggle, smooth scroll, reveal effects, sticky CTA
- `assets/img/` — SVG logo and icons

## Notes
- Accessibility: keyboard focus styles, color contrast, reduced motion friendly.
- Compliance copy retained: **no incentives / no gating / opt‑out**.
- All assets are local, no external CDNs or frameworks.
