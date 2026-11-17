import { ArrowRight, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export default function ServicesPage() {
  const { t } = useLanguage();

  useSeo({
    title: t("seo.services.title"),
    description: t("seo.services.desc"),
    path: "/services",
  });

  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        breadcrumb={t("nav.services")}
      >
        <ButtonLink to="/order" withArrow>
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink to="/pricing" variant="secondary">
          {t("nav.pricing")}
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index * 0.05, 0.25)}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-3xl text-[11.5px] leading-relaxed text-white/55">
              {t("home.services.note")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-850/50 py-20 md:py-28">
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

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[30px] border border-brand-violet/25 bg-gradient-to-br from-brand-violet/[0.14] via-ink-800/80 to-ink-800/80 p-7 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-purple/25 blur-[90px]"
              />
              <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("pricing.customTitle")}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
                    {t("services.customQuoteNote")}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t("pricing.customDesc")}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2.5">
                  <ButtonLink to="/order" withArrow>
                    {t("common.startProject")}
                  </ButtonLink>
                  <ButtonLink
                    to="/contact"
                    variant="secondary"
                    className="group"
                  >
                    {t("common.contactUs")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
