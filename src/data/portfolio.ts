import type { Localized, LocalizedList } from "@/config/types";
import type { PortfolioCategory } from "@/types";

export interface PortfolioItem {
  id: string;
  title: Localized;
  description: Localized;
  category: PortfolioCategory;
  image: string;
  alt: Localized;
  /** Every item is a demonstration concept until replaced with real client work. */
  isSample: true;
  /** Optional real video file. Left undefined for demo items. */
  video?: string;
  featured?: boolean;
  aspect: "portrait" | "landscape" | "square" | "wide";
  tags: LocalizedList;
}

/**
 * PORTFOLIO DATA
 * Replace these demo concepts with your own projects.
 * Set `isSample: false` (and update the type above) once real work is added.
 * Add `video: "/videos/your-file.mp4"` to enable the video player in the lightbox.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "neon-portrait",
    title: { en: "Neon Portrait Study", hi: "नियॉन पोर्ट्रेट स्टडी" },
    description: {
      en: "An editorial AI portrait direction exploring violet rim light, soft grain and a minimal studio backdrop.",
      hi: "वायलेट रिम लाइट, सॉफ्ट ग्रेन और मिनिमल स्टूडियो बैकड्रॉप की खोज करती एक एडिटोरियल AI पोर्ट्रेट दिशा।",
    },
    category: "ai-photos",
    image: "/images/portfolio/ai-photo-01.svg",
    alt: {
      en: "Violet abstract AI portrait study with rim lighting",
      hi: "रिम लाइटिंग के साथ वायलेट एब्सट्रैक्ट AI पोर्ट्रेट स्टडी",
    },
    isSample: true,
    featured: true,
    aspect: "portrait",
    tags: { en: ["AI portrait", "Editorial"], hi: ["AI पोर्ट्रेट", "एडिटोरियल"] },
  },
  {
    id: "aurora-product",
    title: { en: "Aurora Product Visual", hi: "ऑरोरा प्रोडक्ट विज़ुअल" },
    description: {
      en: "A moody product image concept using gradient light, reflective surfaces and controlled negative space.",
      hi: "ग्रेडिएंट लाइट, रिफ्लेक्टिव सरफेस और नियंत्रित नेगेटिव स्पेस का उपयोग करती एक मूडी प्रोडक्ट इमेज कॉन्सेप्ट।",
    },
    category: "ai-photos",
    image: "/images/portfolio/ai-photo-02.svg",
    alt: {
      en: "Abstract product visual with a glowing bottle silhouette",
      hi: "चमकती बोतल सिल्हूट वाला एब्सट्रैक्ट प्रोडक्ट विज़ुअल",
    },
    isSample: true,
    featured: false,
    aspect: "portrait",
    tags: { en: ["Product", "AI"], hi: ["प्रोडक्ट", "AI"] },
  },
  {
    id: "velvet-editorial",
    title: { en: "Velvet Editorial", hi: "वेलवेट एडिटोरियल" },
    description: {
      en: "A high-contrast beauty portrait direction with warm highlights and a deep saturated background.",
      hi: "वार्म हाइलाइट्स और गहरे सैचुरेटेड बैकग्राउंड के साथ हाई-कंट्रास्ट ब्यूटी पोर्ट्रेट दिशा।",
    },
    category: "ai-photos",
    image: "/images/portfolio/ai-photo-03.svg",
    alt: {
      en: "Warm-toned abstract beauty portrait with deep shadows",
      hi: "गहरी परछाइयों के साथ वार्म-टोन एब्सट्रैक्ट ब्यूटी पोर्ट्रेट",
    },
    isSample: true,
    featured: false,
    aspect: "portrait",
    tags: { en: ["AI portrait", "Beauty"], hi: ["AI पोर्ट्रेट", "ब्यूटी"] },
  },
  {
    id: "orbit-motion",
    title: { en: "Orbit — Motion Study", hi: "ऑर्बिट — मोशन स्टडी" },
    description: {
      en: "A cinematic AI motion concept: a lone horizon, a violet sun and slow atmospheric movement.",
      hi: "एक सिनेमैटिक AI मोशन कॉन्सेप्ट: अकेला क्षितिज, वायलेट सूरज और धीमी वायुमंडलीय गति।",
    },
    category: "ai-videos",
    image: "/images/portfolio/ai-video-01.svg",
    alt: {
      en: "Cinematic AI landscape with a violet sun over dark mountains",
      hi: "गहरे पहाड़ों पर वायलेट सूरज वाला सिनेमैटिक AI लैंडस्केप",
    },
    isSample: true,
    featured: true,
    aspect: "wide",
    tags: { en: ["Motion", "AI film"], hi: ["मोशन", "AI फ़िल्म"] },
  },
  {
    id: "afterglow-film",
    title: { en: "Afterglow — Brand Film", hi: "आफ़्टरग्लो — ब्रांड फ़िल्म" },
    description: {
      en: "A short brand-film concept built around liquid gradients, light leaks and a single product moment.",
      hi: "लिक्विड ग्रेडिएंट, लाइट लीक और एक प्रोडक्ट मोमेंट के इर्द-गिर्द बना शॉर्ट ब्रांड-फ़िल्म कॉन्सेप्ट।",
    },
    category: "ai-videos",
    image: "/images/portfolio/ai-video-02.svg",
    alt: {
      en: "Abstract cinematic frame with flowing warm gradients",
      hi: "बहते वार्म ग्रेडिएंट के साथ एब्सट्रैक्ट सिनेमैटिक फ़्रेम",
    },
    isSample: true,
    featured: false,
    aspect: "wide",
    tags: { en: ["Brand film", "Motion"], hi: ["ब्रांड फ़िल्म", "मोशन"] },
  },
  {
    id: "festive-edit",
    title: { en: "Festive Edit — Campaign Banner", hi: "फेस्टिव एडिट — कैंपेन बैनर" },
    description: {
      en: "A seasonal campaign banner concept with oversized typography and a warm gradient product treatment.",
      hi: "बड़ी टाइपोग्राफी और वार्म ग्रेडिएंट प्रोडक्ट ट्रीटमेंट वाला सीज़नल कैंपेन बैनर कॉन्सेप्ट।",
    },
    category: "banners",
    image: "/images/portfolio/banner-01.svg",
    alt: {
      en: "Festive campaign banner concept with oversized type",
      hi: "बड़ी टाइपोग्राफी वाला फेस्टिव कैंपेन बैनर कॉन्सेप्ट",
    },
    isSample: true,
    featured: true,
    aspect: "landscape",
    tags: { en: ["Campaign", "Social"], hi: ["कैंपेन", "सोशल"] },
  },
  {
    id: "launch-week",
    title: { en: "Launch Week — Ad Set", hi: "लॉन्च वीक — ऐड सेट" },
    description: {
      en: "A launch announcement layout exploring bold geometry, violet light and a clean call to action.",
      hi: "बोल्ड ज्यामिति, वायलेट लाइट और साफ कॉल-टू-एक्शन की खोज करता लॉन्च अनाउंसमेंट लेआउट।",
    },
    category: "banners",
    image: "/images/portfolio/banner-02.svg",
    alt: {
      en: "Launch week advertisement with geometric purple shapes",
      hi: "ज्यामितीय पर्पल आकृतियों वाला लॉन्च वीक विज्ञापन",
    },
    isSample: true,
    featured: false,
    aspect: "landscape",
    tags: { en: ["Advertising", "Launch"], hi: ["विज्ञापन", "लॉन्च"] },
  },
  {
    id: "design-smarter",
    title: { en: "Design Smarter — Thumbnail", hi: "डिज़ाइन स्मार्टर — थंबनेल" },
    description: {
      en: "A high-contrast YouTube thumbnail concept built for readability at mobile size.",
      hi: "मोबाइल साइज़ पर पठनीयता के लिए बना हाई-कंट्रास्ट YouTube थंबनेल कॉन्सेप्ट।",
    },
    category: "youtube",
    image: "/images/portfolio/youtube-01.svg",
    alt: {
      en: "Bold purple YouTube thumbnail concept reading Design Smarter",
      hi: "Design Smarter लिखा हुआ बोल्ड पर्पल YouTube थंबनेल कॉन्सेप्ट",
    },
    isSample: true,
    featured: true,
    aspect: "wide",
    tags: { en: ["YouTube", "Thumbnail"], hi: ["YouTube", "थंबनेल"] },
  },
  {
    id: "studio-diaries",
    title: { en: "Studio Diaries — Channel Art", hi: "स्टूडियो डायरीज़ — चैनल आर्ट" },
    description: {
      en: "A channel branding direction using a consistent grid, accent colour and editorial type.",
      hi: "एकजुट ग्रिड, एक्सेंट रंग और एडिटोरियल टाइप का उपयोग करती चैनल ब्रांडिंग दिशा।",
    },
    category: "youtube",
    image: "/images/portfolio/youtube-02.svg",
    alt: {
      en: "YouTube channel banner concept with studio diaries typography",
      hi: "Studio Diaries टाइपोग्राफी वाला YouTube चैनल बैनर कॉन्सेप्ट",
    },
    isSample: true,
    featured: false,
    aspect: "wide",
    tags: { en: ["Channel art", "Branding"], hi: ["चैनल आर्ट", "ब्रांडिंग"] },
  },
  {
    id: "lumen-studio",
    title: { en: "Lumen Studio — Website", hi: "ल्यूमेन स्टूडियो — वेबसाइट" },
    description: {
      en: "A dark portfolio website concept with a large editorial hero, glowing accents and restrained motion.",
      hi: "बड़े एडिटोरियल हीरो, चमकते एक्सेंट और संयमित मोशन वाला डार्क पोर्टफ़ोलियो वेबसाइट कॉन्सेप्ट।",
    },
    category: "websites",
    image: "/images/portfolio/website-01.svg",
    alt: {
      en: "Dark premium website mockup with a large hero headline",
      hi: "बड़ी हीरो हेडलाइन वाला डार्क प्रीमियम वेबसाइट मॉकअप",
    },
    isSample: true,
    featured: true,
    aspect: "wide",
    tags: { en: ["Website", "UI/UX"], hi: ["वेबसाइट", "UI/UX"] },
  },
  {
    id: "northline-agency",
    title: { en: "Northline — Agency Website", hi: "नॉर्थलाइन — एजेंसी वेबसाइट" },
    description: {
      en: "A light, editorial agency layout using generous whitespace and structured case-study blocks.",
      hi: "खुली जगह और संरचित केस-स्टडी ब्लॉक का उपयोग करता लाइट एडिटोरियल एजेंसी लेआउट।",
    },
    category: "websites",
    image: "/images/portfolio/website-02.svg",
    alt: {
      en: "Light editorial agency website mockup with structured sections",
      hi: "संरचित सेक्शन वाला लाइट एडिटोरियल एजेंसी वेबसाइट मॉकअप",
    },
    isSample: true,
    featured: false,
    aspect: "wide",
    tags: { en: ["Website", "Editorial"], hi: ["वेबसाइट", "एडिटोरियल"] },
  },
  {
    id: "monogram-system",
    title: { en: "Monogram System — Identity", hi: "मोनोग्राम सिस्टम — आइडेंटिटी" },
    description: {
      en: "A compact identity board concept: monogram, colour system and typographic direction.",
      hi: "एक संक्षिप्त आइडेंटिटी बोर्ड कॉन्सेप्ट: मोनोग्राम, रंग प्रणाली और टाइपोग्राफिक दिशा।",
    },
    category: "graphics",
    image: "/images/portfolio/graphic-01.svg",
    alt: {
      en: "Brand identity board with a circular monogram and colour swatches",
      hi: "गोल मोनोग्राम और रंग स्वैच वाला ब्रांड आइडेंटिटी बोर्ड",
    },
    isSample: true,
    featured: true,
    aspect: "square",
    tags: { en: ["Identity", "Branding"], hi: ["आइडेंटिटी", "ब्रांडिंग"] },
  },
  {
    id: "paper-ink",
    title: { en: "Paper & Ink — Stationery", hi: "पेपर एंड इंक — स्टेशनरी" },
    description: {
      en: "A stationery mockup direction with layered cards, a minimal mark and tactile paper tones.",
      hi: "लेयर्ड कार्ड, मिनिमल मार्क और टैक्टाइल पेपर टोन के साथ स्टेशनरी मॉकअप दिशा।",
    },
    category: "graphics",
    image: "/images/portfolio/graphic-02.svg",
    alt: {
      en: "Minimal business card and stationery design concept",
      hi: "मिनिमल बिज़नेस कार्ड और स्टेशनरी डिज़ाइन कॉन्सेप्ट",
    },
    isSample: true,
    featured: false,
    aspect: "square",
    tags: { en: ["Stationery", "Print"], hi: ["स्टेशनरी", "प्रिंट"] },
  },
];

export const featuredPortfolioItems = portfolioItems.filter((item) => item.featured);
