import type { Language } from "./types";

/**
 * CENTRAL TRANSLATION DICTIONARY
 * ---------------------------------
 * English is the source of truth. Every UI string lives here so the
 * whole website can switch language without touching components.
 * Add a key to `en`, then TypeScript will require the Hindi version too.
 */
export const en = {
  /* ---------------- Navigation ---------------- */
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.pricing": "Pricing",
  "nav.portfolio": "Portfolio",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.faq": "FAQ",
  "nav.getStarted": "Get Started",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.language": "Language",
  "nav.skipToContent": "Skip to content",
  "nav.openMenu": "Open navigation menu",

  /* ---------------- Common ---------------- */
  "common.viewDetails": "View Details",
  "common.viewLiveSite": "View live site",
  "common.orderNow": "Order Now",
  "common.exploreServices": "Explore Services",
  "common.startProject": "Start Your Project",
  "common.viewAllServices": "View All Services",
  "common.viewAllProjects": "View Full Portfolio",
  "common.learnMore": "Learn More",
  "common.contactUs": "Contact Us",
  "common.sendMessage": "Send Message",
  "common.backHome": "Back to Home",
  "common.loading": "Loading experience",
  "common.close": "Close",
  "common.previous": "Previous",
  "common.next": "Next",
  "common.sample": "Sample",
  "common.mostPopular": "Most Popular",
  "common.optional": "Optional",
  "common.required": "Required",
  "common.timelineNote": "Timeline confirmed after brief review.",
  "common.perProject": "per project",
  "common.filters": "Filters",
  "common.all": "All",
  "common.included": "What's included",
  "common.or": "or",
  "common.emailUs": "Email us",
  "common.whatsappUs": "Chat on WhatsApp",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.openInNewTab": "opens in a new tab",
  "common.page": "Page",
  "common.viewService": "View service",
  "common.pricesInINR": "Prices in INR",

  /* ---------------- Brand ---------------- */
  "brand.tagline": "CREATE. DESIGN. INSPIRE.",
  "brand.role": "Digital Creative Studio",

  /* ---------------- Home ---------------- */
  "home.badge": "CREATIVE DIGITAL SOLUTIONS",
  "home.titleLine1": "TURN YOUR IDEAS",
  "home.titleLine2": "INTO DIGITAL",
  "home.titleAccent": "REALITY.",
  "home.subtitle":
    "From stunning AI visuals and cinematic videos to powerful business websites, we create digital experiences that make your brand stand out.",
  "home.hindiLine": "आपके आइडियाज को डिजिटल दुनिया में एक शानदार पहचान देते हैं।",
  "home.visualCaption": "Ideas in. Experiences out.",
  "home.card.aiPhoto": "AI Photo",
  "home.card.aiVideo": "AI Video",
  "home.card.website": "Website Design",
  "home.card.graphics": "Graphic Design",
  "home.scroll": "Scroll to explore",
  "home.highlights.excellence.title": "Creative Excellence",
  "home.highlights.excellence.desc":
    "Every visual is composed with intent — not pulled from a template.",
  "home.highlights.affordable.title": "Affordable Pricing",
  "home.highlights.affordable.desc":
    "Clear prices, configured up front, with no hidden surprises.",
  "home.highlights.premium.title": "Premium Designs",
  "home.highlights.premium.desc":
    "A refined dark aesthetic, considered typography and polished details.",
  "home.highlights.technology.title": "Modern Technology",
  "home.highlights.technology.desc":
    "AI tools and a modern web stack, used with a designer's judgement.",
  "home.services.eyebrow": "What we do",
  "home.services.title": "SERVICES BUILT FOR STANDOUT BRANDS",
  "home.services.subtitle":
    "Six focused services, one consistent standard of craft. Start with what your brand needs today.",
  "home.services.note":
    "Prices are shown for each service. Final scope and quotation are confirmed after reviewing your brief.",
  "home.portfolio.eyebrow": "Selected work",
  "home.portfolio.title": "A GLIMPSE OF THE STUDIO",
  "home.portfolio.subtitle":
    "A curated look at the visual directions we create — AI imagery, motion, campaign design and web.",
  "home.process.eyebrow": "How it works",
  "home.process.title": "FROM IDEA TO DELIVERY, IN FOUR STEPS",
  "home.process.subtitle":
    "A simple, transparent process. No confusion, no vague promises — you always know what happens next.",
  "home.process.step1.title": "Choose Your Service",
  "home.process.step1.desc":
    "Browse the services and pick the package that matches your goal and budget.",
  "home.process.step2.title": "Share Your Requirements",
  "home.process.step2.desc":
    "Send your brief, references and preferences through the order form or WhatsApp.",
  "home.process.step3.title": "Confirm Your Order",
  "home.process.step3.desc":
    "We review the scope, confirm the final quote and agree on the delivery plan.",
  "home.process.step4.title": "Receive Your Final Work",
  "home.process.step4.desc":
    "Your finished files are delivered in the formats you need, ready to publish.",
  "home.cta.eyebrow": "Start something",
  "home.cta.title": "LET'S CREATE SOMETHING AMAZING.",
  "home.cta.subtitle":
    "Tell us what you have in mind. We'll help you shape it into something your audience remembers.",
  "home.cta.button": "Start Your Project",
  "home.cta.secondary": "Talk on WhatsApp",
  "home.approach.eyebrow": "The studio approach",
  "home.approach.title": "DESIGN-LED. AI-ACCELERATED.",
  "home.approach.text":
    "Generative tools help us explore faster, but the decisions that matter — composition, hierarchy, colour and restraint — are made by hand. The result is work that feels considered, not generated.",
  "home.approach.cta": "More about the studio",
  "home.approach.imageCaption": "Inside the studio",

  /* ---------------- Services ---------------- */
  "services.eyebrow": "Our expertise",
  "services.title": "CREATIVE SERVICES, CRAFTED WITH PURPOSE",
  "services.subtitle":
    "From a single AI portrait to a complete brand website — choose the service, we'll handle the visual details.",
  "services.packages": "Packages",
  "services.packagesDesc":
    "Transparent pricing. Final scope and quotation are confirmed before work begins.",
  "services.included": "What's included",
  "services.samples": "Sample directions",
  "services.samplesDesc":
    "Concept work created for this studio demo. These are not client projects — they show the visual standard we aim for.",
  "services.customQuoteNote":
    "Custom scope? Share your brief and we'll prepare a quotation based on your exact requirements.",
  "services.orderThis": "Order This Package",
  "services.other": "Explore other services",
  "services.notes": "Good to know",
  "services.faqHeading": "Common questions",
  "services.viewAll": "All services",
  "services.startingAt": "Starting at",
  "services.packageIncluded": "Included",
  "services.talkToUs": "Not sure which package fits? Tell us your goal and we'll recommend one.",

  /* ---------------- Pricing ---------------- */
  "pricing.eyebrow": "Pricing",
  "pricing.title": "CLEAR PRICING. NO GUESSWORK.",
  "pricing.subtitle":
    "Every package and price in one place. Choose a service to compare its options.",
  "pricing.startingFrom": "Starting from",
  "pricing.onwards": "onwards",
  "pricing.contactForPrice": "Contact for Price",
  "pricing.delivery": "Delivery",
  "pricing.revisions": "Revisions",
  "pricing.revisionsValue": "Agreed before order",
  "pricing.customTitle": "Need something custom?",
  "pricing.customDesc":
    "Larger campaigns, ongoing design support or a website with specific integrations — share the details and we'll prepare a tailored quote.",
  "pricing.chooseService": "Choose a service",
  "pricing.noteLabel": "Please note",
  "pricing.viewService": "Service details",
  "pricing.included": "Included in this package",
  "pricing.startFrom": "Start from",
  "pricing.sampleOutput": "Sample output",
  "pricing.sampleNote":
    "Sample outputs created with this package. The final look depends on your brief and the references you share.",

  /* ---------------- Portfolio ---------------- */
  "portfolio.eyebrow": "Portfolio",
  "portfolio.title": "WORK THAT SPEAKS IN VISUALS",
  "portfolio.subtitle":
    "A selection of concept directions across AI imagery, video, banners, YouTube graphics, websites and identity design.",
  "portfolio.filters.all": "All",
  "portfolio.filters.aiPhotos": "AI Photography",
  "portfolio.filters.aiVideos": "AI Videos",
  "portfolio.filters.banners": "Banner Designs",
  "portfolio.filters.youtube": "YouTube Thumbnails",
  "portfolio.filters.websites": "Websites",
  "portfolio.filters.graphics": "Graphic Designs",
  "portfolio.sampleNotice":
    "Sample work: every project below is a demonstration concept created for this website. These are not completed client projects. Replace the data in src/data/portfolio.ts with your real work.",
  "portfolio.sampleBadge": "Sample",
  "portfolio.empty": "No projects in this category yet.",
  "portfolio.viewProject": "View project",
  "portfolio.projectDetails": "Project details",
  "portfolio.category": "Category",
  "portfolio.lightboxHint": "Use arrow keys to navigate, Esc to close.",
  "portfolio.videoNote": "Video preview",
  "portfolio.openLightbox": "Open project preview",
  "portfolio.showing": "Showing {count} of {total} projects",

  /* ---------------- About ---------------- */
  "about.eyebrow": "About Nexora",
  "about.title": "CREATIVITY MEETS TECHNOLOGY.",
  "about.intro":
    "Nexora Creative Studio is a digital creative service brand founded by Sahil. Our mission is to help individuals, content creators and businesses transform their ideas into professional digital experiences through AI-powered visuals, creative video production, graphic design and modern website development.",
  "about.storyTitle": "The studio",
  "about.storyP1":
    "The studio is built on a simple observation: great ideas are common, but polished execution is not. Nexora exists to close that gap - giving founders, creators and small teams access to design and production quality that usually sits behind large agency retainers.",
  "about.storyP2":
    "We work at the intersection of generative AI and hands-on design. Technology helps us move quickly; the creative direction, composition and attention to detail remain human. Every project is built around the client's message, not a template.",
  "about.missionTitle": "Our mission",
  "about.missionText":
    "To help individuals, creators and businesses turn their ideas into professional digital experiences — through AI visuals, video, design and modern websites delivered with clarity and care.",
  "about.visionTitle": "Our vision",
  "about.visionText":
    "To become a trusted creative partner for emerging brands: a studio where ambitious ideas receive the visual quality and attention they deserve, regardless of the size of the business.",
  "about.founderTitle": "Founder",
  "about.founderRole": "Founder, Nexora Creative Studio",
  "about.founderText":
    "Nexora Creative Studio is founded and led by Sahil. The studio is built around a hands-on approach: understanding the brief, shaping the visual direction and staying involved through delivery.",
  "about.approachTitle": "How we think",
  "about.approach1.title": "Design with purpose",
  "about.approach1.desc":
    "Every element should earn its place. We favour clear hierarchy over decoration.",
  "about.approach2.title": "Communicate clearly",
  "about.approach2.desc":
    "Scope, price and expectations are agreed before work starts — no vague timelines.",
  "about.approach3.title": "Deliver with care",
  "about.approach3.desc":
    "The final files are checked, organised and prepared for the platforms you use.",
  "about.servicesTitle": "What we create",
  "about.ctaTitle": "LET'S BUILD YOUR NEXT VISUAL.",
  "about.ctaText":
    "Whether it's a single design or a full digital presence, the first step is a conversation.",
  "about.ctaButton": "Start a Conversation",

  /* ---------------- Contact ---------------- */
  "contact.eyebrow": "Contact",
  "contact.title": "LET'S TALK ABOUT YOUR IDEA.",
  "contact.subtitle":
    "Tell us what you need, share any references, and we'll get back to you with the next steps.",
  "contact.form.title": "Send an enquiry",
  "contact.form.desc":
    "Fill in the essentials below. The form prepares a message you can send through WhatsApp or email - nothing is stored on this website.",
  "contact.form.name": "Full name",
  "contact.form.namePlaceholder": "Your name",
  "contact.form.email": "Email address",
  "contact.form.emailPlaceholder": "you@example.com",
  "contact.form.whatsapp": "WhatsApp number",
  "contact.form.whatsappPlaceholder": "Country code + number",
  "contact.form.service": "Service",
  "contact.form.servicePlaceholder": "Select a service",
  "contact.form.message": "Project description",
  "contact.form.messagePlaceholder": "Tell us about your project, goals and any references.",
  "contact.form.submit": "Continue to WhatsApp",
  "contact.form.note":
    "This form does not store your data. It prepares your message so you can send it through WhatsApp or email.",
  "contact.form.directTitle": "Prefer the full order form?",
  "contact.form.directDesc":
    "Add package details, delivery preferences and reference notes in the structured order form.",
  "contact.form.directButton": "Open Order Form",
  "contact.info.title": "Contact details",
  "contact.info.desc":
    "The fastest way to reach the studio is WhatsApp. Email works too — responses are manual.",
  "contact.info.whatsapp": "WhatsApp",
  "contact.info.email": "Email",
  "contact.info.social": "Social",
  "contact.info.socialEmpty": "Social profiles are coming soon.",
  "contact.info.hours": "Working hours",
  "contact.info.location": "Location",
  "contact.info.responseNote": "Response note",
  "contact.setup.whatsapp":
    "Direct WhatsApp chat isn't available right now. Please send your enquiry using the form below.",
  "contact.setup.email":
    "Email contact isn't available right now. Please use the contact form.",
  "contact.fallback.title": "Continue your enquiry manually",
  "contact.fallback.body":
    "WhatsApp could not be opened automatically. Copy your prepared message and send it through your preferred channel.",
  "contact.fallback.setupBody":
    "Direct WhatsApp isn't available right now. Copy your prepared message and send it through your preferred channel, or email the studio. Nothing has been sent automatically.",
  "contact.fallback.copy": "Copy message",
  "contact.fallback.email": "Email instead",
  "contact.fallback.emailUnavailable":
    "Email isn't available right now. Please use the contact form.",
  "contact.available": "Available for new projects",
  "contact.validation.nameRequired": "Please enter your name.",
  "contact.validation.nameMin": "Name must be at least 2 characters.",
  "contact.validation.whatsappRequired": "Please enter your WhatsApp number.",
  "contact.validation.whatsappInvalid":
    "Enter a valid number with country code (8–15 digits).",
  "contact.validation.emailInvalid": "Enter a valid email address or leave it empty.",
  "contact.validation.serviceRequired": "Please select a service.",
  "contact.validation.messageRequired": "Please describe your project.",
  "contact.validation.messageMin": "Please add at least 10 characters.",
  "contact.success.title": "Your WhatsApp message is ready.",
  "contact.success.intro":
    "WhatsApp has been opened with your enquiry. Review the message and press send to deliver it to the studio.",
  "contact.success.notConfirmed":
    "Your message is not delivered until you press send inside WhatsApp. A project is confirmed only after the studio replies.",
  "contact.success.openAgain": "Open WhatsApp again",
  "contact.success.copy": "Copy message",
  "contact.success.copied": "Message copied",
  "contact.success.new": "Send another enquiry",

  /* ---------------- Order ---------------- */
  "order.eyebrow": "Start a project",
  "order.title": "BUILD YOUR BRIEF.",
  "order.subtitle":
    "Three short steps. We'll prepare a WhatsApp message with your details so you can confirm the inquiry directly with the studio.",
  "order.step.service": "Service",
  "order.step.details": "Project",
  "order.step.contact": "Details",
  "order.stepOf": "Step {current} of {total}",
  "order.next": "Continue",
  "order.back": "Back",
  "order.submit": "Continue to WhatsApp",
  "order.summaryTitle": "Order summary",
  "order.summaryEmpty": "Choose a service and package to see the summary.",
  "order.summaryPrice": "Price",
  "order.summaryNote": "Scope and delivery are confirmed after reviewing your brief.",
  "order.serviceLabel": "Selected service",
  "order.packageLabel": "Selected package",
  "order.service": "Select service",
  "order.servicePlaceholder": "Choose a service",
  "order.package": "Select package",
  "order.packagePlaceholder": "Choose a package",
  "order.packageHint": "Select a service first to see its packages.",
  "order.fullName": "Full name",
  "order.namePlaceholder": "Your full name",
  "order.whatsapp": "WhatsApp number",
  "order.whatsappPlaceholder": "e.g. 91 98765 43210",
  "order.whatsappHint": "Include your country code so we can reply.",
  "order.email": "Email address",
  "order.emailPlaceholder": "you@example.com",
  "order.country": "Country",
  "order.countryPlaceholder": "Select your country",
  "order.description": "Project description",
  "order.descriptionPlaceholder":
    "Describe your idea, purpose, audience and the outcome you want. The more context, the better.",
  "order.deliveryDate": "Preferred delivery date",
  "order.deliveryDateHint": "Optional — we'll confirm feasibility after reviewing the brief.",
  "order.instructions": "Additional instructions",
  "order.instructionsPlaceholder":
    "Colours, dimensions, text, brand guidelines or anything else we should know.",
  "order.upload.imageLabel": "Reference image",
  "order.upload.imageHint": "JPG, PNG or WebP · up to 5 MB",
  "order.upload.videoLabel": "Reference video",
  "order.upload.videoHint": "MP4, WebM or MOV · up to 50 MB",
  "order.upload.choose": "Choose file",
  "order.upload.replace": "Replace file",
  "order.upload.remove": "Remove",
  "order.upload.note":
    "Files are only previewed in your browser — they are not uploaded to this website or to WhatsApp automatically.",
  "order.upload.attachNote":
    "After WhatsApp opens, attach your selected reference files manually inside the chat.",
  "order.upload.selected": "Selected file",
  "order.agree.before": "I agree to the",
  "order.agree.terms": "Terms & Conditions",
  "order.agree.and": "and",
  "order.agree.privacy": "Privacy Policy",
  "order.agree.after": ".",
  "order.secureNote":
    "No payment is taken here. This form prepares your inquiry so you can send it through WhatsApp or email.",
  "order.success.title": "Your WhatsApp message is ready.",
  "order.success.intro":
    "WhatsApp has been opened in a new tab with your project details. Review the message and press send to deliver it to the studio.",
  "order.success.step1": "Check the prepared message and press send in WhatsApp.",
  "order.success.step2": "Attach any reference files manually inside the chat.",
  "order.success.step3":
    "The studio will reply to confirm scope, the final quotation and the delivery plan.",
  "order.success.notConfirmed":
    "Your inquiry is not confirmed until you send the message and the studio replies. Opening WhatsApp does not create an order.",
  "order.success.savedToRecords":
    "A copy of this inquiry was saved in the studio records.",
  "order.success.notSaved":
    "This inquiry could not be saved in the studio records. Please send the message so it isn't missed.",
  "order.success.openAgain": "Open WhatsApp again",
  "order.success.copy": "Copy message",
  "order.success.copied": "Message copied",
  "order.success.newOrder": "Start another inquiry",
  "order.fallback.title": "WhatsApp is not available right now",
  "order.fallback.body":
    "Your message has been prepared below. Copy it and send it through your preferred channel, or email the studio.",
  "order.fallback.setupTitle": "Direct WhatsApp send unavailable",
  "order.fallback.setupBody":
    "One-tap WhatsApp isn't available right now. You can copy your prepared message or email the studio. Nothing has been sent automatically.",
  "order.fallback.readyTitle": "Your inquiry is ready to send",
  "order.fallback.readyBody":
    "Direct WhatsApp send isn't available right now. Copy the prepared message or email the studio. Nothing has been sent automatically.",
  "order.fallback.copy": "Copy message",
  "order.fallback.email": "Send by email instead",
  "order.previewTitle": "Message preview",
  "order.previewToggle": "Preview WhatsApp message",
  "order.previewHide": "Hide preview",
  "order.validation.nameRequired": "Please enter your full name.",
  "order.validation.nameMin": "Name must be at least 2 characters.",
  "order.validation.whatsappRequired": "Please enter your WhatsApp number.",
  "order.validation.whatsappInvalid":
    "Enter a valid number with country code (8–15 digits).",
  "order.validation.emailInvalid": "Enter a valid email address or leave it empty.",
  "order.validation.countryRequired": "Please select your country.",
  "order.validation.serviceRequired": "Please select a service.",
  "order.validation.packageRequired": "Please select a package.",
  "order.validation.descriptionRequired": "Please describe your project.",
  "order.validation.descriptionMin": "Please add at least 20 characters so we understand the brief.",
  "order.validation.agreeRequired": "Please accept the Terms & Conditions and Privacy Policy.",
  "order.validation.dateInvalid": "Please choose a valid future date or leave it empty.",
  "order.validation.imageType": "Please upload a JPG, PNG or WebP image.",
  "order.validation.videoType": "Please upload an MP4, WebM or MOV video.",
  "order.validation.imageSize": "Image must be 5 MB or smaller.",
  "order.validation.videoSize": "Video must be 50 MB or smaller.",

  /* ---------------- FAQ ---------------- */
  "faq.eyebrow": "Help centre",
  "faq.title": "QUESTIONS, ANSWERED.",
  "faq.subtitle":
    "Everything you need to know before starting a project with Nexora Creative Studio.",
  "faq.ctaTitle": "Still have a question?",
  "faq.ctaText":
    "Send it to us on WhatsApp and we'll answer as soon as we can.",
  "faq.ctaButton": "Ask on WhatsApp",
  "faq.notFound": "Can't find your answer? Contact us directly.",

  /* ---------------- Legal ---------------- */
  "legal.updated": "Last updated",
  "legal.onThisPage": "On this page",
  "legal.contactNote":
    "If anything here is unclear, contact the studio before placing an inquiry.",
  "privacy.title": "PRIVACY POLICY",
  "privacy.subtitle":
    "How Nexora Creative Studio handles the information you share when you use this website.",
  "privacy.notice":
    "Nexora Creative Studio is an independent creative service brand. This website does not run its own backend database or payment system.",
  "terms.title": "TERMS & CONDITIONS",
  "terms.subtitle":
    "The basic terms that apply when you enquire about or order a service from Nexora Creative Studio.",
  "terms.notice":
    "These terms are a general template for the studio's services and do not replace a project-specific written agreement.",

  /* ---------------- Footer ---------------- */
  "footer.description":
    "A digital creative studio helping brands turn ideas into premium visuals, motion, design and modern websites.",
  "footer.explore": "Explore",
  "footer.services": "Services",
  "footer.contact": "Contact",
  "footer.follow": "Follow",
  "footer.legal": "Legal",
  "footer.copyright": "© {year} Nexora Creative Studio. All Rights Reserved.",
  "footer.backToTop": "Back to top",
  "footer.emailUnavailable": "Email unavailable",
  "footer.whatsappUnavailable": "WhatsApp unavailable",
  "footer.socialEmpty": "Social profiles coming soon.",
  "footer.builtBy": "Designed & built by Nexora Creative Studio.",

  /* ---------------- WhatsApp ---------------- */
  "whatsapp.label": "Chat on WhatsApp",
  "whatsapp.aria": "Start a WhatsApp conversation with Nexora Creative Studio",
  "whatsapp.notConfiguredTitle": "WhatsApp isn't connected yet",
  "whatsapp.notConfiguredBody":
    "Direct chat isn't available right now. Please use the contact form or email the studio.",
  "whatsapp.close": "Close WhatsApp panel",
  "whatsapp.general": "Hi Nexora Creative Studio! I'd like to know more about your services.",
  "whatsapp.serviceInquiry":
    "Hi Nexora Creative Studio! I'm interested in {service}. Could you share the details?",
  "whatsapp.packageInquiry":
    "Hi Nexora Creative Studio! I'd like to order {service} — {package} ({price}). Here are my requirements:",

  /* ---------------- 404 ---------------- */
  "notFound.eyebrow": "404",
  "notFound.title": "THIS PAGE TOOK A CREATIVE DETOUR.",
  "notFound.subtitle":
    "The page you're looking for doesn't exist, or it has moved. Let's get you back on track.",
  "notFound.button": "Return Home",

  /* ---------------- SEO ---------------- */
  "seo.home.title": "Nexora Creative Studio — Create. Design. Inspire.",
  "seo.home.desc":
    "Premium AI photos, AI videos, banner design, YouTube graphics, graphic design and modern business websites. Founded by Sahil.",
  "seo.services.title": "Creative Services — Nexora Creative Studio",
  "seo.services.desc":
    "Explore AI photo creation, banner designing, YouTube graphics, AI video creation, website development and graphic design with transparent pricing.",
  "seo.pricing.title": "Pricing — Nexora Creative Studio",
  "seo.pricing.desc":
    "Clear prices for AI photos, banners, YouTube thumbnails, AI videos, websites and graphic design. Final scope and quotation confirmed after reviewing your brief.",
  "seo.portfolio.title": "Portfolio — Nexora Creative Studio",
  "seo.portfolio.desc":
    "A curated look at concept work across AI imagery, video, banners, YouTube graphics, websites and brand identity design.",
  "seo.about.title": "About — Nexora Creative Studio",
  "seo.about.desc":
    "Nexora Creative Studio is a digital creative service brand founded by Sahil, combining AI tools with hands-on design to build premium digital experiences.",
  "seo.contact.title": "Contact — Nexora Creative Studio",
  "seo.contact.desc":
    "Start a project with Nexora Creative Studio. Share your brief on WhatsApp or email and get the next steps.",
  "seo.faq.title": "FAQ — Nexora Creative Studio",
  "seo.faq.desc":
    "Answers about ordering, payment, delivery, revisions, reference files, websites and contacting Nexora Creative Studio.",
  "seo.order.title": "Start Your Project — Nexora Creative Studio",
  "seo.order.desc":
    "Build your project brief, choose a service and package, and send your inquiry to Nexora Creative Studio through WhatsApp.",
  "seo.privacy.title": "Privacy Policy — Nexora Creative Studio",
  "seo.privacy.desc":
    "How Nexora Creative Studio handles information shared through this website and WhatsApp.",
  "seo.terms.title": "Terms & Conditions — Nexora Creative Studio",
  "seo.terms.desc":
    "Terms for service inquiries and orders with Nexora Creative Studio.",
  "seo.service.title": "{service} — Nexora Creative Studio",
  "seo.notFound.title": "Page Not Found — Nexora Creative Studio",
  "seo.notFound.desc": "The requested page could not be found.",
} as const;

export type TranslationKey = keyof typeof en;

export const hi: Record<TranslationKey, string> = {
  /* ---------------- Navigation ---------------- */
  "nav.home": "होम",
  "nav.services": "सेवाएँ",
  "nav.pricing": "कीमतें",
  "nav.portfolio": "पोर्टफ़ोलियो",
  "nav.about": "हमारे बारे में",
  "nav.contact": "संपर्क",
  "nav.faq": "सामान्य प्रश्न",
  "nav.getStarted": "शुरू करें",
  "nav.menu": "मेन्यू",
  "nav.close": "बंद करें",
  "nav.language": "भाषा",
  "nav.skipToContent": "मुख्य सामग्री पर जाएँ",
  "nav.openMenu": "नेविगेशन मेन्यू खोलें",

  /* ---------------- Common ---------------- */
  "common.viewDetails": "विवरण देखें",
  "common.viewLiveSite": "लाइव साइट देखें",
  "common.orderNow": "अभी ऑर्डर करें",
  "common.exploreServices": "सेवाएँ देखें",
  "common.startProject": "अपना प्रोजेक्ट शुरू करें",
  "common.viewAllServices": "सभी सेवाएँ देखें",
  "common.viewAllProjects": "पूरा पोर्टफ़ोलियो देखें",
  "common.learnMore": "और जानें",
  "common.contactUs": "संपर्क करें",
  "common.sendMessage": "संदेश भेजें",
  "common.backHome": "होम पर लौटें",
  "common.loading": "अनुभव लोड हो रहा है",
  "common.close": "बंद करें",
  "common.previous": "पिछला",
  "common.next": "अगला",
  "common.sample": "सैंपल",
  "common.mostPopular": "सबसे लोकप्रिय",
  "common.optional": "वैकल्पिक",
  "common.required": "आवश्यक",
  "common.timelineNote": "ब्रीफ़ की समीक्षा के बाद समय-सीमा तय होगी।",
  "common.perProject": "प्रति प्रोजेक्ट",
  "common.filters": "फ़िल्टर",
  "common.all": "सभी",
  "common.included": "इसमें शामिल है",
  "common.or": "या",
  "common.emailUs": "हमें ईमेल करें",
  "common.whatsappUs": "WhatsApp पर बात करें",
  "common.copy": "कॉपी करें",
  "common.copied": "कॉपी हो गया",
  "common.openInNewTab": "नए टैब में खुलता है",
  "common.page": "पेज",
  "common.viewService": "सेवा देखें",
  "common.pricesInINR": "कीमतें INR में",

  /* ---------------- Brand ---------------- */
  "brand.tagline": "CREATE. DESIGN. INSPIRE.",
  "brand.role": "डिजिटल क्रिएटिव स्टूडियो",

  /* ---------------- Home ---------------- */
  "home.badge": "क्रिएटिव डिजिटल सॉल्यूशंस",
  "home.titleLine1": "अपने आइडियाज को",
  "home.titleLine2": "डिजिटल दुनिया में",
  "home.titleAccent": "शानदार पहचान दें।",
  "home.subtitle":
    "शानदार AI विज़ुअल और सिनेमैटिक वीडियो से लेकर शक्तिशाली बिज़नेस वेबसाइट तक, हम ऐसे डिजिटल अनुभव बनाते हैं जो आपकी ब्रांड को अलग पहचान दिलाएँ।",
  "home.hindiLine": "आपके आइडियाज को डिजिटल दुनिया में एक शानदार पहचान देते हैं।",
  "home.visualCaption": "आइडिया अंदर, अनुभव बाहर।",
  "home.card.aiPhoto": "AI फोटो",
  "home.card.aiVideo": "AI वीडियो",
  "home.card.website": "वेबसाइट डिज़ाइन",
  "home.card.graphics": "ग्राफ़िक डिज़ाइन",
  "home.scroll": "देखने के लिए स्क्रॉल करें",
  "home.highlights.excellence.title": "क्रिएटिव उत्कृष्टता",
  "home.highlights.excellence.desc":
    "हर विज़ुअल सोच-समझकर बनाया जाता है — किसी टेम्पलेट से नहीं।",
  "home.highlights.affordable.title": "किफ़ायती कीमतें",
  "home.highlights.affordable.desc":
    "साफ कीमतें, पहले से तय — छिपे हुए शुल्क के बिना।",
  "home.highlights.premium.title": "प्रीमियम डिज़ाइन",
  "home.highlights.premium.desc":
    "बेहतरीन डार्क एस्थेटिक, सुंदर टाइपोग्राफी और परफेक्ट डिटेल्स।",
  "home.highlights.technology.title": "आधुनिक तकनीक",
  "home.highlights.technology.desc":
    "AI टूल्स और आधुनिक वेब स्टैक, एक डिज़ाइनर की समझ के साथ।",
  "home.services.eyebrow": "हम क्या बनाते हैं",
  "home.services.title": "अलग पहचान बनाने वाली सेवाएँ",
  "home.services.subtitle":
    "छह केंद्रित सेवाएँ, एक जैसा उच्च स्तर। आज आपकी ब्रांड को जिसकी ज़रूरत है, वहीं से शुरू करें।",
  "home.services.note":
    "हर सेवा की कीमत दिखाई गई है। आपकी ब्रीफ़ की समीक्षा के बाद अंतिम स्कोप और कोटेशन तय होता है।",
  "home.portfolio.eyebrow": "चुनिंदा कार्य",
  "home.portfolio.title": "स्टूडियो की एक झलक",
  "home.portfolio.subtitle":
    "हमारी विज़ुअल दिशाओं का चुनिंदा संग्रह — AI इमेजरी, मोशन, कैंपेन डिज़ाइन और वेब।",
  "home.process.eyebrow": "यह कैसे काम करता है",
  "home.process.title": "आइडिया से डिलीवरी तक, चार चरणों में",
  "home.process.subtitle":
    "सरल और पारदर्शी प्रक्रिया। कोई भ्रम नहीं, कोई अस्पष्ट वादा नहीं — आपको हमेशा पता रहेगा कि आगे क्या होगा।",
  "home.process.step1.title": "अपनी सेवा चुनें",
  "home.process.step1.desc":
    "सेवाएँ देखें और अपने लक्ष्य व बजट के अनुसार पैकेज चुनें।",
  "home.process.step2.title": "अपनी ज़रूरतें साझा करें",
  "home.process.step2.desc":
    "ऑर्डर फ़ॉर्म या WhatsApp के ज़रिए अपनी ब्रीफ़, रेफरेंस और पसंद साझा करें।",
  "home.process.step3.title": "अपना ऑर्डर कन्फ़र्म करें",
  "home.process.step3.desc":
    "हम दायरा समझते हैं, अंतिम कोटेशन तय करते हैं और डिलीवरी योजना पर सहमत होते हैं।",
  "home.process.step4.title": "अपना अंतिम कार्य प्राप्त करें",
  "home.process.step4.desc":
    "आपकी तैयार फ़ाइलें ज़रूरी फ़ॉर्मेट में डिलीवर की जाती हैं, प्रकाशित करने के लिए तैयार।",
  "home.cta.eyebrow": "कुछ नया शुरू करें",
  "home.cta.title": "आइए, कुछ शानदार बनाएँ।",
  "home.cta.subtitle":
    "हमें बताएँ आपके मन में क्या है। हम उसे ऐसे अनुभव में बदलने में मदद करेंगे जो आपके दर्शकों को याद रहे।",
  "home.cta.button": "अपना प्रोजेक्ट शुरू करें",
  "home.cta.secondary": "WhatsApp पर बात करें",
  "home.approach.eyebrow": "स्टूडियो का तरीका",
  "home.approach.title": "डिज़ाइन-नेतृत्व। AI-गति।",
  "home.approach.text":
    "जनरेटिव टूल्स हमें तेज़ी से खोज करने में मदद करते हैं, लेकिन असली निर्णय — कम्पोज़िशन, हायरार्की, रंग और संयम — हाथ से लिए जाते हैं। नतीजा ऐसा काम होता है जो सोचा-समझा लगता है, जनरेट किया हुआ नहीं।",
  "home.approach.cta": "स्टूडियो के बारे में और जानें",
  "home.approach.imageCaption": "स्टूडियो के अंदर",

  /* ---------------- Services ---------------- */
  "services.eyebrow": "हमारी विशेषज्ञता",
  "services.title": "उद्देश्य के साथ बनाई गई क्रिएटिव सेवाएँ",
  "services.subtitle":
    "एक AI पोर्ट्रेट से लेकर पूरी ब्रांड वेबसाइट तक — आप सेवा चुनें, विज़ुअल डिटेल्स हम संभालेंगे।",
  "services.packages": "पैकेज",
  "services.packagesDesc":
    "पारदर्शी कीमतें। काम शुरू होने से पहले अंतिम दायरा और कोटेशन तय किया जाता है।",
  "services.included": "इसमें क्या शामिल है",
  "services.samples": "सैंपल दिशाएँ",
  "services.samplesDesc":
    "इस स्टूडियो डेमो के लिए बनाए गए कॉन्सेप्ट कार्य। ये किसी ग्राहक के प्रोजेक्ट नहीं हैं — ये हमारे विज़ुअल स्तर को दर्शाते हैं।",
  "services.customQuoteNote":
    "कस्टम काम चाहिए? अपनी ब्रीफ़ साझा करें और हम आपकी सटीक ज़रूरतों के अनुसार कोटेशन तैयार करेंगे।",
  "services.orderThis": "यह पैकेज ऑर्डर करें",
  "services.other": "अन्य सेवाएँ देखें",
  "services.notes": "जानना ज़रूरी है",
  "services.faqHeading": "सामान्य प्रश्न",
  "services.viewAll": "सभी सेवाएँ",
  "services.startingAt": "शुरुआती कीमत",
  "services.packageIncluded": "शामिल",
  "services.talkToUs":
    "समझ नहीं आ रहा कौन सा पैकेज सही है? अपना लक्ष्य बताएँ, हम सुझाव देंगे।",

  /* ---------------- Pricing ---------------- */
  "pricing.eyebrow": "कीमतें",
  "pricing.title": "साफ कीमतें। कोई अंदाज़ा नहीं।",
  "pricing.subtitle":
    "हर पैकेज और कीमत एक ही जगह। तुलना के लिए कोई सेवा चुनें।",
  "pricing.startingFrom": "शुरुआत",
  "pricing.onwards": "से आगे",
  "pricing.contactForPrice": "कीमत के लिए संपर्क करें",
  "pricing.delivery": "डिलीवरी",
  "pricing.revisions": "रिवीजन",
  "pricing.revisionsValue": "ऑर्डर से पहले तय",
  "pricing.customTitle": "कुछ कस्टम चाहिए?",
  "pricing.customDesc":
    "बड़े कैंपेन, निरंतर डिज़ाइन सहायता या विशेष इंटीग्रेशन वाली वेबसाइट — विवरण साझा करें और हम अनुकूल कोटेशन तैयार करेंगे।",
  "pricing.chooseService": "सेवा चुनें",
  "pricing.noteLabel": "कृपया ध्यान दें",
  "pricing.viewService": "सेवा विवरण",
  "pricing.included": "इस पैकेज में शामिल",
  "pricing.startFrom": "शुरू करें",
  "pricing.sampleOutput": "नमूना आउटपुट",
  "pricing.sampleNote":
    "इसी पैकेज से बनाए गए नमूना आउटपुट। अंतिम नतीजा आपकी ब्रीफ़ और दिए गए रेफरेंस पर निर्भर करता है।",

  /* ---------------- Portfolio ---------------- */
  "portfolio.eyebrow": "पोर्टफ़ोलियो",
  "portfolio.title": "विज़ुअल में बोलता काम",
  "portfolio.subtitle":
    "AI इमेजरी, वीडियो, बैनर, YouTube ग्राफ़िक्स, वेबसाइट और आइडेंटिटी डिज़ाइन की चुनिंदा कॉन्सेप्ट दिशाएँ।",
  "portfolio.filters.all": "सभी",
  "portfolio.filters.aiPhotos": "AI फोटोग्राफी",
  "portfolio.filters.aiVideos": "AI वीडियो",
  "portfolio.filters.banners": "बैनर डिज़ाइन",
  "portfolio.filters.youtube": "YouTube थंबनेल",
  "portfolio.filters.websites": "वेबसाइट",
  "portfolio.filters.graphics": "ग्राफ़िक डिज़ाइन",
  "portfolio.sampleNotice":
    "सैंपल कार्य: नीचे दिया गया हर प्रोजेक्ट इस वेबसाइट के लिए बनाया गया डेमो कॉन्सेप्ट है। ये पूरे हुए ग्राहक प्रोजेक्ट नहीं हैं। अपना असली काम जोड़ने के लिए src/data/portfolio.ts बदलें।",
  "portfolio.sampleBadge": "सैंपल",
  "portfolio.empty": "इस श्रेणी में अभी कोई प्रोजेक्ट नहीं है।",
  "portfolio.viewProject": "प्रोजेक्ट देखें",
  "portfolio.projectDetails": "प्रोजेक्ट विवरण",
  "portfolio.category": "श्रेणी",
  "portfolio.lightboxHint": "नेविगेट करने के लिए तीर कुंजियाँ, बंद करने के लिए Esc दबाएँ।",
  "portfolio.videoNote": "वीडियो प्रीव्यू",
  "portfolio.openLightbox": "प्रोजेक्ट प्रीव्यू खोलें",
  "portfolio.showing": "{total} में से {count} प्रोजेक्ट",

  /* ---------------- About ---------------- */
  "about.eyebrow": "नेक्सोरा के बारे में",
  "about.title": "जहाँ क्रिएटिविटी मिलती है तकनीक से।",
  "about.intro":
    "नेक्सोरा क्रिएटिव स्टूडियो एक डिजिटल क्रिएटिव सेवा ब्रांड है, जिसकी स्थापना साहिल ने की है। हमारा उद्देश्य व्यक्तियों, कंटेंट क्रिएटर्स और बिज़नेस को AI-संचालित विज़ुअल, क्रिएटिव वीडियो प्रोडक्शन, ग्राफ़िक डिज़ाइन और आधुनिक वेबसाइट डेवलपमेंट के माध्यम से उनके विचारों को प्रोफेशनल डिजिटल अनुभवों में बदलने में मदद करना है।",
  "about.storyTitle": "स्टूडियो",
  "about.storyP1":
    "स्टूडियो एक सरल सोच पर बना है: अच्छे विचार बहुत हैं, पर उन्हें परफेक्शन तक पहुँचाना कम लोग कर पाते हैं। नेक्सोरा इसी अंतर को पाटने के लिए है — फाउंडर्स, क्रिएटर्स और छोटी टीमों तक ऐसी डिज़ाइन और प्रोडक्शन गुणवत्ता पहुँचाना, जो आमतौर पर बड़ी एजेंसियों तक सीमित रहती है।",
  "about.storyP2":
    "हम जनरेटिव AI और हाथ से किए जाने वाले डिज़ाइन के संगम पर काम करते हैं। तकनीक हमें तेज़ी देती है; क्रिएटिव दिशा, कम्पोज़िशन और बारीकियों पर ध्यान इंसानी ही रहता है। हर प्रोजेक्ट किसी टेम्पलेट पर नहीं, ग्राहक के संदेश पर बनाया जाता है।",
  "about.missionTitle": "हमारा मिशन",
  "about.missionText":
    "व्यक्तियों, क्रिएटर्स और बिज़नेस को उनके विचारों को प्रोफेशनल डिजिटल अनुभवों में बदलने में मदद करना — AI विज़ुअल, वीडियो, डिज़ाइन और आधुनिक वेबसाइट के ज़रिए, स्पष्टता और देखभाल के साथ।",
  "about.visionTitle": "हमारी दृष्टि",
  "about.visionText":
    "उभरती ब्रांडों का भरोसेमंद क्रिएटिव पार्टनर बनना: ऐसा स्टूडियो जहाँ महत्वाकांक्षी विचारों को उनका हक़ मिले — विज़ुअल गुणवत्ता और ध्यान, बिज़नेस के आकार की परवाह किए बिना।",
  "about.founderTitle": "संस्थापक",
  "about.founderRole": "संस्थापक, नेक्सोरा क्रिएटिव स्टूडियो",
  "about.founderText":
    "नेक्सोरा क्रिएटिव स्टूडियो की स्थापना और अगुवाई साहिल करते हैं। स्टूडियो एक व्यक्तिगत दृष्टिकोण पर बना है: ब्रीफ़ को समझना, विज़ुअल दिशा तय करना और डिलीवरी तक जुड़े रहना।",
  "about.approachTitle": "हमारी सोच",
  "about.approach1.title": "उद्देश्य के साथ डिज़ाइन",
  "about.approach1.desc":
    "हर तत्व का अपना महत्व होना चाहिए। हम सजावट से ज़्यादा स्पष्ट हायरार्की को प्राथमिकता देते हैं।",
  "about.approach2.title": "स्पष्ट संवाद",
  "about.approach2.desc":
    "काम शुरू होने से पहले दायरा, कीमत और अपेक्षाएँ तय होती हैं — कोई अस्पष्ट समय-सीमा नहीं।",
  "about.approach3.title": "देखभाल के साथ डिलीवरी",
  "about.approach3.desc":
    "अंतिम फ़ाइलें जाँची जाती हैं, व्यवस्थित की जाती हैं और आपके प्लेटफ़ॉर्म के लिए तैयार की जाती हैं।",
  "about.servicesTitle": "हम क्या बनाते हैं",
  "about.ctaTitle": "आइए आपका अगला विज़ुअल बनाएँ।",
  "about.ctaText":
    "एक डिज़ाइन हो या पूरी डिजिटल उपस्थिति — शुरुआत एक बातचीत से होती है।",
  "about.ctaButton": "बातचीत शुरू करें",

  /* ---------------- Contact ---------------- */
  "contact.eyebrow": "संपर्क",
  "contact.title": "आइए आपके आइडिया पर बात करें।",
  "contact.subtitle":
    "हमें बताएँ आपको क्या चाहिए, रेफरेंस साझा करें, और हम अगले कदमों के साथ आपसे संपर्क करेंगे।",
  "contact.form.title": "पूछताछ भेजें",
  "contact.form.desc":
    "नीचे ज़रूरी जानकारी भरें। यह फ़ॉर्म एक संदेश तैयार करता है जिसे आप WhatsApp या ईमेल से भेज सकें — इस वेबसाइट पर कुछ भी संग्रहीत नहीं होता।",
  "contact.form.name": "पूरा नाम",
  "contact.form.namePlaceholder": "आपका नाम",
  "contact.form.email": "ईमेल पता",
  "contact.form.emailPlaceholder": "you@example.com",
  "contact.form.whatsapp": "WhatsApp नंबर",
  "contact.form.whatsappPlaceholder": "देश कोड + नंबर",
  "contact.form.service": "सेवा",
  "contact.form.servicePlaceholder": "सेवा चुनें",
  "contact.form.message": "प्रोजेक्ट विवरण",
  "contact.form.messagePlaceholder": "अपने प्रोजेक्ट, लक्ष्य और रेफरेंस के बारे में बताएँ।",
  "contact.form.submit": "WhatsApp पर जारी रखें",
  "contact.form.note":
    "यह फ़ॉर्म आपका डेटा संग्रहीत नहीं करता। यह आपका संदेश तैयार करता है ताकि आप इसे WhatsApp या ईमेल से भेज सकें।",
  "contact.form.directTitle": "पूरा ऑर्डर फ़ॉर्म चाहिए?",
  "contact.form.directDesc":
    "पैकेज, डिलीवरी पसंद और रेफरेंस नोट्स संरचित ऑर्डर फ़ॉर्म में जोड़ें।",
  "contact.form.directButton": "ऑर्डर फ़ॉर्म खोलें",
  "contact.info.title": "संपर्क विवरण",
  "contact.info.desc":
    "स्टूडियो तक पहुँचने का सबसे तेज़ तरीका WhatsApp है। ईमेल भी काम करता है — उत्तर व्यक्तिगत रूप से दिए जाते हैं।",
  "contact.info.whatsapp": "WhatsApp",
  "contact.info.email": "ईमेल",
  "contact.info.social": "सोशल",
  "contact.info.socialEmpty": "सोशल प्रोफ़ाइल जल्द आ रही हैं।",
  "contact.info.hours": "कार्य समय",
  "contact.info.location": "स्थान",
  "contact.info.responseNote": "उत्तर देने के बारे में",
  "contact.setup.whatsapp":
    "सीधी WhatsApp चैट अभी उपलब्ध नहीं है। कृपया नीचे दिए फ़ॉर्म से अपनी पूछताछ भेजें।",
  "contact.setup.email":
    "ईमेल संपर्क अभी उपलब्ध नहीं है। कृपया संपर्क फ़ॉर्म उपयोग करें।",
  "contact.fallback.title": "अपनी पूछताछ मैन्युअल रूप से जारी रखें",
  "contact.fallback.body":
    "WhatsApp अपने आप नहीं खुल सका। अपना तैयार संदेश कॉपी करें और अपने पसंदीदा माध्यम से भेजें।",
  "contact.fallback.setupBody":
    "सीधी WhatsApp सुविधा अभी उपलब्ध नहीं है। अपना तैयार संदेश कॉपी करें और अपने पसंदीदा माध्यम से भेजें, या स्टूडियो को ईमेल करें। आपकी जानकारी अपने आप नहीं भेजी जाती।",
  "contact.fallback.copy": "संदेश कॉपी करें",
  "contact.fallback.email": "ईमेल के ज़रिए भेजें",
  "contact.fallback.emailUnavailable":
    "ईमेल अभी उपलब्ध नहीं है। कृपया संपर्क फ़ॉर्म उपयोग करें।",
  "contact.available": "नए प्रोजेक्ट के लिए उपलब्ध",
  "contact.validation.nameRequired": "कृपया अपना नाम दर्ज करें।",
  "contact.validation.nameMin": "नाम कम से कम 2 अक्षरों का होना चाहिए।",
  "contact.validation.whatsappRequired": "कृपया अपना WhatsApp नंबर दर्ज करें।",
  "contact.validation.whatsappInvalid":
    "देश कोड के साथ सही नंबर दर्ज करें (8–15 अंक)।",
  "contact.validation.emailInvalid": "सही ईमेल पता दर्ज करें या खाली छोड़ें।",
  "contact.validation.serviceRequired": "कृपया एक सेवा चुनें।",
  "contact.validation.messageRequired": "कृपया अपने प्रोजेक्ट का वर्णन करें।",
  "contact.validation.messageMin": "कृपया कम से कम 10 अक्षर लिखें।",
  "contact.success.title": "आपका WhatsApp संदेश तैयार है।",
  "contact.success.intro":
    "आपकी पूछताछ के साथ WhatsApp खुल गया है। संदेश की समीक्षा करें और स्टूडियो तक पहुँचाने के लिए भेजें दबाएँ।",
  "contact.success.notConfirmed":
    "जब तक आप WhatsApp के अंदर भेजें नहीं दबाते, संदेश नहीं पहुँचता। प्रोजेक्ट तभी कन्फ़र्म होता है जब स्टूडियो उत्तर दे।",
  "contact.success.openAgain": "WhatsApp फिर खोलें",
  "contact.success.copy": "संदेश कॉपी करें",
  "contact.success.copied": "संदेश कॉपी हो गया",
  "contact.success.new": "नई पूछताछ भेजें",

  /* ---------------- Order ---------------- */
  "order.eyebrow": "प्रोजेक्ट शुरू करें",
  "order.title": "अपनी ब्रीफ़ तैयार करें।",
  "order.subtitle":
    "तीन छोटे चरण। हम आपकी जानकारी के साथ एक WhatsApp संदेश तैयार करेंगे, जिससे आप स्टूडियो के साथ सीधे पूछताछ कन्फ़र्म कर सकें।",
  "order.step.service": "सेवा",
  "order.step.details": "प्रोजेक्ट",
  "order.step.contact": "विवरण",
  "order.stepOf": "चरण {current} / {total}",
  "order.next": "आगे बढ़ें",
  "order.back": "पीछे",
  "order.submit": "WhatsApp पर जारी रखें",
  "order.summaryTitle": "ऑर्डर सारांश",
  "order.summaryEmpty": "सारांश देखने के लिए सेवा और पैकेज चुनें।",
  "order.summaryPrice": "कीमत",
  "order.summaryNote": "आपकी ब्रीफ़ की समीक्षा के बाद स्कोप और डिलीवरी तय की जाएगी।",
  "order.serviceLabel": "चुनी गई सेवा",
  "order.packageLabel": "चुना गया पैकेज",
  "order.service": "सेवा चुनें",
  "order.servicePlaceholder": "सेवा चुनें",
  "order.package": "पैकेज चुनें",
  "order.packagePlaceholder": "पैकेज चुनें",
  "order.packageHint": "पैकेज देखने के लिए पहले सेवा चुनें।",
  "order.fullName": "पूरा नाम",
  "order.namePlaceholder": "आपका पूरा नाम",
  "order.whatsapp": "WhatsApp नंबर",
  "order.whatsappPlaceholder": "जैसे 91 98765 43210",
  "order.whatsappHint": "उत्तर पाने के लिए देश कोड ज़रूर शामिल करें।",
  "order.email": "ईमेल पता",
  "order.emailPlaceholder": "you@example.com",
  "order.country": "देश",
  "order.countryPlaceholder": "अपना देश चुनें",
  "order.description": "प्रोजेक्ट विवरण",
  "order.descriptionPlaceholder":
    "अपने आइडिया, उद्देश्य, दर्शकों और चाहिए परिणाम के बारे में बताएँ। जितना अधिक संदर्भ, उतना बेहतर।",
  "order.deliveryDate": "पसंदीदा डिलीवरी तिथि",
  "order.deliveryDateHint": "वैकल्पिक — ब्रीफ़ की समीक्षा के बाद हम संभावना बताएँगे।",
  "order.instructions": "अतिरिक्त निर्देश",
  "order.instructionsPlaceholder":
    "रंग, आयाम, टेक्स्ट, ब्रांड गाइडलाइन या कोई और ज़रूरी जानकारी।",
  "order.upload.imageLabel": "रेफरेंस इमेज",
  "order.upload.imageHint": "JPG, PNG या WebP · अधिकतम 5 MB",
  "order.upload.videoLabel": "रेफरेंस वीडियो",
  "order.upload.videoHint": "MP4, WebM या MOV · अधिकतम 50 MB",
  "order.upload.choose": "फ़ाइल चुनें",
  "order.upload.replace": "फ़ाइल बदलें",
  "order.upload.remove": "हटाएँ",
  "order.upload.note":
    "फ़ाइलें केवल आपके ब्राउज़र में प्रीव्यू होती हैं — ये इस वेबसाइट या WhatsApp पर अपने आप अपलोड नहीं होतीं।",
  "order.upload.attachNote":
    "WhatsApp खुलने के बाद अपनी चुनी हुई रेफरेंस फ़ाइलें चैट में मैन्युअल रूप से अटैच करें।",
  "order.upload.selected": "चुनी गई फ़ाइल",
  "order.agree.before": "मैं",
  "order.agree.terms": "नियम व शर्तें",
  "order.agree.and": "और",
  "order.agree.privacy": "गोपनीयता नीति",
  "order.agree.after": "से सहमत हूँ।",
  "order.secureNote":
    "यहाँ कोई भुगतान नहीं लिया जाता। यह फ़ॉर्म आपकी पूछताछ तैयार करता है ताकि आप इसे WhatsApp या ईमेल से भेज सकें।",
  "order.success.title": "आपका WhatsApp संदेश तैयार है।",
  "order.success.intro":
    "WhatsApp आपके प्रोजेक्ट विवरण के साथ एक नए टैब में खुल गया है। संदेश की समीक्षा करें और स्टूडियो तक पहुँचाने के लिए भेजें दबाएँ।",
  "order.success.step1": "तैयार संदेश जाँचें और WhatsApp में भेजें दबाएँ।",
  "order.success.step2": "चैट में रेफरेंस फ़ाइलें मैन्युअल रूप से अटैच करें।",
  "order.success.step3":
    "स्टूडियो दायरा, अंतिम कोटेशन और डिलीवरी योजना की पुष्टि के लिए उत्तर देगा।",
  "order.success.notConfirmed":
    "जब तक आप संदेश नहीं भेजते और स्टूडियो उत्तर नहीं देता, आपकी पूछताछ कन्फ़र्म नहीं होती। WhatsApp खोलने से ऑर्डर नहीं बनता।",
  "order.success.savedToRecords":
    "इस पूछताछ की एक कॉपी स्टूडियो रिकॉर्ड में सेव कर दी गई है।",
  "order.success.notSaved":
    "यह पूछताछ स्टूडियो रिकॉर्ड में सेव नहीं हो सकी। संदेश भेज दें ताकि वह छूटे नहीं।",
  "order.success.openAgain": "WhatsApp फिर खोलें",
  "order.success.copy": "संदेश कॉपी करें",
  "order.success.copied": "संदेश कॉपी हो गया",
  "order.success.newOrder": "नई पूछताछ शुरू करें",
  "order.fallback.title": "WhatsApp अभी उपलब्ध नहीं है",
  "order.fallback.body":
    "आपका संदेश नीचे तैयार है। इसे कॉपी करें और अपने पसंदीदा माध्यम से भेजें, या स्टूडियो को ईमेल करें।",
  "order.fallback.setupTitle": "सीधी WhatsApp सेंड अभी उपलब्ध नहीं",
  "order.fallback.setupBody":
    "वन-टैप WhatsApp अभी उपलब्ध नहीं है। अपना तैयार संदेश कॉपी करें या स्टूडियो को ईमेल करें। आपकी जानकारी अपने आप नहीं भेजी जाती।",
  "order.fallback.readyTitle": "आपकी पूछताछ भेजने के लिए तैयार है",
  "order.fallback.readyBody":
    "सीधी WhatsApp सेंड सुविधा अभी उपलब्ध नहीं है। तैयार संदेश कॉपी करें या स्टूडियो को ईमेल करें। आपकी जानकारी अपने आप नहीं भेजी जाती।",
  "order.fallback.copy": "संदेश कॉपी करें",
  "order.fallback.email": "इसके बजाय ईमेल भेजें",
  "order.previewTitle": "संदेश प्रीव्यू",
  "order.previewToggle": "WhatsApp संदेश देखें",
  "order.previewHide": "प्रीव्यू छिपाएँ",
  "order.validation.nameRequired": "कृपया अपना पूरा नाम दर्ज करें।",
  "order.validation.nameMin": "नाम कम से कम 2 अक्षरों का होना चाहिए।",
  "order.validation.whatsappRequired": "कृपया अपना WhatsApp नंबर दर्ज करें।",
  "order.validation.whatsappInvalid":
    "देश कोड के साथ सही नंबर दर्ज करें (8–15 अंक)।",
  "order.validation.emailInvalid": "सही ईमेल पता दर्ज करें या खाली छोड़ें।",
  "order.validation.countryRequired": "कृपया अपना देश चुनें।",
  "order.validation.serviceRequired": "कृपया एक सेवा चुनें।",
  "order.validation.packageRequired": "कृपया एक पैकेज चुनें।",
  "order.validation.descriptionRequired": "कृपया अपने प्रोजेक्ट का वर्णन करें।",
  "order.validation.descriptionMin":
    "कृपया कम से कम 20 अक्षर लिखें ताकि हम ब्रीफ़ समझ सकें।",
  "order.validation.agreeRequired": "कृपया नियम व शर्तें और गोपनीयता नीति स्वीकार करें।",
  "order.validation.dateInvalid": "कृपया भविष्य की सही तिथि चुनें या खाली छोड़ें।",
  "order.validation.imageType": "कृपया JPG, PNG या WebP इमेज अपलोड करें।",
  "order.validation.videoType": "कृपया MP4, WebM या MOV वीडियो अपलोड करें।",
  "order.validation.imageSize": "इमेज 5 MB या उससे छोटी होनी चाहिए।",
  "order.validation.videoSize": "वीडियो 50 MB या उससे छोटा होना चाहिए।",

  /* ---------------- FAQ ---------------- */
  "faq.eyebrow": "सहायता केंद्र",
  "faq.title": "आपके सवाल, हमारे जवाब।",
  "faq.subtitle":
    "नेक्सोरा क्रिएटिव स्टूडियो के साथ प्रोजेक्ट शुरू करने से पहले जो जानना ज़रूरी है।",
  "faq.ctaTitle": "अब भी कोई सवाल है?",
  "faq.ctaText": "हमें WhatsApp पर भेजें, हम जल्द से जल्द उत्तर देंगे।",
  "faq.ctaButton": "WhatsApp पर पूछें",
  "faq.notFound": "अपना उत्तर नहीं मिला? सीधे हमसे संपर्क करें।",

  /* ---------------- Legal ---------------- */
  "legal.updated": "अंतिम अद्यतन",
  "legal.onThisPage": "इस पेज पर",
  "legal.contactNote":
    "यदि यहाँ कुछ भी अस्पष्ट है, तो पूछताछ करने से पहले स्टूडियो से संपर्क करें।",
  "privacy.title": "गोपनीयता नीति",
  "privacy.subtitle":
    "इस वेबसाइट का उपयोग करते समय आप जो जानकारी साझा करते हैं, नेक्सोरा क्रिएटिव स्टूडियो उसे कैसे संभालता है।",
  "privacy.notice":
    "नेक्सोरा क्रिएटिव स्टूडियो एक स्वतंत्र क्रिएटिव सेवा ब्रांड है। यह वेबसाइट अपना बैकएंड डेटाबेस या भुगतान प्रणाली नहीं चलाती।",
  "terms.title": "नियम व शर्तें",
  "terms.subtitle":
    "नेक्सोरा क्रिएटिव स्टूडियो से किसी सेवा के बारे में पूछताछ या ऑर्डर करने पर लागू होने वाले बुनियादी नियम।",
  "terms.notice":
    "ये शर्तें स्टूडियो की सेवाओं के लिए सामान्य टेम्पलेट हैं और ये किसी परियोजना-विशेष लिखित समझौते का स्थान नहीं लेतीं।",

  /* ---------------- Footer ---------------- */
  "footer.description":
    "एक डिजिटल क्रिएटिव स्टूडियो जो ब्रांडों को उनके आइडिया को प्रीमियम विज़ुअल, मोशन, डिज़ाइन और आधुनिक वेबसाइट में बदलने में मदद करता है।",
  "footer.explore": "देखें",
  "footer.services": "सेवाएँ",
  "footer.contact": "संपर्क",
  "footer.follow": "फ़ॉलो करें",
  "footer.legal": "कानूनी",
  "footer.copyright": "© {year} नेक्सोरा क्रिएटिव स्टूडियो। सर्वाधिकार सुरक्षित।",
  "footer.backToTop": "ऊपर जाएँ",
  "footer.emailUnavailable": "ईमेल उपलब्ध नहीं",
  "footer.whatsappUnavailable": "WhatsApp उपलब्ध नहीं",
  "footer.socialEmpty":
    "सोशल प्रोफ़ाइल जल्द आ रही हैं।",
  "footer.builtBy": "नेक्सोरा क्रिएटिव स्टूडियो द्वारा डिज़ाइन और निर्मित।",

  /* ---------------- WhatsApp ---------------- */
  "whatsapp.label": "WhatsApp पर बात करें",
  "whatsapp.aria": "नेक्सोरा क्रिएटिव स्टूडियो के साथ WhatsApp बातचीत शुरू करें",
  "whatsapp.notConfiguredTitle": "WhatsApp अभी जुड़ा नहीं है",
  "whatsapp.notConfiguredBody":
    "सीधी चैट अभी उपलब्ध नहीं है। कृपया संपर्क फ़ॉर्म या ईमेल का उपयोग करें।",
  "whatsapp.close": "WhatsApp पैनल बंद करें",
  "whatsapp.general": "नमस्ते नेक्सोरा क्रिएटिव स्टूडियो! मैं आपकी सेवाओं के बारे में और जानना चाहता/चाहती हूँ।",
  "whatsapp.serviceInquiry":
    "नमस्ते नेक्सोरा क्रिएटिव स्टूडियो! मुझे {service} में रुचि है। कृपया विवरण साझा करें।",
  "whatsapp.packageInquiry":
    "नमस्ते नेक्सोरा क्रिएटिव स्टूडियो! मैं {service} — {package} ({price}) ऑर्डर करना चाहता/चाहती हूँ। मेरी ज़रूरतें:",

  /* ---------------- 404 ---------------- */
  "notFound.eyebrow": "404",
  "notFound.title": "यह पेज एक क्रिएटिव मोड़ पर चला गया।",
  "notFound.subtitle":
    "आप जिस पेज की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया है। आइए आपको वापस सही रास्ते पर ले चलें।",
  "notFound.button": "होम पर लौटें",

  /* ---------------- SEO ---------------- */
  "seo.home.title": "नेक्सोरा क्रिएटिव स्टूडियो — Create. Design. Inspire.",
  "seo.home.desc":
    "प्रीमियम AI फोटो, AI वीडियो, बैनर डिज़ाइन, YouTube ग्राफ़िक्स, ग्राफ़िक डिज़ाइन और आधुनिक बिज़नेस वेबसाइट। साहिल द्वारा स्थापित।",
  "seo.services.title": "क्रिएटिव सेवाएँ — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.services.desc":
    "AI फोटो क्रिएशन, बैनर डिज़ाइनिंग, YouTube ग्राफ़िक्स, AI वीडियो क्रिएशन, वेबसाइट डेवलपमेंट और ग्राफ़िक डिज़ाइन — पारदर्शी कीमतों के साथ।",
  "seo.pricing.title": "कीमतें — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.pricing.desc":
    "AI फोटो, बैनर, YouTube थंबनेल, AI वीडियो, वेबसाइट और ग्राफ़िक डिज़ाइन की साफ कीमतें। अंतिम कोटेशन ब्रीफ़ की समीक्षा के बाद।",
  "seo.portfolio.title": "पोर्टफ़ोलियो — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.portfolio.desc":
    "AI इमेजरी, वीडियो, बैनर, YouTube ग्राफ़िक्स, वेबसाइट और ब्रांड आइडेंटिटी डिज़ाइन के कॉन्सेप्ट कार्यों की झलक।",
  "seo.about.title": "हमारे बारे में — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.about.desc":
    "नेक्सोरा क्रिएटिव स्टूडियो साहिल द्वारा स्थापित एक डिजिटल क्रिएटिव सेवा ब्रांड है, जो AI टूल्स और हाथ से किए गए डिज़ाइन को जोड़कर प्रीमियम डिजिटल अनुभव बनाता है।",
  "seo.contact.title": "संपर्क — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.contact.desc":
    "नेक्सोरा क्रिएटिव स्टूडियो के साथ प्रोजेक्ट शुरू करें। WhatsApp या ईमेल पर अपनी ब्रीफ़ साझा करें।",
  "seo.faq.title": "सामान्य प्रश्न — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.faq.desc":
    "ऑर्डर, भुगतान, डिलीवरी, रिवीजन, रेफरेंस फ़ाइलें, वेबसाइट और संपर्क से जुड़े उत्तर।",
  "seo.order.title": "अपना प्रोजेक्ट शुरू करें — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.order.desc":
    "अपनी प्रोजेक्ट ब्रीफ़ बनाएँ, सेवा और पैकेज चुनें, और WhatsApp के ज़रिए पूछताछ भेजें।",
  "seo.privacy.title": "गोपनीयता नीति — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.privacy.desc":
    "इस वेबसाइट और WhatsApp के ज़रिए साझा की गई जानकारी नेक्सोरा क्रिएटिव स्टूडियो कैसे संभालता है।",
  "seo.terms.title": "नियम व शर्तें — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.terms.desc":
    "नेक्सोरा क्रिएटिव स्टूडियो के साथ सेवा पूछताछ और ऑर्डर पर लागू नियम।",
  "seo.service.title": "{service} — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.notFound.title": "पेज नहीं मिला — नेक्सोरा क्रिएटिव स्टूडियो",
  "seo.notFound.desc": "अनुरोधित पेज नहीं मिला।",

};

export const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  en,
  hi,
};
