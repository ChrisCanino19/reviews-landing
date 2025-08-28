# Reviews Landing (Pro)

Polished, animated, fully static landing (EN/ES) for **Google Reviews Request Machine**.  
Compatible with **GitHub Pages** (no build step).

## Features
- Bilingual toggle (EN/ES) with `localStorage` memory.
- Pricing cards with Stripe links.
- Scroll reveal animations, sticky header, scroll progress bar.
- Compliance copy (no incentives, no gating).

## File tree
```
reviews-landing-pro/
├─ index.html
├─ assets/
│  ├─ css/styles.css
│  └─ js/app.js
└─ README.md
```

## Configure
Open `index.html` and edit `window.APP_CONFIG`:
```html
<script>
  window.APP_CONFIG = {
    stripe: {
      starter: "https://buy.stripe.com/test_cNi28qbzv57e8nfaJO2sM00",
      standard: "https://buy.stripe.com/test_28E28qgTP1V27jb6ty2sM01",
      pro: "https://buy.stripe.com/test_cNi6oGcDz2Z6gTLcRW2sM02"
    },
    onboardingURL: "#"
  };
</script>
```

- Replace test Stripe links with **LIVE** links when your Stripe account is activated.
- Add your `onboardingURL` (e.g., Tally/Typeform) when ready.
- The yellow **TEST MODE** banner shows automatically if a Stripe link contains `/test_`.

## Deploy (GitHub Pages)
1. Create/choose a repo (e.g., `reviews-landing`).
2. Copy these files to the repo root.
3. In **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/root`.
4. Commit & push. Pages will publish in ~1 minute.

## Customization
- Colors & layout: `assets/css/styles.css`.
- Text: use the i18n keys in HTML and translations in `assets/js/app.js`.
- Buttons: plan buttons read URLs from `window.APP_CONFIG.stripe`.

## Compliance
Keep the on-page copy: **No incentives**, **No gating**, clear **opt‑out** and **postal address** in emails.
