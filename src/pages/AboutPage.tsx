import { ArrowRight, Check, Eye, Sparkles, Target } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/config/brand";
import { services } from "@/config/services";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import { formatINR, lowestServicePrice } from "@/lib/pricing";
import { serviceIconMap } from "@/lib/serviceIcons";
import type { TranslationKey } from "@/config/translations";

const approachPoints: { title: TranslationKey; desc: TranslationKey }[] = [
  { title: "about.approach1.title", desc: "about.approach1.desc" },
  { title: "about.approach2.title", desc: "about.approach2.desc" },
  { title: "about.approach3.title", desc: "about.approach3.desc" },
];

export default function AboutPage() {
  const { t, localizeText } = useLanguage();

  useSeo({
    title: t("seo.about.title"),
    description: t("seo.about.desc"),
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.intro")}
        breadcrumb={t("nav.about")}
      >
        <ButtonLink to="/order" withArrow>
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          {t("common.contactUs")}
        </ButtonLink>
      </PageHero>

      <section className="section-pad overflow-hidden">
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

            <Reveal delay={0.08}>
              <p className="eyebrow">
                <span className="eyebrow-dash" />
                {t("about.storyTitle")}
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl">
                {t("about.approachTitle")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{t("about.storyP1")}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{t("about.storyP2")}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {t("brand.tagline")}
                </span>
                <span className="rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-violet-200">
                  {t("about.founderTitle")}: {brand.founder}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-850/50 py-20 md:py-28">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <article className="relative h-full overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-300">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl font-semibold uppercase tracking-tight text-white">
                  {t("about.missionTitle")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t("about.missionText")}</p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="relative h-full overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 sm:p-9">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-500/10 text-indigo-300">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl font-semibold uppercase tracking-tight text-white">
                  {t("about.visionTitle")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t("about.visionText")}</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-800/70 p-7 sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-brand-purple/20 blur-[70px]"
                />
                <div className="relative flex items-start gap-5">
                  <LogoMark className="h-16 w-16 shrink-0 rounded-[18px] border border-white/10" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-violet-300">
                      {t("about.founderTitle")}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                      {brand.founder}
                    </h2>
                    <p className="mt-1 text-[12px] text-muted">{t("about.founderRole")}</p>
                  </div>
                </div>
                <p className="relative mt-7 text-sm leading-relaxed text-muted">
                  {t("about.founderText")}
                </p>
                <div className="relative mt-7 flex flex-wrap items-center gap-2 border-t border-white/[0.08] pt-5">
                  <Sparkles className="h-4 w-4 text-violet-300" aria-hidden="true" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                    DESIGN-LED · AI-ACCELERATED
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <SectionHeading
                eyebrow={t("about.servicesTitle")}
                title={t("home.services.title")}
                subtitle={t("home.services.subtitle")}
              />
              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = serviceIconMap[service.icon];
                  const lowest = lowestServicePrice(
                    service.packages.map((pkg) => pkg.pricingKey)
                  );
                  return (
                    <li key={service.id}>
                      <ButtonLink
                        to={`/services/${service.slug}`}
                        variant="secondary"
                        className="h-auto w-full justify-start rounded-2xl px-4 py-3.5 text-left"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-[12.5px] font-semibold">
                            {localizeText(service.name)}
                          </span>
                          <span className="mt-0.5 text-[10px] font-normal text-white/55">
                            {lowest !== null
                              ? `${t("services.startingAt")} ${formatINR(lowest)}`
                              : t("pricing.contactForPrice")}
                          </span>
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/50" />
                      </ButtonLink>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {approachPoints.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <article className="h-full rounded-[22px] border border-white/[0.09] bg-white/[0.025] p-6 transition-colors hover:border-brand-violet/30">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/25 bg-violet-500/10">
                    <Check className="h-4 w-4 text-violet-300" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-white">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{t(item.desc)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-page">
          <Reveal>
            <div className="noise relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1A0F2E] via-[#120C22] to-[#0A0814] px-6 py-14 text-center sm:px-10 md:py-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-purple/30 blur-[100px]"
              />
              <div className="relative z-10 mx-auto max-w-2xl">
                <p className="eyebrow justify-center">
                  <span className="eyebrow-dash" />
                  {t("about.eyebrow")}
                  <span className="eyebrow-dash rotate-180" />
                </p>
                <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl">
                  {t("about.ctaTitle")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {t("about.ctaText")}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <ButtonLink to="/order" size="lg" withArrow>
                    {t("about.ctaButton")}
                  </ButtonLink>
                  <ButtonLink to="/portfolio" variant="secondary" size="lg">
                    {t("common.viewAllProjects")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
