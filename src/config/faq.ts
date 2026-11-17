import type { Localized } from "./types";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

/**
 * FAQ CONTENT
 * Answers deliberately avoid promising fixed delivery times or revision
 * counts; those are confirmed per project before an order is accepted.
 */
export const faqs: FaqItem[] = [
  {
    id: "place-order",
    question: {
      en: "How can I place an order?",
      hi: "मैं ऑर्डर कैसे कर सकता/सकती हूँ?",
    },
    answer: {
      en: "Choose a service, select a package and press “Order Now”. The order form opens with your selection already filled in. Complete your brief, then press “Continue to WhatsApp” to send the prepared inquiry. The studio reviews the scope and confirms the final quotation before work begins.",
      hi: "कोई सेवा चुनें, पैकेज चुनें और “अभी ऑर्डर करें” दबाएँ। ऑर्डर फ़ॉर्म आपकी चुनी हुई सेवा के साथ खुलता है। अपनी ब्रीफ़ पूरी करें, फिर तैयार पूछताछ भेजने के लिए “WhatsApp पर जारी रखें” दबाएँ। काम शुरू होने से पहले स्टूडियो दायरा देखकर अंतिम कोटेशन कन्फ़र्म करता है।",
    },
  },
  {
    id: "payment",
    question: {
      en: "How do I pay for a service?",
      hi: "सेवा के लिए भुगतान कैसे करूँ?",
    },
    answer: {
      en: "Payment methods and the payment schedule are confirmed directly with you on WhatsApp before the project starts. This website does not collect payments, card details or banking information.",
      hi: "प्रोजेक्ट शुरू होने से पहले भुगतान के तरीके और भुगतान योजना की पुष्टि सीधे WhatsApp पर आपके साथ की जाती है। यह वेबसाइट भुगतान, कार्ड विवरण या बैंकिंग जानकारी एकत्र नहीं करती।",
    },
  },
  {
    id: "timeline",
    question: {
      en: "How long does a project take?",
      hi: "एक प्रोजेक्ट में कितना समय लगता है?",
    },
    answer: {
      en: "Timelines depend on the service, package, project complexity and the current workload. A specific delivery timeline is confirmed in writing after reviewing your brief and before the order is accepted — no fixed duration is promised on this website.",
      hi: "समय-सीमा सेवा, पैकेज, प्रोजेक्ट की जटिलता और वर्तमान कार्यभार पर निर्भर करती है। आपकी ब्रीफ़ की समीक्षा के बाद और ऑर्डर स्वीकार होने से पहले लिखित रूप में सटीक डिलीवरी समय-सीमा तय की जाती है — इस वेबसाइट पर कोई निश्चित अवधि का वादा नहीं किया गया है।",
    },
  },
  {
    id: "revisions",
    question: {
      en: "Can I request revisions?",
      hi: "क्या मैं रिवीजन माँग सकता/सकती हूँ?",
    },
    answer: {
      en: "Yes. The revision scope for your specific package is agreed before the order is confirmed. Additional revisions beyond the agreed scope may be charged extra, and any such cost is discussed with you first.",
      hi: "हाँ। आपके पैकेज के लिए रिवीजन का दायरा ऑर्डर कन्फ़र्म होने से पहले तय किया जाता है। तय दायरे से अधिक रिवीजन का अतिरिक्त शुल्क हो सकता है, और ऐसे किसी भी खर्च पर पहले आपसे चर्चा की जाती है।",
    },
  },
  {
    id: "references",
    question: {
      en: "Can I provide reference images?",
      hi: "क्या मैं रेफरेंस इमेज दे सकता/सकती हूँ?",
    },
    answer: {
      en: "Yes. You can select a reference image or video in the order form to preview it and check its format. Files are not uploaded by this website — after WhatsApp opens, attach them manually inside the chat. Please only share material you have the right to use.",
      hi: "हाँ। ऑर्डर फ़ॉर्म में रेफरेंस इमेज या वीडियो चुनकर आप उसे प्रीव्यू कर सकते हैं और उसका फ़ॉर्मेट जाँच सकते हैं। यह वेबसाइट फ़ाइलें अपलोड नहीं करती — WhatsApp खुलने के बाद उन्हें चैट में मैन्युअल रूप से अटैच करें। कृपया केवल वही सामग्री साझा करें जिसे उपयोग करने का अधिकार आपके पास है।",
    },
  },
  {
    id: "ai-video",
    question: {
      en: "Do you create custom AI videos?",
      hi: "क्या आप कस्टम AI वीडियो बनाते हैं?",
    },
    answer: {
      en: "Yes. We offer 15–30 second videos, 30–60 second videos and premium AI advertisements. Complex scenes, extra revisions, voiceovers and longer durations may cost extra; the exact scope is agreed before production starts.",
      hi: "हाँ। हम 15–30 सेकंड, 30–60 सेकंड के वीडियो और प्रीमियम AI विज्ञापन बनाते हैं। जटिल सीन, अतिरिक्त रिवीजन, वॉइसओवर और अधिक अवधि के लिए अतिरिक्त शुल्क हो सकता है; निर्माण शुरू होने से पहले सटीक दायरा तय किया जाता है।",
    },
  },
  {
    id: "websites",
    question: {
      en: "Do you develop business websites?",
      hi: "क्या आप बिज़नेस वेबसाइट बनाते हैं?",
    },
    answer: {
      en: "Yes. We build landing pages, portfolio sites, business websites and premium custom builds. Packages start from ₹4,999, ₹9,999 and ₹19,999 respectively; the final quotation depends on the pages, features and integrations you need.",
      hi: "हाँ। हम लैंडिंग पेज, पोर्टफ़ोलियो साइट, बिज़नेस वेबसाइट और प्रीमियम कस्टम बिल्ड बनाते हैं। पैकेज क्रमशः ₹4,999, ₹9,999 और ₹19,999 से शुरू होते हैं; अंतिम कोटेशन आपके ज़रूरी पेज, फ़ीचर और इंटीग्रेशन पर निर्भर करता है।",
    },
  },
  {
    id: "domain-hosting",
    question: {
      en: "Are domain and hosting included?",
      hi: "क्या डोमेन और होस्टिंग शामिल हैं?",
    },
    answer: {
      en: "No. Domain registration, hosting, paid APIs, maintenance and advanced integrations are separate from the website starting price. We can guide you on suitable options; you pay those providers directly.",
      hi: "नहीं। डोमेन रजिस्ट्रेशन, होस्टिंग, पेड API, रखरखाव और उन्नत इंटीग्रेशन वेबसाइट की शुरुआती कीमत से अलग हैं। हम उपयुक्त विकल्पों पर मार्गदर्शन दे सकते हैं; भुगतान आप सीधे उन प्रदाताओं को करते हैं।",
    },
  },
  {
    id: "contact",
    question: {
      en: "How can I contact Nexora?",
      hi: "मैं नेक्सोरा से कैसे संपर्क कर सकता/सकती हूँ?",
    },
    answer: {
      en: "Use the WhatsApp buttons across the site, the contact form or the email address listed on the Contact page. If a contact channel has not been configured yet, the page will clearly say so and the contact form can still prepare your message.",
      hi: "साइट पर मौजूद WhatsApp बटन, संपर्क फ़ॉर्म या संपर्क पेज पर दिए गए ईमेल पते का उपयोग करें। यदि कोई संपर्क माध्यम अभी कॉन्फ़िगर नहीं हुआ है, तो पेज स्पष्ट रूप से बताएगा और संपर्क फ़ॉर्म फिर भी आपका संदेश तैयार कर सकता है।",
    },
  },
];
