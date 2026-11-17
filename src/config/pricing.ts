import type { Localized } from "./types";

/**
 * ============================================================
 * CENTRAL PRICING CONFIGURATION
 * ============================================================
 * All prices shown on the website come from this file.
 * Change an amount here and every card, list and WhatsApp
 * message updates automatically.
 *
 * amount: null  → the package is shown as "Contact for Price".
 * prefix:
 *   "fixed"    → ₹499
 *   "starting" → Starting ₹4,999
 *   "onwards"  → ₹1,999 onwards
 *   "quote"    → Contact for Price
 */
export type PricePrefix = "fixed" | "starting" | "onwards" | "quote";

export interface PriceConfig {
  amount: number | null;
  prefix: PricePrefix;
}

export const pricing = {
  /* A. AI Photo Creation */
  "ai-photo-basic": { amount: 40, prefix: "fixed" },
  "ai-photo-premium": { amount: 99, prefix: "fixed" },
  "ai-photo-professional": { amount: 149, prefix: "fixed" },

  /* B. Banner Designing */
  "banner-basic": { amount: 500, prefix: "fixed" },
  "banner-premium": { amount: 799, prefix: "fixed" },
  "banner-professional": { amount: 1499, prefix: "fixed" },

  /* C. YouTube Graphics */
  "youtube-thumbnail-basic": { amount: 299, prefix: "fixed" },
  "youtube-thumbnail-premium": { amount: 499, prefix: "fixed" },
  "youtube-channel-banner": { amount: 399, prefix: "fixed" },
  "youtube-branding-premium": { amount: 799, prefix: "fixed" },

  /* D. AI Video Creation */
  "ai-video-15-30": { amount: 499, prefix: "fixed" },
  "ai-video-30-60": { amount: 999, prefix: "fixed" },
  "ai-video-premium": { amount: 1999, prefix: "onwards" },

  /* E. Website Development */
  "website-basic": { amount: 4999, prefix: "starting" },
  "website-business": { amount: 9999, prefix: "starting" },
  "website-premium": { amount: 19999, prefix: "starting" },

  /* F. Graphic Design — set amounts when ready, null shows "Contact for Price" */
  "graphic-logo": { amount: null, prefix: "quote" },
  "graphic-business-card": { amount: null, prefix: "quote" },
  "graphic-social-posts": { amount: null, prefix: "quote" },
  "graphic-posters": { amount: null, prefix: "quote" },
  "graphic-catalogue": { amount: null, prefix: "quote" },
  "graphic-branding": { amount: null, prefix: "quote" },
} satisfies Record<string, PriceConfig>;

export type PricingKey = keyof typeof pricing;

/** The required disclaimer shown under every pricing block. */
export const pricingNote: Localized = {
  en: "Prices are listed per package. Final quotation depends on project complexity, content, delivery requirements and revisions.",
  hi: "कीमतें प्रति पैकेज दी गई हैं। अंतिम कोटेशन प्रोजेक्ट की जटिलता, सामग्री, डिलीवरी आवश्यकताओं और रिवीजन पर निर्भर करता है।",
};

/** Extra-cost notes for specific services. */
export const pricingDisclaimers = {
  aiVideo: {
    en: "Complex scenes, extra revisions, voiceovers and longer durations may cost extra. Final scope is confirmed before the project starts.",
    hi: "जटिल सीन, अतिरिक्त रिवीजन, वॉइसओवर और अधिक अवधि के लिए अतिरिक्त शुल्क हो सकता है। प्रोजेक्ट शुरू होने से पहले अंतिम दायरा तय किया जाता है।",
  },
  website: {
    en: "Domain registration, hosting, paid APIs, maintenance and advanced integrations are not included in the base price and may cost extra.",
    hi: "डोमेन रजिस्ट्रेशन, होस्टिंग, पेड API, रखरखाव और उन्नत इंटीग्रेशन बेस प्राइस में शामिल नहीं हैं और इनका अतिरिक्त शुल्क हो सकता है।",
  },
  aiPhoto: {
    en: "Final output depends on your requirements and the reference material you provide.",
    hi: "अंतिम परिणाम आपकी आवश्यकताओं और दिए गए रेफरेंस मटेरियल पर निर्भर करता है।",
  },
} as const;
