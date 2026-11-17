import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { HighlightStrip } from "@/components/HighlightStrip";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/config/services";
import { featuredPortfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import type { TranslationKey } from "@/config/translations";

const approachPoints: { title: TranslationKey; desc: TranslationKey }[] = [
  { title: "about.approach1.title", desc: "about.approach1.desc" },
  { title: "about.approach2.title", desc: "about.approach2.desc" },
  { title: "about.approach3.title", desc: "about.approach3.desc" },
];

export default function HomePage() {
  const { t } = useLanguage();

  useSeo({
    title: t("seo.home.title"),
    description: t("seo.home.desc"),
    path: "/",
  });

  return (
    <>
      <Hero />
      <HighlightStrip className="pb-4" />

      <section className="section-pad" id="services">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={t("home.services.eyebrow")}
                title={t("home.services.title")}
                subtitle={t("home.services.subtitle")}
              />
              <ButtonLink
                to="/services"
                variant="secondary"
                size="md"
                className="shrink-0"
                withArrow
              >
                {t("common.viewAllServices")}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index * 0.05, 0.25)}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[11.5px] leading-relaxed text-white/55">
            {t("home.services.note")}
          </p>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-850/50 py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={t("home.portfolio.eyebrow")}
                title={t("home.portfolio.title")}
                subtitle={t("home.portfolio.subtitle")}
              />
              <ButtonLink to="/portfolio" variant="secondary" size="md" className="shrink-0" withArrow>
                {t("common.viewAllProjects")}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <PortfolioGallery items={featuredPortfolioItems} className="mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("home.process.eyebrow")}
              title={t("home.process.title")}
              subtitle={t("home.process.subtitle")}
            />
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink-850/40 py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-[36px] bg-brand-purple/15 blur-[70px]"
                />
                <div className="ring-gradient relative overflow-hidden rounded-[28px]">
                  <img
                    src="/images/studio.svg"
                    alt={t("home.approach.imageCaption")}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-900/80 to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/12 bg-ink/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {t("home.approach.imageCaption")}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow">
                <span className="eyebrow-dash" />
                {t("home.approach.eyebrow")}
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl">
                {t("home.approach.title")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{t("home.approach.text")}</p>

              <ul className="mt-7 space-y-4">
                {approachPoints.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-violet-300/25 bg-violet-500/10">
                      <Check className="h-3 w-3 text-violet-300" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{t(item.title)}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">
                        {t(item.desc)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-200 transition-colors hover:text-white"
              >
                {t("home.approach.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
