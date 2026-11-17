import { ArrowRight, Info } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PricingCard } from "@/components/PricingCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingDisclaimers, pricingNote } from "@/config/pricing";
import { services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import { formatINR, lowestServicePrice } from "@/lib/pricing";

const disclaimersByService: Record<string, keyof typeof pricingDisclaimers> = {
  "ai-photo": "aiPhoto",
  "ai-video": "aiVideo",
  website: "website",
};

export default function PricingPage() {
  const { t, localizeText } = useLanguage();

  useSeo({
    title: t("seo.pricing.title"),
    description: t("seo.pricing.desc"),
    path: "/pricing",
  });

  return (
    <>
      <PageHero
        eyebrow={t("pricing.eyebrow")}
        title={t("pricing.title")}
        subtitle={t("pricing.subtitle")}
        breadcrumb={t("nav.pricing")}
      >
        <ButtonLink to="/order" withArrow>
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          {t("common.contactUs")}
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap gap-2" role="navigation" aria-label={t("pricing.chooseService")}>
              {services.map((service) => {
                const lowest = lowestServicePrice(service.packages.map((pkg) => pkg.pricingKey));
                return (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold text-muted transition-all hover:border-brand-violet/40 hover:text-white"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${service.accent.dot}`} aria-hidden="true" />
                    {localizeText(service.shortName)}
                    <span className="font-mono text-[9px] text-white/50">
                      {lowest !== null ? formatINR(lowest) : t("pricing.contactForPrice")}
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-14 space-y-20 md:space-y-24">
            {services.map((service, serviceIndex) => {
              const disclaimerKey = disclaimersByService[service.id];
              return (
                <section key={service.id} id={service.id} className="scroll-mt-28">
                  <Reveal>
                    <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
                      <div>
                        <p className="eyebrow">
                          <span className="eyebrow-dash" />
                          {String(serviceIndex + 1).padStart(2, "0")} · {t("services.packages")}
                        </p>
                        <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
                          {localizeText(service.name)}
                        </h2>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                          {localizeText(service.tagline)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <ButtonLink
                          to={`/services/${service.slug}`}
                          variant="secondary"
                          size="sm"
                        >
                          {t("pricing.viewService")}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </ButtonLink>
                        <ButtonLink
                          to={`/order?service=${service.id}`}
                          size="sm"
                        >
                          {t("common.orderNow")}
                        </ButtonLink>
                      </div>
                    </div>
                  </Reveal>

                  <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {service.packages.map((pkg, index) => (
                      <Reveal key={pkg.pricingKey} delay={Math.min(index * 0.05, 0.2)}>
                        <PricingCard service={service} pkg={pkg} />
                      </Reveal>
                    ))}
                  </div>

                  {disclaimerKey && (
                    <p className="mt-5 flex max-w-3xl items-start gap-2 text-[11px] leading-relaxed text-white/55">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {localizeText(pricingDisclaimers[disclaimerKey])}
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-16 rounded-[24px] border border-amber-300/15 bg-amber-300/[0.04] p-5 sm:p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                {t("pricing.noteLabel")}
              </p>
              <p className="mt-3 max-w-4xl text-[12.5px] leading-relaxed text-amber-100/60">
                {localizeText(pricingNote)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-850/50 py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <SectionHeading
                eyebrow={t("pricing.eyebrow")}
                title={t("pricing.customTitle")}
                subtitle={t("pricing.customDesc")}
              />
              <div className="flex flex-wrap gap-3">
                <ButtonLink to="/order" withArrow>
                  {t("common.startProject")}
                </ButtonLink>
                <ButtonLink to="/contact" variant="secondary">
                  {t("common.contactUs")}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
