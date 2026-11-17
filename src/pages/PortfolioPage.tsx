import { Info } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export default function PortfolioPage() {
  const { t } = useLanguage();

  useSeo({
    title: t("seo.portfolio.title"),
    description: t("seo.portfolio.desc"),
    path: "/portfolio",
  });

  return (
    <>
      <PageHero
        eyebrow={t("portfolio.eyebrow")}
        title={t("portfolio.title")}
        subtitle={t("portfolio.subtitle")}
        breadcrumb={t("nav.portfolio")}
      >
        <ButtonLink to="/order" withArrow>
          {t("common.startProject")}
        </ButtonLink>
        <ButtonLink to="/services" variant="secondary">
          {t("common.exploreServices")}
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
              <p className="text-[11.5px] leading-relaxed text-white/45">
                {t("portfolio.sampleNotice")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <PortfolioGallery items={portfolioItems} className="mt-10" />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
