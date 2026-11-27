import { contact, isWhatsAppConfigured } from "@/config/contact";
import type { Language } from "@/config/types";
import { formatDateForMessage } from "@/lib/pricing";

/** Build an official wa.me URL with a properly encoded message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Open WhatsApp in a new tab.
 * Returns false when the number has not been configured, so the UI can
 * show a manual fallback instead of a broken link.
 */
export function openWhatsApp(message: string): boolean {
  if (!isWhatsAppConfigured()) return false;
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  return true;
}

export interface InquiryDetails {
  fullName: string;
  whatsapp: string;
  email?: string;
  country?: string;
  service: string;
  packageName?: string;
  priceLabel?: string;
  description: string;
  deliveryDate?: string;
  instructions?: string;
  imageName?: string;
  videoName?: string;
}

const labels = {
  en: {
    title: "NEW PROJECT INQUIRY",
    studio: "Haryana Creative",
    service: "SERVICE",
    serviceLabel: "Service",
    packageLabel: "Package",
    priceLabel: "Price",
    client: "CLIENT",
    name: "Name",
    whatsapp: "WhatsApp",
    email: "Email",
    country: "Country",
    project: "PROJECT",
    description: "Project description",
    delivery: "Preferred delivery date",
    image: "Reference image",
    video: "Reference video",
    instructions: "Additional instructions",
    notProvided: "Not provided",
    attach: "selected — I will attach this file manually in the chat",
    agreement: "I agree to the Terms & Conditions and Privacy Policy.",
    note: "Note: this is an inquiry. The project is confirmed only after the studio replies and both sides agree on scope, pricing and delivery.",
    sentFrom: "Sent from the Haryana Creative website.",
  },
  hi: {
    title: "नई प्रोजेक्ट पूछताछ",
    studio: "नेक्सोरा क्रिएटिव स्टूडियो",
    service: "सेवा",
    serviceLabel: "सेवा",
    packageLabel: "पैकेज",
    priceLabel: "कीमत",
    client: "ग्राहक",
    name: "नाम",
    whatsapp: "WhatsApp",
    email: "ईमेल",
    country: "देश",
    project: "प्रोजेक्ट",
    description: "प्रोजेक्ट विवरण",
    delivery: "पसंदीदा डिलीवरी तिथि",
    image: "रेफरेंस इमेज",
    video: "रेफरेंस वीडियो",
    instructions: "अतिरिक्त निर्देश",
    notProvided: "नहीं दिया गया",
    attach: "चुनी गई — मैं इसे चैट में मैन्युअल रूप से अटैच करूँगा/करूँगी",
    agreement: "मैं नियम व शर्तें और गोपनीयता नीति से सहमत हूँ।",
    note: "ध्यान दें: यह एक पूछताछ है। प्रोजेक्ट तभी कन्फ़र्म होता है जब स्टूडियो उत्तर दे और दोनों पक्ष दायरा, कीमत और डिलीवरी पर सहमत हों।",
    sentFrom: "नेक्सोरा क्रिएटिव स्टूडियो वेबसाइट से भेजा गया।",
  },
} as const;

/** Prepare a complete, readable WhatsApp inquiry message. */
export function buildInquiryMessage(details: InquiryDetails, lang: Language): string {
  const l = labels[lang];
  const line = "────────────────────";
  const delivery = details.deliveryDate ? formatDateForMessage(details.deliveryDate) : l.notProvided;

  const rows = [
    `${l.title}`,
    l.studio,
    line,
    `${l.service}`,
    `${l.serviceLabel}: ${details.service}`,
  ];

  if (details.packageName) rows.push(`${l.packageLabel}: ${details.packageName}`);
  if (details.priceLabel) rows.push(`${l.priceLabel}: ${details.priceLabel}`);

  rows.push(
    "",
    l.client,
    `${l.name}: ${details.fullName}`,
    `${l.whatsapp}: ${details.whatsapp}`,
    `${l.email}: ${details.email?.trim() || l.notProvided}`,
    `${l.country}: ${details.country || l.notProvided}`,
    "",
    l.project,
    `${l.description}:`,
    details.description,
    "",
    `${l.delivery}: ${delivery}`
  );

  if (details.imageName) rows.push(`${l.image}: ${details.imageName} — ${l.attach}`);
  if (details.videoName) rows.push(`${l.video}: ${details.videoName} — ${l.attach}`);
  if (details.instructions?.trim()) rows.push(`${l.instructions}: ${details.instructions.trim()}`);

  rows.push("", l.agreement, "", l.note, "", l.sentFrom);

  return rows.join("\n");
}

/** Short message used by the floating button and hero link. */
export function buildGeneralMessage(generalText: string): string {
  return generalText;
}

export interface ContactMessageDetails {
  fullName: string;
  whatsapp: string;
  email?: string;
  service: string;
  message: string;
}

const contactLabels = {
  en: {
    title: "NEW WEBSITE ENQUIRY",
    studio: "Haryana Creative",
    name: "Name",
    whatsapp: "WhatsApp",
    email: "Email",
    service: "Service",
    message: "Message",
    notProvided: "Not provided",
    note: "Note: this is an enquiry. A project is confirmed only after the studio replies and both sides agree on scope, pricing and delivery.",
    sentFrom: "Sent from the Haryana Creative website.",
  },
  hi: {
    title: "नई वेबसाइट पूछताछ",
    studio: "नेक्सोरा क्रिएटिव स्टूडियो",
    name: "नाम",
    whatsapp: "WhatsApp",
    email: "ईमेल",
    service: "सेवा",
    message: "संदेश",
    notProvided: "नहीं दिया गया",
    note: "ध्यान दें: यह एक पूछताछ है। प्रोजेक्ट तभी कन्फ़र्म होता है जब स्टूडियो उत्तर दे और दोनों पक्ष दायरा, कीमत और डिलीवरी पर सहमत हों।",
    sentFrom: "नेक्सोरा क्रिएटिव स्टूडियो वेबसाइट से भेजा गया।",
  },
} as const;

/** Prepare a WhatsApp message from the shorter contact form. */
export function buildContactMessage(details: ContactMessageDetails, lang: Language): string {
  const l = contactLabels[lang];
  return [
    l.title,
    l.studio,
    "────────────────────",
    `${l.name}: ${details.fullName}`,
    `${l.whatsapp}: ${details.whatsapp || l.notProvided}`,
    `${l.email}: ${details.email?.trim() || l.notProvided}`,
    `${l.service}: ${details.service}`,
    "",
    `${l.message}:`,
    details.message,
    "",
    l.note,
    "",
    l.sentFrom,
  ].join("\n");
}

/** Build a mailto link only when an email address is configured. */
export function buildEmailLink(subject: string, body: string): string | null {
  const address: string = contact.email;
  if (!address || address === "YOUR_EMAIL_ADDRESS") return null;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
