import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Check, Info, MessageCircle, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { PricingCard } from "@/components/PricingCard";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getServiceBySlug, services, type Service } from "@/config/services";
import { pricingDisclaimers, pricingNote } from "@/config/pricing";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import {
  formatINR,
  lowestServicePrice,
  orderLink,
} from "@/lib/pricing";
import { serviceIconMap } from "@/lib/serviceIcons";
import { openWhatsApp } from "@/utils/whatsapp";
import NotFoundPage from "@/pages/NotFoundPage";

const disclaimerByService: Record<string, keyof typeof pricingDisclaimers> = {
  "ai-photo": "aiPhoto",
  "ai-video": "aiVideo",
  website: "website",
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFoundPage />;

  return <ServiceDetailContent key={service.id} service={service} />;
}

function ServiceDetailContent({ service }: { service: Service }) {
  const { t, localizeText, localizeList } = useLanguage();
  const navigate = useNavigate();
  const Icon = serviceIconMap[service.icon];
  const startingPrice = lowestServicePrice(service.packages.map((pkg) => pkg.pricingKey));
  const samples = portfolioItems.filter((item) => item.category === service.portfolioCategory);
  const currentIndex = services.findIndex((item) => item.id === service.id);
  const otherServices = [1, 2, 3]
    .map((offset) => services[(currentIndex + offset) % services.length])
    .filter((item): item is Service => Boolean(item));
  const disclaimerKey = disclaimerByService[service.id];

  useSeo({
    title: t("seo.service.title", { service: localizeText(service.name) }),
    description: `${localizeText(service.tagline)} ${localizeText(service.short)}`,
    path: `/services/${service.slug}`,
    image: service.image,
    type: "article",
  });

  const handleWhatsApp = () => {
    const message = t("whatsapp.serviceInquiry", { service: localizeText(service.name) });
    if (!openWhatsApp(message)) navigate("/contact");
  };

  return (
    <>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={localizeText(service.name)}
        subtitle={localizeText(service.tagline)}
        breadcrumb={localizeText(service.shortName)}
      >
        <ButtonLink to={orderLink(service.id)} withArrow>
          {t("common.orderNow")}
        </ButtonLink>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-6 text-sm font-semibold text-white transition-all hover:border-emerald-400/40 hover:bg-white/[0.08]"
        >
          <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
          {t("common.whatsappUs")}
        </button>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div className="ring-gradient relative overflow-hidden rounded-[28px]">
                {service.video ? (
                  <video
                    src={service.video}
                    poster={service.image}
                    aria-label={localizeText(service.imageAlt)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={localizeText(service.imageAlt)}
                    width={1000}
                    height={750}
                    loading="eager"
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {localizeText(service.shortName)}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                    {t("services.startingAt")}
                  </p>
                  <p className="mt-1.5 font-display text-xl font-semibold text-white">
                    {startingPrice !== null
                      ? formatINR(startingPrice)
                      : t("pricing.contactForPrice")}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                    {t("services.packages")}
                  </p>
                  <p className="mt-1.5 font-display text-xl font-semibold text-white">
                    {String(service.packages.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="eyebrow">
                <span className="eyebrow-dash" />
                {t("common.included")}
              </p>
              <h2 className="mt-5 font-display text-2xl font-semibold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl">
                {localizeText(service.tagline)}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                {localizeText(service.description)}
              </p>

              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {localizeList(service.features).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 text-[12.5px] text-white/70"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to={orderLink(service.id)} withArrow>
                  {t("common.startProject")}
                </ButtonLink>
                <ButtonLink to="/pricing" variant="secondary">
                  {t("nav.pricing")}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-850/50 py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t("nav.services")}
              title={t("services.packages")}
              subtitle={t("services.packagesDesc")}
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {service.packages.map((pkg, index) => (
              <Reveal key={pkg.pricingKey} delay={Math.min(index * 0.05, 0.2)}>
                <PricingCard service={service} pkg={pkg} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 sm:p-5">
              <p className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                {t("pricing.noteLabel")}
              </p>
              <p className="mt-2 max-w-4xl text-[11.5px] leading-relaxed text-amber-100/60">
                {localizeText(pricingNote)}
              </p>
              {disclaimerKey && (
                <p className="mt-2 max-w-4xl text-[11.5px] leading-relaxed text-amber-100/55">
                  {localizeText(pricingDisclaimers[disclaimerKey])}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {samples.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow={t("portfolio.eyebrow")}
                title={t("services.samples")}
                subtitle={t("services.samplesDesc")}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <PortfolioGallery items={samples} showFilters={false} className="mt-10" />
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative border-y border-white/[0.06] bg-ink-850/40 py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 rounded-[26px] border border-brand-violet/25 bg-gradient-to-br from-brand-violet/[0.12] via-ink-800/80 to-ink-800/80 p-6 sm:p-8 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-300">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">
                    {t("services.talkToUs")}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-[12.5px] leading-relaxed text-muted">
                    {t("services.customQuoteNote")}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2.5">
                <ButtonLink to="/contact" variant="secondary">
                  {t("common.contactUs")}
                </ButtonLink>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t("common.whatsappUs")}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow={t("nav.services")}
                title={t("services.other")}
              />
              <ButtonLink to="/services" variant="secondary" size="sm" withArrow>
                {t("services.viewAll")}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {otherServices.map((other, index) => (
              <Reveal key={other.id} delay={index * 0.05}>
                <ButtonLink
                  to={`/services/${other.slug}`}
                  variant="secondary"
                  className="group h-auto w-full justify-start overflow-hidden rounded-[22px] p-0 text-left"
                >
                  <span className="relative h-24 w-24 shrink-0 overflow-hidden">
                    <img
                      src={other.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-800/70" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col px-4 py-4">
                    <span className="truncate text-[13px] font-semibold text-white">
                      {localizeText(other.name)}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[11px] font-normal leading-relaxed text-muted">
                      {localizeText(other.short)}
                    </span>
                  </span>
                  <ArrowRight className="mr-4 h-4 w-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 flex items-center gap-2 text-[11px] text-white/50">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("pricing.startingFrom")} · {t("common.pricesInINR")} · {t("common.timelineNote")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
