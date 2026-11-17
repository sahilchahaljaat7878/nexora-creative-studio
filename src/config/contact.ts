/**
 * Contact configuration.
 *
 * ⚠️ Replace the placeholders below with your real details.
 * The UI detects placeholder values and shows a friendly setup notice
 * instead of generating a broken link. No phone number is invented here.
 */
export const contact = {
  /**
   * WhatsApp number in international format, digits only, WITHOUT "+" or spaces.
   * Example: 919876543210  (country code 91 + number)
   */
  whatsappNumber: "918571056447",

  /** Public contact email. Example: hello@yourdomain.com */
  email: "sahilchahaljaat7878@gmail.com",

  /** Optional business location shown on the contact page. Leave empty to hide. */
  location: "India",

  /** Optional working hours. Leave empty to hide. */
  workingHours: "Any time — messages answered as they arrive",

  /** Shown on the contact page — adjust to your real response practice. */
  responseNote: {
    en: "Messages are answered manually. Response times may vary depending on workload and time zone.",
    hi: "संदेशों का उत्तर व्यक्तिगत रूप से दिया जाता है। कार्यभार और समय क्षेत्र के अनुसार उत्तर देने में समय अलग हो सकता है।",
  },
} as const;

export const WHATSAPP_PLACEHOLDER = "YOUR_WHATSAPP_NUMBER";
export const EMAIL_PLACEHOLDER = "YOUR_EMAIL_ADDRESS";

export const isWhatsAppConfigured = (): boolean => {
  const number: string = contact.whatsappNumber;
  return number !== WHATSAPP_PLACEHOLDER && /^\d{8,15}$/.test(number);
};

export const isEmailConfigured = (): boolean => {
  const address: string = contact.email;
  return address !== EMAIL_PLACEHOLDER && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
};

/**
 * Human-readable version of the WhatsApp number, e.g. "+91 85710 56447".
 * Returns an empty string while the number is still a placeholder.
 */
export const formatWhatsAppNumber = (): string => {
  const raw = contact.whatsappNumber;
  if (!/^\d{8,15}$/.test(raw)) return "";
  const local = raw.slice(-10);
  const country = raw.slice(0, raw.length - 10);
  const grouped = local.replace(/(\d{5})(\d{5})$/, "$1 $2");
  return `${country ? `+${country} ` : ""}${grouped}`;
};
