import type { Localized, LocalizedList } from "./types";
import type { PortfolioCategory, ServiceIcon } from "@/types";
import type { PricingKey } from "./pricing";

/** A sample output shown next to a package so visitors see what they get. */
export interface PackageSample {
  /** Path inside /public, e.g. "/images/samples/ai-photo-street.webp" */
  src: string;
  alt: Localized;
  /** Defaults to "image". Use "video" for .mp4/.webm clips. */
  kind?: "image" | "video";
}

export interface ServicePackage {
  /** Must match a key in src/config/pricing.ts */
  pricingKey: PricingKey;
  name: Localized;
  description: Localized;
  features: LocalizedList;
  popular?: boolean;
  /** Optional sample outputs for this exact package. */
  samples?: PackageSample[];
}

export interface Service {
  id: string;
  slug: string;
  name: Localized;
  shortName: Localized;
  tagline: Localized;
  short: Localized;
  description: Localized;
  features: LocalizedList;
  packages: ServicePackage[];
  image: string;
  imageAlt: Localized;
  icon: ServiceIcon;
  accent: {
    card: string;
    glow: string;
    dot: string;
  };
  portfolioCategory: PortfolioCategory;
}

/**
 * SERVICES CONFIGURATION
 * Edit names, descriptions, features and package copy here.
 * Prices live in src/config/pricing.ts.
 */
export const services: Service[] = [
  {
    id: "ai-photo",
    slug: "ai-photo-creation",
    name: { en: "AI Photo Creation", hi: "AI फोटो क्रिएशन" },
    shortName: { en: "AI Photo", hi: "AI फोटो" },
    tagline: {
      en: "Imagery that feels impossible — and unmistakably yours.",
      hi: "ऐसी इमेजरी जो असंभव लगे — और पूरी तरह आपकी।",
    },
    short: {
      en: "AI-generated portraits, creative transformations and product visuals built around your idea.",
      hi: "आपके आइडिया पर आधारित AI पोर्ट्रेट, क्रिएटिव ट्रांसफॉर्मेशन और प्रोडक्ट विज़ुअल्स।",
    },
    description: {
      en: "From striking AI portraits to clean product imagery, we use generative tools with a designer's eye. You share a concept, a reference or a rough idea — we craft a polished visual that fits your brand, platform and purpose.",
      hi: "आकर्षक AI पोर्ट्रेट से लेकर साफ-सुथरी प्रोडक्ट इमेजरी तक, हम जनरेटिव टूल्स को एक डिज़ाइनर की नज़र से इस्तेमाल करते हैं। आप एक कॉन्सेप्ट, रेफरेंस या आइडिया साझा करें — हम आपकी ब्रांड, प्लेटफ़ॉर्म और उद्देश्य के अनुसार एक परफेक्ट विज़ुअल तैयार करते हैं।",
    },
    features: {
      en: [
        "AI-generated portraits",
        "Creative photo transformations",
        "Background changes",
        "Professional photo enhancement",
        "Product image creation",
        "Creative social media images",
      ],
      hi: [
        "AI-जनरेटेड पोर्ट्रेट",
        "क्रिएटिव फोटो ट्रांसफॉर्मेशन",
        "बैकग्राउंड बदलना",
        "प्रोफेशनल फोटो एन्हांसमेंट",
        "प्रोडक्ट इमेज क्रिएशन",
        "क्रिएटिव सोशल मीडिया इमेज",
      ],
    },
    packages: [
      {
        pricingKey: "ai-photo-basic",
        name: { en: "Basic AI Photo", hi: "बेसिक AI फोटो" },
        description: {
          en: "A clean, single AI visual for a profile, post or quick concept.",
          hi: "प्रोफ़ाइल, पोस्ट या क्विक कॉन्सेप्ट के लिए एक साफ AI विज़ुअल।",
        },
        features: {
          en: ["Single AI-generated visual", "Standard resolution export", "One concept direction"],
          hi: ["एक AI-जनरेटेड विज़ुअल", "स्टैंडर्ड रेज़ोल्यूशन एक्सपोर्ट", "एक कॉन्सेप्ट दिशा"],
        },
        samples: [
          {
            src: "/images/samples/ai-photo-street.webp",
            alt: {
              en: "AI-generated portrait of a man leaning against a brick wall on a sunlit city street",
              hi: "धूप वाली शहर की गली में ईंट की दीवार से टिके एक आदमी का AI-जनरेटेड पोर्ट्रेट",
            },
          },
          {
            src: "/images/samples/ai-photo-statue.webp",
            alt: {
              en: "AI-generated portrait styled as a marble statue in a museum hall",
              hi: "संग्रहालय हॉल में मार्बल प्रतिमा के रूप में स्टाइल किया गया AI-जनरेटेड पोर्ट्रेट",
            },
          },
        ],
      },
      {
        pricingKey: "ai-photo-premium",
        name: { en: "Premium AI Photo", hi: "प्रीमियम AI फोटो" },
        description: {
          en: "More detail, richer lighting and a more art-directed result.",
          hi: "अधिक डिटेल, बेहतर लाइटिंग और अधिक आर्ट-डायरेक्टेड परिणाम।",
        },
        features: {
          en: [
            "Detailed AI visual",
            "High-resolution export",
            "Background styling",
            "Refined colour & lighting",
          ],
          hi: [
            "विस्तृत AI विज़ुअल",
            "हाई-रेज़ोल्यूशन एक्सपोर्ट",
            "बैकग्राउंड स्टाइलिंग",
            "बेहतर रंग और लाइटिंग",
          ],
        },
        popular: true,
      },
      {
        pricingKey: "ai-photo-professional",
        name: { en: "Professional AI Photo Editing", hi: "प्रोफेशनल AI फोटो एडिटिंग" },
        description: {
          en: "Advanced retouching and editing for imagery that needs to feel finished.",
          hi: "उन इमेजरी के लिए उन्नत रीटचिंग और एडिटिंग जिन्हें पूरी तरह परफेक्ट दिखना है।",
        },
        features: {
          en: [
            "Advanced AI editing",
            "Professional retouching",
            "Creative compositing",
            "Print-ready export",
          ],
          hi: [
            "उन्नत AI एडिटिंग",
            "प्रोफेशनल रीटचिंग",
            "क्रिएटिव कम्पोज़िटिंग",
            "प्रिंट-रेडी एक्सपोर्ट",
          ],
        },
      },
    ],
    image: "/images/services/ai-photo.svg",
    imageAlt: {
      en: "Abstract AI portrait artwork in violet and pink tones",
      hi: "वायलेट और पिंक रंगों में एब्सट्रैक्ट AI पोर्ट्रेट आर्टवर्क",
    },
    icon: "camera",
    accent: {
      card: "from-fuchsia-500/25 via-purple-500/10 to-transparent",
      glow: "bg-fuchsia-500/25",
      dot: "bg-fuchsia-400",
    },
    portfolioCategory: "ai-photos",
  },
  {
    id: "banner",
    slug: "banner-designing",
    name: { en: "Banner Designing", hi: "बैनर डिज़ाइनिंग" },
    shortName: { en: "Banner Design", hi: "बैनर डिज़ाइन" },
    tagline: {
      en: "Bold layouts built to stop the scroll.",
      hi: "स्क्रॉल रोकने के लिए बने बोल्ड लेआउट।",
    },
    short: {
      en: "Promotional banners, festive creatives and campaign visuals with clear hierarchy.",
      hi: "स्पष्ट हायरार्की के साथ प्रोमोशनल बैनर, फेस्टिव क्रिएटिव और कैंपेन विज़ुअल।",
    },
    description: {
      en: "A banner has a few seconds to communicate. We build focused compositions — strong headline, clean brand placement and a clear call to action — for social feeds, ads, events and in-store screens.",
      hi: "बैनर के पास संदेश पहुँचाने के लिए कुछ सेकंड होते हैं। हम सोशल फ़ीड, विज्ञापनों, इवेंट्स और स्टोर स्क्रीन के लिए मजबूत हेडलाइन, साफ ब्रांड प्लेसमेंट और स्पष्ट कॉल-टू-एक्शन वाली कम्पोज़िशन बनाते हैं।",
    },
    features: {
      en: [
        "Business promotional banners",
        "Festival greetings",
        "Product promotion banners",
        "Advertising banners",
        "Social media banners",
        "Business event graphics",
      ],
      hi: [
        "बिज़नेस प्रोमोशनल बैनर",
        "त्योहारों की शुभकामनाएँ",
        "प्रोडक्ट प्रमोशन बैनर",
        "विज्ञापन बैनर",
        "सोशल मीडिया बैनर",
        "बिज़नेस इवेंट ग्राफिक्स",
      ],
    },
    packages: [
      {
        pricingKey: "banner-basic",
        name: { en: "Basic Banner", hi: "बेसिक बैनर" },
        description: {
          en: "A single promotional banner for one platform or use.",
          hi: "एक प्लेटफ़ॉर्म या उपयोग के लिए एक प्रोमोशनल बैनर।",
        },
        features: {
          en: ["One banner size", "Clean typography", "Brand colours applied"],
          hi: ["एक बैनर साइज़", "साफ टाइपोग्राफी", "ब्रांड रंगों का उपयोग"],
        },
      },
      {
        pricingKey: "banner-premium",
        name: { en: "Premium Banner", hi: "प्रीमियम बैनर" },
        description: {
          en: "A more detailed banner with custom composition and visual treatment.",
          hi: "कस्टम कम्पोज़िशन और विज़ुअल ट्रीटमेंट के साथ अधिक विस्तृत बैनर।",
        },
        features: {
          en: [
            "Custom composition",
            "Enhanced visual effects",
            "Two platform sizes",
            "Export for web & print",
          ],
          hi: [
            "कस्टम कम्पोज़िशन",
            "बेहतर विज़ुअल इफ़ेक्ट्स",
            "दो प्लेटफ़ॉर्म साइज़",
            "वेब और प्रिंट के लिए एक्सपोर्ट",
          ],
        },
        popular: true,
      },
      {
        pricingKey: "banner-professional",
        name: { en: "Professional Campaign Design", hi: "प्रोफेशनल कैंपेन डिज़ाइन" },
        description: {
          en: "A coordinated set of campaign creatives with a consistent visual language.",
          hi: "एक जैसी विज़ुअल भाषा के साथ कैंपेन क्रिएटिव का समन्वित सेट।",
        },
        features: {
          en: [
            "Campaign concept & direction",
            "Multiple banner sizes",
            "Cohesive visual system",
            "Ad-ready exports",
          ],
          hi: [
            "कैंपेन कॉन्सेप्ट और दिशा",
            "कई बैनर साइज़",
            "एकजुट विज़ुअल सिस्टम",
            "विज्ञापन-रेडी एक्सपोर्ट",
          ],
        },
      },
    ],
    image: "/images/services/banner.svg",
    imageAlt: {
      en: "Abstract promotional banner design with bold typography",
      hi: "बोल्ड टाइपोग्राफी वाला एब्सट्रैक्ट प्रोमोशनल बैनर डिज़ाइन",
    },
    icon: "panel-top",
    accent: {
      card: "from-amber-500/20 via-orange-500/10 to-transparent",
      glow: "bg-amber-500/20",
      dot: "bg-amber-400",
    },
    portfolioCategory: "banners",
  },
  {
    id: "youtube",
    slug: "youtube-graphics",
    name: { en: "YouTube Graphics", hi: "YouTube ग्राफ़िक्स" },
    shortName: { en: "YouTube Design", hi: "YouTube डिज़ाइन" },
    tagline: {
      en: "Thumbnails and channel art that earn the click.",
      hi: "ऐसे थंबनेल और चैनल आर्ट जो क्लिक दिलाएँ।",
    },
    short: {
      en: "Thumbnails, channel banners and branding built for clarity on every screen.",
      hi: "हर स्क्रीन पर स्पष्टता के लिए बने थंबनेल, चैनल बैनर और ब्रांडिंग।",
    },
    description: {
      en: "Your thumbnail is your first impression. We design high-contrast, readable graphics around your video's hook — then extend the same visual language to your channel banner and branding.",
      hi: "आपका थंबनेल आपकी पहली छाप है। हम आपके वीडियो के हुक के आसपास हाई-कंट्रास्ट, पढ़ने में आसान ग्राफ़िक्स डिज़ाइन करते हैं — और फिर वही विज़ुअल भाषा आपके चैनल बैनर और ब्रांडिंग तक बढ़ाते हैं।",
    },
    features: {
      en: [
        "YouTube thumbnails",
        "Channel banners",
        "Video cover graphics",
        "Channel branding",
        "Promotional graphics",
      ],
      hi: [
        "YouTube थंबनेल",
        "चैनल बैनर",
        "वीडियो कवर ग्राफ़िक्स",
        "चैनल ब्रांडिंग",
        "प्रोमोशनल ग्राफ़िक्स",
      ],
    },
    packages: [
      {
        pricingKey: "youtube-thumbnail-basic",
        name: { en: "Basic YouTube Thumbnail", hi: "बेसिक YouTube थंबनेल" },
        description: {
          en: "A clean, click-focused thumbnail for a single video.",
          hi: "एक वीडियो के लिए साफ, क्लिक-फोकस्ड थंबनेल।",
        },
        features: {
          en: ["Single thumbnail", "Bold title treatment", "YouTube-optimised size"],
          hi: ["एक थंबनेल", "बोल्ड टाइटल ट्रीटमेंट", "YouTube-ऑप्टिमाइज़्ड साइज़"],
        },
      },
      {
        pricingKey: "youtube-thumbnail-premium",
        name: { en: "Premium YouTube Thumbnail", hi: "प्रीमियम YouTube थंबनेल" },
        description: {
          en: "A more polished thumbnail with compositing, effects and stronger hierarchy.",
          hi: "कम्पोज़िटिंग, इफ़ेक्ट्स और बेहतर हायरार्की वाला अधिक परफेक्ट थंबनेल।",
        },
        features: {
          en: [
            "Custom compositing",
            "Enhanced effects & lighting",
            "Subject cut-out",
            "High-resolution export",
          ],
          hi: [
            "कस्टम कम्पोज़िटिंग",
            "बेहतर इफ़ेक्ट्स और लाइटिंग",
            "सब्जेक्ट कट-आउट",
            "हाई-रेज़ोल्यूशन एक्सपोर्ट",
          ],
        },
        popular: true,
      },
      {
        pricingKey: "youtube-channel-banner",
        name: { en: "YouTube Channel Banner", hi: "YouTube चैनल बैनर" },
        description: {
          en: "Channel art that reads well across desktop, mobile and TV.",
          hi: "ऐसा चैनल आर्ट जो डेस्कटॉप, मोबाइल और TV पर अच्छा दिखे।",
        },
        features: {
          en: [
            "Channel banner design",
            "Safe-area aware layout",
            "Brand integration",
            "Upload-ready files",
          ],
          hi: [
            "चैनल बैनर डिज़ाइन",
            "सेफ-एरिया लेआउट",
            "ब्रांड इंटीग्रेशन",
            "अपलोड-रेडी फ़ाइलें",
          ],
        },
      },
      {
        pricingKey: "youtube-branding-premium",
        name: { en: "Premium YouTube Branding", hi: "प्रीमियम YouTube ब्रांडिंग" },
        description: {
          en: "A consistent channel identity across banner, thumbnails and promo graphics.",
          hi: "बैनर, थंबनेल और प्रोमो ग्राफ़िक्स में एक जैसी चैनल पहचान।",
        },
        features: {
          en: [
            "Channel banner",
            "Thumbnail template direction",
            "Profile picture styling",
            "Promo graphic set",
          ],
          hi: [
            "चैनल बैनर",
            "थंबनेल टेम्पलेट दिशा",
            "प्रोफ़ाइल पिक्चर स्टाइलिंग",
            "प्रोमो ग्राफ़िक सेट",
          ],
        },
      },
    ],
    image: "/images/services/youtube.svg",
    imageAlt: {
      en: "YouTube thumbnail design mockup with bold play button",
      hi: "बोल्ड प्ले बटन वाला YouTube थंबनेल डिज़ाइन मॉकअप",
    },
    icon: "youtube",
    accent: {
      card: "from-red-500/25 via-rose-500/10 to-transparent",
      glow: "bg-red-500/20",
      dot: "bg-red-400",
    },
    portfolioCategory: "youtube",
  },
  {
    id: "ai-video",
    slug: "ai-video-creation",
    name: { en: "AI Video Creation", hi: "AI वीडियो क्रिएशन" },
    shortName: { en: "AI Video", hi: "AI वीडियो" },
    tagline: {
      en: "Cinematic motion, generated at the speed of an idea.",
      hi: "सिनेमैटिक मोशन, आइडिया की गति से तैयार।",
    },
    short: {
      en: "Short AI films, product ads and reels with cinematic pacing and sound.",
      hi: "सिनेमैटिक पेसिंग और साउंड के साथ शॉर्ट AI फ़िल्म, प्रोडक्ट ऐड और रील।",
    },
    description: {
      en: "We use AI video tools to produce short-form motion work — product spots, brand mood films and social reels. Each project starts with a clear direction, so the final cut feels intentional rather than experimental.",
      hi: "हम शॉर्ट-फ़ॉर्म मोशन कार्य — प्रोडक्ट स्पॉट, ब्रांड मूड फ़िल्म और सोशल रील — बनाने के लिए AI वीडियो टूल्स का उपयोग करते हैं। हर प्रोजेक्ट एक स्पष्ट दिशा के साथ शुरू होता है, ताकि अंतिम कट प्रयोग जैसा नहीं, सोच-समझकर बना लगे।",
    },
    features: {
      en: [
        "AI promotional videos",
        "Product advertisement videos",
        "Social media reels",
        "Business promotional videos",
        "Cinematic AI videos",
        "Creative brand videos",
      ],
      hi: [
        "AI प्रोमोशनल वीडियो",
        "प्रोडक्ट विज्ञापन वीडियो",
        "सोशल मीडिया रील",
        "बिज़नेस प्रोमोशनल वीडियो",
        "सिनेमैटिक AI वीडियो",
        "क्रिएटिव ब्रांड वीडियो",
      ],
    },
    packages: [
      {
        pricingKey: "ai-video-15-30",
        name: { en: "15–30 Second Video", hi: "15–30 सेकंड वीडियो" },
        description: {
          en: "A concise AI video for social media or a focused product message.",
          hi: "सोशल मीडिया या केंद्रित प्रोडक्ट संदेश के लिए संक्षिप्त AI वीडियो।",
        },
        features: {
          en: [
            "15–30 seconds runtime",
            "AI-generated scenes",
            "Music / sound direction",
            "Social-ready export",
          ],
          hi: [
            "15–30 सेकंड रनटाइम",
            "AI-जनरेटेड सीन",
            "म्यूज़िक / साउंड दिशा",
            "सोशल-रेडी एक्सपोर्ट",
          ],
        },
      },
      {
        pricingKey: "ai-video-30-60",
        name: { en: "30–60 Second Video", hi: "30–60 सेकंड वीडियो" },
        description: {
          en: "More room for story, product detail and a stronger call to action.",
          hi: "कहानी, प्रोडक्ट डिटेल और मजबूत कॉल-टू-एक्शन के लिए अधिक जगह।",
        },
        features: {
          en: [
            "30–60 seconds runtime",
            "Multi-scene direction",
            "Sound design",
            "Landscape + vertical exports",
          ],
          hi: [
            "30–60 सेकंड रनटाइम",
            "मल्टी-सीन दिशा",
            "साउंड डिज़ाइन",
            "लैंडस्केप + वर्टिकल एक्सपोर्ट",
          ],
        },
        samples: [
          { src: "/videos/samples/ai-video-30-60-1.mp4", kind: "video", alt: { en: "AI-generated cinematic sample 01 - dense forest scene", hi: "AI-जनरेटेड सिनेमैटिक नमूना 01 - घना जंगल सीन" } },
          { src: "/videos/samples/ai-video-30-60-2.mp4", kind: "video", alt: { en: "AI-generated cinematic sample 02 - wide old setting", hi: "AI-जनरेटेड सिनेमैटिक नमूना 02 - चौड़ा पुराना सेटिंग" } },
          { src: "/videos/samples/ai-video-30-60-3.mp4", kind: "video", alt: { en: "AI-generated cinematic sample 03 - ground-level mist", hi: "AI-जनरेटेड सिनेमैटिक नमूना 03 - ज़मीन पर धुंध" } },
          { src: "/videos/samples/ai-video-30-60-4.mp4", kind: "video", alt: { en: "AI-generated cinematic sample 04 - dark jungle", hi: "AI-जनरेटेड सिनेमैटिक नमूना 04 - अंधेरा जंगल" } },
          { src: "/videos/samples/ai-video-30-60-5.mp4", kind: "video", alt: { en: "AI-generated cinematic sample 05 - old jungle scene", hi: "AI-जनरेटेड सिनेमैटिक नमूना 05 - पुराना जंगल सीन" } },
        ],
        popular: true,
      },
      {
        pricingKey: "ai-video-premium",
        name: { en: "Premium AI Advertisement", hi: "प्रीमियम AI विज्ञापन" },
        description: {
          en: "A fully art-directed AI commercial with a custom visual concept.",
          hi: "कस्टम विज़ुअल कॉन्सेप्ट के साथ पूरी तरह आर्ट-डायरेक्टेड AI कमर्शियल।",
        },
        features: {
          en: [
            "Custom creative concept",
            "Premium scene generation",
            "Advanced sound direction",
            "Multiple format exports",
          ],
          hi: [
            "कस्टम क्रिएटिव कॉन्सेप्ट",
            "प्रीमियम सीन जनरेशन",
            "उन्नत साउंड दिशा",
            "कई फ़ॉर्मेट एक्सपोर्ट",
          ],
        },
      },
    ],
    image: "/images/services/ai-video.svg",
    imageAlt: {
      en: "Cinematic AI video still with a glowing abstract landscape",
      hi: "चमकते एब्सट्रैक्ट लैंडस्केप वाला सिनेमैटिक AI वीडियो स्टिल",
    },
    icon: "clapperboard",
    accent: {
      card: "from-indigo-500/25 via-blue-500/10 to-transparent",
      glow: "bg-indigo-500/25",
      dot: "bg-indigo-400",
    },
    portfolioCategory: "ai-videos",
  },
  {
    id: "website",
    slug: "website-development",
    name: { en: "Website Development", hi: "वेबसाइट डेवलपमेंट" },
    shortName: { en: "Websites", hi: "वेबसाइट" },
    tagline: {
      en: "Modern websites that look premium and work flawlessly.",
      hi: "आधुनिक वेबसाइटें जो प्रीमियम दिखें और बेहतरीन काम करें।",
    },
    short: {
      en: "Responsive business websites, portfolios and landing pages built with modern technology.",
      hi: "आधुनिक तकनीक से बनी रिस्पॉन्सिव बिज़नेस वेबसाइट, पोर्टफ़ोलियो और लैंडिंग पेज।",
    },
    description: {
      en: "We design and build responsive websites for businesses, creators and agencies — from a focused landing page to a complete multi-page company website. Every build prioritises clarity, speed and a polished mobile experience.",
      hi: "हम बिज़नेस, क्रिएटर्स और एजेंसियों के लिए रिस्पॉन्सिव वेबसाइट डिज़ाइन और डेवलप करते हैं — एक केंद्रित लैंडिंग पेज से लेकर पूरी मल्टी-पेज कंपनी वेबसाइट तक। हर बिल्ड में स्पष्टता, गति और बेहतरीन मोबाइल अनुभव को प्राथमिकता दी जाती है।",
    },
    features: {
      en: [
        "Business websites",
        "Portfolio websites",
        "Landing pages",
        "Agency websites",
        "Professional company websites",
        "Responsive mobile websites",
      ],
      hi: [
        "बिज़नेस वेबसाइट",
        "पोर्टफ़ोलियो वेबसाइट",
        "लैंडिंग पेज",
        "एजेंसी वेबसाइट",
        "प्रोफेशनल कंपनी वेबसाइट",
        "रिस्पॉन्सिव मोबाइल वेबसाइट",
      ],
    },
    packages: [
      {
        pricingKey: "website-basic",
        name: { en: "Basic Website", hi: "बेसिक वेबसाइट" },
        description: {
          en: "A focused online presence — ideal for a simple portfolio or landing page.",
          hi: "एक केंद्रित ऑनलाइन उपस्थिति — सिंपल पोर्टफ़ोलियो या लैंडिंग पेज के लिए आदर्श।",
        },
        features: {
          en: [
            "Landing page structure",
            "Responsive design",
            "Contact / enquiry section",
            "Basic SEO setup",
          ],
          hi: [
            "लैंडिंग पेज स्ट्रक्चर",
            "रिस्पॉन्सिव डिज़ाइन",
            "संपर्क / पूछताछ सेक्शन",
            "बेसिक SEO सेटअप",
          ],
        },
      },
      {
        pricingKey: "website-business",
        name: { en: "Business Website", hi: "बिज़नेस वेबसाइट" },
        description: {
          en: "A complete multi-section website for a growing business.",
          hi: "बढ़ते बिज़नेस के लिए पूरी मल्टी-सेक्शन वेबसाइट।",
        },
        features: {
          en: [
            "Multi-page website",
            "Services & pricing sections",
            "Enquiry forms",
            "Performance optimisation",
          ],
          hi: [
            "मल्टी-पेज वेबसाइट",
            "सर्विस और प्राइसिंग सेक्शन",
            "पूछताछ फ़ॉर्म",
            "परफ़ॉर्मेंस ऑप्टिमाइज़ेशन",
          ],
        },
        popular: true,
      },
      {
        pricingKey: "website-premium",
        name: { en: "Premium Website", hi: "प्रीमियम वेबसाइट" },
        description: {
          en: "A custom, animation-rich build with advanced sections and integrations.",
          hi: "उन्नत सेक्शन और इंटीग्रेशन के साथ कस्टम, एनिमेशन-समृद्ध बिल्ड।",
        },
        features: {
          en: [
            "Custom UI & motion design",
            "Advanced components",
            "SEO & performance polish",
            "Integration support",
          ],
          hi: [
            "कस्टम UI और मोशन डिज़ाइन",
            "उन्नत कंपोनेंट",
            "SEO और परफ़ॉर्मेंस पॉलिश",
            "इंटीग्रेशन सपोर्ट",
          ],
        },
      },
    ],
    image: "/images/services/website.svg",
    imageAlt: {
      en: "Modern dark website mockup displayed on desktop and mobile",
      hi: "डेस्कटॉप और मोबाइल पर दिखाया गया आधुनिक डार्क वेबसाइट मॉकअप",
    },
    icon: "globe",
    accent: {
      card: "from-cyan-500/20 via-blue-500/10 to-transparent",
      glow: "bg-cyan-500/20",
      dot: "bg-cyan-400",
    },
    portfolioCategory: "websites",
  },
  {
    id: "graphic",
    slug: "graphic-design",
    name: { en: "Graphic Design", hi: "ग्राफ़िक डिज़ाइन" },
    shortName: { en: "Graphic Design", hi: "ग्राफ़िक डिज़ाइन" },
    tagline: {
      en: "A consistent visual language for every brand touchpoint.",
      hi: "हर ब्रांड टचपॉइंट के लिए एकजुट विज़ुअल भाषा।",
    },
    short: {
      en: "Logos, social creatives, posters and brand collateral designed with intent.",
      hi: "सोच-समझकर डिज़ाइन किए गए लोगो, सोशल क्रिएटिव, पोस्टर और ब्रांड मटेरियल।",
    },
    description: {
      en: "Identity work needs consistency. We create logos, business stationery, social media graphics and promotional material that share one visual system — so your brand is recognisable everywhere it appears.",
      hi: "आइडेंटिटी कार्य में निरंतरता ज़रूरी है। हम लोगो, बिज़नेस स्टेशनरी, सोशल मीडिया ग्राफ़िक्स और प्रोमोशनल मटेरियल एक ही विज़ुअल सिस्टम में बनाते हैं — ताकि आपकी ब्रांड हर जगह पहचानी जाए।",
    },
    features: {
      en: [
        "Logo design",
        "Business cards",
        "Social media posts",
        "Promotional posters",
        "Product catalogues",
        "Branding materials",
      ],
      hi: [
        "लोगो डिज़ाइन",
        "बिज़नेस कार्ड",
        "सोशल मीडिया पोस्ट",
        "प्रोमोशनल पोस्टर",
        "प्रोडक्ट कैटलॉग",
        "ब्रांडिंग मटेरियल",
      ],
    },
    packages: [
      {
        pricingKey: "graphic-logo",
        name: { en: "Logo Design", hi: "लोगो डिज़ाइन" },
        description: {
          en: "A distinctive mark and wordmark direction for your brand.",
          hi: "आपकी ब्रांड के लिए एक खास मार्क और वर्डमार्क दिशा।",
        },
        features: {
          en: ["Custom logo concept", "Vector files", "Brand colour direction"],
          hi: ["कस्टम लोगो कॉन्सेप्ट", "वेक्टर फ़ाइलें", "ब्रांड रंग दिशा"],
        },
      },
      {
        pricingKey: "graphic-business-card",
        name: { en: "Business Cards", hi: "बिज़नेस कार्ड" },
        description: {
          en: "Print-ready stationery that carries your identity cleanly.",
          hi: "आपकी पहचान को साफ ढंग से दर्शाने वाली प्रिंट-रेडी स्टेशनरी।",
        },
        features: {
          en: ["Double-sided layout", "Print-ready artwork", "Bleed & safe margins"],
          hi: ["दोनों तरफ़ लेआउट", "प्रिंट-रेडी आर्टवर्क", "ब्लीड और सेफ मार्जिन"],
        },
      },
      {
        pricingKey: "graphic-social-posts",
        name: { en: "Social Media Posts", hi: "सोशल मीडिया पोस्ट" },
        description: {
          en: "Feed-ready graphics with a consistent look and clear messaging.",
          hi: "एक जैसे लुक और स्पष्ट संदेश वाले फ़ीड-रेडी ग्राफ़िक्स।",
        },
        features: {
          en: ["Custom post layouts", "Platform-ready sizes", "Brand-consistent styling"],
          hi: ["कस्टम पोस्ट लेआउट", "प्लेटफ़ॉर्म-रेडी साइज़", "ब्रांड-अनुरूप स्टाइलिंग"],
        },
      },
      {
        pricingKey: "graphic-posters",
        name: { en: "Promotional Posters", hi: "प्रोमोशनल पोस्टर" },
        description: {
          en: "Impactful posters for campaigns, launches and events.",
          hi: "कैंपेन, लॉन्च और इवेंट के लिए प्रभावशाली पोस्टर।",
        },
        features: {
          en: ["Print & digital sizes", "Strong typography", "Promotional layout"],
          hi: ["प्रिंट और डिजिटल साइज़", "मजबूत टाइपोग्राफी", "प्रोमोशनल लेआउट"],
        },
      },
      {
        pricingKey: "graphic-catalogue",
        name: { en: "Product Catalogues", hi: "प्रोडक्ट कैटलॉग" },
        description: {
          en: "Organised, readable catalogues that present your products well.",
          hi: "आपके प्रोडक्ट को बेहतर ढंग से प्रस्तुत करने वाले व्यवस्थित कैटलॉग।",
        },
        features: {
          en: ["Multi-page layout", "Product grid system", "Print-ready export"],
          hi: ["मल्टी-पेज लेआउट", "प्रोडक्ट ग्रिड सिस्टम", "प्रिंट-रेडी एक्सपोर्ट"],
        },
      },
      {
        pricingKey: "graphic-branding",
        name: { en: "Branding Materials", hi: "ब्रांडिंग मटेरियल" },
        description: {
          en: "A cohesive set of collateral built around your brand system.",
          hi: "आपकी ब्रांड सिस्टम के इर्द-गिर्द बना एकजुट मटेरियल सेट।",
        },
        features: {
          en: ["Brand collateral set", "Consistent visual language", "Editable source files"],
          hi: ["ब्रांड मटेरियल सेट", "एकजुट विज़ुअल भाषा", "एडिटेबल सोर्स फ़ाइलें"],
        },
      },
    ],
    image: "/images/services/graphic.svg",
    imageAlt: {
      en: "Brand identity design board with logo, colours and typography",
      hi: "लोगो, रंगों और टाइपोग्राफी वाला ब्रांड आइडेंटिटी डिज़ाइन बोर्ड",
    },
    icon: "pen-tool",
    accent: {
      card: "from-emerald-500/20 via-teal-500/10 to-transparent",
      glow: "bg-emerald-500/20",
      dot: "bg-emerald-400",
    },
    portfolioCategory: "graphics",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);
