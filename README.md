# Reviews Landing

A lightweight, bilingual (EN/ES) landing page for a Google Reviews request service. Built with plain HTML, CSS, and JavaScript. Animations via GSAP + ScrollTrigger and Lottie.

## Project structure

```
reviews-landing/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
└── assets/img/   (reserved for any local images you add later)
```

## How to run locally

Just open `index.html` in your browser. No build step is required.

> If testing locally from the file system and you see CORS warnings in the console, serve the folder with a simple HTTP server (e.g., `python -m http.server` from the project root) and then open `http://localhost:8000`.

## Deployment

- **GitHub Pages:** Push this folder to a repo and enable GitHub Pages (root). The canonical link in `index.html` already points to `https://chriscanino19.github.io/reviews-landing/`. Update it if your repo URL differs.
- **Any static host:** Upload the folder as-is.

## Notes

- Payment links are Stripe **test** links in the current markup.
- All copy is duplicated in English and Spanish; the language toggle persists using `localStorage`.
- External assets loaded from CDNs:
  - Google Fonts (Poppins)
  - GSAP and ScrollTrigger
  - lottie-web
- To go live, consider removing the test-mode banner and replacing any placeholder images or links as needed.
