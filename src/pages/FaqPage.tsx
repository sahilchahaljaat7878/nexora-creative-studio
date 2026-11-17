import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { faqs } from "@/config/faq";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import { openWhatsApp } from "@/utils/whatsapp";

export default function FaqPage() {
  const { t, localizeText } = useLanguage();
  const navigate = useNavigate();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  useSeo({
    title: t("seo.faq.title"),
    description: t("seo.faq.desc"),
    path: "/faq",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "nexora-faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: localizeText(faq.question),
        acceptedAnswer: {
          "@type": "Answer",
          text: localizeText(faq.answer),
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById("nexora-faq-schema")?.remove();
    };
  }, [localizeText]);

  const handleWhatsApp = () => {
    if (!openWhatsApp(t("whatsapp.general"))) navigate("/contact");
  };

  return (
    <>
      <PageHero
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        breadcrumb={t("nav.faq")}
      >
        <ButtonLink to="/contact" withArrow>
          {t("common.contactUs")}
        </ButtonLink>
        <ButtonLink to="/pricing" variant="secondary">
          {t("nav.pricing")}
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const open = openId === faq.id;
                return (
                  <Reveal key={faq.id} delay={Math.min(index * 0.03, 0.2)}>
                    <div
                      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                        open
                          ? "border-brand-violet/35 bg-white/[0.045]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <h2>
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? null : faq.id)}
                          aria-expanded={open}
                          aria-controls={`faq-panel-${faq.id}`}
                          id={`faq-button-${faq.id}`}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                        >
                          <span className="flex items-start gap-3">
                            <span className="mt-0.5 font-mono text-[10px] tracking-widest text-violet-300/60">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[13.5px] font-semibold leading-relaxed text-white sm:text-sm">
                              {localizeText(faq.question)}
                            </span>
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-white/55 transition-transform duration-300 ${
                              open ? "rotate-180 text-violet-300" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </h2>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`faq-panel-${faq.id}`}
                            role="region"
                            aria-labelledby={`faq-button-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 pl-[2.6rem] text-[12.5px] leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pl-[3.1rem]">
                              {localizeText(faq.answer)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div className="noise relative overflow-hidden rounded-[26px] border border-brand-violet/25 bg-gradient-to-br from-brand-violet/[0.13] via-ink-800/90 to-ink-800/90 p-6 sm:p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-purple/25 blur-[70px]"
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-300">
                    <HelpCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="relative mt-5 font-display text-xl font-semibold text-white">
                    {t("faq.ctaTitle")}
                  </h2>
                  <p className="relative mt-2 text-[12.5px] leading-relaxed text-muted">
                    {t("faq.ctaText")}
                  </p>

                  <div className="relative mt-6 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-gradient text-[13px] font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {t("faq.ctaButton")}
                    </button>
                    <ButtonLink
                      to="/contact"
                      variant="secondary"
                      className="w-full"
                    >
                      {t("common.contactUs")}
                      <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>

                  <div className="relative mt-6 border-t border-white/10 pt-5">
                    <p className="text-[11px] leading-relaxed text-white/55">
                      {t("faq.notFound")}
                    </p>
                    <ButtonLink
                      to="/order"
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-auto p-0 text-[11px] text-violet-300 hover:text-white"
                      withArrow
                    >
                      {t("common.startProject")}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
