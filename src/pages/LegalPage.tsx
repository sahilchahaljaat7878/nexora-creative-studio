import { Link } from "react-router-dom";
import { ArrowRight, Info, Scale } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalDocument } from "@/config/legal";
import { useLanguage } from "@/context/LanguageContext";
import { useSeo } from "@/hooks/useSeo";
import type { TranslationKey } from "@/config/translations";

interface LegalPageProps {
  document: LegalDocument;
  type: "privacy" | "terms";
}

export function LegalPage({ document, type }: LegalPageProps) {
  const { t, localizeText, lang } = useLanguage();
  const isPrivacy = type === "privacy";

  const titleKey: TranslationKey = isPrivacy ? "privacy.title" : "terms.title";
  const subtitleKey: TranslationKey = isPrivacy ? "privacy.subtitle" : "terms.subtitle";
  const noticeKey: TranslationKey = isPrivacy ? "privacy.notice" : "terms.notice";
  const path = isPrivacy ? "/privacy-policy" : "/terms-and-conditions";

  useSeo({
    title: t(isPrivacy ? "seo.privacy.title" : "seo.terms.title"),
    description: t(isPrivacy ? "seo.privacy.desc" : "seo.terms.desc"),
    path,
  });

  const updatedLabel = new Date(`${document.updated}T00:00:00`).toLocaleDateString(
    lang === "hi" ? "hi-IN" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <PageHero
        eyebrow={t("footer.legal")}
        title={t(titleKey)}
        subtitle={t(subtitleKey)}
        breadcrumb={t(titleKey)}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
          <Scale className="h-3.5 w-3.5" aria-hidden="true" />
          {t("legal.updated")}: {updatedLabel}
        </span>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                  {t("legal.onThisPage")}
                </p>
                <nav aria-label={t("legal.onThisPage")} className="mt-4">
                  <ol className="space-y-2.5 border-l border-white/10 pl-4">
                    {document.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="text-[12px] leading-relaxed text-muted transition-colors hover:text-white"
                        >
                          {localizeText(section.heading)}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-[11px] leading-relaxed text-white/55">
                    {t("legal.contactNote")}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-violet-300 transition-colors hover:text-white"
                  >
                    {t("common.contactUs")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            </aside>

            <div>
              <Reveal>
                <div className="flex items-start gap-3 rounded-2xl border border-brand-violet/20 bg-brand-violet/[0.06] p-4 sm:p-5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                  <p className="text-[12px] leading-relaxed text-white/55">{t(noticeKey)}</p>
                </div>
              </Reveal>

              <div className="mt-10 space-y-10">
                {document.sections.map((section, index) => (
                  <Reveal key={section.id} delay={Math.min(index * 0.02, 0.15)}>
                    <section id={section.id} className="scroll-mt-28">
                      <h2 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {localizeText(section.heading)}
                      </h2>
                      <div className="prose-legal mt-3">
                        {section.paragraphs[lang].map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:p-6">
                  <div>
                    <p className="font-display text-base font-semibold text-white">
                      {t("legal.contactNote")}
                    </p>
                    <p className="mt-1 text-[11.5px] text-white/55">
                      {t("legal.updated")}: {updatedLabel}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <ButtonLink to="/contact" size="sm" withArrow>
                      {t("common.contactUs")}
                    </ButtonLink>
                    <ButtonLink to="/" variant="secondary" size="sm">
                      {t("common.backHome")}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
