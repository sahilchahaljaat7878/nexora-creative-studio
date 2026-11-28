# Haryana Creative

A premium, bilingual (English / हिन्दी) website for **Haryana Creative**, founded by **Sahil**.

Built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router, React Hook Form and Zod.

---

## Quick start

Requirements: **Node.js 18+** (Node 20 recommended) and npm.

```bash
npm install
npm run dev
```

`npm run dev` starts **both** processes:

- the Vite dev server → http://localhost:5173
- the API server (orders + admin) → http://localhost:8787 (proxied through Vite)

To create a production build:

```bash
npm run build
npm start
```

`npm start` serves the built site **and** the API from a single Node process on `PORT` (default 8787).

> The admin panel needs the API server, so it runs either as a Firebase Cloud Function
> (Blaze plan) or as a small Node server on any host. A purely static host shows the
> website, but the admin panel and order tracking need that API. See **Deployment**.

---

## Studio admin panel

**URL:** `http://localhost:5173/admin` (in production: `https://your-domain.com/admin`)

| Field | Value |
| --- | --- |
| Username | `sahil` |
| Password | `sahil7878` |

> Change the password before going live:
> ```bash
> npm run admin:password            # interactive
> npm run admin:password sahil newpassword
> ```
> The password is stored as a **scrypt hash** in `server/data/auth.json` (never in plain text) and the file is git-ignored. Sessions use a random token in an `httpOnly` cookie and expire after 8 hours.

### What the panel shows

- **Total orders, new, in progress, completed**
- **Enquiries** (contact-form submissions)
- **Payment received** (sum of all recorded advances) and **payment pending** (count + remaining amount)
- Every record with name, phone, email, country, service, package, price, description, delivery date, reference-file flags and a timestamp
- Per record: status, payment state, amount paid, internal note and delete

### How records are created

- The order form saves a copy of every submission to the studio records (and still opens WhatsApp with the prepared message).
- The contact form saves enquiries the same way.
- If the API is unreachable, the forms still work exactly as before (WhatsApp + copy/email) and the visitor is told the record could not be saved.

### Data & API

Records live in `server/data/records.json` (plain JSON, easy to back up or import into a spreadsheet).

| Method | Route | Access |
| --- | --- | --- |
| `POST` | `/api/records` | public (rate limited) |
| `POST` | `/api/admin/login` | public (rate limited) |
| `POST` | `/api/admin/logout` | admin |
| `GET` | `/api/admin/session` | admin |
| `GET` | `/api/admin/records` | admin |
| `PATCH` | `/api/admin/records/:id` | admin |
| `DELETE` | `/api/admin/records/:id` | admin |

---

## ⚠️ Configure before publishing

Contact details are already set for this studio. Two things still need real values before launch.

### 1. Live domain — `src/config/brand.ts`

```ts
websiteUrl: "https://your-domain.com",
```

Then update the domain in:

- `index.html` (canonical, Open Graph and Twitter URLs),
- `public/robots.txt` (sitemap URL),
- `public/sitemap.xml` (all `<loc>` values).

The Open Graph image is `public/favicon/og-image.png`.

### 2. Social links — `src/config/social.ts`

Instagram / YouTube / Facebook URLs. Empty links are rendered as disabled "coming soon" icons, so there are no dead links.

### Already configured — `src/config/contact.ts`

```ts
whatsappNumber: "918571056447",                  // country code 91 + number, digits only
email: "sahilchahaljaat7878@gmail.com",
location: "India",
workingHours: "Any time — messages answered as they arrive",
```

Because the WhatsApp number is configured, the site now:

- opens WhatsApp directly with the prepared message (`wa.me/918571056447`),
- shows the number and a `mailto:` link on the contact page,
- keeps the copy/email fallback available in every form,
- never claims that an order was placed or a message was delivered — WhatsApp is opened with a prepared message and the visitor still presses send.

If the number ever changes, update only `contact.whatsappNumber`; every button, link and message picks it up automatically.

---

## Content configuration

All site content is centralised so the design does not need to be edited for routine changes.

| What | File |
| --- | --- |
| Studio name, founder, tagline, domain | `src/config/brand.ts` |
| WhatsApp, email, hours, location | `src/config/contact.ts` |
| Social links (empty = hidden) | `src/config/social.ts` |
| Services, packages, descriptions, features | `src/config/services.ts` |
| **All prices** | `src/config/pricing.ts` |
| English + Hindi UI strings | `src/config/translations.ts` |
| FAQ content | `src/config/faq.ts` |
| Privacy Policy & Terms content | `src/config/legal.ts` |
| Portfolio items | `src/data/portfolio.ts` |
| Portfolio filters/gallery | `src/components/PortfolioGallery.tsx` |

### Prices

Every displayed price comes from `src/config/pricing.ts`. Change an amount once and all cards, menus, summaries and WhatsApp messages update.

```ts
"ai-photo-basic": { amount: 40, prefix: "fixed" },
"website-basic": { amount: 4999, prefix: "starting" },
"ai-video-premium": { amount: 1999, prefix: "onwards" },
"graphic-logo": { amount: null, prefix: "quote" }, // Contact for Price
```

Available prefixes: `fixed`, `starting`, `onwards`, `quote`.

The pricing note (`pricingNote`) and the service-specific notes (`pricingDisclaimers`) live in the same file. Fixed package prices are displayed exactly as configured — they are never re-labelled as "starting" prices.

### Services and packages

Each package in `src/config/services.ts` references a pricing key:

```ts
{
  pricingKey: "ai-photo-premium",
  name: { en: "Premium AI Photo", hi: "प्रीमियम AI फोटो" },
  description: { en: "...", hi: "..." },
  features: { en: ["..."], hi: ["..."] },
  popular: true,
}
```

To add a service, add its entry to `services`, add its packages and pricing keys, and update `src/types/index.ts` if a new icon or portfolio category is needed.

### Package samples (show what the price buys)

Any package can carry real sample outputs. They appear on the service card (next to the starting price), on the package card of the service page and on the pricing page.

```ts
{
  pricingKey: "ai-photo-basic",
  name: { en: "Basic AI Photo", hi: "बेसिक AI फोटो" },
  description: { en: "...", hi: "..." },
  features: { en: ["..."], hi: ["..."] },
  samples: [
    {
      src: "/images/samples/ai-photo-street.webp",
      alt: { en: "AI-generated portrait ...", hi: "..." },
    },
  ],
}
```

Put the image files in `public/images/samples/` (WebP keeps the page light) and add an entry to `samples`. The first package of a service is the one shown on the service card.

### Portfolio

`src/data/portfolio.ts` currently contains **sample concept work** created for this website. Each item is labelled as a sample in the gallery and lightbox.

When replacing with real work:

1. Put images in `public/images/portfolio/`.
2. Update `image`, `alt`, `title`, `description`, `category` and `tags`.
3. Update the `PortfolioItem` type and remove/adjust the sample badge when the work is no longer a sample.
4. Add a real video with `video: "/videos/file.mp4"` to enable the lightbox player.

### Social links

Add URLs in `src/config/social.ts`. Only configured links are rendered, so there are no dead links. Empty links show as disabled icons with a "coming soon" note.

---

## Bilingual behaviour

- English is the default; visitors can switch to Hindi with `EN | हिन्दी`.
- The switcher is in the header on every breakpoint (and again inside the mobile menu).
- The choice is stored in `localStorage` (`haryana-language`) and persists across navigation and reloads.
- All UI strings live in `src/config/translations.ts`. The Hindi dictionary is typed against the English keys, so a missing translation causes a TypeScript error.
- Service, pricing, FAQ, legal and portfolio copy is localized in their own config files.

---

## Order and contact forms

Both forms:

- validate with React Hook Form + Zod,
- build a readable, encoded WhatsApp message (`wa.me`),
- never upload files and never send data to a backend,
- show a copy/email fallback when WhatsApp is not configured,
- avoid false "order sent" claims.

The full order form (`src/components/forms/OrderForm.tsx`) supports:

- service/package prefill via `/order?service=ai-photo&package=ai-photo-premium`,
- three steps (service → project details → contact),
- optional image/video reference previews (JPG/PNG/WebP ≤ 5 MB, MP4/WebM/MOV ≤ 50 MB),
- delivery date, instructions, terms agreement,
- live order summary and WhatsApp message preview,
- successful-open and manual-fallback states.

Reference files are previewed locally with object URLs. After WhatsApp opens, the visitor must attach the file manually inside WhatsApp.

---

## SEO

- Per-page title, description, canonical, Open Graph and Twitter metadata via `src/hooks/useSeo.ts`.
- `public/robots.txt` and `public/sitemap.xml`.
- `public/favicon/` contains the SVG mark, PNG favicons and `og-image.png`.
- `public/site.webmanifest` for installable metadata.
- FAQ structured data is generated on the FAQ page.
- All routes are lazy-loaded.

Remember to replace the placeholder domain everywhere listed above before indexing.

---

## Project structure

```
src/
  components/
    forms/          OrderForm, ContactForm
    layout/         Navbar, Footer, LoadingScreen, ScrollToTop, WhatsAppFloat
    ui/             Button, PageHero, SectionHeading, Reveal, WhatsAppIcon
    ...             Hero, ServiceCard, PricingCard, PortfolioGallery, etc.
  config/           brand, contact, social, services, pricing, translations, faq, legal, types
  context/          LanguageContext
  data/             portfolio
  hooks/            useSeo, useUi
  layouts/          SiteLayout
  lib/              api, pricing, clipboard, serviceIcons, utils
  pages/            all route pages (incl. AdminPage)
  utils/            whatsapp message builders
  App.tsx
  main.tsx
server/             local Node API (JSON storage) - for local dev / Node hosts
functions/          Firebase Cloud Function API (Firestore storage) - for Firebase
public/
  favicon/          logo mark, favicons, og-image
  images/           generated SVG artwork for services, portfolio and studio
  robots.txt
  sitemap.xml
  site.webmanifest
scripts/
  dev.mjs               runs API + Vite together
  generate-assets.mjs   artwork generator
  set-admin-password.mjs
firebase.json       Hosting + Functions config
.firebaserc         Firebase project link
firestore.rules     Firestore security rules
```

---

## Custom artwork

The artwork in `public/images/` was generated specifically for this project as SVG (abstract AI portraits, product visuals, cinematic stills, banners, thumbnails, website mockups, identity boards, stationery, hero art and service images). It is not unrelated stock photography.

To regenerate the assets:

```bash
npm run assets
```

This uses `sharp` to render SVGs and produce the PNG favicons/OG image. The script is the source of truth for the committed artwork, so re-running it reproduces the same files. If a render step fails, run the script again; some systems exit silently when several SVGs are rendered in one process.

---

## Quality checks

The build was verified with an automated pass across **12 routes × 4 viewports (1440 / 1024 / 768 / 390 px)**:

- no console errors, no page errors, no failed requests,
- no horizontal overflow at any breakpoint,
- unique title, meta description and canonical URL on every page,
- every image loaded (no broken artwork),
- all 12 pages verified in Hindi as well as English, with no untranslated strings,
- both forms verified end-to-end (validation errors, prefill, reference-file preview, terms checkbox, prepared WhatsApp message and the fallback state),
- portfolio lightbox opens and closes with `Escape`, skip link is the first tab stop.

Lighthouse (mobile) scores **100 / 100 / 100** for accessibility, best practices and SEO on every route.

---

## Deployment

### Firebase Hosting (live site)

The project is already connected to Firebase project **`haryana-creative-studio`**.

```bash
npm run build                                   # build the site into dist/
firebase deploy --only hosting --project haryana-creative-studio
```

Live URL: **https://haryana-creative-studio.web.app** (also `https://haryana-creative-studio.firebaseapp.com`)

`firebase.json` handles the SPA routing (every route to `index.html`), long-term caching for `/assets/**`, security headers, and the `/api/**` rewrite that points at the Cloud Function.

### Firebase Cloud Functions + Firestore (admin panel & records)

The API that powers the admin panel and order tracking lives in `functions/`:

- `functions/index.js` - Express API (same routes as the local server) on Cloud Functions 2nd gen.
- Records go to the **Firestore** collection `records`.
- Sessions go to the Firestore collection `sessions`.
- Admin credentials go to the Firestore document `config/admin`, seeded on first run from `functions/data/auth.json`.

Deploy it with:

```bash
firebase deploy --only functions,firestore --project haryana-creative-studio
```

> **Cloud Functions require the Blaze (pay-as-you-go) plan.** Enable it once at
> https://console.firebase.google.com/project/haryana-creative-studio/usage/details
> (Blaze has a free tier - you only pay for actual usage), then run the command above.
> Until then the website works fully (WhatsApp + email fallback) and the admin panel
> shows a clear "API is not connected yet" notice instead of failing silently.

### Node server instead of Cloud Functions (works on the free plan)

Deploy the `server/` folder to any Node host (Render, Railway, Fly, VPS, Hostinger) and point Firebase Hosting at it.

In `firebase.json`, replace the `/api/**` function rewrite with your own API:

```jsonc
{ "source": "/api/**", "destination": "https://your-api-host.onrender.com/api/**" }
```

Keep the catch-all rewrite after it:

```jsonc
{ "source": "**", "destination": "/index.html" }
```

### Netlify

`public/_redirects` is included:

```
/* /index.html 200
```

Build command: `npm run build`  
Publish directory: `dist`

### Vercel

Use the Vite preset, or set:

- Build command: `npm run build`
- Output directory: `dist`

If the host asks for SPA rewrites, route all paths to `/index.html`.

### Any static host

Upload the contents of `dist/` and configure a fallback to `index.html` for client-side routes.
(Static hosting shows the site, but the admin panel and order tracking need the API server.)

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server + the API server together |
| `npm run dev:web` | Start only the Vite dev server |
| `npm run server` | Start only the API server (port 8787) |
| `npm run build` | Type-check and build for production |
| `npm start` | Serve the built site + API from one Node process |
| `npm run preview` | Preview the production build (static only) |
| `npm run typecheck` | Run TypeScript without emitting |
| `npm run assets` | Regenerate SVG/PNG artwork and favicons |
| `npm run admin:password` | Set or change the admin panel password |

---

## Notes and limitations

- There is no database service, payment gateway or file upload service. Orders are stored in a local JSON file on the server.
- Form submissions prepare a WhatsApp message and email draft; the site never claims an order is confirmed until the studio replies.
- Timelines, revisions and final quotations are intentionally not hard-coded; they are confirmed per project after brief review.
- The legal pages are general templates and are not legal advice. Review them with a qualified professional before relying on them.
- Placeholder contact details, domain and social links must be replaced before launch.
- `react-router-dom` stays on v6. The published advisories for the v6 line affect SSR hydration and user-supplied redirect targets; this site is a static client-rendered SPA with no SSR and no user-supplied URLs in `Link`.
