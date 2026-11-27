import type { Localized } from "./types";

export interface LegalSection {
  id: string;
  heading: Localized;
  paragraphs: { en: string[]; hi: string[] };
}

export interface LegalDocument {
  updated: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  updated: "2026-01-01",
  sections: [
    {
      id: "who-we-are",
      heading: { en: "1. Who we are", hi: "1. हम कौन हैं" },
      paragraphs: {
        en: [
          "Haryana Creative is an independent digital creative service brand founded by Sahil. References to “we”, “us” or “the studio” mean Haryana Creative.",
          "This policy explains what information is involved when you browse this website or send a project inquiry through the order form, contact form, email or WhatsApp.",
        ],
        hi: [
          "नेक्सोरा क्रिएटिव स्टूडियो एक स्वतंत्र डिजिटल क्रिएटिव सेवा ब्रांड है, जिसकी स्थापना साहिल ने की है। “हम”, “हमारा” या “स्टूडियो” से तात्पर्य नेक्सोरा क्रिएटिव स्टूडियो है।",
          "यह नीति बताती है कि इस वेबसाइट को देखते समय या ऑर्डर फ़ॉर्म, संपर्क फ़ॉर्म, ईमेल अथवा WhatsApp के ज़रिए प्रोजेक्ट पूछताछ भेजते समय कौन-सी जानकारी शामिल होती है।",
        ],
      },
    },
    {
      id: "information-you-provide",
      heading: {
        en: "2. Information you choose to provide",
        hi: "2. आपके द्वारा दी गई जानकारी",
      },
      paragraphs: {
        en: [
          "The order form may ask for your name, WhatsApp number, optional email address, country, selected service and package, project description, preferred delivery date and additional instructions.",
          "You may also select reference image or video files. Those files are previewed locally in your browser only; they are not uploaded to this website. You choose whether to attach them inside the WhatsApp chat.",
          "Please do not send sensitive personal information such as government IDs, payment credentials, passwords or confidential business documents that are not needed for your project.",
        ],
        hi: [
          "ऑर्डर फ़ॉर्म में आपका नाम, WhatsApp नंबर, वैकल्पिक ईमेल पता, देश, चुनी गई सेवा और पैकेज, प्रोजेक्ट विवरण, पसंदीदा डिलीवरी तिथि और अतिरिक्त निर्देश पूछे जा सकते हैं।",
          "आप रेफरेंस इमेज या वीडियो फ़ाइलें भी चुन सकते हैं। ये फ़ाइलें केवल आपके ब्राउज़र में लोकल रूप से प्रीव्यू होती हैं; इन्हें इस वेबसाइट पर अपलोड नहीं किया जाता। आप तय करते हैं कि उन्हें WhatsApp चैट में अटैच करना है या नहीं।",
          "कृपया सरकारी पहचान पत्र, भुगतान क्रेडेंशियल, पासवर्ड या ऐसे गोपनीय व्यावसायिक दस्तावेज़ न भेजें जो आपके प्रोजेक्ट के लिए आवश्यक न हों।",
        ],
      },
    },
    {
      id: "how-we-use-it",
      heading: { en: "3. How information is used", hi: "3. जानकारी का उपयोग कैसे होता है" },
      paragraphs: {
        en: [
          "Information you send is used to understand your requirements, prepare a quotation, respond to your questions, agree the project scope and deliver the work you request.",
          "We do not sell your information, and this website does not use your details for advertising profiles or automated marketing.",
        ],
        hi: [
          "आपके द्वारा भेजी गई जानकारी का उपयोग आपकी आवश्यकताओं को समझने, कोटेशन तैयार करने, आपके सवालों का जवाब देने, प्रोजेक्ट का दायरा तय करने और आपके अनुरोधित कार्य को डिलीवर करने के लिए किया जाता है।",
          "हम आपकी जानकारी नहीं बेचते, और यह वेबसाइट आपके विवरण का उपयोग विज्ञापन प्रोफ़ाइल या स्वचालित मार्केटिंग के लिए नहीं करती।",
        ],
      },
    },
    {
      id: "how-it-is-transmitted",
      heading: {
        en: "4. How the forms work",
        hi: "4. फ़ॉर्म कैसे काम करते हैं",
      },
      paragraphs: {
        en: [
          "This website does not run its own backend database. When you submit the order or contact form, the site generates a prepared WhatsApp message and opens WhatsApp on your device. Nothing is submitted to a Haryana server.",
          "If WhatsApp is unavailable, the site can prepare the same message for you to copy. You control whether and how the message is sent.",
          "WhatsApp is operated by Meta. Messages sent through WhatsApp are processed under WhatsApp's own terms and privacy policy.",
        ],
        hi: [
          "यह वेबसाइट अपना बैकएंड डेटाबेस नहीं चलाती। जब आप ऑर्डर या संपर्क फ़ॉर्म सबमिट करते हैं, तो साइट एक तैयार WhatsApp संदेश बनाकर आपके डिवाइस पर WhatsApp खोलती है। नेक्सोरा के किसी सर्वर पर कुछ भी सबमिट नहीं होता।",
          "यदि WhatsApp उपलब्ध नहीं है, तो साइट वही संदेश कॉपी करने के लिए तैयार कर सकती है। संदेश भेजना है या नहीं और कैसे भेजना है, यह आप तय करते हैं।",
          "WhatsApp, Meta द्वारा संचालित है। WhatsApp के ज़रिए भेजे गए संदेश WhatsApp की अपनी शर्तों और गोपनीयता नीति के अंतर्गत संसाधित होते हैं।",
        ],
      },
    },
    {
      id: "storage",
      heading: { en: "5. Storage and retention", hi: "5. संग्रहण और अवधि" },
      paragraphs: {
        en: [
          "Project inquiries exist in the WhatsApp conversation, your email provider's mailbox or the device used to send them. The studio keeps a conversation for as long as needed to respond, deliver the project and handle any follow-up.",
          "You can ask us to delete a conversation from our side by contacting the studio. Copies that remain on your own device, WhatsApp backups or email provider are controlled by you and those providers.",
        ],
        hi: [
          "प्रोजेक्ट पूछताछ WhatsApp बातचीत, आपके ईमेल प्रदाता के मेलबॉक्स या भेजने में उपयोग किए गए डिवाइस में मौजूद रहती है। स्टूडियो बातचीत को उतने समय तक रखता है जितना उत्तर देने, प्रोजेक्ट डिलीवर करने और आगे की सहायता के लिए आवश्यक हो।",
          "आप स्टूडियो से संपर्क करके हमारी ओर से बातचीत हटाने का अनुरोध कर सकते हैं। आपके अपने डिवाइस, WhatsApp बैकअप या ईमेल प्रदाता पर बची प्रतियाँ आपके और उन प्रदाताओं के नियंत्रण में होती हैं।",
        ],
      },
    },
    {
      id: "local-storage",
      heading: {
        en: "6. Local storage and cookies",
        hi: "6. लोकल स्टोरेज और कुकीज़",
      },
      paragraphs: {
        en: [
          "The site stores your language preference (English or Hindi) in your browser's local storage so it is remembered on your next visit. This is not sent to a server and you can clear it at any time through your browser settings.",
          "This website does not use advertising cookies or its own analytics tracking. Third-party services such as Google Fonts may receive standard technical information, including your IP address, when your browser requests their files. Hosting providers may keep standard server logs.",
        ],
        hi: [
          "साइट आपकी भाषा पसंद (अंग्रेज़ी या हिन्दी) को आपके ब्राउज़र के लोकल स्टोरेज में रखती है ताकि अगली बार वह याद रहे। यह किसी सर्वर पर नहीं भेजा जाता और आप ब्राउज़र सेटिंग्स से इसे कभी भी साफ़ कर सकते हैं।",
          "यह वेबसाइट विज्ञापन कुकीज़ या अपनी एनालिटिक्स ट्रैकिंग का उपयोग नहीं करती। Google Fonts जैसी तृतीय-पक्ष सेवाएँ, जब आपका ब्राउज़र उनकी फ़ाइलें माँगता है, तो मानक तकनीकी जानकारी (जैसे आपका IP पता) प्राप्त कर सकती हैं। होस्टिंग प्रदाता मानक सर्वर लॉग रख सकते हैं।",
        ],
      },
    },
    {
      id: "third-parties",
      heading: { en: "7. Third-party services", hi: "7. तृतीय-पक्ष सेवाएँ" },
      paragraphs: {
        en: [
          "The site links to or relies on services such as WhatsApp, your email provider, Google Fonts and the hosting provider. These services have their own privacy policies and controls, which we do not manage.",
          "Social media links in the footer are shown only when configured. Visiting those platforms is subject to their own policies.",
        ],
        hi: [
          "साइट WhatsApp, आपके ईमेल प्रदाता, Google Fonts और होस्टिंग प्रदाता जैसी सेवाओं से जुड़ती है या उन पर निर्भर करती है। इन सेवाओं की अपनी गोपनीयता नीतियाँ और नियंत्रण हैं, जिन्हें हम प्रबंधित नहीं करते।",
          "फ़ुटर में सोशल मीडिया लिंक केवल कॉन्फ़िगर होने पर दिखाए जाते हैं। उन प्लेटफ़ॉर्म पर जाना उनकी अपनी नीतियों के अधीन है।",
        ],
      },
    },
    {
      id: "children",
      heading: { en: "8. Children", hi: "8. बच्चे" },
      paragraphs: {
        en: [
          "The studio's services are intended for individuals and businesses who can enter into a service agreement. The website is not directed at children, and we do not knowingly collect information from children.",
        ],
        hi: [
          "स्टूडियो की सेवाएँ उन व्यक्तियों और व्यवसायों के लिए हैं जो सेवा समझौता कर सकते हैं। यह वेबसाइट बच्चों के लिए नहीं है, और हम जानबूझकर बच्चों से जानकारी एकत्र नहीं करते।",
        ],
      },
    },
    {
      id: "your-choices",
      heading: { en: "9. Your choices", hi: "9. आपके विकल्प" },
      paragraphs: {
        en: [
          "You can ask what project information we hold about you, request corrections, or ask us to delete a conversation. Depending on where you live, local law may give you additional rights.",
          "To make a request, contact the studio using the details on the Contact page. Please include enough information for us to identify the relevant conversation.",
        ],
        hi: [
          "आप पूछ सकते हैं कि हमारे पास आपके प्रोजेक्ट की कौन-सी जानकारी है, सुधार का अनुरोध कर सकते हैं, या बातचीत हटाने के लिए कह सकते हैं। आप कहाँ रहते हैं, इसके अनुसार स्थानीय कानून आपको अतिरिक्त अधिकार दे सकता है।",
          "अनुरोध करने के लिए संपर्क पेज पर दिए विवरण का उपयोग करें। कृपया पर्याप्त जानकारी दें ताकि हम संबंधित बातचीत पहचान सकें।",
        ],
      },
    },
    {
      id: "changes",
      heading: { en: "10. Changes and contact", hi: "10. बदलाव और संपर्क" },
      paragraphs: {
        en: [
          "This policy may be updated as the website or services change. The updated date at the top of the page shows when it was last revised.",
          "For privacy questions, contact Haryana Creative through the Contact page or the email address configured there. If no email is shown, use the WhatsApp channel.",
        ],
        hi: [
          "वेबसाइट या सेवाओं में बदलाव के साथ यह नीति अपडेट हो सकती है। पेज के ऊपर दी गई अद्यतन तिथि बताती है कि इसे अंतिम बार कब संशोधित किया गया।",
          "गोपनीयता से जुड़े सवालों के लिए संपर्क पेज के ज़रिए या वहाँ कॉन्फ़िगर किए गए ईमेल पते पर नेक्सोरा क्रिएटिव स्टूडियो से संपर्क करें। यदि कोई ईमेल नहीं दिख रहा, तो WhatsApp माध्यम का उपयोग करें।",
        ],
      },
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  updated: "2026-01-01",
  sections: [
    {
      id: "about",
      heading: { en: "1. About these terms", hi: "1. इन शर्तों के बारे में" },
      paragraphs: {
        en: [
          "These terms apply to the Haryana Creative website and to service inquiries and orders placed through it. By using the site or sending an inquiry, you agree to these terms.",
          "A project-specific written agreement, quotation or scope document shared with you may add to or override parts of these general terms.",
        ],
        hi: [
          "ये शर्तें नेक्सोरा क्रिएटिव स्टूडियो की वेबसाइट और उसके ज़रिए की गई सेवा पूछताछ व ऑर्डर पर लागू होती हैं। साइट का उपयोग करके या पूछताछ भेजकर आप इन शर्तों से सहमत होते हैं।",
          "आपके साथ साझा किया गया परियोजना-विशेष लिखित समझौता, कोटेशन या दायरा दस्तावेज़ इन सामान्य शर्तों में जोड़ सकता है या उनके कुछ हिस्सों को बदल सकता है।",
        ],
      },
    },
    {
      id: "services-quotes",
      heading: { en: "2. Services and quotations", hi: "2. सेवाएँ और कोटेशन" },
      paragraphs: {
        en: [
          "Services include AI photo creation, banner design, YouTube graphics, AI video creation, website development and graphic design, as described on this website. Descriptions are indicative; the exact deliverable is confirmed in the project brief.",
          "Prices shown on the website are starting prices in Indian Rupees (INR). The final quotation depends on project complexity, content, delivery requirements and revisions, and is confirmed in writing before work begins.",
          "Prices may change in the future. The quote confirmed for your project is the one that applies to that project.",
        ],
        hi: [
          "सेवाओं में AI फोटो क्रिएशन, बैनर डिज़ाइन, YouTube ग्राफ़िक्स, AI वीडियो क्रिएशन, वेबसाइट डेवलपमेंट और ग्राफ़िक डिज़ाइन शामिल हैं, जैसा इस वेबसाइट पर वर्णित है। विवरण सांकेतिक हैं; सटीक डिलीवरेबल प्रोजेक्ट ब्रीफ़ में तय किया जाता है।",
          "वेबसाइट पर दिखाई गई कीमतें भारतीय रुपयों (INR) में शुरुआती कीमतें हैं। अंतिम कोटेशन प्रोजेक्ट की जटिलता, सामग्री, डिलीवरी आवश्यकताओं और रिवीजन पर निर्भर करता है, और काम शुरू होने से पहले लिखित रूप में कन्फ़र्म किया जाता है।",
          "कीमतें भविष्य में बदल सकती हैं। आपके प्रोजेक्ट के लिए कन्फ़र्म किया गया कोटेशन ही उस प्रोजेक्ट पर लागू होगा।",
        ],
      },
    },
    {
      id: "orders",
      heading: { en: "3. Inquiries and orders", hi: "3. पूछताछ और ऑर्डर" },
      paragraphs: {
        en: [
          "Submitting the website form or opening WhatsApp does not create a confirmed order. An order becomes confirmed only when the studio has reviewed your brief and both sides have agreed the scope, quotation and delivery plan in writing.",
          "The studio may decline a project if the requested work is unlawful, infringing, misleading, or outside the studio's capabilities.",
        ],
        hi: [
          "वेबसाइट फ़ॉर्म सबमिट करने या WhatsApp खोलने से कन्फ़र्म ऑर्डर नहीं बनता। ऑर्डर तभी कन्फ़र्म होता है जब स्टूडियो आपकी ब्रीफ़ की समीक्षा कर ले और दोनों पक्ष लिखित रूप में दायरा, कोटेशन और डिलीवरी योजना पर सहमत हो जाएँ।",
          "यदि अनुरोधित कार्य गैरकानूनी, अधिकार-भंग करने वाला, भ्रामक या स्टूडियो की क्षमता से बाहर है, तो स्टूडियो प्रोजेक्ट अस्वीकार कर सकता है।",
        ],
      },
    },
    {
      id: "payment",
      heading: { en: "4. Payment", hi: "4. भुगतान" },
      paragraphs: {
        en: [
          "Payment methods and any advance, milestone or final payment schedule are agreed directly between you and the studio before work begins. This website does not process payments or collect card or banking details.",
          "Work may be paused or withheld if agreed payments are not made, or if required content and feedback are not provided.",
        ],
        hi: [
          "भुगतान के तरीके और किसी भी अग्रिम, चरण या अंतिम भुगतान की योजना काम शुरू होने से पहले आपके और स्टूडियो के बीच सीधे तय की जाती है। यह वेबसाइट भुगतान संसाधित नहीं करती और कार्ड या बैंकिंग विवरण एकत्र नहीं करती।",
          "यदि सहमत भुगतान नहीं होते, या आवश्यक सामग्री और फ़ीडबैक नहीं मिलता, तो कार्य रोका या रोका जा सकता है।",
        ],
      },
    },
    {
      id: "revisions",
      heading: { en: "5. Revisions", hi: "5. रिवीजन" },
      paragraphs: {
        en: [
          "The revision scope for your package is agreed before the order is confirmed. Revisions within that scope are handled as part of the project.",
          "Additional revisions or fundamental changes to the approved direction may be charged extra. Any extra cost is discussed and agreed with you before the additional work is done.",
        ],
        hi: [
          "आपके पैकेज के लिए रिवीजन का दायरा ऑर्डर कन्फ़र्म होने से पहले तय किया जाता है। उस दायरे के भीतर के रिवीजन प्रोजेक्ट का हिस्सा होते हैं।",
          "अतिरिक्त रिवीजन या स्वीकृत दिशा में बड़े बदलाव का अतिरिक्त शुल्क हो सकता है। अतिरिक्त काम से पहले किसी भी अतिरिक्त खर्च पर आपसे चर्चा और सहमति की जाती है।",
        ],
      },
    },
    {
      id: "delivery",
      heading: { en: "6. Delivery", hi: "6. डिलीवरी" },
      paragraphs: {
        en: [
          "The delivery timeline is confirmed per project based on scope and workload. Delivery may be affected by late content, delayed feedback or changes to the brief.",
          "Final files are delivered through the channel agreed with you (for example WhatsApp, cloud storage or email) in the formats specified in the brief. You are responsible for downloading and backing up the files after delivery.",
        ],
        hi: [
          "डिलीवरी समय-सीमा प्रत्येक प्रोजेक्ट के लिए दायरा और कार्यभार के आधार पर तय की जाती है। देर से सामग्री मिलने, फ़ीडबैक में देरी या ब्रीफ़ में बदलाव से डिलीवरी प्रभावित हो सकती है।",
          "अंतिम फ़ाइलें आपके साथ तय किए गए माध्यम (जैसे WhatsApp, क्लाउड स्टोरेज या ईमेल) के ज़रिए ब्रीफ़ में निर्दिष्ट फ़ॉर्मेट में डिलीवर की जाती हैं। डिलीवरी के बाद फ़ाइलें डाउनलोड करना और उनका बैकअप रखना आपकी ज़िम्मेदारी है।",
        ],
      },
    },
    {
      id: "client-responsibilities",
      heading: {
        en: "7. Client responsibilities",
        hi: "7. ग्राहक की ज़िम्मेदारियाँ",
      },
      paragraphs: {
        en: [
          "You confirm that you have the necessary rights and permissions for any text, logos, images, video, music or other material you provide, and that using them will not infringe another party's rights.",
          "You agree to provide accurate project information, timely feedback and the content needed to complete the work. You are responsible for reviewing final deliverables before publishing or commercial use.",
        ],
        hi: [
          "आप पुष्टि करते हैं कि आपके द्वारा दिए गए किसी भी टेक्स्ट, लोगो, इमेज, वीडियो, संगीत या अन्य सामग्री के लिए आपके पास आवश्यक अधिकार और अनुमतियाँ हैं, और उनका उपयोग किसी अन्य पक्ष के अधिकारों का उल्लंघन नहीं करेगा।",
          "आप सही प्रोजेक्ट जानकारी, समय पर फ़ीडबैक और काम पूरा करने के लिए आवश्यक सामग्री देने पर सहमत होते हैं। प्रकाशन या व्यावसायिक उपयोग से पहले अंतिम डिलीवरेबल की समीक्षा करना आपकी ज़िम्मेदारी है।",
        ],
      },
    },
    {
      id: "ai-content",
      heading: { en: "8. AI-generated content", hi: "8. AI-जनरेटेड सामग्री" },
      paragraphs: {
        en: [
          "AI-assisted outputs can vary, may contain unexpected details and may not be unique across tools or users. We review and edit outputs as part of the design process, but we cannot guarantee that an AI image or video will be entirely free of artefacts or similar to any other output.",
          "You are responsible for checking that the final deliverable is suitable for your intended use and complies with the terms of any platform where you publish it.",
        ],
        hi: [
          "AI-सहायता प्राप्त परिणाम बदल सकते हैं, उनमें अप्रत्याशित विवरण हो सकते हैं और वे टूल्स या उपयोगकर्ताओं के बीच अद्वितीय नहीं हो सकते। हम डिज़ाइन प्रक्रिया के हिस्से के रूप में परिणामों की समीक्षा और एडिटिंग करते हैं, लेकिन हम यह गारंटी नहीं दे सकते कि कोई AI इमेज या वीडियो पूरी तरह त्रुटि-मुक्त या किसी अन्य परिणाम से पूर्णतः भिन्न होगा।",
          "अंतिम डिलीवरेबल आपके इच्छित उपयोग के लिए उपयुक्त है और जिस प्लेटफ़ॉर्म पर आप उसे प्रकाशित करते हैं उसकी शर्तों का पालन करता है, यह जाँचना आपकी ज़िम्मेदारी है।",
        ],
      },
    },
    {
      id: "ip",
      heading: { en: "9. Intellectual property", hi: "9. बौद्धिक संपदा" },
      paragraphs: {
        en: [
          "Unless otherwise agreed in writing, rights in the final paid deliverables transfer to you once the agreed fees have been paid in full. The studio retains the right to reuse general techniques, skills and non-confidential know-how.",
          "Third-party assets (fonts, stock media, music, APIs or platform assets) remain subject to their own licences. Any such assets and their licensing costs are disclosed where relevant.",
          "Client work is not published in the studio portfolio without permission.",
        ],
        hi: [
          "जब तक लिखित रूप में अन्यथा सहमति न हो, सहमत शुल्क पूरा मिलने के बाद अंतिम भुगतान किए गए डिलीवरेबल के अधिकार आपको हस्तांतरित हो जाते हैं। स्टूडियो सामान्य तकनीकों, कौशल और गैर-गोपनीय जानकारी के पुन: उपयोग का अधिकार रखता है।",
          "तृतीय-पक्ष संपत्तियाँ (फ़ॉन्ट, स्टॉक मीडिया, संगीत, API या प्लेटफ़ॉर्म संपत्तियाँ) अपने स्वयं के लाइसेंस के अधीन रहती हैं। ऐसी संपत्तियाँ और उनके लाइसेंस शुल्क, जहाँ प्रासंगिक हों, बताए जाते हैं।",
          "अनुमति के बिना ग्राहक का काम स्टूडियो पोर्टफ़ोलियो में प्रकाशित नहीं किया जाता।",
        ],
      },
    },
    {
      id: "refunds",
      heading: { en: "10. Cancellations and refunds", hi: "10. रद्दीकरण और रिफ़ंड" },
      paragraphs: {
        en: [
          "Cancellation and refund requests are reviewed case by case. Work already completed, delivered or purchased on your behalf (such as licences or third-party services) may not be refundable.",
          "Any specific cancellation or refund arrangement for your project is confirmed in writing before work begins.",
        ],
        hi: [
          "रद्दीकरण और रिफ़ंड अनुरोध की समीक्षा मामले-दर-मामले की जाती है। पहले से पूरा, डिलीवर या आपकी ओर से खरीदा गया काम (जैसे लाइसेंस या तृतीय-पक्ष सेवाएँ) वापसी योग्य नहीं हो सकता।",
          "आपके प्रोजेक्ट के लिए रद्दीकरण या रिफ़ंड की कोई विशिष्ट व्यवस्था काम शुरू होने से पहले लिखित रूप में कन्फ़र्म की जाती है।",
        ],
      },
    },
    {
      id: "third-party-costs",
      heading: {
        en: "11. Third-party costs",
        hi: "11. तृतीय-पक्ष खर्च",
      },
      paragraphs: {
        en: [
          "Domain registration, hosting, paid APIs, stock assets, premium fonts, maintenance and advanced integrations are not included in website starting prices unless stated in writing.",
          "Such costs are usually paid directly to the relevant provider. We can recommend options but are not responsible for third-party pricing, availability or service changes.",
        ],
        hi: [
          "डोमेन रजिस्ट्रेशन, होस्टिंग, पेड API, स्टॉक संपत्तियाँ, प्रीमियम फ़ॉन्ट, रखरखाव और उन्नत इंटीग्रेशन, जब तक लिखित रूप में न कहा गया हो, वेबसाइट की शुरुआती कीमतों में शामिल नहीं हैं।",
          "ऐसे खर्च आमतौर पर सीधे संबंधित प्रदाता को दिए जाते हैं। हम विकल्प सुझा सकते हैं, लेकिन तृतीय-पक्ष कीमत, उपलब्धता या सेवा में बदलाव के लिए ज़िम्मेदार नहीं हैं।",
        ],
      },
    },
    {
      id: "liability",
      heading: { en: "12. Limitation of liability", hi: "12. दायित्व की सीमा" },
      paragraphs: {
        en: [
          "The website and its content are provided in good faith, but the site is provided without warranties of uninterrupted availability or error-free operation.",
          "To the extent permitted by law, the studio is not liable for indirect or consequential losses, lost profits, or issues caused by third-party platforms, AI tool outputs or content supplied by the client.",
        ],
        hi: [
          "यह वेबसाइट और इसकी सामग्री सद्भावना से प्रदान की गई है, लेकिन साइट निरंतर उपलब्धता या त्रुटि-मुक्त संचालन की कोई गारंटी के बिना प्रदान की जाती है।",
          "कानून द्वारा अनुमत सीमा तक, स्टूडियो अप्रत्यक्ष या परिणामी नुकसान, खोए हुए लाभ, या तृतीय-पक्ष प्लेटफ़ॉर्म, AI टूल के परिणामों अथवा ग्राहक द्वारा दी गई सामग्री से होने वाली समस्याओं के लिए उत्तरदायी नहीं है।",
        ],
      },
    },
    {
      id: "prohibited",
      heading: { en: "13. Prohibited use", hi: "13. निषिद्ध उपयोग" },
      paragraphs: {
        en: [
          "You may not use the studio's services or this website for unlawful, deceptive, defamatory, infringing or harmful purposes. The studio may refuse or stop work that appears to fall into these categories.",
        ],
        hi: [
          "आप स्टूडियो की सेवाओं या इस वेबसाइट का उपयोग गैरकानूनी, भ्रामक, मानहानिकारक, अधिकार-भंग करने वाले या हानिकारक उद्देश्यों के लिए नहीं कर सकते। स्टूडियो ऐसी श्रेणियों में आने वाले काम को अस्वीकार या रोक सकता है।",
        ],
      },
    },
    {
      id: "confidentiality",
      heading: { en: "14. Confidentiality", hi: "14. गोपनीयता" },
      paragraphs: {
        en: [
          "Both sides agree to keep project-related confidential information private and to use it only for the purpose of the project, unless disclosure is required by law or the information is already public.",
        ],
        hi: [
          "दोनों पक्ष प्रोजेक्ट से जुड़ी गोपनीय जानकारी को निजी रखने और उसका उपयोग केवल प्रोजेक्ट के उद्देश्य के लिए करने पर सहमत हैं, जब तक कानून द्वारा प्रकटीकरण आवश्यक न हो या जानकारी पहले से सार्वजनिक न हो।",
        ],
      },
    },
    {
      id: "law",
      heading: { en: "15. Governing law and disputes", hi: "15. लागू कानून और विवाद" },
      paragraphs: {
        en: [
          "These terms are governed by the laws of India. If a dispute arises, both sides agree to first try to resolve it through good-faith discussion.",
          "Nothing in these terms removes rights that cannot be excluded under applicable law.",
        ],
        hi: [
          "ये शर्तें भारत के कानूनों द्वारा संचालित हैं। विवाद उत्पन्न होने पर दोनों पक्ष पहले सद्भावना से चर्चा के माध्यम से उसे सुलझाने का प्रयास करने पर सहमत हैं।",
          "इन शर्तों में कुछ भी ऐसे अधिकारों को समाप्त नहीं करता जिन्हें लागू कानून के तहत बाहर नहीं रखा जा सकता।",
        ],
      },
    },
    {
      id: "changes-terms",
      heading: { en: "16. Changes and contact", hi: "16. बदलाव और संपर्क" },
      paragraphs: {
        en: [
          "These terms may be updated from time to time. The version in effect when you place an order applies to that order, together with any project-specific agreement.",
          "For questions about these terms, contact Haryana Creative through the Contact page. These terms are a general template and are not legal advice.",
        ],
        hi: [
          "ये शर्तें समय-समय पर अपडेट हो सकती हैं। जिस संस्करण के समय आप ऑर्डर करते हैं, वही उस ऑर्डर पर लागू होता है, साथ में परियोजना-विशेष समझौता भी।",
          "इन शर्तों के बारे में सवालों के लिए संपर्क पेज के ज़रिए नेक्सोरा क्रिएटिव स्टूडियो से संपर्क करें। ये शर्तें सामान्य टेम्पलेट हैं और कानूनी सलाह नहीं हैं।",
        ],
      },
    },
  ],
};
