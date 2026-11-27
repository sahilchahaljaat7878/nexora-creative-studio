/**
 * Asset generator for Haryana Creative.
 * Creates the custom SVG artwork used across the site, plus PNG favicons
 * and the Open Graph image via sharp.
 *
 * Run with: npm run assets
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const imgDir = path.join(root, "public", "images");
const portfolioDir = path.join(imgDir, "portfolio");
const servicesDir = path.join(imgDir, "services");
const faviconDir = path.join(root, "public", "favicon");

for (const dir of [imgDir, portfolioDir, servicesDir, faviconDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const C = {
  bg: "#08080D",
  deep: "#0A0712",
  surface: "#11111B",
  purple: "#8B5CF6",
  violet: "#A855F7",
  indigo: "#6366F1",
  pink: "#EC4899",
  cyan: "#22D3EE",
  amber: "#F59E0B",
  white: "#FFFFFF",
  muted: "#A1A1AA",
};

const UI = "Segoe UI, Helvetica Neue, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function text({
  x,
  y,
  size,
  fill = C.white,
  opacity = 1,
  weight = 600,
  spacing = 0,
  anchor = "start",
  family = UI,
  children,
}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" opacity="${opacity}" letter-spacing="${spacing}" text-anchor="${anchor}">${esc(children)}</text>`;
}

function grain(id, opacity = 0.35) {
  return `<filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-${id})" opacity="${opacity}" style="mix-blend-mode:overlay" />`;
}

function frame(w, h, id, opacity = 0.1) {
  return `<rect x="26" y="26" width="${w - 52}" height="${h - 52}" rx="4" fill="none" stroke="${C.white}" stroke-opacity="${opacity}" />`;
}

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
${body}
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* AI PHOTO — abstract editorial portrait                              */
/* ------------------------------------------------------------------ */
function aiPortrait({ id, a = C.violet, b = C.pink, label = "NEON STUDY", index = "01", warm = false }) {
  const bgTop = warm ? "#1B0A16" : "#100722";
  const bgBottom = warm ? "#0B050B" : "#07060D";
  const headCx = 400;
  return svg(
    800,
    1000,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stop-color="${bgTop}" />
        <stop offset="1" stop-color="${bgBottom}" />
      </linearGradient>
      <radialGradient id="glowA-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${a}" stop-opacity="0.55" />
        <stop offset="1" stop-color="${a}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowB-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${b}" stop-opacity="0.4" />
        <stop offset="1" stop-color="${b}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="fig-${id}" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0" stop-color="#251538" />
        <stop offset="0.5" stop-color="#130B20" />
        <stop offset="1" stop-color="#08050E" />
      </linearGradient>
      <linearGradient id="rim-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a}" stop-opacity="0" />
        <stop offset="0.35" stop-color="${b}" stop-opacity="0.95" />
        <stop offset="0.75" stop-color="${a}" stop-opacity="0.8" />
        <stop offset="1" stop-color="${C.indigo}" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="beam-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.white}" stop-opacity="0.16" />
        <stop offset="1" stop-color="${C.white}" stop-opacity="0" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="55" /></filter>
      <filter id="soft-${id}"><feGaussianBlur stdDeviation="14" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
      </filter>
    </defs>

    <rect width="800" height="1000" fill="url(#bg-${id})" />
    <ellipse cx="590" cy="270" rx="330" ry="330" fill="url(#glowA-${id})" filter="url(#blur-${id})" />
    <ellipse cx="180" cy="720" rx="300" ry="300" fill="url(#glowB-${id})" filter="url(#blur-${id})" />

    <g opacity="0.5">
      <circle cx="400" cy="470" r="300" stroke="${C.white}" stroke-opacity="0.08" fill="none" />
      <circle cx="400" cy="470" r="360" stroke="${C.white}" stroke-opacity="0.05" fill="none" />
      <ellipse cx="400" cy="470" rx="390" ry="120" stroke="${a}" stroke-opacity="0.18" fill="none" transform="rotate(-18 400 470)" />
      <ellipse cx="400" cy="470" rx="390" ry="120" stroke="${b}" stroke-opacity="0.12" fill="none" transform="rotate(24 400 470)" />
    </g>

    <rect x="560" y="120" width="150" height="620" fill="url(#beam-${id})" transform="rotate(18 635 430)" opacity="0.5" filter="url(#soft-${id})" />

    <g>
      <path d="M120 1000 C140 826 248 736 400 736 C552 736 660 826 680 1000 Z" fill="url(#fig-${id})" />
      <path d="M348 596 L452 596 L452 716 L400 752 L348 716 Z" fill="#120A1D" />
      <ellipse cx="${headCx}" cy="452" rx="146" ry="196" fill="url(#fig-${id})" />
      <path d="M254 424 C248 292 318 236 400 236 C482 236 552 292 546 424 C520 334 470 296 400 296 C330 296 280 334 254 424 Z" fill="#0B0713" />
      <path d="M504 286 C552 356 558 452 526 540 C508 588 484 620 452 646" stroke="url(#rim-${id})" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9" />
      <path d="M536 790 C606 838 654 910 672 1000" stroke="url(#rim-${id})" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.45" />
      <path d="M352 610 C374 626 426 626 448 610" stroke="${C.white}" stroke-opacity="0.12" stroke-width="2" fill="none" />
      <ellipse cx="336" cy="500" rx="18" ry="34" fill="${C.white}" opacity="0.05" filter="url(#soft-${id})" />
    </g>

    <g opacity="0.8">
      <circle cx="612" cy="196" r="3" fill="${b}" />
      <circle cx="660" cy="236" r="1.6" fill="${C.white}" opacity="0.6" />
      <circle cx="196" cy="300" r="2" fill="${a}" />
      <circle cx="228" cy="640" r="1.5" fill="${C.white}" opacity="0.4" />
    </g>

    ${frame(800, 1000, id, 0.1)}
    <g>
      <text x="52" y="86" font-family="${UI}" font-size="13" letter-spacing="5" fill="${C.white}" opacity="0.7">HARYANA — AI STUDY</text>
      <text x="52" y="920" font-family="${UI}" font-size="12" letter-spacing="4" fill="${C.muted}">GENERATIVE PORTRAIT</text>
      <text x="52" y="956" font-family="${UI}" font-size="38" font-weight="700" letter-spacing="1" fill="${C.white}">${esc(label)}</text>
      <text x="748" y="956" font-family="${UI}" font-size="12" letter-spacing="4" fill="${a}" text-anchor="end">${esc(index)}</text>
    </g>

    <rect width="800" height="1000" filter="url(#grain-${id})" opacity="0.3" style="mix-blend-mode:overlay" />
    <rect width="800" height="1000" fill="url(#bg-${id})" opacity="0.05" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* AI PHOTO 02 — product visual                                        */
/* ------------------------------------------------------------------ */
function productVisual() {
  const id = "product";
  return svg(
    800,
    1000,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1B1130" /><stop offset="0.55" stop-color="#0B0814" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <radialGradient id="halo-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.violet}" stop-opacity="0.65" />
        <stop offset="0.6" stop-color="${C.indigo}" stop-opacity="0.2" />
        <stop offset="1" stop-color="${C.indigo}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="bottle-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#E9D5FF" /><stop offset="0.3" stop-color="${C.violet}" />
        <stop offset="0.62" stop-color="#4C1D95" /><stop offset="1" stop-color="#170B27" />
      </linearGradient>
      <linearGradient id="cap-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#2B1B42" /><stop offset="0.5" stop-color="#8B7AA8" /><stop offset="1" stop-color="#1A1026" />
      </linearGradient>
      <linearGradient id="floor-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#A855F7" stop-opacity="0.28" /><stop offset="1" stop-color="#08080D" stop-opacity="0" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="45" /></filter>
      <filter id="glow-${id}"><feGaussianBlur stdDeviation="18" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.45" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="800" height="1000" fill="url(#bg-${id})" />
    <circle cx="400" cy="430" r="330" fill="url(#halo-${id})" filter="url(#blur-${id})" />
    <g opacity="0.35">
      <circle cx="400" cy="430" r="250" stroke="${C.white}" stroke-opacity="0.12" fill="none" />
      <circle cx="400" cy="430" r="310" stroke="${C.white}" stroke-opacity="0.08" fill="none" />
      <ellipse cx="400" cy="720" rx="300" ry="70" stroke="${C.violet}" stroke-opacity="0.3" fill="none" />
    </g>
    <ellipse cx="400" cy="782" rx="270" ry="60" fill="url(#floor-${id})" filter="url(#blur-${id})" />
    <g>
      <rect x="322" y="238" width="156" height="60" rx="16" fill="url(#cap-${id})" />
      <rect x="338" y="290" width="124" height="30" rx="8" fill="#0F0A18" opacity="0.7" />
      <path d="M300 360 C300 330 330 320 356 316 L444 316 C470 320 500 330 500 360 L500 690 C500 748 456 780 400 780 C344 780 300 748 300 690 Z" fill="url(#bottle-${id})" />
      <path d="M336 360 C336 345 352 338 368 336 L400 336 L400 764 C356 760 336 730 336 690 Z" fill="${C.white}" opacity="0.12" />
      <rect x="354" y="470" width="92" height="132" rx="4" fill="#0C0714" opacity="0.55" />
      <text x="400" y="512" font-family="${UI}" font-size="11" letter-spacing="3" fill="${C.white}" opacity="0.8" text-anchor="middle">AURA</text>
      <text x="400" y="536" font-family="${UI}" font-size="8" letter-spacing="2" fill="${C.muted}" text-anchor="middle">ESSENCE No. 04</text>
      <path d="M388 560 h24" stroke="${C.violet}" stroke-width="1.5" opacity="0.8" />
      <ellipse cx="470" cy="400" rx="12" ry="90" fill="${C.white}" opacity="0.18" filter="url(#glow-${id})" />
    </g>
    <g opacity="0.9">
      <circle cx="250" cy="250" r="2.4" fill="${C.violet}" />
      <circle cx="640" cy="330" r="1.8" fill="${C.white}" opacity="0.6" />
      <circle cx="560" cy="180" r="1.5" fill="${C.pink}" />
    </g>
    ${frame(800, 1000, id)}
    <text x="52" y="86" font-family="${UI}" font-size="13" letter-spacing="5" fill="${C.white}" opacity="0.7">HARYANA — AI STUDY</text>
    <text x="52" y="920" font-family="${UI}" font-size="12" letter-spacing="4" fill="${C.muted}">PRODUCT LIGHTING</text>
    <text x="52" y="956" font-family="${UI}" font-size="38" font-weight="700" letter-spacing="1" fill="${C.white}">AURORA</text>
    <text x="748" y="956" font-family="${UI}" font-size="12" letter-spacing="4" fill="${C.violet}" text-anchor="end">02</text>
    <rect width="800" height="1000" filter="url(#grain-${id})" opacity="0.28" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* AI VIDEO — cinematic landscape                                      */
/* ------------------------------------------------------------------ */
function cinematic({ id, title, subtitle, timecode, palette }) {
  const [sky1, sky2, sun1, sun2] = palette;
  return svg(
    1600,
    900,
    `<defs>
      <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky1}" /><stop offset="0.52" stop-color="${sky2}" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <radialGradient id="sun-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${sun1}" /><stop offset="0.55" stop-color="${sun2}" stop-opacity="0.85" /><stop offset="1" stop-color="${sun2}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="ridgeA-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1B0D2B" /><stop offset="1" stop-color="#0A0611" />
      </linearGradient>
      <linearGradient id="ridgeB-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0E0717" /><stop offset="1" stop-color="#06050A" />
      </linearGradient>
      <linearGradient id="water-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${sky2}" stop-opacity="0.5" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="42" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1600" height="900" fill="url(#sky-${id})" />
    <circle cx="1080" cy="350" r="330" fill="url(#sun-${id})" />
    <circle cx="1080" cy="350" r="88" fill="${sun1}" opacity="0.92" />
    <g opacity="0.4">
      <rect x="0" y="250" width="1600" height="2" fill="${C.white}" opacity="0.1" />
      <rect x="0" y="300" width="1600" height="1" fill="${C.white}" opacity="0.06" />
    </g>
    <ellipse cx="700" cy="420" rx="620" ry="120" fill="${sun2}" opacity="0.08" filter="url(#blur-${id})" />
    <path d="M0 560 L180 500 L320 545 L470 470 L640 540 L780 495 L960 560 L1120 520 L1290 565 L1440 515 L1600 555 L1600 900 L0 900 Z" fill="url(#ridgeA-${id})" />
    <path d="M0 650 L200 590 L400 640 L560 575 L760 650 L980 600 L1200 655 L1400 600 L1600 650 L1600 900 L0 900 Z" fill="url(#ridgeB-${id})" opacity="0.95" />
    <rect x="0" y="660" width="1600" height="240" fill="url(#water-${id})" />
    <g opacity="0.65">
      <rect x="960" y="690" width="240" height="3" fill="${sun1}" opacity="0.5" />
      <rect x="900" y="720" width="360" height="2" fill="${sun2}" opacity="0.35" />
      <rect x="1010" y="748" width="150" height="2" fill="${sun1}" opacity="0.3" />
      <rect x="860" y="778" width="440" height="1.5" fill="${C.white}" opacity="0.1" />
      <rect x="980" y="812" width="220" height="1.5" fill="${sun1}" opacity="0.2" />
    </g>
    <rect width="1600" height="64" fill="#05050A" />
    <rect y="836" width="1600" height="64" fill="#05050A" />
    <g>
      <text x="84" y="758" font-family="${UI}" font-size="15" letter-spacing="8" fill="${C.white}" opacity="0.65">HARYANA — AI FILM</text>
      <text x="84" y="806" font-family="${UI}" font-size="76" font-weight="700" letter-spacing="4" fill="${C.white}">${esc(title)}</text>
      <text x="1516" y="806" font-family="${UI}" font-size="15" letter-spacing="4" fill="${C.muted}" text-anchor="end">${esc(timecode)}</text>
    </g>
    <g opacity="0.85">
      <circle cx="1490" cy="120" r="30" fill="none" stroke="${C.white}" stroke-opacity="0.4" />
      <path d="M1484 108 L1502 120 L1484 132 Z" fill="${C.white}" opacity="0.9" />
      <text x="1490" y="180" font-family="${UI}" font-size="10" letter-spacing="3" fill="${C.white}" opacity="0.6" text-anchor="middle">AI FILM</text>
    </g>
    <text x="84" y="66" font-family="${UI}" font-size="11" letter-spacing="6" fill="${C.white}" opacity="0.45">${esc(subtitle)}</text>
    <text x="1516" y="66" font-family="${UI}" font-size="11" letter-spacing="6" fill="${C.white}" opacity="0.45" text-anchor="end">16:9 — 4K</text>
    <rect width="1600" height="900" filter="url(#grain-${id})" opacity="0.26" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* BANNER 01 — festive campaign                                        */
/* ------------------------------------------------------------------ */
function festiveBanner() {
  const id = "fest";
  return svg(
    1200,
    800,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#160B22" /><stop offset="0.55" stop-color="#0B0713" /><stop offset="1" stop-color="#1A0C18" />
      </linearGradient>
      <radialGradient id="warm-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#F59E0B" stop-opacity="0.55" /><stop offset="1" stop-color="#F59E0B" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="pink-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#EC4899" stop-opacity="0.45" /><stop offset="1" stop-color="#EC4899" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="prod-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FDE68A" /><stop offset="0.45" stop-color="#F59E0B" /><stop offset="1" stop-color="#7C2D12" />
      </linearGradient>
      <linearGradient id="type-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FFFFFF" /><stop offset="1" stop-color="#FDE68A" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="60" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="800" fill="url(#bg-${id})" />
    <circle cx="960" cy="200" r="360" fill="url(#warm-${id})" filter="url(#blur-${id})" />
    <circle cx="760" cy="700" r="320" fill="url(#pink-${id})" filter="url(#blur-${id})" />
    <g opacity="0.16" stroke="${C.white}" stroke-width="1">
      <path d="M0 650 H1200" /><path d="M0 690 H1200" /><path d="M0 730 H1200" />
      <path d="M120 800 V560" /><path d="M240 800 V560" /><path d="M360 800 V560" /><path d="M480 800 V560" />
    </g>
    <g>
      <circle cx="960" cy="360" r="190" fill="none" stroke="${C.amber}" stroke-opacity="0.35" />
      <circle cx="960" cy="360" r="235" fill="none" stroke="${C.amber}" stroke-opacity="0.15" />
      <ellipse cx="960" cy="660" rx="190" ry="34" fill="#000000" opacity="0.45" filter="url(#blur-${id})" />
      <rect x="900" y="290" width="120" height="330" rx="56" fill="url(#prod-${id})" />
      <rect x="922" y="330" width="22" height="240" rx="11" fill="${C.white}" opacity="0.28" />
      <rect x="924" y="230" width="72" height="70" rx="20" fill="#2A1606" opacity="0.9" />
      <rect x="944" y="248" width="32" height="34" rx="4" fill="${C.amber}" opacity="0.5" />
    </g>
    <g>
      <text x="84" y="104" font-family="${UI}" font-size="13" letter-spacing="6" fill="${C.white}" opacity="0.8">AURA — SEASON 2026</text>
      <text x="84" y="330" font-family="${UI}" font-size="150" font-weight="700" letter-spacing="-5" fill="url(#type-${id})">FESTIVE</text>
      <text x="84" y="474" font-family="${UI}" font-size="150" font-weight="700" letter-spacing="-5" fill="none" stroke="${C.amber}" stroke-width="2">EDIT</text>
      <text x="90" y="540" font-family="${UI}" font-size="16" letter-spacing="6" fill="${C.white}" opacity="0.68">NEW SEASON COLLECTION</text>
      <rect x="84" y="602" width="238" height="58" rx="29" fill="${C.white}" />
      <text x="203" y="638" font-family="${UI}" font-size="13" font-weight="700" letter-spacing="3" fill="#120A18" text-anchor="middle">SHOP THE EDIT →</text>
      <text x="84" y="742" font-family="${UI}" font-size="11" letter-spacing="4" fill="${C.muted}">CAMPAIGN CONCEPT / SOCIAL &amp; PRINT</text>
    </g>
    <rect x="24" y="24" width="1152" height="752" fill="none" stroke="${C.white}" stroke-opacity="0.1" />
    <rect width="1200" height="800" filter="url(#grain-${id})" opacity="0.24" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* BANNER 02 — launch week                                             */
/* ------------------------------------------------------------------ */
function launchBanner() {
  const id = "launch";
  return svg(
    1200,
    800,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0A0A1A" /><stop offset="0.5" stop-color="#111133" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <linearGradient id="beam-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.indigo}" stop-opacity="0.8" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0.1" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.indigo}" stop-opacity="0.5" /><stop offset="1" stop-color="${C.indigo}" stop-opacity="0" />
      </radialGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="50" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="800" fill="url(#bg-${id})" />
    <circle cx="900" cy="420" r="420" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <g transform="rotate(-28 900 400)">
      <rect x="640" y="-200" width="120" height="1200" fill="url(#beam-${id})" opacity="0.35" />
      <rect x="820" y="-200" width="24" height="1200" fill="${C.cyan}" opacity="0.35" />
      <rect x="900" y="-200" width="3" height="1200" fill="${C.white}" opacity="0.4" />
    </g>
    <g opacity="0.2" stroke="${C.white}">
      <circle cx="930" cy="390" r="180" fill="none" /><circle cx="930" cy="390" r="260" fill="none" />
      <circle cx="930" cy="390" r="340" fill="none" />
    </g>
    <g>
      <text x="84" y="104" font-family="${UI}" font-size="13" letter-spacing="6" fill="${C.white}" opacity="0.72">HARYANA — CAMPAIGN 01</text>
      <text x="80" y="330" font-family="${UI}" font-size="158" font-weight="800" letter-spacing="-6" fill="${C.white}">LAUNCH</text>
      <text x="80" y="470" font-family="${UI}" font-size="158" font-weight="300" letter-spacing="18" fill="${C.cyan}">WEEK</text>
      <rect x="84" y="530" width="420" height="1" fill="${C.white}" opacity="0.24" />
      <text x="84" y="576" font-family="${UI}" font-size="14" letter-spacing="4" fill="${C.muted}">A NEW IDENTITY. A CLEARER SIGNAL.</text>
      <text x="84" y="704" font-family="${UI}" font-size="12" letter-spacing="5" fill="${C.white}" opacity="0.55">ADVERTISING CONCEPT — DIGITAL &amp; OOH</text>
    </g>
    <g>
      <circle cx="1050" cy="620" r="66" fill="${C.white}" />
      <path d="M1034 594 L1074 620 L1034 646 Z" fill="#0A0A18" />
      <text x="1050" y="716" font-family="${UI}" font-size="11" letter-spacing="4" fill="${C.white}" opacity="0.6" text-anchor="middle">WATCH THE FILM</text>
    </g>
    <rect x="24" y="24" width="1152" height="752" fill="none" stroke="${C.white}" stroke-opacity="0.1" />
    <rect width="1200" height="800" filter="url(#grain-${id})" opacity="0.24" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* YOUTUBE THUMBNAIL 01                                                */
/* ------------------------------------------------------------------ */
function youtubeThumb() {
  const id = "yt1";
  return svg(
    1280,
    720,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1A0726" /><stop offset="0.55" stop-color="#0B0612" /><stop offset="1" stop-color="#120A2C" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.violet}" stop-opacity="0.55" /><stop offset="1" stop-color="${C.violet}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="ring-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.violet}" /><stop offset="0.6" stop-color="${C.indigo}" /><stop offset="1" stop-color="${C.pink}" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="45" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg-${id})" />
    <circle cx="1000" cy="330" r="330" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <g opacity="0.14" stroke="${C.white}">
      <path d="M0 180 H1280" /><path d="M0 360 H1280" /><path d="M0 540 H1280" />
      <path d="M320 0 V720" /><path d="M640 0 V720" /><path d="M960 0 V720" />
    </g>
    <g>
      <circle cx="1030" cy="340" r="150" fill="none" stroke="url(#ring-${id})" stroke-width="34" opacity="0.9" />
      <circle cx="1030" cy="340" r="94" fill="#0D0715" stroke="${C.white}" stroke-opacity="0.18" />
      <path d="M1008 302 L1072 340 L1008 378 Z" fill="${C.white}" />
      <circle cx="1188" cy="220" r="10" fill="${C.pink}" />
      <circle cx="880" cy="510" r="6" fill="${C.cyan}" />
    </g>
    <text x="76" y="118" font-family="${UI}" font-size="18" letter-spacing="8" fill="${C.violet}">THE CREATIVE LAB</text>
    <text x="72" y="300" font-family="${UI}" font-size="128" font-weight="300" letter-spacing="6" fill="${C.white}" opacity="0.92">DESIGN</text>
    <text x="72" y="438" font-family="${UI}" font-size="142" font-weight="800" letter-spacing="-4" fill="${C.white}">SMARTER.</text>
    <rect x="74" y="486" width="300" height="8" rx="4" fill="${C.violet}" />
    <text x="76" y="552" font-family="${UI}" font-size="19" letter-spacing="4" fill="${C.muted}">AI + DESIGN WORKFLOW — EP. 04</text>
    <g>
      <rect x="76" y="618" width="42" height="42" rx="21" fill="${C.violet}" />
      <text x="97" y="646" font-family="${UI}" font-size="17" font-weight="800" fill="#0B0612" text-anchor="middle">N</text>
      <text x="132" y="634" font-family="${UI}" font-size="13" font-weight="700" letter-spacing="2" fill="${C.white}">HARYANA STUDIO</text>
      <text x="132" y="650" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">CREATIVE DIGITAL SOLUTIONS</text>
    </g>
    <rect x="1190" y="606" width="40" height="42" rx="6" fill="none" stroke="${C.white}" stroke-opacity="0.4" />
    <text x="1210" y="632" font-family="${UI}" font-size="12" font-weight="700" fill="${C.white}" text-anchor="middle">4K</text>
    <rect x="26" y="26" width="1228" height="668" fill="none" stroke="${C.white}" stroke-opacity="0.12" />
    <rect width="1280" height="720" filter="url(#grain-${id})" opacity="0.22" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* YOUTUBE THUMBNAIL 02 — channel art                                  */
/* ------------------------------------------------------------------ */
function youtubeChannel() {
  const id = "yt2";
  return svg(
    1280,
    720,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0A0D18" /><stop offset="0.5" stop-color="#0F0B1C" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.cyan}" stop-opacity="0.35" /><stop offset="1" stop-color="${C.cyan}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="line-${id}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${C.cyan}" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="55" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg-${id})" />
    <circle cx="1010" cy="250" r="300" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <g opacity="0.16" stroke="${C.white}">
      <path d="M80 120 H1200" /><path d="M80 600 H1200" />
      <path d="M1120 100 V620" /><path d="M120 100 V620" />
    </g>
    <text x="80" y="126" font-family="${UI}" font-size="12" letter-spacing="7" fill="${C.cyan}">HARYANA STUDIO — CHANNEL ART</text>
    <text x="76" y="368" font-family="${UI}" font-size="120" font-weight="300" letter-spacing="4" fill="${C.white}">STUDIO</text>
    <text x="76" y="520" font-family="${UI}" font-size="150" font-weight="800" letter-spacing="-2" fill="${C.white}">DIARIES</text>
    <rect x="80" y="552" width="560" height="2" fill="url(#line-${id})" />
    <text x="80" y="604" font-family="${UI}" font-size="16" letter-spacing="5" fill="${C.muted}">PROCESS · DESIGN · BEHIND THE SCENES</text>
    <g transform="translate(1000 380)">
      <circle r="130" fill="none" stroke="${C.cyan}" stroke-opacity="0.5" />
      <circle r="86" fill="none" stroke="${C.white}" stroke-opacity="0.2" />
      <circle r="42" fill="${C.cyan}" opacity="0.14" />
      <path d="M-22 -30 L44 0 L-22 30 Z" fill="${C.white}" opacity="0.9" />
      <circle cx="160" cy="-140" r="6" fill="${C.purple}" />
      <circle cx="-150" cy="120" r="4" fill="${C.cyan}" />
    </g>
    <g>
      <rect x="80" y="646" width="34" height="34" rx="17" fill="${C.purple}" />
      <text x="97" y="669" font-family="${UI}" font-size="14" font-weight="800" fill="#07060D" text-anchor="middle">N</text>
      <text x="126" y="668" font-family="${UI}" font-size="13" letter-spacing="3" fill="${C.white}" opacity="0.8">@HARYANASTUDIO</text>
    </g>
    <rect x="24" y="24" width="1232" height="672" fill="none" stroke="${C.white}" stroke-opacity="0.1" />
    <rect width="1280" height="720" filter="url(#grain-${id})" opacity="0.2" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* WEBSITE 01 — dark portfolio                                         */
/* ------------------------------------------------------------------ */
function websiteDark() {
  const id = "web1";
  return svg(
    1440,
    950,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0B0B14" /><stop offset="1" stop-color="#07070D" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.purple}" stop-opacity="0.5" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="orb-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#C4B5FD" /><stop offset="0.5" stop-color="${C.violet}" /><stop offset="1" stop-color="#312E81" />
      </linearGradient>
      <linearGradient id="card-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1A1430" /><stop offset="1" stop-color="#0C0918" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="55" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1440" height="950" fill="#05050A" />
    <rect x="60" y="48" width="1320" height="854" rx="18" fill="url(#bg-${id})" stroke="${C.white}" stroke-opacity="0.12" />
    <rect x="60" y="48" width="1320" height="46" rx="18" fill="#12121C" />
    <rect x="60" y="76" width="1320" height="18" fill="#12121C" />
    <circle cx="88" cy="71" r="5" fill="#F87171" /><circle cx="106" cy="71" r="5" fill="#FBBF24" /><circle cx="124" cy="71" r="5" fill="#34D399" />
    <rect x="540" y="61" width="360" height="20" rx="10" fill="${C.white}" opacity="0.06" />
    <text x="720" y="75" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.muted}" text-anchor="middle">lumen.studio</text>
    <g>
      <circle cx="1070" cy="330" r="300" fill="url(#glow-${id})" filter="url(#blur-${id})" />
      <circle cx="1120" cy="320" r="190" fill="url(#orb-${id})" opacity="0.9" />
      <circle cx="1120" cy="320" r="190" fill="none" stroke="${C.white}" stroke-opacity="0.2" />
      <ellipse cx="1120" cy="320" rx="250" ry="80" fill="none" stroke="${C.violet}" stroke-opacity="0.5" transform="rotate(-18 1120 320)" />
      <ellipse cx="1120" cy="320" rx="300" ry="60" fill="none" stroke="${C.cyan}" stroke-opacity="0.2" transform="rotate(14 1120 320)" />
      <circle cx="1300" cy="190" r="5" fill="${C.white}" opacity="0.8" />
      <circle cx="940" cy="460" r="3" fill="${C.cyan}" />
    </g>
    <g>
      <circle cx="140" cy="150" r="12" fill="${C.violet}" />
      <text x="162" y="156" font-family="${UI}" font-size="15" font-weight="700" letter-spacing="4" fill="${C.white}">LUMEN</text>
      <text x="470" y="156" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">WORK</text>
      <text x="530" y="156" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">STUDIO</text>
      <text x="596" y="156" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">CONTACT</text>
      <rect x="1240" y="136" width="100" height="32" rx="16" fill="none" stroke="${C.white}" stroke-opacity="0.25" />
      <text x="1290" y="156" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.white}" text-anchor="middle">START ↗</text>
      <rect x="120" y="196" width="196" height="28" rx="14" fill="${C.white}" opacity="0.05" />
      <text x="218" y="214" font-family="${UI}" font-size="9" letter-spacing="3" fill="${C.violet}" text-anchor="middle">DIGITAL DESIGN STUDIO</text>
      <text x="118" y="310" font-family="${UI}" font-size="80" font-weight="700" letter-spacing="-3" fill="${C.white}">Design</text>
      <text x="118" y="388" font-family="${UI}" font-size="80" font-weight="700" letter-spacing="-3" fill="${C.white}">that<tspan fill="${C.violet}"> moves.</tspan></text>
      <rect x="120" y="432" width="360" height="9" rx="4" fill="${C.white}" opacity="0.14" />
      <rect x="120" y="452" width="290" height="9" rx="4" fill="${C.white}" opacity="0.09" />
      <rect x="120" y="504" width="150" height="42" rx="21" fill="${C.violet}" />
      <text x="195" y="530" font-family="${UI}" font-size="11" font-weight="700" letter-spacing="1" fill="#0A0712" text-anchor="middle">VIEW WORK</text>
      <text x="292" y="530" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">SHOWREEL ↗</text>
    </g>
    <g>
      <rect x="120" y="640" width="356" height="200" rx="14" fill="url(#card-${id})" stroke="${C.white}" stroke-opacity="0.08" />
      <rect x="140" y="660" width="316" height="110" rx="8" fill="${C.purple}" opacity="0.22" />
      <circle cx="230" cy="715" r="26" fill="${C.violet}" opacity="0.7" />
      <text x="140" y="800" font-family="${UI}" font-size="13" font-weight="600" fill="${C.white}">Aurora — Identity</text>
      <text x="140" y="820" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.muted}">BRANDING / 2026</text>
      <rect x="500" y="640" width="356" height="200" rx="14" fill="url(#card-${id})" stroke="${C.white}" stroke-opacity="0.08" />
      <rect x="520" y="660" width="316" height="110" rx="8" fill="${C.cyan}" opacity="0.12" />
      <path d="M600 745 L700 690 L800 745" stroke="${C.cyan}" stroke-width="1.5" fill="none" opacity="0.6" />
      <text x="520" y="800" font-family="${UI}" font-size="13" font-weight="600" fill="${C.white}">Orbit — Motion</text>
      <text x="520" y="820" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.muted}">AI FILM / 2026</text>
      <rect x="880" y="640" width="356" height="200" rx="14" fill="url(#card-${id})" stroke="${C.white}" stroke-opacity="0.08" />
      <rect x="900" y="660" width="316" height="110" rx="8" fill="${C.pink}" opacity="0.14" />
      <text x="1058" y="726" font-family="${UI}" font-size="44" font-weight="700" fill="${C.white}" opacity="0.7" text-anchor="middle">Aa</text>
      <text x="900" y="800" font-family="${UI}" font-size="13" font-weight="600" fill="${C.white}">Monogram — Type</text>
      <text x="900" y="820" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.muted}">GRAPHIC DESIGN / 2026</text>
    </g>
    <rect width="1440" height="950" filter="url(#grain-${id})" opacity="0.2" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* WEBSITE 02 — light editorial                                        */
/* ------------------------------------------------------------------ */
function websiteLight() {
  const id = "web2";
  return svg(
    1440,
    950,
    `<defs>
      <linearGradient id="paper-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F4F0E8" /><stop offset="1" stop-color="#E8E1D4" />
      </linearGradient>
      <linearGradient id="img-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#26301F" /><stop offset="0.55" stop-color="#5B6647" /><stop offset="1" stop-color="#D6C9A8" />
      </linearGradient>
      <linearGradient id="img2-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#B7A98D" /><stop offset="0.5" stop-color="#7C6C52" /><stop offset="1" stop-color="#2F2A20" />
      </linearGradient>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1440" height="950" fill="#DAD1C2" />
    <rect x="60" y="48" width="1320" height="854" rx="10" fill="url(#paper-${id})" />
    <rect x="60" y="48" width="1320" height="42" fill="#EFEAE0" />
    <circle cx="86" cy="69" r="4" fill="#C0B8A8" /><circle cx="102" cy="69" r="4" fill="#C0B8A8" /><circle cx="118" cy="69" r="4" fill="#C0B8A8" />
    <text x="720" y="73" font-family="${UI}" font-size="9" letter-spacing="2" fill="#8A8272" text-anchor="middle">northline.agency</text>
    <g>
      <text x="120" y="162" font-family="${SERIF}" font-size="26" font-weight="700" fill="#1C1B17">NORTHLINE®</text>
      <text x="560" y="158" font-family="${UI}" font-size="10" letter-spacing="2" fill="#5C574B">STUDIO</text>
      <text x="632" y="158" font-family="${UI}" font-size="10" letter-spacing="2" fill="#5C574B">SERVICES</text>
      <text x="716" y="158" font-family="${UI}" font-size="10" letter-spacing="2" fill="#5C574B">JOURNAL</text>
      <text x="800" y="158" font-family="${UI}" font-size="10" letter-spacing="2" fill="#5C574B">CONTACT</text>
      <rect x="1050" y="136" width="230" height="34" rx="17" fill="#1C1B17" />
      <text x="1165" y="157" font-family="${UI}" font-size="10" letter-spacing="2" fill="#F4F0E8" text-anchor="middle">START A PROJECT</text>
    </g>
    <g>
      <text x="118" y="330" font-family="${SERIF}" font-size="108" letter-spacing="-3" fill="#1C1B17">Ideas with</text>
      <text x="118" y="438" font-family="${SERIF}" font-size="108" letter-spacing="-3" font-style="italic" fill="#1C1B17">weight.</text>
      <rect x="120" y="480" width="330" height="7" rx="3" fill="#1C1B17" opacity="0.35" />
      <rect x="120" y="500" width="260" height="7" rx="3" fill="#1C1B17" opacity="0.2" />
      <text x="120" y="566" font-family="${UI}" font-size="11" letter-spacing="3" fill="#5C574B">BRAND STRATEGY · DESIGN · DIGITAL</text>
      <circle cx="140" cy="620" r="18" fill="none" stroke="#1C1B17" stroke-opacity="0.4" />
      <text x="140" y="625" font-family="${UI}" font-size="10" letter-spacing="1" fill="#1C1B17" text-anchor="middle">↓</text>
    </g>
    <g>
      <rect x="800" y="240" width="520" height="360" rx="4" fill="url(#img-${id})" />
      <path d="M800 520 C900 440 980 560 1080 470 C1160 400 1240 470 1320 420 L1320 600 L800 600 Z" fill="#1B2116" opacity="0.5" />
      <circle cx="1180" cy="320" r="44" fill="#F2E9CF" opacity="0.8" />
      <text x="824" y="576" font-family="${UI}" font-size="10" letter-spacing="3" fill="#F4F0E8">01 — FIELD NOTES, 2026</text>
    </g>
    <g>
      <rect x="120" y="682" width="370" height="170" fill="url(#img2-${id})" />
      <text x="510" y="716" font-family="${UI}" font-size="10" letter-spacing="2" fill="#6E6758">CASE STUDY</text>
      <text x="510" y="754" font-family="${SERIF}" font-size="34" fill="#1C1B17">Orchard House</text>
      <text x="510" y="780" font-family="${UI}" font-size="10" letter-spacing="2" fill="#6E6758">HOSPITALITY IDENTITY</text>
      <rect x="510" y="806" width="170" height="1" fill="#1C1B17" opacity="0.3" />
      <text x="510" y="834" font-family="${UI}" font-size="10" letter-spacing="2" fill="#1C1B17">VIEW PROJECT ↗</text>
      <rect x="900" y="682" width="380" height="1" fill="#1C1B17" opacity="0.2" />
      <text x="900" y="716" font-family="${UI}" font-size="10" letter-spacing="2" fill="#6E6758">FROM THE JOURNAL</text>
      <text x="900" y="760" font-family="${SERIF}" font-size="26" fill="#1C1B17">Designing for restraint</text>
      <text x="900" y="790" font-family="${SERIF}" font-size="26" fill="#1C1B17">in a loud market.</text>
      <text x="900" y="824" font-family="${UI}" font-size="10" letter-spacing="2" fill="#1C1B17">READ ↗</text>
    </g>
    <rect width="1440" height="950" filter="url(#grain-${id})" opacity="0.3" style="mix-blend-mode:multiply" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* GRAPHIC 01 — identity board                                         */
/* ------------------------------------------------------------------ */
function identityBoard() {
  const id = "id1";
  return svg(
    1200,
    1200,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0E0C14" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <linearGradient id="mono-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.violet}" /><stop offset="1" stop-color="${C.indigo}" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.purple}" stop-opacity="0.35" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0" />
      </radialGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="60" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="1200" fill="url(#bg-${id})" />
    <circle cx="880" cy="260" r="380" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <rect x="56" y="56" width="1088" height="1088" fill="none" stroke="${C.white}" stroke-opacity="0.1" />
    <text x="96" y="130" font-family="${UI}" font-size="13" letter-spacing="6" fill="${C.white}" opacity="0.7">MONOGRAM — IDENTITY SYSTEM</text>
    <text x="1104" y="130" font-family="${UI}" font-size="12" letter-spacing="4" fill="${C.muted}" text-anchor="end">STUDY 01 / 2026</text>
    <g>
      <circle cx="400" cy="500" r="230" fill="#0D0A16" stroke="${C.white}" stroke-opacity="0.14" />
      <circle cx="400" cy="500" r="180" fill="url(#mono-${id})" opacity="0.16" />
      <circle cx="400" cy="500" r="180" fill="none" stroke="${C.white}" stroke-opacity="0.25" />
      <path d="M330 590 V410 L470 590 V410" stroke="${C.white}" stroke-width="26" stroke-linecap="square" fill="none" />
      <circle cx="470" cy="386" r="13" fill="${C.violet}" />
      <circle cx="400" cy="500" r="260" fill="none" stroke="${C.violet}" stroke-opacity="0.25" stroke-dasharray="2 10" />
    </g>
    <g>
      <text x="720" y="404" font-family="${SERIF}" font-size="150" fill="${C.white}">Aa</text>
      <text x="720" y="450" font-family="${UI}" font-size="12" letter-spacing="4" fill="${C.muted}">SORA / PLUS JAKARTA SANS</text>
      <line x1="720" y1="486" x2="1040" y2="486" stroke="${C.white}" stroke-opacity="0.16" />
      <text x="720" y="530" font-family="${UI}" font-size="11" letter-spacing="3" fill="${C.muted}">ABCDEFGHIJKLMNOPQRSTUVWXYZ</text>
      <text x="720" y="558" font-family="${UI}" font-size="11" letter-spacing="3" fill="${C.white}" opacity="0.55">0123456789 — ₹ % &amp;</text>
    </g>
    <g>
      <text x="96" y="832" font-family="${UI}" font-size="11" letter-spacing="4" fill="${C.muted}">COLOUR SYSTEM</text>
      <rect x="96" y="858" width="164" height="88" rx="4" fill="${C.violet}" />
      <rect x="276" y="858" width="164" height="88" rx="4" fill="${C.indigo}" />
      <rect x="456" y="858" width="164" height="88" rx="4" fill="#11111B" stroke="${C.white}" stroke-opacity="0.14" />
      <rect x="636" y="858" width="164" height="88" rx="4" fill="#F4F0E8" />
      <text x="96" y="974" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">A855F7</text>
      <text x="276" y="974" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">6366F1</text>
      <text x="456" y="974" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">11111B</text>
      <text x="636" y="974" font-family="${UI}" font-size="10" letter-spacing="2" fill="${C.muted}">F4F0E8</text>
    </g>
    <g>
      <rect x="844" y="832" width="260" height="160" rx="8" fill="#141020" stroke="${C.white}" stroke-opacity="0.12" />
      <circle cx="884" cy="872" r="16" fill="${C.violet}" />
      <text x="912" y="878" font-family="${UI}" font-size="13" font-weight="700" letter-spacing="2" fill="${C.white}">AURA</text>
      <text x="872" y="932" font-family="${UI}" font-size="20" font-weight="600" fill="${C.white}">Aura Studio</text>
      <text x="872" y="956" font-family="${UI}" font-size="9" letter-spacing="2" fill="${C.muted}">CREATIVE DIRECTION</text>
      <line x1="872" y1="970" x2="1000" y2="970" stroke="${C.white}" stroke-opacity="0.14" />
      <text x="872" y="970" font-family="${UI}" font-size="8" letter-spacing="1" fill="${C.muted}">hello@aura.studio</text>
    </g>
    <rect x="96" y="1040" width="1008" height="1" fill="${C.white}" opacity="0.1" />
    <text x="96" y="1090" font-family="${UI}" font-size="11" letter-spacing="4" fill="${C.muted}">IDENTITY CONCEPT — LOGO / TYPE / COLOUR / COLLATERAL</text>
    <rect width="1200" height="1200" filter="url(#grain-${id})" opacity="0.25" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* GRAPHIC 02 — stationery                                             */
/* ------------------------------------------------------------------ */
function stationery() {
  const id = "stat";
  return svg(
    1200,
    1200,
    `<defs>
      <linearGradient id="paper-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#E9E2D4" /><stop offset="1" stop-color="#CFC4AE" />
      </linearGradient>
      <linearGradient id="card-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#221A16" /><stop offset="1" stop-color="#0E0B0A" />
      </linearGradient>
      <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="26" stdDeviation="30" flood-color="#000" flood-opacity="0.4" />
      </filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="1200" fill="url(#paper-${id})" />
    <g opacity="0.35" stroke="#8C7F66">
      <path d="M0 300 H1200" /><path d="M0 600 H1200" /><path d="M0 900 H1200" />
      <path d="M300 0 V1200" /><path d="M600 0 V1200" /><path d="M900 0 V1200" />
    </g>
    <text x="72" y="100" font-family="${UI}" font-size="12" letter-spacing="5" fill="#5D5241">PAPER &amp; INK — STATIONERY</text>
    <text x="1128" y="100" font-family="${UI}" font-size="12" letter-spacing="3" fill="#5D5241" text-anchor="end">PRINT CONCEPT</text>
    <g transform="rotate(-9 560 620)" filter="url(#shadow-${id})">
      <rect x="220" y="400" width="680" height="400" rx="10" fill="url(#card-${id})" />
      <text x="270" y="486" font-family="${SERIF}" font-size="48" fill="#F3EBDD">Paper &amp; Ink</text>
      <line x1="270" y1="510" x2="520" y2="510" stroke="#C8B99F" stroke-opacity="0.5" />
      <text x="270" y="540" font-family="${UI}" font-size="10" letter-spacing="3" fill="#A89A83">DESIGN STUDIO — PRINT &amp; DIGITAL</text>
      <text x="270" y="716" font-family="${UI}" font-size="14" fill="#F3EBDD">Sahil</text>
      <text x="270" y="738" font-family="${UI}" font-size="10" letter-spacing="2" fill="#A89A83">FOUNDER</text>
      <text x="834" y="716" font-family="${SERIF}" font-size="34" fill="#C8B99F" text-anchor="end">P&amp;I</text>
      <circle cx="834" cy="500" r="42" fill="none" stroke="#C8B99F" stroke-opacity="0.6" />
      <text x="834" y="513" font-family="${SERIF}" font-size="30" fill="#F3EBDD" text-anchor="middle">P</text>
    </g>
    <g transform="rotate(6 760 840)" filter="url(#shadow-${id})">
      <rect x="440" y="700" width="560" height="320" rx="6" fill="#F7F1E5" />
      <text x="480" y="760" font-family="${SERIF}" font-size="30" fill="#2A241C">Paper &amp; Ink</text>
      <text x="480" y="790" font-family="${UI}" font-size="9" letter-spacing="3" fill="#7A6D5B">BRAND · DESIGN · PRINT</text>
      <line x1="480" y1="830" x2="800" y2="830" stroke="#2A241C" stroke-opacity="0.14" />
      <text x="480" y="870" font-family="${UI}" font-size="11" fill="#2A241C">hello@paperandink.studio</text>
      <text x="480" y="894" font-family="${UI}" font-size="11" fill="#7A6D5B">paperandink.studio</text>
      <text x="480" y="918" font-family="${UI}" font-size="11" fill="#7A6D5B">+91 ··········</text>
      <circle cx="930" cy="900" r="46" fill="none" stroke="#2A241C" stroke-opacity="0.25" />
      <text x="930" y="910" font-family="${SERIF}" font-size="26" fill="#2A241C" text-anchor="middle">P</text>
    </g>
    <text x="72" y="1110" font-family="${UI}" font-size="11" letter-spacing="4" fill="#5D5241">STATIONERY CONCEPT — BUSINESS CARDS / PAPER TONES</text>
    <rect x="32" y="32" width="1136" height="1136" fill="none" stroke="#5D5241" stroke-opacity="0.18" />
    <rect width="1200" height="1200" filter="url(#grain-${id})" opacity="0.35" style="mix-blend-mode:multiply" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* HERO ART                                                            */
/* ------------------------------------------------------------------ */
function heroArt() {
  const id = "hero";
  return svg(
    900,
    1100,
    `<defs>
      <radialGradient id="bg-${id}" cx="50%" cy="40%" r="65%">
        <stop offset="0" stop-color="#241145" /><stop offset="0.55" stop-color="#0F0A1C" /><stop offset="1" stop-color="#08080D" />
      </radialGradient>
      <radialGradient id="orb-${id}" cx="38%" cy="30%" r="72%">
        <stop offset="0" stop-color="#F5F3FF" /><stop offset="0.18" stop-color="#C4B5FD" />
        <stop offset="0.5" stop-color="${C.violet}" /><stop offset="0.8" stop-color="#5B21B6" /><stop offset="1" stop-color="#1E1B4B" />
      </radialGradient>
      <radialGradient id="halo-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.purple}" stop-opacity="0.55" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="ring-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.white}" stop-opacity="0.7" /><stop offset="0.4" stop-color="${C.violet}" stop-opacity="0.5" /><stop offset="1" stop-color="${C.indigo}" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.white}" stop-opacity="0.14" /><stop offset="1" stop-color="${C.white}" stop-opacity="0.03" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="40" /></filter>
      <filter id="blurSoft-${id}"><feGaussianBlur stdDeviation="10" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="900" height="1100" fill="url(#bg-${id})" />
    <circle cx="450" cy="470" r="420" fill="url(#halo-${id})" filter="url(#blur-${id})" />
    <g opacity="0.5" stroke="${C.white}" stroke-opacity="0.08">
      <path d="M0 880 L450 760 L900 880" fill="none" />
      <path d="M0 930 L450 810 L900 930" fill="none" />
      <path d="M0 980 L450 860 L900 980" fill="none" />
      <path d="M0 1030 L450 910 L900 1030" fill="none" />
      <path d="M0 1080 L450 960 L900 1080" fill="none" />
      <path d="M180 1100 L450 760" /><path d="M320 1100 L450 760" /><path d="M580 1100 L450 760" /><path d="M720 1100 L450 760" />
    </g>
    <g>
      <circle cx="450" cy="470" r="270" fill="none" stroke="url(#ring-${id})" stroke-width="1.5" transform="rotate(-18 450 470)" />
      <ellipse cx="450" cy="470" rx="360" ry="110" fill="none" stroke="url(#ring-${id})" stroke-width="1.5" transform="rotate(-20 450 470)" />
      <ellipse cx="450" cy="470" rx="360" ry="110" fill="none" stroke="url(#ring-${id})" stroke-width="1" transform="rotate(28 450 470)" opacity="0.6" />
      <ellipse cx="450" cy="470" rx="390" ry="390" fill="none" stroke="${C.white}" stroke-opacity="0.06" />
      <circle cx="450" cy="470" r="232" fill="url(#orb-${id})" />
      <circle cx="450" cy="470" r="232" fill="none" stroke="${C.white}" stroke-opacity="0.22" />
      <ellipse cx="380" cy="380" rx="90" ry="56" fill="${C.white}" opacity="0.16" filter="url(#blurSoft-${id})" transform="rotate(-24 380 380)" />
      <circle cx="450" cy="470" r="270" fill="none" stroke="${C.violet}" stroke-opacity="0.2" stroke-dasharray="1 12" />
    </g>
    <g opacity="0.8">
      <circle cx="230" cy="240" r="3" fill="${C.violet}" />
      <circle cx="700" cy="330" r="2" fill="${C.white}" opacity="0.7" />
      <circle cx="760" cy="520" r="3.4" fill="${C.cyan}" />
      <circle cx="200" cy="560" r="2" fill="${C.white}" opacity="0.5" />
      <circle cx="520" cy="130" r="2" fill="${C.pink}" />
      <circle cx="330" cy="820" r="2.4" fill="${C.violet}" />
    </g>
    <rect width="900" height="1100" filter="url(#grain-${id})" opacity="0.25" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* STUDIO COLLAGE (About)                                              */
/* ------------------------------------------------------------------ */
function studioCollage() {
  const id = "studio";
  return svg(
    1200,
    900,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#100A1D" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.purple}" stop-opacity="0.4" /><stop offset="1" stop-color="${C.purple}" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="panelA-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2A1546" /><stop offset="1" stop-color="#0D0918" />
      </linearGradient>
      <linearGradient id="panelB-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3B1225" /><stop offset="1" stop-color="#120A12" />
      </linearGradient>
      <linearGradient id="panelC-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0B2A33" /><stop offset="1" stop-color="#08101A" />
      </linearGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="50" /></filter>
      <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000" flood-opacity="0.5" />
      </filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="900" fill="url(#bg-${id})" />
    <circle cx="620" cy="420" r="420" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <g opacity="0.2" stroke="${C.white}">
      <path d="M0 150 H1200" /><path d="M0 300 H1200" /><path d="M0 450 H1200" /><path d="M0 600 H1200" /><path d="M0 750 H1200" />
      <path d="M150 0 V900" /><path d="M300 0 V900" /><path d="M450 0 V900" /><path d="M600 0 V900" /><path d="M750 0 V900" /><path d="M900 0 V900" /><path d="M1050 0 V900" />
    </g>
    <g transform="rotate(-6 400 430)" filter="url(#shadow-${id})">
      <rect x="140" y="220" width="430" height="470" rx="22" fill="url(#panelA-${id})" stroke="${C.white}" stroke-opacity="0.14" />
      <circle cx="355" cy="390" r="120" fill="${C.violet}" opacity="0.24" />
      <circle cx="355" cy="390" r="80" fill="none" stroke="${C.violet}" stroke-opacity="0.6" />
      <rect x="180" y="590" width="160" height="12" rx="6" fill="${C.white}" opacity="0.55" />
      <rect x="180" y="614" width="100" height="8" rx="4" fill="${C.white}" opacity="0.2" />
    </g>
    <g transform="rotate(4 760 400)" filter="url(#shadow-${id})">
      <rect x="520" y="170" width="470" height="300" rx="22" fill="url(#panelB-${id})" stroke="${C.white}" stroke-opacity="0.14" />
      <circle cx="760" cy="320" r="100" fill="${C.pink}" opacity="0.22" />
      <path d="M600 400 C680 260 840 460 920 300" stroke="${C.pink}" stroke-width="1.5" fill="none" opacity="0.6" />
      <rect x="560" y="420" width="150" height="10" rx="5" fill="${C.white}" opacity="0.5" />
    </g>
    <g transform="rotate(-2 700 700)" filter="url(#shadow-${id})">
      <rect x="400" y="540" width="440" height="250" rx="22" fill="url(#panelC-${id})" stroke="${C.white}" stroke-opacity="0.14" />
      <rect x="440" y="580" width="160" height="10" rx="5" fill="${C.white}" opacity="0.5" />
      <rect x="440" y="604" width="90" height="7" rx="3.5" fill="${C.white}" opacity="0.2" />
      <circle cx="760" cy="665" r="52" fill="${C.cyan}" opacity="0.18" />
      <path d="M744 645 L784 665 L744 685 Z" fill="${C.cyan}" opacity="0.8" />
    </g>
    <g>
      <circle cx="960" cy="620" r="14" fill="none" stroke="${C.white}" stroke-opacity="0.4" />
      <circle cx="960" cy="620" r="3" fill="${C.violet}" />
      <circle cx="240" cy="790" r="4" fill="${C.cyan}" opacity="0.8" />
      <text x="90" y="800" font-family="${UI}" font-size="11" letter-spacing="5" fill="${C.white}" opacity="0.45">HARYANA — CREATIVE STUDIO</text>
    </g>
    <rect x="32" y="32" width="1136" height="836" fill="none" stroke="${C.white}" stroke-opacity="0.08" />
    <rect width="1200" height="900" filter="url(#grain-${id})" opacity="0.2" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* SERVICE IMAGES (4:3)                                                */
/* ------------------------------------------------------------------ */
function serviceImage({ id, title, kicker, accent, shape }) {
  const shapes = {
    photo: `<ellipse cx="720" cy="380" rx="150" ry="196" fill="#1A1128" stroke="${accent}" stroke-opacity="0.4" />
      <path d="M540 750 C560 620 640 560 720 560 C800 560 880 620 900 750 Z" fill="#130D1E" />
      <path d="M816 250 C858 320 862 420 824 500" stroke="${accent}" stroke-width="5" fill="none" opacity="0.8" stroke-linecap="round" />
      <circle cx="720" cy="380" r="250" fill="none" stroke="${C.white}" stroke-opacity="0.08" />`,
    banner: `<rect x="500" y="230" width="380" height="380" rx="16" fill="#151022" stroke="${C.white}" stroke-opacity="0.12" />
      <text x="540" y="360" font-family="${UI}" font-size="58" font-weight="800" fill="${C.white}">SALE</text>
      <rect x="540" y="392" width="200" height="8" rx="4" fill="${accent}" />
      <rect x="540" y="418" width="140" height="6" rx="3" fill="${C.white}" opacity="0.3" />
      <circle cx="800" cy="300" r="54" fill="${accent}" opacity="0.3" />
      <rect x="540" y="520" width="120" height="34" rx="17" fill="${accent}" />`,
    youtube: `<circle cx="720" cy="380" r="140" fill="#1A0C16" stroke="${accent}" stroke-opacity="0.5" stroke-width="16" />
      <path d="M690 316 L774 380 L690 444 Z" fill="${C.white}" />
      <rect x="500" y="590" width="440" height="18" rx="9" fill="${C.white}" opacity="0.14" />
      <rect x="500" y="620" width="280" height="12" rx="6" fill="${C.white}" opacity="0.08" />`,
    video: `<circle cx="720" cy="380" r="130" fill="${accent}" opacity="0.18" />
      <circle cx="720" cy="380" r="90" fill="none" stroke="${accent}" stroke-opacity="0.7" />
      <path d="M700 344 L756 380 L700 416 Z" fill="${C.white}" />
      <path d="M470 560 L560 500 L650 550 L740 490 L840 550 L940 500 L980 530" stroke="${accent}" stroke-width="2" fill="none" opacity="0.5" />
      <ellipse cx="720" cy="560" rx="240" ry="40" fill="none" stroke="${C.white}" stroke-opacity="0.1" />`,
    website: `<rect x="440" y="180" width="560" height="420" rx="16" fill="#0B0B15" stroke="${C.white}" stroke-opacity="0.15" />
      <rect x="440" y="180" width="560" height="40" rx="16" fill="${C.white}" opacity="0.05" />
      <circle cx="470" cy="200" r="5" fill="${accent}" /><circle cx="488" cy="200" r="5" fill="${C.white}" opacity="0.3" />
      <text x="490" y="300" font-family="${UI}" font-size="42" font-weight="700" fill="${C.white}">Studio</text>
      <text x="490" y="348" font-family="${UI}" font-size="42" font-weight="700" fill="${accent}">website.</text>
      <rect x="490" y="384" width="160" height="8" rx="4" fill="${C.white}" opacity="0.25" />
      <rect x="490" y="430" width="120" height="36" rx="18" fill="${accent}" />
      <circle cx="880" cy="350" r="90" fill="${accent}" opacity="0.2" />
      <rect x="820" y="290" width="140" height="140" rx="70" fill="none" stroke="${accent}" stroke-opacity="0.4" />`,
    graphic: `<circle cx="720" cy="380" r="140" fill="#0D0A16" stroke="${accent}" stroke-opacity="0.5" />
      <path d="M675 445 V315 L765 445 V315" stroke="${C.white}" stroke-width="18" fill="none" />
      <circle cx="765" cy="298" r="9" fill="${accent}" />
      <rect x="500" y="580" width="80" height="56" rx="4" fill="${accent}" />
      <rect x="596" y="580" width="80" height="56" rx="4" fill="${C.indigo}" />
      <rect x="692" y="580" width="80" height="56" rx="4" fill="#11111B" stroke="${C.white}" stroke-opacity="0.2" />
      <rect x="788" y="580" width="80" height="56" rx="4" fill="#F4F0E8" />`,
  };
  return svg(
    1000,
    750,
    `<defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#140C27" /><stop offset="0.55" stop-color="#0B0814" /><stop offset="1" stop-color="#08080D" />
      </linearGradient>
      <radialGradient id="glow-${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.35" /><stop offset="1" stop-color="${accent}" stop-opacity="0" />
      </radialGradient>
      <filter id="blur-${id}"><feGaussianBlur stdDeviation="55" /></filter>
      <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1000" height="750" fill="url(#bg-${id})" />
    <circle cx="730" cy="340" r="340" fill="url(#glow-${id})" filter="url(#blur-${id})" />
    <g opacity="0.18" stroke="${C.white}">
      <path d="M0 150 H1000" /><path d="M0 300 H1000" /><path d="M0 450 H1000" /><path d="M0 600 H1000" />
      <path d="M200 0 V750" /><path d="M400 0 V750" /><path d="M600 0 V750" /><path d="M800 0 V750" />
    </g>
    ${shapes[shape]}
    <text x="56" y="96" font-family="${UI}" font-size="11" letter-spacing="5" fill="${C.white}" opacity="0.65">${esc(kicker)}</text>
    <text x="56" y="664" font-family="${UI}" font-size="44" font-weight="700" letter-spacing="-1" fill="${C.white}">${esc(title)}</text>
    <rect x="56" y="692" width="56" height="3" rx="1.5" fill="${accent}" />
    <rect x="24" y="24" width="952" height="702" fill="none" stroke="${C.white}" stroke-opacity="0.1" />
    <rect width="1000" height="750" filter="url(#grain-${id})" opacity="0.22" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* LOGO / FAVICON / OG                                                 */
/* ------------------------------------------------------------------ */
const logoMark = (size = 512, bg = true) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#C4B5FD" /><stop offset="0.45" stop-color="#A855F7" /><stop offset="1" stop-color="#6366F1" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#151024" /><stop offset="1" stop-color="#08080D" />
    </linearGradient>
  </defs>
  ${bg ? `<rect width="64" height="64" rx="15" fill="url(#bgGrad)" /><rect x="1" y="1" width="62" height="62" rx="14" fill="none" stroke="#ffffff" stroke-opacity="0.12" />` : ""}
  <path d="M17 46 V19 L47 46 V19" fill="none" stroke="url(#lg)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="47" cy="15" r="3.4" fill="#E9D5FF" />
</svg>
`;

function ogImage() {
  return svg(
    1200,
    630,
    `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#120B22" /><stop offset="0.55" stop-color="#08080D" /><stop offset="1" stop-color="#150B20" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${C.violet}" stop-opacity="0.5" /><stop offset="1" stop-color="${C.violet}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="orb" cx="35%" cy="30%" r="75%">
        <stop offset="0" stop-color="#F5F3FF" /><stop offset="0.4" stop-color="${C.violet}" /><stop offset="1" stop-color="#312E81" />
      </radialGradient>
      <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#C4B5FD" /><stop offset="0.5" stop-color="${C.violet}" /><stop offset="1" stop-color="${C.indigo}" />
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="60" /></filter>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
      </filter>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <circle cx="980" cy="300" r="360" fill="url(#glow)" filter="url(#blur)" opacity="0.8" />
    <g opacity="0.16" stroke="${C.white}">
      <path d="M0 105 H1200" /><path d="M0 210 H1200" /><path d="M0 315 H1200" /><path d="M0 420 H1200" /><path d="M0 525 H1200" />
      <path d="M100 0 V630" /><path d="M200 0 V630" /><path d="M300 0 V630" /><path d="M400 0 V630" />
    </g>
    <circle cx="980" cy="310" r="150" fill="url(#orb)" opacity="0.55" />
    <ellipse cx="980" cy="310" rx="245" ry="78" fill="none" stroke="${C.violet}" stroke-opacity="0.45" transform="rotate(-18 980 310)" />
    <ellipse cx="980" cy="310" rx="290" ry="60" fill="none" stroke="${C.cyan}" stroke-opacity="0.18" transform="rotate(16 980 310)" />
    <g transform="translate(80 92)">
      <rect width="56" height="56" rx="14" fill="#100B1C" stroke="${C.white}" stroke-opacity="0.14" />
      <path d="M15 41 V16 L41 41 V16" fill="none" stroke="url(#mark)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="41" cy="13" r="3" fill="#E9D5FF" />
    </g>
    <text x="80" y="270" font-family="${UI}" font-size="92" font-weight="800" letter-spacing="10" fill="${C.white}">HARYANA</text>
    <text x="84" y="310" font-family="${UI}" font-size="17" font-weight="500" letter-spacing="10" fill="${C.violet}">CREATIVE STUDIO</text>
    <line x1="84" y1="356" x2="560" y2="356" stroke="${C.white}" stroke-opacity="0.16" />
    <text x="84" y="414" font-family="${UI}" font-size="28" font-weight="600" letter-spacing="3" fill="${C.white}" opacity="0.9">CREATE. DESIGN. INSPIRE.</text>
    <text x="84" y="456" font-family="${UI}" font-size="16" letter-spacing="1" fill="${C.muted}">AI visuals · Motion · Design · Websites</text>
    <text x="84" y="566" font-family="${UI}" font-size="13" letter-spacing="4" fill="${C.muted}">FOUNDED BY SAHIL</text>
    <text x="1120" y="566" font-family="${UI}" font-size="13" letter-spacing="4" fill="${C.muted}" text-anchor="end">HARYANA CREATIVE STUDIO</text>
    <rect width="1200" height="630" filter="url(#grain)" opacity="0.25" style="mix-blend-mode:overlay" />
  `
  );
}

/* ------------------------------------------------------------------ */
/* WRITE EVERYTHING                                                    */
/* ------------------------------------------------------------------ */
const files = {
  "portfolio/ai-photo-01.svg": aiPortrait({ id: "ai1", a: C.violet, b: C.pink, label: "NEON STUDY", index: "01" }),
  "portfolio/ai-photo-02.svg": productVisual(),
  "portfolio/ai-photo-03.svg": aiPortrait({ id: "ai3", a: C.amber, b: C.pink, label: "VELVET", index: "03", warm: true }),
  "portfolio/ai-video-01.svg": cinematic({
    id: "vid1",
    title: "ORBIT",
    subtitle: "A MOTION STUDY",
    timecode: "00:15 / 4K",
    palette: ["#170B2E", "#3B1763", "#FDE68A", "#A855F7"],
  }),
  "portfolio/ai-video-02.svg": cinematic({
    id: "vid2",
    title: "AFTERGLOW",
    subtitle: "BRAND FILM STUDY",
    timecode: "00:30 / 4K",
    palette: ["#1B0A12", "#4A1526", "#FDA4AF", "#EC4899"],
  }),
  "portfolio/banner-01.svg": festiveBanner(),
  "portfolio/banner-02.svg": launchBanner(),
  "portfolio/youtube-01.svg": youtubeThumb(),
  "portfolio/youtube-02.svg": youtubeChannel(),
  "portfolio/website-01.svg": websiteDark(),
  "portfolio/website-02.svg": websiteLight(),
  "portfolio/graphic-01.svg": identityBoard(),
  "portfolio/graphic-02.svg": stationery(),
  "hero-art.svg": heroArt(),
  "studio.svg": studioCollage(),
  "services/ai-photo.svg": serviceImage({
    id: "svc1",
    title: "AI Photo Creation",
    kicker: "SERVICE 01 — AI IMAGERY",
    accent: C.pink,
    shape: "photo",
  }),
  "services/banner.svg": serviceImage({
    id: "svc2",
    title: "Banner Designing",
    kicker: "SERVICE 02 — CAMPAIGN",
    accent: C.amber,
    shape: "banner",
  }),
  "services/youtube.svg": serviceImage({
    id: "svc3",
    title: "YouTube Graphics",
    kicker: "SERVICE 03 — CONTENT",
    accent: "#F87171",
    shape: "youtube",
  }),
  "services/ai-video.svg": serviceImage({
    id: "svc4",
    title: "AI Video Creation",
    kicker: "SERVICE 04 — MOTION",
    accent: C.indigo,
    shape: "video",
  }),
  "services/website.svg": serviceImage({
    id: "svc5",
    title: "Website Development",
    kicker: "SERVICE 05 — DIGITAL",
    accent: C.cyan,
    shape: "website",
  }),
  "services/graphic.svg": serviceImage({
    id: "svc6",
    title: "Graphic Design",
    kicker: "SERVICE 06 — IDENTITY",
    accent: "#34D399",
    shape: "graphic",
  }),
};

for (const [name, content] of Object.entries(files)) {
  const target = path.join(imgDir, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  console.log(`✓ ${name}`);
}

fs.writeFileSync(path.join(faviconDir, "favicon.svg"), logoMark(512, true), "utf8");
fs.writeFileSync(path.join(faviconDir, "logo-mark.svg"), logoMark(512, false), "utf8");

await sharp(Buffer.from(ogImage())).resize(1200, 630).png({ quality: 92 }).toFile(path.join(faviconDir, "og-image.png"));
console.log("✓ favicon/og-image.png");

for (const size of [32, 180, 192, 512]) {
  const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
  await sharp(Buffer.from(logoMark(512, true))).resize(size, size).png().toFile(path.join(faviconDir, filename));
  console.log(`✓ favicon/${filename}`);
}

console.log("\nAll assets generated.");
